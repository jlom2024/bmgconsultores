import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { customerLogin, customerRegister } from "../lib/api/agency.functions";

// @ts-ignore
export const Route = createFileRoute("/login-cliente")({
  component: CustomerLoginPage,
  head: () => ({
    meta: [
      { title: "Mi Cuenta — BG Travel Peru" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function CustomerLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        if (form.password !== form.confirm) { setError("Las contrasenas no coinciden"); setLoading(false); return; }
        if (form.password.length < 6) { setError("La contrasena debe tener al menos 6 caracteres"); setLoading(false); return; }
        const r = await customerRegister({ data: { name: form.name, email: form.email, phone: form.phone, password: form.password } }) as any;
        if (!r.ok) { setError(r.error); setLoading(false); return; }
        setMode("login");
        setForm({ ...form, password: "", confirm: "" });
        setError("Cuenta creada. Ahora inicia sesion.");
        setLoading(false);
        return;
      }

      const r = await customerLogin({ data: { email: form.email, password: form.password } }) as any;
      if (!r.ok) { setError(r.error); setLoading(false); return; }
      localStorage.setItem("bg_customer_token", r.sessionToken);
      navigate({ to: "/mi-cuenta" as any });
    } catch (err: any) {
      setError(err.message || "Error al procesar la solicitud");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-dvh bg-bg-navy pt-24">
      <div className="mx-auto max-w-md px-4 py-12">
        <a href="/" className="mb-8 flex items-center justify-center gap-2">
          <img src="/assets/logo-bg-travel.png" alt="BG Travel" className="h-8 w-auto" />
          <span className="text-lg font-bold text-white">BG Travel Peru</span>
        </a>

        <div className="rounded-2xl border border-border-light bg-bg-card p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Mi Cuenta</h1>
            <p className="mt-1 text-sm text-text-secondary">
              {mode === "login" ? "Accede a tus reservas e itinerarios" : "Crea tu cuenta para gestionar tus viajes"}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="mb-6 flex rounded-lg bg-bg-surface p-1">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === "login" ? "bg-amber text-bg-navy" : "text-text-secondary hover:text-text-primary"}`}
            >Iniciar Sesion</button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === "register" ? "bg-amber text-bg-navy" : "text-text-secondary hover:text-text-primary"}`}
            >Crear Cuenta</button>
          </div>

          {error && (
            <div className={`mb-4 rounded-lg p-3 text-sm ${error.includes("creada") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-text-secondary mb-1">Nombre completo</label>
                <input id="reg-name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full rounded-lg border border-border-light bg-bg-navy px-4 py-2.5 text-sm" placeholder="Tu nombre" />
              </div>
            )}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-text-secondary mb-1">Correo electronico</label>
              <input id="login-email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="w-full rounded-lg border border-border-light bg-bg-navy px-4 py-2.5 text-sm" placeholder="correo@ejemplo.com" />
            </div>
            {mode === "register" && (
              <div>
                <label htmlFor="reg-phone" className="block text-sm font-medium text-text-secondary mb-1">Telefono (opcional)</label>
                <input id="reg-phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full rounded-lg border border-border-light bg-bg-navy px-4 py-2.5 text-sm" placeholder="+51 999 888 777" />
              </div>
            )}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-text-secondary mb-1">Contrasena</label>
              <input id="login-password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full rounded-lg border border-border-light bg-bg-navy px-4 py-2.5 text-sm" placeholder="Minimo 6 caracteres" />
            </div>
            {mode === "register" && (
              <div>
                <label htmlFor="reg-confirm" className="block text-sm font-medium text-text-secondary mb-1">Confirmar contrasena</label>
                <input id="reg-confirm" type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} required className="w-full rounded-lg border border-border-light bg-bg-navy px-4 py-2.5 text-sm" placeholder="Repite la contrasena" />
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-amber py-3 text-sm font-semibold text-bg-navy transition-colors hover:bg-amber-light disabled:opacity-50">
              {loading ? "Procesando..." : mode === "login" ? "Ingresar" : "Crear Cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-text-muted">
            Al crear una cuenta aceptas nuestros terminos y condiciones.
          </p>
        </div>

        <a href="/" className="mt-6 block text-center text-sm text-text-secondary hover:text-amber">
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}

