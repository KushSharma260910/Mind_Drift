import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import StartScreen from './StartScreen';
import RaceTrack from './RaceTrack';
import QuizCard from './QuizCard';
import Timer from './Timer';
import PositionIndicator from './PositionIndicator';
import FinishScreen from './FinishScreen';
import { useGameState } from '@/hooks/useGameState';

const RacingGame = () => {
  const {
    gameState,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    timeLeft,
    playerDistance,
    maxDistance,
    competitors,
    lastAnswerResult,
    streak,
    score,
    soundEnabled,
    isAnswering,
    startGame,
    submitAnswer,
    restartGame,
    setSoundEnabled,
    getPlayerPosition,
  } = useGameState();

  if (gameState === 'start') {
    return (
      <StartScreen
        onStart={startGame}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />
    );
  }

  if (gameState === 'finished') {
    return (
      <FinishScreen
        score={score}
        position={getPlayerPosition()}
        maxDistance={maxDistance}
        onRestart={restartGame}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <h1 className="font-racing text-2xl text-primary">QUIZ RACER</h1>
        
        <div className="flex items-center gap-4">
          {/* Timer */}
          <Timer timeLeft={timeLeft} maxTime={8} />
          
          {/* Sound toggle */}
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-primary" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
          </motion.button>
        </div>
      </header>

      {/* Position indicator */}
      <div className="relative z-10 py-2 border-b border-border/30 bg-card/30 backdrop-blur-sm">
        <PositionIndicator
          position={getPlayerPosition()}
          totalCompetitors={competitors.length + 1}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />
      </div>

      {/* Main game area */}
      <main className="flex-1 flex flex-col relative z-10 p-4 overflow-y-auto">
        {/* Race track */}
        <div className="mb-6">
          <RaceTrack
            playerDistance={playerDistance}
            maxDistance={maxDistance}
            lastAnswerResult={lastAnswerResult}
          />
        </div>

        {/* Quiz card */}
        {currentQuestion && (
          <QuizCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            onAnswer={submitAnswer}
            lastAnswerResult={lastAnswerResult}
            isAnswering={isAnswering}
            streak={streak}
          />
        )}
      </main>
    </div>
  );
};

export default RacingGame;
