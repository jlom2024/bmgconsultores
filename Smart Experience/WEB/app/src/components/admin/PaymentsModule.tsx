import { useState, useEffect } from "react";
import { getTransactions, getTransactionStats, refundCharge } from "../../lib/api/payments.functions";

export default function PaymentsModule() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todas");

  const load = async () => {
    setLoading(true);
    const [tr, sr] = await Promise.all([getTransactions(), getTransactionStats()]) as any;
    if (tr.ok) setTransactions(tr.transactions);
    if (sr.ok) setStats(sr.stats);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const handleRefund = async (id: string) => {
    if (!confirm("Anular esta transaccion?")) return;
    await refundCharge({ data: { id } }) as any;
    load();
  };

  const filtered = filter === "todas" ? transactions : transactions.filter(t => t.status === filter);

  const statusColors: Record<string, string> = {
    capturada: "bg-green-500/10 text-green-400",
    pendiente: "bg-amber/10 text-amber",
    fallida: "bg-red-500/10 text-red-400",
    anulada: "bg-gray-500/10 text-gray-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Pagos / Transacciones</h2>
        <span className="rounded-full bg-amber/10 px-3 py-1 text-[10px] text-amber">Sandbox — Sin API key real</span>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border-light bg-bg-card p-4">
            <p className="text-xs text-text-secondary">Total Ingresos</p>
            <p className="text-2xl font-bold text-green-400">S/ {stats.total.toFixed(2)}</p>
          </div>
          <div className="rounded-2xl border border-border-light bg-bg-card p-4">
            <p className="text-xs text-text-secondary">Capturadas</p>
            <p className="text-2xl font-bold text-green-400">{stats.captured}</p>
          </div>
          <div className="rounded-2xl border border-border-light bg-bg-card p-4">
            <p className="text-xs text-text-secondary">Pendientes</p>
            <p className="text-2xl font-bold text-amber">{stats.pending}</p>
          </div>
          <div className="rounded-2xl border border-border-light bg-bg-card p-4">
            <p className="text-xs text-text-secondary">Fallidas/Anuladas</p>
            <p className="text-2xl font-bold text-red-400">{stats.failed}</p>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-lg border border-border-light bg-bg-surface p-0.5 w-fit">
        {[{ id: "todas", label: "Todas" }, { id: "capturada", label: "Capturadas" }, { id: "pendiente", label: "Pendientes" }, { id: "anulada", label: "Anuladas" }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${filter === f.id ? "bg-amber text-bg-navy" : "text-text-secondary hover:text-text-primary"}`}>
            {f.label} ({filter === f.id ? filtered.length : transactions.filter(t => f.id === "todas" || t.status === f.id).length})
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-text-muted">No hay transacciones</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-surface border-b border-border-light">
                <tr>
                  <th className="px-4 py-3 font-medium text-text-secondary">ID</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Cliente</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Concepto</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Monto</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Metodo</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Estado</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Fecha</th>
                  <th className="px-4 py-3 font-medium text-text-secondary text-right">Accion</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t: any) => (
                  <tr key={t.id} className="border-b border-border-light last:border-b-0 hover:bg-bg-surface/50">
                    <td className="px-4 py-3 text-xs text-text-muted font-mono">{t.charge_id}</td>
                    <td className="px-4 py-3 font-medium">{t.customer}</td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{t.concept}</td>
                    <td className="px-4 py-3 text-amber font-medium">S/ {t.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{t.payment_method} {t.installments > 1 ? `(${t.installments} cuotas)` : ""}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${statusColors[t.status] || ""}`}>{t.status}</span></td>
                    <td className="px-4 py-3 text-xs text-text-muted">{new Date(t.created_at).toLocaleDateString("es-PE")}</td>
                    <td className="px-4 py-3 text-right">
                      {t.status === "capturada" && (
                        <button onClick={() => handleRefund(t.id)} className="text-xs text-red-400 hover:underline">Anular</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Integration guide */}
      <div className="rounded-2xl border border-border-light bg-bg-card p-5">
        <h3 className="text-sm font-bold mb-2">Integracion Culqi</h3>
        <div className="space-y-1 text-xs text-text-muted">
          <p>1. Registrate en <a href="https://www.culqi.com/" target="_blank" className="text-amber hover:underline">Culqi.com</a> y obtén tus llaves API</p>
          <p>2. Reemplaza las keys en <code className="rounded bg-bg-surface px-1.5 py-0.5">app/src/lib/api/payments.functions.ts</code></p>
          <p>3. Culqi.js se carga desde su CDN para el checkout del lado del cliente</p>
          <p>4. Los cargos se crean via <code className="rounded bg-bg-surface px-1.5 py-0.5">/charges</code> con token de tarjeta</p>
          <p>5. Los reembolsos usan <code className="rounded bg-bg-surface px-1.5 py-0.5">/charges/:id/refunds</code></p>
          <p className="mt-2 text-amber">Actualmente en modo sandbox. Los datos son simulados.</p>
        </div>
      </div>
    </div>
  );
}