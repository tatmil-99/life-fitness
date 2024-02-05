const handleStart = (e) => {
  e.preventDefault();
  const startX = e.changedTouches[0].clientX;

  const img = e.target;

  const handleEnd = (e) => {
    e.preventDefault();
    const endX = e.changedTouches[0].clientX;

    if (endX < startX) {
      console.log("swiped right");
    } else if (endX > startX) {
      console.log("swiped left");
    }

    // removes event listener to prevent build up of "touchend" events
    img.removeEventListener("touchend", handleEnd);
  };

  img.addEventListener("touchend", handleEnd);
};

const carousel = document.querySelector(".carousel");
carousel.addEventListener("touchstart", handleStart);
