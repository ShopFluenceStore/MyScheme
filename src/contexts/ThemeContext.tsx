'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = 'theme-preference';

const storage = {
  get: (): Theme | null => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark' || saved === 'light' ? saved as Theme : null;
    } catch (e) {
      console.warn('Could not access localStorage:', e);
      return null;
    }
  },
  set: (theme: Theme): void => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e);
    }
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from the HTML element (set by the script)
  useEffect(() => {
    // Get the initial theme from the HTML element
    const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(initialTheme);
    setIsMounted(true);
    
    // Sync with system preference changes only if no theme is saved
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Only update if there's no saved theme
      if (!storage.get()) {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        document.documentElement.style.colorScheme = newTheme;
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme changes to the document
  useEffect(() => {
    if (!isMounted) return;
    
    // Only update if the class has changed
    if (!document.documentElement.classList.contains(theme)) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.documentElement.style.colorScheme = theme;
      
      // Save to localStorage whenever theme changes
      storage.set(theme);
    }
  }, [theme, isMounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      storage.set(newTheme);
      return newTheme;
    });
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  }), [theme, toggleTheme]);

  if (!isMounted) {
    return <>{children}</>; // Return children during SSR
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
