import { useState, useEffect, useRef } from "react";
import {
  Clock, Target, Users, Zap, ArrowRight, CheckCircle2, BarChart3, Brain,
  Briefcase, MessageSquare, TrendingUp, Shield, ChevronRight, Mail, Phone,
  MapPin, Lightbulb, Layers, UserCheck, CalendarCheck, Search, Wrench,
  Rocket, X, Menu, Star, ChevronLeft,
} from "lucide-react";

const LOGO_MAIN = "/logo.png";

/* ─── Intersection Observer hook ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isVisible];
}

function FadeIn({ children, className = "", delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Global Styles ─── */
const globalStyles = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
    :root {
      --navy: #0B1D35;
      --blue: #1D4ED8;
      --blue-light: #3B82F6;
      --blue-pale: #EFF6FF;
      --gray-50: #F8FAFC;
      --gray-100: #F1F5F9;
      --gray-200: #E2E8F0;
      --gray-400: #94A3B8;
      --gray-500: #64748B;
      --gray-600: #475569;
      --gray-700: #334155;
      --gray-900: #0F172A;
      --white: #FFFFFF;
    }
    * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
    h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Sora', sans-serif; }
    html { scroll-behavior: smooth; }
    body { overflow-x: hidden; }
    .btn-primary {
      background: var(--blue); color: white; padding: 14px 32px; border-radius: 10px;
      font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.25s ease; cursor: pointer; border: none;
      font-family: 'Sora', sans-serif; letter-spacing: -0.01em; text-decoration: none;
    }
    .btn-primary:hover { background: #1e40af; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(29,78,216,0.25); }
    .btn-secondary {
      background: transparent; color: var(--navy); padding: 14px 32px; border-radius: 10px;
      font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.25s ease; cursor: pointer; border: 2px solid var(--gray-200);
      font-family: 'Sora', sans-serif; letter-spacing: -0.01em; text-decoration: none;
    }
    .btn-secondary:hover { border-color: var(--blue); color: var(--blue); }
    .card {
      background: white; border-radius: 16px; padding: 32px;
      border: 1px solid var(--gray-100); transition: all 0.3s ease;
    }
    .card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.06); border-color: var(--gray-200); }
    .section-label {
      font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--blue);
    }
    .section-title {
      font-family: 'Sora', sans-serif; font-size: clamp(28px, 4vw, 40px); font-weight: 700;
      color: var(--navy); line-height: 1.2; letter-spacing: -0.02em;
    }
    .section-sub { font-size: 17px; color: var(--gray-600); line-height: 1.7; max-width: 640px; }
    .nav-link {
      font-size: 14px; font-weight: 500; color: var(--gray-600); text-decoration: none;
      transition: color 0.2s; cursor: pointer;
    }
    .nav-link:hover { color: var(--navy); }

    /* ── Focus styles (keyboard navigation) ── */
    :focus-visible {
      outline: 2px solid var(--blue);
      outline-offset: 3px;
      border-radius: 4px;
    }
    input:focus-visible, textarea:focus-visible, select:focus-visible {
      outline: 2px solid var(--blue);
      outline-offset: 0;
      border-color: var(--blue) !important;
      border-radius: 10px;
    }
    button:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; border-radius: 50%; }
    a:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; border-radius: 6px; }
    /* ── Tablet & Mobile (≤ 768px) ── */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: block !important; }

      /* Grids → single column */
      .mobile-stack  { grid-template-columns: 1fr !important; }
      .services-grid { grid-template-columns: 1fr !important; min-width: 0 !important; }
      .stats-grid    { grid-template-columns: 1fr !important; gap: 16px !important; padding: 24px 20px !important; }

      /* Hero 2-col → 1-col, hide visual panel */
      .hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
      .hero-visual-col { display: none !important; }
      .hero-btns a, .hero-btns button { width: 100% !important; justify-content: center !important; }

      /* Differentiators table */
      .diff-table { font-size: 12px !important; }
      .diff-table > div { grid-template-columns: 90px 1fr 1fr !important; }

      /* Section padding */
      section { padding-left: 16px !important; padding-right: 16px !important; }

      /* Cards & inner containers */
      .card { padding: 20px !important; }

      /* Testimonials */
      .testimonial-top { flex-direction: column !important; gap: 12px !important; }
      .testimonial-card { padding: 24px 20px !important; }

      /* Process */
      .process-grid { grid-template-columns: 1fr !important; }

      /* Typography */
      .section-title { font-size: clamp(22px, 6vw, 32px) !important; }
      .section-sub   { font-size: 15px !important; }
    }

    /* ── Small phones (≤ 480px) ── */
    @media (max-width: 480px) {
      .diff-table { display: none !important; }
      .stats-grid { grid-template-columns: 1fr !important; }
      .section-title { font-size: clamp(20px, 7vw, 28px) !important; }
    }
  `}</style>
);

/* ─── Logo Component ─── */
function Logo({ height = 36, dark = false }) {
  return dark ? (
    <div style={{ background: "white", borderRadius: 8, padding: "4px 8px", display: "inline-flex", alignItems: "center" }}>
      <img src={LOGO_MAIN} alt="Prodigio IA" style={{ height, width: "auto", objectFit: "contain" }} />
    </div>
  ) : (
    <img src={LOGO_MAIN} alt="Prodigio IA" style={{ height, width: "auto", objectFit: "contain" }} />
  );
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--gray-100)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Logo height={34} />
        </a>
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="#servicios" className="nav-link">Servicios</a>
          <a href="#proyectos" className="nav-link">Proyectos</a>
          <a href="#proceso" className="nav-link">Proceso</a>
          <a href="#diferenciadores" className="nav-link">¿Por qué nosotros?</a>
          <a href="#contacto" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>Agenda una llamada <ArrowRight size={16} /></a>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--navy)" }} className="show-mobile">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div style={{ background: "white", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16, borderBottom: "1px solid var(--gray-100)" }}>
          <a href="#servicios" className="nav-link" onClick={() => setMobileOpen(false)}>Servicios</a>
          <a href="#proyectos" className="nav-link" onClick={() => setMobileOpen(false)}>Proyectos</a>
          <a href="#proceso" className="nav-link" onClick={() => setMobileOpen(false)}>Proceso</a>
          <a href="#diferenciadores" className="nav-link" onClick={() => setMobileOpen(false)}>¿Por qué nosotros?</a>
          <a href="#contacto" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ justifyContent: "center" }}>Agenda una llamada <ArrowRight size={16} /></a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO VISUAL ─── */
function HeroVisual() {
  return (
    <div style={{ position: "relative", width: "100%", minHeight: 460, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background circle decoration */}
      <div style={{
        position: "absolute", top: "5%", right: "0%", width: 340, height: 340,
        borderRadius: "50%", background: "var(--blue-pale)", opacity: 0.9, zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "5%", left: "5%", width: 160, height: 160,
        borderRadius: "50%", background: "#DBEAFE", opacity: 0.6, zIndex: 0,
      }} />

      {/* Card 1 — Ahorro de tiempo */}
      <div style={{
        position: "absolute", top: "4%", left: "2%", width: 210, zIndex: 2,
        background: "white", borderRadius: 16, padding: "18px 22px",
        boxShadow: "0 16px 48px rgba(11,29,53,0.10)", border: "1px solid var(--gray-100)",
      }}>
        <div style={{ fontSize: 11, fontFamily: "'Sora',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--gray-400)", marginBottom: 8 }}>Ahorro diario</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: "var(--blue)", fontFamily: "'Sora',sans-serif", lineHeight: 1, marginBottom: 4 }}>1–2 hrs</div>
        <div style={{ fontSize: 12, color: "var(--gray-500)" }}>por persona en tu equipo</div>
        <div style={{ marginTop: 12, height: 4, borderRadius: 4, background: "var(--blue-pale)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: "75%", borderRadius: 4, background: "var(--blue)" }} />
        </div>
      </div>

      {/* Card 2 — Adopción */}
      <div style={{
        position: "absolute", top: "38%", right: "2%", width: 196, zIndex: 2,
        background: "var(--navy)", borderRadius: 16, padding: "18px 22px",
        boxShadow: "0 16px 48px rgba(11,29,53,0.22)",
      }}>
        <div style={{ fontSize: 11, fontFamily: "'Sora',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Adopción</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: "white", fontFamily: "'Sora',sans-serif", lineHeight: 1, marginBottom: 4 }}>100%</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>adoptó IA en 24 horas</div>
        <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= 6 ? "#3B82F6" : "rgba(255,255,255,0.1)" }} />
          ))}
        </div>
      </div>

      {/* Card 3 — Satisfacción */}
      <div style={{
        position: "absolute", bottom: "6%", left: "8%", width: 200, zIndex: 2,
        background: "white", borderRadius: 16, padding: "18px 22px",
        boxShadow: "0 16px 48px rgba(11,29,53,0.09)", border: "1px solid var(--gray-100)",
      }}>
        <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
          {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", fontFamily: "'Sora',sans-serif", lineHeight: 1, marginBottom: 4 }}>
          9.5<span style={{ fontSize: 14, fontWeight: 500, color: "var(--gray-400)" }}>/10</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--gray-500)" }}>satisfacción promedio</div>
      </div>

      {/* Center logo mark — decorative */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <svg viewBox="0 0 140 140" width="140" height="140" style={{ opacity: 0.08 }}>
          <circle cx="54" cy="54" r="40" fill="none" stroke="#1D4ED8" strokeWidth="10" />
          <circle cx="86" cy="86" r="40" fill="none" stroke="#1D4ED8" strokeWidth="10" />
        </svg>
      </div>

      {/* Floating dot — accent */}
      <div style={{
        position: "absolute", top: "28%", left: "38%", width: 12, height: 12,
        borderRadius: "50%", background: "var(--blue)", opacity: 0.35, zIndex: 1,
      }} />
      <div style={{
        position: "absolute", top: "60%", right: "28%", width: 8, height: 8,
        borderRadius: "50%", background: "var(--blue)", opacity: 0.25, zIndex: 1,
      }} />
    </div>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section style={{ background: "var(--gray-50)", paddingTop: 110, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Two-column layout on desktop */}
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: 64, alignItems: "center", marginBottom: 64 }}>
          {/* Left: text */}
          <FadeIn>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--blue-pale)", borderRadius: 100, padding: "8px 16px", marginBottom: 28 }}>
                <Zap size={14} color="var(--blue)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)", fontFamily: "Sora, sans-serif" }}>Capacitación presencial y consultoría aplicada en IA</span>
              </div>
              <h1 className="font-heading" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24 }}>
                Ahorra 1–2 horas al día<br />
                <span style={{ color: "var(--blue)" }}>por persona.</span><br />
                Con IA aplicada, no con teoría.
              </h1>
              <p style={{ fontSize: 18, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
                Capacitamos a tu equipo para que use inteligencia artificial en su trabajo real desde el primer día. Presencial, práctico y adaptado a tu empresa.
              </p>
              <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
                <a href="#contacto" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>Agenda un diagnóstico gratuito <ArrowRight size={18} /></a>
                <a href="#servicios" className="btn-secondary" style={{ fontSize: 16, padding: "16px 36px" }}>Conoce nuestros servicios</a>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
                {[
                  { icon: <Users size={16} />, text: "Equipos de 5 a 100 personas" },
                  { icon: <Target size={16} />, text: "100% aplicado a tu operación" },
                  { icon: <Clock size={16} />, text: "Resultados desde la primera sesión" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ color: "var(--blue)" }}>{item.icon}</div>
                    <span style={{ fontSize: 13, color: "var(--gray-600)", fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: visual — hidden on mobile */}
          <div className="hero-visual-col">
            <FadeIn delay={0.15}>
              <HeroVisual />
            </FadeIn>
          </div>
        </div>

        {/* Stats bar — full width below */}
        <FadeIn delay={0.25}>
          <div style={{ background: "var(--navy)", borderRadius: 20, padding: "36px 48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32 }}>
            {[
              { number: "1–2 hrs", label: "de ahorro por persona al día" },
              { number: "100%", label: "presencial y práctico" },
              { number: "Día 1", label: "resultados desde la primera sesión" },
              { number: "0%", label: "teoría innecesaria" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="font-heading" style={{ fontSize: 32, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>{s.number}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PROBLEM ─── */
function Problem() {
  const problems = [
    { icon: <MessageSquare size={24} />, title: "Uso superficial de IA", desc: "Tu equipo probó ChatGPT un par de veces, pero nadie lo usa de forma consistente ni productiva." },
    { icon: <Clock size={24} />, title: "Horas perdidas en lo repetitivo", desc: "Reportes, correos, análisis manuales... tareas que podrían tomar minutos siguen tomando horas." },
    { icon: <Search size={24} />, title: "No saben por dónde empezar", desc: "Hay interés en la IA, pero falta claridad sobre qué herramientas usar y en qué procesos aplicarlas." },
    { icon: <Shield size={24} />, title: "Resistencia al cambio", desc: "Sin una adopción guiada y práctica, el equipo no confía en las herramientas y vuelve a lo de siempre." },
  ];
  return (
    <section style={{ background: "white", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>El problema</div>
            <h2 className="section-title" style={{ maxWidth: 700, margin: "0 auto 16px" }}>La IA está aquí. Pero tu equipo todavía no la aprovecha.</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>La mayoría de las empresas saben que la inteligencia artificial puede ayudarles. El problema es que no tienen un camino claro para implementarla.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {problems.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card" style={{ height: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", color: "#DC2626", marginBottom: 20 }}>{p.icon}</div>
                <h3 className="font-heading" style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SOLUTION ─── */
function Solution() {
  return (
    <section style={{ background: "var(--gray-50)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <FadeIn>
            <div className="section-label" style={{ marginBottom: 12 }}>La solución</div>
            <h2 className="section-title" style={{ marginBottom: 20 }}>Implementamos IA en tu equipo de forma práctica, presencial y sin complicaciones.</h2>
            <p style={{ fontSize: 17, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 32 }}>Prodigio IA no es un curso online ni una conferencia motivacional. Somos una consultora que se sienta con tu equipo, entiende sus procesos y les enseña a usar IA en las tareas que realmente importan — con un objetivo claro: liberar horas en tu operación desde el primer día.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {["Capacitación presencial en las oficinas de tu empresa","Enfocada en los procesos reales de tu operación","Herramientas que tu equipo puede usar desde el día 1","Adaptada a personas que no son técnicas","Resultados medibles: menos tiempo en tareas repetitivas"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <CheckCircle2 size={20} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, color: "var(--gray-700)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background: "var(--navy)", borderRadius: 20, padding: "48px 40px", color: "white", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(59,130,246,0.15)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(59,130,246,0.1)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <Logo height={40} dark />
                <div style={{ marginTop: 28 }}>
                  <h3 className="font-heading" style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>Nuestro compromiso</h3>
                  <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.85, marginBottom: 32 }}>Que cada persona de tu equipo salga de la sesión sabiendo exactamente cómo usar IA para ahorrar tiempo en su trabajo diario.</p>
                </div>
                <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {[{ num: "90%", text: "práctica, 10% contexto" },{ num: "+5", text: "herramientas dominadas" },{ num: "1 día", text: "para ver resultados" },{ num: "100%", text: "personalizado" }].map((s, i) => (
                    <div key={i}>
                      <div className="font-heading" style={{ fontSize: 28, fontWeight: 800 }}>{s.num}</div>
                      <div style={{ fontSize: 13, opacity: 0.6, marginTop: 2 }}>{s.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── BENEFITS ─── */
function Benefits() {
  const items = [
    { icon: <Clock size={24} />, title: "Ahorro de tiempo real", desc: "Tu equipo recupera 1–2 horas diarias que hoy gasta en tareas operativas y repetitivas." },
    { icon: <BarChart3 size={24} />, title: "Mejor toma de decisiones", desc: "Con IA, tu equipo analiza datos, sintetiza información y genera insights más rápido." },
    { icon: <Layers size={24} />, title: "Calidad consistente", desc: "Reportes, correos, propuestas y documentos con mejor estructura y menor margen de error." },
    { icon: <UserCheck size={24} />, title: "Adopción real de tecnología", desc: "No solo capacitamos: logramos que tu equipo adopte las herramientas y las use en su día a día." },
    { icon: <TrendingUp size={24} />, title: "Equipo más productivo", desc: "Menos tiempo en lo operativo significa más tiempo para pensar, crear y vender." },
    { icon: <Lightbulb size={24} />, title: "Claridad sobre IA", desc: "Tu equipo entiende qué puede y qué no puede hacer la IA, sin falsas expectativas." },
  ];
  return (
    <section style={{ background: "white", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Beneficios</div>
            <h2 className="section-title" style={{ maxWidth: 600, margin: "0 auto" }}>Resultados que tu equipo nota desde la primera semana.</h2>
          </div>
        </FadeIn>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {items.map((b, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="card" style={{ display: "flex", gap: 20, height: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--blue-pale)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)", flexShrink: 0 }}>{b.icon}</div>
                <div>
                  <h3 className="font-heading" style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{b.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function Services() {
  return (
    <section id="servicios" style={{ background: "var(--gray-50)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Servicios</div>
            <h2 className="section-title" style={{ maxWidth: 600, margin: "0 auto 16px" }}>Dos formas de empezar a trabajar con nosotros.</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Elige el formato que mejor se adapte a las necesidades de tu empresa.</p>
          </div>
        </FadeIn>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 32 }}>
          <FadeIn delay={0}>
            <div style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "2px solid var(--blue)", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "var(--blue)", padding: "16px 32px", display: "flex", alignItems: "center", gap: 8 }}>
                <Rocket size={18} color="white" />
                <span className="font-heading" style={{ color: "white", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase" }}>Más popular</span>
              </div>
              <div style={{ padding: "36px 36px 40px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 6, letterSpacing: "-0.02em" }}>Bootcamp de Productividad Ejecutiva con IA</h3>
                <div style={{ marginBottom: 16 }}>
                  <span className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "var(--blue)" }}>Desde $15,000 MXN</span>
                  <span style={{ fontSize: 13, color: "var(--gray-500)", marginLeft: 8 }}>presencial en tus oficinas</span>
                </div>
                <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.6, marginBottom: 24 }}>Sesión presencial intensiva donde tu equipo aprende a usar IA para resolver sus tareas reales. Cero teoría, pura aplicación.</p>
                <div style={{ marginBottom: 20 }}>
                  <div className="font-heading" style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Para quién es</div>
                  <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.6 }}>Directivos, gerentes y equipos de ventas, marketing, operaciones y administración que quieren ser más productivos con IA.</p>
                </div>
                <div style={{ marginBottom: 20, flex: 1 }}>
                  <div className="font-heading" style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Qué incluye</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Sesión presencial en tus oficinas (3–6 horas)","Prompts personalizados para cada área","Ejercicios con casos reales de tu empresa","Kit de herramientas y recursos post-sesión","Automatización mental y flujos de trabajo con IA","Seguimiento posterior para resolver dudas"].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontSize: 14, color: "var(--gray-600)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "var(--blue-pale)", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                  <div className="font-heading" style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Resultado</div>
                  <p style={{ fontSize: 15, color: "var(--navy)", fontWeight: 500 }}>Tu equipo sale usando IA en su trabajo diario, con herramientas y prompts listos para aplicar desde el día siguiente.</p>
                </div>
                <a href="#contacto" className="btn-primary" style={{ justifyContent: "center", width: "100%" }}>Solicitar información <ArrowRight size={16} /></a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "1px solid var(--gray-200)", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "var(--navy)", padding: "16px 32px", display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={18} color="white" />
                <span className="font-heading" style={{ color: "white", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase" }}>Solo 1–2 horas · Sin compromiso</span>
              </div>
              <div style={{ padding: "36px 36px 40px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 6, letterSpacing: "-0.02em" }}>Consultoría Express en IA</h3>
                <div style={{ marginBottom: 16 }}>
                  <span className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "var(--blue)" }}>$4,500 MXN</span>
                  <span style={{ fontSize: 13, color: "var(--gray-500)", marginLeft: 8 }}>diagnóstico + reporte + plan accionable</span>
                </div>
                <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.6, marginBottom: 20 }}>¿No sabes si la IA es para tu empresa o por dónde empezar? En una sesión de 1–2 horas te entregamos un plan concreto y accionable. Sin teoría, sin compromiso.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {[
                    { icon: <Clock size={13} />, text: "1–2 horas" },
                    { icon: <CheckCircle2 size={13} />, text: "Plan en mano el mismo día" },
                    { icon: <Shield size={13} />, text: "Sin compromiso" },
                  ].map((tag, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--gray-50)", border: "1px solid var(--gray-200)", borderRadius: 100, padding: "5px 12px" }}>
                      <span style={{ color: "var(--blue)" }}>{tag.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-700)", fontFamily: "'Sora', sans-serif" }}>{tag.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div className="font-heading" style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Para quién es</div>
                  <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.6 }}>Directivos y dueños de negocio que aún no están seguros de si la IA aplica a su operación — o que quieren un punto de partida claro antes de comprometerse con una capacitación.</p>
                </div>
                <div style={{ marginBottom: 20, flex: 1 }}>
                  <div className="font-heading" style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Qué sale de la sesión</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Mapa de tus procesos con mayor potencial de automatización","Herramientas de IA recomendadas para tu tipo de negocio","Prioridades ordenadas por impacto y facilidad de implementación","Recomendaciones concretas listas para ejecutar"].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontSize: 14, color: "var(--gray-600)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                  <div className="font-heading" style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Al terminar la sesión</div>
                  <p style={{ fontSize: 15, color: "var(--navy)", fontWeight: 600, lineHeight: 1.5 }}>Sales con un plan accionable en la mano — no con promesas. Decides si quieres avanzar con una capacitación o no. Sin presión.</p>
                </div>
                <a href="#contacto" className="btn-primary" style={{ justifyContent: "center", width: "100%" }}>Agendar mi diagnóstico gratuito <ArrowRight size={16} /></a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
function Projects() {
  const items = [
    {
      icon: <BarChart3 size={24} />,
      title: "Dashboards y reportes automáticos",
      desc: "Tableros personalizados que consolidan datos de tu operación y generan reportes sin intervención manual — listos para revisar cada lunes.",
      tag: "Ahorra 3–5 hrs / semana",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Asistentes internos con IA",
      desc: "Chatbots entrenados con la información de tu empresa: manuales, procesos, precios, FAQs. Tu equipo obtiene respuestas precisas en segundos, sin interrumpir a nadie.",
      tag: "Respuestas instantáneas 24/7",
    },
    {
      icon: <Zap size={24} />,
      title: "Automatizaciones de proceso",
      desc: "Flujos de trabajo que eliminan captura manual, conectan tus herramientas y ejecutan tareas repetitivas sin intervención humana. Menos errores, más velocidad.",
      tag: "Elimina trabajo manual",
    },
    {
      icon: <Rocket size={24} />,
      title: "Apps web a la medida",
      desc: "Aplicaciones web funcionales construidas en días, no meses. Sistemas de cotización, portales de clientes, herramientas internas — adaptadas exactamente a tu operación.",
      tag: "De idea a producción en días",
    },
  ];

  return (
    <section id="proyectos" style={{ background: "white", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Desarrollo con IA</div>
            <h2 className="section-title" style={{ maxWidth: 700, margin: "0 auto 16px" }}>
              También construimos herramientas que liberan horas en tu operación.
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Más allá de la capacitación, desarrollamos soluciones a la medida: desde dashboards y automatizaciones hasta apps web completas. Todas construidas con IA para que tu equipo deje de hacer lo que no debería hacer a mano.
            </p>
          </div>
        </FadeIn>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--blue-pale)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="font-heading" style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--blue-pale)", borderRadius: 100, padding: "5px 14px", alignSelf: "flex-start" }}>
                  <CheckCircle2 size={13} color="var(--blue)" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", fontFamily: "'Sora', sans-serif" }}>{item.tag}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <p style={{ fontSize: 16, color: "var(--gray-600)", marginBottom: 24 }}>
              ¿Tienes un proceso que quieres automatizar o una herramienta que necesitas construir?
            </p>
            <a href="#contacto" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
              Cuéntanos qué necesitas <ArrowRight size={18} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PROCESS ─── */
function Process() {
  const steps = [
    { icon: <Phone size={22} />, num: "01", title: "Conversación inicial", desc: "Entendemos tu empresa, tus procesos y los retos de tu equipo en una llamada breve." },
    { icon: <Search size={22} />, num: "02", title: "Diagnóstico", desc: "Identificamos las áreas donde la IA puede generar mayor impacto en tu operación." },
    { icon: <Wrench size={22} />, num: "03", title: "Diseño de sesión", desc: "Personalizamos el contenido, los ejercicios y las herramientas para tu equipo." },
    { icon: <Rocket size={22} />, num: "04", title: "Capacitación presencial", desc: "Sesión práctica en tus oficinas. Tu equipo usa IA en tareas reales desde el minuto uno." },
    { icon: <TrendingUp size={22} />, num: "05", title: "Seguimiento y evolución", desc: "Acompañamiento posterior para resolver dudas y escalar la adopción de IA en tu empresa." },
  ];
  return (
    <section id="proceso" style={{ background: "white", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Proceso</div>
            <h2 className="section-title" style={{ maxWidth: 600, margin: "0 auto 16px" }}>Cómo trabajamos contigo.</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Un proceso simple, claro y enfocado en darte resultados desde el inicio.</p>
          </div>
        </FadeIn>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ display: "flex", gap: 24, paddingBottom: i < steps.length - 1 ? 40 : 0, alignItems: "flex-start", position: "relative" }}>
                {i < steps.length - 1 && <div style={{ position: "absolute", left: 27, top: 56, bottom: 0, width: 2, background: "var(--gray-100)" }} />}
                <div style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0, background: i === 3 ? "var(--blue)" : "var(--blue-pale)", display: "flex", alignItems: "center", justifyContent: "center", color: i === 3 ? "white" : "var(--blue)", position: "relative", zIndex: 1 }}>{s.icon}</div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <span className="font-heading" style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.08em" }}>{s.num}</span>
                    <h3 className="font-heading" style={{ fontSize: 19, fontWeight: 700, color: "var(--navy)" }}>{s.title}</h3>
                  </div>
                  <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── USE CASES ─── */
function UseCases() {
  const cases = [
    { area: "Ventas", icon: <TrendingUp size={22} />, examples: ["Generar propuestas comerciales en minutos con IA","Personalizar correos de seguimiento automáticamente","Analizar objeciones frecuentes y preparar respuestas","Crear presentaciones de ventas más rápido"] },
    { area: "Marketing", icon: <MessageSquare size={22} />, examples: ["Crear contenido para redes sociales en fracción del tiempo","Redactar copies para campañas de email y ads","Generar ideas de contenido basadas en tendencias","Analizar métricas y reportes con resúmenes automáticos"] },
    { area: "Administración", icon: <Briefcase size={22} />, examples: ["Resumir documentos largos en segundos","Redactar minutas, actas y reportes internos","Organizar y clasificar información de forma automática","Crear templates reutilizables para procesos recurrentes"] },
    { area: "Operaciones", icon: <Wrench size={22} />, examples: ["Automatizar reportes diarios y semanales","Analizar datos operativos para detectar patrones","Crear checklists y SOPs con IA","Optimizar procesos de seguimiento y control"] },
    { area: "Dirección", icon: <Brain size={22} />, examples: ["Analizar información estratégica más rápido","Preparar presentaciones ejecutivas en menos tiempo","Sintetizar reportes de múltiples áreas","Tomar decisiones mejor informadas con análisis de IA"] },
  ];
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: "var(--gray-50)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Casos de uso</div>
            <h2 className="section-title" style={{ maxWidth: 650, margin: "0 auto 16px" }}>IA aplicada a cada área de tu empresa.</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Estos son ejemplos reales de cómo capacitamos a equipos para usar IA en su trabajo diario.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 40 }}>
            {cases.map((c, i) => (
              <button key={i} onClick={() => setActive(i)} className="font-heading" style={{ padding: "10px 24px", borderRadius: 100, border: "none", cursor: "pointer", background: active === i ? "var(--blue)" : "white", color: active === i ? "white" : "var(--gray-600)", fontSize: 14, fontWeight: 600, transition: "all 0.2s", boxShadow: active === i ? "0 4px 16px rgba(29,78,216,0.2)" : "0 1px 4px rgba(0,0,0,0.06)" }}>{c.area}</button>
            ))}
          </div>
          <div className="card" style={{ maxWidth: 640, margin: "0 auto", padding: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-pale)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)" }}>{cases[active].icon}</div>
              <h3 className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)" }}>{cases[active].area}</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cases[active].examples.map((ex, i) => (
                <div key={`${active}-${i}`} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <ChevronRight size={18} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, color: "var(--gray-700)", lineHeight: 1.5 }}>{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── DIFFERENTIATORS ─── */
function Differentiators() {
  const rows = [
    { feature: "Formato", us: "Presencial en tus oficinas", them: "Curso grabado o webinar" },
    { feature: "Contenido", us: "Adaptado a tu empresa", them: "Temario genérico para todos" },
    { feature: "Enfoque", us: "90% práctica, 10% contexto", them: "80% teoría, 20% demos" },
    { feature: "Participantes", us: "Tu equipo real, juntos", them: "Individuos desconectados" },
    { feature: "Resultado", us: "Herramientas listas para usar", them: "Certificado y nada más" },
    { feature: "Seguimiento", us: "Acompañamiento post-sesión", them: "Se acabó el soporte" },
    { feature: "Nivel", us: "Para cualquier persona", them: "Requiere bases técnicas" },
  ];
  return (
    <section id="diferenciadores" style={{ background: "white", padding: "96px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>¿Por qué Prodigio IA?</div>
            <h2 className="section-title" style={{ maxWidth: 600, margin: "0 auto 16px" }}>No somos un curso más. Somos tu aliado en la adopción de IA.</h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="diff-table" style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--gray-200)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", background: "var(--navy)", padding: "16px 24px" }}>
              <span></span>
              <span className="font-heading" style={{ fontSize: 13, fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>Prodigio IA</span>
              <span className="font-heading" style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>Cursos genéricos</span>
            </div>
            {rows.map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", padding: "14px 24px", background: i % 2 === 0 ? "white" : "var(--gray-50)", borderBottom: i < rows.length - 1 ? "1px solid var(--gray-100)" : "none", alignItems: "center" }}>
                <span className="font-heading" style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>{r.feature}</span>
                <span style={{ fontSize: 14, color: "var(--blue)", fontWeight: 600, textAlign: "center" }}>{r.us}</span>
                <span style={{ fontSize: 14, color: "var(--gray-400)", textAlign: "center" }}>{r.them}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  {
    name: "Andrea Catalina Cantú Barbosa",
    role: "Abogada",
    company: "DECSA",
    quote: "Lo que antes me tomaba horas de lectura y síntesis ahora lo resuelvo en minutos. La capacitación fue directa al grano, sin teoría innecesaria.",
    stars: 10,
    score: 10,
    metric: "-85% de tiempo en síntesis",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    name: "Eduardo Alejandro González Nieves",
    role: "Arquitecto",
    company: "DECSA",
    quote: "Mis presentaciones ahora tienen otro nivel y las preparo en una fracción del tiempo. Nunca pensé que la IA podía aplicarse tan bien a mi trabajo.",
    stars: 9,
    score: 9,
    metric: "-66% en tiempo de presentaciones",
    color: "#06B6D4",
    bg: "#ECFEFF",
  },
  {
    name: "Claudio Picazo Landeros",
    role: "Supervisor",
    company: "DECSA",
    quote: "Llegué escéptico y salí usando IA ese mismo día. El enfoque práctico hace toda la diferencia — aprendes haciendo, no escuchando.",
    stars: 10,
    score: 10,
    metric: "Adoptó IA en 24 horas",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    name: "Bernardo Molina",
    role: "Administrador",
    company: "Grupo Imagen",
    quote: "Mis análisis ahora van mucho más a fondo en el mismo tiempo. Prodigio IA no solo enseña herramientas — cambia la forma en que piensas tu trabajo.",
    stars: 9,
    score: 9,
    metric: "+25% en profundidad de análisis",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
      ))}
    </div>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 250);
  };

  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((active + 1) % TESTIMONIALS.length);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % TESTIMONIALS.length);
        setAnimating(false);
      }, 250);
    }, 7000);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = TESTIMONIALS[active];
  const initials = t.name.split(" ").slice(0, 2).map((w) => w[0]).join("");

  return (
    <section style={{ background: "var(--gray-50)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Testimonios</div>
            <h2 className="section-title" style={{ maxWidth: 600, margin: "0 auto 16px" }}>
              Lo que dicen quienes ya trabajan con IA.
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Resultados reales de equipos reales.
            </p>
          </div>
        </FadeIn>

        {/* Card */}
        <div style={{ maxWidth: 760, margin: "0 auto 40px" }}>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              border: "1px solid var(--gray-200)",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {/* Color bar */}
            <div style={{ height: 5, background: t.color }} />

            <div className="testimonial-card" style={{ padding: "36px 40px 40px" }}>
              {/* Top row: avatar + name + stars */}
              <div className="testimonial-top" style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 28 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: t.bg, border: `2px solid ${t.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: t.color, fontFamily: "'Sora', sans-serif" }}>
                    {initials}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="font-heading" style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 2 }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 8 }}>
                    {t.role} · <span style={{ fontWeight: 600, color: "var(--gray-700)" }}>{t.company}</span>
                  </div>
                  <Stars count={t.stars} />
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div className="font-heading" style={{ fontSize: 26, fontWeight: 800, color: "var(--navy)", lineHeight: 1 }}>
                    {t.score}<span style={{ fontSize: 14, color: "var(--gray-400)", fontWeight: 500 }}>/10</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--gray-400)", fontFamily: "'Sora', sans-serif", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 2 }}>
                    Recomendación
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p style={{
                fontSize: 18, color: "var(--gray-700)", lineHeight: 1.7,
                fontStyle: "italic", marginBottom: 24,
                borderLeft: `3px solid ${t.color}`, paddingLeft: 20,
              }}>
                "{t.quote}"
              </p>

              {/* Metric */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "var(--blue-pale)", border: "1px solid #BFDBFE",
                borderRadius: 10, padding: "10px 18px",
              }}>
                <BarChart3 size={16} color="var(--blue)" />
                <span className="font-heading" style={{ fontSize: 14, fontWeight: 700, color: "var(--blue)" }}>
                  {t.metric}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 24 }}>
            <button
              onClick={prev}
              aria-label="Testimonio anterior"
              style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--gray-200)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.color = "inherit"; }}
            >
              <ChevronLeft size={18} />
            </button>

            <div style={{ display: "flex", gap: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ver testimonio ${i + 1} de ${TESTIMONIALS.length}`}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === active ? 24 : 8, height: 8,
                    borderRadius: 4, border: "none", cursor: "pointer",
                    background: i === active ? "var(--blue)" : "var(--gray-200)",
                    transition: "all 0.3s ease", padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Testimonio siguiente"
              style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--gray-200)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.color = "inherit"; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.1}>
          <div className="stats-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            background: "var(--navy)", borderRadius: 16, padding: "28px 40px",
            maxWidth: 760, margin: "0 auto", gap: 24,
          }}>
            {[
              { number: "9.5/10", label: "Satisfacción promedio" },
              { number: "100%", label: "Adoptó IA en 24 horas" },
              { number: "6", label: "Empresas capacitadas" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="font-heading" style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                  {s.number}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function FinalCTA() {
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", telefono: "", servicio: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      const res = await fetch("https://formspree.io/f/mreogkvp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setEnviado(true);
      } else {
        setError("Hubo un problema al enviar. Intenta de nuevo o escríbenos a jrgutierrez@prodigioia.com");
      }
    } catch {
      setError("No se pudo conectar. Verifica tu conexión e intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 10, border: "1px solid var(--gray-200)",
    fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", background: "white",
    color: "var(--navy)", transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: 6,
    display: "block", fontFamily: "'Sora', sans-serif", letterSpacing: "0.02em", textAlign: "left",
  };

  return (
    <section id="contacto" style={{ background: "var(--navy)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ marginBottom: 24 }}>
              <Logo height={48} dark />
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.15)", borderRadius: 100, padding: "8px 16px", marginBottom: 24 }}>
              <CalendarCheck size={14} color="var(--blue-light)" />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--blue-light)", fontFamily: "Sora, sans-serif" }}>Sin compromiso · 100% gratuito</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16 }}>¿Listo para que tu equipo<br />trabaje con IA de verdad?</h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>Completa el formulario y nos pondremos en contacto en menos de 24 horas para agendar tu diagnóstico gratuito.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {!enviado ? (
            <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "40px 36px", maxWidth: 640, margin: "0 auto", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="mobile-stack">
                <div>
                  <label htmlFor="f-nombre" style={labelStyle}>Nombre completo</label>
                  <input name="nombre" id="f-nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" style={inputStyle} required />
                </div>
                <div>
                  <label htmlFor="f-empresa" style={labelStyle}>Empresa</label>
                  <input name="empresa" id="f-empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" style={inputStyle} required />
                </div>
                <div>
                  <label htmlFor="f-email" style={labelStyle}>Correo electrónico</label>
                  <input name="email" id="f-email" type="email" value={form.email} onChange={handleChange} placeholder="correo@empresa.com" style={inputStyle} required />
                </div>
                <div>
                  <label htmlFor="f-telefono" style={labelStyle}>Teléfono</label>
                  <input name="telefono" id="f-telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="+52 81 1234 5678" style={inputStyle} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="f-servicio" style={labelStyle}>Servicio de interés</label>
                  <select name="servicio" id="f-servicio" value={form.servicio} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}>
                    <option value="">Selecciona una opción</option>
                    <option value="Bootcamp de Productividad Ejecutiva con IA">Bootcamp de Productividad Ejecutiva con IA</option>
                    <option value="Consultoría Express en IA">Consultoría Express en IA</option>
                    <option value="Desarrollo de herramienta o app con IA">Desarrollo de herramienta o app con IA</option>
                    <option value="Ambos / No estoy seguro">Ambos / No estoy seguro</option>
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="f-mensaje" style={labelStyle}>Mensaje (opcional)</label>
                  <textarea name="mensaje" id="f-mensaje" value={form.mensaje} onChange={handleChange} placeholder="Cuéntanos brevemente sobre tu empresa o qué necesitas..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <button
                  type="submit"
                  disabled={enviando}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "18px 40px", opacity: enviando ? 0.7 : 1 }}
                >
                  {enviando ? "Enviando..." : <>Solicitar diagnóstico gratuito <ArrowRight size={18} /></>}
                </button>
                {error && (
                  <p style={{ fontSize: 13, color: "#f87171", textAlign: "center", marginTop: 8 }}>{error}</p>
                )}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", marginTop: 24 }}>
                {["Sin costo","Respuesta en menos de 24 hrs","Sin compromiso"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle2 size={14} color="var(--blue-light)" />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 24px" }}>
              <CheckCircle2 size={56} color="var(--blue-light)" style={{ marginBottom: 20 }} />
              <h3 className="font-heading" style={{ fontSize: 28, fontWeight: 700, color: "white", marginBottom: 12 }}>¡Gracias por tu interés!</h3>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: "0 auto" }}>Se abrió tu cliente de correo con la información. Si no se abrió, escríbenos directamente a <strong style={{ color: "white" }}>jrgutierrez@prodigioia.com</strong></p>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: "var(--gray-900)", padding: "48px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <Logo height={28} dark />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={14} color="var(--gray-400)" />
            <span style={{ fontSize: 13, color: "var(--gray-400)" }}>Monterrey, México</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Mail size={14} color="var(--gray-400)" />
            <span style={{ fontSize: 13, color: "var(--gray-400)" }}>jrgutierrez@prodigioia.com</span>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "var(--gray-500)", width: "100%", textAlign: "center", marginTop: 16 }}>© {new Date().getFullYear()} Prodigio IA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

/* ─── WHATSAPP FLOATING BUTTON ─── */
function WhatsAppButton() {
  const [hover, setHover] = useState(false);
  const waLink = "https://wa.me/528119776346?text=" + encodeURIComponent("Hola, me interesa conocer más sobre los servicios de Prodigio IA.");

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Escríbenos por WhatsApp"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 999,
        width: hover ? "auto" : 60,
        height: 60,
        borderRadius: 30,
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: hover ? 10 : 0,
        paddingLeft: hover ? 20 : 0,
        paddingRight: hover ? 20 : 0,
        boxShadow: hover
          ? "0 8px 28px rgba(37,211,102,0.45)"
          : "0 4px 16px rgba(37,211,102,0.35)",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.3s ease",
        transform: hover ? "scale(1.05)" : "scale(1)",
      }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="white" style={{ flexShrink: 0 }}>
        <path d="M16.002 3.2A12.798 12.798 0 0 0 3.6 19.536L2 30l10.736-1.568A12.8 12.8 0 1 0 16.002 3.2Zm0 23.36a10.544 10.544 0 0 1-5.376-1.472l-.384-.224-4 1.056 1.072-3.904-.256-.4A10.56 10.56 0 1 1 16.002 26.56Zm5.792-7.904c-.32-.16-1.872-.928-2.16-1.024-.288-.112-.496-.16-.704.16s-.816 1.024-.992 1.232c-.192.208-.368.224-.688.08a8.632 8.632 0 0 1-2.56-1.584 9.62 9.62 0 0 1-1.776-2.208c-.192-.32 0-.48.144-.64.128-.128.288-.336.432-.496.144-.176.192-.288.288-.496.096-.192.048-.368-.032-.512-.08-.16-.704-1.696-.96-2.32-.256-.608-.512-.528-.704-.528h-.592a1.152 1.152 0 0 0-.832.384 3.488 3.488 0 0 0-1.088 2.592 6.064 6.064 0 0 0 1.264 3.216 13.856 13.856 0 0 0 5.312 4.688c.736.32 1.312.512 1.76.656a4.24 4.24 0 0 0 1.952.128c.592-.096 1.872-.768 2.144-1.504.256-.752.256-1.392.176-1.52-.064-.144-.272-.224-.576-.384Z"/>
      </svg>
      {hover && (
        <span style={{
          color: "white",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'Sora', sans-serif",
          whiteSpace: "nowrap",
          letterSpacing: "-0.01em",
        }}>
          Escríbenos
        </span>
      )}
    </a>
  );
}

/* ─── MAIN APP ─── */
export default function ProdigioLanding() {
  return (
    <div style={{ minHeight: "100vh", background: "white", overflow: "hidden" }}>
      {globalStyles}
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Benefits />
      <Services />
      <Projects />
      <Process />
      <UseCases />
      <Differentiators />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
