import { Menu, Sparkles } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { ButtonLink } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const links = [
  ['Events', '/dashboard'],
  ['Calendar', '/calendar'],
  ['Analytics', '/analytics'],
  ['Contact', '/contact'],
  ['About', '/about']
];

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/60 px-5 py-3 shadow-glass backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-lilac via-sky to-pink text-white shadow-glow">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="font-display text-lg leading-none text-slate-950">EventSphere</p>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Future of Events</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className="text-sm text-slate-600 transition hover:text-slate-950">
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {user ? <ButtonLink to="/dashboard">Open Platform</ButtonLink> : <ButtonLink to="/login">Launch App</ButtonLink>}
        </div>
        <button className="rounded-full border border-white/70 bg-white/70 p-3 md:hidden">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
};
