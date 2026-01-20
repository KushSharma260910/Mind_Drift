import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Zap, Clock, RotateCcw, Share2 } from 'lucide-react';
import Confetti from './Confetti';

interface FinishScreenProps {
  score: {
    totalDistance: number;
    correctAnswers: number;
    wrongAnswers: number;
    averageTime: number;
    streakBonus: number;
  };
  position: number;
  maxDistance: number;
  onRestart: () => void;
}

const FinishScreen = ({ score, position, maxDistance, onRestart }: FinishScreenProps) => {
  const accuracy = Math.round((score.correctAnswers / 30) * 100);
  const isWinner = position === 1;
  const isTopThree = position <= 3;

  const getPositionMessage = () => {
    switch (position) {
      case 1: return { text: 'CHAMPION!', emoji: '🏆', color: 'text-warning' };
      case 2: return { text: 'SILVER!', emoji: '🥈', color: 'text-muted-foreground' };
      case 3: return { text: 'BRONZE!', emoji: '🥉', color: 'text-secondary' };
      default: return { text: `${position}th Place`, emoji: '🏁', color: 'text-muted-foreground' };
    }
  };

  const positionInfo = getPositionMessage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti for winners */}
      {isTopThree && <Confetti />}

      {/* Background celebration */}
      {isWinner && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute w-full h-full bg-gradient-to-r from-warning/5 via-transparent to-warning/5"
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </motion.div>
      )}

      <motion.div
        className="text-center z-10 max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Trophy/Position */}
        <motion.div
          className="mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <motion.span
            className="text-8xl inline-block"
            animate={isWinner ? {
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {positionInfo.emoji}
          </motion.span>
        </motion.div>

        {/* Position text */}
        <motion.h1
          className={`font-racing text-5xl md:text-6xl font-bold mb-2 ${positionInfo.color} ${isWinner ? 'neon-text' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {positionInfo.text}
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Race Complete!
        </motion.p>

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
              {score.correctAnswers}/30 correct
            </p>
          </div>

          <div className="gradient-card p-4 rounded-xl border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Distance</span>
            </div>
            <span className="font-racing text-3xl text-primary">
              {Math.round(score.totalDistance)}
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              / {maxDistance} total
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
            variant="outline"
            size="lg"
            className="font-racing text-lg px-8"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Quiz Racer',
                  text: `I finished ${position}${position === 1 ? 'st' : position === 2 ? 'nd' : position === 3 ? 'rd' : 'th'} with ${accuracy}% accuracy in Quiz Racer! 🏎️`,
                });
              }
            }}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Result
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinishScreen;
