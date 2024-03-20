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

    // uses LIFO to handle swiping back and forth through images
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

const handleSwipe = (target, startX, endX) => {
  const scrollSensitivity = 50;
  const scrollDistance = startX - endX;

  if (scrollDistance > scrollSensitivity && preLoadedImages.length > 0) {
    setTimeout(transition(target, "right"), 350);
  } else if (scrollDistance < -scrollSensitivity && viewedImages.length > 0) {
    setTimeout(transition(target, "left"), 350);
  }
};

const handleClick = (target) => {
  console.log(target.tagName);
};

const handleStart = (e) => {
  const startX = e.clientX;
  const target = e.target;

  const handleEnd = (e) => {
    const endX = e.clientX;

    if (target.classList.contains("carousel-img")) {
      handleSwipe(target, startX, endX);
      target.removeEventListener("pointerup", handleEnd); // prevents event piling
    } else if (target.classList.contains("carousel-btn")) {
      handleClick(target);
    }
  };

  target.addEventListener("pointerup", handleEnd);
};

// add listeners to cached images
const addListeners = (carouselBtns, img) => {
  const viewportWidth = window.innerWidth;

  if (img.complete && viewportWidth < 768) {
    img.addEventListener("pointerdown", handleStart);
  } else if (img.complete && viewportWidth >= 768) {
    carouselBtns.forEach((btn) => {
      btn.addEventListener("pointerdown", handleStart);
    });
  } else {
    img.addEventListener("load", () => {
      viewportWidth < 768
        ? img.addEventListener("pointerdown", handleStart)
        : carouselBtns.forEach((btn) => {
            btn.addEventListener("pointerdown", handleStart);
          });
    });
  }
};

const viewedImages = [];
const imageFiles = [
  "../images/_DSC8151.JPG",
  "../images/_DSC8152.JPG",
  "../images/_DSC8136.JPG",
  "../images/_DSC8138.JPG",
  "../images/_DSC8139.JPG",
];

const carouselBtns = document.querySelectorAll(".carousel-btn");
const img = document.querySelector(".carousel-img");
addListeners(carouselBtns, img);

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
