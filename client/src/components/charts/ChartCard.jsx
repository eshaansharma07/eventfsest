import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { GlassCard } from '../common/GlassCard';
import { formatCurrency } from '../../lib/utils';

export const AreaChartCard = ({ title, data = [], dataKey = 'value', color = '#60A5FA', valueFormatter }) => (
  <GlassCard className="h-[320px]">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Analytics</p>
        <h3 className="mt-2 font-display text-2xl text-slate-950">{title}</h3>
      </div>
    </div>
    <ResponsiveContainer width="100%" height="75%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="eventsphereArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.5} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="#94A3B8" />
        <Tooltip formatter={valueFormatter} />
        <Area type="monotone" dataKey={dataKey} stroke={color} fill="url(#eventsphereArea)" />
      </AreaChart>
    </ResponsiveContainer>
  </GlassCard>
);

export const PieChartCard = ({ title, data = [] }) => (
  <GlassCard className="h-[320px]">
    <h3 className="font-display text-2xl text-slate-950">{title}</h3>
    <ResponsiveContainer width="100%" height="85%">
      <PieChart>
        <Pie data={data} innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={['#A78BFA', '#60A5FA', '#F472B6', '#22D3EE', '#FBBF24'][index % 5]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => (typeof value === 'number' ? value : formatCurrency(value))} />
      </PieChart>
    </ResponsiveContainer>
  </GlassCard>
);

export const BarChartCard = ({ title, data = [], dataKey = 'value' }) => (
  <GlassCard className="h-[320px]">
    <h3 className="font-display text-2xl text-slate-950">{title}</h3>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#94A3B8" />
        <Tooltip />
        <Bar dataKey={dataKey} fill="#A78BFA" radius={[12, 12, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </GlassCard>
);
