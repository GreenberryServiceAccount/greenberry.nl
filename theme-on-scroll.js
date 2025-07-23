document.addEventListener("colorThemesReady", () => {
  $("[data-animate-theme-to]").each(function () {
    let theme = $(this).attr("data-animate-theme-to");
    let offset = $(this).attr("data-offset") || "0";

    let trigger = ScrollTrigger.create({
      trigger: this,
      start: `top+=${offset} center`,
      end: `bottom+=${offset} center`,
      markers: false,
      onToggle: ({ isActive }) => {
        if (isActive) {
          gsap.to("body", { ...colorThemes.getTheme(theme) });
        }
      },
    });

    let observer = new MutationObserver(() => {
      ScrollTrigger.refresh();
    });

    observer.observe(this, { attributes: true, attributeFilter: ["style"] });
  });
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

setTimeout(() => {
  ScrollTrigger.refresh();
}, 500);
