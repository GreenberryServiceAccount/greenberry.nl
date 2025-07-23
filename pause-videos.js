(function () {
  const pauseButtons = document.querySelectorAll(".pause-button");
  let isPaused = sessionStorage.getItem("videosPaused") === "true";

  // Handle button and video container UI state
  function updateUI() {
    pauseButtons.forEach((button) => {
      const pauseIcon = button.querySelector(".pause-icon");
      const playIcon = button.querySelector(".play-icon");
      if (pauseIcon && playIcon) {
        pauseIcon.style.display = isPaused ? "none" : "block";
        playIcon.style.display = isPaused ? "block" : "none";
      }
    });

    // Fade containers that should react to pause state
    const containers = document.querySelectorAll("#pauseVideo");
    containers.forEach((container) => {
      if (isPaused) {
        container.classList.add("faded");
      } else {
        container.classList.remove("faded");
      }
    });
  }

  // Pause/play all videos and mute if paused
  function updateAllVideos() {
    const containers = document.querySelectorAll("#pauseVideo");

    containers.forEach((container) => {
      const video = container.querySelector("video");
      if (!video) return;

      // Handle already loaded videos
      if (video.readyState >= 2) {
        if (isPaused) {
          video.pause();
          video.muted = true;
        } else {
          video.play().catch(() => {});
        }
      } else {
        // If video not ready, wait until it's loaded
        video.addEventListener(
          "loadedmetadata",
          () => {
            if (isPaused) {
              video.pause();
              video.muted = true;
            } else {
              video.play().catch(() => {});
            }
          },
          { once: true }
        );
      }
    });

    // Update mute buttons and icons globally
    const zoomContainers = document.querySelectorAll(".zoomcontainer");
    zoomContainers.forEach((container) => {
      const video = container.querySelector("video");
      const muteButton = container.querySelector(".mute-button");
      const muteIcon = container.querySelector(".mute-icon");
      const unmuteIcon = container.querySelector(".unmute-icon");

      if (!video || !muteButton || !muteIcon || !unmuteIcon) return;

      if (isPaused) {
        muteButton.style.display = "none";
        muteIcon.style.display = "none";
        unmuteIcon.style.display = "block";
      } else {
        muteButton.style.display = "block";
        muteIcon.style.display = video.muted ? "none" : "block";
        unmuteIcon.style.display = video.muted ? "block" : "none";
      }
    });
  }

  // Initial setup
  updateUI();
  updateAllVideos();

  // Bind toggle to all pause buttons
  pauseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      isPaused = !isPaused;
      sessionStorage.setItem("videosPaused", isPaused);
      updateUI();
      updateAllVideos();
    });
  });
})();
