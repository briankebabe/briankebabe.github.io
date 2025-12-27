// ========== PESAPAD OPTIMIZED SCRIPT ==========
// Deferred loading for non-critical functionality

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        supportGoal: 100,
        currentAmount: 32,
        supporters: 58,
        daysLeft: 8,
        version: '1.0.0',
        stats: {
            downloads: 127,
            countries: 3,
            businesses: 500
        }
    };
    
    // DOM Ready Handler
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 PesaPad Optimized - DOM Ready');
        
        initPerformance();
        initNavigation();
        initAnimations();
        initDownloadFlow();
        initSupportWidget();
        initTestimonials();
        initFAQ();
        initAnalytics();
        initServiceWorker();
    });
    
    // Performance Optimizations
    function initPerformance() {
        // Lazy load images
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
        
        // Defer non-critical CSS
        const nonCriticalCSS = document.createElement('link');
        nonCriticalCSS.rel = 'stylesheet';
        nonCriticalCSS.href = 'assets/css/non-critical.css';
        nonCriticalCSS.media = 'print';
        nonCriticalCSS.onload = () => {
            nonCriticalCSS.media = 'all';
        };
        document.head.appendChild(nonCriticalCSS);
        
        // Preconnect to external domains
        const preconnects = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ];
        
        preconnects.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = true;
            document.head.appendChild(link);
        });
    }
    
    // Navigation
    function initNavigation() {
        const nav = document.querySelector('.sticky-nav');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const backToTop = document.getElementById('back-to-top');
        
        // Sticky nav on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
                backToTop.classList.remove('opacity-0', 'invisible');
            } else {
                nav.classList.remove('scrolled');
                backToTop.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Mobile menu
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
                this.setAttribute('aria-expanded', 
                    mobileMenu.classList.contains('hidden') ? 'false' : 'true'
                );
            });
            
            // Close on click outside
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                    
                    // Scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without scrolling
                    history.pushState(null, null, targetId);
                }
            });
        });
        
        // Back to top
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Animations
    function initAnimations() {
        // Animate stats counter
        const statElements = document.querySelectorAll('.stat-number');
        statElements.forEach(el => {
            const finalValue = parseInt(el.textContent);
            const duration = 2000;
            const step = finalValue / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= finalValue) {
                    el.textContent = finalValue.toLocaleString();
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
        
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }
    
    // Download Flow
    function initDownloadFlow() {
        const downloadBtn = document.getElementById('download-btn');
        const installGuide = document.getElementById('install-guide');
        const qrCode = document.getElementById('qr-code');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                // Track download click
                trackEvent('download_click', {
                    location: 'hero_section',
                    timestamp: new Date().toISOString()
                });
                
                // Show installation guide
                if (installGuide) {
                    installGuide.classList.remove('hidden');
                    installGuide.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Trigger download after delay
                setTimeout(() => {
                    window.open('https://drive.google.com/file/d/1CdxDP42z6zOzAUWYhoQENQfY4-dVJLMf/view?usp=drive_link', '_blank');
                }, 500);
            });
        }
        
        // Generate QR Code for mobile downloads
        if (qrCode) {
            const qrUrl = 'https://drive.google.com/file/d/1CdxDP42z6zOzAUWYhoQENQfY4-dVJLMf/view?usp=drive_link';
            qrCode.innerHTML = `
                <canvas id="qr-canvas"></canvas>
                <p class="text-sm text-gray-600 mt-2">Scan to download on mobile</p>
            `;
            
            // Load QR library dynamically
            if (typeof QRCode !== 'undefined') {
                new QRCode(document.getElementById('qr-canvas'), {
                    text: qrUrl,
                    width: 128,
                    height: 128
                });
            }
        }
    }
    
    // Support Widget
    function initSupportWidget() {
        const progressFill = document.querySelector('.progress-bar');
        const currentAmount = document.getElementById('current-amount');
        const supporterCount = document.getElementById('supporter-count');
        const daysLeft = document.getElementById('days-left');
        
        if (progressFill && currentAmount) {
            const percentage = (CONFIG.currentAmount / CONFIG.supportGoal) * 100;
            progressFill.style.width = `${Math.min(percentage, 100)}%`;
            
            // Animate counter
            animateCounter(currentAmount, CONFIG.currentAmount, '$');
            animateCounter(supporterCount, CONFIG.supporters, '');
            daysLeft.textContent = `${CONFIG.daysLeft} days left`;
        }
        
        // Donation button tracking
        document.querySelectorAll('[data-donation-platform]').forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.dataset.donationPlatform;
                trackEvent('donation_click', { platform });
                
                // Show thank you message
                const thankYou = document.createElement('div');
                thankYou.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
                thankYou.innerHTML = `
                    <i class="fas fa-heart mr-2"></i>
                    Thank you for supporting PesaPad!
                `;
                document.body.appendChild(thankYou);
                
                setTimeout(() => {
                    document.body.removeChild(thankYou);
                }, 3000);
            });
        });
    }
    
    // Testimonials Carousel
    function initTestimonials() {
        const carousel = document.querySelector('.testimonial-carousel');
        const prevBtn = document.getElementById('testimonial-prev');
        const nextBtn = document.getElementById('testimonial-next');
        const dots = document.querySelectorAll('.testimonial-dot');
        let currentIndex = 0;
        
        if (!carousel) return;
        
        const slides = carousel.children.length;
        
        function goToSlide(index) {
            currentIndex = (index + slides) % slides;
            carousel.scrollTo({
                left: currentIndex * carousel.offsetWidth,
                behavior: 'smooth'
            });
            updateDots();
        }
        
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
                dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
            });
        }
        
        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.dataset.index));
            });
        });
        
        // Auto-advance every 5 seconds
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
    
    // FAQ Accordion
    function initFAQ() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isOpen = answer.classList.contains('open');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('open');
                    ans.previousElementSibling.querySelector('i').className = 'fas fa-plus';
                });
                
                // Toggle current
                if (!isOpen) {
                    answer.classList.add('open');
                    this.querySelector('i').className = 'fas fa-minus';
                }
                
                // Track FAQ interaction
                trackEvent('faq_toggle', {
                    question: this.textContent.trim(),
                    action: isOpen ? 'close' : 'open'
                });
            });
        });
    }
    
    // Analytics
    function initAnalytics() {
        // Simple page view tracking
        trackEvent('page_view', {
            url: window.location.pathname,
            referrer: document.referrer
        });
        
        // Time on page tracking
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            trackEvent('time_on_page', {
                duration: timeSpent,
                page: window.location.pathname
            });
        });
        
        // Download success tracking (simplified for GitHub Pages)
        const downloadLinks = document.querySelectorAll('a[href*="drive.google.com"]');
        downloadLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('download_initiated', {
                    source: this.closest('section').id || 'unknown'
                });
            });
        });
    }
    
    // Service Worker for offline capability
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                    registration => {
                        console.log('✅ ServiceWorker registered:', registration.scope);
                    },
                    error => {
                        console.log('❌ ServiceWorker registration failed:', error);
                    }
                );
            });
        }
    }
    
    // Utility Functions
    function animateCounter(element, target, prefix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = prefix + target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = prefix + Math.floor(current).toLocaleString();
            }
        }, 30);
    }
    
    function trackEvent(eventName, data = {}) {
        // Simple tracking for GitHub Pages (could be enhanced with Google Analytics)
        const eventData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ...data
        };
        
        console.log('📊 Event:', eventData);
        
        // Store in localStorage for later analysis
        const events = JSON.parse(localStorage.getItem('pesapad_events') || '[]');
        events.push(eventData);
        localStorage.setItem('pesapad_events', JSON.stringify(events.slice(-100))); // Keep last 100 events
    }
    
    // Export for debugging
    window.PesaPad = {
        config: CONFIG,
        trackEvent,
        refreshStats: initSupportWidget
    };
})();

// Load non-critical libraries after page load
window.addEventListener('load', function() {
    // Load FontAwesome if needed
    if (!document.querySelector('.fa')) {
        const faScript = document.createElement('script');
        faScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
        faScript.defer = true;
        document.head.appendChild(faScript);
    }
    
    // Load QR code library if needed
    if (document.getElementById('qr-canvas')) {
        const qrScript = document.createElement('script');
        qrScript.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
        qrScript.defer = true;
        document.head.appendChild(qrScript);
    }
});