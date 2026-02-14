import { moods } from '../data/suggestions';

export default function MoodPicker({ value, onChange }) {
  return (
    <div className="rounded-card bg-secondary dark:bg-dm-soft px-4 py-3 shadow-soft flex flex-wrap items-center gap-2 mb-8">
      <span className="font-body text-charcoal-muted dark:text-dm-muted text-sm mr-1 self-center">
        How are you feeling?
      </span>
      {moods.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(value === m.id ? null : m.id)}
          className={`px-3 py-1.5 rounded-xl font-body text-sm transition-all duration-200 ${
            value === m.id
              ? 'bg-mood-hover dark:bg-sage/40 text-charcoal dark:text-dm-text font-medium shadow-soft'
              : 'bg-white/60 dark:bg-dm-bg/50 text-charcoal-muted dark:text-dm-muted hover:bg-mood-hover/40 dark:hover:bg-sage/20'
          }`}
        >
          {m.label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(value === 'unsure' ? null : 'unsure')}
        className={`px-3 py-1.5 rounded-xl font-body text-sm transition-all duration-200 ${
          value === 'unsure'
            ? 'bg-mood-hover dark:bg-sage/40 text-charcoal dark:text-dm-text font-medium shadow-soft'
            : 'bg-white/60 dark:bg-dm-bg/50 text-charcoal-muted dark:text-dm-muted hover:bg-mood-hover/40 dark:hover:bg-sage/20'
        }`}
      >
        I don&apos;t know how I feel
      </button>
    </div>
  );
}
