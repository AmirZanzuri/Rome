// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== NAVIGATION MENU TOGGLE ====================
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
    navMenu.classList.remove('active');
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ==================== CTA BUTTON SCROLL ====================
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const overview = document.querySelector('#overview');
        if (overview) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = overview.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ==================== ENHANCED INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and content sections
document.querySelectorAll('.overview-card, .traveler-card, .restaurant-card, .hotel-card, .timeline-content, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(element);
});

// ==================== NAVBAR SCROLL EFFECT WITH ENHANCED BLUR ====================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 15px 40px rgba(15, 20, 25, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(15, 20, 25, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== TIMELINE INTERACTIVE ELEMENTS ====================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        timelineItems.forEach(el => {
            if (el !== this) {
                el.style.opacity = '0.5';
            }
        });
    });
    
    item.addEventListener('mouseleave', function() {
        timelineItems.forEach(el => {
            el.style.opacity = '1';
        });
    });
});

// ==================== GALLERY LIGHTBOX (OPTIONAL) ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            createLightbox(img.src, img.alt);
        }
    });
});

function createLightbox(imageSrc, imageAlt) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(5px);
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        object-fit: contain;
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });
}

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== LAZY LOADING IMAGES ====================
const observerLazy = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    observerLazy.observe(img);
});

// ==================== SCROLL TO TOP BUTTON WITH MODERN DESIGN ====================
function createScrollToTopButton() {
    const button = document.createElement('div');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        background: linear-gradient(135deg, #e63946, #ff6b7a);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        z-index: 500;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        font-weight: 900;
        font-size: 1.8rem;
        box-shadow: 0 12px 40px rgba(230, 57, 70, 0.3);
        pointer-events: none;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
        } else {
            button.style.opacity = '0';
            button.style.pointerEvents = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.15) translateY(-5px)';
        button.style.boxShadow = '0 16px 50px rgba(230, 57, 70, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 12px 40px rgba(230, 57, 70, 0.3)';
    });
}

createScrollToTopButton();

// ==================== NUMBER COUNTER ANIMATION ====================
function animateCounters() {
    const numbers = document.querySelectorAll('[data-count]');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                number.textContent = target;
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Trigger counter animation when section is visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// ==================== FORM VALIDATION (IF NEEDED) ====================
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
    });
}

// ==================== CUSTOM CURSOR (OPTIONAL) ====================
document.addEventListener('mousemove', (e) => {
    const clickableElements = document.querySelectorAll('a, button, .gallery-item');
    
    clickableElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isHovering = 
            e.clientX >= rect.left && 
            e.clientX <= rect.right && 
            e.clientY >= rect.top && 
            e.clientY <= rect.bottom;
        
        if (isHovering) {
            element.style.cursor = 'pointer';
        }
    });
});

// ==================== PAGE LOAD ANIMATIONS ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger animations for visible elements
    const visibleElements = document.querySelectorAll('.overview-card, .traveler-card');
    visibleElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
    const screen = window.innerWidth;
    
    if (screen > 768) {
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', initMobileMenu);

// ==================== PRINT STYLES ====================
window.addEventListener('beforeprint', () => {
    document.querySelector('.navbar').style.position = 'static';
    document.querySelector('.hero').style.height = 'auto';
});

// ==================== PERFORMANCE: Throttle scroll events ====================
function throttle(func, wait) {
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

// ==================== ACCESSIBILITY ==================== 
// Improve keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('tab-visible');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('tab-visible');
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🇮🇹 Italy Couples Journey - Website Loaded');
    
    // Add any initialization code here
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
});
