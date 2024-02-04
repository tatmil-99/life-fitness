const handleStart = (e) => {
  e.preventDefault();
  const startX = e.changedTouches[0].clientX;

  const img = e.target;
  img.addEventListener("touchend", (e) => {
    e.preventDefault();
    const endX = e.changedTouches[0].clientX;

    if (endX < startX) {
      console.log("swiped right");
    } else if (endX > startX) {
      console.log("swiped left");
    }
  });
};

const carousel = document.querySelector(".carousel");
carousel.addEventListener("touchstart", handleStart);
