const handleStart = (e) => {
  const img = e.target;

  // gets x-coordinates to determine swipe direction
  const startX = e.changedTouches[0].clientX;
  const handleEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    // uses LIFO to handle swiping back and forth through images
    if (endX < startX && preLoadedImages.length > 0) {
      img.replaceWith(preLoadedImages.shift());
      viewedImages.push(img);
    } else if (endX > startX && viewedImages.length > 0) {
      img.replaceWith(viewedImages.pop());
      preLoadedImages.unshift(img);
    }

    // prevents piling of events
    img.removeEventListener("touchend", handleEnd);
  };

  img.addEventListener("touchend", handleEnd);
};

const viewedImages = [];

const img = document.querySelector(".slideshow-img");

if (img.complete) {
  img.addEventListener("touchstart", handleStart);
} else {
  img.addEventListener("load", () => {
    img.addEventListener("touchstart", handleStart);
  });
}

const imageFiles = ["../images/_DSC8151.JPG", "../images/_DSC8161.JPG"];

const preLoadedImages = imageFiles.map((file) => {
  const img = new Image();
  img.src = file;
  img.className = "carousel";
  img.width = "750";
  img.height = "500";

  return img;
});

preLoadedImages.forEach((img) => {
  img.addEventListener("load", () => {
    img.addEventListener("touchstart", handleStart);
  });
});
