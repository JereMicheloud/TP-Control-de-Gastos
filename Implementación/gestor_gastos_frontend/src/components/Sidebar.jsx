import { NavLink } from 'react-router-dom';

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="w-60 bg-white border-r min-h-screen flex flex-col py-8 px-4 fixed left-0 top-0 z-10">
      <div className="mb-10 text-2xl font-bold text-blue-600 tracking-wide">GestorDeGastos</div>
      <nav className="flex flex-col gap-3 flex-1">
        <NavLink to="/" className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : 'text-gray-700'}>
          Panel
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : 'text-gray-700'}>
          Transacciones
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : 'text-gray-700'}>
          Categorías
        </NavLink>
      </nav>
      {user && (
        <div className="mt-auto flex flex-col gap-2">
          <div className="text-xs text-gray-500">{user.email}</div>
          <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </aside>
  );
}
