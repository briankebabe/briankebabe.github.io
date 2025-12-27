// ========== PESAPAD PORTFOLIO - MAIN JAVASCRIPT ==========

// Tailwind configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#194173',
                secondary: '#2a5caa',
                accent: '#3b82f6',
                success: '#10B981',
                warning: '#f59e0b',
                dark: '#0F172A',
                muted: '#64748B',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PesaPad Portfolio Initialized 🚀');
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuButton = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('animate-fade-in');
            
            // Update button icon
            const icon = menuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuButton.querySelector('i').className = 'fas fa-bars text-xl';
            });
        });
    }
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuButton.querySelector('i').className = 'fas fa-bars text-xl';
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== FORM SUBMISSION HANDLING ==========
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                if (response.ok) {
                    // Success
                    contactForm.reset();
                    
                    if (successMsg) {
                        successMsg.classList.remove('hidden');
                        successMsg.classList.add('animate-fade-in');
                    }
                    
                    if (errorMsg) {
                        errorMsg.classList.add('hidden');
                    }
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        if (successMsg) {
                            successMsg.classList.add('hidden');
                        }
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form error:', error);
                
                // Show error message
                if (successMsg) {
                    successMsg.classList.add('hidden');
                }
                
                if (errorMsg) {
                    errorMsg.classList.remove('hidden');
                    errorMsg.classList.add('animate-fade-in');
                }
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ========== VIDEO PLAY BUTTON ==========
    const playVideoBtn = document.getElementById('play-video');
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', function() {
            // Replace with your actual YouTube/Vimeo video URL
            const videoUrl = 'https://www.youtube.com/embed/YOUR_VIDEO_ID';
            
            // Create modal for video
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
            modal.innerHTML = `
                <div class="relative w-full max-w-4xl">
                    <button class="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="aspect-video bg-black">
                        <iframe 
                            src="${videoUrl}?autoplay=1&rel=0" 
                            class="w-full h-full" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal on X click or outside click
            const closeBtn = modal.querySelector('button');
            closeBtn.addEventListener('click', () => document.body.removeChild(modal));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    }
    
    // ========== SUPPORT STATS UPDATER ==========
    function updateSupportStats() {
        // These would ideally come from an API or backend
        const stats = {
            currentAmount: 32,
            goalAmount: 100,
            supporterCount: 58,
            daysLeft: 8
        };
        
        // Update progress bar
        const progressElement = document.querySelector('.progress-fill');
        const progress = Math.min((stats.currentAmount / stats.goalAmount) * 100, 100);
        
        if (progressElement) {
            progressElement.style.width = `${progress}%`;
        }
        
        // Update text elements
        const currentAmountEl = document.getElementById('current-amount');
        const supportersCountEl = document.getElementById('supporters-count');
        const daysLeftEl = document.getElementById('days-left');
        
        if (currentAmountEl) currentAmountEl.textContent = `$${stats.currentAmount}`;
        if (supportersCountEl) supportersCountEl.textContent = `${stats.supporterCount} supporters`;
        if (daysLeftEl) daysLeftEl.textContent = `${stats.daysLeft} days left`;
    }
    
    // Initialize support stats
    updateSupportStats();
    
    // Update stats every minute (for demo purposes)
    setInterval(updateSupportStats, 60000);
    
    // ========== DONATION BUTTON CLICK TRACKING ==========
    document.querySelectorAll('[data-donation-platform]').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-donation-platform');
            console.log(`Donation clicked: ${platform}`);
            
            // You could send this to analytics here
            // Example: sendToAnalytics('donation_click', { platform: platform });
        });
    });
    
    // ========== SET CURRENT YEAR IN FOOTER ==========
    const yearElement = document.getElementById('year') || document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .stat-card, .donation-card').forEach(el => {
        observer.observe(el);
    });
    
    // ========== INSTALLATION GUIDE MODAL ==========
    const installGuideBtn = document.getElementById('install-guide-btn');
    if (installGuideBtn) {
        installGuideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fade-in';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-900">How to Install PesaPad</h3>
                        <button class="text-gray-500 hover:text-gray-700 text-2xl">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Download the APK</h4>
                                <p class="text-gray-600">Tap the download button above to get the APK file.</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Allow Unknown Sources</h4>
                                <p class="text-gray-600">If prompted, go to Settings > Security > Unknown Sources and enable it.</p>
                                <p class="text-gray-500 text-sm mt-1">(This is safe - you're downloading directly from the developer)</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Install the App</h4>
                                <p class="text-gray-600">Open the downloaded file and tap "Install".</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Open and Setup</h4>
                                <p class="text-gray-600">Launch PesaPad, create your shop profile, and start tracking!</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <p class="text-gray-500 text-sm">
                            <i class="fas fa-shield-alt mr-2"></i>
                            PesaPad is 100% virus-free. Source code available on 
                            <a href="https://github.com/briankebabe/pesapad" class="text-blue-600 hover:underline">GitHub</a>.
                        </p>
                    </div>
                    
                    <div class="mt-6 flex justify-end">
                        <button class="btn-pesapad-primary px-6 py-3">
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal handlers
            const closeBtns = modal.querySelectorAll('button');
            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    }
});

// Window load event for additional initialization
window.addEventListener('load', function() {
    // Add loaded class for any post-load animations
    document.body.classList.add('loaded');
    
    // Initialize any lazy-loaded images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        img.src = img.getAttribute('data-src');
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfEntries = performance.getEntriesByType('navigation');
        if (perfEntries.length > 0) {
            const navTiming = perfEntries[0];
            console.log('Page loaded in:', navTiming.loadEventEnd - navTiming.loadEventStart, 'ms');
        }
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Page error:', e.error);
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}