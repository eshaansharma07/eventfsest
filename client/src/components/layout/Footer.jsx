import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="mt-24 border-t border-white/60 bg-white/50 px-6 py-10 backdrop-blur-xl">
    <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr]">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">EventSphere</p>
        <h3 className="mt-4 font-display text-3xl text-slate-950">A premium event operating system for modern communities.</h3>
        <p className="mt-4 max-w-xl text-slate-600">
          Built with a futuristic visual identity, role-aware dashboards, analytics intelligence, and deployment-ready MERN architecture.
        </p>
      </div>
      <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <Link to="/faq">FAQ</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </div>
  </footer>
);
