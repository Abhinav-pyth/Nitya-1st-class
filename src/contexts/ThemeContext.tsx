import { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'default' | 'matrix' | 'barbie' | 'ocean' | 'sunset';

interface ThemeConfig {
  name: string;
  emoji: string;
  bgGradient: string;
  navBg: string;
  navBorder: string;
  primaryGradient: string;
  secondaryGradient: string;
  accentColor: string;
  buttonGradient: string;
  cardBorder: string;
}

export const themes: Record<Theme, ThemeConfig> = {
  default: {
    name: 'Default',
    emoji: '🌈',
    bgGradient: 'from-indigo-50 via-purple-50 to-pink-50',
    navBg: 'bg-white/90',
    navBorder: 'border-purple-200',
    primaryGradient: 'from-purple-500 to-pink-500',
    secondaryGradient: 'from-blue-500 to-cyan-500',
    accentColor: 'text-purple-600',
    buttonGradient: 'from-purple-500 to-pink-500',
    cardBorder: 'border-purple-100',
  },
  matrix: {
    name: 'Matrix',
    emoji: '💚',
    bgGradient: 'from-gray-900 via-green-900 to-black',
    navBg: 'bg-black/90',
    navBorder: 'border-green-500',
    primaryGradient: 'from-green-400 to-emerald-600',
    secondaryGradient: 'from-green-500 to-lime-500',
    accentColor: 'text-green-400',
    buttonGradient: 'from-green-500 to-emerald-600',
    cardBorder: 'border-green-500/30',
  },
  barbie: {
    name: 'Barbie',
    emoji: '💖',
    bgGradient: 'from-pink-100 via-rose-100 to-fuchsia-100',
    navBg: 'bg-pink-50/90',
    navBorder: 'border-pink-300',
    primaryGradient: 'from-pink-400 to-rose-500',
    secondaryGradient: 'from-fuchsia-400 to-pink-500',
    accentColor: 'text-pink-600',
    buttonGradient: 'from-pink-400 to-rose-500',
    cardBorder: 'border-pink-200',
  },
  ocean: {
    name: 'Ocean',
    emoji: '🌊',
    bgGradient: 'from-blue-50 via-cyan-50 to-teal-50',
    navBg: 'bg-blue-50/90',
    navBorder: 'border-blue-300',
    primaryGradient: 'from-blue-500 to-cyan-500',
    secondaryGradient: 'from-cyan-500 to-teal-500',
    accentColor: 'text-blue-600',
    buttonGradient: 'from-blue-500 to-cyan-500',
    cardBorder: 'border-blue-200',
  },
  sunset: {
    name: 'Sunset',
    emoji: '🌅',
    bgGradient: 'from-orange-50 via-red-50 to-purple-50',
    navBg: 'bg-orange-50/90',
    navBorder: 'border-orange-300',
    primaryGradient: 'from-orange-400 to-red-500',
    secondaryGradient: 'from-red-400 to-purple-500',
    accentColor: 'text-orange-600',
    buttonGradient: 'from-orange-400 to-red-500',
    cardBorder: 'border-orange-200',
  },
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('learning-buddy-theme');
    return (saved as Theme) || 'default';
  });

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('learning-buddy-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, themeConfig: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
