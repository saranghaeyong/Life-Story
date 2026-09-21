import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserStory } from '../types.ts';

interface JourneyIntroProps {
  story: UserStory;
  onComplete: () => void;
}

export const JourneyIntro: React.FC<JourneyIntroProps> = ({ story, onComplete }) => {
  // Step 0: "And so, the story begins…"
  // Step 1: Birth year & personal date: "15 August 2001 · Born in 2001"
  // Step 2: Current age reflection (if applicable)
  // Step 3: "Chapter One"
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 5200);
    const t3 = setTimeout(() => setPhase(3), 8500);
    const t4 = setTimeout(() => onComplete(), 11500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div id="journey-intro-screen" className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#FAF8F3] px-6 text-center select-none">
      {/* Background warm aura */}
      <div className="absolute inset-0 bg-radial from-[#F5EDE0]/80 via-[#FAF8F3] to-[#FAF8F3] pointer-events-none" />

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="phase-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-[#242424] font-normal tracking-wide">
              And so, the story begins…
            </h2>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="phase-1"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg flex flex-col items-center"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#77736B] mb-3">
              {story.formattedDate}
            </span>
            <span className="font-serif text-6xl sm:text-8xl text-[#242424] font-normal tracking-tight">
              {story.year}
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-[#77736B] mt-4">
              Born in {story.year}
            </p>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="phase-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md flex flex-col items-center"
          >
            {story.currentAge > 0 ? (
              <>
                <p className="font-serif text-2xl sm:text-3xl text-[#242424] mb-3 font-normal">
                  Today, you are {story.currentAge}.
                </p>
                <p className="font-serif italic text-base sm:text-lg text-[#77736B]">
                  But this story is much bigger than today.
                </p>
              </>
            ) : (
              <>
                <p className="font-serif text-2xl sm:text-3xl text-[#242424] mb-3 font-normal">
                  A brand new dawn.
                </p>
                <p className="font-serif italic text-base sm:text-lg text-[#77736B]">
                  A century of wonder awaits.
                </p>
              </>
            )}
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="phase-3"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md flex flex-col items-center"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9B79C] mb-3">
              Part I
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl text-[#242424] font-normal">
              Chapter One
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button for swift convenience */}
      <button
        id="skip-intro-btn"
        onClick={onComplete}
        className="absolute bottom-8 text-xs text-[#77736B] hover:text-[#242424] tracking-widest uppercase transition-colors px-4 py-2 cursor-pointer opacity-70 hover:opacity-100"
      >
        Skip intro →
      </button>
    </div>
  );
};
