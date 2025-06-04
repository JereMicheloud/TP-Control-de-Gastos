import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-logo">Gestor de Gastos</div>
      <ul className="navbar-links">
        {user && (
          <>
            <li><Link to="/">Resumen</Link></li>
            <li><Link to="/transactions">Transacciones</Link></li>
            <li><span>{user.email}</span></li>
            <li><button onClick={() => { onLogout(); navigate('/login'); }}>Salir</button></li>
          </>
        )}
        {!user && (
          <>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
