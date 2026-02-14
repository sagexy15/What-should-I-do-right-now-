import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { getGamesForMood } from '../data/games';
import { moods } from '../data/suggestions';

const CARD_DELAY_MS = 80;

export default function Games() {
  const { settings } = useSettings();
  const [reminderOn, setReminderOn] = useState(false);

  const moodId = settings.mood;
  const moodLabel = moodId && moodId !== 'unsure' ? moods.find((m) => m.id === moodId)?.label : null;
  const gamesToShow = getGamesForMood(moodId);

  const handlePlay = (url) => {
    if (reminderOn) {
      const message = "We'll remind you in 5 minutes. Open the game now?";
      if (window.confirm(message)) {
        window.open(url, '_blank', 'noopener,noreferrer');
        setTimeout(() => {
          alert("Reminder: you started a gentle break 5 minutes ago. It's okay to pause anytime.");
        }, 5 * 60 * 1000);
      }
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <header className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-charcoal dark:text-dm-text font-semibold tracking-tight mb-2">
          Take a Gentle Break
        </h1>
        <p className="font-body text-charcoal-muted dark:text-dm-muted text-base">
          {moodLabel
            ? "Here are some gentle games chosen for how you're feeling."
            : "Here are a few light online games you can play right now."}
        </p>
      </header>

      {moodLabel && (
        <section className="flex flex-col gap-2 mb-8">
          <p className="font-body text-charcoal-muted dark:text-dm-muted text-sm">
            Based on how you&apos;re feeling:{' '}
            <span className="inline-flex items-center px-3 py-1 rounded-xl bg-mood-hover/50 dark:bg-sage/30 text-charcoal dark:text-dm-text font-medium">
              {moodLabel}
            </span>
          </p>
          {gamesToShow.length > 0 && (
            <p className="font-body text-charcoal-muted/80 dark:text-dm-muted/80 text-xs">
              {gamesToShow.length} {gamesToShow.length === 1 ? 'game' : 'games'} chosen for you
            </p>
          )}
        </section>
      )}

      {gamesToShow.length > 0 ? (
        <section className="grid gap-4 mb-10">
          {gamesToShow.map((game, i) => (
            <article
              key={game.id}
              className="rounded-card-lg bg-secondary dark:bg-dm-soft border border-stone/20 dark:border-dm-soft/50 shadow-card p-5 sm:p-6 transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 animate-fade-in-slow"
              style={{
                animationDelay: `${CARD_DELAY_MS * (i + 1)}ms`,
                animationFillMode: 'both',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-heading text-lg font-semibold text-charcoal dark:text-dm-text mb-1">
                    {game.title}
                  </h2>
                  <p className="font-body text-charcoal-muted dark:text-dm-muted text-sm mb-3">
                    {game.description}
                  </p>
                  <span className="inline-block px-2.5 py-1 rounded-xl font-body text-xs text-charcoal-muted dark:text-dm-muted bg-sage/20 dark:bg-sage/20">
                    {game.moodTag}
                  </span>
                </div>
                <div className="flex flex-col items-stretch sm:items-end gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handlePlay(game.url)}
                    className="px-5 py-2.5 rounded-xl bg-btn-primary dark:bg-sage/50 text-charcoal dark:text-dm-text font-body text-sm font-medium hover:bg-mood-hover dark:hover:bg-sage/60 transition-all duration-200 shadow-soft hover:shadow-lift hover:-translate-y-0.5"
                  >
                    Play Now
                  </button>
                  <span className="font-body text-xs text-charcoal-muted/80 dark:text-dm-muted/80">
                    Opens in a new tab
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="text-center py-12 mb-10 rounded-card bg-secondary/50 dark:bg-dm-soft/50">
          <p className="font-body text-charcoal-muted dark:text-dm-muted text-base">
            {moodLabel
              ? "No games found for this mood. Select a different mood or check back later."
              : "Select a mood on the home page to see personalized game suggestions."}
          </p>
        </section>
      )}

      <section className="rounded-card bg-mood-hover/30 dark:bg-sage/10 border border-stone/15 dark:border-dm-soft/30 p-5 mb-10">
        <p className="font-body text-charcoal dark:text-dm-text text-sm mb-3">
          Would you like a 5-minute reminder before you start?
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={reminderOn}
          onClick={() => setReminderOn((v) => !v)}
          className="inline-flex items-center gap-3 font-body text-sm text-charcoal dark:text-dm-text"
        >
          <span
            className={`relative w-11 h-6 rounded-pill flex items-center transition-colors duration-200 ${
              reminderOn ? 'bg-sage/60 dark:bg-sage/50' : 'bg-secondary dark:bg-dm-soft border border-stone/30 dark:border-dm-soft'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-charcoal-muted dark:bg-dm-muted shadow-soft transition-transform duration-200 ${
                reminderOn ? 'left-6' : 'left-1'
              }`}
            />
          </span>
          <span>{reminderOn ? 'Reminder on' : 'Reminder off'}</span>
        </button>
      </section>

      <footer className="text-center pb-4">
        <p className="font-body text-charcoal-muted dark:text-dm-muted text-sm italic">
          It&apos;s okay to pause. You can come back anytime.
        </p>
      </footer>
    </div>
  );
}
