import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { authApi } from '../api/endpoints';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('eventsphere_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.profile();
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('eventsphere_token');
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (payload) => {
    const response = await authApi.login(payload);
    localStorage.setItem('eventsphere_token', response.data.token);
    setUser(response.data.user);
    toast.success('Welcome back to EventSphere');
    return response;
  };

  const signup = async (payload) => {
    const response = await authApi.signup(payload);
    localStorage.setItem('eventsphere_token', response.data.token);
    setUser(response.data.user);
    toast.success('Your account is live');
    return response;
  };

  const logout = () => {
    localStorage.removeItem('eventsphere_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
      setUser
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
