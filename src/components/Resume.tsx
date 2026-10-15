"use client";

import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";
import ProjectGallery from "@/components/ProjectGallery";
import {
  education,
  experience,
  profile,
  skills,
  ui,
  type Lang,
} from "@/data/resume";

const careerStart = new Date(2023, 9, 12);

function yearsSince(date: Date) {
  const ms = Date.now() - date.getTime();
  return Math.max(1, Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000)));
}

// Language preference lives in localStorage so it survives reloads. Thai is the default.
const langListeners = new Set<() => void>();

function subscribeLang(cb: () => void) {
  langListeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    langListeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function readLang(): Lang {
  try {
    return window.localStorage.getItem("lang") === "en" ? "en" : "th";
  } catch {
    return "th";
  }
}

function setLang(lang: Lang) {
  try {
    window.localStorage.setItem("lang", lang);
  } catch {}
  langListeners.forEach((cb) => cb());
}

const noopSubscribe = () => () => {};

const icons = {
  phone: (
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  ),
  mail: (
    <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.4l8 5 8-5V7H4zm16 2.75-7.47 4.67a1 1 0 0 1-1.06 0L4 9.75V17h16V9.75z" />
  ),
  download: (
    <path d="M11 4h2v8.6l3.3-3.3 1.4 1.4L12 16.4l-5.7-5.7 1.4-1.4L11 12.6V4zM5 18h14v2H5v-2z" />
  ),
  cap: (
    <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zm-6 9.2v4L12 20l6-3.8v-4L12 15.5l-6-3.3z" />
  ),
  external: (
    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3zM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
  ),
  medal: (
    <path d="M7 2h10l-2.6 5.2A7 7 0 1 1 9.6 7.2L7 2zm5 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.8 1.3 2.6 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4L12 10.8z" />
  ),
  code: (
    <path d="M8.7 16.6 4.1 12l4.6-4.6L7.3 6l-6 6 6 6 1.4-1.4zm6.6 0 4.6-4.6-4.6-4.6L16.7 6l6 6-6 6-1.4-1.4z" />
  ),
  db: (
    <path d="M12 2C7 2 3 3.8 3 6v12c0 2.2 4 4 9 4s9-1.8 9-4V6c0-2.2-4-4-9-4zm7 16c0 .6-2.5 2-7 2s-7-1.4-7-2v-2.3c1.6 1 4.2 1.6 7 1.6s5.4-.6 7-1.6V18zm0-5c0 .6-2.5 2-7 2s-7-1.4-7-2v-2.3c1.6 1 4.2 1.6 7 1.6s5.4-.6 7-1.6V13zm-7-3C7.5 10 5 8.6 5 8s2.5-2 7-2 7 1.4 7 2-2.5 2-7 2z" />
  ),
  layers: (
    <path d="m12 2 10 5-10 5L2 7l10-5zm-7.8 8.4L12 14.3l7.8-3.9L22 11.5l-10 5-10-5 2.2-1.1zm0 4.5L12 18.8l7.8-3.9L22 16l-10 5-10-5 2.2-1.1z" />
  ),
  cloud: (
    <path d="M19.4 10A7 7 0 0 0 6.1 8.1 5.5 5.5 0 0 0 6.5 19h12a4.5 4.5 0 0 0 .9-9zM18.5 17h-12a3.5 3.5 0 0 1-.3-7l.6-.1.3-.5A5 5 0 0 1 17.5 11l.1.9.9.1a2.5 2.5 0 0 1 0 5z" />
  ),
};

type IconName = keyof typeof icons;
const skillIcons: IconName[] = ["code", "layers", "db", "cloud"];

function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {icons[name]}
    </svg>
  );
}

function SectionTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-sm text-accent-2">
        {index}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{children}</h2>
      <span className="h-px flex-1 bg-linear-to-r from-line to-transparent" />
    </div>
  );
}

export default function Resume({ photo }: { photo: string | null }) {
  const lang = useSyncExternalStore(subscribeLang, readLang, () => "th" as Lang);
  const years = useSyncExternalStore(
    noopSubscribe,
    () => yearsSince(careerStart),
    () => null,
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (v: Record<Lang, string>) => v[lang];
  const projectCount = experience.reduce((n, job) => n + job.projects.length, 0);
  const navItems = ["about", "experience", "skills", "education", "contact"] as const;

  return (
    <div className={lang === "th" ? "leading-relaxed" : ""}>
      {/* Navigation */}
      <header className="no-print sticky top-0 z-30 border-b border-line/70 bg-background/75 backdrop-blur-lg">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-bold tracking-wider text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-accent-2 to-accent text-sm text-background">
              SS
            </span>
            <span className="hidden sm:inline">Srattra</span>
          </a>
          <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
            {navItems.map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="transition hover:text-white">
                  {t(ui.nav[key])}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-line bg-surface p-0.5 text-xs font-semibold">
              {(["th", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-3 py-1 transition ${
                    lang === l ? "bg-accent text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href={profile.resumePdf}
              download
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-white transition hover:border-accent sm:px-3.5"
            >
              <Icon name="download" className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t(ui.print)}</span>
              <span className="sm:hidden">PDF</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -top-40 left-1/4 h-112 w-112 rounded-full bg-accent/6 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-accent-2/4 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:py-24">
          <div className="rise order-2 md:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {lang === "th" ? "พร้อมรับโอกาสงานใหม่" : "Open to new opportunities"}
            </span>
            <p className="mt-6 text-lg text-muted">
              {lang === "th" ? "สวัสดีครับ ผมชื่อ" : "Hello, I'm"}
            </p>
            <h1 className="text-gradient mt-1 text-4xl font-bold tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xl">
              {profile.role}
            </p>
            <p className="mt-5 max-w-xl text-muted">
              Next.js · React · Vue.js · TypeScript · Laravel · AWS
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-5 py-2.5 font-semibold text-white shadow-lg shadow-accent/15 transition hover:brightness-110"
              >
                <Icon name="mail" />
                {profile.email}
              </a>
              <a
                href={profile.phoneHref}
                className="flex items-center gap-2 rounded-full border border-line bg-surface/80 px-5 py-2.5 font-semibold text-white transition hover:border-accent"
              >
                <Icon name="phone" className="h-4 w-4 text-accent-2" />
                {profile.phone}
              </a>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-3">
              {[
                { value: years ? `${years}+` : "—", label: ui.stats.years },
                { value: String(projectCount), label: ui.stats.projects },
                { value: education.gpa, label: ui.stats.gpa },
              ].map((s) => (
                <div
                  key={s.label.en}
                  className="rounded-xl border border-line bg-surface/70 px-4 py-3 backdrop-blur"
                >
                  <dt className="sr-only">{t(s.label)}</dt>
                  <dd className="text-2xl font-bold text-white sm:text-3xl">{s.value}</dd>
                  <dd className="text-xs text-muted">{t(s.label)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rise order-1 mx-auto [animation-delay:150ms] md:order-2 md:mx-0">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-[1.75rem] bg-linear-to-br from-accent-2 via-accent to-indigo-500 opacity-50 blur-md"
                aria-hidden="true"
              />
              <div className="relative rounded-[1.6rem] bg-linear-to-br from-accent-2 via-accent to-indigo-500 p-[3px]">
                {photo ? (
                  <Image
                    src={photo}
                    alt={profile.name}
                    width={270}
                    height={360}
                    priority
                    className="h-90 w-67.5 rounded-3xl bg-white object-cover object-top"
                  />
                ) : (
                  <div className="flex h-90 w-67.5 items-center justify-center rounded-3xl bg-surface text-7xl font-bold text-accent">
                    SS
                  </div>
                )}
              </div>
              <div className="absolute -bottom-5 -left-6 flex items-center gap-2 rounded-xl border border-line bg-surface/95 px-4 py-2.5 shadow-xl backdrop-blur">
                <Icon name="code" className="h-5 w-5 text-accent-2" />
                <div className="text-xs leading-tight">
                  <p className="font-semibold text-white">Frontend Developer</p>
                  <p className="text-muted">GBY Digital Tech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6">
        {/* About */}
        <section id="about">
          <SectionTitle index="01">{t(ui.summary)}</SectionTitle>
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-lg leading-relaxed text-foreground/85">{t(profile.summary)}</p>
          </div>
        </section>

        {/* Experience */}
        <section id="experience">
          <SectionTitle index="02">{t(ui.experience)}</SectionTitle>
          <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-10">
            {experience.map((job) => (
              <li key={job.company} className="relative">
                <span
                  className={`absolute -left-7.75 top-7 h-3.5 w-3.5 rounded-full ring-4 ring-background sm:-left-11.75 ${
                    job.current ? "bg-accent-2 shadow-[0_0_12px] shadow-accent-2" : "bg-muted/60"
                  }`}
                  aria-hidden="true"
                />
                <article className="rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/40 sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{job.company}</h3>
                      <p className="mt-1 font-semibold text-accent-2">
                        {t(ui.position)} · {job.position}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <span className="whitespace-nowrap rounded-full border border-line bg-surface-2 px-3 py-1 text-sm font-medium text-foreground">
                        {t(job.period)}
                      </span>
                      {job.current && (
                        <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                          {t(ui.present)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {job.projects.map((project, i) => (
                      <div key={project.title.en} className="rounded-xl border border-line/60 bg-surface-2/60 p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <h4 className="font-semibold text-white">
                            <span className="mr-2 font-mono text-accent">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {t(project.title)}
                          </h4>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-2 transition hover:bg-accent hover:text-white"
                            >
                              {t(ui.visitSite)}
                              <Icon name="external" className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                        {project.images && (
                          <ProjectGallery images={project.images} url={project.url} lang={lang} />
                        )}
                        <ul className="mt-4 space-y-2 text-[15px] text-muted">
                          {project.points.map((p) => (
                            <li key={p.en} className="flex gap-3">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{t(p)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent-2"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills */}
        <section id="skills">
          <SectionTitle index="03">{t(ui.skills)}</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((group, i) => (
              <article
                key={group.label.en}
                className="group rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-0.5 hover:border-accent/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-2 transition group-hover:bg-accent group-hover:text-white">
                    <Icon name={skillIcons[i % skillIcons.length]} className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold text-white">{t(group.label)}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-foreground/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education">
          <SectionTitle index="04">{t(ui.education)}</SectionTitle>
          <article className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-accent-2 to-accent text-white">
              <Icon name="cap" className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{t(education.university)}</h3>
              {lang === "th" && <p className="text-sm text-muted">({education.university.en})</p>}
              <p className="mt-2 font-semibold text-accent-2">{t(education.degree)}</p>
              <p className="text-muted">{t(education.faculty)}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
                <Icon name="medal" className="h-4 w-4" />
                {t(education.honors)}
              </span>
            </div>
            <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-2 sm:text-right">
              <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm font-medium">
                {t(education.period)}
              </span>
              <span className="text-sm text-muted">
                {t(ui.gpa)}{" "}
                <strong className="text-gradient text-3xl font-bold">{education.gpa}</strong>
              </span>
            </div>
          </article>
        </section>
      </main>

      {/* Contact */}
      <footer id="contact" className="relative overflow-hidden border-t border-line">
        <div
          className="absolute left-1/2 top-0 h-64 w-160 -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-gradient text-3xl font-bold sm:text-4xl">{t(ui.contact)}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t(ui.contactText)}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-white shadow-lg shadow-accent/15 transition hover:brightness-110"
            >
              <Icon name="mail" />
              {t(ui.emailMe)}
            </a>
            <a
              href={profile.phoneHref}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-semibold text-white transition hover:border-accent"
            >
              <Icon name="phone" className="h-4 w-4 text-accent-2" />
              {t(ui.callMe)} {profile.phone}
            </a>
          </div>
          <p className="mt-16 text-xs text-muted/60">
            © {profile.name}. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
