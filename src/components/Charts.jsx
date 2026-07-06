import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatShortDate } from '../utils/date.js';

const palette = ['#0f766e', '#0284c7', '#e11d48', '#d97706', '#7c3aed', '#16a34a'];

export function WeeklyChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="calories" stroke="#0f766e" fill="#14b8a6" fillOpacity={0.25} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MonthlyCaloriesChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="label" tickFormatter={(value) => value.split(' ')[1]} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="calories" fill="#0284c7" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={94} paddingAngle={3}>
          {data.map((entry, index) => <Cell key={entry.name} fill={palette[index % palette.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function WeightLineChart({ data }) {
  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={sorted}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" tickFormatter={formatShortDate} />
        <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
        <Tooltip labelFormatter={formatShortDate} />
        <Line type="monotone" dataKey="weight" stroke="#e11d48" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
