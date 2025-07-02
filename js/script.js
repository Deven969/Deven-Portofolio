const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;

// 1. Animasi transisi tema
body.style.transition = "background 0.7s, color 0.7s";

// 2. Toast notification
function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);
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

// Toggle button click
toggleBtn.addEventListener("click", () => {
    const isLight = body.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
});

// On page load
window.onload = () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
};

// 3. Scroll to top button
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "⬆️";
scrollBtn.className = "scroll-top";
scrollBtn.style.display = "none";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});
scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 4. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// 5. Highlight menu saat scroll (jika ada nav dengan anchor)
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

// Progress bar animation on scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll('.progress').forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && !bar.classList.contains('animated')) {
      bar.classList.add('animated');
      bar.style.width = bar.getAttribute('style').match(/width:\s*([\d.]+%)/)[1];
    }
  });
});
// Toggle navbar menu on mobile
const mobileToggle = document.getElementById("mobile-menu-toggle");
const navMenu = document.querySelector(".navbar-menu");

mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});
