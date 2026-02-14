/**
 * Mood-based icon mapping for the hero suggestion card.
 * Resolves which icon to show from: category, suggestion mood, or user-selected mood.
 *
 * Icon keys: happy | sad | anxious | overwhelmed | tired | lonely | calm | neutral | move | focus | create
 */

export const ICON_KEYS = {
  HAPPY: 'happy',
  SAD: 'sad',
  ANXIOUS: 'anxious',
  OVERWHELMED: 'overwhelmed',
  TIRED: 'tired',
  LONELY: 'lonely',
  CALM: 'calm',
  NEUTRAL: 'neutral',
  MOVE: 'move',
  FOCUS: 'focus',
  CREATE: 'create',
};

/**
 * Category id → icon key (when user has selected a category card).
 */
export const CATEGORY_TO_ICON = {
  reset: ICON_KEYS.CALM,
  move: ICON_KEYS.MOVE,
  pause: ICON_KEYS.CALM,
  focus: ICON_KEYS.FOCUS,
  create: ICON_KEYS.CREATE,
  relax: ICON_KEYS.CALM,
};

/**
 * Mood id (from picker or suggestion) → icon key.
 * okay / playful → happy; tired, anxious, etc. → same-named; unsure → neutral.
 */
export const MOOD_TO_ICON = {
  okay: ICON_KEYS.HAPPY,
  playful: ICON_KEYS.HAPPY,
  tired: ICON_KEYS.TIRED,
  anxious: ICON_KEYS.ANXIOUS,
  overwhelmed: ICON_KEYS.OVERWHELMED,
  bored: ICON_KEYS.NEUTRAL,
  sad: ICON_KEYS.SAD,
  lonely: ICON_KEYS.LONELY,
  unsure: ICON_KEYS.NEUTRAL,
};

/**
 * Background tint for the icon container (Tailwind classes).
 * Soft pastel / muted; matches mood tone.
 */
export const ICON_BG_CLASSES = {
  [ICON_KEYS.HAPPY]: 'bg-muted-orange/30 dark:bg-muted-orange/20',
  [ICON_KEYS.SAD]: 'bg-dusty-blue/25 dark:bg-dusty-blue/15',
  [ICON_KEYS.ANXIOUS]: 'bg-sage/25 dark:bg-sage/15',
  [ICON_KEYS.OVERWHELMED]: 'bg-lavender/25 dark:bg-lavender/15',
  [ICON_KEYS.TIRED]: 'bg-dusty-blue/20 dark:bg-dusty-blue/10',
  [ICON_KEYS.LONELY]: 'bg-muted-orange/25 dark:bg-muted-orange/15',
  [ICON_KEYS.CALM]: 'bg-sage/20 dark:bg-sage/10',
  [ICON_KEYS.NEUTRAL]: 'bg-warm-beige/40 dark:bg-dm-soft/50',
  [ICON_KEYS.MOVE]: 'bg-sage/25 dark:bg-sage/15',
  [ICON_KEYS.FOCUS]: 'bg-lavender/20 dark:bg-lavender/10',
  [ICON_KEYS.CREATE]: 'bg-muted-orange/25 dark:bg-muted-orange/15',
};

/**
 * Resolve the icon key from current context.
 * Priority: category (user just chose a direction) → suggestion mood → user mood → neutral.
 */
export function resolveIconKey({ categoryId, suggestionMood, userMood }) {
  if (categoryId && CATEGORY_TO_ICON[categoryId]) {
    return CATEGORY_TO_ICON[categoryId];
  }
  const mood = suggestionMood ?? userMood;
  if (mood && MOOD_TO_ICON[mood]) {
    return MOOD_TO_ICON[mood];
  }
  return ICON_KEYS.NEUTRAL;
}
