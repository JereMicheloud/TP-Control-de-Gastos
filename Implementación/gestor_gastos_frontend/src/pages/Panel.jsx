import { useEffect, useState } from 'react';
import BarChartPanel from '../components/BarChartPanel';
import PieChartPanel from '../components/PieChartPanel';
import RecentTransactionsTable from '../components/RecentTransactionsTable';

export default function Panel() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/transactions', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Error al obtener transacciones');
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Respuesta inesperada del servidor');
        setTransactions(data);
        setLoading(false);
      })
      .catch(err => {
        setTransactions([]);
        setError(err.message || 'Error de red');
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Cálculos
  const saldoTotal = transactions.reduce((acc, t) => acc + (t.type === 'ingreso' ? t.amount : -t.amount), 0);
  const now = new Date();
  const gastosMes = transactions
    .filter(t => t.type === 'egreso' && new Date(t.date).getMonth() === now.getMonth() && new Date(t.date).getFullYear() === now.getFullYear())
    .reduce((acc, t) => acc + t.amount, 0);
  const categorias = [...new Set(transactions.map(t => t.category))].length;

  // Datos para gráficos
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return { month: d.toLocaleString('default', { month: 'short' }), ingreso: 0, egreso: 0 };
  });
  transactions.forEach(t => {
    const d = new Date(t.date);
    const idx = last6Months.findIndex(m =>
      d.getMonth() === new Date(now.getFullYear(), now.getMonth() - 5 + last6Months.indexOf(m), 1).getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
    if (idx !== -1) {
      if (t.type === 'ingreso') last6Months[idx].ingreso += t.amount;
      else last6Months[idx].egreso += t.amount;
    }
  });

  // Pie chart: suma por categoría de egresos
  const pieData = [];
  transactions.filter(t => t.type === 'egreso').forEach(t => {
    const found = pieData.find(p => p.name === t.category);
    if (found) found.value += t.amount;
    else pieData.push({ name: t.category, value: t.amount });
  });

  // Últimas 3 transacciones
  const recientes = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-6">
        <div className="bg-white rounded-xl shadow p-8 flex-1 min-w-[250px]">
          <div className="text-gray-500 text-lg">Saldo Total</div>
          <div className="text-4xl font-bold text-green-600 mt-2">${saldoTotal.toFixed(2)}</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow p-4 min-w-[180px]">
            <div className="text-gray-500 text-sm">Gastos de Este Mes</div>
            <div className="text-xl font-semibold text-red-500 mt-1">${gastosMes.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 min-w-[180px]">
            <div className="text-gray-500 text-sm">Categorías Gestionadas</div>
            <div className="text-xl font-semibold text-blue-600 mt-1">{categorias}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[320px]">
          <div className="font-semibold mb-2">Ingresos y Gastos (6 meses)</div>
          <BarChartPanel data={last6Months} />
        </div>
        <div className="bg-white rounded-xl shadow p-6 min-w-[320px]">
          <div className="font-semibold mb-2">Gastos por Categoría</div>
          <PieChartPanel data={pieData} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <div className="font-semibold mb-2">Transacciones Recientes</div>
        <RecentTransactionsTable transactions={recientes} loading={loading} />
      </div>
    </div>
  );
}
