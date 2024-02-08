const imageFiles = ["../images/_DSC8161.JPG"];

const preLoadImg = (file) => {
  const img = new Image();
  img.src = file;
  img.className = "carousel";

  return img;
};

const preLoadedImg = preLoadImg(imageFiles[0]);

const handleStart = (e) => {
  const img = e.target;
  const startX = e.changedTouches[0].clientX;

  const handleEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (endX < startX) {
      console.log("swiped right");
      img.replaceWith(preLoadedImg);
      preLoadedImg.addEventListener("touchstart", handleStart);
    } else if (endX > startX) {
      console.log("swiped left");
    }

    // removes event listener to prevent build up of "touchend" events
    img.removeEventListener("touchend", handleEnd);
  };

  img.addEventListener("touchend", handleEnd);
};

const img = document.querySelector(".slideshow-img");
img.addEventListener("touchstart", handleStart);
