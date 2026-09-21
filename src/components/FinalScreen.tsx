import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Calendar, Sparkles } from 'lucide-react';
import { UserStory } from '../types.ts';

interface FinalScreenProps {
  story: UserStory;
  onRestartSameStory: () => void;
  onNewStory: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  story,
  onRestartSameStory,
  onNewStory,
}) => {
  return (
    <div
      id="final-screen"
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden bg-[#FAF8F3] text-center"
    >
      {/* Subtle sunset starlight aura */}
      <div className="absolute inset-0 bg-radial from-[#F5ECE1]/60 via-[#FAF8F3] to-[#FAF8F3] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Subtle decorative icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-8 p-3 rounded-full bg-white border border-[#E9E4DA] shadow-xs text-[#C9B79C]"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl text-[#242424] font-normal tracking-tight mb-4"
        >
          And then, the story became a memory.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif italic text-lg sm:text-2xl text-[#77736B] mb-10"
        >
          100 years. Countless moments. One life.
        </motion.p>

        {/* Narrative core reflection */}
        <div className="w-16 h-px bg-[#C9B79C]/60 mb-10" />

        <div className="space-y-4 max-w-lg mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-base sm:text-lg text-[#242424] font-normal"
          >
            Your story was never just about the years.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="font-serif text-xl sm:text-2xl text-[#242424] italic font-light"
          >
            “It was about everything that happened between them.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.0 }}
            className="text-sm text-[#77736B] pt-4"
          >
            Thank you for taking this journey.
          </motion.p>
        </div>

        {/* Personalized Century Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="w-full max-w-sm bg-white border border-[#E9E4DA] rounded-2xl p-5 mb-10 shadow-xs flex flex-col items-center text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#77736B] mb-1">
            Personal Timeline
          </span>
          <span className="font-serif text-2xl text-[#242424] font-light">
            {story.year} <span className="text-[#C9B79C] font-normal">→</span> {story.year + 100}
          </span>
          <span className="text-xs text-[#77736B] mt-1">
            {story.formattedDate} · Age 0 to Age 100
          </span>
        </motion.div>

        {/* Final Reflective Question */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.8 }}
          className="font-serif italic text-base sm:text-lg text-[#77736B] mb-10 tracking-wide max-w-md"
        >
          What will you do with the years between now and then?
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.1 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          {/* Live It Again */}
          <button
            id="live-it-again-btn"
            onClick={onRestartSameStory}
            className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 rounded-full bg-[#242424] text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-xs hover:bg-[#363432] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
          >
            <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-45" />
            <span>Live It Again</span>
          </button>

          {/* Begin Another Story */}
          <button
            id="begin-another-story-btn"
            onClick={onNewStory}
            className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 rounded-full bg-transparent border border-[#C9B79C] text-[#242424] hover:bg-white hover:border-[#242424] font-medium text-sm flex items-center justify-center gap-2.5 shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#77736B]" />
            <span>Begin Another Story</span>
          </button>
        </motion.div>

        {/* Creator Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 3.5 }}
          className="mt-14 sm:mt-16 flex flex-col items-center justify-center text-center space-y-1 select-none"
        >
          <div className="w-8 h-px bg-[#E9E4DA] mb-3 opacity-80" />
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#77736B] font-medium">
            Made by Sarang R N
          </p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#C9B79C] font-normal">
            MCA Graduate
          </p>
        </motion.div>
      </div>
    </div>
  );
};
