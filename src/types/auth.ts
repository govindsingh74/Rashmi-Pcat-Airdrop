export interface User {
  name: string;
  email: string;
  password: string;
  walletAddress: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}