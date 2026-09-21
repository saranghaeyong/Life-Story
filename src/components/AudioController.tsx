import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientAudio } from '../services/audio.ts';

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe(setIsPlaying);
    return () => unsubscribe();
  }, []);

  return (
    <button
      id="ambient-audio-toggle"
      onClick={() => ambientAudio.toggle()}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F3]/80 backdrop-blur-sm border border-[#E9E4DA] text-[#77736B] hover:text-[#242424] hover:border-[#C9B79C] transition-all duration-300 shadow-xs cursor-pointer group text-xs tracking-wider"
      aria-label={isPlaying ? 'Mute ambient sound' : 'Enable ambient sound'}
      title={isPlaying ? 'Mute ambient music' : 'Play peaceful ambient music'}
    >
      <span className="relative flex h-3 w-3 items-center justify-center">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9B79C] opacity-40"></span>
            <Volume2 className="w-3.5 h-3.5 text-[#242424]" />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#77736B] group-hover:text-[#242424]" />
        )}
      </span>
      <span className="font-sans select-none">
        {isPlaying ? 'Sound on' : 'Sound'}
      </span>
    </button>
  );
}
