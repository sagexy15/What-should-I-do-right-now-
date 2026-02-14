// Category panels: 4–5 suggestions + 1 quote per category.
// Used when user clicks a category card.

export const categoryContent = {
  reset: {
    id: 'reset',
    title: 'Reset',
    icon: '🌬',
    quote: 'You don\'t need to fix everything. Just return to this moment.',
    suggestions: [
      'Try the 4-4 breathing technique (inhale 4, hold 4, exhale 4)',
      'Name 5 things you can see, 4 you can touch',
      'Drink a glass of water slowly',
      'Step outside for 2 minutes',
      'Relax your shoulders and unclench your jaw',
    ],
  },
  move: {
    id: 'move',
    title: 'Move',
    icon: '🚶',
    quote: 'Small movement can shift heavy energy.',
    suggestions: [
      'Walk around your space for 3 minutes',
      'Stretch your arms overhead',
      'Do 10 slow squats',
      'Shake out tension from your hands',
      'Play one song and move gently',
    ],
  },
  pause: {
    id: 'pause',
    title: 'Pause',
    icon: '☕',
    quote: 'Rest is allowed.',
    suggestions: [
      'Make tea or coffee slowly',
      'Sit quietly for 2 minutes without your phone',
      'Look out a window',
      'Close your eyes and breathe',
      'Step away from your screen briefly',
    ],
  },
  focus: {
    id: 'focus',
    title: 'Focus',
    icon: '🧠',
    quote: 'Start tiny. That\'s enough.',
    suggestions: [
      'Clean one small surface',
      'Reply to one message',
      'Organize one folder',
      'Write a to-do list with only 3 items',
      'Set a 5-minute timer and begin',
    ],
  },
  create: {
    id: 'create',
    title: 'Create',
    icon: '🎨',
    quote: 'You don\'t have to be good at it. Just explore.',
    suggestions: [
      'Doodle for 5 minutes',
      'Rearrange your desk',
      'Write 3 random thoughts',
      'Take one aesthetic photo',
      'Play with color combinations',
    ],
  },
  relax: {
    id: 'relax',
    title: 'Relax',
    icon: '🎧',
    quote: 'Gentle distraction is still healing.',
    suggestions: [
      'Play soft instrumental music',
      'Try a light online puzzle game',
      'Listen to rain sounds',
      'Watch calming visuals',
      'Follow a slow breathing animation',
    ],
  },
};

// Feeling clusters for emotional search: synonyms, quote, 2–3 suggestions.
export const feelingClusters = [
  {
    id: 'lonely',
    label: 'Lonely',
    synonyms: ['alone', 'isolated', 'disconnected', 'left out', 'lonely'],
    quote: 'Even in solitude, you are still worthy of connection.',
    suggestions: [
      'Message one person you trust',
      'Go somewhere people are present (even quietly)',
      'Write what you wish someone would tell you',
    ],
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    synonyms: ['overwhelmed', 'stressed', 'overloaded', 'too much', 'burnt out', 'burned out', 'burnout'],
    quote: 'You don\'t have to solve your whole life today.',
    suggestions: [
      'List only 3 tasks',
      'Breathe slowly for 1 minute',
      'Start with the easiest thing',
    ],
  },
  {
    id: 'happy',
    label: 'Happy',
    synonyms: ['happy', 'grateful', 'content', 'joyful', 'light', 'good'],
    quote: 'Let yourself fully feel this. It\'s yours.',
    suggestions: [
      'Write what made today good',
      'Share your mood with someone',
      'Capture the moment with a photo',
    ],
  },
  {
    id: 'sad',
    label: 'Sad',
    synonyms: ['sad', 'down', 'low', 'heavy', 'blue'],
    quote: 'It\'s okay to not be okay right now.',
    suggestions: [
      'Wrap yourself in something warm',
      'Watch something comforting',
      'Drink water and rest',
    ],
  },
  {
    id: 'frustrated',
    label: 'Frustrated',
    synonyms: ['frustrated', 'irritated', 'annoyed', 'angry', 'mad'],
    quote: 'Pause before reacting. Power lives there.',
    suggestions: [
      'Take 10 slow breaths',
      'Step away briefly',
      'Write what upset you',
    ],
  },
  {
    id: 'anxious',
    label: 'Anxious',
    synonyms: ['anxious', 'nervous', 'worried', 'uneasy', 'anxiety'],
    quote: 'This feeling will pass. It always does.',
    suggestions: [
      'Name 5 things you see',
      'Slow your breathing',
      'Move gently for a minute',
    ],
  },
  {
    id: 'tired',
    label: 'Tired',
    synonyms: ['tired', 'drained', 'exhausted', 'fatigued'],
    quote: 'You\'re not lazy. You\'re human.',
    suggestions: [
      'Rest for 10 minutes',
      'Drink water',
      'Lower one expectation today',
    ],
  },
  {
    id: 'bored',
    label: 'Bored',
    synonyms: ['bored', 'restless', 'unstimulated'],
    quote: 'Curiosity starts small.',
    suggestions: [
      'Try a new mini task',
      'Explore a new playlist',
      'Rearrange one area in your space',
    ],
  },
  {
    id: 'numb',
    label: 'Numb',
    synonyms: ['numb', 'empty', 'disconnected', 'emotionless'],
    quote: 'Even numbness is a feeling.',
    suggestions: [
      'Hold something textured',
      'Listen to emotional music',
      'Write without filtering for 3 minutes',
    ],
  },
];

/**
 * Maps search query to a feeling cluster.
 * 1. Exact match on cluster label
 * 2. Synonym match
 * 3. Fallback: "unclear" → show Reset
 * Returns { cluster, matchedBy: 'exact'|'synonym' } or null (use Reset as fallback).
 */
export function mapSearchToFeelingCluster(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return null;

  for (const cluster of feelingClusters) {
    if (cluster.label.toLowerCase() === q) {
      return { cluster, matchedBy: 'exact' };
    }
    if (cluster.synonyms.some((s) => s.toLowerCase() === q || q.includes(s.toLowerCase()) || s.toLowerCase().includes(q))) {
      return { cluster, matchedBy: 'synonym' };
    }
  }

  // Multi-word or partial: try to match any synonym as substring
  for (const cluster of feelingClusters) {
    for (const syn of cluster.synonyms) {
      if (q.includes(syn.toLowerCase()) || syn.toLowerCase().includes(q)) {
        return { cluster, matchedBy: 'synonym' };
      }
    }
  }

  return null;
}

/**
 * Get Reset category content for "Show something gentler".
 */
export function getResetContent() {
  return categoryContent.reset;
}
