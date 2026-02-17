document.addEventListener("DOMContentLoaded", () => {
  // Mise à jour de l'année au footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Gestion du thème Dark/Light
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = localStorage.getItem("theme");
  const body = document.body;

  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    body.classList.add("dark");
  }

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    });
  }

  // Navigation Mobile
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") navLinks.classList.remove("open");
    });
  }

  // Filtres de projets
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        card.style.display = (filter === "all" || card.getAttribute("data-type") === filter) ? "flex" : "none";
      });
    });
  });

  // --- ENVOI DU FORMULAIRE VIA FORMSPREE (AJAX) ---
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault(); 
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      const data = new FormData(event.target);
      
      // État de chargement
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const response = await fetch(event.target.action, {
          method: contactForm.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert("Thank you! Your message has been sent successfully.");
          contactForm.reset();
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
      } catch (error) {
        alert("Connection error. Please try again later.");
      } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});