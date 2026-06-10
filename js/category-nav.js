(function () {
  const targets = {
    creative: "#nature",
    business: "#business",
  };

  const buttons = document.querySelectorAll(".hero-category[data-scroll]");
  if (!buttons.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let comingSoonTimer = null;

  function setView(key) {
    if (key === "business") {
      document.body.classList.add("view-business");
    } else {
      document.body.classList.remove("view-business");
    }

    buttons.forEach(function (btn) {
      btn.classList.toggle(
        "is-active",
        btn.getAttribute("data-scroll") === key
      );
    });

    const seeBtn = document.getElementById("see-possible");
    if (seeBtn) {
      seeBtn.href = key === "business" ? "#business" : "#nature";
    }
  }

  function clearComingSoon() {
    document.querySelectorAll(".hero-coming-soon-pop, .hero-coming-soon-pellets").forEach(function (el) {
      el.remove();
    });
    document.querySelectorAll(".hero-category.is-soon-wiggle").forEach(function (btn) {
      btn.classList.remove("is-soon-wiggle");
    });
    if (comingSoonTimer) {
      clearTimeout(comingSoonTimer);
      comingSoonTimer = null;
    }
  }

  function showComingSoon(button) {
    const key = button.getAttribute("data-scroll");
    clearComingSoon();

    const pop = document.createElement("div");
    pop.className = "hero-coming-soon-pop hero-coming-soon-pop--" + key;
    pop.setAttribute("role", "status");
    pop.setAttribute("aria-live", "polite");
    pop.innerHTML = '<span class="hero-coming-soon-text">coming soon</span>';
    document.body.appendChild(pop);

    const pellets = document.createElement("div");
    pellets.className = "hero-coming-soon-pellets hero-coming-soon-pellets--" + key;
    pellets.setAttribute("aria-hidden", "true");
    pellets.innerHTML = "<span></span><span></span><span></span>";
    document.body.appendChild(pellets);

    void button.offsetWidth;
    button.classList.add("is-soon-wiggle");

    const rect = button.getBoundingClientRect();
    const popRect = pop.getBoundingClientRect();
    const left = Math.max(
      12,
      Math.min(rect.left + rect.width / 2 - popRect.width / 2, window.innerWidth - popRect.width - 12)
    );
    const top = Math.max(12, rect.top - popRect.height - 10);

    pop.style.left = left + "px";
    pop.style.top = top + "px";
    pellets.style.left = rect.left + rect.width / 2 + "px";
    pellets.style.top = rect.top + rect.height / 2 + "px";

    comingSoonTimer = window.setTimeout(function () {
      pop.classList.add("is-out");
      pellets.classList.add("is-out");
      window.setTimeout(clearComingSoon, reduceMotion ? 0 : 320);
    }, reduceMotion ? 1200 : 2200);
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const key = button.getAttribute("data-scroll");
      if (!key) return;

      if (button.hasAttribute("data-coming-soon")) {
        showComingSoon(button);
        return;
      }

      const selector = targets[key];
      if (!selector) return;

      setView(key);

      if (key === "business") return;

      const section = document.querySelector(selector);
      if (!section) return;

      section.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  });
})();
