var isMobile = window.innerWidth <= 768;

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": isMobile ? 50 : 140,
      "density": {
        "enable": true,
        "value_area": 900
      }
    },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.35
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.25,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": isMobile ? 1.2 : 2,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "resize": true
    }
  },
  "retina_detect": true
});
const openChat = document.getElementById("openChat");
const chatModal = document.getElementById("chatModal");
const closeChat = document.getElementById("closeChat");

openChat.addEventListener("click", () => {
    chatModal.classList.add("active");
});

closeChat.addEventListener("click", () => {
    chatModal.classList.remove("active");
});
const tags = document.querySelectorAll(".chat-tags .tag");
const feedback = document.getElementById("copyFeedback");

tags.forEach(tag => {
    tag.addEventListener("click", () => {
        const value = tag.getAttribute("data-tag");

        navigator.clipboard.writeText(value).then(() => {
            feedback.innerText = `Tag copiada: ${value}`;
            feedback.style.display = "block";

            setTimeout(() => {
                feedback.style.display = "none";
            }, 2000);
        });
    });
});
