import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/lately', label: 'Journal' },
  { to: '/about', label: 'Reflections' },
  { to: '/settings', label: 'Settings' },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden flex items-center gap-2 overflow-x-auto py-3 px-2 -mx-2 rounded-card bg-sidebar/80 dark:bg-dm-sidebar/80 mb-6 scrollbar-hide">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `shrink-0 px-4 py-2 rounded-xl font-body text-sm transition-colors ${
            isActive ? 'bg-mood-hover/60 dark:bg-dm-soft text-charcoal dark:text-dm-text font-medium' : 'text-charcoal-muted dark:text-dm-muted hover:bg-mood-hover/30'
          }`
        }
      >
        Home
      </NavLink>
      {links.filter((l) => l.to !== '/').map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `shrink-0 px-4 py-2 rounded-xl font-body text-sm transition-colors ${
              isActive ? 'bg-mood-hover/60 dark:bg-dm-soft text-charcoal dark:text-dm-text font-medium' : 'text-charcoal-muted dark:text-dm-muted hover:bg-mood-hover/30'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
