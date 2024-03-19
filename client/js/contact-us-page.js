import Search from "./Search.js";
import Toggler from "./Toggler.js";

export default class ContactUsPage {
  constructor() {
    new Search();
    new Toggler();

    document.querySelector(".nav__links .sixth").classList.add("selected");

    const showImageBtnsDesktop = document.querySelectorAll(".desktop");
    const closeImageBtn = document.querySelector(".close-image-btn");
    const showImage = document.querySelector(".show-image");

    showImage.style.top = "50%";

    showImageBtnsDesktop.forEach((btn) => {
      btn.addEventListener("click", (e) => this.openShowImage(e));
    });
    closeImageBtn.addEventListener("click", this.closeShowImage);
  }

  openShowImage(e) {
    window.scrollTo(0, 0);

    const branch = e.target.parentNode.dataset.img;
    const largeImage = document.querySelector(".large-image");

    switch (branch) {
      case "ekbatan":
        largeImage.src = "/client/assets/images/ekbatan.jfif";
        break;

      case "aghdasiyeh":
        largeImage.src = "/client/assets/images/aghdasiyeh.jfif";
        break;

      case "chalos":
        largeImage.src = "/client/assets/images/chalos.jfif";
        break;

      case "vanak":
        largeImage.src = "/client/assets/images/vanak.jpg";
        break;
    }

    document.querySelector(".show-image").style.display = "block";
    document.querySelector("#app").classList.add("blur");
  }

  closeShowImage() {
    document.querySelector(".show-image").style.display = "none";
    document.querySelector("#app").classList.remove("blur");
  }
}
