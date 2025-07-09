const THEME_STORAGE_KEY = 'theme-preference';

const getSystemPreference = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const getSavedTheme = (): 'dark' | 'light' | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'dark' || saved === 'light' ? saved : null;
};

const applyTheme = (theme: 'dark' | 'light') => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  document.documentElement.style.colorScheme = theme;
};

// Initialize theme
const savedTheme = getSavedTheme();
const systemPreference = getSystemPreference();
const theme = savedTheme || systemPreference;

// Apply the theme immediately
applyTheme(theme);

// Save the theme preference if it's not already saved
if (!savedTheme && typeof window !== 'undefined') {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
