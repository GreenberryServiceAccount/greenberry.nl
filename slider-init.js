$(".slider-main_component").each(function (index) {
  const swiper = new Swiper($(this).find(".swiper")[0], {
    slidesPerView: "auto",
    spaceBetween: "1.5%", // Space between slides as percentage
    keyboard: true,
    mousewheel: false,
    navigation: {
      nextEl: $(this).find("#swiper-next")[0],
      prevEl: $(this).find("#swiper-prev")[0],
      disabledClass: "swiper-button-disabled",
    },
  });
});
