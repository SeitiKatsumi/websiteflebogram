const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");
const appUrl = "https://flebogram.elevenmind.com.br/";
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

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

const revealTargets = document.querySelectorAll(
  ".section, .section-heading, .compare-card, .benefit-grid article, .pricing-card-grid article, .pricing-table-card, .pricing-rules article, .workflow-grid article, .proof-grid article, .lead-form, .diagnosis-card, .security-panel, .compat-panel, .trial-card, .final-cta > div, .photo-break-content, .real-shot, .phone-stage, .desktop-frame, .mobile-frame"
);

revealTargets.forEach((element) => element.classList.add("fx-reveal"));

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

if (!prefersReducedMotion && finePointer) {
  document.body.classList.add("is-interactive");

  const cursorAura = document.createElement("span");
  cursorAura.className = "cursor-aura";
  const cursorDot = document.createElement("span");
  cursorDot.className = "cursor-dot";
  const holoField = document.createElement("span");
  holoField.className = "holo-field";
  document.body.append(cursorAura, cursorDot, holoField);

  const tiltTargets = document.querySelectorAll(
    ".compare-card, .benefit-grid article, .pricing-card-grid article, .pricing-table-card, .pricing-rules article, .workflow-grid article, .proof-grid article, .lead-form, .diagnosis-card, .security-panel, .compat-panel, .trial-card, .final-cta > div, .real-shot, .desktop-frame, .mobile-frame, .phone-stage, .photo-break-content"
  );
  const magneticTargets = document.querySelectorAll(".btn, .header-cta, .mobile-sticky-cta");
  const parallaxTargets = document.querySelectorAll(".hero-copy, .hero-slideshow, .photo-break, .product-shots img");
  const allInteractiveTargets = [...tiltTargets, ...magneticTargets];

  tiltTargets.forEach((element) => element.classList.add("fx-card"));
  magneticTargets.forEach((element) => element.classList.add("fx-magnetic"));

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ticking = false;

  const renderPointer = () => {
    const xRatio = pointerX / window.innerWidth - 0.5;
    const yRatio = pointerY / window.innerHeight - 0.5;
    document.documentElement.style.setProperty("--cursor-x", `${pointerX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${pointerY}px`);
    document.documentElement.style.setProperty("--parallax-x", `${xRatio.toFixed(4)}`);
    document.documentElement.style.setProperty("--parallax-y", `${yRatio.toFixed(4)}`);

    parallaxTargets.forEach((element, index) => {
      const depth = index % 2 === 0 ? 18 : -12;
      element.style.setProperty("--depth-x", `${(-xRatio * depth).toFixed(2)}px`);
      element.style.setProperty("--depth-y", `${(-yRatio * depth).toFixed(2)}px`);
    });

    ticking = false;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!ticking) {
        window.requestAnimationFrame(renderPointer);
        ticking = true;
      }
    },
    { passive: true }
  );

  allInteractiveTargets.forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const rotateY = ((localX / rect.width) - 0.5) * 10;
      const rotateX = (((localY / rect.height) - 0.5) * -10);
      element.style.setProperty("--local-x", `${localX}px`);
      element.style.setProperty("--local-y", `${localY}px`);

      if (element.classList.contains("fx-card")) {
        element.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
        element.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      }

      if (element.classList.contains("fx-magnetic")) {
        const moveX = ((localX / rect.width) - 0.5) * 12;
        const moveY = ((localY / rect.height) - 0.5) * 8;
        element.style.setProperty("--magnet-x", `${moveX.toFixed(2)}px`);
        element.style.setProperty("--magnet-y", `${moveY.toFixed(2)}px`);
      }
    });

    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
      element.style.removeProperty("--magnet-x");
      element.style.removeProperty("--magnet-y");
      element.style.removeProperty("--local-x");
      element.style.removeProperty("--local-y");
    });
  });
}
