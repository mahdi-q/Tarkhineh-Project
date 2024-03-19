import Search from "./Search.js";
import Toggler from "./Toggler.js";

export default class FranchisePage {
  constructor() {
    new Search();
    new Toggler();

    document.querySelector(".nav__links .forth").classList.add("selected");
  }
}
