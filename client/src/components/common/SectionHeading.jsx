export const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => (
  <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    {eyebrow ? <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{eyebrow}</p> : null}
    <h2 className="mt-3 font-display text-3xl leading-tight text-slate-950 md:text-5xl">{title}</h2>
    {description ? <p className="mt-4 text-base text-slate-600 md:text-lg">{description}</p> : null}
  </div>
);
