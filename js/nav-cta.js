(function () {
  const btn = document.querySelector(".btn-nav-cta");
  const typeEl = btn && btn.querySelector(".nav-cta-type");
  if (!typeEl || !btn) return;

  const phrase = "Let's Talk";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    typeEl.textContent = phrase;
    typeEl.classList.remove("is-typing");
    return;
  }

  let i = 0;
  const totalMs = 980;
  const perChar = Math.max(45, totalMs / phrase.length);

  function tick() {
    if (i <= phrase.length) {
      typeEl.textContent = phrase.slice(0, i);
      i += 1;
      setTimeout(tick, perChar);
    } else {
      typeEl.textContent = phrase;
      typeEl.classList.remove("is-typing");
    }
  }

  typeEl.classList.add("is-typing");
  tick();
})();
