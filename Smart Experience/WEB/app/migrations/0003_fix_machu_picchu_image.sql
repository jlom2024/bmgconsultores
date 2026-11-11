-- Migracion 0003: actualizar imagen del articulo de Machu Picchu para no repetir con el articulo de destinos
UPDATE blog_posts SET image_url = '/assets/plate-machu-picchu.png' WHERE slug = 'planificar-viaje-machu-picchu-2026-guia';
