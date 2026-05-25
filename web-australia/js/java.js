const htmlEl = document.documentElement;
const translatableElements = document.querySelectorAll("[data-es]");
const langButtons = document.querySelectorAll(".lang-btn, .footer-lang-btn");

const languageLabels = {
  es: {
    esButton: "Cambiar idioma a español",
    enButton: "Change language to English",
    title: "Descubre Australia | Discover Australia"
  },
  en: {
    esButton: "Switch language to Spanish",
    enButton: "Change language to English",
    title: "Discover Australia | Descubre Australia"
  }
};

/* CAMBIO DE IDIOMA */
function setLanguage(lang) {
  if (!lang || (lang !== "es" && lang !== "en")) {
    lang = "es";
  }

  htmlEl.setAttribute("lang", lang);

  translatableElements.forEach((element) => {
    const text = element.getAttribute(`data-${lang}`);

    if (text) {
      element.textContent = text;
    }
  });

  document.title = languageLabels[lang].title;

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));

    if (button.dataset.lang === "es") {
      button.setAttribute("aria-label", languageLabels[lang].esButton);
    }

    if (button.dataset.lang === "en") {
      button.setAttribute("aria-label", languageLabels[lang].enButton);
    }
  });

  localStorage.setItem("preferredLanguage", lang);
  updateWelcomeMessage(lang);
}

/* MENSAJE PERSONALIZADO */
function updateWelcomeMessage(lang) {
  const welcome = document.getElementById("dynamic-welcome");

  if (!welcome) return;

  const hour = new Date().getHours();
  let message = "";

  if (lang === "es") {
    if (hour < 12) {
      message = "Buenos días, bienvenido a Descubre Australia.";
    } else if (hour < 18) {
      message = "Buenas tardes, explora la cultura, naturaleza y ciudades de Australia.";
    } else {
      message = "Buenas noches, descubre Australia de una forma interactiva.";
    }
  } else {
    if (hour < 12) {
      message = "Good morning, welcome to Discover Australia.";
    } else if (hour < 18) {
      message = "Good afternoon, explore Australia's culture, nature and cities.";
    } else {
      message = "Good evening, discover Australia interactively.";
    }
  }

  welcome.textContent = message;
}

/* BOTONES DE IDIOMA */
langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

/* MENÚS DESPLEGABLES */
const dropdowns = document.querySelectorAll(".nav-dropdown");

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("mouseover", () => {
    dropdown.classList.add("open");
  });

  dropdown.addEventListener("mouseout", () => {
    dropdown.classList.remove("open");
  });

  const mainLink = dropdown.querySelector(".nav-link");

  if (mainLink) {
    mainLink.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  }
});

/* SLIDER DE IMÁGENES */
const hero = document.querySelector(".hero");
const dots = document.querySelectorAll(".dot");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

const heroImages = [
  "imagenes/Sydney_img_3733.webp",
  "imagenes/9.3-que-ver-en-australia.jpg",
  "imagenes/cultura-australia.jpeg",
  "imagenes/QSWauSjGpVUSsNPaGZDw.jpg",
  "imagenes/woman-reserve-is-playing-with-kangaroo.jpg"
];

let currentSlide = 0;
let sliderInterval;

function showSlide(index) {
  if (!hero) return;

  currentSlide = index;

  if (currentSlide < 0) {
    currentSlide = heroImages.length - 1;
  }

  if (currentSlide >= heroImages.length) {
    currentSlide = 0;
  }

  hero.style.backgroundImage = `
    linear-gradient(rgba(9, 42, 34, 0.42), rgba(9, 42, 34, 0.42)),
    url("${heroImages[currentSlide]}")
  `;

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

function nextHeroSlide() {
  showSlide(currentSlide + 1);
}

function prevHeroSlide() {
  showSlide(currentSlide - 1);
}

function startSlider() {
  sliderInterval = setInterval(nextHeroSlide, 5000);
}

function resetSlider() {
  clearInterval(sliderInterval);
  startSlider();
}

if (nextSlide) {
  nextSlide.addEventListener("click", () => {
    nextHeroSlide();
    resetSlider();
  });
}

if (prevSlide) {
  prevSlide.addEventListener("click", () => {
    prevHeroSlide();
    resetSlider();
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = Number(dot.dataset.slide);
    showSlide(slideIndex);
    resetSlider();
  });
});

/* INICIO */
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("preferredLanguage");

  if (savedLanguage === "es" || savedLanguage === "en") {
    setLanguage(savedLanguage);
  } else {
    setLanguage("es");
  }

  showSlide(0);
  startSlider();
});