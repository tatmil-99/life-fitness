const createBubbles = (fileLength) => {
  const bubbleContainer = document.querySelector(".bubble-container");

  let counter = 0;

  // iterates the length of the image file so a bubble is created for
  // the default image loaded with the home page
  while (counter <= fileLength) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.dataset.imgNum = counter;
    bubbleContainer.appendChild(bubble);

    counter++;
  }
};

const fillBubble = () => {
  const bubbleAttributes = document.querySelectorAll("[data-img-num]");

  bubbleAttributes.forEach((bubble) => {
    const bubbleNumber = Number(bubble.dataset.imgNum);

    if (bubbleNumber === currentBubble) {
      bubble.style.backgroundColor = "black";
    } else {
      bubble.style.backgroundColor = "white";
    }
  });

  currentBubble++;
};

const transition = (img) => {
  img.style.opacity = 0;

  return () => {
    img.replaceWith(preLoadedImages.shift());
    img.style.opacity = 1;
    viewedImages.push(img);
    fillBubble();
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
      setTimeout(transition(img), 350);
    } else if (scrollDistance < -scrollSensitivity && viewedImages.length > 0) {
      img.replaceWith(viewedImages.pop());
      preLoadedImages.unshift(img);
    }

    // prevents event piling
    img.removeEventListener("pointerup", handleEnd);
  };

  img.addEventListener("pointerup", handleEnd);
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

// bubble associated with image in carousel
let currentBubble = 0;

createBubbles(imageFiles.length);
fillBubble(); // fills bubble associated with default image in home page
