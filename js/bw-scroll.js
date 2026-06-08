(function () {
  const section = document.getElementById("bw");
  const fill = document.querySelector(".bw-outline-fill");
  if (!section || !fill) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colors = ["#ffe600", "#1a00ff", "#39ff14", "#ff6ec7"];

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function mix(a, b, t) {
    const c1 = hexToRgb(a);
    const c2 = hexToRgb(b);
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    const bVal = Math.round(c1[2] + (c2[2] - c1[2]) * t);
    return "rgb(" + r + ", " + g + ", " + bVal + ")";
  }

  function colorAt(progress) {
    const scaled = progress * colors.length;
    const index = Math.min(Math.floor(scaled), colors.length - 1);
    const next = Math.min(index + 1, colors.length - 1);
    const t = scaled - index;
    return mix(colors[index], colors[next], t);
  }

  function update() {
    if (reduceMotion) {
      fill.style.background = colors[0];
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
    const progress = scrolled / scrollable;
    fill.style.background = colorAt(progress);
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
