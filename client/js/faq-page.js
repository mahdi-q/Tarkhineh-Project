import Search from "./Search.js";
import Toggler from "./Toggler.js";

export default class FAQPage {
  constructor() {
    new Search();
    new Toggler();

    const links = document.querySelectorAll(".faq__link");
    [...links].forEach((link) => link.classList.remove("selected"));
    document.querySelector(".faq__link#faq").classList.add("selected");

    const width = window.innerWidth;
    const titles = document.querySelectorAll(".faq-item__header .title");
    const data = [
      "ترخینه چه امکانات متفاوتی داره؟",
      "چطور می تونم در ترخینه حساب کاربری ایجاد کنم؟",
      "سابقه و لیست خریدهای قبلی ام رو کجا ببینم؟",
      "چه راه هایی برای پرداخت دارم؟",
      "آیا قیمت در منوی وبسایت ترخینه با قیمت منوی شعبات رستوران یکسان است؟",
      "چطور می تونم از اعتبار هدیه و تخفیف استفاده کنم؟",
    ];

    if (width > 1024) {
      let num = 0;
      [...titles].forEach((title) => {
        title.innerHTML = data[num];
        num++;
      });
    }

    const headers = document.querySelectorAll(".faq-item__header");
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
