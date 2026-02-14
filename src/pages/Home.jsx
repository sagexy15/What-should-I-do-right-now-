import { useState } from 'react';
import { Link } from 'react-router-dom';
import { pickSuggestion, categories } from '../data/suggestions';
import { addToHistory } from '../lib/history';
import { useSettings } from '../context/SettingsContext';
import MoodPicker from '../components/MoodPicker';
import MoodSuggestionIcon from '../components/MoodSuggestionIcon';
import {
  categoryContent,
  mapSearchToFeelingCluster,
  getResetContent,
} from '../data/emotionalContent';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning.';
  if (h < 17) return 'Good afternoon.';
  return 'Good evening.';
}

export default function Home() {
  const [suggestion, setSuggestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { settings, setSettings } = useSettings();
  const [mood, setMood] = useState(settings.mood ?? null);
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting] = useState(getGreeting);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const handleMoodChange = (newMood) => {
    setMood(newMood);
    setSettings({ mood: newMood });
  };

  const showSuggestion = (excludeText = null, category = null) => {
    setIsVisible(false);
    const next = pickSuggestion({
      mood: mood || undefined,
      energy: settings.energy,
      style: settings.style,
      excludeText,
      category: category || selectedCategory,
      searchQuery: searchQuery.trim() || undefined,
    });
    setSuggestion(next);
    if (next?.text) addToHistory(next.text);
    requestAnimationFrame(() => setIsVisible(true));
  };

  const handleTryThis = () => {
    const q = searchQuery.trim();
    if (q) {
      const mapped = mapSearchToFeelingCluster(q);
      if (mapped) {
        setSearchResult({ type: 'cluster', cluster: mapped.cluster, matchedBy: mapped.matchedBy });
        setOpenCategoryId(null);
        return;
      }
      setSearchResult(null);
    }
    if (suggestion) showSuggestion(suggestion.text);
    else showSuggestion();
  };

  const handleAnother = () => showSuggestion(suggestion?.text);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat.id);
    setOpenCategoryId(cat.id);
    setSearchResult(null);
    showSuggestion(null, cat.id);
  };

  const handleSearchSubmit = () => {
    const q = searchQuery.trim();
    if (!q) return;
    const mapped = mapSearchToFeelingCluster(q);
    if (mapped) {
      setSearchResult({ type: 'cluster', cluster: mapped.cluster, matchedBy: mapped.matchedBy });
      setOpenCategoryId(null);
    } else {
      setSearchResult({ type: 'gentler' });
      setOpenCategoryId(null);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  const handleShowSomethingGentler = () => {
    setSearchResult({ type: 'gentler' });
  };

  const closePanels = () => {
    setOpenCategoryId(null);
    setSearchResult(null);
  };

  return (
    <div className="animate-fade-in">
      {/* Optional intention banner */}
      <p className="font-body text-sm text-charcoal-muted dark:text-dm-muted mb-6 italic">
        Today doesn&apos;t need to be perfect.
      </p>

      {/* Search + header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 max-w-md mb-6">
          <div className="flex-1 rounded-xl bg-secondary dark:bg-dm-soft border border-transparent focus-within:border-sage/30 dark:focus-within:border-sage/40 transition-colors">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search how you're feeling…"
              className="w-full bg-transparent px-4 py-3 font-body text-sm text-charcoal dark:text-dm-text placeholder:text-charcoal-muted/70 dark:placeholder:text-dm-muted/70 focus:outline-none rounded-xl"
              aria-label="Search how you're feeling"
            />
          </div>
          <button
            type="button"
            onClick={handleSearchSubmit}
            className="px-4 py-3 rounded-xl bg-sage/30 dark:bg-sage/20 text-charcoal dark:text-dm-text font-body text-sm font-medium hover:bg-sage/50 dark:hover:bg-sage/30 transition-colors shrink-0"
          >
            Search
          </button>
          <button
            type="button"
            aria-label="Reminders"
            className="w-10 h-10 rounded-xl bg-secondary dark:bg-dm-soft flex items-center justify-center text-charcoal-muted dark:text-dm-muted hover:text-charcoal dark:hover:text-dm-text transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-.454A1.99 1.99 0 0 0 22 16.129V16a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v.129a1.99 1.99 0 0 0 1.691 1.943 23.848 23.848 0 0 0 5.454.454M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6 19h12" />
            </svg>
          </button>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl text-charcoal dark:text-dm-text font-semibold tracking-tight mb-1">
          {greeting}
        </h1>
        <p className="font-body text-charcoal-muted dark:text-dm-muted text-base">
          What feels manageable right now?
        </p>
      </div>

      <MoodPicker value={mood} onChange={handleMoodChange} />

      {/* Hero suggestion card */}
      <div className="rounded-card-lg bg-secondary dark:bg-dm-soft border border-stone/20 dark:border-dm-soft/50 shadow-card p-6 sm:p-8 mb-8 transition-all duration-300 hover:shadow-lift">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <MoodSuggestionIcon
            categoryId={selectedCategory}
            suggestionMood={suggestion?.mood}
            userMood={mood}
          />
          <div className="flex-1 min-w-0">
            <p className="font-body text-lg sm:text-xl text-charcoal dark:text-dm-text leading-relaxed mb-6 min-h-[2.5rem]">
              {suggestion ? (
                <span className={isVisible ? 'opacity-100 translate-y-0 inline-block transition-all duration-500' : 'opacity-0 translate-y-2 inline-block'}>
                  {suggestion.text}
                </span>
              ) : (
                <span className="text-charcoal-muted dark:text-dm-muted">A small, kind idea when you&apos;re ready.</span>
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleTryThis}
                className="px-6 py-3 rounded-xl bg-btn-primary dark:bg-sage/50 text-charcoal dark:text-dm-text font-body text-sm font-medium hover:bg-mood-hover dark:hover:bg-sage/60 transition-all duration-200 shadow-soft hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0"
              >
                {suggestion ? 'Try This' : 'Tell me'}
              </button>
              {suggestion && (
                <button
                  type="button"
                  onClick={handleAnother}
                  className="px-6 py-3 rounded-xl border-2 border-sage/40 dark:border-sage/30 text-charcoal dark:text-dm-text font-body text-sm hover:bg-sage/20 dark:hover:bg-sage/10 transition-all duration-200"
                >
                  I want another idea
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category panel — when user clicks a category card */}
      {openCategoryId && categoryContent[openCategoryId] && (
        <div className="rounded-card-lg bg-secondary dark:bg-dm-soft border border-stone/20 dark:border-dm-soft/50 shadow-card p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="flex items-start justify-between gap-4 mb-4">
            <span className="text-3xl" aria-hidden>{categoryContent[openCategoryId].icon}</span>
            <button
              type="button"
              onClick={closePanels}
              className="rounded-xl p-2 text-charcoal-muted dark:text-dm-muted hover:bg-sage/20 dark:hover:bg-sage/10 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p className="font-body text-lg text-sage dark:text-sage/90 italic mb-6">
            &ldquo;{categoryContent[openCategoryId].quote}&rdquo;
          </p>
          <ul className="space-y-3">
            {categoryContent[openCategoryId].suggestions.map((item, i) => (
              <li key={i} className="font-body text-charcoal dark:text-dm-text flex items-start gap-2">
                <span className="text-sage dark:text-sage/80 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Emotional search result panel */}
      {searchResult && !openCategoryId && (
        <div className="rounded-card-lg bg-secondary dark:bg-dm-soft border border-stone/20 dark:border-dm-soft/50 shadow-card p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="flex items-start justify-between gap-4 mb-4">
            <span className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted dark:text-dm-muted">
              {searchResult.type === 'gentler' ? 'Gentle reset' : 'Similar feelings'}
            </span>
            <button
              type="button"
              onClick={closePanels}
              className="rounded-xl p-2 text-charcoal-muted dark:text-dm-muted hover:bg-sage/20 dark:hover:bg-sage/10 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          {searchResult.type === 'gentler' ? (
            <>
              <p className="font-body text-lg text-sage dark:text-sage/90 italic mb-6">
                &ldquo;{getResetContent().quote}&rdquo;
              </p>
              <ul className="space-y-3 mb-6">
                {getResetContent().suggestions.map((item, i) => (
                  <li key={i} className="font-body text-charcoal dark:text-dm-text flex items-start gap-2">
                    <span className="text-sage dark:text-sage/80 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="font-body text-sm text-charcoal-muted dark:text-dm-muted mb-2">
                {searchResult.cluster.label}
              </p>
              <p className="font-body text-lg text-sage dark:text-sage/90 italic mb-6">
                &ldquo;{searchResult.cluster.quote}&rdquo;
              </p>
              <ul className="space-y-3 mb-6">
                {searchResult.cluster.suggestions.map((item, i) => (
                  <li key={i} className="font-body text-charcoal dark:text-dm-text flex items-start gap-2">
                    <span className="text-sage dark:text-sage/80 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-body text-sm text-charcoal-muted dark:text-dm-muted mb-3">
                Does this feel close?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={closePanels}
                  className="px-5 py-2.5 rounded-xl bg-btn-primary dark:bg-sage/50 text-charcoal dark:text-dm-text font-body text-sm font-medium hover:bg-mood-hover dark:hover:bg-sage/60 transition-colors"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={handleShowSomethingGentler}
                  className="px-5 py-2.5 rounded-xl border-2 border-sage/40 dark:border-sage/30 text-charcoal dark:text-dm-text font-body text-sm hover:bg-sage/20 dark:hover:bg-sage/10 transition-colors"
                >
                  Show something gentler
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Category grid */}
      <h2 className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted dark:text-dm-muted mb-4">
        Or choose a gentle direction
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
        {categories.map((cat) => {
          const tintClass = {
            reset: 'bg-card-tint-reset dark:bg-dm-soft/60',
            move: 'bg-card-tint-move dark:bg-dm-soft/60',
            pause: 'bg-card-tint-pause dark:bg-dm-soft/60',
            focus: 'bg-card-tint-focus dark:bg-dm-soft/60',
            create: 'bg-card-tint-create dark:bg-dm-soft/60',
            relax: 'bg-card-tint-relax dark:bg-dm-soft/60',
          }[cat.id] || 'bg-secondary dark:bg-dm-soft/60';
          return (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryClick(cat)}
            className={`rounded-card ${tintClass} p-4 text-left transition-all duration-200 hover:shadow-lift hover:-translate-y-0.5 border border-transparent hover:border-sage/20 dark:hover:border-sage/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40`}
          >
            <span className="text-2xl mb-2 block" aria-hidden>{cat.icon}</span>
            <span className="font-body font-medium text-charcoal dark:text-dm-text text-sm block">{cat.title}</span>
            <span className="font-body text-xs text-charcoal-muted dark:text-dm-muted">{cat.description}</span>
          </button>
          );
        })}
      </div>

      {/* Gentle games link */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/games"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mood-hover/50 dark:bg-sage/20 hover:bg-mood-hover dark:hover:bg-sage/30 text-charcoal dark:text-dm-text font-body text-sm transition-all duration-200 shadow-soft hover:-translate-y-0.5"
        >
          <span>or play a gentle game</span>
          <span className="text-lg">→</span>
        </Link>
      </div>

      {/* Floating "Need something lighter?" — optional quick access */}
      <Link
        to="/games"
        className="fixed bottom-6 right-6 lg:right-[calc(260px+1.5rem)] px-4 py-2.5 rounded-xl bg-white/90 dark:bg-dm-soft/90 shadow-lift border border-stone/20 dark:border-dm-soft/50 font-body text-sm text-charcoal dark:text-dm-text hover:bg-white dark:hover:bg-dm-soft transition-all duration-200 hover:-translate-y-0.5 z-20"
      >
        Need something lighter?
      </Link>
    </div>
  );
}
