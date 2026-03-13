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

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const privacyInput = document.getElementById("privacy");
  const privacyError = document.getElementById("privacyError");
  const formMessage = document.getElementById("formMessage");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  function setError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector(".field-error");

    formGroup.classList.add("error");
    formGroup.classList.remove("success");

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function setSuccess(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector(".field-error");

    formGroup.classList.remove("error");
    formGroup.classList.add("success");

    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  function setCheckboxError(message) {
    const checkboxGroup = privacyInput.parentElement;
    checkboxGroup.classList.add("error");

    if (privacyError) {
      privacyError.textContent = message;
    }
  }

  function clearCheckboxError() {
    const checkboxGroup = privacyInput.parentElement;
    checkboxGroup.classList.remove("error");

    if (privacyError) {
      privacyError.textContent = "";
    }
  }

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (formMessage) {
      formMessage.textContent = "";
      formMessage.classList.remove("success", "error");
    }

    let isValid = true;

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue === "") {
      setError(nameInput, "Bitte gib deinen Namen ein.");
      isValid = false;
    } else if (nameValue.length < 2) {
      setError(nameInput, "Der Name ist zu kurz.");
      isValid = false;
    } else {
      setSuccess(nameInput);
    }

    if (emailValue === "") {
      setError(emailInput, "Bitte gib deine E-Mail-Adresse ein.");
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      setError(emailInput, "Bitte gib eine gültige E-Mail-Adresse ein.");
      isValid = false;
    } else {
      setSuccess(emailInput);
    }

    if (messageValue === "") {
      setError(messageInput, "Bitte schreibe eine Nachricht.");
      isValid = false;
    } else if (messageValue.length < 10) {
      setError(messageInput, "Die Nachricht sollte mindestens 10 Zeichen haben.");
      isValid = false;
    } else {
      setSuccess(messageInput);
    }

    if (!privacyInput.checked) {
      setCheckboxError("Bitte bestätige die Datenschutzhinweise.");
      isValid = false;
    } else {
      clearCheckboxError();
    }

    if (!isValid) {
      if (formMessage) {
        formMessage.textContent = "Bitte prüfe die markierten Felder.";
        formMessage.classList.add("error");
      }
      return;
    }

    try {
      submitButton.disabled = true;
      submitButton.textContent = "Wird gesendet...";

      const formData = new FormData(contactForm);

      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        if (formMessage) {
          formMessage.textContent = "Vielen Dank! Deine Nachricht wurde erfolgreich versendet.";
          formMessage.classList.add("success");
        }

        contactForm.reset();

        const groups = contactForm.querySelectorAll(".form-group");
        groups.forEach((group) => {
          group.classList.remove("success", "error");
        });

        clearCheckboxError();
      } else {
        if (formMessage) {
          formMessage.textContent = "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später erneut.";
          formMessage.classList.add("error");
        }
      }
    } catch (error) {
      if (formMessage) {
        formMessage.textContent = "Es konnte keine Verbindung hergestellt werden. Bitte versuche es später erneut.";
        formMessage.classList.add("error");
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Nachricht senden";
    }
  });
}