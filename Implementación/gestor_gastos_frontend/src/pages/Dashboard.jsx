import { useState } from 'react';
import BalancePanel from '../components/BalancePanel';
import PieChart from '../components/PieChart';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  // Puedes obtener ingresos y egresos reales sumando las transacciones
  const ingresos = 1000;
  const egresos = 500;

  return (
    <main className="dashboard">
      <h1>Resumen de gastos e ingresos</h1>
      <div className="dashboard-content">
        <section className="dashboard-balance">
          <BalancePanel ingresos={ingresos} egresos={egresos} />
          <button className="dashboard-add-btn" onClick={() => setShowForm(true)}>
            + Agregar ingreso/gasto
          </button>
        </section>
        <section className="dashboard-chart">
          <h2>Distribución</h2>
          <PieChart />
        </section>
      </div>

      {showForm && (
        <div className="dashboard-modal-bg">
          <div className="dashboard-modal">
            <h2>Registrar ingreso/gasto</h2>
            <TransactionForm />
            <button className="dashboard-cancel-btn" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <TransactionList />
    </main>
  );
}
