import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout de blog: renderiza rutas hijas (index = listado, $slug = detalle)
export const Route = createFileRoute("/blog")({
  component: BlogLayout,
  head: () => ({
    meta: [{ title: "Blog — BG Travel Peru" }],
  }),
});

function BlogLayout() {
  return <Outlet />;
}
