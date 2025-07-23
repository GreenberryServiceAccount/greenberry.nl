 // Only run the custom‐cursor code if viewport ≥ 992px
 if (window.matchMedia("(min-width: 992px)").matches) {
    (function () {
      // — Customizable defaults —
      var defaultColor = "#000";
      var defaultSize = 16;
      var hoverSelectors = [
        "a",
        "button",
        'input[type="button"]',
        'input[type="submit"]',
        'input[type="reset"]',
        "label",
        '[role="button"]',
        '[role="link"]',
        "[data-cursor-button]",
        "[data-cursor-label]",
      ];

      // — Build cursor DOM —
      var cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      var label = document.createElement("span");
      label.className = "cursor-label";
      cursor.appendChild(label);
      document.body.appendChild(cursor);

      // — Track the real mouse —
      var setX = gsap.quickSetter(cursor, "x", "px");
      var setY = gsap.quickSetter(cursor, "y", "px");
      document.addEventListener("mousemove", function (e) {
        setX(e.clientX);
        setY(e.clientY);
      });

      // — Reset back to the little dot —
      function resetToDot() {
        gsap.killTweensOf(cursor);
        gsap.killTweensOf(label);
        gsap.to(label, {
          duration: 0.2,
          opacity: 0,
          onComplete: function () {
            label.textContent = "";
          },
        });
        gsap.to(cursor, {
          duration: 0.3,
          ease: "power2.out",
          width: defaultSize,
          height: defaultSize,
          scale: 1,
          borderRadius: "50%",
          backgroundColor: defaultColor,
          opacity: 1,
          transformOrigin: "center center",
        });
      }

      // — Attach hover logic —
      var els = document.querySelectorAll(hoverSelectors.join(","));
      els.forEach(function (el) {
        el.addEventListener("mouseenter", function (e) {
          // stop any pending reset
          gsap.killTweensOf(cursor);
          gsap.killTweensOf(label);

          // prep label
          label.textContent = "";
          gsap.set(label, { opacity: 0, scale: 0.8 });

          var color = el.dataset.cursorColor || defaultColor;

          if (el.hasAttribute("data-cursor-label")) {
            // → LABEL variant
            var txt = el.getAttribute("data-cursor-label");
            label.textContent = txt;

            // measure + pad
            var rect = label.getBoundingClientRect();
            var pad = 40;
            var newW = rect.width + pad * 2;

            gsap.to(cursor, {
              duration: 0.2,
              ease: "power2.out",
              width: newW,
              height: 72,
              backgroundColor: color,
              borderRadius: "40rem",
              onComplete: function () {
                gsap.to(label, {
                  duration: 0.3,
                  opacity: 1,
                  scale: 1,
                  ease: "power2.out",
                });
              },
            });
          } else if (el.hasAttribute("data-cursor-button")) {
            // → BUTTON morph
            var r = el.getBoundingClientRect();
            gsap.to(cursor, {
              duration: 0.4,
              ease: "power2.out",
              x: r.left + r.width / 2,
              y: r.top + r.height / 2,
              width: r.width,
              height: r.height,
              borderRadius: "40rem",
              backgroundColor: "transparent",
              opacity: 1,
              transformOrigin: "center center",
            });
          } else {
            // → DEFAULT “grow dot”
            gsap.to(cursor, {
              duration: 0.3,
              ease: "power2.out",
              width: defaultSize,
              height: defaultSize,
              scale: 1.3,
              borderRadius: "40rem",
              backgroundColor: color,
              opacity: 1,
              transformOrigin: "center center",
            });
          }
        });

        el.addEventListener("mouseleave", function (e) {
          // if moving into another hover target, skip the reset
          if (
            e.relatedTarget &&
            hoverSelectors.some((sel) => e.relatedTarget.matches(sel))
          ) {
            return;
          }
          resetToDot();
        });
      });

      // — Initialize —
      resetToDot();
    })();
  }