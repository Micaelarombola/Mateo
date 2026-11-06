
// ==========================================
// INVITACIÓN DE MATEO
// BAUTISMO Y PRIMER AÑITO
// ==========================================

const CONFIG = {
  nombre: "Mateo",

  fecha: "Sábado 28 de noviembre de 2026",

  bautismo: {
    hora: "17:00 hs",
    lugar: "Parroquia Nuestra Señora del Carmen",
    direccion: "Martin Fierro 5717, Villa Bosch"
  },

  festejo: {
    hora: "21:30 hs",
    lugar: "Saloncito Narciso",
    direccion: "Aviador Tte. Benjamín Matienzo 2215, Ciudad Jardin"
  },

  // Hora local de Argentina
  fechaEvento: "2026-11-28T17:00:00-03:00",

  // Completar con 549 + código de área + número
  whatsapp: "5491167809862",

  fotos: [
    "fotos/1.jfif",
    "fotos/4.jfif",
    "fotos/6.jfif",
    "fotos/8.jfif",
    "fotos/10.jfif",
    "fotos/12.jfif"
  ]
};


// ==========================================
// PORTADA
// ==========================================

const welcome = document.getElementById("welcome");
const main = document.getElementById("main");
const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", () => {
  welcome.hidden = true;
  main.hidden = false;

  window.scrollTo(0, 0);

  initReveal();
  createParticles();

  // Efecto breve de celebración al abrir
  celebrationEffect();
});


// ==========================================
// PARTÍCULAS DORADAS
// ==========================================

const particlesContainer =
  document.getElementById("particles");

function createParticles() {
  particlesContainer.innerHTML = "";

  if (window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches) return;

  for (let i = 0; i < 24; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.textContent = Math.random() > .5 ? "✦" : "✧";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = 100 + Math.random() * 20 + "vh";

    particle.style.setProperty(
      "--duration",
      12 + Math.random() * 12 + "s"
    );

    particle.style.setProperty(
      "--delay",
      -Math.random() * 24 + "s"
    );

    particlesContainer.appendChild(particle);
  }
}


// ==========================================
// EFECTO DE CELEBRACIÓN
// ==========================================

function celebrationEffect() {
  if (window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches) return;

  const layer = document.createElement("div");

  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    overflow: "hidden",
    zIndex: "200"
  });

  document.body.appendChild(layer);

  const colors = [
    "#a5c4dc",
    "#c7ad80",
    "#ffffff",
    "#d5e7f5"
  ];

  for (let i = 0; i < 35; i++) {
    const piece = document.createElement("span");

    const size = 4 + Math.random() * 5;

    Object.assign(piece.style, {
      position: "absolute",
      left: Math.random() * 100 + "%",
      top: "-15px",
      width: size + "px",
      height: size * 1.6 + "px",
      borderRadius: "2px",
      background: colors[
        Math.floor(Math.random() * colors.length)
      ]
    });

    layer.appendChild(piece);

    piece.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 0
        },
        {
          opacity: .85,
          offset: .15
        },
        {
          transform:
            `translateY(${window.innerHeight + 60}px) rotate(480deg)`,
          opacity: 0
        }
      ],
      {
        duration: 2500 + Math.random() * 1500,
        delay: Math.random() * 450,
        easing: "ease-in",
        fill: "forwards"
      }
    );
  }

  setTimeout(() => layer.remove(), 4500);
}


// ==========================================
// GOOGLE MAPS
// ==========================================

function setupMap(buttonId, address) {
  const button = document.getElementById(buttonId);

  if (address.trim()) {
    button.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(address);
  } else {
    button.removeAttribute("href");
    button.removeAttribute("target");
    button.setAttribute("aria-disabled", "true");
    button.title = "Ubicación pendiente de confirmar";
  }
}

setupMap("mapChurch", CONFIG.bautismo.direccion);
setupMap("mapParty", CONFIG.festejo.direccion);


// ==========================================
// CUENTA REGRESIVA
// ==========================================

const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

const countdownText =
  document.getElementById("countdownText");

function updateCountdown() {
  const target = new Date(CONFIG.fechaEvento).getTime();

  if (!Number.isFinite(target)) {
    countdownText.textContent = "Fecha no disponible";
    return;
  }

  const distance = target - Date.now();

  if (distance <= 0) {
    Object.values(countdownElements).forEach(el => {
      el.textContent = "00";
    });

    countdownText.textContent =
      "¡Llegó el gran día de Mateo! 💙";

    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance / 3600000) % 24);
  const minutes = Math.floor((distance / 60000) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownElements.days.textContent =
    String(days).padStart(2, "0");

  countdownElements.hours.textContent =
    String(hours).padStart(2, "0");

  countdownElements.minutes.textContent =
    String(minutes).padStart(2, "0");

  countdownElements.seconds.textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==========================================
// GALERÍA DE 6 FOTOS
// ==========================================

const gallery = document.getElementById("gallery");
const photos = CONFIG.fotos;

photos.forEach((src, index) => {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "gallery-item reveal";
  button.setAttribute(
    "aria-label",
    `Ver recuerdo ${index + 1} de Mateo`
  );

  const img = document.createElement("img");

  img.src = src;
  img.alt = `Recuerdo ${index + 1} de Mateo`;
  img.loading = "lazy";

  button.appendChild(img);

  button.addEventListener("click", () => {
    openLightbox(index);
  });

  gallery.appendChild(button);
});


// ==========================================
// VISOR DE FOTOS
// ==========================================

const lightbox = document.getElementById("lightbox");
const lightboxImage =
  document.getElementById("lightboxImage");

const photoCounter =
  document.getElementById("photoCounter");

const closeLightboxBtn =
  document.getElementById("closeLightbox");

const prevPhotoBtn =
  document.getElementById("prevPhoto");

const nextPhotoBtn =
  document.getElementById("nextPhoto");

let currentPhoto = 0;
let previousFocus = null;

function showPhoto(index) {
  currentPhoto =
    (index + photos.length) % photos.length;

  lightboxImage.src = photos[currentPhoto];
  lightboxImage.alt =
    `Recuerdo ${currentPhoto + 1} de Mateo`;

  photoCounter.textContent =
    `${currentPhoto + 1} de ${photos.length}`;
}

function openLightbox(index) {
  previousFocus = document.activeElement;

  showPhoto(index);

  lightbox.hidden = false;
  document.body.classList.add("modal-open");

  closeLightboxBtn.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("modal-open");

  if (previousFocus) previousFocus.focus();
}

closeLightboxBtn.addEventListener(
  "click", closeLightbox
);

prevPhotoBtn.addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
});

nextPhotoBtn.addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
});

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showPhoto(currentPhoto + 1);
  if (event.key === "ArrowLeft") showPhoto(currentPhoto - 1);

  if (event.key === "Tab") {
    const controls = [
      closeLightboxBtn,
      prevPhotoBtn,
      nextPhotoBtn
    ];

    const first = controls[0];
    const last = controls[controls.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }
});


// ==========================================
// JUEGO DE OSITOS
// ==========================================

const gameBoard =
  document.getElementById("gameBoard");

const gameStatus =
  document.getElementById("gameStatus");

const restartGame =
  document.getElementById("restartGame");

function startGame() {
  gameBoard.innerHTML = "";

  let found = 0;

  gameStatus.textContent =
    "Encontraste 0 de 3 ositos";

  const positions = Array.from(
    { length: 12 },
    (_, i) => i
  );

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [positions[i], positions[j]] =
      [positions[j], positions[i]];
  }

  const bears = new Set(positions.slice(0, 3));

  for (let i = 0; i < 12; i++) {
    const tile = document.createElement("button");

    tile.type = "button";
    tile.className = "game-tile";
    tile.textContent = "☁️";
    tile.setAttribute("aria-label", `Nube ${i + 1}`);

    tile.addEventListener("click", () => {
      if (tile.disabled) return;

      tile.disabled = true;

      if (bears.has(i)) {
        tile.textContent = "🧸";
        tile.classList.add("found");
        found++;

        gameStatus.textContent =
          `Encontraste ${found} de 3 ositos`;

        if (found === 3) {
          gameStatus.textContent =
            "¡Encontraste todos los ositos! 🎉";

          celebrationEffect();
        }
      } else {
        tile.textContent = "⭐";
      }
    });

    gameBoard.appendChild(tile);
  }
}

restartGame.addEventListener("click", startGame);
startGame();


// ==========================================
// CONFIRMACIÓN POR WHATSAPP
// ==========================================

const form = document.getElementById("rsvpForm");
const attendance = document.getElementById("attendance");
const guestCount = document.getElementById("guestCount");
const guestCountLabel =
  document.getElementById("guestCountLabel");

const formNotice =
  document.getElementById("formNotice");

attendance.addEventListener("change", () => {
  const coming = attendance.value === "si";

  guestCount.hidden = !coming;
  guestCountLabel.hidden = !coming;
  guestCount.disabled = !coming;
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const name =
    document.getElementById("guestName").value.trim();

  const comment =
    document.getElementById("message").value.trim();

  if (!name) {
    formNotice.textContent =
      "Por favor, escribí tu nombre.";
    return;
  }

  if (!/^\d{10,15}$/.test(CONFIG.whatsapp)) {
    formNotice.textContent =
      "Falta configurar el número de WhatsApp en app.js.";
    return;
  }

  let message;

  if (attendance.value === "si") {
    message =
      `¡Hola! Soy ${name} 💙\n\n` +
      `Quiero confirmar mi asistencia al ` +
      `bautismo y primer añito de Mateo 🧸🎂\n\n` +
      `Cantidad de personas: ${guestCount.value}`;
  } else {
    message =
      `¡Hola! Soy ${name}.\n\n` +
      `Muchas gracias por invitarme al ` +
      `bautismo y primer añito de Mateo 💙\n` +
      `Lamentablemente no voy a poder asistir.`;
  }

  if (comment) {
    message += `\n\nMensaje: ${comment}`;
  }

  const url =
    `https://wa.me/${CONFIG.whatsapp}?text=` +
    encodeURIComponent(message);

  formNotice.textContent =
    "Se abrirá WhatsApp. Enviá el mensaje para confirmar.";

  window.open(url, "_blank", "noopener,noreferrer");
});


// ==========================================
// EFECTOS AL DESPLAZARSE
// ==========================================

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: .08
  });

  elements.forEach(el => observer.observe(el));
}


// ==========================================
// BOTÓN VOLVER ARRIBA
// ==========================================

const backToTop =
  document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.hidden =
    main.hidden || window.scrollY < 450;
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// OSITOS DECORATIVOS EN EL FONDO
const bearBackground = document.createElement("div");
bearBackground.className = "bear-background";
bearBackground.setAttribute("aria-hidden", "true");
document.body.prepend(bearBackground);

const decorations = ["🧸", "☁️", "✦", "🧸", "☆"];

for (let i = 0; i < 14; i++) {
  const element = document.createElement("span");

  element.textContent = decorations[i % decorations.length];
  element.style.left = (5 + Math.random() * 90) + "%";
  element.style.top = (5 + Math.random() * 90) + "%";
  element.style.animationDelay = -(Math.random() * 9) + "s";

  bearBackground.appendChild(element);
}

// BOTÓN INTERACTIVO DE CONFITIS
const bearConfettiBtn = document.getElementById("bearConfettiBtn");

if (bearConfettiBtn) {
  bearConfettiBtn.addEventListener("click", () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      bearConfettiBtn.textContent = "🧸 ¡Qué lindo festejo!";
      return;
    }

    const shapes = ["🧸", "🧸", "🤎", "⭐", "☁️", "💙"];

    for (let i = 0; i < 65; i++) {
      const piece = document.createElement("span");

      piece.className = "bear-confetti-piece";
      piece.textContent = shapes[
        Math.floor(Math.random() * shapes.length)
      ];

      piece.style.left = Math.random() * 100 + "vw";
      piece.style.fontSize = (13 + Math.random() * 15) + "px";
      piece.style.setProperty(
        "--drift",
        (Math.random() * 220 - 110) + "px"
      );
      piece.style.setProperty(
        "--rotation",
        (Math.random() * 720 - 360) + "deg"
      );

      document.body.appendChild(piece);

      const duration = 2800 + Math.random() * 2200;
      const delay = Math.random() * 700;

      piece.style.animation =
        `bearConfettiFall ${duration}ms ease-in ${delay}ms forwards`;

      setTimeout(() => piece.remove(), duration + delay + 100);
    }
  });
}
