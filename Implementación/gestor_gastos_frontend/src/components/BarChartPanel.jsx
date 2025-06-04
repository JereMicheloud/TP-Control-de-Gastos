import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartPanel({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-gray-400 italic">Sin datos</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ingreso" fill="#16a34a" name="Ingresos" />
        <Bar dataKey="egreso" fill="#ef4444" name="Egresos" />
      </BarChart>
    </ResponsiveContainer>
  );
}
