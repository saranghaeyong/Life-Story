import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { CHAPTERS } from '../data/chapters.ts';
import { UserStory } from '../types.ts';
import { ChapterVisual } from './ChapterVisual.tsx';

interface LifeTimelineProps {
  story: UserStory;
  onFinish: () => void;
  onRestart: () => void;
}

export const LifeTimeline: React.FC<LifeTimelineProps> = ({
  story,
  onFinish,
  onRestart
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const isScrollingRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const currentChapter = CHAPTERS[currentIndex];
  const calculatedYear = story.year + currentChapter.age;

  const goToNext = useCallback(() => {
    if (currentIndex < CHAPTERS.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  }, [currentIndex, onFinish]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToChapter = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Mouse wheel navigation with debounce
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 20 && Math.abs(e.deltaX) < 20) return;

      isScrollingRef.current = true;
      if (e.deltaY > 0 || e.deltaX > 0) {
        goToNext();
      } else {
        goToPrev();
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goToNext, goToPrev]);

  // Mobile touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;

    // Primarily horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        goToNext(); // Swipe left -> Next
      } else {
        goToPrev(); // Swipe right -> Previous
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Life progress percentage from age 0 to age 100
  const progressPercent = Math.min(100, (currentChapter.age / 100) * 100);

  return (
    <div
      id="life-timeline-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between bg-[#FAF8F3] select-none"
    >
      {/* Top Header Bar */}
      <header className="relative z-30 w-full max-w-6xl mx-auto px-6 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Chapter counter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] font-medium text-[#77736B] uppercase">
            Chapter {currentChapter.chapterNumber} <span className="text-[#C9B79C]">/</span> 10
          </span>
        </div>

        {/* Brand / Title & Restart */}
        <div className="flex items-center gap-4">
          <button
            onClick={onRestart}
            id="timeline-start-over-btn"
            className="flex items-center gap-1.5 text-xs text-[#77736B] hover:text-[#242424] transition-colors py-1 px-2 rounded-md hover:bg-black/5 cursor-pointer"
            title="Start over with a different birth date"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Change Date</span>
          </button>
        </div>
      </header>

      {/* Main Chapter Content Area */}
      <main className="relative z-20 flex-1 w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentChapter.id}
            custom={direction}
            initial={{ opacity: 0, scale: 0.98, y: direction > 0 ? 16 : -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: direction > 0 ? -16 : 16 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center"
          >
            {/* Visual Column */}
            <div className="md:col-span-6 flex justify-center order-1 md:order-1">
              <ChapterVisual
                visualKey={currentChapter.visualKey}
                year={calculatedYear}
                age={currentChapter.age}
              />
            </div>

            {/* Narrative Story Column */}
            <div className="md:col-span-6 flex flex-col justify-center text-center md:text-left order-2 md:order-2 space-y-4">
              {/* Dynamic Year with staggered emergence */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex items-center justify-center md:justify-start gap-3"
              >
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#C9B79C] font-light tracking-tight">
                  {calculatedYear}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#77736B] pt-2">
                  · Age {currentChapter.age}
                </span>
              </motion.div>

              {/* Chapter Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#242424] font-normal leading-tight"
              >
                {currentChapter.title}
              </motion.h2>

              {/* Main Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="font-serif text-xl sm:text-2xl text-[#242424]/90 font-light leading-relaxed italic"
              >
                “{currentChapter.mainText}”
              </motion.p>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="text-sm sm:text-base text-[#77736B] font-normal leading-relaxed max-w-lg mx-auto md:mx-0"
              >
                {currentChapter.supportingText}
              </motion.p>

              {/* Personalized Born Note for Chapter 1 */}
              {currentChapter.age === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="pt-2 text-xs text-[#77736B] tracking-wider uppercase"
                >
                  <span>{story.formattedDate}</span>
                  <span className="mx-2 text-[#C9B79C]">•</span>
                  <span>Born in {story.year}</span>
                </motion.div>
              )}

              {/* Chapter 10 Special Century Note */}
              {currentChapter.age === 100 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="pt-2 text-xs text-[#77736B] tracking-wider uppercase font-medium"
                >
                  <span>A Full Century Complete · {story.year} – {calculatedYear}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Side Arrow Controls (Desktop & Tablet) */}
      <div className="hidden sm:block">
        {currentIndex > 0 && (
          <button
            id="prev-chapter-arrow-btn"
            onClick={goToPrev}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/60 hover:bg-white border border-[#E9E4DA] text-[#77736B] hover:text-[#242424] transition-all duration-300 shadow-xs hover:scale-105 cursor-pointer"
            aria-label="Previous chapter"
            title="Previous chapter (Arrow Left)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <button
          id="next-chapter-arrow-btn"
          onClick={goToNext}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/60 hover:bg-white border border-[#E9E4DA] text-[#77736B] hover:text-[#242424] transition-all duration-300 shadow-xs hover:scale-105 cursor-pointer"
          aria-label={currentIndex === CHAPTERS.length - 1 ? 'Complete journey' : 'Next chapter'}
          title={currentIndex === CHAPTERS.length - 1 ? 'Complete journey' : 'Next chapter (Arrow Right)'}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Footer Area: Life Line + Dynamic Age Year + Navigation Dots */}
      <footer className="relative z-30 w-full max-w-4xl mx-auto px-6 pb-6 sm:pb-8 flex flex-col items-center gap-4">
        {/* Subtle Horizontal Life Line (0 to 100) */}
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#77736B]/80 font-mono">
            <span>0 YRS · {story.year}</span>
            <span className="text-[#C9B79C] font-semibold">100 YEARS OF LIFE</span>
            <span>100 YRS · {story.year + 100}</span>
          </div>

          <div
            className="relative w-full h-1 bg-[#E9E4DA] rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={currentChapter.age}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Life journey progress"
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-[#242424] rounded-full"
              initial={false}
              animate={{ width: `${Math.max(4, progressPercent)}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Bottom Bar: Age/Year display, Navigation Dots, Next Button on Mobile */}
        <div className="w-full flex items-center justify-between pt-1">
          {/* Bottom chapter label */}
          <div className="text-xs sm:text-sm font-serif text-[#242424] font-medium tracking-wide">
            <span>Age {currentChapter.age}</span>
            <span className="mx-2 text-[#C9B79C]">·</span>
            <span>{calculatedYear}</span>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {CHAPTERS.map((chap, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={chap.id}
                  id={`nav-dot-${idx + 1}`}
                  onClick={() => goToChapter(idx)}
                  className="group relative p-1 cursor-pointer focus:outline-hidden"
                  aria-label={`Go to Chapter ${chap.chapterNumber}: ${chap.title}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'w-6 h-1.5 bg-[#242424]'
                        : 'w-1.5 h-1.5 bg-[#C9B79C]/60 group-hover:bg-[#77736B]'
                    }`}
                  />
                  {/* Tooltip on hover */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-[#242424] rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xs font-sans">
                    Ch {chap.chapterNumber}: Age {chap.age}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action on Mobile or Fast Step */}
          <div className="flex items-center gap-2">
            {currentIndex > 0 && (
              <button
                onClick={goToPrev}
                id="mobile-prev-btn"
                className="sm:hidden p-1.5 rounded-full border border-[#E9E4DA] bg-white text-[#77736B] hover:text-[#242424]"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={goToNext}
              id="mobile-next-btn"
              className="px-3.5 py-1.5 rounded-full bg-[#242424] text-white text-xs font-medium flex items-center gap-1 hover:bg-[#363432] transition-colors cursor-pointer"
            >
              <span>{currentIndex === CHAPTERS.length - 1 ? 'End' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
