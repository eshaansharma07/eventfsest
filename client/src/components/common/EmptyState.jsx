import { ButtonLink } from './Button';

export const EmptyState = ({ title, description, ctaLabel = 'Explore Events', ctaTo = '/dashboard' }) => (
  <div className="glass-panel rounded-[32px] p-10 text-center">
    <h3 className="font-display text-3xl text-slate-950">{title}</h3>
    <p className="mx-auto mt-4 max-w-lg text-slate-600">{description}</p>
    <ButtonLink className="mt-6" to={ctaTo}>
      {ctaLabel}
    </ButtonLink>
  </div>
);
