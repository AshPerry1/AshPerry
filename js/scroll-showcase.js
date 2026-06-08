(function () {
  const sections = document.querySelectorAll(".ride");
  const dotsWrap = document.getElementById("scroll-dots");
  const titles = [
    "Ash Perry | Custom Websites",
    "Verdant — Rooted in Ritual",
    "sidequest — Your Table. Your Rules.",
    "Northline — Strategy That Ships",
    "ATELIER — Form Follows Intent",
    "Ash Perry — Let's Build Your Site",
  ];

  if (!sections.length || !dotsWrap) return;

  sections.forEach(function (section, i) {
    const dot = document.createElement("a");
    dot.href = "#" + (section.id || "");
    dot.className = "scroll-dot";
    dot.setAttribute("aria-label", section.dataset.name || "Section " + (i + 1));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll(".scroll-dot");

  function setActive(index) {
    const section = sections[index];
    const id = section.id || "start";

    document.body.dataset.chapter = id;

    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === index);
    });

    if (titles[index]) {
      document.title = titles[index];
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = Array.from(sections).indexOf(entry.target);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: [0.5, 0.65] }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    setActive(0);
  }

  setActive(0);
})();
