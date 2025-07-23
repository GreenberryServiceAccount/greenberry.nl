function initScrollAnimations() {
  $("[lines-slide-up]").each(function () {
    const parent = $(this);
    let allElementsToAnimate = [];
    const targets = parent.children().length > 0 ? parent.children() : parent;

    targets.each(function () {
      const el = $(this);
      if (el.is("[text-split]")) {
        new SplitType(el[0], { types: "lines", tagName: "span" });
        allElementsToAnimate.push(...el.find(".line").toArray());
      } else {
        allElementsToAnimate.push(el[0]);
      }
    });

    if (allElementsToAnimate.length === 0) return;

    const tl = gsap.timeline({ paused: true });
    tl.from(allElementsToAnimate, {
      opacity: 0,
      yPercent: 25,
      duration: 0.6,
      ease: "power2.out",
      stagger: { each: 0.1 },
    });

    ScrollTrigger.create({
      trigger: parent[0],
      start: "top bottom",
      invalidateOnRefresh: true,
      onLeaveBack: () => {
        tl.progress(0);
        tl.pause();
      },
    });

    ScrollTrigger.create({
      trigger: parent[0],
      start: "top 60%",
      invalidateOnRefresh: true,
      onEnter: () => tl.play(),
    });
  });

  gsap.set("[text-split]", { opacity: 1 });
}
