const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealNodes = document.querySelectorAll(".reveal");
const demoForms = document.querySelectorAll("[data-demo-form]");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    header.classList.toggle("menu-open", !expanded);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (header && navToggle) {
      header.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

demoForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.alert("Форма пока работает как демо. Следующим шагом можем подключить отправку в почту или CRM.");
  });
});
