
const btn = document.getElementById('toggle-theme');
btn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const toast = document.getElementById('toast');
  toast.textContent = document.body.classList.contains('light') ? "Light Mode Aktif" : "Dark Mode Aktif";
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
