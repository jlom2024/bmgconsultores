import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";

export const Route = createFileRoute("/experiencias")({
  component: ExperienciasPage,
  head: () => ({
    meta: [
      { title: "Experiencias — BG Travel Peru" },
      { name: "description", content: "Explora nuestras experiencias unicas en Peru: Cusco, Lima, Arequipa, Ica, Tarma y Nature Punk. Viajes culturales, comerciales y de aventura." },
      { property: "og:title", content: "Experiencias Turisticas — BG Travel Peru" },
      { property: "og:description", content: "Descubre los mejores destinos de Peru con paquetes turisticos personalizados." },
    ],
  }),
});

const allExperiences = [
  { name: "Cusco Imperial", subtitle: "Valle Sagrado y Machu Picchu", image: "/assets/plate-cusco.png", price: "desde S/ 890", tag: "Cultural", duration: "4 dias / 3 noches", description: "Descubre la magia del Cusco con un recorrido por el Valle Sagrado, Machu Picchu y la ciudad imperial. Incluye guia bilingue, transporte y alojamiento." },
  { name: "Tarma Natural", subtitle: "La Perla de los Andes", image: "/assets/plate-tarma.png", price: "desde S/ 320", tag: "Naturaleza", duration: "2 dias / 1 noche", description: "Explora los paisajes verdes de Tarma, sus miradores, la gruta de Huagapo y la campiña juninense. Aire puro y cultura altoandina." },
  { name: "Gamarra Fashion Tour", subtitle: "Textiles y diseno peruano", image: "/assets/plate-gamarra.png", price: "desde S/ 150", tag: "Comercial", duration: "1 dia", description: "Recorre el emporio comercial de Gamarra con un guia experto. Conoce fabricas, disenadores y lleva las mejores piezas de algodon peruano." },
  { name: "Lima Gastronomica", subtitle: "Sabores del Peru", image: "/assets/plate-lima-gastronomia.png", price: "desde S/ 280", tag: "Gastronomia", duration: "2 dias / 1 noche", description: "Un viaje por la cocina peruana: ceviche, causa, lomo saltado y mas. Incluye clase de cocina y visita a mercados tradicionales." },
  { name: "Ica y Huacachina", subtitle: "Aventura en el Desierto", image: "/assets/plate-huacachina.png", price: "desde S/ 350", tag: "Aventura", duration: "2 dias / 1 noche", description: "Navega en las dunas de Huacachina, visita bodegas de pisco y disfruta del oasis mas famoso del Peru." },
  { name: "Paquete Internacional", subtitle: "Destinos fuera de Peru", image: "/assets/plate-internacional.png", price: "desde S/ 1,200", tag: "Internacional", duration: "Variable", description: "Viajes internacionales personalizados. Consulta con nuestro asistente IA para encontrar el destino perfecto para ti." },
  { name: "Nature Punk — Exploracion Sonora Inmersiva", subtitle: "Sonido, naturaleza y cultura andina", image: "/assets/plate-nature-punk.png", price: "Consultar", tag: "Cusco / Valle Sagrado", duration: "50 min — 2 hrs", description: "Experiencias sonoras inmersivas que integran conciertos silent, soundwalks con biofeedback vegetal, narracion musical andina en vivo y sinfonias ocultas. Audifonos 8D inalambricos, paisajes sonoros y bioacustica en entornos naturales y patrimoniales. Incluye: audifonos inmersivos 8D, live performance de Nature Punk / Tayta Bird, curaduria musical y narrativa, operacion tecnica y guia facilitador.", formats: ["Narracion Musical Inmersiva", "Sinfonia Oculta", "Silent Concert", "Tour Ecosonoro", "Soundhealing"] },
];

function ExperienciasPage() {
  return (
    <div className="dark min-h-dvh bg-bg-navy">
      <Navbar scrolledBg />

      <main className="pt-24">
        <div className="section-padding">
          <div className="max-w-content">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-1.5 text-sm text-amber">
                Experiencias
              </span>
              <h1 className="mt-4 text-display text-4xl font-bold md:text-6xl">
                Todas nuestras <span className="text-amber">experiencias</span>
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Cada experiencia esta disenada para conectarte con lo autentico del Peru.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allExperiences.map((exp) => (
                <div key={exp.name} className="group overflow-hidden rounded-2xl border border-border-light bg-bg-card transition-all duration-300 hover:border-amber/20">
                  <div className="relative h-48 overflow-hidden">
                    <img src={exp.image} alt={exp.name} className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-navy/80 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-amber/90 px-3 py-1 text-xs font-medium text-bg-navy">{exp.tag}</span>
                    <span className="absolute bottom-4 right-4 rounded-full bg-bg-navy/80 px-3 py-1 text-sm font-medium text-amber backdrop-blur-sm">{exp.price}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{exp.name}</h3>
                    <p className="mt-1 text-sm text-text-muted">{exp.duration}</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{exp.description}</p>
                    {(exp as any).formats && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(exp as any).formats.map((f: string) => (
                          <span key={f} className="rounded-full bg-amber/8 px-2.5 py-0.5 text-[10px] font-medium text-amber-light/80 border border-amber/15">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex gap-2">
                      <a
                        href={`https://wa.me/51994118084?text=${encodeURIComponent(exp.name === "Nature Punk — Exploracion Sonora Inmersiva" ? "Hola! Quiero cotizar la experiencia Nature Punk — Exploracion Sonora Inmersiva en Cusco / Valle Sagrado" : "Hola! Quiero cotizar la experiencia " + exp.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-amber/10 px-3 py-2 text-xs font-medium text-amber transition-colors hover:bg-amber/20"
                      >
                        Consultar disponibilidad
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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