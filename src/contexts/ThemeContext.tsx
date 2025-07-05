'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to get theme from localStorage
const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme') as Theme | null;
  return stored || 'light';
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Apply theme class to document element
  const applyTheme = useCallback((theme: Theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Set the theme on initial load
  useEffect(() => {
    const initialTheme = getStoredTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [applyTheme]);

  // Toggle theme and save to localStorage
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  // Only render children once the theme is set
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
