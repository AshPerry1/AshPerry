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

  function scrollTo(selector) {
    const section = document.querySelector(selector);
    if (!section) return;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  function scrollCreative() {
    scrollTo("#nature");
  }

  async function runBusinessStair() {
    if (hero.classList.contains("is-biz-stair")) return;

    hero.classList.add("is-biz-stair");
    btn.setAttribute("aria-busy", "true");

    await wait(800);
    await wait(3000);

    hero.classList.remove("is-biz-stair");
    hero.classList.add("is-biz-stair-reset");
    await wait(650);

    hero.classList.remove("is-biz-stair-reset");
    btn.removeAttribute("aria-busy");
    scrollTo("#business");
  }

  btn.addEventListener("click", function (e) {
    if (document.body.classList.contains("view-business")) {
      if (reduceMotion) {
        scrollTo("#business");
        return;
      }

      e.preventDefault();
      runBusinessStair();
      return;
    }

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
      await wait(650);

      hero.classList.add("is-space");
      hero.classList.remove("is-bw");
      await wait(10000);

      hero.classList.remove("is-space");
      await wait(1200);

      hero.classList.remove("is-journey");
      btn.removeAttribute("aria-busy");
      scrollCreative();
    })();
  });
})();
