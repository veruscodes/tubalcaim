const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__content h4", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".header__content .socials li", {
  ...scrollRevealOption,
  delay: 2500,
  interval: 500,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 5000,
});
ScrollReveal().reveal(".portfolio__item", {
  ...scrollRevealOption,
  interval: 200,
});
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio__item");

  // código que manipula portfolioItems
  portfolioItems.forEach((item) => {
    item.style.display = "block"; // ou o que precisar
  });

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelector(".filter-btn.active")
          ?.classList.remove("active");
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        portfolioItems.forEach((item) => {
          item.style.display =
            category === "all" || item.dataset.category === category
              ? "block"
              : "none";
        });
      });
    });
  }
});

// ==== Filtro de Portfólio ====
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio__item");

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelector(".filter-btn.active")
          ?.classList.remove("active");
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        portfolioItems.forEach((item) => {
          item.style.display =
            category === "all" || item.dataset.category === category
              ? "block"
              : "none";
        });
      });
    });
  }
});
function ensureVisible() {
  document.querySelectorAll('.portfolio__item').forEach(el => {
    el.style.opacity = 1;
    el.style.visibility = 'visible';
    el.style.transform = 'none';
  });
}

// força exibir tudo antes do filtro
window.addEventListener('load', ensureVisible);

// assets/js/carousel.js - VERSÃO CORRIGIDA

// Dados dos parceiros (substitua pelas logos reais dos seus parceiros)
const partners = [
  { 
    name: "YouTube", 
    logo: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    url: "https://youtube.com" 
  },
  { 
    name: "Twitch", 
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968819.png",
    url: "https://twitch.tv" 
  },
  { 
    name: "TikTok", 
    logo: "https://cdn-icons-png.flaticon.com/512/3046/3046126.png",
    url: "https://tiktok.com" 
  },
  { 
    name: "Instagram", 
    logo: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    url: "https://instagram.com" 
  },
  { 
    name: "Twitter", 
    logo: "https://cdn-icons-png.flaticon.com/512/124/124021.png",
    url: "https://twitter.com" 
  },
  { 
    name: "Facebook", 
    logo: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
    url: "https://facebook.com" 
  },
  { 
    name: "LinkedIn", 
    logo: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    url: "https://linkedin.com" 
  },
  { 
    name: "Discord", 
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
    url: "https://discord.com" 
  },
  { 
    name: "Spotify", 
    logo: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
    url: "https://spotify.com" 
  },
  { 
    name: "Reddit", 
    logo: "https://cdn-icons-png.flaticon.com/512/2111/2111589.png",
    url: "https://reddit.com" 
  }
];

// Configurações do carrossel
const itemsPerView = {
  desktop: 5,
  tablet: 3,
  mobile: 2
};

// Elementos do DOM
let track, prevBtn, nextBtn, indicatorsContainer;

// Estado do carrossel
let currentIndex = 0;
let autoScrollInterval;
let itemsVisible = getItemsPerView();
let isTransitioning = false;

// Obter número de itens visíveis baseado na largura da tela
function getItemsPerView() {
  if (window.innerWidth <= 480) {
    return itemsPerView.mobile;
  } else if (window.innerWidth <= 768) {
    return itemsPerView.tablet;
  } else {
    return itemsPerView.desktop;
  }
}

// Inicializar carrossel
function initCarousel() {
  track = document.getElementById('partners-track');
  prevBtn = document.getElementById('prev-btn');
  nextBtn = document.getElementById('next-btn');
  indicatorsContainer = document.getElementById('indicators');
  
  if (!track) return; // Se não existir carrossel na página, sair
  
  // Duplicar os itens para criar efeito infinito
  const duplicatedPartners = [...partners, ...partners, ...partners];
  
  renderPartners(duplicatedPartners);
  setupIndicators();
  updateCarousel();
  startAutoScroll();
  setupEventListeners();
  setupResponsive();
}

// Renderizar parceiros no carrossel
function renderPartners(partnersList) {
  track.innerHTML = '';
  
  partnersList.forEach((partner, index) => {
    const partnerItem = document.createElement('div');
    partnerItem.className = 'partner__item';
    partnerItem.setAttribute('data-index', index);
    
    const link = document.createElement('a');
    link.href = partner.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.style.justifyContent = 'center';
    link.style.width = '100%';
    link.style.height = '100%';
    
    link.innerHTML = `
      <img src="${partner.logo}" alt="${partner.name}" class="partner__logo" 
           onerror="this.src='https://via.placeholder.com/120x60/333333/FFFFFF?text=LOGO'">
      <span style="position: absolute; bottom: -20px; font-size: 0.7rem; color: var(--primary-color); opacity: 0; transition: opacity 0.3s ease;">${partner.name}</span>
    `;
    
    // Mostrar nome no hover
    partnerItem.addEventListener('mouseenter', function() {
      this.querySelector('span').style.opacity = '1';
    });
    
    partnerItem.addEventListener('mouseleave', function() {
      this.querySelector('span').style.opacity = '0';
    });
    
    partnerItem.appendChild(link);
    track.appendChild(partnerItem);
  });
}

// Configurar indicadores
function setupIndicators() {
  indicatorsContainer.innerHTML = '';
  const totalSlides = Math.ceil(partners.length / itemsVisible);
  
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    if (i === 0) indicator.classList.add('active');
    
    indicator.addEventListener('click', () => {
      goToSlide(i);
    });
    
    indicatorsContainer.appendChild(indicator);
  }
}

// Atualizar carrossel
function updateCarousel() {
  if (!track.children.length || isTransitioning) return;
  
  const itemWidth = track.querySelector('.partner__item').offsetWidth + 32;
  const translateX = -currentIndex * itemWidth;
  
  // Aplicar transição suave
  track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  track.style.transform = `translateX(${translateX}px)`;
  
  // Verificar se chegou ao final e resetar suavemente
  const totalItems = track.children.length;
  const maxIndex = totalItems - itemsVisible * 3; // Margem de segurança
  
  if (currentIndex >= maxIndex) {
    setTimeout(() => {
      isTransitioning = true;
      track.style.transition = 'none';
      currentIndex = partners.length; // Voltar para o início duplicado
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
      
      // Forçar reflow
      track.offsetHeight;
      
      setTimeout(() => {
        isTransitioning = false;
        track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 50);
    }, 800);
  }
  
  if (currentIndex <= 0) {
    setTimeout(() => {
      isTransitioning = true;
      track.style.transition = 'none';
      currentIndex = partners.length * 2; // Ir para o final duplicado
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
      
      // Forçar reflow
      track.offsetHeight;
      
      setTimeout(() => {
        isTransitioning = false;
        track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 50);
    }, 800);
  }
  
  // Atualizar indicadores
  updateIndicators();
}

// Atualizar indicadores
function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  if (!indicators.length) return;
  
  const realIndex = currentIndex % partners.length;
  const activeIndicator = Math.floor(realIndex / itemsVisible);
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === activeIndicator);
  });
}

// Navegar para slide específico
function goToSlide(index) {
  if (isTransitioning) return;
  
  currentIndex = index * itemsVisible;
  updateCarousel();
  resetAutoScroll();
}

// Avançar slide
function nextSlide() {
  if (isTransitioning) return;
  
  currentIndex += itemsVisible;
  updateCarousel();
  resetAutoScroll();
}

// Voltar slide
function prevSlide() {
  if (isTransitioning) return;
  
  currentIndex -= itemsVisible;
  updateCarousel();
  resetAutoScroll();
}

// Iniciar rolagem automática
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    nextSlide();
  }, 3000); // Muda a cada 3 segundos
}

// Parar rolagem automática
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Reiniciar rolagem automática
function resetAutoScroll() {
  stopAutoScroll();
  startAutoScroll();
}

// Configurar event listeners
function setupEventListeners() {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Pausar auto-scroll quando o mouse estiver sobre o carrossel
  const carousel = document.querySelector('.partners__carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
  }
  
  // Touch events para mobile
  let startX = 0;
  let isDragging = false;
  
  if (track) {
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoScroll();
    });
    
    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      
      if (Math.abs(diff) > 50) { // Threshold para considerar como swipe
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        isDragging = false;
      }
    });
    
    track.addEventListener('touchend', () => {
      isDragging = false;
      startAutoScroll();
    });
  }
}

// Configurar responsividade
function setupResponsive() {
  window.addEventListener('resize', () => {
    const newItemsVisible = getItemsPerView();
    
    if (newItemsVisible !== itemsVisible) {
      itemsVisible = newItemsVisible;
      currentIndex = partners.length; // Reset para posição inicial
      setupIndicators();
      updateCarousel();
    }
  });
}

// Inicializar quando o DOM estiver carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}

