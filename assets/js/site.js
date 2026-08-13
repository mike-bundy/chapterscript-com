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
})();
