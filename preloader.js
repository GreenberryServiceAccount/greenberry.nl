// detect Safari (not Chrome/Android)
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const preloader = document.querySelector(".preloader");
const firstVisit = !sessionStorage.getItem("preloaderShown");

// if Safari, just hide it and bail
if (isSafari && preloader && firstVisit) {
  gsap.set(".preloader", {
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none"
  });
  document.body.classList.remove("loading");
  sessionStorage.setItem("preloaderShown", "true");

  gsap.set(
      [
        ".page-transition-background",
        ".page-transition-circle-entrance",
        ".transition",
      ],
      { opacity: 0 }
    );

    gsap.delayedCall(4, () => {
      if (typeof initScrollAnimations === "function") {
        initScrollAnimations();
      }
    });
} else {
  // your original logic

  if (firstVisit && preloader) {
    sessionStorage.setItem("preloaderShown", "true");

    // 🔸 Fade out + cleanup
    gsap.delayedCall(4, () => {
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
    gsap.delayedCall(4, () => {
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
}
