/* =========================================================
   BRIAN KEBABE — PORTFOLIO JS
   ========================================================= */

/* =========================================================
   ELEMENTS
   ========================================================= */

const navbar = document.getElementById("navbar");
const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const currentYear = document.getElementById("currentYear");
const progressBar = document.querySelector(".scroll-progress");
const cursorGlow = document.querySelector(".cursor-glow");

/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   NAVBAR ON SCROLL
   ========================================================= */

function updateNavbar() {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar, {
  passive: true,
});

updateNavbar();

/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function updateProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, {
  passive: true,
});

updateProgress();

/* =========================================================
   MOBILE MENU
   ========================================================= */

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");

    mobileBtn.classList.toggle("active", isOpen);

    mobileBtn.setAttribute("aria-expanded", String(isOpen));

    /* Lock page scroll while the menu is open */
    document.body.classList.toggle("menu-open", isOpen);
  });

  /* Close menu after clicking a link */

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");

      mobileBtn.classList.remove("active");

      mobileBtn.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    });
  });

  /* Close menu when resizing to desktop */

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove("active");

        mobileBtn.classList.remove("active");

        mobileBtn.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");
      }
    },
    { passive: true },
  );
}

/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/* =========================================================
   TYPEWRITER ROTATING ROLES
   ========================================================= */

document.querySelectorAll("[data-typewriter]").forEach((element) => {
  let phrases = [];

  try {
    phrases = JSON.parse(element.dataset.phrases || "[]");
  } catch (error) {
    phrases = [];
  }

  if (!phrases.length) return;

  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = true;

  element.textContent = phrases[0];

  function typeNext() {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      characterIndex++;
      element.textContent = phrase.slice(0, characterIndex);

      if (characterIndex >= phrase.length) {
        deleting = true;
        setTimeout(typeNext, 2400);
        return;
      }

      setTimeout(typeNext, 65);
      return;
    }

    characterIndex--;
    element.textContent = phrase.slice(0, Math.max(characterIndex, 0));

    if (characterIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeNext, 350);
      return;
    }

    setTimeout(typeNext, 35);
  }

  setTimeout(() => {
    deleting = true;
    typeNext();
  }, 1800);
});

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

const counters = document.querySelectorAll("[data-count]");

function animateCounter(element) {
  const target = Number(element.dataset.count);

  const duration = 1200;

  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    const eased = 1 - Math.pow(1 - progress, 3);

    element.textContent = Math.floor(target * eased);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + "+";
    }
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);

        counterObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.7,
    },
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(
  ".desktop-nav > a:not(.nav-contact)",
);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
    },
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* =========================================================
   MOUSE GLOW
   ========================================================= */

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    },
    { passive: true },
  );

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.08;

    currentY += (mouseY - currentY) * 0.08;

    cursorGlow.style.left = `${currentX}px`;

    cursorGlow.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

/* =========================================================
   PROJECT CARD TILT
   ========================================================= */

const tiltCards = document.querySelectorAll(".project-card");

if (window.matchMedia("(pointer: fine)").matches) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;

      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -2;

      const rotateY = ((x - centerX) / centerX) * 2;

      card.style.transform = `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* =========================================================
   HERO VISUAL PARALLAX
   ========================================================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const profile = heroVisual.querySelector(".profile-card");

    if (!profile) return;

    profile.style.transform = `rotateX(${y * -5}deg)
                 rotateY(${x * 7}deg)
                 rotateZ(1deg)
                 translateY(-5px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    const profile = heroVisual.querySelector(".profile-card");

    if (!profile) return;

    profile.style.transform = "rotate(3deg)";
  });
}

/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.opacity = "0.25";

    console.warn(`Image could not be loaded: ${img.src}`);
  });
});
