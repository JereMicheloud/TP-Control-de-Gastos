export default function RecentTransactionsTable({ transactions, loading }) {
  if (loading) return <div className="text-gray-400 italic">Cargando...</div>;
  if (!transactions || transactions.length === 0) return <div className="text-gray-400 italic">Sin transacciones</div>;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500">
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Monto</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(t => (
          <tr key={t.id || t._id}>
            <td>{t.description || '-'}</td>
            <td>{t.category}</td>
            <td>{t.date}</td>
            <td className={t.type === 'ingreso' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
              {t.type === 'ingreso' ? '+' : '-'}${t.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
