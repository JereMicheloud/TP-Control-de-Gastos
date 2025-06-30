import { useState } from 'react';
import TransactionsTable from '../components/TransactionsTable';
import TransactionsFilters from '../components/TransactionsFilters';
import TransactionForm from '../components/TransactionForm';

export default function Transactions() {
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTransactionAdded = () => {
    setShowModal(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Transacciones</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
        >
          + Nueva Transacción
        </button>
      </div>

      <TransactionsFilters />
      <TransactionsTable refreshTrigger={refreshTrigger} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-purple-600">
              <h2 className="text-xl font-bold text-white">Nueva Transacción</h2>
            </div>
            <div className="p-6">
              <TransactionForm onSubmit={handleTransactionAdded} />
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
