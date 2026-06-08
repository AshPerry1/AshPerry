(function () {
  const sections = document.querySelectorAll(".showcase");
  const counter = document.getElementById("current-section");
  const dotsWrap = document.getElementById("scroll-dots");
  if (!sections.length || !counter) return;

  sections.forEach(function (section, i) {
    const dot = document.createElement("a");
    dot.href = "#" + (section.id || "");
    dot.className = "scroll-dot";
    dot.setAttribute("aria-label", section.dataset.name || "Section " + (i + 1));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll(".scroll-dot");

  function setActive(index) {
    const num = String(index + 1).padStart(2, "0");
    counter.textContent = num;
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === index);
    });
    document.body.dataset.activeSection = sections[index].dataset.name || "";
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            const idx = Array.from(sections).indexOf(entry.target);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: [0.45, 0.6] }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    setActive(0);
  }
})();
