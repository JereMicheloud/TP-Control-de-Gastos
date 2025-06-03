import { useEffect, useState } from 'react';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(() => setTransactions([]));
  }, []);

  return (
    <section className="transaction-list">
      <h2>Transacciones</h2>
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
