-- Add policy to allow anyone to delete from leaderboard
CREATE POLICY "Anyone can delete leaderboard entries"
ON public.leaderboard
FOR DELETE
USING (true);