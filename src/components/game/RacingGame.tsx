import { useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import StartScreen from './StartScreen';
import RaceTrack from './RaceTrack';
import QuizCard from './QuizCard';
import Timer from './Timer';
import FinishScreen from './FinishScreen';
import Leaderboard from './Leaderboard';
import { useGameState } from '@/hooks/useGameState';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const RacingGame = () => {
  const {
    gameState,
    playerName,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    timeLeft,
    playerDistance,
    maxDistance,
    lastAnswerResult,
    streak,
    score,
    soundEnabled,
    isAnswering,
    startGame,
    submitAnswer,
    restartGame,
    setSoundEnabled,
    showLeaderboard,
  } = useGameState();

  const {
    playCorrect,
    playWrong,
    playTick,
    playAccelerate,
    playVictory,
    startBackgroundMusic,
    stopBackgroundMusic,
  } = useSoundEffects(soundEnabled);

  // Play sounds based on answer result
  useEffect(() => {
    if (lastAnswerResult === 'correct') {
      playCorrect();
      playAccelerate();
    } else if (lastAnswerResult === 'wrong') {
      playWrong();
    }
  }, [lastAnswerResult, playCorrect, playWrong, playAccelerate]);

  // Play tick sound on timer countdown
  useEffect(() => {
    if (gameState === 'playing' && !isAnswering && timeLeft > 0) {
      playTick(timeLeft);
    }
  }, [timeLeft, gameState, isAnswering, playTick]);

  // Handle background music based on game state
  useEffect(() => {
    if (gameState === 'playing') {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [gameState, startBackgroundMusic, stopBackgroundMusic]);

  // Play victory sound when game finishes
  useEffect(() => {
    if (gameState === 'finished') {
      playVictory();
    }
  }, [gameState, playVictory]);

  if (gameState === 'start') {
    return (
      <StartScreen
        onStart={startGame}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />
    );
  }

  if (gameState === 'leaderboard') {
    return (
      <Leaderboard onBack={restartGame} />
    );
  }

  if (gameState === 'finished') {
    return (
      <FinishScreen
        score={score}
        playerName={playerName}
        maxDistance={maxDistance}
        onRestart={restartGame}
        onShowLeaderboard={showLeaderboard}
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
        <div className="flex items-center gap-3">
          <h1 className="font-racing text-2xl text-primary">QUIZ RACER</h1>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="font-racing text-sm text-foreground">{playerName}</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Timer */}
          <Timer timeLeft={timeLeft} maxTime={15} />
          
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

      {/* Progress indicator */}
      <div className="relative z-10 py-3 px-4 border-b border-border/30 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <span className="font-racing text-primary">
            Q{currentQuestionIndex + 1}/{totalQuestions}
          </span>
          
          <div className="flex-1 mx-6">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            {totalQuestions - currentQuestionIndex - 1} remaining
          </span>
        </div>
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
            timeLeft={timeLeft}
          />
        )}
      </main>
    </div>
  );
};

export default RacingGame;
