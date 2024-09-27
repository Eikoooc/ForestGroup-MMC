let burgerBtn;
let navMobile;
let navItems;
let nav;
let allDesktopNavItems;
let footerSpan;
let nameField;
let emailField;
let messageField;
let checkbox;
let submitBtn;
let inputArr;
let checkboxMsg;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMEvents = () => {
  burgerBtn.addEventListener("click", handleNav);
  window.addEventListener("scroll", scrollSpy);
  window.addEventListener("scroll", navBgc);
  currentYear();
  updateNavLinks();
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      validateNameAndTextarea();
      validateCheckbox();
      validateEmail();
    });
  }
};

const prepareDOMElements = () => {
  burgerBtn = document.querySelector(".nav__burger-btn");
  navMobile = document.querySelector(".nav-mobile");
  navItems = document.querySelectorAll(".nav-mobile__items-item");
  allDesktopNavItems = document.querySelectorAll(".nav a");
  nav = document.querySelector(".nav");
  footerSpan = document.querySelector(".footer__copyright-year");
  nameField = document.getElementById("name");
  emailField = document.getElementById("email");
  messageField = document.getElementById("msg");
  checkbox = document.querySelector(".contact__form-checkbox input");
  submitBtn = document.querySelector(".contact__form-btn");
  inputArr = [nameField, messageField];
  checkboxMsg = document.querySelector(".contact__form-checkbox-require");
};

const currentYear = () => {
  const year = new Date().getFullYear();
  footerSpan.innerText = year;
};

const handleNav = () => {
  navMobile.classList.toggle("nav-mobile--active");
  document.body.classList.add("fixed-position");
  nav.style.display = "none";

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navMobile.classList.remove("nav-mobile--active");
      document.body.classList.remove("fixed-position");
      setTimeout(() => {
        nav.style.display = "block";
      }, 300);
    });
  });

  if (navMobile.classList.contains("nav-mobile--active")) {
    setTimeout(() => {
      document.body.classList.add("fixed-position");
    }, 350);
  } else {
    document.body.classList.remove("fixed-position");
  }
};

const navBgc = () => {
  if (window.scrollY > 400) {
    nav.classList.add("nav--black");
  } else {
    nav.classList.remove("nav--black");
  }
};

const scrollSpy = () => {
  if (document.URL.includes("oferty.html")) {
    removeNavActive();
  } else if (document.URL.includes("kontakt.html")) {
    removeNavActive();
    allDesktopNavItems[4].classList.add("nav__items-item--active");
  } else if (window.scrollY <= 400) {
    removeNavActive();
    allDesktopNavItems[1].classList.add("nav__items-item--active");
  } else if (window.scrollY <= 1280) {
    removeNavActive();
    allDesktopNavItems[2].classList.add("nav__items-item--active");
  } else {
    removeNavActive();
    allDesktopNavItems[3].classList.add("nav__items-item--active");
  }
};

const removeNavActive = () => {
  allDesktopNavItems.forEach((e) =>
    e.classList.remove("nav__items-item--active")
  );
};

const updateNavLinks = () => {
  if (
    document.URL.includes("oferty.html") ||
    document.URL.includes("kontakt.html")
  ) {
    allDesktopNavItems.forEach((link) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        link.setAttribute("href", `./index.html${href}`);
      }
    });

    navItems.forEach((link) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        link.setAttribute("href", `./index.html${href}`);
      }
    });
  }
};

const validateNameAndTextarea = () => {
  inputArr.forEach((e) => {
    if (e.value === "") {
      e.classList.add("require");
    } else {
      e.classList.remove("require");
    }
  });
};

const validateCheckbox = () => {
  if(!checkbox.checked){
    checkboxMsg.style.opacity = '1'
  }else{
    checkboxMsg.style.opacity = '0'
  }
}

const validateEmail = () => {
  const reg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,4})$/i;

  if (reg.test(emailField.value)) {
    emailField.classList.remove("require");
  } else {
    emailField.classList.add("require");
  }
};

document.addEventListener("DOMContentLoaded", main);
