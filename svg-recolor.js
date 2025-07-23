function recolorInlineSVG(container) {
  const img = container.querySelector("img");
  if (img && img.src.endsWith(".svg")) {
    fetch(img.src)
      .then((res) => res.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgEl = svgDoc.querySelector("svg");

        if (svgEl) {
          svgEl.querySelectorAll("[fill]").forEach((el) => {
            el.setAttribute("fill", "currentColor");
          });
          svgEl.setAttribute("fill", "currentColor");
          svgEl.removeAttribute("width");
          svgEl.removeAttribute("height");

          if (img.className) {
            svgEl.classList.add(...img.className.split(" "));
          }

          img.replaceWith(svgEl);
        }
      })
      .catch((err) => {
        console.error("Failed to inline SVG:", err);
      });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".recolor-svg").forEach((container) => {
    recolorInlineSVG(container);
  });
});
