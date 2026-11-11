import { createFileRoute } from '@tanstack/react-router'
import { getBlogPosts } from '../lib/api/blog.functions'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin
        const today = new Date().toISOString().split('T')[0]

        // Static routes
        const staticRoutes = [
          { path: '/', priority: '1.0', freq: 'weekly' },
          { path: '/experiencias', priority: '0.9', freq: 'weekly' },
          { path: '/blog', priority: '0.8', freq: 'weekly' },
          { path: '/sobre-nosotros', priority: '0.7', freq: 'monthly' },
        ]

        // Blog posts from DB (with fallback)
        let postRoutes: { path: string; priority: string; freq: string }[] = []
        try {
          const posts = await getBlogPosts()
          if (posts.ok && posts.data) {
            postRoutes = posts.data.map((p: any) => ({
              path: `/blog/${p.slug}`,
              priority: '0.6',
              freq: 'monthly',
            }))
          }
        } catch {
          // Static fallback slugs
          postRoutes = [
            { path: '/blog/10-razones-visitar-tarma', priority: '0.6', freq: 'monthly' },
            { path: '/blog/gamarra-corazon-moda-peruana', priority: '0.6', freq: 'monthly' },
            { path: '/blog/cusco-7-experiencias-mas-alla-machu-picchu', priority: '0.6', freq: 'monthly' },
          ]
        }

        const allRoutes = [...staticRoutes, ...postRoutes]

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...allRoutes.map(route => [
            '  <url>',
            `    <loc>${origin}${route.path}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            `    <changefreq>${route.freq}</changefreq>`,
            `    <priority>${route.priority}</priority>`,
            '  </url>',
          ].join('\n')),
          '</urlset>',
        ].join('\n')

        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
