import { createContext, useContext, useEffect, useState } from 'react';
import { getSettings, saveSettings, applyDarkMode } from '../lib/settings';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettingsState] = useState(getSettings);

  useEffect(() => {
    applyDarkMode(settings.darkMode);
  }, [settings.darkMode]);

  const setSettings = (next) => {
    setSettingsState((prev) => {
      const merged = typeof next === 'function' ? next(prev) : { ...prev, ...next };
      saveSettings(merged);
      return merged;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
