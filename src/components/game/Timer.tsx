import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TimerProps {
  timeLeft: number;
  maxTime: number;
}

const Timer = ({ timeLeft, maxTime }: TimerProps) => {
  const [isUrgent, setIsUrgent] = useState(false);
  const percentage = (timeLeft / maxTime) * 100;
  
  useEffect(() => {
    setIsUrgent(timeLeft <= 3);
  }, [timeLeft]);

  const getColor = () => {
    if (timeLeft <= 3) return 'hsl(var(--destructive))';
    if (timeLeft <= 5) return 'hsl(var(--warning))';
    return 'hsl(var(--primary))';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Circular timer */}
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={264}
            initial={{ strokeDashoffset: 0 }}
            animate={{ 
              strokeDashoffset: 264 - (264 * percentage) / 100,
              stroke: getColor(),
            }}
            transition={{ duration: 0.3 }}
            style={{
              filter: isUrgent ? `drop-shadow(0 0 10px ${getColor()})` : 'none',
            }}
          />
        </svg>
        
        {/* Timer number */}
        <motion.div
          className={`absolute inset-0 flex items-center justify-center font-racing text-2xl font-bold ${
            isUrgent ? 'animate-countdown-urgent text-destructive' : 'text-foreground'
          }`}
          animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3, repeat: isUrgent ? Infinity : 0 }}
        >
          {timeLeft}
        </motion.div>
      </div>
      
      {/* Label */}
      <span className={`text-xs font-medium uppercase tracking-wider ${
        isUrgent ? 'text-destructive' : 'text-muted-foreground'
      }`}>
        {isUrgent ? 'HURRY!' : 'SECONDS'}
      </span>
    </div>
  );
};

export default Timer;
