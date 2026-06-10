(function () {
  const sections = document.querySelectorAll(".ride");
  const titles = [
    "Ash Perry | Custom Websites",
    "Isola — Luxury Hospitality by Ash Perry",
    "DEUX — Play Your Last Card",
    "Northline — Strategy That Ships",
    "ATELIER — Form Follows Intent",
    "Ash Perry — Get In Touch",
    "Meridian Voyages — Luxury Travel",
  ];

  if (!sections.length) return;

  function setActive(index) {
    const section = sections[index];
    const id = section.id || "start";

    document.body.dataset.chapter = id;

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
  }

  setActive(0);
})();
