tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#2563EB',
                secondary: '#1D4ED8',
                accent: '#06B6D4',
                success: '#10B981',
                dark: '#0F172A',
                muted: '#64748B',
                warning: '#f59e0b',
            },
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
});

 // Mobile menu toggle
document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Back to top button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Form Submission Feedback */
const form = document.querySelector('form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            form.reset();
            successMsg.classList.remove('hidden');
            errorMsg.classList.add('hidden');
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        successMsg.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
});