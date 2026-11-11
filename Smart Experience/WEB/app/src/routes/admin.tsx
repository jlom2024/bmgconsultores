import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout de admin: simplemente renderiza las rutas hijas
// El chequeo de auth se hace en cada ruta hija (index.tsx)
export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return <Outlet />;
}
