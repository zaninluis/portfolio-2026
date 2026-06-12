import { useState, useEffect, useRef } from "react";
import { profile, areas, experience, education, projects, ui } from "./data";

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- Chuva de dados (matrix rain) em canvas ----
function DataRain() {
  const ref = useRef(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const glyphs = "01アイウエオカキクケコサシスセソタチツテト<>/{}[]=+*#$";
    let cols, drops, raf;
    const fontSize = 14;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * -canvas.height / fontSize)
      );
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 38) return; // ~26fps: fluido e ainda leve
      last = ts;
      ctx.fillStyle = "rgba(6, 9, 13, 0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < cols; i++) {
        const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // cabeça mais clara, rastro some pelo fade do fillRect
        ctx.fillStyle = Math.random() > 0.93 ? "#9ffff0" : "rgba(20, 210, 200, 0.75)";
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.985) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return <canvas ref={ref} className="fx-rain" aria-hidden="true" />;
}

// ---- Efeito de decodificação (scramble) no texto ----
function Decode({ text, className, ...rest }) {
  const [out, setOut] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#01";
  useEffect(() => {
    if (reducedMotion()) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf;
    const total = text.length * 3 + 12;
    const tick = () => {
      frame++;
      const settled = Math.floor((frame / total) * text.length * 1.4);
      setOut(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < settled) return c;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (settled < text.length) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return (
    <span className={className} {...rest}>
      {out}
    </span>
  );
}

// ---- Typewriter ciclando os papéis ----
function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reducedMotion()) {
      setTxt(words[0]);
      return;
    }
    const word = words[i % words.length];
    const speed = del ? 32 : 64;
    const timer = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, txt.length + 1);
        setTxt(next);
        if (next === word) setTimeout(() => setDel(true), 1600);
      } else {
        const next = word.slice(0, txt.length - 1);
        setTxt(next);
        if (next === "") {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [txt, del, i, words]);
  return (
    <span className="typewriter">
      {txt}
      <span className="caret" aria-hidden="true" />
    </span>
  );
}

// ---- Ticker infinito de skills ----
function SkillTicker() {
  const items = areas.flatMap((a) => a.skills);
  const row = [...items, ...items]; // duplica p/ loop contínuo
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {row.map((s, idx) => (
          <span className="ticker-item" key={idx}>
            {s} <i className="tick-sep">◆</i>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---- Sequência de boot (terminal) ----
const BOOT_LINES = [
  "> INITIALIZING ZANIN-OS v2.0.26 ...",
  "> MOUNTING /dev/skills ............ OK",
  "> FRONT-END MODULE ................ OK",
  "> BACK-END MODULE ................. OK",
  "> QA TEST SUITE ................... OK",
  "> ACCESS GRANTED_",
];

function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [exit, setExit] = useState(false);
  useEffect(() => {
    if (reducedMotion()) {
      onDone();
      return;
    }
    let i = 0;
    const add = setInterval(() => {
      i++;
      setLines(BOOT_LINES.slice(0, i));
      if (i >= BOOT_LINES.length) {
        clearInterval(add);
        setTimeout(() => setExit(true), 420);
        setTimeout(onDone, 900);
      }
    }, 150);
    return () => clearInterval(add);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`boot ${exit ? "boot-exit" : ""}`}
      onClick={() => {
        setExit(true);
        setTimeout(onDone, 300);
      }}
    >
      <div className="boot-term">
        {lines.map((l, idx) => (
          <div
            className={`boot-line ${idx === BOOT_LINES.length - 1 ? "boot-granted" : ""}`}
            key={idx}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Cursor de mira neon ----
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor-fx");
    const dot = dotRef.current;
    const ring = ringRef.current;
    let x = -100, y = -100, rx = -100, ry = -100, raf;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e) => {
      if (e.target.closest("a, button, .btn")) ring.classList.add("cursor-hot");
      else ring.classList.remove("cursor-hot");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("has-cursor-fx");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

// ---- Tilt 3D nos cards ----
function useTilt(deps = []) {
  useEffect(() => {
    if (reducedMotion()) return;
    const cards = document.querySelectorAll(".area-card, .project-card");
    const onMove = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${py * -7}deg) rotateY(${px * 9}deg) translateY(-6px)`;
      el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
    };
    const onLeave = (e) => {
      e.currentTarget.style.transform = "";
    };
    cards.forEach((c) => {
      c.addEventListener("mousemove", onMove);
      c.addEventListener("mouseleave", onLeave);
    });
    return () =>
      cards.forEach((c) => {
        c.removeEventListener("mousemove", onMove);
        c.removeEventListener("mouseleave", onLeave);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Revela elementos com a classe .reveal conforme entram na viewport
function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const reveal = (el) => el.classList.add("visible");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => {
      // Revela imediatamente o que já está visível na carga (acima da dobra)
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) reveal(el);
      else obs.observe(el);
    });
    // Rede de segurança: nada fica escondido se o observer não disparar
    const safety = setTimeout(() => els.forEach(reveal), 1500);
    return () => {
      obs.disconnect();
      clearTimeout(safety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default function App() {
  const [lang, setLang] = useState("pt");
  const [booted, setBooted] = useState(false);
  const t = (obj) => (obj && obj[lang] !== undefined ? obj[lang] : obj);
  useScrollReveal([lang, booted]);
  useTilt([lang, booted]);

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;

  return (
    <>
      <Cursor />
      <div className="fx-grid" aria-hidden="true" />
      <DataRain />
      <div className="fx-glow" aria-hidden="true" />
      <div className="fx-scanlines" aria-hidden="true" />
      <div className="fx-vignette" aria-hidden="true" />
      <Nav lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} lang={lang} />
        <SkillTicker />
        <Areas t={t} />
        <Experience t={t} />
        <Projects lang={lang} t={t} />
        <Contact t={t} />
      </main>
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} {profile.fullName} · {t(ui.footer)}
        </div>
      </footer>
    </>
  );
}

function Nav({ lang, setLang, t }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#top" className="nav-logo">
          {profile.name}
          <span className="dot">.</span>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#areas">
            {t(ui.nav.skills)}
          </a>
          <a className="nav-link" href="#experience">
            {t(ui.nav.experience)}
          </a>
          <a className="nav-link" href="#projects">
            {t(ui.nav.projects)}
          </a>
          <a className="nav-link" href="#contact">
            {t(ui.nav.contact)}
          </a>
          <div className="lang-toggle" role="group" aria-label="Idioma">
            <button
              className={lang === "pt" ? "active" : ""}
              onClick={() => setLang("pt")}
            >
              PT
            </button>
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero({ t, lang }) {
  const roleWords =
    lang === "pt"
      ? ["Desenvolvedor Front-end", "Desenvolvedor Back-end", "Quality Assurance"]
      : ["Front-end Developer", "Back-end Developer", "Quality Assurance"];
  return (
    <header id="top" className="hero">
      <div className="container reveal">
        <span className="hero-badge">
          <span className="pulse" />
          {t({ pt: "Disponível para novas vagas", en: "Available for new roles" })}
        </span>
        <h1>
          {t({ pt: "Olá, eu sou ", en: "Hi, I'm " })}
          <span className="accent glitch" data-text={profile.name}>
            <Decode text={profile.name} key={lang} />
          </span>
        </h1>
        <p className="role">
          <Typewriter words={roleWords} key={lang} />
        </p>
        <p className="bio">{t(profile.bio)}</p>
        <p className="location">{t(profile.location)}</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#projects">
            {t(ui.hero.cta)}
          </a>
          <a className="btn btn-ghost" href="#contact">
            {t(ui.hero.contact)}
          </a>
          <a className="btn btn-ghost" href={t(profile.cv)} download>
            ⬇ {t(ui.hero.cv)}
          </a>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({ text }) {
  const words = text.split(" ");
  return (
    <h2 className="section-title">
      {words.slice(0, -1).join(" ")}{" "}
      <span className="accent">{words.slice(-1)}</span>
    </h2>
  );
}

function Areas({ t }) {
  return (
    <section id="areas">
      <div className="container reveal">
        <p className="eyebrow">{t(ui.nav.skills)}</p>
        <SectionTitle text={t(ui.sections.skills)} />
        <div className="areas-grid">
          {areas.map((area) => (
            <article className="area-card" key={area.id}>
              <div className="icon">{area.icon}</div>
              <h3>{t(area.title)}</h3>
              <p>{t(area.description)}</p>
              <div className="chips">
                {area.skills.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ t }) {
  return (
    <section id="experience">
      <div className="container reveal">
        <p className="eyebrow">{t(ui.nav.experience)}</p>
        <SectionTitle text={t(ui.sections.experience)} />
        <div className="timeline">
          {experience.map((job, i) => (
            <article className="timeline-item" key={i}>
              <div className="timeline-period">{job.period}</div>
              <div className="timeline-body">
                <h3>
                  {t(job.role)} <span className="at">· {job.company}</span>
                </h3>
                <p>{t(job.description)}</p>
              </div>
            </article>
          ))}
        </div>

        <h3 className="edu-title">{t(ui.sections.education)}</h3>
        <div className="edu-grid">
          {education.map((ed, i) => (
            <div className="edu-card" key={i}>
              <div className="edu-period">{ed.period}</div>
              <h4>{t(ed.title)}</h4>
              <p>
                {ed.place}
                {t(ed.note) ? ` · ${t(ed.note)}` : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ lang, t }) {
  const areaLabel = (ids) =>
    ids
      .map((id) => {
        const a = areas.find((x) => x.id === id);
        return a ? t(a.title) : id;
      })
      .join(" · ");

  return (
    <section id="projects">
      <div className="container reveal">
        <p className="eyebrow">{t(ui.nav.projects)}</p>
        <SectionTitle text={t(ui.sections.projects)} />
        <div className="projects-grid">
          {projects.map((p) => (
            <article className="project-card" key={p.title}>
              <span className="badge">{areaLabel(p.area)}</span>
              <h3>{p.title}</h3>
              <p>{t(p.description)}</p>
              <div className="chips" style={{ marginBottom: "16px" }}>
                {p.tags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {(p.repo || p.demo) && (
                <div className="project-links">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer">
                      {lang === "pt" ? "Código →" : "Code →"}
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer">
                      Demo →
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  return (
    <section id="contact" className="contact">
      <div className="container reveal">
        <p className="eyebrow">{t(ui.nav.contact)}</p>
        <SectionTitle text={t(ui.sections.contact)} />
        <div className="contact-card">
        <p className="lead">{t(ui.contact.text)}</p>
        <div className="contact-links">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            ✉ {profile.email}
          </a>
          <a
            className="btn btn-ghost"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn-ghost"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a className="btn btn-ghost" href={t(profile.cv)} download>
            ⬇ {t(ui.hero.cv)}
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
