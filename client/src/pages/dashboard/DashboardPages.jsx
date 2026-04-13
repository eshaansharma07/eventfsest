import { useMemo, useState } from 'react';
import { Calendar, Heart, IndianRupee, LayoutDashboard, MessageSquareText, PlusCircle, Sparkles, Ticket, Users } from 'lucide-react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { dashboardApi, eventApi, publicApi } from '../../api/endpoints';
import { useAsync } from '../../hooks/useAsync';
import { useAuth } from '../../context/AuthContext';
import { PageLayout } from '../../components/layout/PageLayout';
import { MetricCard } from '../../components/common/MetricCard';
import { SectionHeading } from '../../components/common/SectionHeading';
import { AreaChartCard, BarChartCard, PieChartCard } from '../../components/charts/ChartCard';
import { DataTable } from '../../components/common/DataTable';
import { EmptyState } from '../../components/common/EmptyState';
import { Button, ButtonLink } from '../../components/common/Button';
import { GlassCard } from '../../components/common/GlassCard';
import { formatCurrency, formatDate } from '../../lib/utils';

const localizer = momentLocalizer(moment);

const DashboardShell = ({ title, description, children, actions }) => (
  <PageLayout>
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Command Center" title={title} description={description} />
          <div className="flex flex-wrap gap-3">{actions}</div>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  </PageLayout>
);

export const DashboardPage = () => {
  const { user } = useAuth();
  const { data: eventData } = useAsync(() => publicApi.events({ approved: true }), []);
  const { data: registrationData } = useAsync(() => dashboardApi.registrations(), []);
  const { data: notificationData } = useAsync(() => dashboardApi.notifications(), []);

  const events = eventData?.events || [];
  const registrations = registrationData?.registrations || [];
  const notifications = notificationData?.notifications || [];

  const roleTitle =
    user?.role === 'admin'
      ? 'Admin Dashboard'
      : user?.role === 'organizer'
        ? 'Organizer Dashboard'
        : 'Participant Dashboard';

  return (
    <DashboardShell
      title={roleTitle}
      description="A premium multi-role dashboard that centralizes discovery, registrations, notifications, and platform momentum."
      actions={
        <>
          {user?.role !== 'participant' ? <ButtonLink to="/create-event">Create Event</ButtonLink> : null}
          <ButtonLink to="/calendar" variant="secondary">
            Open Calendar
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-4">
        <MetricCard label="Live Events" value={events.length} helper="Approved experiences available now" icon={LayoutDashboard} />
        <MetricCard label="My Registrations" value={registrations.length} helper="Tickets and participation history" icon={Ticket} />
        <MetricCard label="Favorites" value={user?.favorites?.length || 0} helper="Saved events for quick access" icon={Heart} />
        <MetricCard label="Alerts" value={notifications.length} helper="Reminders and announcements" icon={Sparkles} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AreaChartCard
          title="Registration Pulse"
          data={registrations.map((registration, index) => ({ name: `R${index + 1}`, value: index + 1 }))}
          color="#22D3EE"
        />
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Notification Feed</p>
          <div className="mt-6 space-y-4">
            {notifications.length ? (
              notifications.slice(0, 5).map((notification) => (
                <div key={notification._id} className="rounded-[24px] border border-white/60 bg-white/50 p-4">
                  <h3 className="font-semibold text-slate-950">{notification.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500">Notifications will appear here once reminders or announcements are available.</p>
            )}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6">
        {events.length ? (
          <DataTable
            columns={[
              {
                key: 'title',
                label: 'Event',
                render: (value, row) => (
                  <Link className="font-semibold text-slate-950 underline-offset-4 hover:underline" to={`/events/${row.slug}`}>
                    {value}
                  </Link>
                )
              },
              { key: 'venue', label: 'Venue' },
              { key: 'startsAt', label: 'Start', render: (value) => formatDate(value, { withTime: true }) },
              { key: 'registeredCount', label: 'Registrations' },
              { key: 'status', label: 'Status' },
              {
                key: '_id',
                label: 'Open',
                render: (_, row) => (
                  <Link
                    className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5"
                    to={`/events/${row.slug}`}
                  >
                    View Event
                  </Link>
                )
              }
            ]}
            rows={events.slice(0, 6)}
          />
        ) : (
          <EmptyState title="No events yet" description="Seed the backend or create your first event to unlock the complete dashboard experience." />
        )}
      </div>
    </DashboardShell>
  );
};

export const OrganizerDashboardPage = () => {
  const { data } = useAsync(() => dashboardApi.organizer(), []);
  const payload = data || {};
  const [selectedEventId, setSelectedEventId] = useState('');
  const activeEventId = selectedEventId || payload.events?.[0]?._id || '';
  const { data: participantData } = useAsync(
    () => (activeEventId ? eventApi.participants(activeEventId) : Promise.resolve({ data: { registrations: [] } })),
    [activeEventId]
  );
  const participantRows = participantData?.registrations || [];

  return (
    <DashboardShell
      title="Organizer Control Deck"
      description="Manage premium event launches, participant pipelines, announcements, attendance, and revenue from one place."
      actions={<ButtonLink to="/create-event">Create New Event</ButtonLink>}
    >
      <div className="grid gap-6 xl:grid-cols-4">
        <MetricCard label="Events Created" value={payload.metrics?.totalEvents || 0} icon={PlusCircle} />
        <MetricCard label="Registrations" value={payload.metrics?.registrations || 0} icon={Users} />
        <MetricCard label="Attendance" value={payload.metrics?.attendance || 0} icon={Ticket} />
        <MetricCard label="Revenue" value={formatCurrency(payload.metrics?.revenue || 0)} icon={IndianRupee} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <BarChartCard
          title="Event Demand"
          data={(payload.events || []).map((event) => ({ name: event.title.slice(0, 8), value: event.registeredCount }))}
        />
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Organizer Feed</p>
          <div className="mt-6 space-y-4">
            {(payload.notifications || []).map((notification) => (
              <div key={notification._id} className="rounded-[24px] border border-white/60 bg-white/50 p-4">
                <h3 className="font-semibold text-slate-950">{notification.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <div className="mt-6">
        {(payload.events || []).length ? (
          <DataTable
            columns={[
              { key: 'title', label: 'Event' },
              { key: 'status', label: 'Status' },
              {
                key: 'approved',
                label: 'Approval',
                render: (value) => (value ? 'Approved' : 'Pending Admin Approval')
              },
              { key: 'startsAt', label: 'Start', render: (value) => formatDate(value, { withTime: true }) },
              { key: 'registeredCount', label: 'Registrations' }
            ]}
            rows={payload.events}
          />
        ) : (
          <EmptyState
            title="No organizer events yet"
            description="Create your first event to see it appear here with its approval status and performance."
            ctaLabel="Create Event"
            ctaTo="/create-event"
          />
        )}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[0.36fr_0.64fr]">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Registered Students</p>
          <p className="mt-3 text-sm text-slate-600">Choose an event to see all registered participants with ticket and contact details.</p>
          <div className="mt-6 space-y-3">
            {(payload.events || []).map((event) => (
              <button
                key={event._id}
                className={`w-full rounded-[22px] border px-4 py-4 text-left transition ${
                  activeEventId === event._id ? 'border-slate-900 bg-slate-900 text-white' : 'border-white/70 bg-white/60 text-slate-800'
                }`}
                onClick={() => setSelectedEventId(event._id)}
              >
                <p className="font-semibold">{event.title}</p>
                <p className={`mt-1 text-sm ${activeEventId === event._id ? 'text-white/70' : 'text-slate-500'}`}>
                  {event.registeredCount} registered
                </p>
              </button>
            ))}
          </div>
          {activeEventId ? (
            <a
              className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
              href={eventApi.exportCsv(activeEventId)}
              target="_blank"
              rel="noreferrer"
            >
              Export CSV
            </a>
          ) : null}
        </GlassCard>
        {participantRows.length ? (
          <DataTable
            columns={[
              { key: 'participant', label: 'Student', render: (_, row) => row.participant?.name || 'Unknown' },
              { key: 'participant_email', label: 'Email', render: (_, row) => row.participant?.email || 'No email' },
              { key: 'participant_institution', label: 'Institution', render: (_, row) => row.participant?.institution || 'Not provided' },
              { key: 'ticketCode', label: 'Ticket' },
              { key: 'status', label: 'Status' },
              { key: 'createdAt', label: 'Registered On', render: (value) => formatDate(value, { withTime: true }) }
            ]}
            rows={participantRows}
          />
        ) : (
          <EmptyState
            title="No students registered yet"
            description="Once students register, their names, emails, institutions, and ticket codes will appear here."
            ctaLabel="Create More Events"
            ctaTo="/create-event"
          />
        )}
      </div>
    </DashboardShell>
  );
};

export const AdminDashboardPage = () => {
  const { data, setData } = useAsync(() => dashboardApi.admin(), []);
  const payload = data || {};

  const handleApproval = async (eventId, action) => {
    try {
      if (action === 'approve') {
        await dashboardApi.approveEvent(eventId);
        toast.success('Event approved and now visible to students.');
      } else {
        await dashboardApi.rejectEvent(eventId);
        toast.success('Event moved out of the approval queue.');
      }

      const refreshed = await dashboardApi.admin();
      setData(refreshed.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Approval action failed.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmed = window.confirm('Delete this event permanently? This cannot be undone.');
    if (!confirmed) return;

    try {
      await eventApi.remove(eventId);
      toast.success('Event deleted successfully.');
      const refreshed = await dashboardApi.admin();
      setData(refreshed.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete action failed.');
    }
  };

  return (
    <DashboardShell
      title="Admin Intelligence Layer"
      description="Monitor platform growth, event approvals, organizer performance, and ecosystem-level health from a single cinematic view."
      actions={<ButtonLink to="/analytics">View Full Analytics</ButtonLink>}
    >
      <div className="grid gap-6 xl:grid-cols-5">
        <MetricCard label="Users" value={payload.metrics?.users || 0} icon={Users} />
        <MetricCard label="Events" value={payload.metrics?.events || 0} icon={Calendar} />
        <MetricCard label="Registrations" value={payload.metrics?.registrations || 0} icon={Ticket} />
        <MetricCard label="Pending Events" value={payload.metrics?.pendingEvents || 0} icon={MessageSquareText} />
        <MetricCard label="Featured" value={payload.metrics?.featuredEvents || 0} icon={Sparkles} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <AreaChartCard
          title="User Growth Curve"
          data={(payload.userGrowth || []).map((item) => ({ name: `M${item._id}`, value: item.total }))}
        />
        <BarChartCard
          title="Organizer Performance"
          data={(payload.organizerPerformance || []).map((item) => ({ name: item._id?.slice?.(-4) || 'Org', value: item.registrations }))}
        />
      </div>
      <div className="mt-6">
        {(payload.pendingEventList || []).length ? (
          <DataTable
            columns={[
              { key: 'title', label: 'Pending Event' },
              { key: 'organizer', label: 'Organizer', render: (_, row) => row.organizer?.name || 'Unknown' },
              { key: 'category', label: 'Category', render: (_, row) => row.category?.name || 'General' },
              { key: 'startsAt', label: 'Start', render: (value) => formatDate(value, { withTime: true }) },
              {
                key: '_id',
                label: 'Action',
                render: (value) => (
                  <div className="flex gap-2">
                    <Button className="px-4 py-2 text-xs" onClick={() => handleApproval(value, 'approve')}>
                      Approve
                    </Button>
                    <Button className="px-4 py-2 text-xs" variant="secondary" onClick={() => handleApproval(value, 'reject')}>
                      Reject
                    </Button>
                  </div>
                )
              }
            ]}
            rows={payload.pendingEventList}
          />
        ) : (
          <EmptyState
            title="No pending events"
            description="All organizer submissions have been reviewed. New drafts waiting for approval will appear here."
            ctaLabel="Open Analytics"
            ctaTo="/analytics"
          />
        )}
      </div>
      <div className="mt-6">
        {(payload.eventList || []).length ? (
          <DataTable
            columns={[
              { key: 'title', label: 'All Events' },
              { key: 'organizer', label: 'Organizer', render: (_, row) => row.organizer?.name || 'Unknown' },
              { key: 'category', label: 'Category', render: (_, row) => row.category?.name || 'General' },
              { key: 'status', label: 'Status' },
              {
                key: 'approved',
                label: 'Approval',
                render: (value) => (value ? 'Approved' : 'Pending')
              },
              {
                key: '_id',
                label: 'Remove',
                render: (value) => (
                  <Button className="px-4 py-2 text-xs" variant="secondary" onClick={() => handleDeleteEvent(value)}>
                    Delete
                  </Button>
                )
              }
            ]}
            rows={payload.eventList}
          />
        ) : null}
      </div>
    </DashboardShell>
  );
};

export const EventDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data } = useAsync(() => publicApi.eventBySlug(slug), [slug]);

  const payload = data || {};
  const event = payload.event;

  const handleRegister = async () => {
    try {
      await eventApi.register(event._id);
      toast.success('Registration confirmed. Your ticket is now in My Registrations.');
      navigate('/my-registrations');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Please log in as a participant to register.');
    }
  };

  if (!event) {
    return (
      <PageLayout>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <EmptyState title="Event not found" description="This event may not exist yet, or the backend seed hasn’t been loaded." />
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="overflow-hidden rounded-[36px]">
              <img className="h-[440px] w-full object-cover" src={event.banner} alt={event.title} />
            </div>
            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{event.category?.name}</p>
              <h1 className="mt-4 font-display text-5xl text-slate-950">{event.title}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{event.description}</p>
            </div>
          </div>
          <div className="space-y-6">
            <GlassCard>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Event Snapshot</p>
              <div className="mt-6 grid gap-4 text-slate-700">
                <div>Starts: {formatDate(event.startsAt, { withTime: true })}</div>
                <div>Venue: {event.venue}</div>
                <div>Mode: {event.mode}</div>
                <div>Capacity: {event.capacity}</div>
              <div>Registrations: {event.registeredCount}</div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button onClick={handleRegister}>Register</Button>
                <Button variant="secondary" onClick={() => toast.success('Shareable links can be copied from the browser address bar.')}>
                  Share
                </Button>
              </div>
            </GlassCard>
            <GlassCard>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Agenda</p>
              <div className="mt-6 space-y-4">
                {(event.agenda || []).map((item) => (
                  <div key={`${item.time}-${item.title}`} className="rounded-[24px] border border-white/60 bg-white/50 p-4">
                    <p className="text-sm text-slate-500">{item.time}</p>
                    <h3 className="mt-1 font-semibold text-slate-950">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.speaker}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export const CreateEventPage = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { data: landingData } = useAsync(() => publicApi.landing(), []);
  const categories = landingData?.categories || [];
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    venue: '',
    capacity: 100,
    price: 0,
    mode: 'offline',
    startsAt: '',
    endsAt: '',
    registrationDeadline: '',
    tags: '["festival","premium"]',
    sponsors: '["EventSphere"]',
    agenda: '[{"time":"10:00 AM","title":"Opening Session","speaker":"Host"}]'
  });

  const handleChange = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    if (!form.category) {
      toast.error('Please choose an event category.');
      return;
    }

    if (!form.title || !form.description || !form.shortDescription || !form.venue || !form.startsAt || !form.endsAt || !form.registrationDeadline) {
      toast.error('Please fill all important event details before submitting.');
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));

    try {
      setSubmitting(true);

      if (isEdit) {
        toast.success('Edit flow can be wired to a selected event next.');
        return;
      }

      const response = await eventApi.create(payload);
      const createdEvent = response.data.event;
      const approvalText = createdEvent.approved
        ? 'Your event is live now.'
        : 'Your event was created and is now waiting for admin approval before students can see it.';

      toast.success(approvalText);
      navigate('/organizer-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Event creation failed. Please review the form and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldConfig = [
    ['title', 'Title', 'text'],
    ['shortDescription', 'Short Description', 'text'],
    ['description', 'Description', 'text'],
    ['venue', 'Venue', 'text'],
    ['capacity', 'Capacity', 'number'],
    ['price', 'Price', 'number'],
    ['startsAt', 'Starts At', 'datetime-local'],
    ['endsAt', 'Ends At', 'datetime-local'],
    ['registrationDeadline', 'Registration Deadline', 'datetime-local'],
    ['tags', 'Tags JSON', 'text'],
    ['sponsors', 'Sponsors JSON', 'text'],
    ['agenda', 'Agenda JSON', 'text']
  ];

  return (
    <DashboardShell
      title={isEdit ? 'Edit Event Experience' : 'Create a Premium Event'}
      description="Craft a launch-ready event with copy, timing, capacity, sponsorship, agenda, and presentation detail. Organizer-created events appear in the organizer dashboard immediately and become visible to students after admin approval."
    >
      <form className="grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-600">Category</span>
          <select
            className="w-full rounded-[24px] border border-white/70 bg-white/70 px-4 py-4 outline-none"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-600">Mode</span>
          <select
            className="w-full rounded-[24px] border border-white/70 bg-white/70 px-4 py-4 outline-none"
            value={form.mode}
            onChange={(e) => handleChange('mode', e.target.value)}
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>

        {fieldConfig.map(([key, label, type]) => (
          <label key={key} className={key === 'description' || key === 'agenda' ? 'block lg:col-span-2' : 'block'}>
            <span className="mb-2 block text-sm text-slate-600">{label}</span>
            {key === 'description' || key === 'agenda' ? (
              <textarea
                className="min-h-[140px] w-full rounded-[24px] border border-white/70 bg-white/70 px-4 py-4 outline-none"
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            ) : (
              <input
                className="w-full rounded-[24px] border border-white/70 bg-white/70 px-4 py-4 outline-none"
                type={type}
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            )}
          </label>
        ))}
        <GlassCard className="lg:col-span-2">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Approval Flow</p>
          <p className="mt-4 text-slate-600">
            Organizer-created events are saved with a pending approval state. They show up in the organizer dashboard immediately, but they become visible on the student portal only after an admin approves them.
          </p>
        </GlassCard>
        <div className="lg:col-span-2">
          <Button disabled={submitting}>{submitting ? 'Submitting...' : isEdit ? 'Save Event Changes' : 'Submit Event'}</Button>
        </div>
      </form>
    </DashboardShell>
  );
};

export const MyRegistrationsPage = () => {
  const { data } = useAsync(() => dashboardApi.registrations(), []);
  const registrations = data?.registrations || [];

  return (
    <DashboardShell title="My Registrations" description="Track your tickets, QR-ready entries, and event journey history.">
      {registrations.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {registrations.map((registration) => (
            <GlassCard key={registration._id} className="overflow-hidden">
              <img className="h-48 w-full rounded-[24px] object-cover" src={registration.event?.banner} alt={registration.event?.title} />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{registration.event?.category?.name}</p>
                  <h3 className="mt-2 font-display text-3xl text-slate-950">{registration.event?.title}</h3>
                </div>
                {registration.qrCode ? <img className="h-20 w-20 rounded-2xl border border-white/70 bg-white p-2" src={registration.qrCode} alt="QR Code" /> : null}
              </div>
              <div className="mt-5 grid gap-3 text-sm text-slate-600">
                <div>Ticket Code: {registration.ticketCode}</div>
                <div>Status: {registration.status}</div>
                <div>Venue: {registration.event?.venue}</div>
                <div>Starts: {formatDate(registration.event?.startsAt, { withTime: true })}</div>
                <div>Organizer: {registration.event?.organizer?.name}</div>
                <div>Booked On: {formatDate(registration.createdAt, { withTime: true })}</div>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  className="inline-flex rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                  to={`/events/${registration.event?.slug}`}
                >
                  Open Event
                </Link>
                <Button variant="secondary" onClick={() => toast.success(`Ticket: ${registration.ticketCode}`)}>
                  View Ticket
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <EmptyState title="No registrations yet" description="Register for an event to unlock ticket PDFs, QR codes, and attendance history." />
      )}
    </DashboardShell>
  );
};

export const FavoritesPage = () => {
  const { data } = useAsync(() => dashboardApi.favorites(), []);
  const events = data?.events || [];

  return (
    <DashboardShell title="Favorites" description="Quick access to your most exciting saved event experiences.">
      {events.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <GlassCard key={event._id}>
              <img className="h-52 w-full rounded-[24px] object-cover" src={event.banner} alt={event.title} />
              <h3 className="mt-5 font-display text-2xl text-slate-950">{event.title}</h3>
              <p className="mt-3 text-slate-600">{event.shortDescription}</p>
            </GlassCard>
          ))}
        </div>
      ) : (
        <EmptyState title="No favorites saved" description="Save events to build your personal shortlist." />
      )}
    </DashboardShell>
  );
};

export const NotificationsPage = () => {
  const { data } = useAsync(() => dashboardApi.notifications(), []);
  const notifications = data?.notifications || [];

  return (
    <DashboardShell title="Notifications" description="Reminders, alerts, and announcements delivered in one clean command feed.">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <GlassCard key={notification._id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl text-slate-950">{notification.title}</h3>
                <p className="mt-3 text-slate-600">{notification.message}</p>
              </div>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">{notification.type}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </DashboardShell>
  );
};

export const CalendarPage = () => {
  const { data } = useAsync(() => publicApi.events({ approved: true }), []);
  const events = useMemo(
    () =>
      (data?.events || []).map((event) => ({
        title: event.title,
        start: new Date(event.startsAt),
        end: new Date(event.endsAt)
      })),
    [data]
  );

  return (
    <DashboardShell title="Calendar View" description="Visualize launches, workshops, and community experiences across a premium scheduling interface.">
      <div className="glass-panel rounded-[32px] p-4">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 640 }}
        />
      </div>
    </DashboardShell>
  );
};

export const AnalyticsPage = () => {
  const { data } = useAsync(() => dashboardApi.analytics(), []);
  const payload = data || {};

  return (
    <DashboardShell title="Analytics Nexus" description="Track platform growth, engagement, attendance, category demand, and revenue patterns.">
      <div className="grid gap-6 xl:grid-cols-4">
        <MetricCard label="Total Events" value={payload.metrics?.totalEvents || 0} icon={Calendar} />
        <MetricCard label="Total Users" value={payload.metrics?.totalUsers || 0} icon={Users} />
        <MetricCard label="Registrations" value={payload.metrics?.totalRegistrations || 0} icon={Ticket} />
        <MetricCard label="Attendance" value={payload.metrics?.totalAttendance || 0} icon={Sparkles} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <AreaChartCard
          title="Monthly Growth"
          data={(payload.monthlyGrowth || []).map((item) => ({ name: `M${item._id}`, value: item.registrations }))}
        />
        <PieChartCard
          title="Attendance Status"
          data={(payload.attendanceChart || []).map((item) => ({ name: item._id, value: item.total }))}
        />
      </div>
      <div className="mt-6">
        <BarChartCard
          title="Category Popularity"
          data={(payload.categoryPopularity || []).map((item) => ({ name: item._id, value: item.registrations }))}
        />
      </div>
    </DashboardShell>
  );
};
