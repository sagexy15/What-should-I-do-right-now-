// Light, calming browser-based games — no scores or competition.
// Each opens in a new tab for a gentle break.
// moods: array of mood IDs this game is good for (null = good for all)

export const games = [
  {
    id: '2048',
    title: '2048',
    description: 'Slide and merge numbers in a calm, low-pressure puzzle. Thoughtful moves over speed.',
    moodTag: 'Calm',
    moods: ['anxious', 'overwhelmed', 'tired', null], // Good for calming moods
    url: 'https://play2048.co/',
  },
  {
    id: 'cozy-puzzle',
    title: 'Cozy Puzzle',
    description: 'Stress-free jigsaw game with no timers. Piece together puzzles at your own pace.',
    moodTag: 'Cozy',
    moods: ['tired', 'anxious', 'overwhelmed', 'okay', null], // Very calming
    url: 'https://minigames.quartsoft.com/en/cozy-puzzle/',
  },
  {
    id: 'calm-tiles',
    title: 'Calm Tiles',
    description: 'Hint-based puzzle gameplay in a minimalist format. Gentle and meditative.',
    moodTag: 'Focus',
    moods: ['anxious', 'overwhelmed', null], // Helps focus and calm
    url: 'http://www.tiny0.com/games/calm/',
  },
  {
    id: 'jigsaw-online',
    title: 'Jigsaw Online',
    description: 'Free daily puzzles with no account required. Choose your difficulty and take your time.',
    moodTag: 'Cozy',
    moods: ['tired', 'bored', 'okay', null], // Relaxing and engaging
    url: 'https://www.jigsawonline.io/',
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'One gentle word puzzle a day. No rush, no scoreboard.',
    moodTag: 'Light Fun',
    moods: ['bored', 'okay', 'playful', null], // Light engagement
    url: 'https://www.nytimes.com/games/wordle/index.html',
  },
];

export function getGamesForMood(mood) {
  // If no mood selected or "unsure", show all games
  if (!mood || mood === 'unsure') return games;
  
  // Filter games that SPECIFICALLY include this mood in their moods array
  // We want games that explicitly list this mood, not just games with null
  const exactMatches = games.filter(game => {
    // Game must have a moods array
    if (!game.moods || game.moods.length === 0) return false;
    // Check if this specific mood is in the array (ignore null entries)
    return game.moods.includes(mood);
  });
  
  // Return only games that specifically match this mood
  // If no matches found, return empty array (user will see a message)
  return exactMatches;
}
