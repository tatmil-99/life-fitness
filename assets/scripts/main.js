const getCurrentPage = () => {
  if (window.location) {
    const path = window.location.pathname;
    const page = path.slice(1, -5);

    return page;
  }
};

const setNavColor = (currentPage) => {
  const navChildren = document.querySelector(".nav-list").children;

  for (const child of navChildren) {
    if (child.classList.contains(currentPage)) {
      child.classList.toggle("active-page");
    }
  }
};

const currentPage = getCurrentPage();
setNavColor(currentPage);
