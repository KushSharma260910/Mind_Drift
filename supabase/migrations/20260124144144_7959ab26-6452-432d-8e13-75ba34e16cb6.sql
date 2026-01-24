-- Create leaderboard table for storing player scores
CREATE TABLE public.leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  total_time REAL NOT NULL DEFAULT 0,
  accuracy INTEGER NOT NULL DEFAULT 0,
  age_group TEXT NOT NULL DEFAULT 'young',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security but allow public access for leaderboard
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view the leaderboard
CREATE POLICY "Anyone can view leaderboard"
ON public.leaderboard
FOR SELECT
USING (true);

-- Allow anyone to insert their score (no auth required for game)
CREATE POLICY "Anyone can add their score"
ON public.leaderboard
FOR INSERT
WITH CHECK (true);

-- Create index for faster sorting
CREATE INDEX idx_leaderboard_score ON public.leaderboard(score DESC);
CREATE INDEX idx_leaderboard_created_at ON public.leaderboard(created_at DESC);