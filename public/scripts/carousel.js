const preLoadImg = (file) => {
  const img = new Image();
  img.src = file;
  img.className = "carousel";
  img.width = "750";
  img.height = "500";

  return img;
};

const handleStart = (e) => {
  const img = e.target;

  const startX = e.changedTouches[0].clientX;
  const handleEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    // swipe right and replace img
    if (endX < startX && nextFile) {
      img.replaceWith(preLoadedImg);
      nextFile = imageFiles.pop();
      preLoadedImg = preLoadImg(nextFile);
      preLoadedImg.addEventListener("touchstart", handleStart);
    } else if (endX > startX) {
      img.replaceWith(prevImg);
    }
  };

  img.removeEventListener("touchend", handleEnd); // prevent piling of events
  img.addEventListener("touchend", handleEnd);
};

const imageFiles = [
  "../images/_DSC8166.JPG",
  "../images/_DSC8151.JPG",
  "../images/_DSC8161.JPG",
];

const viewedImages = ["../images/_DSC8166.JPG"];

let nextFile = imageFiles.pop();
let preLoadedImg = preLoadImg(nextFile);

const img = document.querySelector(".slideshow-img");
img.addEventListener("touchstart", handleStart);

preLoadedImg.addEventListener("touchstart", handleStart);
