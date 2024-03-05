const createBubbles = (fileLength) => {
  const bubbleContainer = document.querySelector(".bubble-container");

  let counter = 0;

  // creates bubbles for all images **including** default
  while (counter <= fileLength) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.dataset.imgNum = counter;
    bubbleContainer.appendChild(bubble);

    counter++;
  }
};

const fillBubble = (img) => {
  const imgData = Number(img.getAttribute("data-img-num"));

  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach((bubble) => {
    const bubbleData = Number(bubble.getAttribute("data-img-num"));

    bubbleData === imgData
      ? (bubble.style.backgroundColor = "black")
      : (bubble.style.backgroundColor = "white");
  });
};

const transition = (img, direction) => {
  img.style.opacity = 0;

  return () => {
    let nextImg;
    let prevImg;

    if (direction === "right") {
      nextImg = preLoadedImages.shift();
      img.replaceWith(nextImg);
      nextImg.style.opacity = 1;
      fillBubble(nextImg);

      viewedImages.push(img);
    } else {
      prevImg = viewedImages.pop();
      img.replaceWith(prevImg);
      prevImg.style.opacity = 1;
      fillBubble(prevImg);

      preLoadedImages.unshift(img);
    }
  };
};

const handleStart = (e) => {
  const startX = e.clientX;
  const img = e.target;

  const handleEnd = (e) => {
    const endX = e.clientX;
    const scrollSensitivity = 50;
    const scrollDistance = startX - endX;

    // uses LIFO to handle swiping back and forth through images
    if (scrollDistance > scrollSensitivity && preLoadedImages.length > 0) {
      setTimeout(transition(img, "right"), 350);
    } else if (scrollDistance < -scrollSensitivity && viewedImages.length > 0) {
      setTimeout(transition(img, "left"), 350);
    }

    // prevents event piling
    img.removeEventListener("pointerup", handleEnd);
  };

  img.addEventListener("pointerup", handleEnd);
};

const viewedImages = [];
const imageFiles = [
  "../images/_DSC8151.JPG",
  "../images/_DSC8152.JPG",
  "../images/_DSC8136.JPG",
  "../images/_DSC8138.JPG",
  "../images/_DSC8139.JPG",
];

const img = document.querySelector(".carousel-img");

// checks to see if image is already cached
if (img.complete) {
  img.addEventListener("pointerdown", handleStart);
} else {
  img.addEventListener("load", () => {
    img.addEventListener("pointerdown", handleStart);
  });
}

const preLoadedImages = imageFiles.map((file, index) => {
  const img = new Image();
  img.src = file;
  img.className = "carousel-img";
  img.dataset.imgNum = index + 1;
  img.width = "750";
  img.height = "500";

  img.addEventListener("load", () => {
    img.addEventListener("pointerdown", handleStart);
  });

  return img;
});

createBubbles(imageFiles.length);
fillBubble(img); // fills bubble for default image
