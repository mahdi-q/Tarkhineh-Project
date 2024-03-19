import Search from "./Search.js";
import Toggler from "./Toggler.js";

export default class AboutUsPage {
  constructor() {
    new Search();
    new Toggler();

    document.querySelector(".nav__links .fifth").classList.add("selected");
  }
}
