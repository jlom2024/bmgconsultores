import { useState, useEffect } from "react";
import {
  getTemplates, getMessageLog, logSentMessage, buildWaLink,
  getReminderRules, toggleReminderRule, resetReminderRules,
  runScheduler, getSchedulerLog, getSchedulerPreview,
} from "../../lib/api/whatsapp.functions";

const WHATSAPP_NUMBER = "+51 994 118 084";

export default function WhatsAppModule() {
  const [tab, setTab] = useState<"templates" | "log" | "reminders">("reminders");
  const [templates, setTemplates] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTpl, setSelectedTpl] = useState<any>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");
  const [waLink, setWaLink] = useState("");
  const [sent, setSent] = useState(false);

  // Reminder state
  const [rules, setRules] = useState<any[]>([]);
  const [schedulerLog, setSchedulerLog] = useState<any[]>([]);
  const [previewResults, setPreviewResults] = useState<any[]>([]);
  const [previewCount, setPreviewCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState<any>(null);

  const load = async () => {
    setLoading(true);
    const [tr, mr, rr, sl] = await Promise.all([
      getTemplates(), getMessageLog(), getReminderRules(), getSchedulerLog(),
    ]) as any;
    if (tr.ok) setTemplates(tr.templates);
    if (mr.ok) setMessages(mr.messages);
    if (rr.ok) setRules(rr.rules);
    if (sl.ok) setSchedulerLog(sl.log);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const selectTemplate = (tpl: any) => {
    setSelectedTpl(tpl);
    const init: Record<string, string> = {};
    tpl.variables.forEach((v: string) => { init[v] = ""; });
    setVariables(init);
    setPreview("");
    setWaLink("");
    setSent(false);
  };

  const updateVar = (key: string, val: string) => {
    const next = { ...variables, [key]: val };
    setVariables(next);
    let msg = selectedTpl.message;
    for (const [k, v] of Object.entries(next)) {
      msg = msg.replace(new RegExp(`{{${k}}}`, "g"), v || `[${k}]`);
    }
    setPreview(msg);
  };

  const generateLink = async () => {
    if (!selectedTpl) return;
    const r = await buildWaLink({ data: { template: selectedTpl.id, variables } }) as any;
    if (r.ok) { setWaLink(r.url); setPreview(r.message); }
  };

  const markSent = async () => {
    if (!selectedTpl) return;
    const customer = variables["cliente"] || "—";
    await logSentMessage({ data: { template: selectedTpl.name, customer, message: preview } }) as any;
    setSent(true);
    load();
  };

  const handleToggle = async (rule: any) => {
    await toggleReminderRule({ data: { id: rule.id, active: !rule.active } }) as any;
    load();
  };

  const handlePreview = async () => {
    const r = await getSchedulerPreview() as any;
    if (r.ok) { setPreviewResults(r.results); setPreviewCount(r.rules_count); }
  };

  const handleRun = async () => {
    setRunning(true);
    const r = await runScheduler() as any;
    if (r.ok) { setLastRun(r.run); setPreviewResults([]); load(); }
    setRunning(false);
  };

  const handleReset = async () => {
    if (!confirm("Restaurar reglas por defecto?")) return;
    await resetReminderRules() as any;
    load();
  };

  const catColors: Record<string, string> = {
    reservas: "bg-blue-500/10 text-blue-400",
    cotizaciones: "bg-amber/10 text-amber",
    pagos: "bg-green-500/10 text-green-400",
    general: "bg-purple-500/10 text-purple-400",
  };

  const triggerLabels: Record<string, string> = {
    days_before_payment_due: "dias antes del vencimiento",
    days_before_start: "dias antes del check-in",
    days_after_end: "dias despues del check-out",
    hours_after_quote: "horas despues de cotizar",
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Automatizacion WhatsApp</h2>
          <p className="text-xs text-text-muted mt-1">{WHATSAPP_NUMBER}</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border-light bg-bg-surface p-0.5">
          {(["reminders", "templates", "log"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t ? "bg-amber text-bg-navy" : "text-text-secondary hover:text-text-primary"
              }`}>
              {t === "reminders" ? `Recordatorios` : t === "templates" ? "Plantillas" : `Historial (${messages.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* REMINDERS TAB */}
      {/* ════════════════════════════════════════════════════════════ */}
      {tab === "reminders" && (
        <div className="space-y-6">
          {/* Rules */}
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold">Reglas de Recordatorio</h3>
              <button onClick={handleReset} className="text-xs text-text-muted hover:text-amber">Restaurar default</button>
            </div>
            <div className="space-y-3">
              {rules.map((rule: any) => (
                <div key={rule.id} className={`rounded-xl border p-4 transition-all ${
                  rule.active ? "border-border-light bg-bg-surface/50" : "border-border-light/50 bg-bg-surface/20 opacity-60"
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold">{rule.name}</h4>
                        <span className={`text-[10px] rounded-full px-2 py-0.5 ${
                          rule.active ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"
                        }`}>
                          {rule.active ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{rule.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-text-muted">
                        <span className="rounded bg-bg-surface px-1.5 py-0.5">{triggerLabels[rule.trigger.type] || rule.trigger.type}</span>
                        <span>·</span>
                        <span className="rounded bg-bg-surface px-1.5 py-0.5">{rule.trigger.days || rule.trigger.hours}{rule.trigger.days ? "d" : "h"}</span>
                        <span>·</span>
                        <span className="rounded bg-bg-surface px-1.5 py-0.5">Plantilla: {rule.trigger.template}</span>
                        <span>·</span>
                        <span className="rounded bg-bg-surface px-1.5 py-0.5">Origen: {rule.origins.join(", ")}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(rule)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        rule.active ? "bg-green-500" : "bg-gray-600"
                      }`}
                    >
                      <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white transition-transform ${
                        rule.active ? "translate-x-5.5 left-0.5" : "left-0.5"
                      }`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduler controls */}
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <h3 className="text-sm font-bold mb-4">Programador Automatico</h3>
            <p className="text-xs text-text-secondary mb-4">
              Evalua las reglas activas contra las reservas y cotizaciones, genera los enlaces wa.me y los registra en el historial.
              Los datos de ejemplo incluyen 6 reservas y 3 cotizaciones con fechas variadas para simular el comportamiento.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button onClick={handlePreview} className="rounded-lg border border-border-light px-4 py-2 text-xs text-text-secondary hover:border-amber/30">
                Vista previa
              </button>
              <button onClick={handleRun} disabled={running || rules.filter(r => r.active).length === 0}
                className="rounded-lg bg-amber px-4 py-2 text-xs font-semibold text-bg-navy disabled:opacity-50">
                {running ? "Procesando..." : "Ejecutar ahora"}
              </button>
              {rules.filter(r => r.active).length === 0 && (
                <span className="text-xs text-amber">Activa al menos una regla</span>
              )}
            </div>

            {/* Preview results */}
            {previewResults.length > 0 && (
              <div className="mt-4 rounded-xl border border-amber/20 bg-amber/5 p-4">
                <p className="text-xs font-medium text-amber mb-2">
                  Vista previa — {previewResults.length} mensajes generarian con {previewCount} reglas activas
                </p>
                <div className="space-y-2 max-h-60 overflow-auto">
                  {previewResults.map((r: any, i: number) => (
                    <div key={i} className="rounded-lg border border-border-light bg-bg-navy p-3 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-text-primary">{r.customer}</span>
                        <span className="text-text-muted">{r.record_id} · {r.type === "booking" ? `S/${r.total}` : `S/${r.total}`}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-text-muted mb-1">
                        <span className="rounded bg-bg-surface px-1.5 py-0.5">{r.rule_name}</span>
                        <span>→</span>
                        <span className="rounded bg-bg-surface px-1.5 py-0.5">{r.template}</span>
                      </div>
                      <p className="text-text-secondary line-clamp-2">{r.message.slice(0, 150)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scheduler run log */}
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <h3 className="text-sm font-bold mb-4">Historial de Ejecuciones</h3>
            {schedulerLog.length === 0 ? (
              <p className="text-xs text-text-muted text-center py-4">Ninguna ejecucion aun. Usa "Ejecutar ahora" para probar.</p>
            ) : (
              <div className="space-y-2">
                {schedulerLog.slice(0, 10).map((run: any) => (
                  <div key={run.id} className="rounded-xl border border-border-light bg-bg-surface/50 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">Ejecucion #{run.id}</span>
                        <span className="text-[10px] text-text-muted">{new Date(run.triggered_at).toLocaleString("es-PE")}</span>
                      </div>
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-400">
                        {run.messages_generated} mensajes
                      </span>
                    </div>
                    <p className="text-[10px] text-text-muted mb-1">
                      {run.rules_evaluated} reglas evaluadas
                    </p>
                    {run.results?.length > 0 && (
                      <div className="space-y-1">
                        {run.results.slice(0, 4).map((r: any, i: number) => (
                          <div key={i} className="flex items-center justify-between rounded-lg bg-bg-navy px-3 py-1.5 text-[10px]">
                            <span className="text-text-primary">{r.customer}</span>
                            <span className="text-text-muted">{r.record_id} → {r.template}</span>
                            <a href={r.wa_link} target="_blank" className="text-green-400 hover:underline">Abrir</a>
                          </div>
                        ))}
                        {run.results.length > 4 && (
                          <p className="text-[10px] text-text-muted text-center">... y {run.results.length - 4} mas</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="rounded-2xl border border-border-light bg-bg-card p-4">
            <h4 className="text-xs font-bold mb-2">Como funciona</h4>
            <ul className="space-y-1 text-[10px] text-text-muted">
              <li>• <strong className="text-text-secondary">Reglas:</strong> definen que dispara un recordatorio y con que plantilla</li>
              <li>• <strong className="text-text-secondary">Trigger:</strong> puede ser X dias antes del check-in, X dias antes del vencimiento, etc.</li>
              <li>• <strong className="text-text-secondary">Programador:</strong> evalua todas las reglas activas contra los datos actuales</li>
              <li>• <strong className="text-text-secondary">Resultado:</strong> genera enlaces wa.me y los registra en el historial como &quot;pendiente&quot;</li>
              <li>• <strong className="text-text-secondary">Integracion real:</strong> conectaria via WhatsApp Business API para envio automatico sin clics manuales</li>
            </ul>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* TEMPLATES TAB */}
      {/* ════════════════════════════════════════════════════════════ */}
      {tab === "templates" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-secondary mb-2">Selecciona una plantilla</p>
            {templates.map((tpl: any) => (
              <button key={tpl.id} onClick={() => selectTemplate(tpl)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  selectedTpl?.id === tpl.id ? "border-amber bg-amber/5" : "border-border-light bg-bg-card hover:border-amber/30"
                }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">{tpl.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${catColors[tpl.category] || "bg-gray-500/10 text-gray-400"}`}>{tpl.category}</span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">{tpl.message.slice(0, 120)}...</p>
                <p className="text-[10px] text-text-muted mt-1">{tpl.variables.length} variables: {tpl.variables.join(", ")}</p>
              </button>
            ))}
          </div>
          <div>
            {selectedTpl ? (
              <div className="rounded-2xl border border-border-light bg-bg-card p-5">
                <h3 className="text-sm font-bold mb-4">{selectedTpl.name}</h3>
                <div className="space-y-3 mb-4">
                  {selectedTpl.variables.map((v: string) => (
                    <div key={v}>
                      <label className="block text-xs font-medium text-text-secondary mb-1 capitalize">{v}</label>
                      <input value={variables[v] || ""} onChange={e => updateVar(v, e.target.value)}
                        placeholder={`Valor para ${v}...`} className="w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-xs" />
                    </div>
                  ))}
                </div>
                {preview && (
                  <div className="mb-4 rounded-xl border border-border-light bg-bg-navy p-4">
                    <p className="text-[10px] font-medium text-text-muted mb-2">Vista previa:</p>
                    <pre className="text-xs text-text-primary whitespace-pre-wrap font-sans">{preview}</pre>
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={generateLink} className="rounded-lg bg-amber px-4 py-2 text-xs font-semibold text-bg-navy">Generar enlace</button>
                  {waLink && (
                    <>
                      <a href={waLink} target="_blank" className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-400 hover:bg-green-500/20">Abrir WhatsApp</a>
                      <button onClick={markSent} className="rounded-lg border border-border-light px-4 py-2 text-xs text-text-secondary">{sent ? "Enviado" : "Marcar enviado"}</button>
                    </>
                  )}
                </div>
                {waLink && <p className="text-[10px] text-text-muted mt-2 break-all">{waLink}</p>}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-2xl border border-border-light bg-bg-card">
                <p className="text-xs text-text-muted">Selecciona una plantilla</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* LOG TAB */}
      {/* ════════════════════════════════════════════════════════════ */}
      {tab === "log" && (
        <div className="rounded-2xl border border-border-light bg-bg-card">
          {messages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-text-muted">No hay mensajes enviados</p>
              <p className="text-xs text-text-muted mt-1">Usa las plantillas o el programador para generar mensajes</p>
            </div>
          ) : (
            <div className="divide-y divide-border-light">
              <div className="grid grid-cols-6 gap-4 px-4 py-3 text-xs font-medium text-text-muted">
                <span>Fecha</span><span>Cliente</span><span>Plantilla</span><span>Regla</span><span>Estado</span><span>Accion</span>
              </div>
              {messages.map((m: any) => (
                <div key={m.id} className="grid grid-cols-6 gap-4 px-4 py-3 text-xs">
                  <span className="text-text-muted">{new Date(m.created_at).toLocaleString("es-PE")}</span>
                  <span className="text-text-primary">{m.customer}</span>
                  <span className="text-text-secondary">{m.template}</span>
                  <span className="text-text-muted">{m.rule_id || "manual"}</span>
                  <span className={m.status === "enviado" ? "text-green-400" : "text-amber"}>{m.status}</span>
                  <span>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m.message)}`} target="_blank" className="text-amber hover:underline">Abrir</a>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}