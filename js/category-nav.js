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

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const key = button.getAttribute("data-scroll");
      const selector = targets[key];
      if (!selector) return;

      const section = document.querySelector(selector);
      if (!section) return;

      section.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  });
})();
