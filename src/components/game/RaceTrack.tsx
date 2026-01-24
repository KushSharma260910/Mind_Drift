import { motion } from 'framer-motion';
import { AnswerResult } from '@/hooks/useGameState';

interface RaceTrackProps {
  playerDistance: number;
  maxDistance: number;
  lastAnswerResult: AnswerResult;
}

const RaceTrack = ({ playerDistance, maxDistance, lastAnswerResult }: RaceTrackProps) => {
  const playerProgress = (playerDistance / maxDistance) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Track container */}
      <div className="relative bg-track-dark rounded-3xl p-6 border border-border overflow-hidden h-40">
        {/* Road surface with gradient */}
        <div className="absolute inset-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded-2xl" />
        
        {/* Road edge lines */}
        <div className="absolute left-4 right-4 top-6 h-1 bg-foreground/30 rounded-full" />
        <div className="absolute left-4 right-4 bottom-6 h-1 bg-foreground/30 rounded-full" />
        
        {/* Road lane markings - dashed center line */}
        <div className="absolute inset-y-0 left-16 right-16 flex items-center">
          <div className="w-full h-1 flex gap-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex-1 h-full bg-warning/60 rounded" />
            ))}
          </div>
        </div>

        {/* Start line */}
        <div className="absolute left-8 top-6 bottom-6 w-2 bg-foreground/80 rounded-full" />
        <span className="absolute left-4 top-1 text-xs font-racing text-muted-foreground">START</span>

        {/* Finish line - checkered pattern */}
        <div className="absolute right-8 top-6 bottom-6 w-4 flex flex-col">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-1 flex">
              <div className={`flex-1 ${i % 2 === 0 ? 'bg-foreground' : 'bg-background'}`} />
              <div className={`flex-1 ${i % 2 === 0 ? 'bg-background' : 'bg-foreground'}`} />
            </div>
          ))}
        </div>
        <span className="absolute right-4 top-1 text-xs font-racing text-muted-foreground">🏁 FINISH</span>

        {/* Player car - facing right towards finish */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 z-10 ${
            lastAnswerResult === 'correct' ? 'animate-car-move' : ''
          } ${lastAnswerResult === 'wrong' ? 'animate-shake' : ''}`}
          initial={{ left: '5%' }}
          animate={{ 
            left: `${Math.min(playerProgress * 0.75 + 5, 80)}%`,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-full blur-2xl ${
              lastAnswerResult === 'correct' ? 'bg-success' : 
              lastAnswerResult === 'wrong' ? 'bg-destructive' : 'bg-primary/30'
            }`}
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ 
              scale: lastAnswerResult ? 2.5 : 1.5, 
              opacity: lastAnswerResult ? 0.7 : 0.3 
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Speed lines behind the car when moving */}
          {lastAnswerResult === 'correct' && (
            <motion.div className="absolute right-full top-1/2 -translate-y-1/2 flex flex-col gap-1 mr-2">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 bg-gradient-to-l from-primary via-accent to-transparent rounded-full"
                  initial={{ width: 0, opacity: 1 }}
                  animate={{ width: 60, opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                />
              ))}
            </motion.div>
          )}
          
          {/* The car - using 🚗 which naturally faces right */}
          <span className="relative text-6xl drop-shadow-lg">🚗</span>
          
          {/* Exhaust smoke effect */}
          {lastAnswerResult === 'correct' && (
            <motion.div className="absolute right-full top-1/2 -translate-y-1/2 mr-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-muted-foreground/40"
                  initial={{ scale: 0.5, opacity: 0.8, x: 0 }}
                  animate={{ scale: 2, opacity: 0, x: -40, y: (i - 1) * 10 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Progress bar below track */}
      <div className="mt-4 px-2">
        <div className="flex items-center gap-4">
          <span className="text-sm font-racing text-muted-foreground">0%</span>
          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${playerProgress}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </div>
          <span className="text-sm font-racing text-muted-foreground">100%</span>
        </div>
        <div className="text-center mt-2">
          <span className="font-racing text-2xl text-primary">{Math.round(playerProgress)}%</span>
          <span className="text-muted-foreground ml-2">to finish line</span>
        </div>
      </div>
    </div>
  );
};

export default RaceTrack;
