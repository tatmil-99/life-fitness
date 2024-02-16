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

  // use x-coordinates to determine swipe direction
  const startX = e.changedTouches[0].clientX;
  const handleEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    // display image if it has already been rendered
    if (endX < startX && imgIndex < viewedImages.length) {
      img.replaceWith(viewedImages[imgIndex]);
      imgIndex++;
    } else if (endX < startX && nextFile) {      
      img.replaceWith(preLoadedImg);
      viewedImages.push(preLoadedImg);
      
      nextFile = imageFiles.pop();
      preLoadedImg = preLoadImg(nextFile);
      preLoadedImg.addEventListener("touchstart", handleStart);
      
      imgIndex++;
    } else if (endX > startX && imgIndex > 0) {
      imgIndex--;
      img.replaceWith(viewedImages[imgIndex - 1]);
    }

    img.removeEventListener("touchend", handleEnd); // prevent piling of events
  };

  img.addEventListener("touchend", handleEnd);
};

const imageFiles = [
  "../images/_DSC8151.JPG",
  "../images/_DSC8161.JPG",
];
// how do i handle initially loaded img?
const viewedImages = [];
// index starts counting after first rendered image
// index will be "one-off"
let imgIndex = 0;

let nextFile = imageFiles.pop();
let preLoadedImg = preLoadImg(nextFile);


const img = document.querySelector(".slideshow-img");
img.addEventListener("touchstart", handleStart);

preLoadedImg.addEventListener("touchstart", handleStart);
