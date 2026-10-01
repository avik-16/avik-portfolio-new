/* ============================================================
   RENDERING + BEHAVIOR. You shouldn't need to edit this file
   to change content — that's all in data.js. Edit this file
   only if you want to change how things are laid out/animated.
   ============================================================ */

// ---------- small helpers ----------
function icon(name, size) {
  size = size || 14;
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;
}

function linkRow(items, opts) {
  opts = opts || {};
  const cls = opts.itemClass || "";
  return items
    .map(
      (s) => `
      <a href="${s.href}" target="_blank" rel="noreferrer"
         class="link-underline flex items-center gap-2 f-mono text-[11px] tracking-[0.15em] uppercase text-[var(--steel)] hover:text-[var(--ivory)] transition-colors ${cls}">
        ${icon(s.icon, 13)}
        ${s.label}
      </a>`
    )
    .join("");
}

// ---------- hero ----------
function renderHeroStats() {
  const el = document.getElementById("hero-stats");
  el.innerHTML = HERO_STATS.map(
    (s) => `
    <div>
      <div class="f-display text-2xl md:text-3xl font-light text-[var(--ivory)]">${s.value}</div>
      <div class="f-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--steel)] mt-2 leading-relaxed">${s.label}</div>
    </div>`
  ).join("");
}

function renderHeroSocial() {
  const el = document.getElementById("hero-social");
  el.innerHTML = linkRow(SOCIAL_LINKS);
}

function renderFooterContacts() {
  const el = document.getElementById("footer-contacts");
  el.innerHTML = CONTACTS.map(
    (c) => `
    <a href="${c.href}" target="_blank" rel="noreferrer"
       class="link-underline flex items-center gap-2.5 f-mono text-[12px] tracking-wide text-[var(--steel)] hover:text-[var(--ivory)] transition-colors">
      ${icon(c.icon, 14)}
      ${c.label}
    </a>`
  ).join("");
}

// ---------- projects ----------
function renderProjects() {
  const el = document.getElementById("projects-list");
  el.innerHTML = PROJECTS_DATA.map(
    (p, i) => `
    <div class="reveal-on-scroll" style="transition-delay:${(i % 3) * 90}ms">
      <div class="grid md:grid-cols-[minmax(0,1fr)_220px] gap-8 md:gap-12 py-12 border-t border-[var(--hairline)]">
        <div>
          <div class="flex items-center gap-3 mb-3 f-mono text-[10px] tracking-[0.2em] uppercase text-[var(--steel)]">
            <span class="text-[var(--gold)]">${p.domain}</span>
            <span>·</span>
            <span>${p.period}</span>
          </div>
          <h3 class="f-display text-2xl font-light text-[var(--ivory)] mb-4">${p.title}</h3>
          <p class="text-[14.5px] leading-relaxed text-[var(--steel)] font-light max-w-2xl mb-5">${p.description}</p>
          <div class="flex flex-wrap gap-x-4 gap-y-2">
            ${p.tags.map((t) => `<span class="f-mono text-[10px] tracking-wide text-[var(--steel)]">${t}</span>`).join("")}
          </div>
        </div>
        <div class="flex md:flex-col gap-x-8 gap-y-4 flex-wrap md:border-l md:border-[var(--hairline)] md:pl-8">
          ${p.metrics
            .map(
              (m) => `
            <div>
              <div class="f-mono text-[9px] tracking-[0.18em] uppercase text-[var(--steel)] mb-1">${m.label}</div>
              <div class="f-display text-[14px] font-light text-[var(--gold)]">${m.value}</div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </div>`
  ).join("");
}

// ---------- experience ----------
function renderTimeline() {
  const el = document.getElementById("timeline-list");
  el.innerHTML = TIMELINE_DATA.map(
    (item, i) => `
    <div class="reveal-on-scroll" style="transition-delay:${i * 100}ms">
      <div class="relative">
        <span class="absolute -left-8 md:-left-10 top-1.5 w-2 h-2 rounded-full ${
          item.current ? "bg-[var(--gold)]" : "bg-[var(--steel)]/60"
        }"></span>
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
          <h3 class="f-display text-lg font-normal text-[var(--ivory)]">${item.org}</h3>
          ${
            item.current
              ? `<span class="f-mono text-[9px] tracking-[0.18em] uppercase text-[var(--gold)]">In Progress</span>`
              : ""
          }
        </div>
        <div class="f-mono text-[10.5px] tracking-wider text-[var(--gold)] mb-1">${item.role}</div>
        <div class="f-mono text-[10.5px] tracking-wider text-[var(--steel)] mb-4">${item.period} · ${item.place}</div>
        <ul class="space-y-2 max-w-2xl">
          ${item.bullets
            .map(
              (b) => `
            <li class="text-[13.5px] leading-relaxed text-[var(--steel)] font-light flex gap-2.5">
              <span class="text-[var(--gold)]/50 mt-1 shrink-0">—</span>
              <span>${b}</span>
            </li>`
            )
            .join("")}
        </ul>
        ${item.highlight ? `<div class="mt-4 f-mono text-[11px] text-[var(--ivory)]">${item.highlight}</div>` : ""}
      </div>
    </div>`
  ).join("");
}

// ---------- skills ----------
function renderSkills() {
  const el = document.getElementById("skills-list");
  el.innerHTML = ARSENAL_DATA.map(
    (group, i) => `
    <div class="reveal-on-scroll" style="transition-delay:${i * 90}ms">
      <div class="pb-8 border-b border-[var(--hairline)]">
        <div class="f-display text-[15px] font-normal text-[var(--ivory)] mb-4">${group.category}</div>
        <div class="flex flex-wrap gap-x-5 gap-y-2.5">
          ${group.items.map((it) => `<span class="f-mono text-[11.5px] tracking-wide text-[var(--steel)]">${it}</span>`).join("")}
        </div>
      </div>
    </div>`
  ).join("");
}

// ---------- about ----------
function renderCoursework() {
  const el = document.getElementById("coursework-list");
  el.innerHTML = COURSEWORK.map(
    (c) => `<span class="f-mono text-[11.5px] tracking-wide text-[var(--steel)]">${c}</span>`
  ).join("");
}

function renderSimpleList(containerId, items) {
  const el = document.getElementById(containerId);
  el.innerHTML = items
    .map(
      (it) => `
    <li class="text-[13.5px] leading-relaxed text-[var(--steel)] font-light flex gap-2.5">
      <span class="text-[var(--gold)]/50 mt-1 shrink-0">—</span>
      <span>${it}</span>
    </li>`
    )
    .join("");
}

function renderAwards() {
  const el = document.getElementById("awards-list");
  el.innerHTML = AWARDS.map(
    (a, i) => `
    <div class="reveal-on-scroll" style="transition-delay:${i * 60}ms">
      <div class="flex gap-4">
        <span class="f-mono text-[11px] text-[var(--gold)]/70 mt-0.5 shrink-0">${String(i + 1).padStart(2, "0")}</span>
        <span class="text-[13.5px] leading-relaxed text-[var(--steel)] font-light">${a}</span>
      </div>
    </div>`
  ).join("");
}

// ---------- starfield ----------
function renderStarfield() {
  function makeShadow(count, alpha) {
    const parts = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 1600);
      const y = Math.floor(Math.random() * 4200);
      parts.push(`${x}px ${y}px 0 rgba(243,241,234,${alpha})`);
    }
    return parts.join(",");
  }
  document.getElementById("star-layer-a").style.boxShadow = makeShadow(120, 0.7);
  document.getElementById("star-layer-b").style.boxShadow = makeShadow(180, 0.35);
}

// ---------- scroll reveal ----------
function initReveal() {
  const els = document.querySelectorAll(".reveal-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => observer.observe(el));
}

// ---------- scroll parallax ----------
// Star layers drift at slightly different speeds as you scroll, giving a
// sense of depth without tracking the mouse. Skipped for reduced motion.
function initParallax() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const layerA = document.getElementById("star-layer-a");
  const layerB = document.getElementById("star-layer-b");
  if (!layerA || !layerB) return;

  let raf = null;
  function update() {
    const y = window.scrollY;
    layerA.style.transform = `translateY(${y * 0.03}px)`;
    layerB.style.transform = `translateY(${y * 0.06}px)`;
    raf = null;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (raf === null) raf = requestAnimationFrame(update);
    },
    { passive: true }
  );
}

// ---------- boot ----------
document.addEventListener("DOMContentLoaded", () => {
  renderStarfield();
  renderHeroStats();
  renderHeroSocial();
  renderFooterContacts();
  renderProjects();
  renderTimeline();
  renderSkills();
  renderCoursework();
  renderSimpleList("self-study-list", SELF_STUDY);
  renderSimpleList("certifications-list", CERTIFICATIONS);
  renderAwards();

  // Reveal-on-scroll must run AFTER the dynamic content above exists,
  // since it needs to find the .reveal-on-scroll elements in the DOM.
  initReveal();
  initParallax();

  // Lucide icons are inserted as <i data-lucide="..."> placeholders;
  // this call turns them into actual inline SVG icons.
  if (window.lucide) window.lucide.createIcons();
});
