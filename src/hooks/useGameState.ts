import { useState, useCallback, useEffect, useRef } from 'react';
import { Question, AgeGroup, generateGameQuestions } from '@/data/questions';

export type GameState = 'start' | 'playing' | 'finished';
export type AnswerResult = 'correct' | 'wrong' | null;

interface GameScore {
  totalDistance: number;
  correctAnswers: number;
  wrongAnswers: number;
  averageTime: number;
  streakBonus: number;
  totalTime: number;
}

interface Competitor {
  id: string;
  name: string;
  distance: number;
  avatar: string;
}

// Generate AI competitors with varying skill levels
const generateCompetitors = (): Competitor[] => {
  const names = ['SpeedRacer', 'QuizMaster', 'BrainStorm', 'SwiftMind'];
  const avatars = ['🚗', '🏎️', '🚙', '🚕'];
  
  return names.map((name, i) => ({
    id: `comp-${i}`,
    name,
    distance: 0,
    avatar: avatars[i],
  }));
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('young');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [playerDistance, setPlayerDistance] = useState(0);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [lastAnswerResult, setLastAnswerResult] = useState<AnswerResult>(null);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState<GameScore>({
    totalDistance: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    averageTime: 0,
    streakBonus: 0,
    totalTime: 0,
  });
  const [answerTimes, setAnswerTimes] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAnswering, setIsAnswering] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const competitorTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = 30;
  const maxDistance = 1000; // Race distance in units

  // Calculate distance gained based on time remaining
  const calculateDistance = (timeRemaining: number, isCorrect: boolean): number => {
    if (!isCorrect) return 0;
    
    // Base distance + time bonus
    const baseDistance = maxDistance / totalQuestions; // ~33.3 per question
    const timeBonus = (timeRemaining / 8) * 10; // Up to 10 bonus for fast answers
    const streakMultiplier = 1 + (streak * 0.1); // 10% bonus per streak
    
    return Math.round((baseDistance + timeBonus) * streakMultiplier);
  };

  // Update AI competitors
  const updateCompetitors = useCallback(() => {
    setCompetitors(prev => prev.map(comp => {
      // Random progress based on "skill level"
      const skillFactor = Math.random() * 0.8 + 0.5; // 0.5 to 1.3
      const baseProgress = (maxDistance / totalQuestions) * skillFactor;
      const newDistance = Math.min(comp.distance + baseProgress, maxDistance);
      
      return { ...comp, distance: newDistance };
    }));
  }, []);

  // Start game
  const startGame = useCallback((selectedAgeGroup: AgeGroup) => {
    setAgeGroup(selectedAgeGroup);
    setQuestions(generateGameQuestions(selectedAgeGroup, totalQuestions));
    setCurrentQuestionIndex(0);
    setPlayerDistance(0);
    setCompetitors(generateCompetitors());
    setTimeLeft(8);
    setStreak(0);
    setScore({
      totalDistance: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      averageTime: 0,
      streakBonus: 0,
      totalTime: 0,
    });
    setAnswerTimes([]);
    setLastAnswerResult(null);
    setGameStartTime(Date.now());
    setGameState('playing');
  }, []);

  // Handle answer
  const submitAnswer = useCallback((answerIndex: number) => {
    if (isAnswering || !currentQuestion) return;
    
    setIsAnswering(true);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const answerTime = 8 - timeLeft;
    
    setLastAnswerResult(isCorrect ? 'correct' : 'wrong');
    setAnswerTimes(prev => [...prev, answerTime]);
    
    if (isCorrect) {
      const distanceGained = calculateDistance(timeLeft, true);
      setPlayerDistance(prev => Math.min(prev + distanceGained, maxDistance));
      setStreak(prev => prev + 1);
      setScore(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        totalDistance: prev.totalDistance + distanceGained,
        streakBonus: prev.streakBonus + (streak > 0 ? distanceGained * 0.1 : 0),
      }));
    } else {
      setStreak(0);
      setScore(prev => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }

    // Update competitors
    updateCompetitors();

    // Move to next question after delay
    setTimeout(() => {
      setLastAnswerResult(null);
      setIsAnswering(false);
      
      if (currentQuestionIndex + 1 >= totalQuestions) {
        // Calculate final stats
        const avgTime = answerTimes.length > 0 
          ? answerTimes.reduce((a, b) => a + b, 0) / answerTimes.length 
          : 0;
        const totalTimeTaken = (Date.now() - gameStartTime) / 1000; // in seconds
        setScore(prev => ({ ...prev, averageTime: avgTime, totalTime: totalTimeTaken }));
        setGameState('finished');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(8);
      }
    }, 1000);
  }, [currentQuestion, currentQuestionIndex, isAnswering, timeLeft, streak, answerTimes, updateCompetitors]);

  // Handle timeout
  const handleTimeout = useCallback(() => {
    if (isAnswering) return;
    submitAnswer(-1); // -1 indicates timeout
  }, [isAnswering, submitAnswer]);

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing' || isAnswering) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, isAnswering, handleTimeout]);

  // Restart game
  const restartGame = useCallback(() => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setPlayerDistance(0);
    setTimeLeft(8);
    setStreak(0);
    setLastAnswerResult(null);
  }, []);

  // Get player position in race
  const getPlayerPosition = useCallback(() => {
    const allDistances = [
      { id: 'player', distance: playerDistance },
      ...competitors.map(c => ({ id: c.id, distance: c.distance })),
    ].sort((a, b) => b.distance - a.distance);
    
    const position = allDistances.findIndex(d => d.id === 'player') + 1;
    return position;
  }, [playerDistance, competitors]);

  return {
    gameState,
    ageGroup,
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
  };
};
