// This is a client component that will be rendered on the server
'use client';

export const THEME_STORAGE_KEY = 'theme-preference';

// This script runs before React hydration to prevent theme flicker
const themeScript = `
  (function() {
    try {
      // Check for saved theme first
      const savedTheme = localStorage.getItem('${THEME_STORAGE_KEY}');
      
      let theme;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        // Use saved theme if it exists
        theme = savedTheme;
      } else {
        // Fall back to system preference only if no saved theme exists
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
        // Save the initial theme to prevent flash
        localStorage.setItem('${THEME_STORAGE_KEY}', theme);
      }
      
      // Apply the theme immediately
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.documentElement.style.colorScheme = theme;
    } catch (e) {
      // If there's an error, default to light theme
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
    }
  })();
`.trim();

export function ThemeScript() {
  // This component renders a script that runs before the page is interactive
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            ${themeScript}
          })();
        `,
      }}
      suppressHydrationWarning
    />
  );
}
