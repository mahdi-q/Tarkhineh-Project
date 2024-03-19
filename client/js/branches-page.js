import Search from "./Search.js";
import Toggler from "./Toggler.js";

export default class BranchesPage {
  constructor(branch) {
    new Search();
    new Toggler();

    document.querySelector(".nav__links .second").classList.add("selected");

    this.ekbatanData = {};
    this.chalosData = {};
    this.aghdasiyehData = {};
    this.vanakData = {};

    axios.get("http://localhost:3000/ekbatan").then((res) => {
      this.ekbatanData = res.data;
    });
    axios.get("http://localhost:3000/chalos").then((res) => {
      this.chalosData = res.data;
    });
    axios.get("http://localhost:3000/aghdasiyeh").then((res) => {
      this.aghdasiyehData = res.data;
    });
    axios.get("http://localhost:3000/vanak").then((res) => {
      this.vanakData = res.data;
    });

    switch (branch) {
      case "ekbatan":
        setTimeout(() => {
          this.creatPage(this.ekbatanData);
          document.querySelector(".nav__links .second .link .text").innerHTML =
            "اکباتان";
        }, 500);
        break;
      case "chalos":
        setTimeout(() => {
          this.creatPage(this.chalosData);
          document.querySelector(".nav__links .second .link .text").innerHTML =
            "چالوس";
        }, 500);
        break;
      case "aghdasiyeh":
        setTimeout(() => {
          this.creatPage(this.aghdasiyehData);
          document.querySelector(".nav__links .second .link .text").innerHTML =
            "اقدسیه";
        }, 500);
        break;
      case "vanak":
        setTimeout(() => {
          this.creatPage(this.vanakData);
          document.querySelector(".nav__links .second .link .text").innerHTML =
            "ونک";
        }, 500);
        break;
    }

    let scrollWrapperes = [];
    scrollWrapperes.push(document.querySelector(".special__foods"));
    scrollWrapperes.push(document.querySelector(".foreign__foods"));
    scrollWrapperes.push(document.querySelector(".famous__foods"));
    scrollWrapperes.push(document.querySelector(".comments"));

    let isDown = false;
    let startX;
    let scrollLeft;

    scrollWrapperes.forEach((scrollWrapper) => {
      scrollWrapper.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - scrollWrapper.offsetLeft;
        scrollLeft = scrollWrapper.scrollLeft;
      });
      scrollWrapper.addEventListener("mouseleave", () => {
        isDown = false;
      });
      scrollWrapper.addEventListener("mouseup", () => {
        isDown = false;
      });
      scrollWrapper.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        scrollWrapper.scrollLeft = scrollLeft - walk;
      });
    });
  }

  creatPage(data) {
    let special_foods_html = "";
    data.special_foods.forEach((food) => {
      let heartIcon = "";
      if (food.isLiked) {
        heartIcon = `
            <use
              xlink:href="/client/assets/images/card-sprit.svg#heart-fill"
            ></use>`;
      } else {
        heartIcon = `
            <use
              xlink:href="/client/assets/images/card-sprit.svg#heart-empty"
            ></use>`;
      }

      special_foods_html += `
            <div class="food-card special__food">
      <div class="card__header">
        <img
          src="${food.image}"
          alt=""
          class="card__image"
        />
      </div>

      <div class="card__body">
        <h3 class="card__title">${food.title}</h3>
        <div class="card__info">
          <div class="card__detail">
            <div class="like">
              <svg class="icon" data-id="${food.id}">
              ${heartIcon}
              </svg>
              <span class="text">افزودن به علاقمندی‌ها</span>
            </div>
            <div class="rate">
              <img
                src="/client/assets/images/rate-${food.rate}.svg"
                alt=""
                class="icon"
              />
              <span class="number">${food.rate}</span>
              <span class="text">(${food.score} امتیاز)</span>
            </div>
          </div>

          <div class="card__price">
            <div class="discount">
              <span class="last-price">${food.main_price}</span>
              <span class="discount-percent">${food.discount}</span>
            </div>
            <div class="price">${food.price} تومان</div>
          </div>
        </div>
        <div class="card__button">
          <button class="btn">افزودن به سبد خرید</button>
        </div>
      </div>
    </div>
        `;
    });
    document.querySelector(".special__foods").innerHTML = special_foods_html;

    let famous_foods_html = "";
    data.famous_foods.forEach((food) => {
      let heartIcon = "";
      if (food.isLiked) {
        heartIcon = `
            <use
              xlink:href="/client/assets/images/card-sprit.svg#heart-fill"
            ></use>`;
      } else {
        heartIcon = `
            <use
              xlink:href="/client/assets/images/card-sprit.svg#heart-empty"
            ></use>`;
      }

      famous_foods_html += `
    <div class="food-card famous__food">
      <div class="card__header">
        <img
          src="${food.image}"
          alt=""
          class="card__image"
        />
      </div>

      <div class="card__body">
        <h3 class="card__title">${food.title}</h3>
        <div class="card__info">
          <div class="card__detail">
            <div class="like">
              <svg class="icon" data-id="${food.id}">
              ${heartIcon}
              </svg>
              <span class="text">افزودن به علاقمندی‌ها</span>
            </div>
            <div class="rate">
              <img
                src="/client/assets/images/rate-${food.rate}.svg"
                alt=""
                class="icon"
              />
              <span class="number">${food.rate}</span>
              <span class="text">(${food.score} امتیاز)</span>
            </div>
          </div>

          <div class="card__price">
            <div class="discount">
              <span class="last-price">${food.main_price}</span>
              <span class="discount-percent">${food.discount}</span>
            </div>
            <div class="price">${food.price} تومان</div>
          </div>
        </div>
        <div class="card__button">
          <button class="btn">افزودن به سبد خرید</button>
        </div>
      </div>
    </div>
        `;
    });
    document.querySelector(".famous__foods").innerHTML = famous_foods_html;

    let foreign_foods_html = "";
    data.foreign_foods.forEach((food) => {
      let heartIcon = "";
      if (food.isLiked) {
        heartIcon = `
            <use
              xlink:href="/client/assets/images/card-sprit.svg#heart-fill"
            ></use>`;
      } else {
        heartIcon = `
            <use
              xlink:href="/client/assets/images/card-sprit.svg#heart-empty"
            ></use>`;
      }

      foreign_foods_html += `
    <div class="food-card foreign__food">
      <div class="card__header">
        <img
          src="${food.image}"
          alt=""
          class="card__image"
        />
      </div>

      <div class="card__body">
        <h3 class="card__title">${food.title}</h3>
        <div class="card__info">
          <div class="card__detail">
            <div class="like">
              <svg class="icon" data-id="${food.id}">
              ${heartIcon}
              </svg>
              <span class="text">افزودن به علاقمندی‌ها</span>
            </div>
            <div class="rate">
              <img
                src="/client/assets/images/rate-${food.rate}.svg"
                alt=""
                class="icon"
              />
              <span class="number">${food.rate}</span>
              <span class="text">(${food.score} امتیاز)</span>
            </div>
          </div>

          <div class="card__price">
            <div class="discount">
              <span class="last-price">${food.main_price}</span>
              <span class="discount-percent">${food.discount}</span>
            </div>
            <div class="price">${food.price} تومان</div>
          </div>
        </div>
        <div class="card__button">
          <button class="btn">افزودن به سبد خرید</button>
        </div>
      </div>
    </div>
        `;
    });
    document.querySelector(".foreign__foods").innerHTML = foreign_foods_html;

    let comments_html = "";
    data.comments.forEach((comment) => {
      comments_html += `
              <div class="comment">
      <div class="comment__info">
        <img
          src="${comment.image}"
          alt=""
          class="comment__image"
        />
        <div class="comment__detail">
          <span class="name">${comment.name}</span>
          <span class="date">${comment.date}</span>
        </div>
      </div>
      <span class="comment__text">${comment.description}</span>
      <div class="comment__rate">
              <img
                src="/client/assets/images/rate-${comment.rate}.svg"
                alt=""
                class="icon"
              />
        <span class="number">${comment.rate}</span>
      </div>
    </div>
          `;
    });
    document.querySelector(".comments").innerHTML = comments_html;

    const info = data.information;
    document.querySelector(".branch-information-section").innerHTML = `
            <h2 class="branch-info__heading">${info.title}</h2>
  <div class="branch-info__image ekbatan">
    <svg class="icon">
      <use
        xlink:href="/client/assets/images/header-sprite.svg#arrow-right"
      ></use>
    </svg>
    <svg class="icon">
      <use
        xlink:href="/client/assets/images/header-sprite.svg#arrow-left"
      ></use>
    </svg>
  </div>
  <div class="branch-info__detail">
    <div class="call">
      <img class="icon" src="/client/assets/images/call.svg" alt="" />
      <span class="text-mobile">${info.phone_numberes.mobile}</span>
      <div class="text-desktop">
        <span class="text-1">${info.phone_numberes.desktop_1}</span>
        <span class="text-2">${info.phone_numberes.desktop_2}</span>
      </div>
    </div>
    <div class="place">
      <img class="icon" src="/client/assets/images/place.svg" alt="" />
      <span class="text">${info.location}</span>
    </div>
    <div class="time">
      <img class="icon" src="/client/assets/images/time.svg" alt="" />
      <span class="text">${info.work_time}</span>
    </div>
  </div>
          `;

    const heartIcons = document.querySelectorAll(".card__detail .like .icon");
    [...heartIcons].forEach((icon) => {
      icon.addEventListener("click", (e) => {
        this.changeHeartIcon(data, e);
      });
    });

    const discounts = document.querySelectorAll(".discount-percent");
    [...discounts].forEach((discount) => {
      if (discount.innerText === "") {
        discount.style.display = "none";
      }
    });
  }

  changeHeartIcon(data, event) {
    const id = event.target.dataset.id;

    const foods = [
      ...data.special_foods,
      ...data.famous_foods,
      ...data.foreign_foods,
    ];

    const selectedFood = foods.find((item) => item.id == id);

    if (selectedFood.isLiked === false) selectedFood.isLiked = true;
    else selectedFood.isLiked = false;

    this.creatPage(data);
  }
}
