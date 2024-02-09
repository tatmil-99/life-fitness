const viewedImages = ["../images/_DSC8166.JPG"];

const imageFiles = ["../images/_DSC8151.JPG", "../images/_DSC8161.JPG"];

const preLoadImg = (file) => {
  const img = new Image();
  img.src = file;
  img.className = "carousel";
  img.width = "750";
  img.height = "500";

  return img;
};

const handleStart = (e) => {
  let file = imageFiles.length - 1;
  const preLoadedImg = preLoadImg(imageFiles[file]);
  const img = e.target;

  const startX = e.changedTouches[0].clientX;
  const handleEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    // swipe right and replace img if files are available
    if (endX < startX && file !== -1) {
      img.replaceWith(preLoadedImg);
      viewedImages.push(imageFiles.pop());

      preLoadedImg.addEventListener("touchstart", handleStart);

      console.log("viewed images: ", viewedImages);
      console.log("image files left: ", imageFiles);
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
