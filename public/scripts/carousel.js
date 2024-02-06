const handleStart = (e) => {
  e.preventDefault();

  const img = e.target;
  const startX = e.changedTouches[0].clientX;

  const handleEnd = (e) => {
    e.preventDefault();

    const endX = e.changedTouches[0].clientX;

    if (endX < startX) {
      fetch("./images/_DSC8161.JPG")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.blob();
        })
        .then((myBlob) => {
          const objectURL = URL.createObjectURL(myBlob);
          img.src = objectURL;
        })
        .catch((err) => console.error(`Fetch problem: ${err.message}`));
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
