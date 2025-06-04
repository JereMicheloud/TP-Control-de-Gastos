import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Panel from './pages/Panel';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Register from './pages/Register';

function Layout({ user, onLogout, children }) {
  const location = useLocation();
  const navigate = useNavigate();

  let topButton = { text: '', onClick: () => {} };
  if (location.pathname === '/transactions') {
    topButton = { text: 'Añadir Transacción', onClick: () => {/* abrir modal o navegar */} };
  } else if (location.pathname === '/categories') {
    topButton = { text: 'Añadir Categoría', onClick: () => {/* abrir modal o navegar */} };
  } else {
    topButton = { text: 'Añadir Transacción', onClick: () => navigate('/transactions') };
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Topbar button={topButton} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState(getUserFromToken);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleLogin = () => {
    setUser(getUserFromToken());
  };

  return (
    <Router>
      {user ? (
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Panel />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}
