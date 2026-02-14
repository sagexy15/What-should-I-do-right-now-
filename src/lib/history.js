const STORAGE_KEY = 'what-should-i-do-lately';
const MAX_ITEMS = 10;

function getNow() {
  return new Date().getTime();
}

function getRelativeTime(ts) {
  const diff = (getNow() - ts) / 1000; // seconds
  if (diff < 60) return 'just now';
  if (diff < 3600) return 'a few minutes ago';
  if (diff < 7200) return 'about an hour ago';
  if (diff < 86400) return 'earlier today';
  if (diff < 172800) return 'yesterday';
  return 'recently';
}

export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function addToHistory(text) {
  const list = getHistory();
  const entry = { text, at: getNow() };
  const next = [entry, ...list].slice(0, MAX_ITEMS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (_) {}
  return next;
}

export function getRelativeLabel(ts) {
  return getRelativeTime(ts);
}
