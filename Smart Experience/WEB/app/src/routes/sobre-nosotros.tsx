import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";

export const Route = createFileRoute("/sobre-nosotros")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Sobre Nosotros — BG Travel Peru" },
      { name: "description", content: "BG Travel Peru: agencia de viajes liderada por mujer emprendedora peruana, ubicada en Gamarra, La Victoria. Turismo cultural y comercial." },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="dark min-h-dvh bg-bg-navy">
      <Navbar scrolledBg />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img src="/assets/plate-gamarra.png" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-navy via-bg-navy/70 to-bg-navy/40" />
          </div>
          <div className="relative section-padding">
            <div className="max-w-content">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-1.5 text-sm text-amber">
                Sobre Nosotros
              </span>
              <h1 className="mt-4 text-display text-4xl font-bold leading-tight md:text-6xl">
                Turismo con <span className="text-amber">identidad peruana</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-text-secondary md:text-xl">
                BG Travel Peru es una agencia de viajes liderada por mujer emprendedora peruana,
                ubicada en el corazon de Gamarra, La Victoria. Transformamos el turismo tradicional
                en experiencias inteligentes con identidad cultural.
              </p>
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="section-padding bg-bg-surface">
          <div className="max-w-content">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <span className="text-sm font-medium text-amber">Nuestra Historia</span>
                <h2 className="mt-2 text-display text-3xl font-bold md:text-4xl">
                  Desde Gamarra para el mundo
                </h2>
                <div className="mt-6 space-y-4 text-text-secondary">
                  <p>
                    BG Travel Peru nace de la vision de una mujer emprendedora peruana que vio en
                    la ubicacion de Gamarra una oportunidad unica: conectar el turismo con el
                    comercio textil mas importante de Latinoamerica.
                  </p>
                  <p>
                    Comenzamos vendiendo paquetes turisticos tradicionales por WhatsApp y redes
                    sociales. Hoy, con el apoyo de MINCETUR, transformamos la empresa hacia una
                    plataforma digital inteligente que integra IA, contenido cultural y una
                    gestion comercial eficiente.
                  </p>
                  <p>
                    Nuestra mision es mostrar el Peru autentico: su cultura, su gastronomia, sus
                    textiles y su gente. Cada experiencia esta disenada para dejar una huella
                    positiva en comunidades locales y en cada viajero.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img src="/assets/plate-tarma.png" alt="Paisaje del Peru" className="rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border-light bg-bg-navy p-6 shadow-xl md:p-8">
                  <div className="text-display text-4xl font-black text-amber md:text-5xl">8+</div>
                  <div className="text-sm text-text-secondary">Anos de experiencia en turismo</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="section-padding">
          <div className="max-w-content">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium text-amber">Nuestros Valores</span>
              <h2 className="mt-2 text-display text-3xl font-bold md:text-4xl">Lo que nos mueve</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { title: "Autenticidad", desc: "Cada experiencia es real, sin filtros ni paquetes genericos. Conectamos con lo esencial de cada destino." },
                { title: "Innovacion", desc: "Usamos tecnologia e inteligencia artificial para personalizar cada viaje y hacer la experiencia mas fluida." },
                { title: "Sostenibilidad", desc: "Trabajamos con comunidades locales y promovemos un turismo responsable que beneficie a quienes lo hacen posible." },
              ].map((v) => (
                <div key={v.title} className="group rounded-2xl border border-border-light bg-bg-card p-8 transition-all hover:border-amber/20 hover:shadow-[0_0_30px_rgba(217,119,6,0.1)]">
                  <h3 className="text-xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciadores */}
        <section className="section-padding bg-bg-surface">
          <div className="max-w-content">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium text-amber">Nuestra Diferencia</span>
              <h2 className="mt-2 text-display text-3xl font-bold md:text-4xl">Por que elegirnos</h2>
            </div>
            <div className="mt-12 space-y-4">
              {[
                { num: "01", title: "Turismo + Comercio", desc: "Somos la unica agencia que integra experiencias turisticas con el mundo de la moda y los textiles de Gamarra." },
                { num: "02", title: "Atencion personalizada", desc: "Cada cliente recibe una atencion cercana y detallada. No somos una plataforma masiva, somos un equipo humano." },
                { num: "03", title: "Tecnologia inteligente", desc: "Nuestra plataforma con IA ayuda a encontrar la experiencia perfecta para cada perfil de viajero." },
                { num: "04", title: "Mujer emprendedora", desc: "Empresa liderada por mujer peruana, con profundo conocimiento del territorio y las comunidades que trabajamos." },
              ].map((item) => (
                <div key={item.num} className="flex gap-6 rounded-2xl border border-border-light bg-bg-card p-6 transition-all hover:border-amber/20 md:p-8">
                  <span className="shrink-0 text-display text-2xl font-black text-amber/20 md:text-4xl">{item.num}</span>
                  <div>
                    <h3 className="text-lg font-bold md:text-xl">{item.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary md:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="max-w-content">
            <div className="text-center">
              <h2 className="text-display text-3xl font-bold md:text-4xl">
                Listo para vivir tu <span className="text-amber">experiencia</span>?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Escríbenos por WhatsApp y armamos el viaje perfecto para ti.
              </p>
              <a
                href="https://wa.me/51994118084"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber px-8 py-3 font-semibold text-bg-navy transition-all hover:bg-amber-light hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </section>
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