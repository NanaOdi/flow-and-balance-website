const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");

      const faqButton = faqItem.querySelector(".faq-question");
      if (faqButton) {
        faqButton.setAttribute("aria-expanded", "false");
      }
    });

    if (!isActive) {
      item.classList.add("active");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.textContent =
      "Dieses Formular ist in dieser Portfolio-Version noch nicht mit einem Versanddienst verbunden.";
  });
}