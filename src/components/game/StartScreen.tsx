import { useState } from 'react';
import { motion } from 'framer-motion';
import { AgeGroup } from '@/data/questions';
import { Volume2, VolumeX, Trophy, Zap, Brain, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StartScreenProps {
  onStart: (ageGroup: AgeGroup, playerName: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const StartScreen = ({ onStart, soundEnabled, onToggleSound }: StartScreenProps) => {
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleStart = (ageGroup: AgeGroup) => {
    const trimmedName = playerName.trim();
    if (!trimmedName) {
      setNameError('Please enter your name to start!');
      return;
    }
    if (trimmedName.length > 20) {
      setNameError('Name must be 20 characters or less');
      return;
    }
    setNameError('');
    onStart(ageGroup, trimmedName);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '10%', right: '10%' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Sound toggle */}
      <motion.button
        onClick={onToggleSound}
        className="absolute top-4 right-4 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-muted transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {soundEnabled ? (
          <Volume2 className="w-6 h-6 text-primary" />
        ) : (
          <VolumeX className="w-6 h-6 text-muted-foreground" />
        )}
      </motion.button>

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo/Title */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🚗
          </motion.div>
          <h1 className="font-racing text-5xl md:text-6xl font-bold mb-2 neon-text text-primary">
            QUIZ RACER
          </h1>
          <p className="text-xl text-muted-foreground">
            Answer fast. Race faster.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm">20 Questions</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm">Speed Bonus</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border">
            <Trophy className="w-4 h-4 text-warning" />
            <span className="text-sm">Leaderboard</span>
          </div>
        </motion.div>

        {/* Player Name Input */}
        <motion.div
          className="mb-8 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter your name..."
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setNameError('');
              }}
              maxLength={20}
              className="pl-12 py-6 text-lg font-racing bg-card/80 border-2 border-primary/30 focus:border-primary text-center placeholder:text-muted-foreground/60"
            />
          </div>
          {nameError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm mt-2"
            >
              {nameError}
            </motion.p>
          )}
        </motion.div>

        {/* Age group selection */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-racing text-xl text-muted-foreground mb-6">
            Select Your Category
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleStart('young')}
                className="w-full sm:w-auto px-8 py-6 text-lg font-racing bg-gradient-to-r from-neon-cyan to-primary hover:opacity-90 text-primary-foreground neon-box-cyan"
                size="lg"
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">🎓</span>
                  <span>Ages 10-15</span>
                  <span className="text-xs opacity-80">Easy-Medium</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleStart('adult')}
                className="w-full sm:w-auto px-8 py-6 text-lg font-racing bg-gradient-to-r from-secondary to-neon-orange hover:opacity-90 text-secondary-foreground neon-box-orange"
                size="lg"
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">🎯</span>
                  <span>Ages 15+</span>
                  <span className="text-xs opacity-80">Medium-Hard</span>
                </div>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Instructions hint */}
        <motion.p
          className="mt-10 text-sm text-muted-foreground max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Answer questions correctly to advance your car. The faster you answer, the more distance you gain!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default StartScreen;
