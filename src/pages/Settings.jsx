import { useSettings } from '../context/SettingsContext';

export default function Settings() {
  const { settings, setSettings } = useSettings();

  return (
    <div className="max-w-md animate-fade-in">
      <h1 className="font-heading text-2xl sm:text-3xl text-charcoal dark:text-dm-text font-semibold mb-2">
        Make it yours
      </h1>
      <p className="font-body text-charcoal-muted dark:text-dm-muted text-base mb-8">
        A few quiet options. Nothing overwhelming.
      </p>

      {/* Theme: Morning / Evening */}
      <section className="mb-8">
        <h2 className="font-body font-medium text-charcoal dark:text-dm-text mb-3">
          Theme
        </h2>
        <div className="flex gap-2">
          {[
            { id: 'morning', label: 'Morning', dark: false },
            { id: 'evening', label: 'Evening', dark: true },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSettings({ darkMode: opt.dark })}
              className={`px-4 py-2.5 rounded-xl font-body text-sm transition-all duration-200 ${
                settings.darkMode === opt.dark
                  ? 'bg-sage/40 dark:bg-sage/30 text-charcoal dark:text-dm-text font-medium shadow-soft'
                  : 'bg-secondary dark:bg-dm-soft text-charcoal-muted dark:text-dm-muted hover:bg-mood-hover/30 dark:hover:bg-sage/20'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="font-body text-xs text-charcoal-muted dark:text-dm-muted mt-2">
          Morning: light warm tones. Evening: muted calming darker tones.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-body font-medium text-charcoal dark:text-dm-text mb-3">
          Kind of suggestions
        </h2>
        <div className="flex gap-2">
          {['calming', 'energizing'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSettings({ energy: opt })}
              className={`px-4 py-2.5 rounded-xl font-body text-sm transition-all duration-200 ${
                settings.energy === opt
                  ? 'bg-sage/40 dark:bg-sage/30 text-charcoal dark:text-dm-text font-medium shadow-soft'
                  : 'bg-secondary dark:bg-dm-soft text-charcoal-muted dark:text-dm-muted hover:bg-mood-hover/30 dark:hover:bg-sage/20'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-body font-medium text-charcoal dark:text-dm-text mb-3">
          Tone
        </h2>
        <div className="flex gap-2">
          {['minimal', 'playful'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSettings({ style: opt })}
              className={`px-4 py-2.5 rounded-xl font-body text-sm transition-all duration-200 ${
                settings.style === opt
                  ? 'bg-sage/40 dark:bg-sage/30 text-charcoal dark:text-dm-text font-medium shadow-soft'
                  : 'bg-secondary dark:bg-dm-soft text-charcoal-muted dark:text-dm-muted hover:bg-mood-hover/30 dark:hover:bg-sage/20'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
