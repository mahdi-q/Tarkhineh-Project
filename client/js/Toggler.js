export default class Toggler {
  constructor() {
    window.scrollTo(0, 0);

    document
      .querySelector(".nav__toggler")
      .addEventListener("click", this.toggleToggler);

    document
      .querySelector(".close-toggler-btn")
      .addEventListener("click", this.toggleToggler);

    const togglerLinks = document.querySelectorAll(".toggler__link");
    [...togglerLinks].forEach((link) =>
      link.addEventListener("click", this.toggleToggler)
    );
    [...togglerLinks].forEach((link) =>
      link.addEventListener("click", this.addSelectedClass)
    );

    document
      .querySelector(".t-branch")
      .addEventListener("click", this.toggleBranchDropdown);

    document
      .querySelector(".t-menu")
      .addEventListener("click", this.toggleMenuDropdown);
  }

  toggleToggler() {
    if (document.querySelector(".show-toggler").style.display === "none") {
      document.querySelector(".show-toggler").style.display = "block";
      document.getElementById("app").classList.add("blur");
    } else {
      document.querySelector(".show-toggler").style.display = "none";
      document.getElementById("app").classList.remove("blur");
    }

    if (document.querySelector(".toggler__menues").style.display === "block") {
      document.querySelector(".toggler__menues").style.display = "none";
      document.querySelector(
        ".t-menu .toggler__dropdown .buttom-arrow"
      ).style.transform = "rotate(360deg)";
    }

    if (
      document.querySelector(".toggler__branches").style.display === "block"
    ) {
      document.querySelector(".toggler__branches").style.display = "none";
      document.querySelector(
        ".t-branch .toggler__dropdown .buttom-arrow"
      ).style.transform = "rotate(360deg)";
    }
  }

  toggleMenuDropdown() {
    const menu = document.querySelector(".toggler__menues");
    menu.style.display = menu.style.display === "block" ? "none" : "block";

    const icon = document.querySelector(
      ".t-menu .toggler__dropdown .buttom-arrow"
    );
    icon.style.transform =
      menu.style.display === "block" ? "rotate(180deg)" : "rotate(360deg)";
  }

  toggleBranchDropdown() {
    const branch = document.querySelector(".toggler__branches");
    branch.style.display = branch.style.display === "block" ? "none" : "block";

    const icon = document.querySelector(
      ".t-branch .toggler__dropdown .buttom-arrow"
    );
    icon.style.transform =
      branch.style.display === "block" ? "rotate(180deg)" : "rotate(360deg)";
  }

  addSelectedClass() {
    const togglerLists = document.querySelectorAll(".toggler__list");
    [...togglerLists].forEach((list) => list.classList.remove("selected"));

    setTimeout(() => {
      switch (location.pathname) {
        case "/":
          document.getElementById("main").classList.add("selected");
          break;
        case "/menu/main_dish":
          document.getElementById("menu").classList.add("selected");
          break;
        case "/menu/appetizer":
          document.getElementById("menu").classList.add("selected");
          break;
        case "/menu/dessert":
          document.getElementById("menu").classList.add("selected");
          break;
        case "/menu/drink":
          document.getElementById("menu").classList.add("selected");
          break;
        case "/ekbatan":
          document.getElementById("branch").classList.add("selected");
          break;
        case "/aghdasiyeh":
          document.getElementById("branch").classList.add("selected");
          break;
        case "/chalos":
          document.getElementById("branch").classList.add("selected");
          break;
        case "/vanak":
          document.getElementById("branch").classList.add("selected");
          break;
        case "/about-us":
          document.getElementById("about-us").classList.add("selected");
          break;
        case "/contact-us":
          document.getElementById("contact-us").classList.add("selected");
          break;
      }
    }, 1000);
  }
}
