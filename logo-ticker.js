!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.ticker = e())
    : (t.ticker = e());
})(
  self,
  () => (
    $(document).ready(function () {
      $("[lumious-ticker]").each(function () {
        var t = $(this),
          e = t.css("flex-direction").startsWith("column"),
          i = "flex-end" === t.css("justify-content"),
          o = "false" !== t.attr("lumious-ticker-pause"),
          n = function () {
            var e = $(window).width();
            return e <= 478
              ? parseFloat(t.attr("lumious-ticker-speed-mobile")) ||
                  parseFloat(t.attr("lumious-ticker-speed")) ||
                  1
              : e <= 767 || e <= 991
              ? parseFloat(t.attr("lumious-ticker-speed-tablet")) ||
                parseFloat(t.attr("lumious-ticker-speed")) ||
                1
              : parseFloat(t.attr("lumious-ticker-speed")) || 1;
          },
          r = n(),
          s = r,
          a = 0,
          c = t.find("[lumious-ticker-content]");

        if (c.length < 2) {
          var clone = c.first().clone().appendTo(t);

          // ✅ Recolor SVGs in the clone
          clone.find(".recolor-svg").each(function () {
            recolorInlineSVG(this);
          });

          c = t.find("[lumious-ticker-content]");
        }

        requestAnimationFrame(function o() {
          var n = (s / (e ? t.height() : t.width())) * 100 * (1 / 60);
          a += i ? n : -n;
          c.each(function () {
            $(this).css(
              "transform",
              (e ? "translateY" : "translateX") + "(" + a + "%)"
            );
          });
          ((!i && a <= -100) || (i && a >= 100)) && (a = 0);
          requestAnimationFrame(o);
        });

        o &&
          t.hover(
            function () {
              s = 0;
            },
            function () {
              s = r;
            }
          );

        $(window).resize(function () {
          r = n();
          s = r;
        });
      });
    }),
    {}
  )
);
