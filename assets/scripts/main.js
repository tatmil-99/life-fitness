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
window.addEventListener("load", () => {
  const nav = document.querySelector("nav");
  const ul = document.createElement("ul");
  const pages = ["index", "gym", "tanning", "faqs", "contact"];

  const links = pages.map((page) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    if (page === "index") {
      li.classList.add("nav-link", "first-link", page);
      a.href = `../${page}.html`;
      a.textContent = "Home";
    } else {
      const capitalizedLink = page[0].toUpperCase() + page.slice(1);
      li.classList.add("nav-link", page);
      a.href = `../${page}.html`;
      a.textContent = `${capitalizedLink}`;
    }

    li.appendChild(a);

    return li;
  });

  ul.classList.add("nav-list");
  ul.append(...links);
  nav.appendChild(ul);

  setNavColor(currentPage);
});
