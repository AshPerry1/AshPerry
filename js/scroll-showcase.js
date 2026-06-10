(function () {
  const sections = document.querySelectorAll(".ride");
  const titles = {
    start: "Ash Perry | Custom Websites",
    business: "Meridian Voyages — Luxury Travel",
    cafe: "Lowtide — Bakery & Espresso",
    nature: "Isola — Luxury Hospitality by Ash Perry",
    deux: "DEUX — Play Your Last Card",
    clean: "Northline — Strategy That Ships",
    bw: "ATELIER — Form Follows Intent",
    contact: "Ash Perry — Get In Touch",
  };

  if (!sections.length) return;

  function setActive(section) {
    const id = section.id || "start";

    document.body.dataset.chapter = id;

    if (titles[id]) {
      document.title = titles[id];
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActive(entry.target);
          }
        });
      },
      { threshold: [0.5, 0.65] }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  setActive(sections[0]);
})();
