import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Zap, Clock, RotateCcw, Share2, Medal } from 'lucide-react';
import Confetti from './Confetti';

interface FinishScreenProps {
  score: {
    totalDistance: number;
    correctAnswers: number;
    wrongAnswers: number;
    averageTime: number;
    streakBonus: number;
    totalTime: number;
  };
  playerName: string;
  maxDistance: number;
  onRestart: () => void;
  onShowLeaderboard: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const FinishScreen = ({ score, playerName, maxDistance, onRestart, onShowLeaderboard }: FinishScreenProps) => {
  const accuracy = Math.round((score.correctAnswers / 20) * 100);
  const isGoodScore = accuracy >= 70;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti for good scores */}
      {isGoodScore && <Confetti />}

      {/* Background celebration */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        className="text-center z-10 max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Trophy */}
        <motion.div
          className="mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <motion.span
            className="text-8xl inline-block"
            animate={{
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {isGoodScore ? '🏆' : '🏁'}
          </motion.span>
        </motion.div>

        {/* Player name and message */}
        <motion.h1
          className={`font-racing text-4xl md:text-5xl font-bold mb-2 ${isGoodScore ? 'text-warning neon-text' : 'text-primary'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isGoodScore ? 'GREAT RACE!' : 'RACE COMPLETE!'}
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Well done, <span className="text-primary font-racing">{playerName}</span>!
        </motion.p>

        <motion.p
          className="text-lg text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your score has been saved to the leaderboard!
        </motion.p>

        {/* Total Time - Featured */}
        <motion.div
          className="mb-6 gradient-card p-6 rounded-2xl border-2 border-primary/50 neon-box-cyan"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-primary" />
            <span className="text-lg text-muted-foreground font-medium">Total Race Time</span>
          </div>
          <span className="font-racing text-5xl text-primary neon-text">{formatTime(score.totalTime)}</span>
          <p className="text-sm text-muted-foreground mt-2">
            {score.totalTime < 180 ? '⚡ Lightning Fast!' : score.totalTime < 300 ? '🔥 Great Speed!' : '🏁 Race Complete!'}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="gradient-card p-4 rounded-xl border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
            <span className="font-racing text-3xl text-success">{accuracy}%</span>
            <p className="text-xs text-muted-foreground mt-1">
              {score.correctAnswers}/20 correct
            </p>
          </div>

          <div className="gradient-card p-4 rounded-xl border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Score</span>
            </div>
            <span className="font-racing text-3xl text-primary">
              {Math.round(score.totalDistance)}
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              points earned
            </p>
          </div>

          <div className="gradient-card p-4 rounded-xl border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">Avg Time</span>
            </div>
            <span className="font-racing text-3xl text-secondary">
              {score.averageTime.toFixed(1)}s
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              per question
            </p>
          </div>

          <div className="gradient-card p-4 rounded-xl border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-warning" />
              <span className="text-sm text-muted-foreground">Streak Bonus</span>
            </div>
            <span className="font-racing text-3xl text-warning">
              +{Math.round(score.streakBonus)}
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              bonus points
            </p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onRestart}
            size="lg"
            className="font-racing text-lg px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 neon-box-cyan"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Race Again
          </Button>
          
          <Button
            onClick={onShowLeaderboard}
            variant="outline"
            size="lg"
            className="font-racing text-lg px-8"
          >
            <Medal className="w-5 h-5 mr-2" />
            Leaderboard
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="font-racing text-lg px-8"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Quiz Racer',
                  text: `I scored ${Math.round(score.totalDistance)} points with ${accuracy}% accuracy in Quiz Racer! 🚗`,
                });
              }
            }}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinishScreen;
