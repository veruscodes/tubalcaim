// Fade-in ao carregar
document.body.classList.add("fade-in");

// Fade-out ao clicar em links internos
document.querySelectorAll("a.transition-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    let url = this.getAttribute("href");
    document.body.classList.remove("fade-in");
    setTimeout(() => {
      window.location.href = url;
    }, 600);
  });
});

if (location.pathname.endsWith(".html")) {
  let newPath = location.pathname.replace(".html", "");
  history.replaceState(null, "", newPath);
}

document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && (e.key === "c" || e.key === "u")) ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    e.key === "F12"
  ) {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  return false;
});

document.addEventListener("dragstart", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("selectstart", function (e) {
  e.preventDefault();
  return false;
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  return false;
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  return false;
});
// ===== CÓDIGO ESPECÍFICO PARA PÁGINA BUILDS =====

// Detecta se está na página de builds e adiciona classe
if (
  window.location.pathname.includes("builds") ||
  document.querySelector(".build")
) {
  document.body.classList.add("builds-page");

  // Fade-in escalonado para builds
  document.addEventListener("DOMContentLoaded", function () {
    const buildsElements = document.querySelectorAll(
      ".builds-page .container > *"
    );
    buildsElements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.8s ease ${
        0.2 + index * 0.1
      }s, transform 0.8s ease ${0.2 + index * 0.1}s`;
    });

    // Trigger fade-in
    setTimeout(() => {
      buildsElements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }, 100);
  });
}
