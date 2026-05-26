(() => {
  const transition = document.getElementById("pageTransition");
  const links = document.querySelectorAll("a[data-page-link]");

  if (!transition || !links.length) {
    return;
  }

  links.forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") {
        return;
      }

      event.preventDefault();
      transition.classList.add("page-transition--active");
      window.setTimeout(() => {
        window.location.href = href;
      }, 320);
    });
  });
})();
