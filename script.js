// ===================== Header Toggle =====================
// Toggle menu on hamburger click
document.querySelector('.nav-toggle').addEventListener('click', function () {
  document.querySelector('.rotating-nav').classList.toggle('active');
});

// Close menu when any nav link is clicked
document.querySelectorAll('.rotating-nav a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.querySelector('.rotating-nav').classList.remove('active');
  });
});



// ===================== Typing Effect =====================
class TypeWriter {
  constructor(element, words, typingDelay = 100, erasingDelay = 50, pauseDelay = 2000) {
    this.element = element;
    this.words = words;
    this.typingDelay = typingDelay;
    this.erasingDelay = erasingDelay;
    this.pauseDelay = pauseDelay;
    this.wordIndex = 0;
    this.isDeleting = false;
    this.timeout = null;
  }

  start() {
    this.type();
  }

  type() {
    const currentWord = this.words[this.wordIndex % this.words.length];
    const currentText = this.isDeleting 
      ? currentWord.substring(0, this.element.textContent.length - 1)
      : currentWord.substring(0, this.element.textContent.length + 1);

    this.element.textContent = currentText;

    if (!this.isDeleting && currentText === currentWord) {
      this.isDeleting = true;
      this.timeout = setTimeout(() => this.type(), this.pauseDelay);
    } else if (this.isDeleting && currentText === '') {
      this.isDeleting = false;
      this.wordIndex++;
      this.timeout = setTimeout(() => this.type(), this.typingDelay);
    } else {
      const delay = this.isDeleting ? this.erasingDelay : this.typingDelay;
      this.timeout = setTimeout(() => this.type(), delay);
    }
  }

  clear() {
    clearTimeout(this.timeout);
  }
}

  // Get all sections and nav links
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.rotating-nav a');

window.addEventListener('scroll', () => {
  let scrollY = window.scrollY;

  sections.forEach(sec => {
    let sectionTop = sec.offsetTop - 150;
    let sectionHeight = sec.offsetHeight;
    let sectionId = sec.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));

      let activeLink = document.querySelector('.rotating-nav a[href="#' + sectionId + '"]');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
});



// ===================== Tab System =====================
class TabSystem {
  constructor(buttonSelector, cardSelector) {
    this.buttons = document.querySelectorAll(buttonSelector);
    this.cards = document.querySelectorAll(cardSelector);
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener("click", () => this.switchTab(button));
    });

    // Activate first tab by default
    if (this.buttons.length > 0) {
      this.switchTab(this.buttons[0]);
    }
  }

  switchTab(activeButton) {
    // Remove active class from all buttons and cards
    this.buttons.forEach(btn => btn.classList.remove("active"));
    this.cards.forEach(card => card.classList.remove("active"));

    // Add active class to clicked button
    activeButton.classList.add("active");

    // Find and activate corresponding card
    const targetId = activeButton.getAttribute("data-tab");
    const targetCard = document.getElementById(targetId);
    if (targetCard) {
      targetCard.classList.add("active");
    }
  }
}
//SKILLS BUTTON
const skillButtons = document.querySelectorAll('.skill-tab-btn');
const skillItems = document.querySelectorAll('.skill-item');

// On button click
skillButtons.forEach(button => {
  button.addEventListener('click', () => {
    skillButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.getAttribute('data-category');

    skillItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'all' || itemCategory === category) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// On page load: show only "skills"
window.addEventListener('DOMContentLoaded', () => {
  const defaultCategory = 'skills';

  skillItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    if (itemCategory === defaultCategory) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});



// ===================== Popup System =====================
class Popup {
  constructor(triggerSelector, popupSelector, closeSelector) {
    this.trigger = document.querySelector(triggerSelector);
    this.popup = document.querySelector(popupSelector);
    this.closeBtn = document.querySelector(closeSelector);
    this.init();
  }

  init() {
    if (this.trigger) {
      this.trigger.addEventListener("click", () => this.open());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Close when clicking outside content
    this.popup?.addEventListener("click", (e) => {
      if (e.target === this.popup) this.close();
    });
  }

  open() {
    this.popup?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.popup?.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ===================== Initialize Everything =====================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize TypeWriter
  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    const typewriter = new TypeWriter(typewriterElement, ["Software Engineer"]);
    typewriter.start();
  }

  // Initialize Tab System
  new TabSystem(".info-btn", ".tab-card");

  // Initialize Popup
  new Popup("#show-popup", ".popup-overlay", ".close-btn");
});

// Project Filtering Functionality
class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => this.filterProjects(button));
    });
  }

  filterProjects(activeButton) {
    // Update active button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');

    const filterValue = activeButton.getAttribute('data-filter');

    // Filter projects
    this.projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

// Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // ... existing initialization code ...
  
  // Initialize Project Filter
  new ProjectFilter();
});

//VIDEO
function openModal(videoSrc) {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  video.src = videoSrc;
  modal.style.display = "flex";
  video.play();
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  video.pause();
  video.currentTime = 0;
  video.src = "";
  modal.style.display = "none";
}

// Attach to all demo-link buttons
// This should only run when demo links are clicked
document.querySelectorAll('.demo-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const videoPath = this.getAttribute('data-video');
    if (videoPath) openModal(videoPath); // Explicit call required
  });
});
document.querySelector('.close').addEventListener('click', closeModal);

//CERTIFICATE FULL VIEW
function openCertificateModal(src) {
    const modal = document.getElementById("certificateModal");
    const modalImg = document.getElementById("modalCertificateImg");
    modalImg.src = src;
    modal.style.display = "flex";
  }

  function closeCertificateModal() {
    const modal = document.getElementById("certificateModal");
    const modalImg = document.getElementById("modalCertificateImg");
    modal.style.display = "none";
    modalImg.src = "";
  }

  // Optional: Close modal if user clicks outside the image
  window.addEventListener('click', function(e) {
    const modal = document.getElementById("certificateModal");
    if (e.target === modal) {
      closeCertificateModal();
    }
  });

  //CONTACT FORM
  const form = document.getElementById("contact-form");
  const messagePara = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          messagePara.textContent = "✅ Message sent successfully!";
          messagePara.style.display = "block";

          // Hide after 4 seconds
          setTimeout(() => {
            messagePara.style.display = "none";
          }, 4000);
        } else {
          messagePara.textContent = "❌ Message failed to send.";
          messagePara.style.display = "block";
        }
      })
      .catch((error) => {
        messagePara.textContent = "⚠️ An error occurred.";
        messagePara.style.display = "block";
      });
  });



//FOOTER LINKS
  document.getElementById("privacy-link").addEventListener("click", function (e) {
  e.preventDefault();
  const modal = document.getElementById("privacy-modal");
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10); // allow transition
});

document.getElementById("terms-link").addEventListener("click", function (e) {
  e.preventDefault();
  const modal = document.getElementById("terms-modal");
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10);
});

document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const modalId = this.getAttribute("data-close");
    const modal = document.getElementById(modalId);
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 400); // match transition time
  });
});

// Optional: Close modal when clicking outside
window.addEventListener("click", function (e) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.style.display = "none", 400);
    }
  });
});


 window.addEventListener("hashchange", function () {
    const section = document.querySelector(".projects-section");

    if (location.hash === "#skills") {
      section.style.paddingTop = "30rem";
    } else {
      section.style.paddingTop = "3rem";
    }
  });

  