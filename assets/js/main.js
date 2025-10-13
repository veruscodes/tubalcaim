const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__content h4", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".header__content .socials li", {
  ...scrollRevealOption,
  delay: 2500,
  interval: 500,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 5000,
});
ScrollReveal().reveal(".portfolio__item", {
  ...scrollRevealOption,
  interval: 200,
});
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio__item");

  // código que manipula portfolioItems
  portfolioItems.forEach((item) => {
    item.style.display = "block"; // ou o que precisar
  });

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelector(".filter-btn.active")
          ?.classList.remove("active");
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        portfolioItems.forEach((item) => {
          item.style.display =
            category === "all" || item.dataset.category === category
              ? "block"
              : "none";
        });
      });
    });
  }
});

// ==== Filtro de Portfólio ====
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio__item");

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelector(".filter-btn.active")
          ?.classList.remove("active");
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        portfolioItems.forEach((item) => {
          item.style.display =
            category === "all" || item.dataset.category === category
              ? "block"
              : "none";
        });
      });
    });
  }
});
function ensureVisible() {
  document.querySelectorAll('.portfolio__item').forEach(el => {
    el.style.opacity = 1;
    el.style.visibility = 'visible';
    el.style.transform = 'none';
  });
}

// força exibir tudo antes do filtro
window.addEventListener('load', ensureVisible);

