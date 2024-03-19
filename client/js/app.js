import UI from "./UI-Creator.js";
import MainPage from "./main-page.js";
import NotFoundPage from "./not-found-page.js";
import BranchesPage from "./branches-page.js";
import MenuPage from "./menu-page.js";
import Search from "./Search.js";
import AboutUsPage from "./about-us-page.js";
import ContactUsPage from "./contact-us-page.js";
import FranchisePage from "./franchise-page.js";
import FAQPage from "./faq-page.js";
import RulesPage from "./rules-page.js";
import PrivacyPage from "./privacy-page.js";

document.addEventListener("DOMContentLoaded", () => {
  router();

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigatedTo(e.target.href);
      window.scrollTo(0, 0);
    }
  });
});

export function router() {
  const routes = [
    {
      path: "/",
      ui: () => UI("/client/pages/main-page.html"),
      object: () => new MainPage(),
    },
    {
      path: "/ekbatan",
      ui: () => UI("/client/pages/ekbatan-page.html"),
      object: () => new BranchesPage("ekbatan"),
    },
    {
      path: "/chalos",
      ui: () => UI("/client/pages/chalos-page.html"),
      object: () => new BranchesPage("chalos"),
    },
    {
      path: "/aghdasiyeh",
      ui: () => UI("/client/pages/aghdasiyeh-page.html"),
      object: () => new BranchesPage("aghdasiyeh"),
    },
    {
      path: "/vanak",
      ui: () => UI("/client/pages/vanak-page.html"),
      object: () => new BranchesPage("vanak"),
    },
    {
      path: "/menu/main_dish",
      ui: () => UI("/client/pages/main-dish-page.html"),
      object: () => new MenuPage("main_dish"),
    },
    {
      path: "/menu/appetizer",
      ui: () => UI("/client/pages/appetizer-page.html"),
      object: () => new MenuPage("appetizer"),
    },
    {
      path: "/menu/dessert",
      ui: () => UI("/client/pages/dessert-page.html"),
      object: () => new MenuPage("dessert"),
    },
    {
      path: "/menu/drink",
      ui: () => UI("/client/pages/drink-page.html"),
      object: () => new MenuPage("drink"),
    },
    {
      path: "/menu/search",
      ui: () => UI("/client/pages/search-page.html"),
      object: () => new Search(),
    },
    {
      path: "/search",
      ui: () => UI("/client/pages/search-page.html"),
      object: () => new Search(),
    },
    {
      path: "/about-us",
      ui: () => UI("/client/pages/about-us-page.html"),
      object: () => new AboutUsPage(),
    },
    {
      path: "/contact-us",
      ui: () => UI("/client/pages/contact-us-page.html"),
      object: () => new ContactUsPage(),
    },
    {
      path: "/franchise",
      ui: () => UI("/client/pages/franchise-page.html"),
      object: () => new FranchisePage(),
    },
    {
      path: "/faq",
      ui: () => UI("/client/pages/faq-page.html"),
      object: () => new FAQPage(),
    },
    {
      path: "/rules",
      ui: () => UI("/client/pages/rules-page.html"),
      object: () => new RulesPage(),
    },
    {
      path: "/privacy",
      ui: () => UI("/client/pages/privacy-page.html"),
      object: () => new PrivacyPage(),
    },
  ];

  const potentialRoutes = routes.map((item) => {
    return {
      rout: item,
      isMatch: location.pathname === item.path,
    };
  });

  let match = potentialRoutes.find((item) => item.isMatch);

  if (!match) {
    match = {
      rout: {
        path: "/not-found",
        ui: () => UI("/client/pages/not-found-page.html"),
        object: () => new NotFoundPage(),
      },
      isMatch: true,
    };
  }

  match.rout.ui();
  setTimeout(() => match.rout.object(), 1000);

  const navLinks = document.querySelectorAll(".nav__links .nav__link");
  [...navLinks].forEach((link) => {
    link.classList.remove("selected");
  });

  document.querySelector(".nav__links .second .link .text").innerHTML = "شعبه";
}

function navigatedTo(url) {
  history.pushState(null, null, url);
  router();
}

window.addEventListener("popstate", router);
