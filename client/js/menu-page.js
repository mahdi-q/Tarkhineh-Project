import Search from "./Search.js";
import Toggler from "./Toggler.js";

export default class MenuPage {
  menu = document.getElementById("menu-foods");

  constructor(menu) {
    new Search();
    new Toggler();

    document.querySelector(".nav__links .third").classList.add("selected");

    this.pageFoods = [];

    document
      .querySelector(".menu__search .search__input .input")
      .addEventListener("input", (e) => {
        const searchText = e.target.value.trim();
        this.searchFoods(searchText, this.pageFoods);
      });

    document.getElementById("total-search").style.display = "none";

    this.mainDishData = {};
    this.appetizerData = {};
    this.dessertData = {};
    this.drinkData = {};

    axios.get("http://localhost:3000/menu").then((res) => {
      this.mainDishData = res.data.main_dish;
    });
    axios.get("http://localhost:3000/menu").then((res) => {
      this.appetizerData = res.data.appetizer;
    });
    axios.get("http://localhost:3000/menu").then((res) => {
      this.dessertData = res.data.dessert;
    });
    axios.get("http://localhost:3000/menu").then((res) => {
      this.drinkData = res.data.drink;
    });

    switch (menu) {
      case "main_dish":
        setTimeout(() => {
          this.creatPage(this.mainDishData, [
            "persian-foods",
            "foreign-foods",
            "pizzas",
            "sandwiches",
          ]);

          const filterBtns = document.querySelectorAll(".menu__btn");
          [...filterBtns].forEach((btn) => {
            btn.addEventListener("click", () => {
              [...filterBtns].forEach((btn) =>
                btn.classList.remove("selected")
              );

              btn.classList.add("selected");
              this.filterFoods(this.mainDishData, btn.id);
            });
          });
        }, 500);
        break;
      case "appetizer":
        setTimeout(() => {
          this.creatPage(this.appetizerData, [
            "persian-appetizers",
            "foreign-appetizers",
            "soups",
            "finger-foods",
          ]);

          const filterBtns = document.querySelectorAll(".menu__btn");
          [...filterBtns].forEach((btn) => {
            btn.addEventListener("click", () => {
              const btns = document.querySelectorAll(".menu__btn");
              [...btns].forEach((btn) => btn.classList.remove("selected"));

              btn.classList.add("selected");
              this.filterFoods(this.appetizerData, btn.id);
            });
          });
        }, 500);
        break;
      case "dessert":
        setTimeout(() => {
          this.creatPage(this.dessertData, [
            "persian-desserts",
            "foreign-desserts",
            "jellies",
            "cakes",
          ]);

          const filterBtns = document.querySelectorAll(".menu__btn");
          [...filterBtns].forEach((btn) => {
            btn.addEventListener("click", () => {
              const btns = document.querySelectorAll(".menu__btn");
              [...btns].forEach((btn) => btn.classList.remove("selected"));

              btn.classList.add("selected");
              this.filterFoods(this.dessertData, btn.id);
            });
          });
        }, 500);
        break;
      case "drink":
        setTimeout(() => {
          this.creatPage(this.drinkData, [
            "persian-drinks",
            "foreign-drinks",
            "cold-drinks",
            "hot-drinks",
          ]);

          const filterBtns = document.querySelectorAll(".menu__btn");
          [...filterBtns].forEach((btn) => {
            btn.addEventListener("click", () => {
              const btns = document.querySelectorAll(".menu__btn");
              [...btns].forEach((btn) => btn.classList.remove("selected"));

              btn.classList.add("selected");
              this.filterFoods(this.drinkData, btn.id);
            });
          });
        }, 500);
        break;
    }

    const scrollWrapper = document.querySelector(".menu__btns");

    let isDown = false;
    let startX;
    let scrollLeft;

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
      const walk = (x - startX) * 3;
      scrollWrapper.scrollLeft = scrollLeft - walk;
    });
  }

  creatPage(data, classes) {
    let num = 0;

    for (const foods in data) {
      let html = "";

      data[foods].forEach((food) => {
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
        html += `
      <div class="menu-card">
        <img
          src="${food.image}"
          alt=""
          class="menu-card__image"
          data-id="${food.id}"
        />
        <div class="menu-card__info">
          <h3 class="menu-card__title">${food.title}</h3>
          <span class="menu-card__detail">${food.detail}</span>
          <div class="menu-card__price">
            <div class="discount">
              <span class="last-price">${food.main_price}</span>
              <span class="discount-percent">${food.discount}</span>
            </div>
            <div class="price">${food.price} تومان</div>
          </div>
          <div class="menu-card__like">
            <svg class="icon" data-id="${food.id}">${heartIcon}</svg>
          </div>
          <div class="menu-card__rate">
            <svg class="icon">
              <use
                xlink:href="/client/assets/images/rate-sprite.svg#rate-${food.rate}"
              ></use>
            </svg>
          </div>
          <button class="card-menu__btn btn">افزودن به سبد خرید</button>
        </div>
      </div>`;
      });

      for (const food in data[foods]) {
        this.pageFoods.push(data[foods][food]);
      }

      document.querySelector(`.${classes[num]}`).innerHTML = html;
      num += 1;
    }

    this.substringDetail();

    const discounts = document.querySelectorAll(".discount-percent");
    [...discounts].forEach((discount) => {
      if (discount.innerText === "") {
        discount.style.display = "none";
      }
    });

    const heartIcons = document.querySelectorAll(".menu-card__like .icon");
    [...heartIcons].forEach((icon) => {
      icon.addEventListener("click", (e) => {
        this.changeHeartIcon(data, classes, e);
      });
    });

    const cardImages = document.querySelectorAll(".menu-card__image");
    [...cardImages].forEach((image) => {
      image.addEventListener("click", (e) => this.toggleShowInfo(data, e));
    });
  }

  filterFoods(data, id) {
    const title = document.createElement("h2");
    title.classList.add("menu-food-header");
    title.classList.add("block");

    let foods = [];

    switch (id) {
      case "persian_foods":
        title.innerText = "غذاهای ایرانی";
        this.creatFilterPage(data.persian_foods, title);
        break;
      case "foreign_foods":
        title.innerText = "غذاهای غیر ایرانی";
        this.creatFilterPage(data.foreign_foods, title);
        break;
      case "pizzas":
        title.innerText = "پیتزاها";
        this.creatFilterPage(data.pizzas, title);
        break;
      case "sandwiches":
        title.innerText = "ساندویچ‌ها";
        this.creatFilterPage(data.sandwiches, title);
        break;
      case "persian_appetizers":
        title.innerText = "پیش غذاهای ایرانی";
        this.creatFilterPage(data.persian_appetizers, title);
        break;
      case "foreign_appetizers":
        title.innerText = "پیش غذاهای غیر ایرانی";
        this.creatFilterPage(data.foreign_appetizers, title);
        break;
      case "soups":
        title.innerText = "سوپ‌ها";
        this.creatFilterPage(data.soups, title);
        break;
      case "finger_foods":
        title.innerText = "فینگرفود ها";
        this.creatFilterPage(data.finger_foods, title);
        break;
      case "persian_desserts":
        title.innerText = "دسر های ایرانی";
        this.creatFilterPage(data.persian_desserts, title);
        break;
      case "foreign_desserts":
        title.innerText = "دسر های غیر ایرانی";
        this.creatFilterPage(data.foreign_desserts, title);
        break;
      case "jellies":
        title.innerText = "ژله ها";
        this.creatFilterPage(data.jellies, title);
        break;
      case "cakes":
        title.innerText = "کیک ها";
        this.creatFilterPage(data.cakes, title);
        break;
      case "persian_drinks":
        title.innerText = "نوشیدنی های ایرانی";
        this.creatFilterPage(data.persian_drinks, title);
        break;
      case "foreign_drinks":
        title.innerText = "نوشیدنی های غیر ایرانی";
        this.creatFilterPage(data.foreign_drinks, title);
        break;
      case "cold_drinks":
        title.innerText = "نوشیدنی های سرد";
        this.creatFilterPage(data.cold_drinks, title);
        break;
      case "hot_drinks":
        title.innerText = "نوشیدنی های گرم";
        this.creatFilterPage(data.hot_drinks, title);
        break;
      case "popular":
        for (const key in data) {
          foods.push(...data[key]);
        }
        const popularFoods = foods.filter((food) => food.rate >= 4);
        title.innerText = "محبوب‌ترین ها";
        this.creatFilterPage(popularFoods, title);
        break;
      case "economic":
        for (const key in data) {
          foods.push(...data[key]);
        }
        const economicFoods = foods.filter(
          (food) => this.persianToEnglish(food.discount.slice(1)) >= 10
        );
        title.innerText = "اقتصادی‌ترین ها";
        this.creatFilterPage(economicFoods, title);
        break;
    }
  }

  creatFilterPage(data, title) {
    this.menu.innerHTML = "";

    this.menu.appendChild(title);

    let result = "";
    [...data].forEach((food) => {
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
      result += `
    <div class="menu-card">
      <img
        src="${food.image}"
        alt=""
        class="menu-card__image"
        data-id="${food.id}"
      />
      <div class="menu-card__info">
        <h3 class="menu-card__title">${food.title}</h3>
        <span class="menu-card__detail">${food.detail}</span>
        <div class="menu-card__price">
          <div class="discount">
            <span class="last-price">${food.main_price}</span>
            <span class="discount-percent">${food.discount}</span>
          </div>
          <div class="price">${food.price} تومان</div>
        </div>
        <div class="menu-card__like">
          <svg class="icon" data-id="${food.id}">${heartIcon}</svg>
        </div>
        <div class="menu-card__rate">
          <svg class="icon">
            <use
              xlink:href="/client/assets/images/rate-sprite.svg#rate-${food.rate}"
            ></use>
          </svg>
        </div>
        <button class="card-menu__btn btn">افزودن به سبد خرید</button>
      </div>
    </div>`;
    });

    const foods = document.createElement("div");
    foods.innerHTML = result;
    foods.classList.add("menu-foods");
    this.menu.appendChild(foods);

    document.querySelector(".menu__search .search__input .input").value = "";
    this.pageFoods = [...data];

    this.substringDetail();

    const discounts = document.querySelectorAll(".discount-percent");
    [...discounts].forEach((discount) => {
      if (discount.innerText === "") {
        discount.style.display = "none";
      }
    });

    const heartIcons = document.querySelectorAll(".menu-card__like .icon");
    [...heartIcons].forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const selectedFood = [...data].find((item) => item.id == id);

        if (selectedFood.isLiked === false) selectedFood.isLiked = true;
        else selectedFood.isLiked = false;

        this.creatFilterPage(data, title);
      });
    });

    const cardImages = document.querySelectorAll(".menu-card__image");
    [...cardImages].forEach((image) => {
      image.addEventListener("click", (e) => this.toggleShowInfo({ data }, e));
    });
  }

  toggleShowInfo(data, event) {
    window.scrollTo(0, 0);

    const id = event.target.dataset.id;

    let foods = [];
    for (const key in data) {
      foods.push(...data[key]);
    }

    const show_info = document.querySelector(".show-info");
    const app = document.getElementById("app");

    const selectedFood = foods.find((food) => food.id === id);

    show_info.innerHTML = `
        <div class="show-info__header">
          <span class="show-info__heading">اطلاعات محصول</span>
          <button class="show-info__close-btn btn">
            <img
              class="icon"
              src="/client/assets/images/close-icon-bl.png"
              alt=""
            />
          </button>
        </div>
        <img
          src="${selectedFood.image}"
          alt=""
          class="show-info__image"
        />
        <div class="show-info__footer">
          <span class="show-info__title">${selectedFood.title}</span>
          <span class="show-info__detail">${selectedFood.detail}</span>
          <svg class="show-info__icon">
            <use xlink:href="/client/assets/images/rate-sprite.svg#rate-${selectedFood.rate}"></use>
          </svg>
          <span class="show-info__rate">(${selectedFood.score} نظر)</span>
        </div>`;

    show_info.style.display = "flex";
    app.classList.add("blur");

    const infoCloseBtn = document.querySelector(".show-info__close-btn");
    infoCloseBtn.addEventListener("click", () => {
      show_info.style.display = "none";
      app.classList.remove("blur");
    });
  }

  searchFoods(searchText, data) {
    if (searchText === "") {
      return null;
    }
    const filteredData = data.filter((item) =>
      item.title.includes(searchText.trim())
    );

    this.menu.innerHTML = "";

    const searchTitle = document.createElement("h2");
    searchTitle.innerText = "نتیجه‌ی جستجو:";
    searchTitle.classList.add("menu-food-header");
    searchTitle.classList.add("block");
    this.menu.appendChild(searchTitle);

    let html = "";
    filteredData.forEach((item) => {
      let heartIcon = "";
      if (item.isLiked) {
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

      html += `
    <div class="menu-card">
      <img
        src="${item.image}"
        alt=""
        class="menu-card__image"
        data-id="${item.id}"
      />
      <div class="menu-card__info">
        <h3 class="menu-card__title">${item.title}</h3>
        <span class="menu-card__detail">${item.detail}</span>
        <div class="menu-card__price">
          <div class="discount">
            <span class="last-price">${item.main_price}</span>
            <span class="discount-percent">${item.discount}</span>
          </div>
          <div class="price">${item.price} تومان</div>
        </div>
        <div class="menu-card__like">
          <svg class="icon" data-id="${item.id}">${heartIcon}</svg>
        </div>
        <div class="menu-card__rate">
          <svg class="icon">
            <use
              xlink:href="/client/assets/images/rate-sprite.svg#rate-${item.rate}"
            ></use>
          </svg>
        </div>
        <button class="card-menu__btn btn">افزودن به سبد خرید</button>
      </div>
    </div>
      `;
    });

    const searchFoods = document.createElement("div");
    searchFoods.innerHTML = html;
    searchFoods.classList.add("menu-foods");
    this.menu.appendChild(searchFoods);

    this.substringDetail();

    const discounts = document.querySelectorAll(".discount-percent");
    [...discounts].forEach((discount) => {
      if (discount.innerText === "") {
        discount.style.display = "none";
      }
    });

    const heartIcons = document.querySelectorAll(".menu-card__like .icon");
    [...heartIcons].forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const selectedFood = [...data].find((item) => item.id == id);

        if (selectedFood.isLiked === false) selectedFood.isLiked = true;
        else selectedFood.isLiked = false;

        this.searchFoods(searchText, data);
      });
    });

    const cardImages = document.querySelectorAll(".menu-card__image");
    [...cardImages].forEach((image) => {
      image.addEventListener("click", (e) => this.toggleShowInfo({ data }, e));
    });
  }

  changeHeartIcon(data, classes, event) {
    const id = event.target.dataset.id;

    const foods = [
      ...data.persian_foods,
      ...data.foreign_foods,
      ...data.pizzas,
      ...data.sandwiches,
    ];

    const selectedFood = foods.find((item) => item.id == id);
    if (selectedFood.isLiked === false) selectedFood.isLiked = true;
    else selectedFood.isLiked = false;

    this.creatPage(data, classes);
  }

  substringDetail() {
    const maxLetters = 60;
    const textContaineres = document.querySelectorAll(".menu-card__detail");
    [...textContaineres].forEach((item) => {
      let textContent = item.textContent.trim();
      textContent = textContent.substring(0, maxLetters);
      if (item.textContent.length > maxLetters) {
        textContent += "...";
      }
      item.textContent = textContent;
    });
  }

  persianToEnglish(str) {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < persianNumbers.length; i++) {
      str = str.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
    }

    return str;
  }
}
