// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for cards
            if (entry.target.classList.contains('problem-card') || 
                entry.target.classList.contains('target-card') || 
                entry.target.classList.contains('impact-card')) {
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
            
            // Animate feature cards with stagger
            if (entry.target.classList.contains('feature-card')) {
                const cards = document.querySelectorAll('.feature-card');
                const index = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        }
    });
}, observerOptions);

// Initialize animations on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(`
        .problem-card, 
        .target-card, 
        .impact-card, 
        .feature-card,
        .timeline-item,
        .floating-card
    `);
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Initialize demo functionality
    initializeDemo();
    
    // Initialize solution demo steps
    initializeSolutionDemo();
    
    // Initialize counter animations
    initializeCounters();
});

// Demo interface functionality
function initializeDemo() {
    const demoBtns = document.querySelectorAll('.demo-btn');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    demoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDemo = btn.getAttribute('data-demo');
            
            // Update active button
            demoBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active panel
            demoPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${targetDemo}-demo`) {
                    panel.classList.add('active');
                }
            });
            
            // Trigger specific animations based on demo type
            if (targetDemo === 'ai') {
                animateAIMetrics();
            }
        });
    });
}

// Solution demo steps animation
function initializeSolutionDemo() {
    const steps = document.querySelectorAll('.demo-step');
    let currentStep = 0;
    
    function animateSteps() {
        steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === currentStep) {
                step.classList.add('active');
            }
        });
        
        currentStep = (currentStep + 1) % steps.length;
    }
    
    // Start animation
    animateSteps();
    setInterval(animateSteps, 3000);
}

// Animate AI metrics
function animateAIMetrics() {
    const metricFills = document.querySelectorAll('.metric-fill');
    metricFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });
}

// Counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-number, .circle-number');
    
    const countUp = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on content
            let displayValue = Math.floor(current);
            const originalText = element.textContent;
            
            if (originalText.includes('K')) {
                displayValue = (displayValue / 1000).toFixed(1) + 'K';
            } else if (originalText.includes('M')) {
                displayValue = (displayValue / 1000000).toFixed(1) + 'M';
            } else if (originalText.includes('%')) {
                displayValue = displayValue + '%';
            }
            
            element.textContent = displayValue;
        }, 16);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseFloat(text.replace(/[^\d.]/g, ''));
                
                if (text.includes('K')) {
                    countUp(element, number * 1000);
                } else if (text.includes('M')) {
                    countUp(element, number * 1000000);
                } else {
                    countUp(element, number);
                }
                
                counterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .cta-primary, .cta-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Enhanced hover effects
    const cards = document.querySelectorAll('.problem-card, .target-card, .impact-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 80px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Dynamic typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .cta-primary, .cta-secondary {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    }
    
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${window.scrollY * speed}px) rotate(${window.scrollY * 0.1}deg)`;
    });
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-actions');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animated elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-actions');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});