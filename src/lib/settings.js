const KEY = 'what-should-i-do-settings';

const defaults = {
  darkMode: false,
  energy: 'calming', // calming | energizing
  style: 'minimal', // minimal | playful
  mood: null, // tired | anxious | bored | overwhelmed | okay | playful | null
};

export function getSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaults };
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return { ...defaults };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch (_) {}
}

export function applyDarkMode(isDark) {
  if (isDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}
