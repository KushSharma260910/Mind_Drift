import { motion } from 'framer-motion';

interface PositionIndicatorProps {
  position: number;
  totalCompetitors: number;
  questionNumber: number;
  totalQuestions: number;
}

const PositionIndicator = ({ position, totalCompetitors, questionNumber, totalQuestions }: PositionIndicatorProps) => {
  const getPositionColor = () => {
    switch (position) {
      case 1: return 'text-warning bg-warning/20 border-warning';
      case 2: return 'text-muted-foreground bg-muted/20 border-muted-foreground';
      case 3: return 'text-secondary bg-secondary/20 border-secondary';
      default: return 'text-muted-foreground bg-muted/10 border-muted';
    }
  };

  const getPositionSuffix = (pos: number) => {
    if (pos === 1) return 'st';
    if (pos === 2) return 'nd';
    if (pos === 3) return 'rd';
    return 'th';
  };

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto px-4 py-3">
      {/* Position */}
      <motion.div
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${getPositionColor()}`}
        key={position}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {position === 1 && <span className="text-xl">🥇</span>}
        {position === 2 && <span className="text-xl">🥈</span>}
        {position === 3 && <span className="text-xl">🥉</span>}
        <span className="font-racing text-lg">
          {position}{getPositionSuffix(position)}
        </span>
        <span className="text-sm opacity-70">/ {totalCompetitors}</span>
      </motion.div>

      {/* Progress bar */}
      <div className="flex-1 mx-6">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
      </div>

      {/* Questions remaining */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
        <span className="text-muted-foreground text-sm">Remaining:</span>
        <span className="font-racing text-primary text-lg">{totalQuestions - questionNumber}</span>
      </div>
    </div>
  );
};

export default PositionIndicator;
