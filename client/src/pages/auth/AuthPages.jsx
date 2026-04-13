import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { authApi } from '../../api/endpoints';
import { useAuth } from '../../context/AuthContext';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/common/Button';

const getDashboardPath = (role) => {
  if (role === 'admin') return '/admin-dashboard';
  if (role === 'organizer') return '/organizer-dashboard';
  return '/dashboard';
};

const AuthShell = ({ title, subtitle, children }) => (
  <PageLayout>
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl">
        <div className="glass-panel rounded-[36px] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Access Layer</p>
          <h1 className="mt-4 font-display text-4xl text-slate-950">{title}</h1>
          <p className="mt-4 text-slate-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  </PageLayout>
);

const Input = ({ label, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-sm text-slate-600">{label}</span>
    <input className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none" {...props} />
  </label>
);

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(form);
    navigate(getDashboardPath(response.data.user.role));
  };

  return (
    <AuthShell title="Welcome back to EventSphere" subtitle="Enter your credentials to access the futuristic event command center.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button className="w-full">Login</Button>
      </form>
      <div className="mt-6 flex justify-between text-sm text-slate-500">
        <Link to="/signup">Create account</Link>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </AuthShell>
  );
};

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'participant',
    institution: '',
    department: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    const response = await signup(payload);
    navigate(getDashboardPath(response.data.user.role));
  };

  return (
    <AuthShell title="Launch your EventSphere identity" subtitle="Create an account as a student, organizer, or admin-ready collaborator.">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Input label="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
        <Input label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <label className="block">
          <span className="mb-2 block text-sm text-slate-600">Role</span>
          <select className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="participant">Participant / Student</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <Button className="w-full">Create account</Button>
      </form>
      <p className="mt-6 text-sm text-slate-500">
        Already inside EventSphere? <Link to="/login">Log in</Link>
      </p>
    </AuthShell>
  );
};

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await authApi.forgotPassword({ email });
    toast.success('Reset email sent');
  };

  return (
    <AuthShell title="Recover access" subtitle="Send a secure reset link to your inbox and continue your workflow.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button className="w-full">Send reset link</Button>
      </form>
    </AuthShell>
  );
};

export const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await authApi.resetPassword?.({ token, password });
    toast.success('Password reset successfully');
    navigate('/login');
  };

  return (
    <AuthShell title="Set a new password" subtitle="Use a strong password and return to your dashboard in seconds.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full">Update password</Button>
      </form>
    </AuthShell>
  );
};
