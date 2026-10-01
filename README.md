# Avik Portfolio (static — no build step)

Plain HTML/CSS/JS. No npm, no build, no GitHub Actions needed.

Visual style: dark "Interstellar" theme — starfield with rare shooting
stars and gentle scroll parallax, a subtle film-grain texture, a
Gargantua-style glowing accretion ring with a pulsing black hole in the
hero, shimmering title text, and smooth scroll-in animations throughout.

**Hidden Easter egg:** on wide desktop screens, the mouse cursor becomes
a small ship, and five tiny "planets" (Kharon, Emberos, Virelle, Solmere,
Nyxara) are scattered down the page in the margins. Hovering one reveals
its name; clicking it swaps the entire site's color theme to that
planet's palette. The choice is saved only in that visitor's own
browser (via localStorage) — it never changes the live site for anyone
else. A small "↺ Return to origin" link appears once a theme is active.

## Files

- `index.html` — page structure/layout
- `style.css` — visual design (colors, fonts, animations)
- `data.js` — ALL editable content (projects, experience, skills, awards,
  coursework, etc.) as plain arrays. Edit this to change what the site says.
- `main.js` — turns the data into HTML and handles the scroll-in animations.
  You shouldn't need to touch this unless you're changing how something looks.
- `cosmos.js` — the ship cursor + hidden planet Easter egg. Planet names,
  positions, and color palettes live in `data.js` (the `PLANETS` array);
  this file just handles rendering and the click-to-swap-theme behavior.

## How to preview it before publishing

Just double-click `index.html` and it'll open in your browser. (Or, if you
have Python installed: `python3 -m http.server` in this folder, then visit
`http://localhost:8000`.)

## How to publish it for free (GitHub Pages)

1. Go to github.com → New repository → name it **avik-portfolio** → Create.
2. On the new repo's page, click **"uploading an existing file"** (or
   "Add file → Upload files").
3. Drag all 5 files (`index.html`, `style.css`, `data.js`, `main.js`,
   `cosmos.js`) into
   the upload box. Commit.
4. Go to **Settings → Pages**. Under "Build and deployment", set
   **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**.
   Save.
5. Wait 1–2 minutes. Your site is live at:
   `https://<your-username>.github.io/avik-portfolio/`

No terminal, no git commands, no build step required. To update the site
later, just edit `data.js` (or any file) in the GitHub web editor (click the
pencil icon on the file) and commit — it redeploys automatically.
