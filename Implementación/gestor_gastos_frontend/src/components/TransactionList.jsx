import { useEffect, useState } from 'react';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/transactions', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('No autorizado o error de red');
        return res.json();
      })
      .then(data => setTransactions(data))
      .catch(err => {
        setTransactions([]);
        setError('No se pudieron cargar las transacciones. ¿Estás autenticado?');
      });
  }, []);

  return (
    <section className="transaction-list">
      <h2>Transacciones</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {transactions.map(t => (
          <li key={t.id} className={`transaction-item transaction-${t.type}`}>
            <span className="transaction-date">{t.date}</span>
            <span className="transaction-category">{t.category}</span>
            <span className="transaction-amount">${t.amount}</span>
            <span className="transaction-type">{t.type}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
