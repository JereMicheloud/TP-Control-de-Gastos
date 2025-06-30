import { useEffect, useState } from 'react';
import BarChartPanel from '../components/BarChartPanel';
import PieChartPanel from '../components/PieChartPanel';
import RecentTransactionsTable from '../components/RecentTransactionsTable';

export default function Panel() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/transactions', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      
      if (!res.ok) {
        throw new Error('Error al obtener transacciones');
      }
      
      const data = await res.json();
      console.log('Transactions fetched:', data);
      setTransactions(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
        <button 
          onClick={fetchTransactions}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Cálculos
  const saldoTotal = transactions.reduce((acc, t) => {
    return acc + (t.type === 'ingreso' ? parseFloat(t.amount) : -parseFloat(t.amount));
  }, 0);

  const now = new Date();
  const gastosMes = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'egreso' && 
             transactionDate.getMonth() === now.getMonth() && 
             transactionDate.getFullYear() === now.getFullYear();
    })
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const categorias = [...new Set(transactions.map(t => t.category))].length;

  // Datos para gráfico de barras (últimos 6 meses)
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString('es', { month: 'short' });
    last6Months.push({
      month: monthName,
      ingreso: 0,
      egreso: 0
    });
  }

  transactions.forEach(t => {
    const transactionDate = new Date(t.date);
    const monthsAgo = (now.getFullYear() - transactionDate.getFullYear()) * 12 + 
                     (now.getMonth() - transactionDate.getMonth());
    
    if (monthsAgo >= 0 && monthsAgo < 6) {
      const monthIndex = 5 - monthsAgo;
      if (t.type === 'ingreso') {
        last6Months[monthIndex].ingreso += parseFloat(t.amount);
      } else {
        last6Months[monthIndex].egreso += parseFloat(t.amount);
      }
    }
  });

  // Datos para gráfico de torta (gastos por categoría)
  const categoryTotals = {};
  transactions
    .filter(t => t.type === 'egreso')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + parseFloat(t.amount);
    });

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));

  // Últimas 3 transacciones
  const recientes = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm opacity-90">Saldo Total</div>
          <div className="text-3xl font-bold mt-2">
            ${saldoTotal.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm opacity-90">Gastos de Este Mes</div>
          <div className="text-3xl font-bold mt-2">
            ${gastosMes.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm opacity-90">Categorías Gestionadas</div>
          <div className="text-3xl font-bold mt-2">
            {categorias}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Ingresos y Gastos (6 meses)
          </h3>
          <BarChartPanel data={last6Months} />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Gastos por Categoría
          </h3>
          <PieChartPanel data={pieData} />
        </div>
      </div>

      {/* Transacciones recientes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Transacciones Recientes
        </h3>
        <RecentTransactionsTable transactions={recientes} loading={loading} />
      </div>
    </div>
  );
}
