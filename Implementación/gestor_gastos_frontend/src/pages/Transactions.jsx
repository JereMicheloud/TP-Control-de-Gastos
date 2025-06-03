import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

export default function Transactions() {
  return (
    <main className="transactions">
      <TransactionForm />
      <TransactionList />
    </main>
  );
}
