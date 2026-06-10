(function () {
  const targets = {
    creative: "#nature",
    business: "#business",
    personal: "#contact",
    portfolio: "#contact",
    about: "#contact",
  };

  const buttons = document.querySelectorAll(".hero-category[data-scroll]");
  if (!buttons.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const key = button.getAttribute("data-scroll");
      const selector = targets[key];
      if (!selector) return;

      setView(key);

      const section = document.querySelector(selector);
      if (!section) return;

      section.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  });
})();
