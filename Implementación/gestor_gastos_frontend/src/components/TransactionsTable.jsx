import { useEffect, useState } from 'react';

export default function TransactionsTable({ onRefresh, refreshTrigger }) {
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
      if (!res.ok) throw new Error('Error al obtener transacciones');
      const data = await res.json();
      setTransactions(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta transacción?')) return;
    try {
      await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      fetchTransactions();
    } catch (err) {
      alert('Error al eliminar transacción');
    }
  };

  if (loading) return <div className="text-center py-8">Cargando transacciones...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600">
        <h2 className="text-xl font-bold text-white">Todas las Transacciones</h2>
      </div>
      {transactions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">💳</div>
          <p>No hay transacciones registradas</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{t.description || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{t.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    <span className={t.type === 'ingreso' ? 'text-green-600' : 'text-red-600'}>
                      {t.type === 'ingreso' ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
