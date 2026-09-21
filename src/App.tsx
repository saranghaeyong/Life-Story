/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppScreen, UserStory } from './types.ts';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import { JourneyIntro } from './components/JourneyIntro.tsx';
import { LifeTimeline } from './components/LifeTimeline.tsx';
import { FinalScreen } from './components/FinalScreen.tsx';
import { AudioController } from './components/AudioController.tsx';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('loading');
  const [userStory, setUserStory] = useState<UserStory | null>(null);

  // Minimal initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('welcome');
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  const handleBeginStory = (story: UserStory) => {
    setUserStory(story);
    setScreen('intro');
  };

  const handleIntroComplete = () => {
    setScreen('journey');
  };

  const handleJourneyFinish = () => {
    setScreen('final');
  };

  const handleRestartSameStory = () => {
    setScreen('journey');
  };

  const handleNewStory = () => {
    setScreen('welcome');
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F3] text-[#242424] relative selection:bg-[#C9B79C]/30 selection:text-[#242424]">
      {/* Universal Audio Controller */}
      <AudioController />

      <AnimatePresence mode="wait">
        {screen === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F3] text-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9B79C] animate-ping mb-4" />
            <p className="font-serif italic text-base sm:text-lg text-[#77736B] tracking-wide">
              Preparing your story…
            </p>
          </motion.div>
        )}

        {screen === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <WelcomeScreen
              onBegin={handleBeginStory}
              initialDate={
                userStory
                  ? {
                      day: String(userStory.day).padStart(2, '0'),
                      month: String(userStory.month).padStart(2, '0'),
                      year: String(userStory.year),
                    }
                  : undefined
              }
            />
          </motion.div>
        )}

        {screen === 'intro' && userStory && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <JourneyIntro
              story={userStory}
              onComplete={handleIntroComplete}
            />
          </motion.div>
        )}

        {screen === 'journey' && userStory && (
          <motion.div
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <LifeTimeline
              story={userStory}
              onFinish={handleJourneyFinish}
              onRestart={handleNewStory}
            />
          </motion.div>
        )}

        {screen === 'final' && userStory && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <FinalScreen
              story={userStory}
              onRestartSameStory={handleRestartSameStory}
              onNewStory={handleNewStory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
