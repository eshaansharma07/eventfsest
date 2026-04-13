import { ProtectedRoute } from './ProtectedRoute';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage } from '../pages/auth/AuthPages';
import {
  AdminDashboardPage,
  AnalyticsPage,
  CalendarPage,
  CreateEventPage,
  DashboardPage,
  EventDetailsPage,
  FavoritesPage,
  MyRegistrationsPage,
  NotificationsPage,
  OrganizerDashboardPage
} from '../pages/dashboard/DashboardPages';
import { AboutPage, ContactPage, FAQPage, NotFoundPage, PrivacyPage, TermsPage } from '../pages/misc/StaticPages';

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
