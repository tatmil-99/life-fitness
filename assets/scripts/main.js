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
  const links = [];

  let i = 0;
  while (i < 5) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    // could break this into a function
    switch (i) {
      case 0:
        li.classList.add("nav-link", "first-link", "index");
        a.href = "../index.html";
        a.textContent = "Home";
        break;
      case 1:
        li.classList.add("nav-link", "gym");
        a.href = "../gym.html";
        a.textContent = "Gym";
        break;
      case 2:
        li.classList.add("nav-link", "tanning");
        a.href = "../tanning.html";
        a.textContent = "Tanning";
        break;
      case 3:
        li.classList.add("nav-link", "faqs");
        a.href = "../faqs.html";
        a.textContent = "FAQs";
        break;
      case 4:
        li.classList.add("nav-link", "contact");
        a.href = "../contact.html";
        a.textContent = "Contact";
        break;
    }

    li.appendChild(a);
    links.push(li);

    i++;
  }

  ul.classList.add("nav-list");
  ul.append(...links);
  nav.appendChild(ul);

  setNavColor(currentPage);
});
