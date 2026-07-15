// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            if (mobileMenu.classList.contains('active')) mobileMenu.classList.remove('active');
        }
    });
});

// Set current year in footer
document.getElementById('currentYear').innerText = new Date().getFullYear();

// Optional: image fallback (if needed)
document.querySelectorAll('img').forEach(img => {
    img.onerror = () => {
        img.src = 'https://via.placeholder.com/400?text=Image+not+found';
    };
});

// Set copyright year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});