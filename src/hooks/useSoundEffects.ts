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
  const backgroundNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gains: GainNode[];
    masterGain: GainNode | null;
  }>({ oscillators: [], gains: [], masterGain: null });
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
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      oscillator.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.1);
      
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

  // Play a tick/countdown sound - more intense clock tick
  const playTick = useCallback((timeLeft: number) => {
    if (!enabled) return;
    
    try {
      const ctx = getAudioContext();
      
      // Create multiple layers for a more mechanical tick
      const tickOsc = ctx.createOscillator();
      const clickOsc = ctx.createOscillator();
      const tickGain = ctx.createGain();
      const clickGain = ctx.createGain();
      
      // Higher pitch when time is running low
      const urgency = timeLeft <= 5 ? 1.5 : timeLeft <= 10 ? 1.2 : 1;
      const volume = timeLeft <= 5 ? 0.25 : timeLeft <= 10 ? 0.15 : 0.1;
      
      // Main tick - sharp attack
      tickOsc.type = 'square';
      tickOsc.frequency.setValueAtTime(800 * urgency, ctx.currentTime);
      tickOsc.frequency.exponentialRampToValueAtTime(400 * urgency, ctx.currentTime + 0.03);
      
      tickGain.gain.setValueAtTime(volume, ctx.currentTime);
      tickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      tickOsc.connect(tickGain);
      tickGain.connect(ctx.destination);
      
      // Click layer for metallic feel
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(2000 * urgency, ctx.currentTime);
      
      clickGain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
      
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      
      tickOsc.start(ctx.currentTime);
      tickOsc.stop(ctx.currentTime + 0.1);
      clickOsc.start(ctx.currentTime);
      clickOsc.stop(ctx.currentTime + 0.05);
      
      // Add warning beep when very low on time
      if (timeLeft <= 3) {
        const warningOsc = ctx.createOscillator();
        const warningGain = ctx.createGain();
        
        warningOsc.type = 'sine';
        warningOsc.frequency.setValueAtTime(1000, ctx.currentTime);
        
        warningGain.gain.setValueAtTime(0.2, ctx.currentTime);
        warningGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        
        warningOsc.connect(warningGain);
        warningGain.connect(ctx.destination);
        
        warningOsc.start(ctx.currentTime);
        warningOsc.stop(ctx.currentTime + 0.15);
      }
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

  // Start intense racing background ambiance
  const startBackgroundMusic = useCallback(() => {
    if (!enabled || isPlayingBackgroundRef.current) return;
    
    try {
      const ctx = getAudioContext();
      const oscillators: OscillatorNode[] = [];
      const gains: GainNode[] = [];
      
      // Master gain for overall volume control
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.5);
      masterGain.connect(ctx.destination);
      
      // Deep bass engine rumble
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(45, ctx.currentTime);
      bassGain.gain.setValueAtTime(0.08, ctx.currentTime);
      bassOsc.connect(bassGain);
      bassGain.connect(masterGain);
      oscillators.push(bassOsc);
      gains.push(bassGain);
      
      // Engine mid-frequency
      const midOsc = ctx.createOscillator();
      const midGain = ctx.createGain();
      midOsc.type = 'sawtooth';
      midOsc.frequency.setValueAtTime(90, ctx.currentTime);
      midGain.gain.setValueAtTime(0.04, ctx.currentTime);
      midOsc.connect(midGain);
      midGain.connect(masterGain);
      oscillators.push(midOsc);
      gains.push(midGain);
      
      // LFO for engine-like pulsing on bass
      const lfo1 = ctx.createOscillator();
      const lfo1Gain = ctx.createGain();
      lfo1.frequency.setValueAtTime(6, ctx.currentTime);
      lfo1Gain.gain.setValueAtTime(8, ctx.currentTime);
      lfo1.connect(lfo1Gain);
      lfo1Gain.connect(bassOsc.frequency);
      oscillators.push(lfo1);
      
      // LFO for mid variation
      const lfo2 = ctx.createOscillator();
      const lfo2Gain = ctx.createGain();
      lfo2.frequency.setValueAtTime(4, ctx.currentTime);
      lfo2Gain.gain.setValueAtTime(15, ctx.currentTime);
      lfo2.connect(lfo2Gain);
      lfo2Gain.connect(midOsc.frequency);
      oscillators.push(lfo2);
      
      // High-frequency racing whine
      const whineOsc = ctx.createOscillator();
      const whineGain = ctx.createGain();
      const whineFilter = ctx.createBiquadFilter();
      whineOsc.type = 'sawtooth';
      whineOsc.frequency.setValueAtTime(400, ctx.currentTime);
      whineFilter.type = 'bandpass';
      whineFilter.frequency.setValueAtTime(600, ctx.currentTime);
      whineFilter.Q.setValueAtTime(5, ctx.currentTime);
      whineGain.gain.setValueAtTime(0.02, ctx.currentTime);
      whineOsc.connect(whineFilter);
      whineFilter.connect(whineGain);
      whineGain.connect(masterGain);
      oscillators.push(whineOsc);
      gains.push(whineGain);
      
      // LFO for whine variation (simulates RPM changes)
      const lfo3 = ctx.createOscillator();
      const lfo3Gain = ctx.createGain();
      lfo3.frequency.setValueAtTime(0.5, ctx.currentTime);
      lfo3Gain.gain.setValueAtTime(100, ctx.currentTime);
      lfo3.connect(lfo3Gain);
      lfo3Gain.connect(whineOsc.frequency);
      oscillators.push(lfo3);
      
      // Crowd/wind noise using filtered noise
      const bufferSize = ctx.sampleRate * 10;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.8, ctx.currentTime);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.03, ctx.currentTime);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      
      // Start all oscillators
      oscillators.forEach(osc => osc.start(ctx.currentTime));
      noise.start(ctx.currentTime);
      
      backgroundNodesRef.current = { oscillators, gains, masterGain };
      isPlayingBackgroundRef.current = true;
    } catch (e) {
      console.log('Background music not available');
    }
  }, [enabled]);

  // Stop background racing ambiance
  const stopBackgroundMusic = useCallback(() => {
    if (!isPlayingBackgroundRef.current) return;
    
    try {
      const ctx = getAudioContext();
      const { masterGain, oscillators } = backgroundNodesRef.current;
      
      if (masterGain) {
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      }
      
      setTimeout(() => {
        oscillators.forEach(osc => {
          try { osc.stop(); } catch (e) {}
        });
        backgroundNodesRef.current = { oscillators: [], gains: [], masterGain: null };
        isPlayingBackgroundRef.current = false;
      }, 600);
    } catch (e) {
      backgroundNodesRef.current = { oscillators: [], gains: [], masterGain: null };
      isPlayingBackgroundRef.current = false;
    }
  }, []);

  // Play victory fanfare with cheering
  const playVictory = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getAudioContext();
      
      // Fanfare notes
      const notes = [523.25, 659.25, 783.99, 1046.50];
      
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
      const bufferSize = ctx.sampleRate * 2;
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
      noiseGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
      noiseGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noise.start(ctx.currentTime + 0.2);
      noise.stop(ctx.currentTime + 2);
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
