import Toggler from "./Toggler.js";
import { router } from "./app.js";

setTimeout(() => {
  if (document.querySelector(".search__detail .input")) {
    const desktopSearch = document.querySelector(".search__detail .input");
    desktopSearch.addEventListener("change", (e) => {
      if (e.target.value.trim() === "") {
        return null;
      } else {
        window.history.pushState(null, null, "search");
        router();

        setTimeout(() => {
          new Search().searching(e);
        }, 500);

        setTimeout(() => {
          const resultSearch = document.querySelector(
            ".result-search__input .input"
          );
          resultSearch.addEventListener("change", (e) => {
            if (e.target.value.trim() === "") {
              return null;
            } else {
              setTimeout(() => {
                new Search().searching(e);
              }, 500);
            }
          });
        }, 500);
      }
    });
  }
}, 1000);

const foodsData = {};
axios.get("http://localhost:3000/menu").then((res) => {
  foodsData.main_dish = res.data.main_dish;
});
// axios.get("http://localhost:3000/menu").then((res) => {
//   this.foodsData.appetizer = res.data.appetizer;
// });
// axios.get("http://localhost:3000/menu").then((res) => {
//   this.foodsData.dessert = res.data.dessert;
// });
// axios.get("http://localhost:3000/menu").then((res) => {
//   this.foodsData.drink = res.data.drink;
// });

export default class Search {
  constructor() {
    new Toggler();

    document
      .querySelector(".search-btn")
      .addEventListener("click", this.toggleSearch);

    document
      .querySelector(".close-search-btn")
      .addEventListener("click", this.toggleSearch);

    setTimeout(() => {
      if (document.getElementById("total-search")) {
        const mobileSearch = document
          .getElementById("total-search")
          .querySelector(".search__input .input");
        mobileSearch.addEventListener("change", (e) => {
          if (e.target.value.trim() === "") {
            return null;
          } else {
            window.history.pushState(null, null, "search");
            router();

            setTimeout(() => {
              new Search().searching(e);
            }, 500);

            setTimeout(() => {
              const resultSearch = document.querySelector(
                ".result-search__input .input"
              );
              resultSearch.addEventListener("change", (e) => {
                if (e.target.value.trim() === "") {
                  return null;
                } else {
                  setTimeout(() => {
                    new Search().searching(e);
                  }, 500);
                }
              });
            }, 500);
          }
        });
      }
    }, 1000);
  }

  toggleSearch() {
    window.scrollTo(0, 0);

    if (document.querySelector(".show-search").style.display === "none") {
      document.querySelector(".show-search").style.display = "block";
      document.getElementById("app").classList.add("blur");
    } else {
      document.querySelector(".show-search").style.display = "none";
      document.getElementById("app").classList.remove("blur");
    }
  }

  searching(e) {
    e.preventDefault();

    if (document.querySelector(".show-search").style.display === "block") {
      this.toggleSearch();
    }

    const data = [];
    for (const key_1 in foodsData) {
      for (const key_2 in foodsData[key_1]) {
        data.push(...foodsData[key_1][key_2]);
      }
    }

    const searchText = e.target.value.trim();
    const filteredData = data.filter((item) => {
      const title = item.title.trim();
      const text = searchText;
      return title.includes(text);
    });

    e.target.value = "";

    this.showItemsOnDom(searchText, filteredData);
  }

  showItemsOnDom(searchText, searchItems) {
    document.querySelector(".result-search__heading .text-1").innerHTML = "";
    document.querySelector(".result-search__heading .text-2").innerHTML = "";
    document.querySelector(".result-search__heading .text-3").innerHTML = "";
    document.querySelector(".result-search__items").innerHTML = "";
    document.querySelector(".result-search__image").style.display = "none";

    let itemsHTML = "";
    searchItems.forEach((data) => {
      let heartIcon = "";
      if (data.isLiked) {
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

      itemsHTML += `
    <div class="food-card">
      <div class="card__header">
        <img
          src="${data.image}"
          alt=""
          class="card__image"
        />
      </div>

      <div class="card__body">
        <h3 class="card__title">${data.title}</h3>
        <div class="card__info">
          <div class="card__detail">
            <div class="like">
              <svg class="icon" data-id="${data.id}">
              ${heartIcon}
              </svg>
              <span class="text">افزودن به علاقمندی‌ها</span>
            </div>
            <div class="rate">
              <img
                src="/client/assets/images/rate-${this.englishToPersian(
                  data.rate
                )}.svg"
                alt=""
                class="icon"
              />
              <span class="number">${this.englishToPersian(data.rate)}</span>
              <span class="text">(${data.score} امتیاز)</span>
            </div>
          </div>

          <div class="card__price">
            <div class="discount">
              <span class="last-price">${data.main_price}</span>
              <span class="discount-percent">${data.discount}</span>
            </div>
            <div class="price">${data.price} تومان</div>
          </div>
        </div>
        <div class="card__button">
          <button class="btn">افزودن به سبد خرید</button>
        </div>
      </div>
    </div>`;
    });

    if (searchItems.length === 0) {
      document.querySelector(".result-search__heading .text-1").innerHTML = "";
      document.querySelector(".result-search__heading .text-2").innerHTML = "";
      document.querySelector(".result-search__heading .text-3").innerHTML =
        "موردی با این مشخصات پیدا نکردیم!";
      document.querySelector(".result-search__input .input").value = searchText;
      document.querySelector(".result-search__image").style.display = "block";
    } else {
      document.querySelector(".result-search__heading .text-1").innerHTML =
        "نتایج جستجو برای:";
      document.querySelector(".result-search__heading .text-2").innerHTML =
        searchText;
      document.querySelector(".result-search__input .input").value = searchText;
      document.querySelector(".result-search__items").innerHTML = itemsHTML;
    }

    const heartIcons = document.querySelectorAll(".card__detail .like .icon");
    [...heartIcons].forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const id = e.target.dataset.id;

        const selectedFood = searchItems.find((item) => item.id == id);

        if (selectedFood.isLiked === false) selectedFood.isLiked = true;
        else selectedFood.isLiked = false;

        this.showItemsOnDom(searchText, searchItems);
      });
    });

    const discounts = document.querySelectorAll(".discount-percent");
    [...discounts].forEach((discount) => {
      if (discount.innerText === "") {
        discount.style.display = "none";
      }
    });
  }

  englishToPersian(str) {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < englishNumbers.length; i++) {
      str = str.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
    }

    return str;
  }
}
