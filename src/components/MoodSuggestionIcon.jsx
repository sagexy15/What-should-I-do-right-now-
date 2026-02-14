import {
  ICON_KEYS,
  ICON_BG_CLASSES,
  resolveIconKey,
} from '../config/moodIconMapping';

const SVG_PROPS = {
  className: 'w-12 h-12 sm:w-14 sm:h-14 text-charcoal-muted dark:text-dm-muted transition-opacity duration-250',
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// Minimal, soft icons — consistent stroke, rounded, non-corporate
function IconSun() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconCloud() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <path d="M18 10h-1.26A4 4 0 1 0 9 14h9a3 3 0 0 0 0-4z" />
      <path d="M8 14v2M10 14v2M12 14v2" opacity="0.6" />
    </svg>
  );
}

function IconFeatherWave() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <path d="M12 4c-2 2-2 6 0 8s6 2 8 0" />
      <path d="M12 12c2 2 6 2 8 0" opacity="0.7" />
      <path d="M12 12c-2-2-2-6 0-8" opacity="0.5" />
    </svg>
  );
}

function IconSwirl() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <path d="M12 4a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4V8a4 4 0 0 0-4-4z" />
      <path d="M12 16a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4 4 4 0 0 0-4 4v2z" opacity="0.7" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconHouseLight() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
    </svg>
  );
}

function IconLeafWave() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <path d="M12 4c-2 4 0 8 0 12" />
      <path d="M12 4c2 2 4 4 4 8s-2 6-4 8" opacity="0.8" />
      <path d="M12 4c-2 2-4 4-4 8s2 6 4 8" opacity="0.6" />
    </svg>
  );
}

function IconCircle() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}

function IconMove() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <path d="M12 5v14M5 12h14" />
      <path d="M8 9l4-4 4 4M8 15l4 4 4-4" opacity="0.7" />
    </svg>
  );
}

function IconFocus() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" opacity="0.8" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg {...SVG_PROPS} aria-hidden>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M17 15l.5 1.5L19 17l-1.5.5L17 19l-.5-1.5L15 17l1.5-.5L17 15z" opacity="0.6" />
    </svg>
  );
}

const ICON_COMPONENTS = {
  [ICON_KEYS.HAPPY]: IconSun,
  [ICON_KEYS.SAD]: IconCloud,
  [ICON_KEYS.ANXIOUS]: IconFeatherWave,
  [ICON_KEYS.OVERWHELMED]: IconSwirl,
  [ICON_KEYS.TIRED]: IconMoon,
  [ICON_KEYS.LONELY]: IconHouseLight,
  [ICON_KEYS.CALM]: IconLeafWave,
  [ICON_KEYS.NEUTRAL]: IconCircle,
  [ICON_KEYS.MOVE]: IconMove,
  [ICON_KEYS.FOCUS]: IconFocus,
  [ICON_KEYS.CREATE]: IconSparkle,
};

/**
 * Dynamic mood-based icon for the hero suggestion card.
 * Resolves icon from category, suggestion mood, or user mood; renders in a
 * softly tinted container with a 200–300ms fade transition.
 */
export default function MoodSuggestionIcon({ categoryId, suggestionMood, userMood }) {
  const iconKey = resolveIconKey({
    categoryId,
    suggestionMood,
    userMood,
  });
  const IconComponent = ICON_COMPONENTS[iconKey] ?? IconCircle;
  const bgClass = ICON_BG_CLASSES[iconKey] ?? ICON_BG_CLASSES[ICON_KEYS.NEUTRAL];

  return (
    <div
      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-250 ${bgClass}`}
      role="img"
      aria-label={`Suggestion for ${iconKey} moment`}
    >
      <span key={iconKey} className="inline-flex animate-icon-fade">
        <IconComponent />
      </span>
    </div>
  );
}
