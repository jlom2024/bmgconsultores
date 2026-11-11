import { createFileRoute } from "@tanstack/react-router";
import { getBlogPosts } from "../lib/api/blog.functions";
import { Navbar } from "../components/Navbar";

// @ts-ignore - route tree generated during build
export const Route = createFileRoute("/blog/")({
  component: BlogPage,
  loader: async () => {
    const result = await getBlogPosts();
    if (!result.ok) return { posts: [] };
    return { posts: result.data || [] };
  },
  head: () => ({
    meta: [
      { title: "Blog — BG Travel Peru" },
      { name: "description", content: "Historias, guias y consejos de viaje en Peru. Cultura, gastronomia y experiencias unicas." },
    ],
  }),
});

function BlogPage() {
  const { posts } = Route.useLoaderData();

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
    } catch { return dateStr; }
  };

  return (
    <div className="dark min-h-dvh bg-bg-navy">
      <Navbar scrolledBg />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/assets/blog-hero.png" alt="Textiles peruanos" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-bg-navy/60 md:bg-gradient-to-b md:from-bg-navy/40 md:via-bg-navy/70 md:to-bg-navy" />
          </div>
          <div className="relative z-10 flex min-h-[50vh] items-end pb-16 pt-32 md:min-h-[60vh] md:items-center md:pb-24">
            <div className="section-padding w-full">
              <div className="max-w-content">
                <div className="mx-auto max-w-2xl text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 text-sm text-amber">
                    Blog de Viajes
                  </span>
                  <h1 className="mt-4 text-display text-4xl font-bold md:text-5xl">
                    Historias del <span className="text-amber">Peru</span>
                  </h1>
                  <p className="mt-4 text-lg text-text-secondary">
                    Guias, consejos y relatos para inspirar tu proxima aventura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-padding pt-0">
          <div className="max-w-content">
            {!posts || posts.length === 0 ? (
              <div className="py-20 text-center text-text-secondary">
                No hay articulos publicados aun.
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: any) => (
                  <article key={post.id} className="group overflow-hidden rounded-2xl border border-border-light bg-bg-card transition-all duration-300 hover:border-amber/20">
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-navy/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-text-muted">{formatDate(post.published_at)} · {post.author}</div>
                      <h2 className="mt-2 text-xl font-bold leading-tight transition-colors group-hover:text-amber">{post.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
                      <a href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber transition-colors hover:text-amber-light">
                        Leer mas
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border-light bg-bg-surface py-8">
        <div className="max-w-content px-6 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} BG Travel Peru EIRL. Todos los derechos reservados.
          <a href="/" className="ml-4 text-text-secondary hover:text-amber">Volver al inicio</a>
        </div>
      </footer>
    </div>
  );
}
