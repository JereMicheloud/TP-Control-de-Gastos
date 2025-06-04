import { useState } from 'react';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess(true);
      if (onRegister) onRegister();
    } else {
      const data = await res.json();
      setError(data.message || 'Error de registro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
      <button type="submit">Crear cuenta</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>¡Registro exitoso! Ahora puedes iniciar sesión.</div>}
    </form>
  );
}
