"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.prventDefault;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener("click", openModal);
btnsOpenModal.forEach((btnmodal) =>
  btnmodal.addEventListener("click", openModal)
);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const scrollFromButton = document.querySelector(".btn--text");
//console.log(scrollFromButton);
const section1 = document.querySelector("#section--1");
// console.log(section1);

scrollFromButton.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);
  const tabnumber = clicked.dataset.tab;
  if (!clicked) return;
  tabContent.forEach((tb) =>
    tb.classList.remove("operations__content--active")
  );
  tabs.forEach((tb) => tb.classList.remove("operations__tab--active"));

  clicked.classList.add("operations__tab--active");
  tabContent[tabnumber - 1].classList.add("operations__content--active");
});

const navLinks = document.querySelector(".nav__links");
// console.log(navLinks);

const hovering = function (e, This) {
  const link = e.target;
  // console.log(link);
  // link.opacity = 0;
  if (!e.target.href) return;
  const siblings =
    link.parentElement.parentElement.querySelectorAll(".nav__link");
  // console.log(siblings);
  siblings.forEach((l) => {
    if (l != link) l.style.opacity = this;
  });
  // link.style.opacity = 1;
  const logo = document.querySelector(".nav__logo");
  logo.style.opacity = this;
};

navLinks.addEventListener("mouseover", hovering.bind(0.5));
navLinks.addEventListener("mouseout", hovering.bind(1));

// const inititalCoor = section1.getBoundingClientRect();
// console.log(inititalCoor);
// window.addEventListener("scroll", function () {
//   if (window.scrollY > inititalCoor.top) {
//     // console.log("yo");
//     console.log(navLinks);
//     navLinks.closest("nav").classList.add("sticky");
//   } else navLinks.closest("nav").classList.remove("sticky");
// });
//Another way-IntersectionObserverAPI
const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    // console.log(entry);
  });
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

//
const header = document.querySelector(".header");
const navHeight = navLinks.closest("nav").getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navLinks.closest("nav").classList.add("sticky");
  // console.log(entry);
  else navLinks.closest("nav").classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//

//revealing sections
const sections = document.querySelectorAll(".section");
console.log(sections);

sections.forEach((sec) => sec.classList.add("section--hidden"));

const revealer = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove("section--hidden");
  console.log(entry);
  observer.unobserve(entry.target);
};

const observerToreveal = new IntersectionObserver(revealer, {
  root: null,
  threshold: 0.2,
});

sections.forEach((s) => {
  observerToreveal.observe(s);
});
//

//lazy loading
const images = document.querySelectorAll(".features__img");
console.log(images);

const imgLoader = function (entries, observer) {
  console.log(entries);
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(imgLoader, {
  root: null,
  threshold: 1,
});

images.forEach((im) => imageObserver.observe(im));

//slider implementation
const slides = document.querySelectorAll(".slide");
const btnleft = document.querySelector(".slider__btn--left");
const btnright = document.querySelector(".slider__btn--right");

let currSlide = 0;
const maxSlides = slides.length;

const goToSlide = function (slide) {
  slides.forEach((sl, i) => {
    sl.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
goToSlide(0);

const nextSlide = function () {
  if (currSlide < maxSlides) goToSlide(currSlide++);
  else {
    goToSlide(0);
    currSlide = 0;
  }
};

const prevSlide = function () {
  if (currSlide >= 0) goToSlide(currSlide--);
  else {
    goToSlide(maxSlides - 1);
    currSlide = maxSlides - 1;
  }
};

btnright.addEventListener("click", nextSlide);
btnleft.addEventListener("click", prevSlide);
