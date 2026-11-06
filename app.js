
"use strict";

// ==========================================
// INVITACIÓN DE MATEO
// BAUTISMO Y PRIMER AÑITO
// ==========================================

const CONFIG = {
  nombre: "Mateo",

  fecha: "Sábado 28 de noviembre de 2026",
  fechaEvento: "2026-11-28T17:00:00-03:00",

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

  // WhatsApp que recibe las confirmaciones
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
// FUNCIONES GENERALES
// ==========================================

const $ = id => document.getElementById(id);

const reduceMotion = () =>
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ==========================================
// PORTADA
// ==========================================

const welcome = $("welcome");
const main = $("main");
const openBtn = $("openBtn");

if (openBtn && welcome && main) {
  openBtn.addEventListener("click", () => {
    welcome.hidden = true;
    main.hidden = false;

    window.scrollTo(0, 0);

    initReveal();
    createParticles();
    celebrationEffect();
  });
}

// ==========================================
// PARTÍCULAS DORADAS
// ==========================================

function createParticles() {
  const container = $("particles");

  if (!container || reduceMotion()) return;

  container.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.textContent =
      Math.random() > 0.5 ? "✦" : "✧";

    particle.style.left = random(0, 100) + "%";
    particle.style.top = random(100, 120) + "vh";

    particle.style.setProperty(
      "--duration",
      random(12, 24) + "s"
    );

    particle.style.setProperty(
      "--delay",
      -random(0, 24) + "s"
    );

    container.appendChild(particle);
  }
}

// ==========================================
// EFECTO DE CELEBRACIÓN DELICADO
// ==========================================

function celebrationEffect() {
  if (reduceMotion()) return;

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

  for (let i = 0; i < 22; i++) {
    const piece = document.createElement("span");

    const size = random(3, 6);

    Object.assign(piece.style, {
      position: "absolute",
      left: random(0, 100) + "%",
      top: "-15px",
      width: size + "px",
      height: size * 1.5 + "px",
      borderRadius: "3px",
      background:
        colors[Math.floor(Math.random() * colors.length)]
    });

    layer.appendChild(piece);

    piece.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 0
        },
        {
          opacity: 0.65,
          offset: 0.15
        },
        {
          transform:
            `translateY(${window.innerHeight + 60}px) rotate(360deg)`,
          opacity: 0
        }
      ],
      {
        duration: random(2800, 4000),
        delay: random(0, 450),
        easing: "ease-in",
        fill: "forwards"
      }
    );
  }

  setTimeout(() => layer.remove(), 4600);
}

// ==========================================
// LLUVIA SUAVE DE OSITOS
// SOLO DENTRO DE LA PORTADA
// ==========================================

const bearRain = $("bearRain");

const bearRainBtn =
  $("bearRainBtn") || $("bearConfettiBtn");

let raining = false;

function startBearRain() {
  if (!bearRain || raining) return;

  if (reduceMotion()) return;

  raining = true;

  if (bearRainBtn) {
    bearRainBtn.disabled = true;
  }

  const symbols = [
    "🧸", "✧", "♡", "🧸", "✦", "♡"
  ];

  const total = 22;
  const height = bearRain.clientHeight;

  for (let i = 0; i < total; i++) {
    const drop = document.createElement("span");

    drop.className = "bear-drop";

    drop.textContent =
      symbols[i % symbols.length];

    drop.style.position = "absolute";
    drop.style.top = "-35px";

    drop.style.left =
      random(5, 95) + "%";

    drop.style.fontSize =
      random(11, 17) + "px";

    drop.style.color =
      i % 3 === 1 ? "#a6c5dd" : "#c6a879";

    drop.style.pointerEvents = "none";

    const duration = random(3500, 5000);
    const delay = random(0, 900);

    drop.style.setProperty(
      "--duration",
      duration + "ms"
    );

    drop.style.setProperty(
      "--delay",
      delay + "ms"
    );

    drop.style.setProperty(
      "--distance",
      height + 90 + "px"
    );

    drop.style.setProperty(
      "--drift",
      random(-35, 35) + "px"
    );

    bearRain.appendChild(drop);

    setTimeout(() => {
      drop.remove();
    }, duration + delay + 150);
  }

  setTimeout(() => {
    raining = false;

    if (bearRainBtn) {
      bearRainBtn.disabled = false;
    }
  }, 6100);
}

if (bearRainBtn) {
  bearRainBtn.addEventListener(
    "click",
    startBearRain
  );
}

// ==========================================
// GOOGLE MAPS
// ==========================================

function setupMap(buttonId, address) {
  const button = $(buttonId);

  if (!button) return;

  if (address.trim()) {
    button.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(address);

    button.target = "_blank";
    button.rel = "noopener noreferrer";

    button.removeAttribute("aria-disabled");
  } else {
    button.removeAttribute("href");
    button.removeAttribute("target");

    button.setAttribute(
      "aria-disabled",
      "true"
    );

    button.title =
      "Ubicación pendiente de confirmar";
  }
}

setupMap(
  "mapChurch",
  CONFIG.bautismo.direccion
);

setupMap(
  "mapParty",
  CONFIG.festejo.direccion
);

// ==========================================
// CUENTA REGRESIVA
// ==========================================

function updateCountdown() {
  const target =
    new Date(CONFIG.fechaEvento).getTime();

  if (!Number.isFinite(target)) return;

  const distance =
    Math.max(0, target - Date.now());

  const values = {
    days: Math.floor(distance / 86400000),

    hours: Math.floor(
      (distance / 3600000) % 24
    ),

    minutes: Math.floor(
      (distance / 60000) % 60
    ),

    seconds: Math.floor(
      (distance / 1000) % 60
    )
  };

  Object.entries(values).forEach(
    ([id, value]) => {
      const element = $(id);

      if (element) {
        element.textContent =
          String(value).padStart(2, "0");
      }
    }
  );

  if (distance === 0) {
    const text = $("countdownText");

    if (text) {
      text.textContent =
        "¡Llegó el gran día de Mateo! 💙";
    }
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// GALERÍA DE 6 FOTOS
// ==========================================

const gallery = $("gallery");
const photos = CONFIG.fotos;

if (gallery) {
  gallery.innerHTML = "";

  photos.forEach((src, index) => {
    const button =
      document.createElement("button");

    button.type = "button";
    button.className = "gallery-item reveal";

    button.setAttribute(
      "aria-label",
      `Ver recuerdo ${index + 1} de Mateo`
    );

    const img =
      document.createElement("img");

    img.src = src;
    img.alt =
      `Recuerdo ${index + 1} de Mateo`;

    img.loading = "lazy";

    button.appendChild(img);

    button.addEventListener("click", () => {
      openLightbox(index);
    });

    gallery.appendChild(button);
  });
}

// ==========================================
// VISOR DE FOTOS
// ==========================================

const lightbox = $("lightbox");
const lightboxImage = $("lightboxImage");
const photoCounter = $("photoCounter");

const closeLightboxBtn =
  $("closeLightbox");

const prevPhotoBtn =
  $("prevPhoto");

const nextPhotoBtn =
  $("nextPhoto");

let currentPhoto = 0;
let previousFocus = null;

function showPhoto(index) {
  if (!lightboxImage) return;

  currentPhoto =
    (index + photos.length) % photos.length;

  lightboxImage.src = photos[currentPhoto];

  lightboxImage.alt =
    `Recuerdo ${currentPhoto + 1} de Mateo`;

  if (photoCounter) {
    photoCounter.textContent =
      `${currentPhoto + 1} de ${photos.length}`;
  }
}

function openLightbox(index) {
  if (!lightbox) return;

  previousFocus = document.activeElement;

  showPhoto(index);

  lightbox.hidden = false;

  document.body.classList.add(
    "modal-open"
  );

  if (closeLightboxBtn) {
    closeLightboxBtn.focus();
  }
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;

  document.body.classList.remove(
    "modal-open"
  );

  if (previousFocus) {
    previousFocus.focus();
  }
}

if (closeLightboxBtn) {
  closeLightboxBtn.addEventListener(
    "click",
    closeLightbox
  );
}

if (prevPhotoBtn) {
  prevPhotoBtn.addEventListener(
    "click",
    () => showPhoto(currentPhoto - 1)
  );
}

if (nextPhotoBtn) {
  nextPhotoBtn.addEventListener(
    "click",
    () => showPhoto(currentPhoto + 1)
  );
}

if (lightbox) {
  lightbox.addEventListener(
    "click",
    event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    }
  );
}

document.addEventListener("keydown", event => {
  if (!lightbox || lightbox.hidden) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showPhoto(currentPhoto + 1);
  }

  if (event.key === "ArrowLeft") {
    showPhoto(currentPhoto - 1);
  }

  if (event.key === "Tab") {
    const controls = [
      closeLightboxBtn,
      prevPhotoBtn,
      nextPhotoBtn
    ].filter(Boolean);

    if (!controls.length) return;

    const first = controls[0];
    const last = controls[controls.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
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
// JUEGO DE LOS OSITOS
// ==========================================

const gameBoard = $("gameBoard");
const gameStatus = $("gameStatus");
const restartGame = $("restartGame");

function startGame() {
  if (!gameBoard) return;

  gameBoard.innerHTML = "";

  let found = 0;

  if (gameStatus) {
    gameStatus.textContent =
      "Encontraste 0 de 3 ositos";
  }

  const positions =
    Array.from({ length: 12 }, (_, i) => i);

  for (let i = positions.length - 1; i > 0; i--) {
    const j =
      Math.floor(Math.random() * (i + 1));

    [positions[i], positions[j]] =
      [positions[j], positions[i]];
  }

  const bears =
    new Set(positions.slice(0, 3));

  for (let i = 0; i < 12; i++) {
    const tile =
      document.createElement("button");

    tile.type = "button";
    tile.className = "game-tile";
    tile.textContent = "☁️";

    tile.setAttribute(
      "aria-label",
      `Nube ${i + 1}`
    );

    tile.addEventListener("click", () => {
      if (tile.disabled) return;

      tile.disabled = true;

      if (bears.has(i)) {
        tile.textContent = "🧸";
        tile.classList.add("found");

        found++;

        if (gameStatus) {
          gameStatus.textContent =
            `Encontraste ${found} de 3 ositos`;
        }

        if (found === 3) {
          if (gameStatus) {
            gameStatus.textContent =
              "¡Encontraste todos los ositos! 💙";
          }

          celebrationEffect();
        }
      } else {
        tile.textContent = "✦";
      }
    });

    gameBoard.appendChild(tile);
  }
}

if (restartGame) {
  restartGame.addEventListener(
    "click",
    startGame
  );
}

startGame();

// ==========================================
// CONFIRMACIÓN POR WHATSAPP
// ==========================================

const form = $("rsvpForm");
const attendance = $("attendance");
const guestCount = $("guestCount");
const guestCountLabel = $("guestCountLabel");
const formNotice = $("formNotice");

function updateAttendance() {
  if (!attendance) return;

  const coming =
    attendance.value === "si";

  if (guestCount) {
    guestCount.hidden = !coming;
    guestCount.disabled = !coming;
  }

  if (guestCountLabel) {
    guestCountLabel.hidden = !coming;
  }
}

if (attendance) {
  attendance.addEventListener(
    "change",
    updateAttendance
  );

  updateAttendance();
}

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const nameInput = $("guestName");

    // Compatible con el formulario actual
    const commentInput =
      $("message") || $("guestMessage");

    const name =
      nameInput ? nameInput.value.trim() : "";

    const comment =
      commentInput ? commentInput.value.trim() : "";

    const isComing =
      attendance ? attendance.value === "si" : true;

    const count =
      guestCount ? guestCount.value : "1";

    if (!name) {
      if (formNotice) {
        formNotice.textContent =
          "Por favor, escribí tu nombre.";
      }

      if (nameInput) nameInput.focus();

      return;
    }

    const phone =
      String(CONFIG.whatsapp).replace(/\D/g, "");

    if (!/^\d{10,15}$/.test(phone)) {
      if (formNotice) {
        formNotice.textContent =
          "El número de WhatsApp no es válido.";
      }

      return;
    }

    let message = "";

    if (isComing) {
      message =
        `¡Hola! Soy ${name} 💙\n\n` +
        `Quiero confirmar mi asistencia al ` +
        `Bautismo y Primer Añito de Mateo 🧸🎂\n\n` +
        `Cantidad de personas: ${count}`;
    } else {
      message =
        `¡Hola! Soy ${name}.\n\n` +
        `Muchas gracias por invitarme al ` +
        `Bautismo y Primer Añito de Mateo 💙\n\n` +
        `Lamentablemente no voy a poder asistir.`;
    }

    if (comment) {
      message +=
        `\n\nUn mensajito para Mateo:\n${comment}`;
    }

    const url =
      "https://api.whatsapp.com/send?phone=" +
      phone +
      "&text=" +
      encodeURIComponent(message);

    if (formNotice) {
      formNotice.textContent =
        "Abriendo WhatsApp para enviar tu confirmación...";
    }

    // Navegación directa: evita bloqueos de pop-ups
    window.location.assign(url);
  });
}

// ==========================================
// ANIMACIONES AL HACER SCROLL
// ==========================================

function initReveal() {
  const elements =
    document.querySelectorAll(".reveal");

  if (
    !("IntersectionObserver" in window) ||
    reduceMotion()
  ) {
    elements.forEach(element => {
      element.classList.add("visible");
    });

    return;
  }

  const observer =
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );
        }
      });
    }, {
      threshold: 0.08
    });

  elements.forEach(element => {
    observer.observe(element);
  });
}

// ==========================================
// BOTÓN VOLVER ARRIBA
// ==========================================

const backToTop = $("backToTop");

window.addEventListener(
  "scroll",
  () => {
    if (!backToTop || !main) return;

    backToTop.hidden =
      main.hidden ||
      window.scrollY < 450;
  },
  { passive: true }
);

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

if (main && !main.hidden) {
  initReveal();
  createParticles();
}

console.log(
  "Invitación de Mateo cargada correctamente 💙"
);
