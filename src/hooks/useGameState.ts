import { useState, useCallback, useEffect, useRef } from 'react';
import { Question, AgeGroup, generateGameQuestions } from '@/data/questions';
import { supabase } from '@/integrations/supabase/client';

export type GameState = 'start' | 'playing' | 'finished' | 'leaderboard';
export type AnswerResult = 'correct' | 'wrong' | null;

interface GameScore {
  totalDistance: number;
  correctAnswers: number;
  wrongAnswers: number;
  averageTime: number;
  streakBonus: number;
  totalTime: number;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('young');
  const [playerName, setPlayerName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [playerDistance, setPlayerDistance] = useState(0);
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
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameStartTimeRef = useRef<number>(0);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = 30;
  const maxDistance = 1000;

  const calculateDistance = (timeRemaining: number, isCorrect: boolean): number => {
    if (!isCorrect) return 0;
    
    const baseDistance = maxDistance / totalQuestions;
    const timeBonus = (timeRemaining / 8) * 10;
    const streakMultiplier = 1 + (streak * 0.1);
    
    return Math.round((baseDistance + timeBonus) * streakMultiplier);
  };

  const saveToLeaderboard = async (finalScore: GameScore) => {
    const accuracy = Math.round((finalScore.correctAnswers / totalQuestions) * 100);
    
    const { error } = await supabase
      .from('leaderboard')
      .insert({
        player_name: playerName,
        score: Math.round(finalScore.totalDistance),
        correct_answers: finalScore.correctAnswers,
        total_time: finalScore.totalTime,
        accuracy: accuracy,
        age_group: ageGroup,
      });
    
    if (error) {
      console.error('Error saving to leaderboard:', error);
    }
  };

  const startGame = useCallback((selectedAgeGroup: AgeGroup, name: string) => {
    setAgeGroup(selectedAgeGroup);
    setPlayerName(name);
    setQuestions(generateGameQuestions(selectedAgeGroup, totalQuestions));
    setCurrentQuestionIndex(0);
    setPlayerDistance(0);
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
    gameStartTimeRef.current = Date.now();
    setGameState('playing');
  }, []);

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

    setTimeout(() => {
      setLastAnswerResult(null);
      setIsAnswering(false);
      
      if (currentQuestionIndex + 1 >= totalQuestions) {
        const avgTime = answerTimes.length > 0 
          ? answerTimes.reduce((a, b) => a + b, 0) / answerTimes.length 
          : 0;
        const totalTimeTaken = (Date.now() - gameStartTimeRef.current) / 1000;
        
        const finalScore = {
          ...score,
          correctAnswers: score.correctAnswers + (isCorrect ? 1 : 0),
          totalDistance: score.totalDistance + (isCorrect ? calculateDistance(timeLeft, true) : 0),
          averageTime: avgTime,
          totalTime: totalTimeTaken,
        };
        
        setScore(finalScore);
        saveToLeaderboard(finalScore);
        setGameState('finished');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(8);
      }
    }, 1000);
  }, [currentQuestion, currentQuestionIndex, isAnswering, timeLeft, streak, answerTimes, score]);

  const handleTimeout = useCallback(() => {
    if (isAnswering) return;
    submitAnswer(-1);
  }, [isAnswering, submitAnswer]);

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

  const restartGame = useCallback(() => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setPlayerDistance(0);
    setTimeLeft(8);
    setStreak(0);
    setLastAnswerResult(null);
  }, []);

  const showLeaderboard = useCallback(() => {
    setGameState('leaderboard');
  }, []);

  return {
    gameState,
    ageGroup,
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
  };
};
