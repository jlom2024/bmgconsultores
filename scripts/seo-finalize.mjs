// Post-build SEO finalization: replaces the __SITE_URL__ placeholder baked
// into dist/index.html and writes a real static dist/sitemap.xml from the
// route manifest produced by generate-sitemap-routes.mjs.
//
// Keep SITE_URL's default in sync with src/lib/seo.ts.
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

function run() {
  const cwd = process.cwd();
  const siteUrl = (process.env.VITE_SITE_URL || "https://bmgconsultores.site").replace(/\/$/, "");

  for (const file of ["dist/index.html", "dist/robots.txt"]) {
    const filePath = resolve(cwd, file);
    try {
      const content = readFileSync(filePath, "utf-8");
      writeFileSync(filePath, content.split("__SITE_URL__").join(siteUrl));
      console.log(`[seo-finalize] replaced __SITE_URL__ with ${siteUrl} in ${file}`);
    } catch (e) {
      console.warn(`[seo-finalize] skipped ${file}: ${e?.message}`);
    }
  }

  const routesManifestPath = resolve(cwd, "dist/sitemap-routes.json");
  let routes = ["/"];
  try {
    routes = JSON.parse(readFileSync(routesManifestPath, "utf-8")).routes;
  } catch (e) {
    console.warn("[seo-finalize] no sitemap-routes.json found, defaulting to just \"/\"", e?.message);
  }

  const urlset = routes
    .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
    .join("\n");
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;

  writeFileSync(resolve(cwd, "dist/sitemap.xml"), sitemapXml);
  console.log(`[seo-finalize] wrote dist/sitemap.xml with ${routes.length} routes`);
}

run();
