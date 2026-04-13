import { Mail, MapPin, Phone } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { SectionHeading } from '../../components/common/SectionHeading';

const StaticShell = ({ title, description, children }) => (
  <PageLayout>
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="EventSphere" title={title} description={description} />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  </PageLayout>
);

export const ContactPage = () => (
  <StaticShell title="Contact the EventSphere team" description="Reach the product, support, or partnership desk for demos, deployments, or event onboarding.">
    <div className="grid gap-6 md:grid-cols-3">
      {[
        [Mail, 'support@eventsphere.app'],
        [Phone, '+91 98765 43210'],
        [MapPin, 'Orion Innovation District']
      ].map(([Icon, value]) => (
        <GlassCard key={value}>
          <Icon className="text-slate-700" />
          <p className="mt-5 text-lg text-slate-700">{value}</p>
        </GlassCard>
      ))}
    </div>
  </StaticShell>
);

export const FAQPage = () => (
  <StaticShell title="Frequently asked questions" description="Simple answers for organizers, admins, and students evaluating the platform.">
    <div className="space-y-4">
      {[
        ['Can EventSphere handle approvals and registrations?', 'Yes. Admins can approve organizer events, and participants can register, cancel, and manage event history.'],
        ['Does it support analytics?', 'Yes. Revenue, attendance, popularity, registrations, and growth metrics are available through the analytics layer.'],
        ['Is it deployable?', 'Yes. The monorepo is structured for Vercel frontend hosting and Vercel serverless backend deployment.']
      ].map(([question, answer]) => (
        <GlassCard key={question}>
          <h3 className="font-display text-2xl text-slate-950">{question}</h3>
          <p className="mt-3 text-slate-600">{answer}</p>
        </GlassCard>
      ))}
    </div>
  </StaticShell>
);

export const AboutPage = () => (
  <StaticShell title="About EventSphere" description="A premium full-stack event platform designed to feel like a futuristic startup product.">
    <GlassCard>
      <p className="text-lg leading-8 text-slate-600">
        EventSphere was designed as a centralized event operating system for colleges, clubs, RWAs, and community ecosystems. It combines brand-forward presentation, operational intelligence, and practical workflows in one production-ready MERN stack platform.
      </p>
    </GlassCard>
  </StaticShell>
);

export const TermsPage = () => (
  <StaticShell title="Terms of service" description="Responsible usage guidelines for organizers, administrators, and participants.">
    <GlassCard>
      <p className="text-slate-600">Users must provide accurate registration information, respect platform policies, and avoid posting misleading or harmful event content.</p>
    </GlassCard>
  </StaticShell>
);

export const PrivacyPage = () => (
  <StaticShell title="Privacy policy" description="How EventSphere handles user profiles, registrations, notifications, and operational data.">
    <GlassCard>
      <p className="text-slate-600">The platform stores authentication, registration, and event activity data strictly for feature delivery, analytics, and notifications. Secrets belong in environment variables and must never be committed to the repository.</p>
    </GlassCard>
  </StaticShell>
);

export const NotFoundPage = () => (
  <StaticShell title="404: Experience not found" description="This route drifted outside the EventSphere timeline.">
    <GlassCard>
      <p className="text-slate-600">Use the navigation above to return to the landing page, dashboards, analytics, or event discovery surfaces.</p>
    </GlassCard>
  </StaticShell>
);
