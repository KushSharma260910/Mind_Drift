import { motion } from 'framer-motion';
import { AnswerResult } from '@/hooks/useGameState';

interface RaceTrackProps {
  playerDistance: number;
  maxDistance: number;
  lastAnswerResult: AnswerResult;
  competitors: Array<{ id: string; name: string; distance: number; avatar: string }>;
}

const RaceTrack = ({ playerDistance, maxDistance, lastAnswerResult, competitors }: RaceTrackProps) => {
  const playerProgress = (playerDistance / maxDistance) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Track container */}
      <div className="relative bg-track-dark rounded-2xl p-4 border border-border overflow-hidden">
        {/* Track background with lanes */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full track-lines" />
        </div>

        {/* Start and Finish markers */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-racing text-muted-foreground rotate-90 origin-center">
          START
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-racing text-muted-foreground rotate-90 origin-center">
          🏁
        </div>

        {/* Competitors lanes */}
        <div className="space-y-2 py-2">
          {/* AI Competitors */}
          {competitors.map((comp, index) => (
            <div key={comp.id} className="relative h-8">
              {/* Lane */}
              <div className="absolute inset-0 bg-muted/20 rounded-lg" />
              
              {/* Car */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 text-xl"
                initial={{ left: '2%' }}
                animate={{ 
                  left: `${Math.min((comp.distance / maxDistance) * 90 + 2, 92)}%` 
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                {comp.avatar}
              </motion.div>
              
              {/* Name tag */}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                {comp.name}
              </span>
            </div>
          ))}

          {/* Player lane - highlighted */}
          <div className="relative h-12 mt-2">
            {/* Player lane background */}
            <div className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/30" />
            
            {/* Speed lines effect when correct */}
            {lastAnswerResult === 'correct' && (
              <motion.div
                className="absolute inset-y-0 left-0 w-full overflow-hidden rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-0.5 bg-gradient-to-r from-primary to-transparent"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${playerProgress - 20}%`,
                      width: '60px',
                    }}
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  />
                ))}
              </motion.div>
            )}

            {/* Player car */}
            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 text-3xl z-10 ${
                lastAnswerResult === 'correct' ? 'animate-car-move' : ''
              } ${lastAnswerResult === 'wrong' ? 'animate-shake' : ''}`}
              initial={{ left: '2%' }}
              animate={{ 
                left: `${Math.min(playerProgress * 0.9 + 2, 92)}%`,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-full blur-xl ${
                  lastAnswerResult === 'correct' ? 'bg-success' : 
                  lastAnswerResult === 'wrong' ? 'bg-destructive' : 'bg-transparent'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: lastAnswerResult ? 2 : 0, 
                  opacity: lastAnswerResult ? 0.6 : 0 
                }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">🏎️</span>
            </motion.div>

            {/* YOU label */}
            <motion.span 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-racing text-primary font-bold"
              animate={{ 
                textShadow: lastAnswerResult === 'correct' 
                  ? ['0 0 10px hsl(var(--success))', '0 0 20px hsl(var(--success))', '0 0 10px hsl(var(--success))']
                  : '0 0 0 transparent'
              }}
              transition={{ duration: 0.5 }}
            >
              YOU
            </motion.span>
          </div>
        </div>

        {/* Progress markers */}
        <div className="flex justify-between mt-4 px-8">
          {[0, 25, 50, 75, 100].map((marker) => (
            <div key={marker} className="flex flex-col items-center">
              <div className={`w-1 h-3 rounded ${
                playerProgress >= marker ? 'bg-primary' : 'bg-muted'
              }`} />
              <span className="text-[10px] text-muted-foreground mt-1">{marker}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distance indicator */}
      <div className="flex justify-between items-center mt-3 px-2">
        <span className="text-sm text-muted-foreground">
          Distance: <span className="font-racing text-primary">{Math.round(playerDistance)}</span> / {maxDistance}
        </span>
        <span className="text-sm text-muted-foreground">
          Progress: <span className="font-racing text-primary">{Math.round(playerProgress)}%</span>
        </span>
      </div>
    </div>
  );
};

export default RaceTrack;
