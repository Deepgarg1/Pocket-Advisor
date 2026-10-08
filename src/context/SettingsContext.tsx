import React, { createContext, useContext, useEffect, useState } from 'react';

interface SettingsContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currencySymbol: string;
  setCurrencySymbol: (s: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function getSafeStorage(key: string, fallback: string): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key) ?? fallback;
    }
  } catch {
    // Gracefully handle sandboxed environments or disabled storage
  }
  return fallback;
}

function setSafeStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Silently ignore quota exceeded or security restriction errors
  }
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (getSafeStorage('pocket_theme', 'dark') as 'dark' | 'light') || 'dark';
  });

  const [currencySymbol, setCurrencySymbolState] = useState<string>(() => {
    return getSafeStorage('pocket_currency', '₹');
  });

  // Apply theme to <html> data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setSafeStorage('pocket_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setCurrencySymbol = (s: string) => {
    setCurrencySymbolState(s);
    setSafeStorage('pocket_currency', s);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        currencySymbol,
        setCurrencySymbol,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
