import { NavLink } from 'react-router-dom';

const base =
  'font-body text-sm text-charcoal-muted dark:text-stone hover:text-charcoal dark:hover:text-cream transition-colors duration-200';
const active = 'text-charcoal dark:text-cream font-medium';

export default function Nav() {
  return (
    <nav className="border-b border-stone/15 dark:border-soft/20 bg-nav/80 dark:bg-soft/10 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-2xl px-5 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className={({ isActive }) => `${base} ${isActive ? active : ''}`}
        >
          right now
        </NavLink>
        <div className="flex items-center gap-6">
          <NavLink
            to="/games"
            className={({ isActive }) => `${base} ${isActive ? active : ''}`}
          >
            games
          </NavLink>
          <NavLink
            to="/lately"
            className={({ isActive }) => `${base} ${isActive ? active : ''}`}
          >
            lately
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${base} ${isActive ? active : ''}`}
          >
            about
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `${base} ${isActive ? active : ''}`}
          >
            settings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
