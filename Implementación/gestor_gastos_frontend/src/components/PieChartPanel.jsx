import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2563eb', '#16a34a', '#ef4444', '#f59e42', '#a855f7', '#06b6d4', '#f43f5e'];

export default function PieChartPanel({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-gray-400 italic">Sin datos</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
