import { motion } from 'framer-motion';
import { BellRing, Calendar1, Clock3, IndianRupee, Ticket, Users } from 'lucide-react';
import { ButtonLink } from '../common/Button';

const floatingCards = [
  { label: 'Ticket Sales', value: '1,248', icon: Ticket, className: 'top-6 right-4' },
  { label: 'Revenue', value: '₹8.4L', icon: IndianRupee, className: 'top-32 -left-4' },
  { label: 'Attendees', value: '9.2k', icon: Users, className: 'bottom-20 -left-10' },
  { label: 'Calendar', value: '18 Events', icon: Calendar1, className: '-bottom-4 right-14' },
  { label: 'Notifications', value: '24 live', icon: BellRing, className: 'top-2 left-16' },
  { label: 'Countdown', value: '02:14:19', icon: Clock3, className: 'bottom-2 right-2' }
];

export const HeroSection = () => (
  <section className="px-6 pb-20 pt-14">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative z-10">
        <p className="text-sm uppercase tracking-[0.45em] text-slate-500">Futuristic Event Operations</p>
        <h1 className="mt-6 font-display text-5xl leading-[0.95] text-slate-950 md:text-7xl">
          Events that feel
          <span className="block bg-gradient-to-r from-lilac via-sky to-pink bg-clip-text text-transparent">cinematic, intelligent, and alive.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          EventSphere centralizes registrations, approvals, tickets, analytics, attendance, reminders, and premium experiences for campuses and communities.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/signup">Start Building Events</ButtonLink>
          <ButtonLink to="/dashboard" variant="secondary">
            Explore Dashboard
          </ButtonLink>
        </div>
      </div>

      <div className="relative min-h-[560px]">
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel absolute inset-0 rounded-[40px] border border-white/60 bg-white/55 p-6 shadow-glow"
        >
          <div className="absolute inset-6 rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Live Command Center</p>
                <h3 className="mt-3 font-display text-3xl">FutureFest Launch Panel</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em]">Live bookings +12%</div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/10 p-5">
                <p className="text-white/60">Audience Pulse</p>
                <div className="mt-5 h-28 rounded-[20px] bg-gradient-to-r from-lilac/40 via-sky/30 to-pink/30" />
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/10 p-5">
                <p className="text-white/60">Countdown Matrix</p>
                <h4 className="mt-5 font-display text-4xl">18d 09h</h4>
                <p className="mt-3 text-sm text-white/55">Until the spotlight floods the main stage.</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 md:col-span-2">
                <p className="text-white/60">Premium Event Snapshot</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[22px] bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Guests</p>
                    <h5 className="mt-2 text-2xl">9,284</h5>
                  </div>
                  <div className="rounded-[22px] bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Revenue</p>
                    <h5 className="mt-2 text-2xl">₹8.4L</h5>
                  </div>
                  <div className="rounded-[22px] bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Alerts</p>
                    <h5 className="mt-2 text-2xl">24</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {floatingCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
            className={`glass-panel absolute ${card.className} rounded-[24px] border border-white/60 px-4 py-3 shadow-glass`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-lilac/30 via-sky/30 to-pink/30 text-slate-950">
                <card.icon size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{card.label}</p>
                <p className="font-display text-xl text-slate-950">{card.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
