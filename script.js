// ============================
// Dynamic Typing Layout Engine
// ============================
const titles = [
    "AI & ML Enthusiast",
    "Generative AI Explorer",
    "Agentic AI Developer",
    "Software Developer"
];

let titleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing-text");

function typeText() {
    if (!typingElement) return;

    if (charIndex < titles[titleIndex].length) {
        typingElement.textContent += titles[titleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 70);
    } else {
        setTimeout(eraseText, 1800);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingElement.textContent = titles[titleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 40);
    } else {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeText, 300);
    }
}

// ============================
// Interactive Modal Controls for Certificates
// ============================
function setupCertificateModal() {
    const modal = document.getElementById("certModal");
    const modalFrame = document.getElementById("modalFrame");
    const closeBtn = document.querySelector(".close-modal");
    const certCards = document.querySelectorAll(".cert-card");

    if (!modal || !modalFrame) return;

    certCards.forEach(card => {
        const btn = card.querySelector(".view-cert-btn");
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const targetSrc = card.getAttribute("data-cert-src");
                if (targetSrc && targetSrc !== "#") {
                    modalFrame.src = targetSrc;
                    modal.style.display = "block";
                    document.body.style.overflow = "hidden"; // Lock page scroll
                } else {
                    alert("Certificate document asset path not set yet! Add your file path to the data-cert-src attribute.");
                }
            });
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            modalFrame.src = "";
            document.body.style.overflow = "auto"; // Restore page scroll
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            modalFrame.src = "";
            document.body.style.overflow = "auto";
        }
    });
}

// ============================
// Initialization Router
// ============================
document.addEventListener("DOMContentLoaded", () => {
    typeText();
    setupCertificateModal();

    // Set Current Footer Year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Active Intersection Observers for section fading effect
    const sections = document.querySelectorAll(".hidden");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(el => observer.observe(el));
});

// ============================
// Smooth Scrolling Interface
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ============================
// Navigation Highlight Loop & Top Scroll Visibility
// ============================
const sectionElements = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
const navbar = document.querySelector("nav");
const topButton = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Handle Active Navigation Link Mapping
    sectionElements.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        if (scrollPosition >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

    // Handle Navbar Transform Class
    if (scrollPosition > 50) {
        navbar.classList.add("nav-scrolled");
    } else {
        navbar.classList.remove("nav-scrolled");
    }

    // Floating Button Engine Toggle
    if (topButton) {
        if (scrollPosition > 400) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}