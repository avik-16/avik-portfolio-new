/* ============================================================
   COSMOS — the ship cursor + hidden planet Easter egg.
   Planet content (names, positions, color palettes) lives in
   data.js (PLANETS, DEFAULT_THEME). This file just handles the
   interaction: rendering, hover labels, click-to-theme-swap,
   and the custom cursor. You shouldn't need to edit this file
   to add/remove/reposition a planet — that's all in data.js.
   ============================================================ */

const THEME_STORAGE_KEY = "avik-portfolio-theme";

// Which planet (if any) is currently active. Read by the scroll-driven
// descent/day-night system in initDescentScroll() below. Kept as a plain
// variable rather than the DOM attribute so there's no race with the
// attribute-removal delay in setLandscape().
let activePlanet = null;

// ---------- theme swapping ----------
function applyThemeVars(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--ivory", theme.ivory);
  root.style.setProperty("--gold", theme.gold);
  root.style.setProperty("--frost", theme.frost);
  root.style.setProperty("--steel", theme.steel);
}

// Colors the space-view sphere (#planet-approach) to match a planet's
// own palette, the same way the small distant-planet dots are colored.
function paintApproachSphere(planet) {
  const sphere = document.getElementById("planet-approach");
  if (!sphere) return;
  if (!planet) {
    sphere.style.opacity = "0";
    return;
  }
  const { frost, gold, bg } = planet.theme;
  sphere.style.background = `radial-gradient(circle at 34% 32%, ${frost}, ${gold} 48%, ${bg} 88%)`;
}

// Shows/hides the full landscape (sky, sun, ground, particles) for a
// given planet id. Passing null hides it and returns to plain space.
function setLandscape(planetId) {
  const landscape = document.getElementById("landscape");
  if (!landscape) return;
  if (planetId) {
    document.documentElement.setAttribute("data-landscape", planetId);
    landscape.classList.add("is-visible");
  } else {
    landscape.classList.remove("is-visible");
    landscape.style.opacity = "";
    landscape.style.transition = "";
    // Undo the day/night inline styles so the default CSS (twinkling
    // starfield, static sun position) takes back over cleanly.
    const sunEl = document.getElementById("landscape-sun");
    const nightEl = document.getElementById("landscape-night-overlay");
    const starA = document.getElementById("star-layer-a");
    const starB = document.getElementById("star-layer-b");
    if (sunEl) { sunEl.style.left = ""; sunEl.style.top = ""; sunEl.style.opacity = ""; }
    if (nightEl) nightEl.style.opacity = "";
    if (starA) starA.style.opacity = "";
    if (starB) starB.style.opacity = "";
    // Wait for the fade-out transition before clearing the attribute,
    // so the old terrain's colors don't pop off instantly.
    window.setTimeout(() => {
      document.documentElement.removeAttribute("data-landscape");
    }, 1000);
  }
  // Let the scroll-driven descent system know immediately, so it
  // doesn't wait for the next scroll/resize event to react.
  window.dispatchEvent(new CustomEvent("cosmos:landscapechange"));
}

// Briefly fades to black (a "warp cut"), scrolls back to the top of the
// page, and swaps the theme + landscape underneath while the screen is
// covered — so when it fades back in, you're looking at the new planet
// from space again, ready to scroll down and land on it.
function flashToTheme(theme, planetName, planetId, distance, planet) {
  activePlanet = planet || null;
  const overlay = document.getElementById("warp-overlay");
  if (!overlay) {
    applyThemeVars(theme);
    setLandscape(planetId || null);
    paintApproachSphere(planet || null);
    return;
  }
  overlay.style.opacity = "1";
  window.setTimeout(() => {
    // behavior: "instant" overrides the page's global smooth-scroll CSS —
    // without it, this would animate and still be visibly scrolling once
    // the overlay fades back in.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    applyThemeVars(theme);
    setLandscape(planetId || null);
    paintApproachSphere(planet || null);
    window.setTimeout(() => {
      overlay.style.opacity = "0";
    }, 60);
  }, 420);

  showThemeToast(planetName, distance);
}

function showThemeToast(planetName, distance) {
  const toast = document.getElementById("theme-toast");
  if (!toast) return;
  toast.textContent = planetName
    ? `Now viewing under the light of ${planetName}${distance ? ` — ${distance}` : ""}`
    : "Back to the original theme";
  toast.classList.add("is-visible");
  window.clearTimeout(showThemeToast._t);
  showThemeToast._t = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4200);
}

function showResetControl() {
  const resetEl = document.getElementById("theme-reset");
  if (resetEl) resetEl.classList.add("is-visible");
}

function hideResetControl() {
  const resetEl = document.getElementById("theme-reset");
  if (resetEl) resetEl.classList.remove("is-visible");
}

function selectPlanet(planet) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, planet.id);
  } catch (e) {
    /* localStorage unavailable (private browsing, etc) — theme just won't persist */
  }
  flashToTheme(planet.theme, planet.name, planet.id, planet.distance, planet);
  showResetControl();
}

function resetTheme() {
  try {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
  flashToTheme(DEFAULT_THEME, null, null, null, null);
  hideResetControl();
}

// Runs on every page load — restores whichever theme THIS visitor
// previously picked. Nobody else's copy of the site is affected.
function initThemeFromStorage() {
  try {
    const savedId = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!savedId) return;
    const planet = PLANETS.find((p) => p.id === savedId);
    if (planet) {
      activePlanet = planet;
      applyThemeVars(planet.theme);
      setLandscape(planet.id);
      paintApproachSphere(planet);
      showResetControl();
    }
  } catch (e) {
    /* localStorage unavailable — just fall back to the default theme */
  }
}

// ---------- landscape particles ----------
// 18 generic dots, randomly placed/timed. Which direction and color
// they animate in comes entirely from CSS via [data-landscape="..."]
// on <html> — this function just needs to create them once.
function renderLandscapeParticles() {
  const field = document.getElementById("landscape-particles");
  if (!field) return;
  const count = 18;
  let html = "";
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * -14;
    html += `<span class="particle" style="left:${left}%; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
  }
  field.innerHTML = html;
}

// ---------- rendering the planets ----------
function renderPlanets() {
  const field = document.getElementById("planet-field");
  if (!field) return;

  field.innerHTML = PLANETS.map((p) => {
    const sideStyle = p.side === "left" ? `left:${p.offset};` : `right:${p.offset};`;
    const bg = `radial-gradient(circle at 32% 32%, ${p.theme.frost}, ${p.theme.gold} 55%, ${p.theme.bg} 100%)`;
    return `
      <button
        type="button"
        class="planet"
        data-planet-id="${p.id}"
        aria-label="Switch the site's theme to ${p.name}, ${p.distance}"
        style="top:${p.top}px; ${sideStyle} width:${p.size}px; height:${p.size}px; background:${bg};"
      >
        <span class="planet-label f-mono">${p.name}</span>
      </button>`;
  }).join("");

  field.querySelectorAll(".planet").forEach((el) => {
    el.addEventListener("click", () => {
      const planet = PLANETS.find((p) => p.id === el.dataset.planetId);
      if (planet) selectPlanet(planet);
    });
  });
}

// ---------- descent + day/night cycle ----------
// While a planet is active: the first stretch of scroll "flies you in"
// (the space-view sphere grows and fades into the landscape), then the
// rest of the page's scroll drives a repeating day/night cycle — the
// sun arcs across the sky, and it gets dark (more stars, a night wash)
// at the low point of each cycle.
function initDescentScroll() {
  const approachEl = document.getElementById("planet-approach");
  const landscapeEl = document.getElementById("landscape");
  const sunEl = document.getElementById("landscape-sun");
  const nightEl = document.getElementById("landscape-night-overlay");
  const starA = document.getElementById("star-layer-a");
  const starB = document.getElementById("star-layer-b");
  if (!approachEl || !landscapeEl || !sunEl || !nightEl) return;

  const APPROACH_RANGE = 1400; // px of scroll to fully "land"
  const CYCLES = 2; // how many day/night loops across the rest of the page

  function update() {
    if (!activePlanet) {
      approachEl.style.opacity = "0";
      return;
    }

    const scrollY = window.scrollY;
    const docMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    // Phase 1 — descent: sphere grows and fades into the landscape.
    const approachProgress = Math.min(1, scrollY / APPROACH_RANGE);
    const eased = approachProgress * approachProgress * (3 - 2 * approachProgress);
    approachEl.style.transform = `translate(-50%, -50%) scale(${1 + eased * 13})`;
    const sphereFade = approachProgress < 0.55 ? 1 : Math.max(0, 1 - (approachProgress - 0.55) / 0.45);
    approachEl.style.opacity = String(sphereFade);

    landscapeEl.style.transition = "none";
    landscapeEl.style.opacity = String(Math.min(1, approachProgress / 0.85));

    // Phase 2 — day/night cycle, using whatever scroll remains after landing.
    const worldMax = Math.max(1, docMax - APPROACH_RANGE);
    const worldProgress = Math.max(0, Math.min(1, (scrollY - APPROACH_RANGE) / worldMax));
    const cycle = (worldProgress * CYCLES) % 1;
    const sunHeight = Math.sin(cycle * Math.PI * 2); // -1 (midnight) .. 1 (noon)

    sunEl.style.left = `${cycle * 100}%`;
    sunEl.style.top = `${90 - ((sunHeight + 1) / 2) * 80}%`;
    sunEl.style.opacity = String(Math.max(0.12, (sunHeight + 1) / 2));

    const nightAmount = Math.max(0, -sunHeight);
    nightEl.style.opacity = String(nightAmount * 0.82);
    const starOpacity = 0.25 + nightAmount * 0.75;
    if (starA) starA.style.opacity = String(starOpacity);
    if (starB) starB.style.opacity = String(starOpacity * 0.7);
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("cosmos:landscapechange", update);
  update();
}

// ---------- custom ship cursor ----------
// Only enabled on desktop-sized screens with a real mouse — never on
// touch devices, so nothing here ever gets in the way on mobile.
function initShipCursor() {
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isWideEnough = window.matchMedia("(min-width: 1024px)").matches;
  if (!hasFinePointer || !isWideEnough) return;

  const cursor = document.getElementById("ship-cursor");
  if (!cursor) return;

  document.documentElement.classList.add("custom-cursor-active");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;
  let angle = 0;
  let isInteractive = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = "1";
  });

  window.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("mouseover", (e) => {
    const interactive = e.target.closest("a, button, .planet");
    isInteractive = Boolean(interactive);
    cursor.classList.toggle("is-interactive", isInteractive);
  });

  function tick() {
    const dx = mouseX - curX;
    const dy = mouseY - curY;
    curX += dx * 0.22;
    curY += dy * 0.22;

    const speed = Math.hypot(dx, dy);
    if (speed > 0.6) {
      angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    }

    const scale = isInteractive ? 1.3 : 1;
    cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) rotate(${angle}deg) scale(${scale})`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", () => {
  renderPlanets();
  renderLandscapeParticles();
  initThemeFromStorage();
  initShipCursor();
  initDescentScroll();

  const resetEl = document.getElementById("theme-reset");
  if (resetEl) {
    resetEl.addEventListener("click", resetTheme);
    resetEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        resetTheme();
      }
    });
  }
});
