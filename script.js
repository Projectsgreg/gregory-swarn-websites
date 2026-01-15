// ======================
// CONFIGURATION
// ======================
const CONFIG = {
    formspree: {
        main: 'https://formspree.io/f/YOUR_MAIN_FORM_ID',
        finance: 'https://formspree.io/f/YOUR_FINANCE_FORM_ID',
        health: 'https://formspree.io/f/YOUR_HEALTH_FORM_ID'
    },
    blogUrls: {
        finance: 'https://gregoryswarnmarketing.blogspot.com',
        health: 'https://gregoryswarnhealthyliving.blogspot.com'
    }
};

// ======================
// DOM READY
// ======================
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

// ======================
// INITIALIZATION
// ======================
function initializeAll() {
    updateCopyrightYears();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeForms();
    initializeBlogFeeds();
    initializeGallery();
    initializeAnimations();
}

// ======================
// CORE UTILITIES
// ======================
function updateCopyrightYears() {
    const year = new Date().getFullYear();
    document.querySelectorAll('[id*="currentYear"]').forEach(el => {
        el.textContent = year;
    });
}

// ======================
// MOBILE MENU
// ======================
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', function() {
        const isActive = nav.classList.toggle('active');
        overlay?.classList.toggle('active');
        menuToggle.textContent = isActive ? '✕' : '☰';
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    overlay?.addEventListener('click', closeMobileMenu);
    
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    function closeMobileMenu() {
        nav.classList.remove('active');
        overlay?.classList.remove('active');
        menuToggle.textContent = '☰';
        document.body.style.overflow = '';
    }
}

// ======================
// SMOOTH SCROLLING
// ======================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

// ======================
// FORM HANDLING
// ======================
function initializeForms() {
    // Main contact form
    const mainForm = document.getElementById('mainContactForm');
    if (mainForm) {
        mainForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await handleFormSubmit(this, CONFIG.formspree.main, 'Thank you! Gregory will respond within 24-48 hours.');
        });
    }
    
    // Finance lead form
    const financeForm = document.getElementById('financeLeadForm');
    if (financeForm) {
        financeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await handleFormSubmit(this, CONFIG.formspree.finance, 'Thank you! Your guide will be emailed to you shortly.');
        });
    }
    
    // Health challenge form
    const healthForm = document.getElementById('healthLeadForm');
    if (healthForm) {
        healthForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await handleFormSubmit(this, CONFIG.formspree.health, 'Welcome to the 5 AM Challenge! Check your email for Day 1.');
        });
    }
    
    // Additional forms
    document.querySelectorAll('form').forEach(form => {
        if (!form.id) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formType = form.querySelector('input[type="email"]') ? 'email' : 'general';
                const message = formType === 'email' 
                    ? 'Thank you for subscribing!' 
                    : 'Form submitted successfully!';
                showToast(message);
                form.reset();
            });
        }
    });
}

async function handleFormSubmit(form, endpoint, successMessage) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.7';
    
    try {
        // In production, use Formspree
        if (endpoint.includes('formspree.io')) {
            const formData = new FormData(form);
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                showToast(successMessage);
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } else {
            // Fallback for demo
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast(successMessage);
            form.reset();
        }
    } catch (error) {
        console.error('Form error:', error);
        showToast('Sorry, there was an error. Please try again.', 'error');
    } finally {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';
    }
}

// ======================
// BLOG FEEDS
// ======================
async function initializeBlogFeeds() {
    // Finance blog feed
    const financeFeed = document.getElementById('finance-blog-feed');
    if (financeFeed && !financeFeed.querySelector('.blog-card')) {
        await fetchBlogFeed(CONFIG.blogUrls.finance, financeFeed, 3);
    }
    
    // Health blog feed
    const healthFeed = document.getElementById('health-blog-feed');
    if (healthFeed && !healthFeed.querySelector('.blog-card')) {
        await fetchBlogFeed(CONFIG.blogUrls.health, healthFeed, 3);
    }
}

async function fetchBlogFeed(blogUrl, container, limit = 3) {
    try {
        // Note: Blogger RSS requires CORS proxy or backend in production
        // This is a simplified demo version
        const rssUrl = `${blogUrl}/feeds/posts/default?alt=rss&max-results=${limit}`;
        
        // In production, use a proper CORS proxy or backend endpoint
        // For demo purposes, we'll create placeholder content
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const placeholderPosts = [
            {
                title: 'Latest Insights from the Blog',
                description: 'Visit the main blog for full articles and updates.',
                link: blogUrl,
                date: new Date().toLocaleDateString()
            },
            {
                title: 'Deep Dive into Market Psychology',
                description: 'Exploring the mental frameworks for disciplined trading.',
                link: `${blogUrl}/search/label/psychology`,
                date: new Date(Date.now() - 86400000).toLocaleDateString()
            },
            {
                title: 'Wellness Practices for Professionals',
                description: 'Integrating health routines with business performance.',
                link: `${blogUrl}/search/label/wellness`,
                date: new Date(Date.now() - 172800000).toLocaleDateString()
            }
        ];
        
        renderBlogPosts(placeholderPosts, container);
        
    } catch (error) {
        console.error('Blog feed error:', error);
        container.innerHTML = `
            <div class="blog-card">
                <div class="blog-card-content">
                    <h4><a href="${blogUrl}" target="_blank">Visit the Blog</a></h4>
                    <p>Click to read the latest articles and insights directly on the blog.</p>
                    <a href="${blogUrl}" target="_blank" class="read-more">Go to Blog →</a>
                </div>
            </div>
        `;
    }
}

function renderBlogPosts(posts, container) {
    container.innerHTML = posts.map(post => `
        <div class="blog-card">
            <div class="blog-card-content">
                <h4><a href="${post.link}" target="_blank">${post.title}</a></h4>
                <p>${post.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                    <span style="font-size: 0.9rem; color: #666;">${post.date}</span>
                    <a href="${post.link}" target="_blank" class="read-more">Read →</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ======================
// GALLERY FUNCTIONALITY
// ======================
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;
            
            createLightbox(img.src, img.alt);
        });
        
        // Keyboard navigation
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = this.querySelector('img');
                if (img) createLightbox(img.src, img.alt);
            }
        });
    });
}

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.1);
        border: none;
        color: white;
        font-size: 1.5rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
        z-index: 2001;
    `;
    
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.2)';
    });
    
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.1)';
    });
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);
    
    // Close functions
    function closeLightbox() {
        lightbox.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }, 300);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === closeBtn) {
            closeLightbox();
        }
    });
    
    // Keyboard close
    document.addEventListener('keydown', function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeydown);
        }
    });
}

// ======================
// ANIMATIONS
// ======================
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Observe section headings
    document.querySelectorAll('h2, .pillar-card, .content-card, .step').forEach(el => {
        observer.observe(el);
    });
}

// ======================
// TOAST NOTIFICATIONS
// ======================
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#2ecc71'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// ======================
// PERFORMANCE OPTIMIZATIONS
// ======================
// Debounce function for resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Update any layout-dependent calculations here
    }, 250);
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ======================
// ERROR HANDLING
// ======================
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // Could send to analytics service here
});

// ======================
// THEME UTILITIES
// ======================
function getCurrentTheme() {
    return document.body.className.replace('theme-', '');
}

function updateThemeColors(theme) {
    // This function could be used for dynamic theme switching
    // Currently not used but available for future enhancements
    const root = document.documentElement;
    
    const themes = {
        personal: {
            primary: '#0f1f38',
            secondary: '#d4af37',
            light: '#f8f9fa'
        },
        finance: {
            primary: '#222831',
            secondary: '#00adb5',
            light: '#ffffff'
        },
        health: {
            primary: '#2d5a27',
            secondary: '#e67e51',
            light: '#fef6e4'
        }
    };
    
    const colors = themes[theme] || themes.personal;
    
    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });
}

// ======================
// EXPORT FOR MODULAR USE
// ======================
// If using modules, you could export:
// export { initializeAll, handleFormSubmit, fetchBlogFeed };
// But for our simple setup, everything runs automatically
