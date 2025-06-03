import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Gestor de Gastos</div>
      <ul className="navbar-links">
        <li><Link to="/">Resumen</Link></li>
        <li><Link to="/transactions">Transacciones</Link></li>
      </ul>
    </nav>
  );
}
