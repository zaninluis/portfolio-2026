import { useState, useEffect, useRef } from "react";
import { profile, areas, experience, education, projects, ui } from "./data";

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
  const t = (obj) => (obj && obj[lang] !== undefined ? obj[lang] : obj);
  useScrollReveal([lang]);

  return (
    <>
      <div className="fx-grid" aria-hidden="true" />
      <div className="fx-glow" aria-hidden="true" />
      <div className="fx-scanlines" aria-hidden="true" />
      <Nav lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
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

function Hero({ t }) {
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
            {profile.name}
          </span>
        </h1>
        <p className="role">{t(profile.role)}</p>
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
