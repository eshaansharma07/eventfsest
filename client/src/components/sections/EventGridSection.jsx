import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../common/GlassCard';
import { SectionHeading } from '../common/SectionHeading';
import { formatDate } from '../../lib/utils';

export const EventGridSection = ({ eyebrow, title, description, events = [] }) => (
  <section className="px-6 py-12">
    <div className="mx-auto max-w-7xl">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event, index) => (
          <GlassCard key={event._id || event.slug} delay={index * 0.08} className="group overflow-hidden">
            <div
              className="h-56 rounded-[24px] bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${event.banner})` }}
            />
            <div className="mt-5 flex items-center justify-between">
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white">
                {event.category?.name || 'Featured'}
              </span>
              <span className="text-sm text-slate-500">{event.status}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-slate-950">{event.title}</h3>
            <p className="mt-3 line-clamp-3 text-slate-600">{event.shortDescription}</p>
            <div className="mt-5 grid gap-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>{formatDate(event.startsAt, { withTime: true })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{event.registeredCount} registered</span>
              </div>
            </div>
            <Link className="mt-6 inline-flex text-sm font-semibold text-slate-950" to={`/events/${event.slug}`}>
              Open experience
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);
