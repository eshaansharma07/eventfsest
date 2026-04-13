import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const baseClass =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300';

export const Button = ({ children, className, variant = 'primary', ...props }) => {
  const styles = {
    primary: 'bg-slate-950 text-white shadow-glow hover:-translate-y-0.5',
    secondary: 'border border-slate-200/80 bg-white/70 text-slate-900 hover:bg-white',
    ghost: 'text-slate-800 hover:bg-white/50'
  };

  return (
    <button className={cn(baseClass, styles[variant], className)} {...props}>
      {children}
    </button>
  );
};

export const ButtonLink = ({ to, children, className, variant = 'primary' }) => (
  <Link className={cn(baseClass, variant === 'primary' ? 'bg-slate-950 text-white shadow-glow' : 'border border-slate-200/80 bg-white/70 text-slate-900', className)} to={to}>
    {children}
  </Link>
);
