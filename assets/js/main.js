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
            fontFamily: {
                'heading': ['Poppins', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
            }
        }
    }
}

// Font loading optimization
function optimizeFontLoading() {
    // Add font loading state to body
    document.body.classList.add('fonts-loading');

    // Check when fonts are loaded
    const poppins = new FontFace('Poppins', 'url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2)');
    const inter = new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2)');

    Promise.all([poppins.load(), inter.load()]).then(function (fonts) {
        fonts.forEach(font => document.fonts.add(font));
        document.body.classList.remove('fonts-loading');
        document.body.classList.add('fonts-loaded');

        // Trigger a reflow to ensure smooth transition
        document.body.style.opacity = 0;
        setTimeout(() => {
            document.body.style.opacity = 1;
        }, 10);
    }).catch(function (error) {
        console.log('Font loading failed:', error);
        document.body.classList.remove('fonts-loading');
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', function () {
    // Optimize font loading
    optimizeFontLoading();

    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Initialize all components
    initMobileMenu();
    initBackToTop();
    initSupportProgress();
    initVideoPlayer();
    setCurrentYear();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('block')) {
                    mobileMenu.classList.remove('block');
                    mobileMenu.classList.add('hidden');
                }

                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
                menu.classList.toggle('block');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const menu = document.getElementById('mobile-menu');
        const menuBtn = document.getElementById('menu-btn');

        if (menu && !menu.classList.contains('hidden') &&
            !menu.contains(event.target) &&
            !menuBtn.contains(event.target)) {
            menu.classList.add('hidden');
            menu.classList.remove('block');
        }
    });
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Support Progress System
function initSupportProgress() {
    // Set days left in month
    function getDaysLeftInMonth() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const dayOfMonth = today.getDate();
        return lastDayOfMonth - dayOfMonth;
    }

    const daysLeftElement = document.getElementById('days-left');
    if (daysLeftElement) {
        const daysLeft = getDaysLeftInMonth();
        daysLeftElement.textContent = `${daysLeft} days left`;
    }

    // Mock data for progress (replace with real API data)
    function updateSupportProgress() {
        const goalAmountElement = document.getElementById('goal-amount');
        const currentAmountElement = document.getElementById('current-amount');
        const progressFillElement = document.getElementById('progress-fill');
        const supportersCountElement = document.getElementById('supporters-count');

        if (!currentAmountElement || !progressFillElement || !supportersCountElement) return;

        const mockData = {
            currentAmount: 0,
            goalAmount: 1000,
            supporters: 0,
            progressPercentage: 0
        };

        // Update display
        goalAmountElement.textContent = `Monthly Goal: $${mockData.goalAmount}`;
        currentAmountElement.textContent = `$${mockData.currentAmount}`;
        supportersCountElement.textContent = `${mockData.supporters} supporters`;
        progressFillElement.style.width = `${mockData.progressPercentage}%`;
    }

    updateSupportProgress();
}

// Video Play Functionality
function initVideoPlayer() {
    const playButton = document.querySelector('.bg-primary.hover\\:bg-primary\\/90');
    if (playButton) {
        playButton.addEventListener('click', function () {
            // Replace with actual video player functionality
            const videoContainer = this.closest('.bg-gray-900');
            if (videoContainer) {
                const thumbnail = videoContainer.querySelector('img');
                if (thumbnail) {
                    thumbnail.style.display = 'none';
                    this.style.display = 'none';

                    // Create iframe for YouTube video (replace with your video ID)
                    const iframe = document.createElement('iframe');
                    iframe.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1';
                    iframe.width = '100%';
                    iframe.height = '100%';
                    iframe.frameBorder = '0';
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true;
                    iframe.style.position = 'absolute';
                    iframe.style.top = '0';
                    iframe.style.left = '0';

                    const videoDiv = videoContainer.querySelector('.aspect-video');
                    if (videoDiv) {
                        videoDiv.appendChild(iframe);
                    }
                }
            }
        });
    }
}

// Image fallback handler
function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function () {
            const placeholderColor = this.classList.contains('footer-logo-img') ? '194173' : 'dbeafe';
            const textColor = this.classList.contains('footer-logo-img') ? 'ffffff' : '194173';
            const text = this.alt ? this.alt.charAt(0) : 'P';
            this.src = `https://via.placeholder.com/${this.width || 100}x${this.height || 100}/${placeholderColor}/${textColor}?text=${encodeURIComponent(text)}`;
        };
    });
}

// Initialize image error handling
handleImageErrors();

// Fix for slow loading images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('opacity-0');
            img.addEventListener('load', function () {
                this.classList.remove('opacity-0');
                this.classList.add('opacity-100', 'transition-opacity', 'duration-300');
            });
        }
    });
});