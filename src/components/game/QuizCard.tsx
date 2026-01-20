import { motion } from 'framer-motion';
import { Question } from '@/data/questions';
import { AnswerResult } from '@/hooks/useGameState';
import { Check, X } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
  lastAnswerResult: AnswerResult;
  isAnswering: boolean;
  streak: number;
}

const QuizCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  lastAnswerResult,
  isAnswering,
  streak,
}: QuizCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10 border-success/30';
      case 'medium': return 'text-warning bg-warning/10 border-warning/30';
      case 'hard': return 'text-destructive bg-destructive/10 border-destructive/30';
      default: return 'text-muted-foreground bg-muted/10 border-muted/30';
    }
  };

  return (
    <motion.div
      key={question.id}
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <span className="font-racing text-lg text-primary">
            Q{questionNumber}/{totalQuestions}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full border font-medium capitalize ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
            {question.category}
          </span>
        </div>
        
        {/* Streak indicator */}
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/40"
          >
            <span className="text-lg">🔥</span>
            <span className="font-racing text-secondary text-sm">{streak}</span>
          </motion.div>
        )}
      </div>

      {/* Question card */}
      <div className={`gradient-card rounded-2xl p-6 border border-border shadow-card relative overflow-hidden ${
        lastAnswerResult === 'correct' ? 'animate-glow-success' : 
        lastAnswerResult === 'wrong' ? 'animate-glow-error' : ''
      }`}>
        {/* Result overlay */}
        {lastAnswerResult && (
          <motion.div
            className={`absolute inset-0 flex items-center justify-center ${
              lastAnswerResult === 'correct' ? 'bg-success/20' : 'bg-destructive/20'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                lastAnswerResult === 'correct' ? 'bg-success' : 'bg-destructive'
              }`}
            >
              {lastAnswerResult === 'correct' ? (
                <Check className="w-10 h-10 text-success-foreground" />
              ) : (
                <X className="w-10 h-10 text-destructive-foreground" />
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Question text */}
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6 text-center leading-relaxed">
          {question.question}
        </h2>

        {/* Options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !isAnswering && onAnswer(index)}
              disabled={isAnswering}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                isAnswering
                  ? lastAnswerResult && index === question.correctAnswer
                    ? 'border-success bg-success/20 text-success'
                    : 'border-border bg-muted/30 text-muted-foreground cursor-not-allowed'
                  : 'border-border bg-card/50 hover:border-primary hover:bg-primary/10 cursor-pointer'
              }`}
              whileHover={!isAnswering ? { scale: 1.02 } : {}}
              whileTap={!isAnswering ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  isAnswering && index === question.correctAnswer
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 font-medium">{option}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard;
