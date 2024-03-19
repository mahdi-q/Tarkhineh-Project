import Search from "./Search.js";
import Toggler from "./Toggler.js";

export default class PrivacyPage {
  constructor() {
    new Search();
    new Toggler();

    const links = document.querySelectorAll(".privacy__link");
    [...links].forEach((link) => link.classList.remove("selected"));
    document.querySelector(".privacy__link#privacy").classList.add("selected");

    const width = window.innerWidth;
    const titles = document.querySelectorAll(".privacy-item__header .title");
    const data = [
      "حریم خصوصی",
      "چه اطلاعاتی را گردآوری می‌کنیم؟",
      "چگونه اطلاعات شما را گردآوری می‌کنیم؟",
      "چرا به شماره تلفن شما نیاز داریم؟",
      "فعالیت‌های مرورگر شما در هنگام بازدید از وب‌سایت ترخینه",
      "استفاده از کوکی‌ها و دستگاه‌های ذخیره‌سازی دیگر",
      "اطلاعات بیشتر",
    ];

    if (width > 1024) {
      let num = 0;
      [...titles].forEach((title) => {
        title.innerHTML = data[num];
        num++;
      });
    }

    const headers = document.querySelectorAll(".privacy-item__header");
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
