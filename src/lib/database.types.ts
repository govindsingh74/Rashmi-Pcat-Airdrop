export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          wallet_address: string | null
          twitter_handle: string | null
          facebook_handle: string | null
          instagram_handle: string | null
          youtube_handle: string | null
          total_rewards: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          wallet_address?: string | null
          twitter_handle?: string | null
          facebook_handle?: string | null
          instagram_handle?: string | null
          youtube_handle?: string | null
          total_rewards?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string | null
          twitter_handle?: string | null
          facebook_handle?: string | null
          instagram_handle?: string | null
          youtube_handle?: string | null
          total_rewards?: number
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          reward_amount: number
          task_type: string
          platform: string | null
          required_proof: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          reward_amount: number
          task_type: string
          platform?: string | null
          required_proof?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          reward_amount?: number
          task_type?: string
          platform?: string | null
          required_proof?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      user_tasks: {
        Row: {
          id: string
          user_id: string
          task_id: string
          status: string
          proof_submitted: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          task_id: string
          status?: string
          proof_submitted?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          task_id?: string
          status?: string
          proof_submitted?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      rewards: {
        Row: {
          id: string
          user_id: string
          task_id: string | null
          amount: number
          transaction_hash: string | null
          status: string
          distributed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          task_id?: string | null
          amount: number
          transaction_hash?: string | null
          status?: string
          distributed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          task_id?: string | null
          amount?: number
          transaction_hash?: string | null
          status?: string
          distributed_at?: string | null
          created_at?: string
        }
      }
      social_stats: {
        Row: {
          id: string
          user_id: string
          platform: string
          followers_count: number
          posts_count: number
          engagement_rate: number
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: string
          followers_count?: number
          posts_count?: number
          engagement_rate?: number
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: string
          followers_count?: number
          posts_count?: number
          engagement_rate?: number
          last_updated?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}