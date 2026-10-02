/* ============================================================
   COSMOS — the ship cursor + hidden planet Easter egg.
   Planet content (names, positions, color palettes) lives in
   data.js (PLANETS, DEFAULT_THEME). This file just handles the
   interaction: rendering, hover labels, click-to-theme-swap,
   and the custom cursor. You shouldn't need to edit this file
   to add/remove/reposition a planet — that's all in data.js.
   ============================================================ */

const THEME_STORAGE_KEY = "avik-portfolio-theme";

// ---------- theme swapping ----------
function applyThemeVars(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--ivory", theme.ivory);
  root.style.setProperty("--gold", theme.gold);
  root.style.setProperty("--frost", theme.frost);
  root.style.setProperty("--steel", theme.steel);
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
    // Wait for the fade-out transition before clearing the attribute,
    // so the old terrain's colors don't pop off instantly.
    window.setTimeout(() => {
      document.documentElement.removeAttribute("data-landscape");
    }, 1000);
  }
}

// Briefly fades to black (a "warp cut"), swaps the theme AND the
// landscape underneath while the screen is covered, then fades back
// in on the new world.
function flashToTheme(theme, planetName, planetId, distance) {
  const overlay = document.getElementById("warp-overlay");
  if (!overlay) {
    applyThemeVars(theme);
    setLandscape(planetId || null);
    return;
  }
  overlay.style.opacity = "1";
  window.setTimeout(() => {
    applyThemeVars(theme);
    setLandscape(planetId || null);
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
  flashToTheme(planet.theme, planet.name, planet.id, planet.distance);
  showResetControl();
}

function resetTheme() {
  try {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
  flashToTheme(DEFAULT_THEME, null, null);
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
      applyThemeVars(planet.theme);
      setLandscape(planet.id);
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
