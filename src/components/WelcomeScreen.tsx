import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { validateBirthDate } from '../utils/date.ts';
import { UserStory } from '../types.ts';

interface WelcomeScreenProps {
  onBegin: (story: UserStory) => void;
  initialDate?: { day: string; month: string; year: string };
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onBegin, initialDate }) => {
  const [day, setDay] = useState(initialDate?.day || '');
  const [month, setMonth] = useState(initialDate?.month || '');
  const [year, setYear] = useState(initialDate?.year || '');
  const [error, setError] = useState<string | null>(null);

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLInputElement>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(val);
    setError(null);
    if (val.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(val);
    setError(null);
    if (val.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
    setError(null);
  };

  const handleNativePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-');
    if (y && m && d) {
      setYear(y);
      setMonth(m);
      setDay(d);
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBirthDate(day, month, year);
    if (!result.isValid) {
      setError(result.errorMessage || 'Please enter a valid date of birth.');
      return;
    }
    if (result.userStory) {
      onBegin(result.userStory);
    }
  };

  const handleQuickSelectSample = (sampleDay: string, sampleMonth: string, sampleYear: string) => {
    setDay(sampleDay);
    setMonth(sampleMonth);
    setYear(sampleYear);
    setError(null);
  };

  return (
    <div id="welcome-screen" className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-[#FAF8F3]">
      {/* Decorative subtle ambient warm gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-140 rounded-full bg-radial from-[#F5EDE0]/60 via-[#F7F2E8]/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl mx-auto flex flex-col items-center text-center"
      >
        {/* Editorial Subtitle */}
        <p className="font-serif italic text-lg sm:text-xl text-[#77736B] mb-3 tracking-wide">
          And every story begins somewhere.
        </p>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#242424] font-normal tracking-tight mb-8">
          Every life is a story.
        </h1>

        {/* Story prompt */}
        <div className="w-12 h-px bg-[#C9B79C] mb-8 opacity-70" />

        <h2 className="text-base sm:text-lg text-[#242424] font-medium tracking-wide mb-6">
          When did your story begin?
        </h2>

        {/* Date Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
          <div className="w-full bg-white border border-[#E9E4DA] rounded-2xl p-4 sm:p-6 shadow-xs mb-4 transition-all duration-300 focus-within:border-[#C9B79C] focus-within:ring-2 focus-within:ring-[#C9B79C]/20">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {/* Day input */}
              <div className="flex flex-col items-center">
                <input
                  id="birth-day-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="DD"
                  value={day}
                  onChange={handleDayChange}
                  className="w-14 sm:w-16 h-12 text-center text-xl sm:text-2xl font-serif text-[#242424] bg-[#FAF8F3] border border-[#E9E4DA] rounded-xl focus:outline-hidden focus:border-[#C9B79C] placeholder:text-[#C9B79C]/50 transition-colors"
                  aria-label="Day of birth"
                  maxLength={2}
                />
                <span className="text-[11px] uppercase tracking-widest text-[#77736B] mt-1.5">Day</span>
              </div>

              <span className="text-2xl font-serif text-[#C9B79C] pb-4">/</span>

              {/* Month input */}
              <div className="flex flex-col items-center">
                <input
                  ref={monthRef}
                  id="birth-month-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  value={month}
                  onChange={handleMonthChange}
                  className="w-14 sm:w-16 h-12 text-center text-xl sm:text-2xl font-serif text-[#242424] bg-[#FAF8F3] border border-[#E9E4DA] rounded-xl focus:outline-hidden focus:border-[#C9B79C] placeholder:text-[#C9B79C]/50 transition-colors"
                  aria-label="Month of birth"
                  maxLength={2}
                />
                <span className="text-[11px] uppercase tracking-widest text-[#77736B] mt-1.5">Month</span>
              </div>

              <span className="text-2xl font-serif text-[#C9B79C] pb-4">/</span>

              {/* Year input */}
              <div className="flex flex-col items-center">
                <input
                  ref={yearRef}
                  id="birth-year-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY"
                  value={year}
                  onChange={handleYearChange}
                  className="w-20 sm:w-24 h-12 text-center text-xl sm:text-2xl font-serif text-[#242424] bg-[#FAF8F3] border border-[#E9E4DA] rounded-xl focus:outline-hidden focus:border-[#C9B79C] placeholder:text-[#C9B79C]/50 transition-colors"
                  aria-label="Year of birth"
                  maxLength={4}
                />
                <span className="text-[11px] uppercase tracking-widest text-[#77736B] mt-1.5">Year</span>
              </div>

              {/* Native date picker trigger */}
              <div className="flex flex-col items-center pl-1">
                <button
                  type="button"
                  id="native-calendar-btn"
                  onClick={() => datePickerRef.current?.showPicker ? datePickerRef.current.showPicker() : datePickerRef.current?.click()}
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-[#E9E4DA] bg-[#FAF8F3] text-[#77736B] hover:text-[#242424] hover:border-[#C9B79C] transition-colors cursor-pointer"
                  title="Choose from calendar"
                  aria-label="Open calendar picker"
                >
                  <Calendar className="w-5 h-5" />
                </button>
                <span className="text-[11px] uppercase tracking-widest text-[#77736B] mt-1.5 opacity-0">Pick</span>
                {/* Hidden native input */}
                <input
                  ref={datePickerRef}
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  min="1900-01-01"
                  onChange={handleNativePicker}
                  className="sr-only"
                  tabIndex={-1}
                />
              </div>
            </div>

            {/* Subtle Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                id="birth-date-error"
                role="alert"
                className="text-xs sm:text-sm text-[#964B3B] mt-3 font-medium text-center"
              >
                {error}
              </motion.p>
            )}
          </div>

          {/* Quick Year Suggestions */}
          <div className="flex items-center gap-2 mb-6 flex-wrap justify-center text-xs text-[#77736B]">
            <span className="opacity-80">Or explore with:</span>
            <button
              type="button"
              id="sample-year-2001"
              onClick={() => handleQuickSelectSample('15', '08', '2001')}
              className="px-2.5 py-1 rounded-full border border-[#E9E4DA] bg-white/70 hover:bg-white hover:border-[#C9B79C] text-[#242424] transition-colors cursor-pointer"
            >
              15 / 08 / 2001
            </button>
            <button
              type="button"
              id="sample-year-1995"
              onClick={() => handleQuickSelectSample('24', '03', '1995')}
              className="px-2.5 py-1 rounded-full border border-[#E9E4DA] bg-white/70 hover:bg-white hover:border-[#C9B79C] text-[#242424] transition-colors cursor-pointer"
            >
              24 / 03 / 1995
            </button>
            <button
              type="button"
              id="sample-year-1980"
              onClick={() => handleQuickSelectSample('10', '11', '1980')}
              className="px-2.5 py-1 rounded-full border border-[#E9E4DA] bg-white/70 hover:bg-white hover:border-[#C9B79C] text-[#242424] transition-colors cursor-pointer"
            >
              10 / 11 / 1980
            </button>
          </div>

          {/* Begin Button */}
          <button
            id="begin-journey-btn"
            type="submit"
            className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 rounded-full bg-[#242424] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-3 shadow-xs hover:bg-[#363432] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
          >
            <span>Begin My Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Under-button Tagline */}
          <p className="text-xs sm:text-sm text-[#77736B] mt-5 tracking-wide">
            A quiet journey through 100 years of life.
          </p>

          {/* Privacy Note */}
          <div className="flex items-center gap-1.5 mt-8 text-[11px] text-[#77736B]/80">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9B79C]" />
            <span>Your date stays on this device.</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
