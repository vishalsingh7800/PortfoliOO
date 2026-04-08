// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.style.display = 'none';
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ============================================
// COUNTER ANIMATIONS
// ============================================
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                statNumbers.forEach(element => {
                    const target = parseInt(element.dataset.target);
                    let count = 0;
                    const increment = target / 50;
                    
                    const counter = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            element.textContent = target + '+';
                            clearInterval(counter);
                        } else {
                            element.textContent = Math.floor(count) + '+';
                        }
                    }, 30);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.stat-card'));
    }
}

// ============================================
// SKILL BAR ANIMATIONS
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                
                skillBars.forEach((bar, index) => {
                    const width = bar.style.width;
                    const delay = index * 0.1;
                    
                    bar.style.width = '0%';
                    bar.style.opacity = '1';
                    bar.style.transition = `width 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
                    
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
                    }, 50);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ============================================
// PROFILE CIRCLE ANIMATIONS
// ============================================
function initProfileCircleAnimations() {
    const profileWrapper = document.querySelector('.profile-circle-wrapper');
    const profileGlow = document.querySelector('.profile-glow');
    const profileImage = document.querySelector('.profile-image-circle');
    
    if (!profileWrapper) return;

    profileWrapper.addEventListener('mouseenter', function() {
        this.style.animation = 'profileFloat 2s ease-in-out infinite';
        if (profileImage) {
            profileImage.style.filter = 'brightness(1.15) contrast(1.1) saturate(1.2)';
        }
        if (profileGlow) {
            profileGlow.style.boxShadow = '0 0 80px rgba(102, 126, 234, 0.8), 0 0 120px rgba(118, 75, 162, 0.6)';
        }
    });

    profileWrapper.addEventListener('mouseleave', function() {
        this.style.animation = 'profileFloat 4s ease-in-out infinite';
        if (profileImage) {
            profileImage.style.filter = 'brightness(1) contrast(1) saturate(1)';
        }
        if (profileGlow) {
            profileGlow.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.5), 0 0 60px rgba(118, 75, 162, 0.3)';
        }
    });

    profileWrapper.style.transition = 'all 0.3s ease';
    if (profileImage) {
        profileImage.style.transition = 'filter 0.3s ease';
    }
}

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
function handleParallax() {
    const scrolled = window.pageYOffset;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        orb.style.transform = `translateY(${scrolled * (0.1 + index * 0.05)}px)`;
    });

    const profileCircle = document.querySelector('.profile-circle-container');
    if (profileCircle) {
        profileCircle.style.transform = `translateY(${scrolled * 0.05}px)`;
    }

    const particles = document.querySelector('.profile-particles');
    if (particles) {
        particles.style.transform = `rotateZ(${scrolled * 0.1}deg)`;
    }
}

window.addEventListener('scroll', handleParallax, { passive: true });

// ============================================
// FORM SUBMISSION WITH ANIMATION
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        this.style.opacity = '0.6';
        this.style.pointerEvents = 'none';
        this.style.transition = 'all 0.3s ease';
        
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        }
        
        setTimeout(() => {
            alert(`Thank you ${name}! Your message has been sent successfully.\n\nI'll get back to you soon at ${email}`);
            this.reset();
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';
            
            if (submitBtn) {
                submitBtn.innerHTML = '<span>Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
                submitBtn.style.background = '';
            }
        }, 1500);
    });
}

// ============================================
// CREATE BACKGROUND PARTICLES
// ============================================
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${duration}s infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px rgba(102, 126, 234, 0.5);
        `;
        particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.5);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    });

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.05)';
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// MOUSE FOLLOW GRADIENT EFFECT
// ============================================
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const intensity = (index + 1) * 30;
        orb.style.transform = `translate(${mouseX * intensity}px, ${mouseY * intensity}px)`;
        orb.style.transition = 'transform 0.2s ease-out';
    });

    const profileGlow = document.querySelector('.profile-glow');
    if (profileGlow) {
        const profileCircle = document.querySelector('.profile-circle-container');
        if (profileCircle) {
            const circleRect = profileCircle.getBoundingClientRect();
            const circleX = circleRect.left + circleRect.width / 2;
            const circleY = circleRect.top + circleRect.height / 2;
            
            const angle = Math.atan2(e.clientY - circleY, e.clientX - circleX);
            const distance = 30;
            
            profileGlow.style.transition = 'box-shadow 0.1s ease-out';
            profileGlow.style.boxShadow = `
                ${Math.cos(angle) * distance}px ${Math.sin(angle) * distance}px 60px rgba(102, 126, 234, 0.7),
                0 0 40px rgba(102, 126, 234, 0.4),
                inset 0 0 40px rgba(118, 75, 162, 0.2)
            `;
        }
    }
}, { passive: true });

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
    
    if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
            case '/':
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'h':
                e.preventDefault();
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'p':
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// ============================================
// RESPONSIVE BREAKPOINT HANDLING
// ============================================
function handleResponsive() {
    const profileCircleContainer = document.querySelector('.profile-circle-container');
    const particlesContainer = document.querySelector('.particles');
    
    if (window.innerWidth < 768) {
        if (particlesContainer) {
            particlesContainer.style.opacity = '0.5';
        }
    } else if (particlesContainer) {
        particlesContainer.style.opacity = '1';
    }
}

window.addEventListener('resize', handleResponsive);
window.addEventListener('load', handleResponsive);

// ============================================
// LAZY IMAGE LOADING
// ============================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.style.animation = 'fadeIn 0.5s ease-in';
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            img.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
            imageObserver.observe(img);
        });
    }
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
function initPageLoadAnimations() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'fadeIn 0.8s ease-in';
    }

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animation = `slideInUp 0.6s ease forwards`;
        card.style.animationDelay = `${index * 0.15}s`;
    });

    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.animation = `slideInUp 0.6s ease forwards`;
        category.style.animationDelay = `${index * 0.15}s`;
    });
}

// ============================================
// INITIALIZE ALL ANIMATIONS ON LOAD
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        animateCounters();
        animateSkillBars();
        createParticles();
        initProfileCircleAnimations();
        initPageLoadAnimations();
        initLazyLoading();
        handleResponsive();
        
        const profileCircleWrapper = document.querySelector('.profile-circle-wrapper');
        if (profileCircleWrapper) {
            profileCircleWrapper.style.animation = 'profileFloat 4s ease-in-out infinite';
        }
    }, 300);
});

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .info-item, .quick-stat-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// TEXT ANIMATION
// ============================================
const textElements = document.querySelectorAll('.hero-title .word');
textElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
});

// ============================================
// PROFILE CIRCLE TILT EFFECT
// ============================================
function initTiltEffect() {
    const profileWrapper = document.querySelector('.profile-circle-wrapper');
    if (!profileWrapper || window.innerWidth < 768) return;

    document.addEventListener('mousemove', (e) => {
        const profileCircle = document.querySelector('.profile-circle-container');
        if (!profileCircle) return;

        const rect = profileCircle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = (e.clientY - centerY) / 15;
        const rotateY = (e.clientX - centerX) / 15;

        profileWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        profileWrapper.style.transition = 'transform 0.1s ease-out';
    });

    profileWrapper.addEventListener('mouseleave', () => {
        profileWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        profileWrapper.style.transition = 'transform 0.3s ease-out';
    });
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), var(--secondary), var(--tertiary));
        z-index: 999;
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
function logWelcomeMessage() {
    const styles = {
        header: 'color: #667eea; font-size: 20px; font-weight: bold;',
        subheader: 'color: #764ba2; font-size: 14px; font-weight: 600;',
        info: 'color: #666; font-size: 11px;'
    };

    console.log('%c🎨 Welcome to Vishal Singh\'s Interactive Portfolio!', styles.header);
    console.log('%c✨ Built with HTML, CSS & Vanilla JavaScript', styles.subheader);
    console.log('%c🚀 Keyboard Shortcuts:', styles.subheader);
    console.log('%c  • Ctrl + H  →  Home Section', styles.info);
    console.log('%c  • Ctrl + P  →  Projects Section', styles.info);
    console.log('%c  • Ctrl + /  →  Contact Section', styles.info);
    console.log('%c  • ESC       →  Close Menu', styles.info);
}

// ============================================
// ADD ANIMATIONS TO STYLE
// ============================================
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes popIn {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// ============================================
// FINAL INITIALIZATION
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        logWelcomeMessage();
        initTiltEffect();
        createScrollProgress();
    }, 1000);
});

console.log('%c✅ All scripts loaded successfully!', 'color: #10b981; font-weight: bold;');