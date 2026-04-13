import { lazy } from 'react';
import { ProtectedRoute } from './ProtectedRoute';

const LandingPage = lazy(() => import('../pages/LandingPage').then((module) => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import('../pages/auth/AuthPages').then((module) => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('../pages/auth/AuthPages').then((module) => ({ default: module.SignupPage })));
const ForgotPasswordPage = lazy(() =>
  import('../pages/auth/AuthPages').then((module) => ({ default: module.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import('../pages/auth/AuthPages').then((module) => ({ default: module.ResetPasswordPage }))
);
const DashboardPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.DashboardPage }))
);
const OrganizerDashboardPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.OrganizerDashboardPage }))
);
const AdminDashboardPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.AdminDashboardPage }))
);
const EventDetailsPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.EventDetailsPage }))
);
const CreateEventPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.CreateEventPage }))
);
const MyRegistrationsPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.MyRegistrationsPage }))
);
const FavoritesPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.FavoritesPage }))
);
const NotificationsPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.NotificationsPage }))
);
const CalendarPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.CalendarPage }))
);
const AnalyticsPage = lazy(() =>
  import('../pages/dashboard/DashboardPages').then((module) => ({ default: module.AnalyticsPage }))
);
const ContactPage = lazy(() => import('../pages/misc/StaticPages').then((module) => ({ default: module.ContactPage })));
const FAQPage = lazy(() => import('../pages/misc/StaticPages').then((module) => ({ default: module.FAQPage })));
const AboutPage = lazy(() => import('../pages/misc/StaticPages').then((module) => ({ default: module.AboutPage })));
const TermsPage = lazy(() => import('../pages/misc/StaticPages').then((module) => ({ default: module.TermsPage })));
const PrivacyPage = lazy(() =>
  import('../pages/misc/StaticPages').then((module) => ({ default: module.PrivacyPage }))
);
const NotFoundPage = lazy(() =>
  import('../pages/misc/StaticPages').then((module) => ({ default: module.NotFoundPage }))
);

const EditEventPage = () => <CreateEventPage isEdit />;

export const appRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password/:token', element: <ResetPasswordPage /> },
  { path: '/dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
  { path: '/organizer-dashboard', element: <ProtectedRoute roles={['organizer', 'admin']}><OrganizerDashboardPage /></ProtectedRoute> },
  { path: '/admin-dashboard', element: <ProtectedRoute roles={['admin']}><AdminDashboardPage /></ProtectedRoute> },
  { path: '/events/:slug', element: <EventDetailsPage /> },
  { path: '/create-event', element: <ProtectedRoute roles={['organizer', 'admin']}><CreateEventPage /></ProtectedRoute> },
  { path: '/edit-event/:id', element: <ProtectedRoute roles={['organizer', 'admin']}><EditEventPage /></ProtectedRoute> },
  { path: '/my-registrations', element: <ProtectedRoute><MyRegistrationsPage /></ProtectedRoute> },
  { path: '/favorites', element: <ProtectedRoute><FavoritesPage /></ProtectedRoute> },
  { path: '/notifications', element: <ProtectedRoute><NotificationsPage /></ProtectedRoute> },
  { path: '/calendar', element: <ProtectedRoute><CalendarPage /></ProtectedRoute> },
  { path: '/analytics', element: <ProtectedRoute roles={['admin', 'organizer']}><AnalyticsPage /></ProtectedRoute> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/faq', element: <FAQPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '*', element: <NotFoundPage /> }
];
