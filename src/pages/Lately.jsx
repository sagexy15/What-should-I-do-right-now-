import { getHistory, getRelativeLabel } from '../lib/history';

export default function Lately() {
  const history = getHistory();

  return (
    <div className="animate-fade-in">
      <h1 className="font-heading text-2xl sm:text-3xl text-charcoal dark:text-dm-text font-semibold mb-2">
        Lately
      </h1>
      <p className="font-body text-charcoal-muted dark:text-dm-muted text-base mb-8">
        Recent moments — no scores, no streaks. Just what came up.
      </p>
      {history.length === 0 ? (
        <p className="font-body text-charcoal-muted dark:text-dm-muted italic rounded-card bg-secondary/50 dark:bg-dm-soft/50 p-6">
          Nothing here yet. When you ask for a suggestion on the home page, it&apos;ll show up here — softly.
        </p>
      ) : (
        <ul className="space-y-0">
          {history.map((entry, i) => (
            <li
              key={`${entry.at}-${i}`}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-4 border-b border-stone/20 dark:border-dm-soft/30 last:border-0"
            >
              <span className="font-body text-charcoal dark:text-dm-text">
                {entry.text}
              </span>
              <span className="font-body text-sm text-charcoal-muted dark:text-dm-muted shrink-0">
                {getRelativeLabel(entry.at)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
