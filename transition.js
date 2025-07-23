// Check of de preloader al is getoond
const preloaderShown = sessionStorage.getItem("preloaderShown") === "true";

// Set beginwaarden
gsap.set(
  [
    ".page-transition-background",
    ".page-transition-circle-entrance",
    ".transition",
  ],
  { opacity: 1 }
);
gsap.set(".page-transition-circle-exit", { opacity: 0 });

// Verberg transitions bij back/forward navigatie
window.addEventListener("pageshow", (event) => {
  const navType = performance.getEntriesByType("navigation")[0]?.type;
  if (event.persisted || navType === "back_forward") {
    gsap.set(
      [
        ".transition",
        ".page-transition-circle-entrance",
        ".page-transition-background",
      ],
      { opacity: 0 }
    );
  }
});

// Lees klikpositie uit sessionStorage (voor entrance animatie)
const entrancePos = sessionStorage.getItem("transitionClickPos");
if (entrancePos) {
  const { x, y } = JSON.parse(entrancePos);
  gsap.set(".page-transition-circle-entrance", {
    x: x,
    y: y,
  });
  sessionStorage.removeItem("transitionClickPos");
}

// SPEEL GEEN ENTRANCE TRANSITION ALS PRELOADER NOG NIET GETOOND IS
if (preloaderShown) {
  // Entrance animatie
  gsap.fromTo(
    ".page-transition-circle-entrance",
    { scale: 0 },
    {
      scale: 1,
      duration: 1,
      ease: "power3.inOut",
    }
  );

  // Start animatie
  gsap.fromTo(
    ".transition",
    { opacity: 1 },
    {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      ease: "power3.inOut",
    }
  );

  // Trigger scroll animation na transition
  setTimeout(() => {
    if (typeof initScrollAnimations === "function") {
      initScrollAnimations();
    }
  }, 600);
}

// Click handler voor exit transition
$(document).ready(() => {
  $("a").on("click", function (e) {
    const $link = $(this);
    const sameHost = $link.prop("hostname") === window.location.host;
    const noAnchor = $link.attr("href").indexOf("#") === -1;
    const notBlank = $link.attr("target") !== "_blank";

    if (sameHost && noAnchor && notBlank) {
      e.preventDefault();
      const destination = $link.attr("href");

      // Bereken klikpositie
      const clickX = e.clientX;
      const clickY = e.clientY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const offsetX = clickX - vw / 2;
      const offsetY = clickY - vh / 2;

      // Sla klikpositie op voor entrance
      sessionStorage.setItem(
        "transitionClickPos",
        JSON.stringify({ x: offsetX, y: offsetY })
      );

      // Zet de exit circle op klikpositie
      gsap.set(".page-transition-circle-exit", {
        x: offsetX,
        y: offsetY,
      });

      // Zet opaciteit voor exit transition
      gsap.set(
        [".page-transition-circle-entrance", ".page-transition-background"],
        { opacity: 0 }
      );
      gsap.set([".page-transition-circle-exit", ".transition"], { opacity: 1 });

      // Start exit animatie
      gsap.fromTo(
        ".page-transition-circle-exit",
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            window.location = destination;
          },
        }
      );
    }
  });
});
