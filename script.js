const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");
const appUrl = "https://flebogram.elevenmind.com.br/";

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
