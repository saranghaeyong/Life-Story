import { UserStory } from '../types.ts';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export interface DateValidationResult {
  isValid: boolean;
  errorMessage?: string;
  userStory?: UserStory;
}

export function validateBirthDate(
  dayStr: string,
  monthStr: string,
  yearStr: string
): DateValidationResult {
  const cleanDay = dayStr.trim();
  const cleanMonth = monthStr.trim();
  const cleanYear = yearStr.trim();

  if (!cleanDay && !cleanMonth && !cleanYear) {
    return { isValid: false, errorMessage: 'Your story needs a beginning.' };
  }

  if (!cleanDay || !cleanMonth || !cleanYear) {
    return { isValid: false, errorMessage: 'Please enter a complete date (DD / MM / YYYY).' };
  }

  const day = parseInt(cleanDay, 10);
  const month = parseInt(cleanMonth, 10);
  const year = parseInt(cleanYear, 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return { isValid: false, errorMessage: 'Please enter a valid date.' };
  }

  if (month < 1 || month > 12) {
    return { isValid: false, errorMessage: 'Month must be between 1 and 12.' };
  }

  if (year < 1900) {
    return { isValid: false, errorMessage: 'Please enter a realistic birth year after 1900.' };
  }

  // Check days in month (handling leap years)
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return { isValid: false, errorMessage: `Please enter a valid day (1 to ${daysInMonth}) for that month.` };
  }

  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  // Reset time portions for pure date comparison
  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const birthZero = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (birthZero > todayZero) {
    return { isValid: false, errorMessage: 'The beginning of your story cannot be in the future.' };
  }

  // Calculate current age
  let currentAge = now.getFullYear() - year;
  const monthDiff = now.getMonth() - (month - 1);
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < day)) {
    currentAge--;
  }
  if (currentAge < 0) currentAge = 0;

  const formattedDate = `${day} ${MONTH_NAMES[month - 1]} ${year}`;

  const userStory: UserStory = {
    birthDate,
    day,
    month,
    year,
    formattedDate,
    currentAge,
  };

  return {
    isValid: true,
    userStory,
  };
}
