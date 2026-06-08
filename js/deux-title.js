(function () {
  const section = document.getElementById("deux");
  const title = document.getElementById("deux-title");
  if (!section || !title) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    title.classList.add("is-played", "is-static");
    return;
  }

  function play() {
    title.classList.remove("is-played");
    void title.offsetWidth;
    title.classList.add("is-played");
  }

  if ("IntersectionObserver" in window) {
    let wasIn = false;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio >= 0.45) {
            if (!wasIn) {
              wasIn = true;
              play();
            }
          } else if (entry.intersectionRatio < 0.15) {
            wasIn = false;
            title.classList.remove("is-played");
          }
        });
      },
      { threshold: [0.15, 0.45] }
    );

    observer.observe(section);
  } else {
    play();
  }
})();
