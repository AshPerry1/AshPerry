(function () {
  const STORAGE_KEY = "ash_visitor_id";
  const FONT_LINK_ID = "ash-visitor-font";

  const FONT_PAIRS = [
    { body: "Inter", display: "Inter" },
    { body: "Outfit", display: "Outfit" },
    { body: "DM Sans", display: "DM Sans" },
    { body: "Manrope", display: "Manrope" },
    { body: "Plus Jakarta Sans", display: "Plus Jakarta Sans" },
    { body: "Sora", display: "Sora" },
    { body: "Space Grotesk", display: "Space Grotesk" },
    { body: "Figtree", display: "Fraunces" },
    { body: "Nunito Sans", display: "Nunito Sans" },
    { body: "Rubik", display: "Rubik" },
  ];

  const MESH_STYLES = ["aurora", "prism", "orbit", "pulse"];

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function createRng(seed) {
    let s = seed >>> 0;
    return function next() {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function pick(rng, list) {
    return list[Math.floor(rng() * list.length)];
  }

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function hsl(h, s, l) {
    return "hsl(" + h + " " + s + "% " + l + "%)";
  }

  function getVisitorId() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("shuffle") === "1") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
    }

    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) return existing;
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : "v-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 11);
      localStorage.setItem(STORAGE_KEY, id);
      return id;
    } catch (_) {
      return "session-" + hashString(navigator.userAgent + "|" + screen.width);
    }
  }

  function buildTheme(visitorId) {
    const rng = createRng(hashString(visitorId));
    const hue = Math.floor(rng() * 360);
    const hue2 = (hue + 40 + Math.floor(rng() * 80)) % 360;
    const hue3 = (hue + 120 + Math.floor(rng() * 60)) % 360;
    const gradAngle = Math.floor(90 + rng() * 120);
    const gradTextAngle = Math.floor(70 + rng() * 50);
    const sat = 58 + Math.floor(rng() * 28);
    const satSoft = sat - 12;
    const fonts = pick(rng, FONT_PAIRS);
    const mesh = pick(rng, MESH_STYLES);
    const layout = pick(rng, ["airy", "balanced", "compact"]);
    const radius = Math.round(12 + rng() * 14);
    const accentL = 42 + Math.floor(rng() * 8);
    const accentHoverL = accentL - 6;

    const c1 = hsl(hue, sat, 38);
    const c2 = hsl(hue2, sat, 42);
    const c3 = hsl((hue + hue2) / 2, satSoft, 48);
    const c4 = hsl(hue3, sat, 52);

    return {
      id: visitorId,
      shortId: visitorId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase() || "GUEST",
      hue,
      mesh,
      layout,
      fonts,
      radius,
      brandAccent: hsl(hue3, sat + 6, accentL),
      brandAccentHover: hsl(hue3, sat + 6, accentHoverL),
      brandBlue: hsl(hue3, sat, 52),
      brandGreen: hsl(hue, sat, 40),
      brandMuted: hsl(hue2, satSoft, 42),
      gradBrand:
        "linear-gradient(" +
        gradAngle +
        "deg, " +
        c1 +
        " 0%, " +
        c2 +
        " 38%, " +
        c3 +
        " 68%, " +
        c4 +
        " 100%)",
      gradBrandText:
        "linear-gradient(" +
        gradTextAngle +
        "deg, " +
        c1 +
        " 0%, " +
        c2 +
        " 36%, " +
        c3 +
        " 72%, " +
        c4 +
        " 100%)",
      meshA: hsl(hue, sat, 88),
      meshB: hsl(hue2, satSoft, 90),
      meshC: hsl(hue3, sat - 10, 92),
      canvasTint: hsl(hue, 18, 99),
      shadowHue: hue3,
    };
  }

  function loadFonts(theme) {
    const families = new Set([theme.fonts.body, theme.fonts.display]);
    const familyParam = Array.from(families)
      .map(function (f) {
        return "family=" + encodeURIComponent(f).replace(/%20/g, "+") + ":wght@400;500;600;700;800";
      })
      .join("&");
    const href =
      "https://fonts.googleapis.com/css2?" + familyParam + "&display=swap";
    let link = document.getElementById(FONT_LINK_ID);
    if (!link) {
      link = document.createElement("link");
      link.id = FONT_LINK_ID;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = href;
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const shellY =
      theme.layout === "airy"
        ? "clamp(5.5rem, 13vw, 9.25rem)"
        : theme.layout === "compact"
          ? "clamp(3.75rem, 9vw, 6.5rem)"
          : "clamp(4.85rem, 12vw, 8.5rem)";

    root.style.setProperty("--brand-accent", theme.brandAccent);
    root.style.setProperty("--brand-accent-hover", theme.brandAccentHover);
    root.style.setProperty("--brand-blue", theme.brandBlue);
    root.style.setProperty("--brand-green", theme.brandGreen);
    root.style.setProperty("--grad-brand", theme.gradBrand);
    root.style.setProperty("--grad-brand-text", theme.gradBrandText);
    root.style.setProperty("--radius", theme.radius + "px");
    root.style.setProperty("--canvas-white", theme.canvasTint);
    root.style.setProperty("--bg", theme.canvasTint);
    root.style.setProperty("--surface", theme.canvasTint);
    root.style.setProperty("--surface-soft", theme.canvasTint);
    root.style.setProperty("--visitor-mesh-a", theme.meshA);
    root.style.setProperty("--visitor-mesh-b", theme.meshB);
    root.style.setProperty("--visitor-mesh-c", theme.meshC);
    root.style.setProperty("--visitor-shadow", "hsla(" + theme.shadowHue + ", 45%, 42%, 0.09)");
    root.style.setProperty("--shell-y", shellY);
    root.style.setProperty(
      "--font-body",
      '"' + theme.fonts.body + '", Inter, system-ui, sans-serif'
    );
    root.style.setProperty(
      "--font-display",
      '"' + theme.fonts.display + '", Inter, system-ui, sans-serif'
    );

    root.dataset.visitor = "1";
    root.dataset.visitorMesh = theme.mesh;
    root.dataset.visitorLayout = theme.layout;
    root.dataset.visitorId = theme.shortId;

    document.body.style.fontFamily = "var(--font-body)";
    loadFonts(theme);
  }

  function mountFlair(theme) {
    if (document.querySelector(".visitor-flair")) return;

    const flair = document.createElement("aside");
    flair.className = "visitor-flair";
    flair.setAttribute("aria-label", "Your unique site palette");
    flair.innerHTML =
      '<button type="button" class="visitor-flair-toggle" aria-expanded="false">' +
      '<span class="visitor-flair-swatch" aria-hidden="true"></span>' +
      '<span class="visitor-flair-label">Your view</span>' +
      "</button>" +
      '<div class="visitor-flair-panel" hidden>' +
      "<p class=\"visitor-flair-title\">Built for you</p>" +
      "<p class=\"visitor-flair-copy\">Every visitor gets a one-of-one palette, type rhythm, and atmosphere. Yours is <strong>#" +
      theme.shortId +
      "</strong>.</p>" +
      '<p class="visitor-flair-meta">' +
      theme.fonts.display +
      " · " +
      theme.mesh +
      " · " +
      theme.layout +
      "</p>" +
      '<button type="button" class="visitor-flair-shuffle">Shuffle my palette</button>' +
      "</div>";

    document.body.appendChild(flair);

    const toggle = flair.querySelector(".visitor-flair-toggle");
    const panel = flair.querySelector(".visitor-flair-panel");
    const shuffle = flair.querySelector(".visitor-flair-shuffle");

    toggle.addEventListener("click", function () {
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    shuffle.addEventListener("click", function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
      window.location.href =
        window.location.pathname + "?shuffle=1" + window.location.hash;
    });

    const isHome =
      /index\.html$/.test(window.location.pathname) ||
      window.location.pathname.endsWith("/") ||
      window.location.pathname === "";
    if (isHome) {
      const hero = document.querySelector(".hero-v2-copy");
      if (hero && !document.querySelector(".visitor-hero-note")) {
        const note = document.createElement("p");
        note.className = "visitor-hero-note";
        note.textContent =
          "This page shaped itself for you — palette #" + theme.shortId + ".";
        const intro = hero.querySelector(".hero-intro-line");
        if (intro && intro.nextElementSibling) {
          hero.insertBefore(note, intro.nextElementSibling);
        } else {
          hero.prepend(note);
        }
      }
    }
  }

  const visitorId = getVisitorId();
  const theme = buildTheme(visitorId);
  applyTheme(theme);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      mountFlair(theme);
    });
  } else {
    mountFlair(theme);
  }
})();
