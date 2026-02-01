import { useCallback, useRef, useEffect } from 'react';

// Create audio context lazily to avoid issues with browser autoplay policies
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const useSoundEffects = (enabled: boolean = true) => {
  const backgroundOscillatorRef = useRef<OscillatorNode | null>(null);
  const backgroundGainRef = useRef<GainNode | null>(null);
  const isPlayingBackgroundRef = useRef(false);

  // Play a correct answer "ding" sound
  const playCorrect = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Pleasant ding sound - two quick ascending notes
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
      oscillator.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.1); // C#6
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.log('Sound effect not available');
    }
  }, [enabled]);

  // Play a wrong answer "buzzer" sound
  const playWrong = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Buzzer sound - low frequency with slight wobble
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      oscillator.frequency.setValueAtTime(120, ctx.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(100, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.log('Sound effect not available');
    }
  }, [enabled]);

  // Play a tick/countdown sound
  const playTick = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.log('Sound effect not available');
    }
  }, [enabled]);

  // Play engine revving/acceleration sound
  const playAccelerate = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Engine rev - rising frequency
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(80, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
      oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.log('Sound effect not available');
    }
  }, [enabled]);

  // Start background racing ambiance
  const startBackgroundMusic = useCallback(() => {
    if (!enabled || isPlayingBackgroundRef.current) return;
    
    try {
      const ctx = getAudioContext();
      
      // Create a subtle racing ambiance with multiple oscillators
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(60, ctx.currentTime);
      bassGain.gain.setValueAtTime(0.08, ctx.currentTime);
      
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      
      // Add subtle LFO for engine-like pulsing
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4, ctx.currentTime);
      lfoGain.gain.setValueAtTime(10, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(bassOsc.frequency);
      
      bassOsc.start(ctx.currentTime);
      lfo.start(ctx.currentTime);
      
      backgroundOscillatorRef.current = bassOsc;
      backgroundGainRef.current = bassGain;
      isPlayingBackgroundRef.current = true;
    } catch (e) {
      console.log('Background music not available');
    }
  }, [enabled]);

  // Stop background racing ambiance
  const stopBackgroundMusic = useCallback(() => {
    if (backgroundOscillatorRef.current && backgroundGainRef.current) {
      try {
        const ctx = getAudioContext();
        backgroundGainRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        setTimeout(() => {
          backgroundOscillatorRef.current?.stop();
          backgroundOscillatorRef.current = null;
          backgroundGainRef.current = null;
          isPlayingBackgroundRef.current = false;
        }, 500);
      } catch (e) {
        backgroundOscillatorRef.current = null;
        backgroundGainRef.current = null;
        isPlayingBackgroundRef.current = false;
      }
    }
  }, []);

  // Play victory fanfare with cheering
  const playVictory = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getAudioContext();
      
      // Fanfare notes
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        const startTime = ctx.currentTime + index * 0.15;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
      
      // Add "cheering" noise effect
      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2000, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.5, ctx.currentTime);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.3);
      noiseGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.8);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noise.start(ctx.currentTime + 0.2);
      noise.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.log('Victory sound not available');
    }
  }, [enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopBackgroundMusic();
    };
  }, [stopBackgroundMusic]);

  return {
    playCorrect,
    playWrong,
    playTick,
    playAccelerate,
    playVictory,
    startBackgroundMusic,
    stopBackgroundMusic,
  };
};
