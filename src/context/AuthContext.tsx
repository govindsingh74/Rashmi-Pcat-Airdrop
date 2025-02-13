import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: SupabaseUser | null;
  isAuthenticated: boolean;
  profile: UserProfile | null;
}

interface UserProfile {
  id: string;
  wallet_address: string | null;
  twitter_handle: string | null;
  facebook_handle: string | null;
  instagram_handle: string | null;
  youtube_handle: string | null;
  total_rewards: number;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<AuthError | null>;
  logout: () => Promise<void>;
  register: (email: string, password: string, metadata?: { name?: string, wallet_address?: string }) => Promise<AuthError | null>;
  resetPassword: (email: string) => Promise<AuthError | null>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    profile: null,
  });

  useEffect(() => {
    // Check active sessions and set the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthState({
          user: session.user,
          isAuthenticated: true,
          profile: null,
        });
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (session) {
        setAuthState({
          user: session.user,
          isAuthenticated: true,
          profile: null,
        });
        await fetchProfile(session.user.id);
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          profile: null,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (profile) {
        setAuthState(state => ({
          ...state,
          profile,
        }));
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('Login attempt for:', email, error ? 'failed' : 'succeeded');
      return error;
    } catch (error) {
      console.error('Login error:', error);
      return error as AuthError;
    }
  };

  const register = async (email: string, password: string, metadata?: { name?: string, wallet_address?: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        }
      });
      console.log('Registration attempt for:', email, error ? 'failed' : 'succeeded');
      return error;
    } catch (error) {
      console.error('Registration error:', error);
      return error as AuthError;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      console.log('Password reset attempt for:', email, error ? 'failed' : 'succeeded');
      return error;
    } catch (error) {
      console.error('Password reset error:', error);
      return error as AuthError;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!authState.user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', authState.user.id);

      if (error) throw error;

      await fetchProfile(authState.user.id);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      logout, 
      register, 
      resetPassword, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}