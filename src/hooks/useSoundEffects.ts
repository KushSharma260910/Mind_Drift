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

  // Start intense racing background ambiance with crowd cheering
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
      
      // Deep bass engine rumble - reduced volume
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(45, ctx.currentTime);
      bassGain.gain.setValueAtTime(0.04, ctx.currentTime);
      bassOsc.connect(bassGain);
      bassGain.connect(masterGain);
      oscillators.push(bassOsc);
      gains.push(bassGain);
      
      // LFO for engine-like pulsing
      const lfo1 = ctx.createOscillator();
      const lfo1Gain = ctx.createGain();
      lfo1.frequency.setValueAtTime(6, ctx.currentTime);
      lfo1Gain.gain.setValueAtTime(8, ctx.currentTime);
      lfo1.connect(lfo1Gain);
      lfo1Gain.connect(bassOsc.frequency);
      oscillators.push(lfo1);
      
      // Create crowd roar noise - main crowd ambiance
      const crowdBufferSize = ctx.sampleRate * 10;
      const crowdBuffer = ctx.createBuffer(2, crowdBufferSize, ctx.sampleRate);
      const leftChannel = crowdBuffer.getChannelData(0);
      const rightChannel = crowdBuffer.getChannelData(1);
      
      // Generate crowd-like noise with varying intensity
      for (let i = 0; i < crowdBufferSize; i++) {
        const wave = Math.sin(i / ctx.sampleRate * Math.PI * 2 * 0.3) * 0.5 + 0.5;
        leftChannel[i] = (Math.random() * 2 - 1) * (0.5 + wave * 0.5);
        rightChannel[i] = (Math.random() * 2 - 1) * (0.5 + wave * 0.5);
      }
      
      const crowdNoise = ctx.createBufferSource();
      crowdNoise.buffer = crowdBuffer;
      crowdNoise.loop = true;
      
      // Filter to make it sound like distant crowd
      const crowdFilter = ctx.createBiquadFilter();
      crowdFilter.type = 'bandpass';
      crowdFilter.frequency.setValueAtTime(1200, ctx.currentTime);
      crowdFilter.Q.setValueAtTime(0.5, ctx.currentTime);
      
      // Add modulation to crowd filter for wave-like cheering
      const crowdLfo = ctx.createOscillator();
      const crowdLfoGain = ctx.createGain();
      crowdLfo.frequency.setValueAtTime(0.15, ctx.currentTime);
      crowdLfoGain.gain.setValueAtTime(400, ctx.currentTime);
      crowdLfo.connect(crowdLfoGain);
      crowdLfoGain.connect(crowdFilter.frequency);
      oscillators.push(crowdLfo);
      
      const crowdGain = ctx.createGain();
      crowdGain.gain.setValueAtTime(0.12, ctx.currentTime);
      
      crowdNoise.connect(crowdFilter);
      crowdFilter.connect(crowdGain);
      crowdGain.connect(masterGain);
      
      // High-pitched whistles and hoots layer
      const hootBufferSize = ctx.sampleRate * 8;
      const hootBuffer = ctx.createBuffer(1, hootBufferSize, ctx.sampleRate);
      const hootData = hootBuffer.getChannelData(0);
      
      // Create intermittent whistle-like sounds
      for (let i = 0; i < hootBufferSize; i++) {
        const t = i / ctx.sampleRate;
        const whistleFreq = 1800 + Math.sin(t * 3) * 400;
        const whistleEnv = Math.sin(t * Math.PI * 1.5) > 0.7 ? 1 : 0;
        hootData[i] = Math.sin(t * whistleFreq * Math.PI * 2) * whistleEnv * 0.3 * Math.random();
      }
      
      const hootNoise = ctx.createBufferSource();
      hootNoise.buffer = hootBuffer;
      hootNoise.loop = true;
      
      const hootFilter = ctx.createBiquadFilter();
      hootFilter.type = 'highpass';
      hootFilter.frequency.setValueAtTime(1500, ctx.currentTime);
      
      const hootGain = ctx.createGain();
      hootGain.gain.setValueAtTime(0.06, ctx.currentTime);
      
      hootNoise.connect(hootFilter);
      hootFilter.connect(hootGain);
      hootGain.connect(masterGain);
      
      // Rhythmic chanting/clapping layer
      const chantOsc = ctx.createOscillator();
      const chantGain = ctx.createGain();
      chantOsc.type = 'triangle';
      chantOsc.frequency.setValueAtTime(220, ctx.currentTime);
      
      // LFO for rhythmic pulsing (like crowd clapping)
      const chantLfo = ctx.createOscillator();
      const chantLfoGain = ctx.createGain();
      chantLfo.frequency.setValueAtTime(2.5, ctx.currentTime); // ~150 BPM clapping
      chantLfoGain.gain.setValueAtTime(1, ctx.currentTime);
      chantLfo.connect(chantLfoGain);
      chantLfoGain.connect(chantGain.gain);
      chantGain.gain.setValueAtTime(0.03, ctx.currentTime);
      
      chantOsc.connect(chantGain);
      chantGain.connect(masterGain);
      oscillators.push(chantOsc);
      oscillators.push(chantLfo);
      gains.push(chantGain);
      
      // Excitement surge oscillator - rises and falls
      const surgeOsc = ctx.createOscillator();
      const surgeGain = ctx.createGain();
      const surgeFilter = ctx.createBiquadFilter();
      surgeOsc.type = 'sawtooth';
      surgeOsc.frequency.setValueAtTime(150, ctx.currentTime);
      surgeFilter.type = 'lowpass';
      surgeFilter.frequency.setValueAtTime(300, ctx.currentTime);
      
      // Slow LFO for crowd surge effect
      const surgeLfo = ctx.createOscillator();
      const surgeLfoGain = ctx.createGain();
      surgeLfo.frequency.setValueAtTime(0.08, ctx.currentTime);
      surgeLfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
      surgeLfo.connect(surgeLfoGain);
      surgeLfoGain.connect(surgeGain.gain);
      surgeGain.gain.setValueAtTime(0.02, ctx.currentTime);
      
      surgeOsc.connect(surgeFilter);
      surgeFilter.connect(surgeGain);
      surgeGain.connect(masterGain);
      oscillators.push(surgeOsc);
      oscillators.push(surgeLfo);
      gains.push(surgeGain);
      
      // Start all oscillators and noise sources
      oscillators.forEach(osc => osc.start(ctx.currentTime));
      crowdNoise.start(ctx.currentTime);
      hootNoise.start(ctx.currentTime);
      
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
