/**
 * PORTFOLIO AMOUR GOVOETCHAN - JAVASCRIPT SYSTEM
 * Dynamic Background Doodles, Interactive Navigation, Project Filters, Contact Handler.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initActiveNavLink();
  initProjectFilters();
  initContactForm();
  initCardAnimations();
  initBackgroundDoodles();
});

/* 1. Navbar Scroll Effect */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-custom");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* 2. Highlight Active Page Link */
function initActiveNavLink() {
  const currentPath = window.location.pathname.toLowerCase().replace(/\\/g, '/');
  const navLinks = document.querySelectorAll(".navbar-custom .nav-link");

  const isAbout = currentPath.includes("/about");
  const isSkills = currentPath.includes("/skills");
  const isCv = currentPath.includes("/cv");
  const isProjects = currentPath.includes("/projects");
  const isContacts = currentPath.includes("/contacts");
  const isHome = !isAbout && !isSkills && !isCv && !isProjects && !isContacts;

  navLinks.forEach(link => {
    const href = (link.getAttribute("href") || "").toLowerCase();

    if (isHome && (href === "./" || href === "../" || href === "index.html" || href.endsWith("/portfolio-amour/") || href.endsWith("/portfolio-amour/index.html"))) {
      link.classList.add("active");
    } else if (isAbout && href.includes("about")) {
      link.classList.add("active");
    } else if (isSkills && href.includes("skills")) {
      link.classList.add("active");
    } else if (isCv && href.includes("cv")) {
      link.classList.add("active");
    } else if (isProjects && href.includes("projects")) {
      link.classList.add("active");
    } else if (isContacts && href.includes("contacts")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* 3. Filter Projects by Category */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".btn-filter");
  const projectCards = document.querySelectorAll(".project-card-col");
  const sectionTitles = document.querySelectorAll(".project-section-title");

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      sectionTitles.forEach(title => {
        const secCat = title.getAttribute("data-section");
        if (category === "all" || category === secCat) {
          title.style.display = "block";
        } else {
          title.style.display = "none";
        }
      });

      projectCards.forEach(col => {
        if (category === "all" || col.getAttribute("data-category") === category) {
          col.style.display = "block";
          col.classList.add("animate__animated", "animate__fadeInUp");
        } else {
          col.style.display = "none";
        }
      });
    });
  });
}

/* 4. Contact Form Handler (Direct WhatsApp / Email) */
function initContactForm() {
  const contactForm = document.getElementById("portfolioContactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName")?.value || "Visiteur";
    const email = document.getElementById("contactEmail")?.value || "";
    const subject = document.getElementById("contactSubject")?.value || "Demande de contact";
    const message = document.getElementById("contactMessage")?.value || "";

    const fullText = `Bonjour Amour,\n\nJe suis ${name} (${email}).\nSujet: ${subject}\n\n${message}`;
    const whatsappUrl = `https://wa.me/2290165847856?text=${encodeURIComponent(fullText)}`;

    window.open(whatsappUrl, "_blank");

    const feedback = document.getElementById("contactFeedback");
    if (feedback) {
      feedback.classList.remove("d-none");
      feedback.innerHTML = `
        <div class="alert alert-dark text-white border-orange text-center mt-3" style="border:1px solid #FF6B00;">
          <i class="bi bi-check-circle-fill text-orange me-2"></i> Redirection vers WhatsApp en cours... Merci pour votre message !
        </div>
      `;
    }
  });
}

/* 5. Hover & Pulse Animations */
function initCardAnimations() {
  const cards = document.querySelectorAll(".glass-card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}

/* 6. Dynamic Background Doodles & Icons Injection */
function initBackgroundDoodles() {
  if (document.querySelector(".bg-doodles-container")) return;

  const container = document.createElement("div");
  container.className = "bg-doodles-container";

  const icons = [
    { class: "bi bi-code-slash", isWhite: false },
    { class: "bi bi-palette-fill", isWhite: true },
    { class: "bi bi-cpu-fill", isWhite: false },
    { class: "bi bi-phone-fill", isWhite: true },
    { class: "bi bi-braces", isWhite: false },
    { class: "bi bi-robot", isWhite: true },
    { class: "bi bi-stars", isWhite: false },
    { class: "bi bi-terminal-fill", isWhite: true }
  ];

  icons.forEach(item => {
    const iconEl = document.createElement("i");
    iconEl.className = `floating-doodle ${item.class} ${item.isWhite ? 'doodle-white' : ''}`;
    container.appendChild(iconEl);
  });

  document.body.prepend(container);
}
