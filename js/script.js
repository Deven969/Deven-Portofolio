// === DARK/LIGHT THEME TOGGLE ===
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;
body.style.transition = "background 0.7s, color 0.7s";

function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 1800);
}

function setTheme(mode) {
    if (mode === "light") {
        body.classList.add("light");
        toggleBtn.textContent = "🌙";
        showToast("Light mode aktif");
    } else {
        body.classList.remove("light");
        toggleBtn.textContent = "☀️";
        showToast("Dark mode aktif");
    }
    localStorage.setItem("theme", mode);
}

toggleBtn.addEventListener("click", () => {
    const isLight = body.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
});

window.onload = () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
};

// === SCROLL TO TOP ===
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑";
scrollBtn.className = "scroll-top";
scrollBtn.style.display = "none";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// === SMOOTH SCROLL FOR ANCHOR ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// === HIGHLIGHT ACTIVE MENU ===
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// === PROGRESS BAR ANIMATION ===
window.addEventListener("scroll", () => {
    document.querySelectorAll('.progress').forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
            bar.style.width = bar.getAttribute('style').match(/width:\s*([\d.]+%)/)[1];
        }
    });
});

// === MOBILE NAV TOGGLE ===


const navMenu = document.querySelector(".navbar-menu");
const overlay = document.createElement("div");
overlay.className = "mobile-overlay";
document.body.appendChild(overlay);

const mobileToggle = document.getElementById("mobile-menu-toggle");
mobileToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");
    overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
    navMenu.classList.remove("show");
    overlay.classList.remove("show");
});
