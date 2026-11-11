import { createFileRoute } from "@tanstack/react-router";
import { getBlogPost } from "../lib/api/blog.functions";
import { Navbar } from "../components/Navbar";

// @ts-ignore - route tree generated during build
export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const result = await getBlogPost({ data: params.slug });
    if (!result.ok || !result.data) return { post: null };
    return { post: result.data };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.post?.title ? `${loaderData.post.title} — BG Travel` : "Blog — BG Travel Peru" },
      { name: "description", content: loaderData?.post?.excerpt || "Historias de viaje en Peru." },
    ],
  }),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
    } catch { return dateStr; }
  };

  return (
    <div className="dark min-h-dvh bg-bg-navy">
      <Navbar scrolledBg />

      <main className="pt-16">
        {!post ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-2xl font-bold">Articulo no encontrado</h1>
            <p className="mt-2 text-text-secondary">El articulo que buscas no existe o fue eliminado.</p>
            <a href="/blog" className="mt-6 rounded-xl bg-amber px-6 py-3 font-semibold text-bg-navy transition-colors hover:bg-amber-light">
              Ver todos los articulos
            </a>
          </div>
        ) : (
          <>
            {/* Hero image */}
            <div className="relative h-64 w-full overflow-hidden md:h-80">
              <img src={post.image_url} alt={post.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-navy via-bg-navy/40 to-transparent" />
            </div>

            <div className="mx-auto max-w-3xl px-6 py-10">
              <div className="text-sm text-amber">{formatDate(post.published_at)} · {post.author}</div>
              <h1 className="mt-3 text-display text-3xl font-bold leading-tight md:text-5xl">{post.title}</h1>
              {post.excerpt && (
                <p className="mt-4 text-lg text-text-secondary">{post.excerpt}</p>
              )}

              <div
                className="prose prose-invert mt-8 max-w-none text-text-primary prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-text-primary prose-a:text-amber"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-12 border-t border-border-light pt-8">
                <a href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-amber hover:text-amber-light">
                  ← Ver todos los articulos
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-amber/20 bg-amber/5 p-8">
                <h3 className="text-xl font-bold">¿Te gustaría vivir esta experiencia?</h3>
                <p className="mt-2 text-text-secondary">
                  Cotiza tu viaje personalizado con nuestro asistente. Respuesta por WhatsApp en menos de 24 horas.
                </p>
                <a
                  href="https://wa.me/51994118084"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 font-semibold text-bg-navy transition-colors hover:bg-amber-light"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-border-light bg-bg-surface py-8">
        <div className="max-w-content px-6 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} BG Travel Peru EIRL. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
