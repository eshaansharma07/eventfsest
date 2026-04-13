import { GlassCard } from './GlassCard';

export const MetricCard = ({ label, value, helper, icon: Icon }) => (
  <GlassCard className="relative overflow-hidden">
    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-lilac/20 to-transparent blur-2xl" />
    <div className="relative">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{label}</p>
        {Icon ? <Icon size={18} className="text-slate-500" /> : null}
      </div>
      <p className="mt-5 font-display text-4xl text-slate-950">{value}</p>
      {helper ? <p className="mt-3 text-sm text-slate-500">{helper}</p> : null}
    </div>
  </GlassCard>
);
