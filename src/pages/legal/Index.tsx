import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/seo";

const GOLD = "var(--brand-gold)";

const LegalShell = ({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logos/bmg_clean.png?v=5" alt="BMG Consultores" className="h-10 w-auto object-contain" />
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/80 hover:text-white transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </header>

    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD }}>
        BMG Consultores · Documento legal
      </p>
      <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {title}
      </h1>
      <p className="text-muted-foreground text-sm mb-10">Última actualización: {updated}</p>
      <div className="space-y-8">{children}</div>
    </main>

    <footer className="py-8 bg-background border-t border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-xs">© 2025 BMG Consultores. Todos los derechos reservados.</p>
        <div className="flex gap-4 text-xs">
          <Link to="/privacidad" className="text-white/40 hover:text-white/70 transition-colors">Política de privacidad</Link>
          <Link to="/terminos" className="text-white/40 hover:text-white/70 transition-colors">Términos y condiciones</Link>
        </div>
      </div>
    </footer>
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section>
    <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      {title}
    </h2>
    <div className="text-muted-foreground text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export function PrivacidadPage() {
  usePageMeta({
    title: "Política de Privacidad",
    description:
      "Política de privacidad de BMG Consultores (Perú): qué datos recogemos, cómo los usamos y tus derechos según la Ley N° 29733 de Protección de Datos Personales.",
    path: "/privacidad",
  });

  return (
    <LegalShell title="Política de Privacidad" updated="27 de agosto de 2026">
      <Section title="1. Información general">
        <p>
          BMG Consultores respeta tu privacidad y se compromete a proteger los datos personales que nos facilitas a través de
          este sitio web y de nuestros canales de contacto, de conformidad con la Ley N° 29733 — Ley de Protección de Datos
          Personales del Perú y su reglamento.
        </p>
        <p>
          Al usar este sitio aceptas las prácticas descritas en esta política. Si no estás de acuerdo, te pedimos que no
          facilites datos personales a través de nuestros formularios o canales.
        </p>
      </Section>

      <Section title="2. Datos que recogemos">
        <p>
          Recogemos información de forma limitada y con una finalidad concreta. Eso incluye, entre otros:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Datos de contacto que nos proporcionas voluntariamente: nombre, teléfono, correo electrónico y el contenido de tu mensaje.</li>
          <li>Información intercambiada por WhatsApp u otros canales de comunicación habilitados, como consultas sobre nuestros servicios.</li>
          <li>Datos técnicos de navegación recogidos de forma automática (tipo de navegador, dispositivo y páginas consultadas).</li>
        </ul>
      </Section>

      <Section title="3. Finalidad del tratamiento">
        <p>Utilizamos los datos facilitados exclusivamente para:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Atender tus consultas y solicitudes de información sobre nuestros servicios.</li>
          <li>Gestionar la comunicación comercial en la que hayas mostrado interés.</li>
          <li>Elaborar propuestas, cotizaciones y dar seguimiento a tu solicitud.</li>
          <li>Mejorar la experiencia de uso y el contenido del sitio web.</li>
        </ul>
      </Section>

      <Section title="4. Cookies y tecnologías similares">
        <p>
          Este sitio puede usar cookies y tecnologías similares para recordar preferencias, medir el tráfico y personalizar la
          experiencia. También integramos un asistente conversacional de terceros que puede recoger datos técnicos para su
          correcto funcionamiento. Puedes gestionar o deshabilitar las cookies desde la configuración de tu navegador.
        </p>
      </Section>

      <Section title="5. Compartición con terceros">
        <p>
          No vendemos ni alquilamos tus datos personales. Podemos compartirlos únicamente con proveedores de servicios que
          facilitan nuestra operación (por ejemplo, la plataforma de mensajería WhatsApp, proveedores de análisis web y de
          alojamiento), siempre que actúen conforme a esta política y a la normativa aplicable.
        </p>
      </Section>

      <Section title="6. Tus derechos">
        <p>
          Como titular de datos personales tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus
          datos, así como a conocer si estos están siendo tratados. Para ejercer estos derechos puedes escribirnos por WhatsApp
          al <span style={{ color: GOLD }}>+51 994 118 084</span> o a través de los canales de contacto publicados en este sitio.
        </p>
      </Section>

      <Section title="7. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger la información personal frente a accesos no
          autorizados, pérdida o alteración. Sin embargo, ningún sistema de transmisión o almacenamiento es 100% seguro, por lo
          que no podemos garantizar una seguridad absoluta.
        </p>
      </Section>

      <Section title="8. Contacto">
        <p>
          Si tienes preguntas sobre esta política o sobre el tratamiento de tus datos, contáctanos por WhatsApp al{" "}
          <span style={{ color: GOLD }}>+51 994 118 084</span> o visite nuestro sitio en{" "}
          <span style={{ color: GOLD }}>www.bmgconsultoresperu.com</span>.
        </p>
      </Section>
    </LegalShell>
  );
}

export function TerminosPage() {
  usePageMeta({
    title: "Términos y Condiciones",
    description:
      "Términos y condiciones de uso del sitio web y de los servicios de BMG Consultores (Perú). Lee las condiciones antes de contratar nuestros servicios.",
    path: "/terminos",
  });

  return (
    <LegalShell title="Términos y Condiciones" updated="27 de agosto de 2026">
      <Section title="1. Aceptación de los términos">
        <p>
          Al acceder a este sitio web y utilizar nuestros servicios, aceptas los presentes Términos y Condiciones. Si no estás
          de acuerdo, te pedimos que no uses el sitio ni contrates nuestros servicios.
        </p>
      </Section>

      <Section title="2. Naturaleza de los servicios">
        <p>
          BMG Consultores ofrece servicios de asesoría en: BG Travel, BG Emprendedor, BG Contable, BG Legal, BG Desarrollo IA,
          BG Gestores y BG Saneamiento &amp; Construcción. La información publicada en el sitio tiene carácter informativo y de presentación de
          servicios, y no constituye, por sí sola, una oferta contractual vinculante ni una asesoría formal.
        </p>
        <p>
          El alcance concreto de cada servicio se definirá en una propuesta o acuerdo específico con el cliente. Los precios,
          plazos y resultados pueden variar según el caso.
        </p>
      </Section>

      <Section title="3. Uso del sitio">
        <p>
          Te comprometes a usar este sitio únicamente con fines legítimos y a no incurrir en conductas que puedan dañar, alterar
          o interrumpir su funcionamiento, ni vulnerar derechos de terceros. Queda prohibido el uso del contenido con fines
          ilícitos o engañosos.
        </p>
      </Section>

      <Section title="4. Propiedad intelectual">
        <p>
          Todo el contenido de este sitio — textos, imágenes, logotipos, diseño y elementos gráficos — es titularidad de BMG
          Consultores o de sus licenciantes, y está protegido por la legislación de propiedad intelectual. No puede reproducirse,
          distribuirse ni utilizarse comercialmente sin autorización previa y por escrito.
        </p>
      </Section>

      <Section title="5. Limitación de responsabilidad">
        <p>
          BMG Consultores no se responsabiliza de los daños derivados del uso indebido del sitio, de la información publicada o
          de decisiones adoptadas sin la asesoría formal correspondiente. Los servicios se prestan de buena fe, y la
          responsabilidad contractual se rige por el acuerdo específico celebrado con cada cliente.
        </p>
      </Section>

      <Section title="6. Enlaces y servicios de terceros">
        <p>
          El sitio puede integrar herramientas o enlaces de terceros (por ejemplo, WhatsApp y un asistente conversacional). Estos
          servicios operan bajo sus propias condiciones y políticas de privacidad, que no son responsabilidad de BMG Consultores.
        </p>
      </Section>

      <Section title="7. Ley aplicable">
        <p>
          Los presentes términos se rigen por la legislación de la República del Perú. Para cualquier controversia, las partes se
          someterán a la jurisdicción de los tribunales competentes de Lima, Perú.
        </p>
      </Section>

      <Section title="8. Cambios en los términos">
        <p>
          Podemos actualizar estos términos en cualquier momento. La versión vigente será la publicada en este sitio, y el uso
          continuado del mismo implica la aceptación de la versión actualizada.
        </p>
      </Section>

      <Section title="9. Contacto">
        <p>
          Para resolver cualquier duda sobre estos términos, contáctanos por WhatsApp al{" "}
          <span style={{ color: GOLD }}>+51 994 118 084</span>.
        </p>
      </Section>
    </LegalShell>
  );
}

export default LegalShell;
