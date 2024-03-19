import Search from "./Search.js";
import Toggler from "./Toggler.js";

export default class RulesPage {
  constructor() {
    new Search();
    new Toggler();

    const links = document.querySelectorAll(".rules__link");
    [...links].forEach((link) => link.classList.remove("selected"));
    document.querySelector(".rules__link#rules").classList.add("selected");

    const headers = document.querySelectorAll(".rules-item__header");
    [...headers].forEach((header) => {
      header.addEventListener("click", (e) => {
        if (header.classList.contains("selected")) {
          header.classList.remove("selected");
          this.closeDropdown(e);
        } else {
          header.classList.add("selected");
          this.openDropdown(e);
        }
      });
    });
  }

  openDropdown(e) {
    let id = e.target.dataset.id;
    if (!id) {
      id = e.target.parentElement.dataset.id;
    }

    const text = document.getElementById(String(id));
    text.style.display = "block";
  }

  closeDropdown(e) {
    let id = e.target.dataset.id;
    if (!id) {
      id = e.target.parentElement.dataset.id;
    }

    const text = document.getElementById(String(id));
    text.style.display = "none";
  }
}
