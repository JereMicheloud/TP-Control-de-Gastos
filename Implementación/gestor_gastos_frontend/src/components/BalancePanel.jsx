// BalancePanel component placeholder
export default function BalancePanel({ ingresos, egresos }) {
  const balance = ingresos - egresos;
  return (
    <section className="balance-panel">
      <div className="balance-amount">${balance}</div>
      <div className="balance-bar">
        <div className="balance-bar-fill" style={{ width: `${(ingresos ? (balance / ingresos) * 100 : 0)}%` }}></div>
      </div>
      <div className="balance-details">
        <div>Ingresos: ${ingresos}</div>
        <div>Egresos: ${egresos}</div>
      </div>
    </section>
  );
}
