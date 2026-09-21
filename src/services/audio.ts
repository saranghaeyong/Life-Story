/**
 * Ambient Audio Synthesizer
 * Uses the Web Audio API to procedurally generate a peaceful, cinematic,
 * warm ambient soundscape without requiring any external audio files.
 */

class AmbientAudioService {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private droneOscs: OscillatorNode[] = [];
  private listeners: Set<(isPlaying: boolean) => void> = new Set();

  public subscribe(listener: (isPlaying: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public start() {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      if (this.isPlaying) return;

      const ctx = this.audioCtx;

      // Master gain for smooth fade
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 3);

      // Warm low-pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      // Connect filter to master to destination
      filter.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);

      // Create warm fundamental drone chords (Peaceful Pentatonic Pad in C / G: 65.4Hz, 98Hz, 130.8Hz, 196Hz)
      const baseFreqs = [65.41, 98.0, 130.81, 164.81, 196.0];
      this.droneOscs = [];

      baseFreqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle micro-detune for organic warmth
        osc.detune.setValueAtTime((index - 2) * 3.5, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.04 / (index + 1), ctx.currentTime);

        // Gentle LFO for movement
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.08 + index * 0.03, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(freq * 0.02, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();

        this.droneOscs.push(osc);
      });

      // Periodic gentle musical chime bell (celestial Rhodes/chime note)
      const pentatonicNotes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
      let noteIndex = 0;

      const playRandomTone = () => {
        if (!this.isPlaying || !this.audioCtx || !this.masterGain) return;

        const noteFreq = pentatonicNotes[noteIndex % pentatonicNotes.length];
        noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % pentatonicNotes.length;

        const toneOsc = ctx.createOscillator();
        const toneGain = ctx.createGain();
        const toneFilter = ctx.createBiquadFilter();

        toneFilter.type = 'lowpass';
        toneFilter.frequency.setValueAtTime(800, ctx.currentTime);

        toneOsc.type = 'sine';
        toneOsc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

        const now = ctx.currentTime;
        toneGain.gain.setValueAtTime(0.0001, now);
        toneGain.gain.linearRampToValueAtTime(0.06, now + 0.8);
        toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        toneOsc.connect(toneFilter);
        toneFilter.connect(toneGain);
        toneGain.connect(filter);

        toneOsc.start(now);
        toneOsc.stop(now + 4.8);

        // Next tone in 4 to 8 seconds
        const nextDelay = 4000 + Math.random() * 4000;
        this.timerId = window.setTimeout(playRandomTone, nextDelay);
      };

      this.timerId = window.setTimeout(playRandomTone, 2000);

      this.isPlaying = true;
      this.notify();
    } catch {
      // Audio context might fail on restricted environments
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    if (!this.isPlaying) return;

    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.masterGain && this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          this.droneOscs.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          this.droneOscs = [];
        }, 1300);
      } catch {
        // ignore
      }
    }

    this.isPlaying = false;
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }
}

export const ambientAudio = new AmbientAudioService();
