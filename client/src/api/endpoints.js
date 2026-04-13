import api from './client';

export const publicApi = {
  landing: () => api.get('/public/landing'),
  events: (params) => api.get('/events', { params }),
  eventBySlug: (slug) => api.get(`/events/${slug}`),
  featured: () => api.get('/events/featured/list')
};

export const authApi = {
  login: (payload) => api.post('/auth/login', payload),
  signup: (payload) => api.post('/auth/signup', payload, { headers: { 'Content-Type': 'multipart/form-data' } }),
  forgotPassword: (payload) => api.post('/auth/forgot-password', payload),
  resetPassword: ({ token, password }) => api.post(`/auth/reset-password/${token}`, { password }),
  profile: () => api.get('/auth/profile'),
  updateProfile: (payload) => api.put('/auth/profile', payload, { headers: { 'Content-Type': 'multipart/form-data' } }),
  changePassword: (payload) => api.put('/auth/change-password', payload)
};

export const dashboardApi = {
  organizer: () => api.get('/organizer/dashboard'),
  admin: () => api.get('/admin/dashboard'),
  approveEvent: (id) => api.put(`/admin/events/${id}/approve`),
  rejectEvent: (id) => api.put(`/admin/events/${id}/reject`),
  analytics: () => api.get('/analytics'),
  notifications: () => api.get('/notifications'),
  registrations: () => api.get('/registrations/mine'),
  favorites: () => api.get('/events/favorites/list')
};

export const eventApi = {
  create: (payload) => api.post('/events', payload, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, payload) => api.put(`/events/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/events/${id}`),
  favorite: (id) => api.post(`/events/${id}/favorite`),
  register: (id) => api.post(`/registrations/${id}`),
  cancel: (id) => api.put(`/registrations/${id}/cancel`),
  review: (id, payload) => api.post(`/registrations/${id}/reviews`, payload),
  participants: (id) => api.get(`/registrations/event/${id}`),
  exportCsv: (id) => `${api.defaults.baseURL}/registrations/event/${id}/export`
};
