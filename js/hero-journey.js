(function () {
  const btn = document.getElementById("see-possible");
  const hero = document.querySelector(".ride-start");
  const next = document.getElementById("nature");
  if (!btn || !hero || !next) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function scrollNext() {
    next.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  btn.addEventListener("click", function (e) {
    if (reduceMotion) return;

    e.preventDefault();
    if (hero.classList.contains("is-journey")) return;

    hero.classList.add("is-journey");
    btn.setAttribute("aria-busy", "true");

    (async function () {
      hero.classList.add("is-lightning");
      await wait(750);

      hero.classList.remove("is-lightning");
      hero.classList.add("is-bw");
      await wait(2400);

      hero.classList.add("is-space");
      hero.classList.remove("is-bw");
      await wait(10000);

      hero.classList.remove("is-space");
      await wait(900);

      hero.classList.remove("is-journey");
      btn.removeAttribute("aria-busy");
      scrollNext();
    })();
  });
})();
