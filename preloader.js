const firstVisit = !sessionStorage.getItem("preloaderShown");
const preloader = document.querySelector(".preloader");

if (firstVisit && preloader) {
  sessionStorage.setItem("preloaderShown", "true");

  // 🔸 Fade out + cleanup
  gsap.delayedCall(3.25, () => {
    gsap.to(".preloader-background", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(".preloader", {
          visibility: "hidden",
          pointerEvents: "none",
        });
        document.body.classList.remove("loading");
      },
    });
  });

  gsap.set(
    [
      ".page-transition-background",
      ".page-transition-circle-entrance",
      ".transition",
    ],
    { opacity: 0 }
  );

  // 🔸 Scrolltrigger iets eerder
  gsap.delayedCall(3.25, () => {
    if (typeof initScrollAnimations === "function") {
      initScrollAnimations();
    }
  });
} else {
  // 🔸 Niet eerste bezoek → direct verbergen
  gsap.set(".preloader", {
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
  });
  document.body.classList.remove("loading");
}
