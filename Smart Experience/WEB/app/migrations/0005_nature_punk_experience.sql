-- Migracion 0005: Nature Punk en tabla experiences (admin panel)
INSERT INTO experiences (name, subtitle, description, image_url, price, tag, duration, featured)
VALUES (
  'Nature Punk — Exploracion Sonora Inmersiva',
  'Sonido, naturaleza y cultura andina',
  'Experiencias sonoras inmersivas que integran conciertos silent, soundwalks con biofeedback vegetal, narracion musical andina en vivo y sinfonias ocultas. Audifonos 8D inalambricos, paisajes sonoros y bioacustica en entornos naturales y patrimoniales.',
  '/assets/plate-nature-punk.png',
  'Consultar',
  'Cusco / Valle Sagrado',
  '50 min — 2 hrs',
  1
);