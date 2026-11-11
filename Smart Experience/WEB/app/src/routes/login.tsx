import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { adminLogin } from "../lib/api/auth.functions";

// @ts-ignore - route tree generated during build
export const Route = createFileRoute("/login")({
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: "Login — BG Travel Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await adminLogin({ data: { username, password } });
      if (res.ok) {
        localStorage.setItem("bg_admin_token", res.token);
        localStorage.setItem("bg_admin_user", res.username);
        navigate({ to: "/admin" });
      } else {
        setError(res.error || "Error al iniciar sesion");
      }
    } catch (e: any) {
      setError(e.message || "Error");
    }
    setLoading(false);
  };

  return (
    <div className="dark flex min-h-dvh items-center justify-center bg-bg-navy px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/assets/logo-bg-travel.png" alt="BG Travel" className="mx-auto h-12 w-auto" />
          <h1 className="mt-4 text-display text-2xl font-bold">Panel Administrativo</h1>
          <p className="mt-2 text-sm text-text-secondary">Ingresa tus credenciales</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border-light bg-bg-card p-8">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-secondary">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border-light bg-bg-navy px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30"
              placeholder="admin"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border-light bg-bg-navy px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber px-6 py-3 font-semibold text-bg-navy transition-all hover:bg-amber-light disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          <p className="text-center text-xs text-text-muted">
            Usuario por defecto: <code className="rounded bg-bg-navy px-1.5 py-0.5">admin</code> / <code className="rounded bg-bg-navy px-1.5 py-0.5">admin123</code>
          </p>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-text-secondary hover:text-amber">← Volver al sitio</a>
        </div>
      </div>
    </div>
  );
}