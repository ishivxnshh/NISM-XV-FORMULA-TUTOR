/*
  # NISM Research Analyst Formula Tutor - Database Schema

  ## Overview
  Complete database schema for the NISM Formula Tutor application including formula library,
  user attempts, sessions, and readiness tracking.

  ## New Tables
  
  ### 1. `formulas`
  Stores all NISM formulas from the formula sheet with metadata
  - `id` (uuid, primary key)
  - `title` (text) - Formula name
  - `category` (text) - Category like "Ratios", "Valuation", "CAPM", etc.
  - `expression` (text) - Mathematical expression as string
  - `inputs` (jsonb) - Array of input definitions with name, unit, type, min, max
  - `tolerance_type` (text) - "absolute" or "relative"
  - `tolerance_value` (numeric) - Tolerance for answer checking
  - `difficulty` (integer) - 1-5 difficulty rating
  - `explanation` (text) - Formula explanation and context
  - `example_ranges` (jsonb) - Sample value ranges for auto-generation
  - `created_at` (timestamptz)
  
  ### 2. `problems`
  Pre-seeded practice problems with specific values
  - `id` (uuid, primary key)
  - `formula_id` (uuid, foreign key)
  - `seed_values` (jsonb) - Input values for this problem
  - `difficulty` (integer)
  - `created_at` (timestamptz)
  
  ### 3. `attempts`
  Records every problem attempt by users
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `problem_id` (uuid, nullable, foreign key)
  - `formula_id` (uuid, foreign key)
  - `inputs` (jsonb) - User input values
  - `user_answer` (numeric) - User's calculated result
  - `correct_answer` (numeric) - Correct result
  - `is_correct` (boolean)
  - `percentage_error` (numeric)
  - `hints_used` (integer) - Number of hints requested (0-3)
  - `hint_penalty` (numeric) - Total penalty applied
  - `base_score` (numeric) - Score before penalties
  - `final_score` (numeric) - Score after hint penalties
  - `time_spent_ms` (integer) - Time taken in milliseconds
  - `step_by_step` (jsonb) - Solution derivation steps
  - `created_at` (timestamptz)
  
  ### 4. `sessions`
  Practice sessions containing multiple attempts
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `attempt_ids` (uuid[]) - Array of attempt IDs
  - `total_attempts` (integer)
  - `correct_attempts` (integer)
  - `aggregated_score` (numeric) - Overall session score
  - `confidence_level` (numeric) - Confidence percentage
  - `weak_categories` (jsonb) - Categories needing improvement
  - `recommendation` (text) - "book_exam", "borderline", "not_ready"
  - `recommendation_rationale` (text)
  - `top_improvements` (text[]) - Array of actionable suggestions
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 5. `user_profiles`
  Extended user information
  - `id` (uuid, primary key, foreign key to auth.users)
  - `name` (text)
  - `email` (text)
  - `hint_quota` (integer) - Total hints available (optional feature)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Formulas and problems are publicly readable
*/

-- Create formulas table
CREATE TABLE IF NOT EXISTS formulas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  expression text NOT NULL,
  inputs jsonb NOT NULL DEFAULT '[]'::jsonb,
  tolerance_type text DEFAULT 'relative' CHECK (tolerance_type IN ('absolute', 'relative')),
  tolerance_value numeric DEFAULT 0.01,
  difficulty integer DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  explanation text,
  example_ranges jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create problems table
CREATE TABLE IF NOT EXISTS problems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  formula_id uuid NOT NULL REFERENCES formulas(id) ON DELETE CASCADE,
  seed_values jsonb NOT NULL DEFAULT '{}'::jsonb,
  difficulty integer DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  created_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text,
  hint_quota integer DEFAULT 999,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create attempts table
CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id uuid REFERENCES problems(id) ON DELETE SET NULL,
  formula_id uuid NOT NULL REFERENCES formulas(id) ON DELETE CASCADE,
  inputs jsonb NOT NULL DEFAULT '{}'::jsonb,
  user_answer numeric,
  correct_answer numeric NOT NULL,
  is_correct boolean DEFAULT false,
  percentage_error numeric DEFAULT 0,
  hints_used integer DEFAULT 0 CHECK (hints_used BETWEEN 0 AND 3),
  hint_penalty numeric DEFAULT 0,
  base_score numeric DEFAULT 0,
  final_score numeric DEFAULT 0,
  time_spent_ms integer DEFAULT 0,
  step_by_step jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attempt_ids uuid[] DEFAULT ARRAY[]::uuid[],
  total_attempts integer DEFAULT 0,
  correct_attempts integer DEFAULT 0,
  aggregated_score numeric DEFAULT 0,
  confidence_level numeric DEFAULT 0,
  weak_categories jsonb DEFAULT '[]'::jsonb,
  recommendation text CHECK (recommendation IN ('book_exam', 'borderline', 'not_ready')),
  recommendation_rationale text,
  top_improvements text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE formulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for formulas (publicly readable)
CREATE POLICY "Anyone can view formulas"
  ON formulas FOR SELECT
  TO authenticated, anon
  USING (true);

-- RLS Policies for problems (publicly readable)
CREATE POLICY "Anyone can view problems"
  ON problems FOR SELECT
  TO authenticated, anon
  USING (true);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for attempts
CREATE POLICY "Users can view own attempts"
  ON attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts"
  ON attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for sessions
CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_formulas_category ON formulas(category);
CREATE INDEX IF NOT EXISTS idx_problems_formula ON problems(formula_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_formula ON attempts(formula_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
