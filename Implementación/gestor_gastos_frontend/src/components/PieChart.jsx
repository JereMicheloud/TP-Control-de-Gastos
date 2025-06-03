import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Alimentos', value: 400 },
  { name: 'Transporte', value: 300 },
  { name: 'Vivienda', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function SimplePieChart() {
  return (
    <PieChart width={300} height={200}>
      <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} label>
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
