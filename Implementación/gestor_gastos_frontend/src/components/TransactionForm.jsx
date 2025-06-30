import { useState } from 'react';
import config from '../config';
import categories from '../data/categories';

export default function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState({ 
    description: '', 
    amount: '', 
    type: 'egreso', 
    category: categories[0], 
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (!form.description.trim()) {
      setError('La descripción es obligatoria');
      setLoading(false);
      return;
    }

    if (!form.amount || parseFloat(form.amount) <= 0) {
      setError('El monto debe ser mayor a 0');
      setLoading(false);
      return;
    }

    try {
      const transactionData = {
        description: form.description.trim(),
        amount: parseFloat(form.amount),
        type: form.type,
        category: form.category,
        date: form.date
      };

      console.log('=== FRONTEND: Sending transaction ===');
      console.log('Transaction data:', transactionData);
      console.log('Token:', localStorage.getItem('token') ? 'Present' : 'Missing');

      const res = await fetch(`${config.API_URL}/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(transactionData),
      });

      console.log('Response status:', res.status);
      const responseText = await res.text();
      console.log('Response text:', responseText);

      if (res.ok) {
        const result = JSON.parse(responseText);
        console.log('✅ Transaction created successfully:', result);
        
        // Resetear formulario
        setForm({ 
          description: '', 
          amount: '', 
          type: 'egreso', 
          category: categories[0], 
          date: new Date().toISOString().split('T')[0]
        });
        
        if (onSubmit) onSubmit();
      } else {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText };
        }
        console.error('❌ Server error:', errorData);
        setError(errorData.message || 'Error al crear la transacción');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setError('Error de conexión. Verifica que el servidor esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción *
        </label>
        <input
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="Ej: Compra de comida"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de operación
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="egreso">💸 Egreso (Gasto)</option>
          <option value="ingreso">💰 Ingreso</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monto *
        </label>
        <input
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fecha
        </label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Guardando...' : 'Registrar Transacción'}
      </button>
    </form>
  );
}
