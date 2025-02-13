/*
  # Initial Schema Setup for PCAT Airdrop

  1. New Tables
    - `profiles`
      - Extends auth.users with additional user profile information
      - Stores wallet addresses and social media links
    - `tasks`
      - Stores available airdrop tasks
      - Includes reward amounts and completion criteria
    - `user_tasks`
      - Tracks user task completion status
      - Links users to tasks with completion timestamps
    - `rewards`
      - Tracks token rewards and distributions
      - Records transaction details and status
    - `social_stats`
      - Stores user social media engagement metrics
      - Tracks followers, posts, and engagement rates

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure users can only access their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address text,
  twitter_handle text,
  facebook_handle text,
  instagram_handle text,
  youtube_handle text,
  total_rewards numeric(20, 0) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  reward_amount numeric(20, 0) NOT NULL,
  task_type text NOT NULL,
  platform text,
  required_proof text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create user_tasks table
CREATE TABLE IF NOT EXISTS user_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  proof_submitted text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, task_id)
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id),
  amount numeric(20, 0) NOT NULL,
  transaction_hash text,
  status text NOT NULL DEFAULT 'pending',
  distributed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create social_stats table
CREATE TABLE IF NOT EXISTS social_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  platform text NOT NULL,
  followers_count integer DEFAULT 0,
  posts_count integer DEFAULT 0,
  engagement_rate numeric(5, 2) DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for tasks
CREATE POLICY "Anyone can view active tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create policies for user_tasks
CREATE POLICY "Users can view their own task completions"
  ON user_tasks
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own task completions"
  ON user_tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own task completions"
  ON user_tasks
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for rewards
CREATE POLICY "Users can view their own rewards"
  ON rewards
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for social_stats
CREATE POLICY "Users can view their own social stats"
  ON social_stats
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own social stats"
  ON social_stats
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user profile creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();