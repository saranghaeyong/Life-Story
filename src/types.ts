export interface ChapterData {
  id: number;
  chapterNumber: string;
  chapterNumeral: string;
  age: number;
  title: string;
  mainText: string;
  supportingText: string;
  visualKey: 'birth' | 'childhood' | 'school' | 'teen' | 'young-adult' | 'adulthood' | 'midlife' | 'later-life' | 'old-age' | 'century';
  reflectionPrompt?: string;
  colorHint?: string;
}

export interface UserStory {
  birthDate: Date;
  day: number;
  month: number;
  year: number;
  formattedDate: string;
  currentAge: number;
}

export type AppScreen = 'loading' | 'welcome' | 'intro' | 'journey' | 'final';
