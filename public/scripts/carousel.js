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

// assign imgNum data-attr to pre-rendered imgs (will need to hard-code initial img attr)
// pass current img to fillBubble()
// get data-attr of img
// get all bubbles
// iterate through bubbles
// get data-attr of bubble
// if data-attr of bubble === data-attr of img
// set background of bubble to black
// otherwise set background to white
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
    if (direction === "right") {
      img.replaceWith(preLoadedImages.shift());
      img.style.opacity = 1;
      viewedImages.push(img);
      fillBubble(img);
    } else {
      img.replaceWith(viewedImages.pop());
      img.style.opacity = 1;
      preLoadedImages.unshift(img);
      fillBubble(img);
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
const imageFiles = ["../images/_DSC8151.JPG", "../images/_DSC8161.JPG"];

const img = document.querySelector(".carousel-img");

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

  return img;
});

preLoadedImages.forEach((img) => {
  img.addEventListener("load", () => {
    img.addEventListener("pointerdown", handleStart);
  });
});

createBubbles(imageFiles.length);
fillBubble(img); // fills bubble associated with default image in home page
