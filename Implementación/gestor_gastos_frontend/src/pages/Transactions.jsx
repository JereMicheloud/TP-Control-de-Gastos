import TransactionsTable from '../components/TransactionsTable';
import TransactionsFilters from '../components/TransactionsFilters';

export default function Transactions() {
  return (
    <div className="flex flex-col gap-6">
      <TransactionsFilters />
      <TransactionsTable />
    </div>
  );
}
