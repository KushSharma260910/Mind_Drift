import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, Medal, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  id: string;
  player_name: string;
  score: number;
  correct_answers: number;
  total_time: number;
  accuracy: number;
  age_group: string;
  created_at: string;
}

interface LeaderboardProps {
  onBack: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Leaderboard = ({ onBack }: LeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'young' | 'adult'>('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    let query = supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(50);
    
    if (filter !== 'all') {
      query = query.eq('age_group', filter);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching leaderboard:', error);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl" style={{ top: '10%', left: '10%' }} />
        <div className="absolute w-80 h-80 rounded-full bg-secondary/5 blur-3xl" style={{ bottom: '10%', right: '10%' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="font-racing"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <h1 className="font-racing text-3xl text-primary neon-text flex items-center gap-3">
          <Trophy className="w-8 h-8" />
          Leaderboard
        </h1>
        
        <div className="w-20" />
      </div>

      {/* Filter tabs */}
      <div className="relative z-10 flex justify-center gap-2 mb-6">
        {(['all', 'young', 'adult'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            className="font-racing capitalize"
          >
            {f === 'all' ? 'All Players' : f === 'young' ? 'Ages 10-15' : 'Ages 15+'}
          </Button>
        ))}
      </div>

      {/* Leaderboard table */}
      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <motion.div
              className="text-4xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              🚗
            </motion.div>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16">
            <Medal className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground font-racing">No scores yet!</p>
            <p className="text-muted-foreground mt-2">Be the first to race!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2 text-sm text-muted-foreground font-medium">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Player</div>
              <div className="col-span-2 text-center">Score</div>
              <div className="col-span-2 text-center">Accuracy</div>
              <div className="col-span-2 text-center">Time</div>
              <div className="col-span-2 text-center">Category</div>
            </div>

            {/* Entries */}
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-12 gap-2 px-4 py-3 rounded-xl border ${
                  index < 3 
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30' 
                    : 'bg-card/50 border-border'
                }`}
              >
                <div className="col-span-1 flex items-center">
                  {getMedalIcon(index) || (
                    <span className="text-muted-foreground font-racing">{index + 1}</span>
                  )}
                </div>
                <div className="col-span-3 flex items-center font-racing text-foreground truncate">
                  {entry.player_name}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <span className={`font-racing text-lg ${index < 3 ? 'text-primary' : 'text-foreground'}`}>
                    {entry.score}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-1">
                  <Target className="w-4 h-4 text-success" />
                  <span className="text-success">{entry.accuracy}%</span>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span className="text-secondary">{formatTime(entry.total_time)}</span>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    entry.age_group === 'young' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-secondary/20 text-secondary'
                  }`}>
                    {entry.age_group === 'young' ? '10-15' : '15+'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
