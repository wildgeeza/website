document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".breakdown-image"));

  if (!images.length) {
    return;
  }

  const hasMultipleImages = images.length > 1;
  let currentIndex = 0;
  let isOpen = false;

  const overlay = document.createElement("div");
  overlay.className = "breakdown-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  if (hasMultipleImages) {
    overlay.classList.add("has-navigation");
  }

  const overlayFigure = document.createElement("figure");
  overlayFigure.className = "breakdown-overlay-figure";

  const overlayImage = document.createElement("img");

  const overlayCaption = document.createElement("figcaption");
  overlayCaption.className = "breakdown-overlay-caption";

  overlayFigure.append(overlayImage, overlayCaption);

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "breakdown-overlay-nav prev";
  previousButton.setAttribute("aria-label", "Previous image");
  previousButton.textContent = "\u2039";

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "breakdown-overlay-nav next";
  nextButton.setAttribute("aria-label", "Next image");
  nextButton.textContent = "\u203A";

  overlay.append(previousButton, overlayFigure, nextButton);
  document.body.appendChild(overlay);

  const showImage = (index) => {
    currentIndex = (index + images.length) % images.length;
    const image = images[currentIndex];
    overlayImage.src = image.src;
    overlayImage.alt = image.alt;

    const container = image.parentElement;
    const heading = container ? container.querySelector("h5") : null;
    const caption = container ? container.querySelector(".caption") : null;
    const headingText = heading ? heading.textContent.trim() : "";
    const captionText = caption ? caption.textContent.trim() : "";

    overlayCaption.textContent = "";

    if (headingText) {
      const title = document.createElement("strong");
      title.className = "breakdown-overlay-title";
      title.textContent = headingText;
      overlayCaption.append(title);
    }

    if (captionText) {
      const text = document.createElement("span");
      text.className = "breakdown-overlay-text";
      text.textContent = captionText;
      overlayCaption.append(text);
    }

    overlayCaption.hidden = !headingText && !captionText;
  };

  const openOverlay = (index) => {
    showImage(index);
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    isOpen = true;
  };

  const closeOverlay = () => {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    isOpen = false;
  };

  images.forEach((image, index) => {
    image.addEventListener("click", () => openOverlay(index));
  });

  previousButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImage(currentIndex + 1);
  });

  overlayFigure.addEventListener("click", (event) => event.stopPropagation());
  overlay.addEventListener("click", closeOverlay);

  document.addEventListener("keydown", (event) => {
    if (!isOpen) {
      return;
    }

    if (event.key === "Escape") {
      closeOverlay();
    } else if (hasMultipleImages && event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    } else if (hasMultipleImages && event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }
  });
});
