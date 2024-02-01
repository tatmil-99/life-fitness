const getActivePage = () => {
  if (window.location) {
    const path = window.location.pathname;

    let page;

    if (path == "/") {
      page = "home";
    } else {
      page = path.slice(path.indexOf("/") + 1, path.indexOf("."));
    }

    return page;
  }
};

const createNav = (page) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const capitalizedLink =
    page === "faqs"
      ? page.slice(0, -1).toUpperCase() + page[page.length - 1]
      : page[0].toUpperCase() + page.slice(1);

  if (page === "home") li.classList.add("nav-link", "first-link", page);
  li.classList.add("nav-link", page);
  a.href = `${page}.html`;
  a.textContent = `${capitalizedLink}`;

  li.appendChild(a);
  return li;
};

const highlightNav = (activePage) => {
  const navChildren = document.querySelector(".nav-list").children;

  for (const child of navChildren) {
    if (child.classList.contains(activePage)) {
      child.classList.toggle("active-page");
    }
  }
};

// create nav menu and append it to page
window.addEventListener("load", () => {
  const nav = document.querySelector("nav");
  const ul = document.createElement("ul");
  const pages = ["home", "gym", "tanning", "faqs", "contact"];

  const navMenu = pages.map(createNav);

  ul.classList.add("nav-list");
  ul.append(...navMenu);
  nav.appendChild(ul);

  const activePage = getActivePage();
  highlightNav(activePage);
});
