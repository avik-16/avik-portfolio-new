/* ============================================================
   ALL SITE CONTENT LIVES IN THIS FILE.
   Edit these arrays to add/remove/change projects, jobs, skills,
   awards, etc. Nothing here affects layout — just content.
   Layout lives in index.html; visuals live in style.css.
   ============================================================ */

const HERO_STATS = [
  { label: "Target Apogee, M-Class", value: "10,000 ft" },
  { label: "Verified Flight Apogee", value: "461 m" },
  { label: "Seed Fund Sanctioned", value: "₹90,000" },
  { label: "Flight & Defence Projects", value: "7+" },
];

const SOCIAL_LINKS = [
  { icon: "globe", label: "Website", href: "https://starrocketry.github.io" },
  { icon: "github", label: "GitHub", href: "https://github.com" },
  { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { icon: "mail", label: "Email", href: "mailto:avikrajeevbabu@gmail.com" },
];

// Same links, shown again in the footer with fuller labels.
const CONTACTS = [
  { icon: "mail", label: "avikrajeevbabu@gmail.com", href: "mailto:avikrajeevbabu@gmail.com" },
  { icon: "github", label: "GitHub", href: "https://github.com" },
  { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { icon: "globe", label: "starrocketry.github.io", href: "https://starrocketry.github.io" },
];

// Each project card on the site is generated from this array.
// To add a project: copy one block, give it a unique "id", fill in the fields.
// To remove a project: delete its block. Order here = order shown on the page.
const PROJECTS_DATA = [
  {
    id: "mclass",
    domain: "Propulsion",
    period: "Mar 2025 — Present",
    title: "Solid Propellant M-Class Rocket",
    description:
      "An M-class solid rocket with active stabilization, built around a Thrust Vector Control system driving a contour nozzle to hold a 10,000 ft apogee.",
    metrics: [
      { label: "Target Apogee", value: "10,000 ft" },
      { label: "Control", value: "TVC + Contour Nozzle" },
      { label: "Status", value: "In Development" },
    ],
    tags: ["CATIA", "TVC", "ANSYS", "Propulsion"],
  },
  {
    id: "srtv",
    domain: "Avionics",
    period: "Sept 2025 — Mar 2026",
    title: "Sounding Rocket Workshop Test Vehicle",
    description:
      "A low-cost sounding rocket built for the team's sounding rocketry workshop, flying a custom ESP32 flight computer with a Kalman filter fusing BMP280 and DHT11 data for altitude, temperature, pressure, and humidity. Flew on a G220 SRM with stabilized LoRa telemetry.",
    metrics: [
      { label: "Verified Apogee", value: "461 m" },
      { label: "Flight Computer", value: "ESP32 + Kalman" },
      { label: "Motor", value: "G220 SRM" },
    ],
    tags: ["ESP32", "Kalman Filter", "LoRa Telemetry", "Flight Test"],
  },
  {
    id: "jclass",
    domain: "Propulsion",
    period: "Sept 2025 — Mar 2026",
    title: "Solid Propellant J-Class Rocket",
    description:
      "A model rocket with Thrust Vector Control targeting a 3,000 ft apogee, running a PID controller across a mix of COTS and custom hardware. TVC response and motor thrust curves verified through static testing and simulation.",
    metrics: [
      { label: "Target Apogee", value: "3,000 ft" },
      { label: "Control", value: "PID + TVC" },
      { label: "Status", value: "Launch Pending" },
    ],
    tags: ["PID Control", "Static Testing", "OpenMotor"],
  },
  {
    id: "missile",
    domain: "Defence",
    period: "Mar 2025 — Jun 2025",
    title: "Missile System Design Development",
    description:
      "UAV and missile concepts designed and optimized for a national-level defence innovation challenge — CAD modeling with aero/structural analysis in ANSYS, XFLR5, and JavaFoil, paired with an OpenCV/YOLO target detection and lock system. Benchmarked against the IAI Heron UAV and BDL-MSRAM.",
    metrics: [
      { label: "Vision Stack", value: "OpenCV / YOLO" },
      { label: "Analysis", value: "ANSYS / XFLR5" },
      { label: "Benchmark", value: "Heron · BDL-MSRAM" },
    ],
    tags: ["OpenCV", "YOLO", "ANSYS", "XFLR5", "JavaFoil"],
  },
  {
    id: "uav",
    domain: "UAV",
    period: "Jul 2025 — Aug 2025",
    title: "Aeromodelling & UAV Manufacturing",
    description:
      "UAVs manufactured from balsa wood, composites, and 3D-printed components, with payload, endurance, and aerobatics testing across RC planes and UAV prototypes.",
    metrics: [
      { label: "Materials", value: "Balsa · Composite" },
      { label: "Testing", value: "Payload · Endurance" },
      { label: "Domain", value: "UAV" },
    ],
    tags: ["Aeromodelling", "Manufacturing", "3D Printing"],
  },
  {
    id: "umv",
    domain: "Marine",
    period: "Jul 2025 — Aug 2025",
    title: "UMV Design and Manufacturing",
    description:
      "Unmanned marine vehicles built from marine-grade plywood, composites, and 3D-printed components, with payload, endurance, and maneuverability testing across RC boats and UMV prototypes.",
    metrics: [
      { label: "Materials", value: "Marine Ply · Composite" },
      { label: "Testing", value: "Payload · Maneuvering" },
      { label: "Domain", value: "UMV" },
    ],
    tags: ["UMV", "Manufacturing", "Marine Systems"],
  },
  {
    id: "rc-testbed",
    domain: "Flight Test",
    period: "Nov 2024",
    title: "RC Aircraft Payload Testbed",
    description:
      "An RC aircraft fabricated as a payload deployment testbed in a technical workshop, integrating motor, ESC, receiver, and servos. Test flights validated control response and servo-based payload drop.",
    metrics: [
      { label: "Systems", value: "Motor · ESC · Servo" },
      { label: "Test", value: "Payload Drop" },
      { label: "Status", value: "Flight Validated" },
    ],
    tags: ["RC Aircraft", "Flight Test", "Payload Systems"],
  },
];

// The "Experience" timeline. Most recent role first.
// "current: true" adds the "In Progress" tag and a highlighted timeline dot.
const TIMELINE_DATA = [
  {
    id: "star",
    org: "STAR Rocketry Team",
    place: "REVA University, Bangalore",
    role: "Research & Development Lead",
    period: "Feb 2025 — Present",
    current: true,
    bullets: [
      "Developed model rockets for competitions and research.",
      "Designed and developed solid-propelled rockets with avionics and propulsion systems.",
      "Conducted avionics and CO₂-based parachute ejection ground tests; currently driving flight readiness and full system integration.",
      "Delivered successful rockets and CanSats while mentoring juniors and strengthening team capability.",
    ],
    highlight: "Secured ₹90,000 REVA University seed fund",
  },
  {
    id: "cingularity",
    org: "Cingularity Aerospace Pvt Ltd",
    place: "Bangalore, India",
    role: "Intern",
    period: "Jul 2025 — Aug 2025",
    current: false,
    bullets: [
      "Worked on UAV systems and aerospace component design.",
      "Contributed to CAD modeling and prototype development.",
      "Assisted in composite component fabrication and assembly.",
      "Designed and developed UMV systems.",
    ],
    highlight: null,
  },
  {
    id: "corizo",
    org: "Corizo — Drona Aviation",
    place: "Online",
    role: "Workshop Trainee",
    period: "Aug 2024 — Nov 2024",
    current: false,
    bullets: [
      "Completed a hands-on drone engineering workshop covering UAV fundamentals, system-level understanding, and drone mapping.",
      "Used CAD software to model airframe components and estimate weight distribution.",
      "Programmed autonomous flight missions with Cygnus IDE and the Primus V5 flight controller — waypoints, flight parameters, and mission logic for mapping runs.",
    ],
    highlight: null,
  },
];

// The "Technical Skills" section groups tools under categories.
// Add a new category by adding a new object; add a tool by adding to "items".
const ARSENAL_DATA = [
  {
    category: "Design & CAD",
    items: ["CATIA", "SolidWorks", "Onshape", "GD&T", "KiCad"],
  },
  {
    category: "Simulation & Analysis",
    items: [
      "ANSYS Static Structural",
      "ANSYS Fluent",
      "SimScale",
      "Flow5",
      "GMAT",
      "OpenRocket",
      "OpenMotor",
    ],
  },
  {
    category: "Code",
    items: ["Python", "MATLAB", "Deep Learning", "OpenCV / YOLO"],
  },
  {
    category: "Shop Floor",
    items: ["3D Printing", "Soldering", "Lathe", "PCB Design", "Machine Shop"],
  },
];

const COURSEWORK = [
  "Rocket Propulsion", "Satellite Communication", "Orbital Mechanics", "Hypersonics",
  "Communication Systems", "Gas Dynamics", "Control Engineering", "Flight Mechanics",
  "Material Science", "Astrophysics", "Gas Turbines", "Structures", "CFD", "FEM",
];

// Self Study = things learned independently, outside formal coursework.
const SELF_STUDY = ["PCB Designing", "Rocketry", "Aeromodelling", "UMVs"];

// Certifications = formal, verifiable training/workshops completed.
// (Kept as a separate list from Self Study on purpose — different things.)
const CERTIFICATIONS = [
  "RC Aircraft Workshop, REVA University (by AEROGO)",
  "Vocational Training on Mastering CATIA V5, REVA University",
];

const AWARDS = [
  "Seed fund of ₹90,000 sanctioned by REVA University for a High-Powered Solid Propellant Rocket project.",
  "Participated in R-Create Project Expo 2025, showcasing a model rocket with active controls.",
  "Conducted a Sounding Rocketry workshop for REVA University aerospace students, class of 2024–28.",
  "Participated in aeromodelling competitions at Hindustan Group of Institutions, Chennai and NMIT, Bangalore.",
  "Organized the EFX India IAM3D event.",
];

/* ============================================================
   COSMOS EASTER EGG — hidden planets scattered down the page.
   Hover a planet to see its name; click it to swap the whole
   site's color theme to that world's palette (saved only in
   YOUR browser via localStorage — nobody else's view changes).
   Desktop-only (hidden on narrow/touch screens).

   "top" is a rough pixel distance down the page — doesn't need
   to be exact, these are meant to feel like distant background
   objects, not precisely placed markers.
   ============================================================ */

const DEFAULT_THEME = {
  bg: "#05060a",
  ivory: "#f3f1ea",
  gold: "#c9a876",
  frost: "#9db4c9",
  steel: "#888d97",
};

// Ten real, confirmed worlds — our own home planet plus nine genuine
// exoplanet discoveries. Not invented, not just our solar system.
// "distance" is how far away it actually is, shown in the toast when
// you land there. Each has a terrain style matched to what's actually
// known (or strongly suspected) about that world.
const PLANETS = [
  {
    // Found in 2005 via gravitational microlensing — a frozen super-Earth,
    // one of the most distant exoplanets ever confirmed.
    id: "ogle-390lb",
    name: "OGLE-2005-BLG-390Lb",
    distance: "21,500 light-years away",
    top: 500,
    side: "left",
    offset: "3%",
    size: 9,
    theme: { bg: "#04070c", ivory: "#eaf3f3", gold: "#7fe3e0", frost: "#a9d8e6", steel: "#7c98a0" },
  },
  {
    // Home. The pale blue dot — included because it's the one habitable
    // world we know for certain.
    id: "earth",
    name: "Earth",
    distance: "right here — home",
    top: 1100,
    side: "right",
    offset: "4%",
    size: 10,
    theme: { bg: "#040a0c", ivory: "#f2faf5", gold: "#ffd77a", frost: "#7ec8e3", steel: "#7fae8f" },
  },
  {
    // A lava world so hot its atmosphere may rain vaporized rock —
    // nicknamed the "diamond planet" for its carbon-rich interior.
    id: "cancri-e",
    name: "55 Cancri e",
    distance: "41 light-years away",
    top: 1700,
    side: "left",
    offset: "2.5%",
    size: 11,
    theme: { bg: "#0c0503", ivory: "#f7e9df", gold: "#e4572e", frost: "#f2a65a", steel: "#a37c6b" },
  },
  {
    // The closest known exoplanet to Earth, orbiting the nearest star to
    // the Sun — likely tidally locked, bathed in permanent dim red twilight.
    id: "proxima-b",
    name: "Proxima Centauri b",
    distance: "4.2 light-years away",
    top: 2300,
    side: "right",
    offset: "3.5%",
    size: 9,
    theme: { bg: "#0a0403", ivory: "#f7e5e0", gold: "#c1503a", frost: "#d98a7a", steel: "#8a5c52" },
  },
  {
    // One of the first exoplanets ever confirmed (1992) — a scorched,
    // irradiated rock orbiting a pulsar. Officially nicknamed "Draugr."
    id: "draugr",
    name: "Draugr (PSR B1257+12 b)",
    distance: "2,300 light-years away",
    top: 2900,
    side: "left",
    offset: "3%",
    size: 8,
    theme: { bg: "#06040b", ivory: "#ece7f7", gold: "#6fcf97", frost: "#b892ff", steel: "#8b84a3" },
  },
  {
    // Earth-size, in its star's habitable zone, found by NASA's TESS
    // telescope — one of the best current candidates for a livable world.
    id: "toi-700d",
    name: "TOI-700 d",
    distance: "100 light-years away",
    top: 3500,
    side: "right",
    offset: "4%",
    size: 10,
    theme: { bg: "#030a0a", ivory: "#eafbf6", gold: "#e08a5b", frost: "#5bc2b0", steel: "#7a9a96" },
  },
  {
    // The real "Tatooine" — a desert world orbiting two suns at once,
    // confirmed in 2011.
    id: "kepler-16b",
    name: "Kepler-16b",
    distance: "245 light-years away",
    top: 4100,
    side: "left",
    offset: "2.5%",
    size: 10,
    theme: { bg: "#0a0602", ivory: "#f7ecd8", gold: "#f2c14e", frost: "#d9b88f", steel: "#a8967d" },
  },
  {
    // The first validated Earth-sized planet found in another star's
    // habitable zone (2014) — orbits a dim red dwarf.
    id: "kepler-186f",
    name: "Kepler-186f",
    distance: "582 light-years away",
    top: 4700,
    side: "right",
    offset: "3.5%",
    size: 9,
    theme: { bg: "#0a0502", ivory: "#f7ecdf", gold: "#d97b3f", frost: "#e8ab7a", steel: "#9c7656" },
  },
  {
    // A rocky, potentially habitable world in the TRAPPIST-1 system —
    // packed so tightly with neighboring planets that they'd loom in its sky.
    id: "trappist-1e",
    name: "TRAPPIST-1e",
    distance: "40 light-years away",
    top: 5300,
    side: "left",
    offset: "3%",
    size: 9,
    theme: { bg: "#05050a", ivory: "#e8e9f5", gold: "#8f9bff", frost: "#c3c9ff", steel: "#8890b3" },
  },
  {
    // A "Hycean" candidate — a thick hydrogen atmosphere over a possible
    // global ocean. In 2023, its atmosphere showed a possible biosignature gas.
    id: "k2-18b",
    name: "K2-18b",
    distance: "124 light-years away",
    top: 5900,
    side: "right",
    offset: "4%",
    size: 10,
    theme: { bg: "#030a07", ivory: "#eef7ea", gold: "#b8c96a", frost: "#6fd6a0", steel: "#7f9c85" },
  },
];
