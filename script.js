const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");
const appUrl = "https://flebogram.elevenmind.com.br/";
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent =
    "Obrigado pelo interesse no Flebogram. Vamos direcionar você para o app.";
  leadForm.reset();
  window.setTimeout(() => {
    window.location.href = appUrl;
  }, 700);
});

if (heroSlides.length > 1) {
  let activeHeroSlide = heroSlides.findIndex((slide) => slide.classList.contains("is-active"));

  if (activeHeroSlide < 0) {
    activeHeroSlide = 0;
    heroSlides[0].classList.add("is-active");
  }

  window.setInterval(() => {
    heroSlides[activeHeroSlide].classList.remove("is-active");
    activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
    heroSlides[activeHeroSlide].classList.add("is-active");
  }, 6500);
}
