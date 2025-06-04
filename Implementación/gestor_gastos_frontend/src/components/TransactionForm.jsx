import { useState } from 'react';
import categories from '../data/categories';

export default function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState({ description: '', amount: '', type: 'ingreso', category: categories[0], date: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(form),
    });
    setForm({ description: '', amount: '', type: 'ingreso', category: categories[0], date: '' });
    if (onSubmit) onSubmit();
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <label>
        Descripción
        <input name="description" type="text" value={form.description} onChange={handleChange} placeholder="Descripción" />
      </label>
      <label>
        Tipo de operación
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
      </label>
      <label>
        Monto
        <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Monto" />
      </label>
      <label>
        Categoría
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </label>
      <label>
        Fecha
        <input name="date" type="date" value={form.date} onChange={handleChange} />
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
}
