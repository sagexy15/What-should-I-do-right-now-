import { Link } from 'react-router-dom';
import { getHistory } from '../lib/history';
import { useSettings } from '../context/SettingsContext';
import { moods } from '../data/suggestions';

const CALMING_TIPS = [
  "One breath at a time is enough.",
  "It's okay to move slowly today.",
  "Small steps still count.",
  "You don't have to have it all figured out.",
  "Rest is part of the work.",
  "Gentle with yourself.",
];

function getMoodSummary(moodId) {
  if (!moodId || moodId === 'unsure') return null;
  const mood = moods.find((m) => m.id === moodId);
  if (!mood) return null;
  const summaries = {
    tired: "You've been feeling tired lately.",
    anxious: "You've been feeling anxious lately.",
    bored: "You've been feeling a bit bored lately.",
    overwhelmed: "You've been feeling overwhelmed lately.",
    okay: "You're doing okay lately.",
    playful: "You've been in a playful mood lately.",
  };
  return summaries[mood.id] || `You've been feeling ${mood.label} lately.`;
}

export default function RightPanel() {
  const { settings } = useSettings();
  const history = getHistory();
  const moodSummary = getMoodSummary(settings.mood);
  const tip = CALMING_TIPS[Math.floor(Math.random() * CALMING_TIPS.length)];

  return (
    <aside className="w-[260px] h-full min-h-screen shrink-0 rounded-card-lg bg-panel-right dark:bg-dm-panel py-6 px-4 flex flex-col gap-6 shadow-soft overflow-hidden">
      <div>
        <h3 className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted dark:text-dm-muted mb-3">
          Gentle support
        </h3>
        {moodSummary && (
          <p className="font-body text-sm text-charcoal dark:text-dm-text leading-relaxed mb-3">
            {moodSummary}
          </p>
        )}
        <p className="font-body text-sm text-charcoal-muted dark:text-dm-muted leading-relaxed italic">
          {tip}
        </p>
      </div>

      {history.length > 0 && (
        <div>
          <h3 className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted dark:text-dm-muted mb-3">
            Recent moments
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {history.slice(0, 5).map((entry, i) => (
              <span
                key={`${entry.at}-${i}`}
                className="inline-block w-2 h-2 rounded-full bg-sage/50 dark:bg-sage/40"
                title={entry.text}
              />
            ))}
          </div>
          <p className="font-body text-xs text-charcoal-muted dark:text-dm-muted mt-2">
            Soft history — no scores, just what came up.
          </p>
        </div>
      )}

      <Link
        to="/games"
        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-sage/30 dark:bg-sage/20 text-charcoal dark:text-dm-text font-body text-sm font-medium hover:bg-sage/50 dark:hover:bg-sage/30 transition-all duration-200 shadow-soft hover:shadow-lift hover:-translate-y-0.5"
      >
        <span>Take a Gentle Break</span>
        <span className="text-base">→</span>
      </Link>
    </aside>
  );
}
