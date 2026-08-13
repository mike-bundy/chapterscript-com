/* chapterscript.com — progressive enhancement only.
   Everything on the page is visible and usable with this file absent. */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Nav border on scroll */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Reveal on scroll. Enabled only when motion is allowed and
     IntersectionObserver exists; otherwise content stays visible. */
  if (!reduced && "IntersectionObserver" in window) {
    docEl.classList.add("reveal-enabled");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  }

  /* Hero terminal line: typed character by character when motion is allowed.
     The full text is in the markup, so no-JS and reduced-motion visitors
     simply see it complete. */
  var typed = document.querySelector(".hero-term .typed");
  if (typed && !reduced) {
    var full = typed.textContent;
    typed.textContent = "";
    var i = 0;
    var tick = function () {
      typed.textContent = full.slice(0, ++i);
      if (i < full.length) setTimeout(tick, 34);
    };
    setTimeout(tick, 500);
  }
})();
