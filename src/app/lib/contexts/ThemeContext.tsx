// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { StorageKeys } from '../types/storageKeys';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  isDark: boolean;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check if the window is available first
    if (typeof window === 'undefined') return 'light';

    // Retrieve the theme
    const stored = storage.get(StorageKeys.Theme) as ThemeMode | null;

    // return it if found
    if (stored === 'dark' || stored === 'light') return stored;

    // otherwise, rely on preferred
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Check if the window is available first
    if (typeof window === 'undefined') return;

    // Set the theme on html
    const root = window.document.documentElement;
    root.classList.toggle('dark', mode === 'dark');

    // Ensure storage is synced
    storage.set(StorageKeys.Theme, mode);
  }, [mode]);

  const toggleTheme = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ isDark: mode === 'dark', mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
