import { GlassCard } from '../common/GlassCard';

const stats = [
  { label: 'Campus Experiences Powered', value: '120+' },
  { label: 'Registrations Processed', value: '38K+' },
  { label: 'Live Organizer Teams', value: '240+' },
  { label: 'Average Satisfaction Score', value: '4.9/5' }
];

export const StatsStrip = () => (
  <section className="px-6 py-8">
    <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <GlassCard key={stat.label} delay={index * 0.08}>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{stat.label}</p>
          <p className="mt-4 font-display text-4xl text-slate-950">{stat.value}</p>
        </GlassCard>
      ))}
    </div>
  </section>
);
