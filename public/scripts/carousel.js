const handleStart = (e) => {
  const startX = e.clientX;
  const img = e.target;

  const handleEnd = (e) => {
    const endX = e.clientX;
    const scrollSensitivity = 50;
    const scrollDistance = startX - endX;

    // uses LIFO to handle swiping back and forth through images
    if (scrollDistance > scrollSensitivity && preLoadedImages.length > 0) {
      img.replaceWith(preLoadedImages.shift());
      viewedImages.push(img);
    } else if (scrollDistance < -scrollSensitivity && viewedImages.length > 0) {
      img.replaceWith(viewedImages.pop());
      preLoadedImages.unshift(img);
    }

    // prevents event piling
    img.removeEventListener("pointerup", handleEnd);
  };

  img.addEventListener("pointerup", handleEnd);
};

const createBubbles = (fileLength) => {
  const bubbleContainer = document.querySelector(".bubble-container");

  let counter = 0;

  while (counter <= fileLength) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubbleContainer.appendChild(bubble);

    counter++;
  }
};

const viewedImages = [];
const imageFiles = ["../images/_DSC8151.JPG", "../images/_DSC8161.JPG"];
const img = document.querySelector(".slideshow-img");

if (img.complete) {
  img.addEventListener("pointerdown", handleStart);
} else {
  img.addEventListener("load", () => {
    img.addEventListener("pointerdown", handleStart);
  });
}

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
    img.addEventListener("pointerdown", handleStart);
  });
});

createBubbles(imageFiles.length);
