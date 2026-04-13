import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppShellLoader } from '../components/common/Loader';

export const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <AppShellLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return children;
};
