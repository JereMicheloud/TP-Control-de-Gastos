import { useState } from 'react';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      if (onLogin) onLogin(); // <-- sin argumentos
    } else {
      setError(data.message || 'Error de autenticación');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
      <button type="submit">Entrar</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
