$(document).ready(function () {
  $("#skip-link").on("click keydown", function (e) {
    if (e.type === "keydown" && e.which !== 13) {
      return;
    }

    e.preventDefault();
    var target = $("#main");
    target.attr("tabindex", "-1");
    target.focus();
  });
});
