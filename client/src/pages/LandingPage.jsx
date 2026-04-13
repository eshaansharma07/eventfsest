import { useAsync } from '../hooks/useAsync';
import { publicApi } from '../api/endpoints';
import { fallbackLanding } from '../data/mockData';
import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../components/sections/HeroSection';
import { StatsStrip } from '../components/sections/StatsStrip';
import { EventGridSection } from '../components/sections/EventGridSection';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeading } from '../components/common/SectionHeading';

export const LandingPage = () => {
  const { data } = useAsync(async () => {
    try {
      return await publicApi.landing();
    } catch (error) {
      return { data: fallbackLanding };
    }
  }, []);

  const payload = data || fallbackLanding;

  return (
    <PageLayout>
      <HeroSection />
      <StatsStrip />
      <EventGridSection
        eyebrow="Featured Events"
        title="Premium event journeys designed to feel unlike ordinary campus tools."
        description="Discover flagship launches, creator workshops, cultural festivals, and high-energy hackathons through a premium discovery experience."
        events={payload.featuredEvents || []}
      />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Platform Advantages"
            title="Designed for organizers, admins, and participants in one intelligent flow."
            description="EventSphere combines approvals, analytics, ticketing, notifications, favorites, countdowns, and attendance tracking inside one cinematic product."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              ['Organizer Intelligence', 'Build premium events, manage banners, participants, and announcements without juggling tools.'],
              ['Admin Command Layer', 'Approve events, monitor platform growth, track user momentum, and spotlight featured experiences.'],
              ['Participant Delight', 'Register, receive tickets, scan QR attendance, save favorites, and revisit event history beautifully.']
            ].map(([title, description], index) => (
              <GlassCard key={title} delay={index * 0.08} className="min-h-[240px]">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">0{index + 1}</p>
                <h3 className="mt-6 font-display text-3xl text-slate-950">{title}</h3>
                <p className="mt-4 text-slate-600">{description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <EventGridSection
        eyebrow="Trending Now"
        title="What communities are opening next."
        description="Spot the events with the most registrations, attention, and social energy."
        events={payload.trendingEvents || []}
      />
    </PageLayout>
  );
};
