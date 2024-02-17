const handleStart = (e) => {
  const img = e.target;
  const startX = e.changedTouches[0].clientX;
  
  // use x-coordinates to determine swipe direction
  const handleEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (endX < startX) {
      img.replaceWith(preLoadedImages.shift());
      viewedImages.unshift(img)
    } else if (endX > startX) {
      img.replaceWith(viewedImages.shift());
      preLoadedImages.unshift(img);
    }

    img.removeEventListener("touchend", handleEnd); // prevent piling of events
  };

  img.addEventListener("touchend", handleEnd);
};


const viewedImages = [];

const img = document.querySelector(".slideshow-img");
img.addEventListener("touchstart", handleStart);

const imageFiles = [
  "../images/_DSC8151.JPG",
  "../images/_DSC8161.JPG",
];

const preLoadedImages = imageFiles.map(file => {
  const img = new Image();
  img.src = file;
  img.className = "carousel";
  img.width = "750";
  img.height = "500";

  return img;
});

preLoadedImages.forEach(img => {
  img.addEventListener("touchstart", handleStart)
});
