// ===================================
// CYNARAX - Home Page JavaScript
// Interactive features and animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Showcase Carousel
    // ===================================
    const showcaseTrack = document.querySelector('.showcase-track');
    const showcasePrev = document.querySelector('.showcase-section .carousel-btn.prev');
    const showcaseNext = document.querySelector('.showcase-section .carousel-btn.next');
    const showcaseSection = document.querySelector('.showcase-section');
    
    if (showcaseTrack && showcasePrev && showcaseNext) {
        // Create dots for showcase
        const showcaseItems = document.querySelectorAll('.showcase-item');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        if (dotsContainer && showcaseItems.length > 0) {
            showcaseItems.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => scrollToShowcase(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        
        function updateDots() {
            const scrollPos = showcaseTrack.scrollLeft;
            const itemWidth = showcaseItems[0].offsetWidth + 30; // width + gap
            const currentIndex = Math.round(scrollPos / itemWidth);
            
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function scrollToShowcase(index) {
            const itemWidth = showcaseItems[0].offsetWidth + 30;
            showcaseTrack.scrollTo({
                left: itemWidth * index,
                behavior: 'smooth'
            });
        }
        
        showcasePrev.addEventListener('click', function() {
            showcaseTrack.scrollBy({
                left: -630,
                behavior: 'smooth'
            });
        });
        
        showcaseNext.addEventListener('click', function() {
            showcaseTrack.scrollBy({
                left: 630,
                behavior: 'smooth'
            });
        });
        
        showcaseTrack.addEventListener('scroll', updateDots);
        
        // Auto-scroll showcase
        let showcaseInterval = setInterval(() => {
            if (showcaseTrack.scrollLeft + showcaseTrack.clientWidth >= showcaseTrack.scrollWidth - 10) {
                showcaseTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                showcaseTrack.scrollBy({ left: 630, behavior: 'smooth' });
            }
        }, 5000);
        
        // Pause auto-scroll on hover
        showcaseTrack.addEventListener('mouseenter', () => clearInterval(showcaseInterval));
        showcaseTrack.addEventListener('mouseleave', () => {
            showcaseInterval = setInterval(() => {
                if (showcaseTrack.scrollLeft + showcaseTrack.clientWidth >= showcaseTrack.scrollWidth - 10) {
                    showcaseTrack.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    showcaseTrack.scrollBy({ left: 630, behavior: 'smooth' });
                }
            }, 5000);
        });
    }
    
    // ===================================
    // Animated Statistics Counter
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ===================================
    // Testimonials Slider
    // ===================================
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.querySelector('.testimonials-section .testimonial-btn.prev');
    const testimonialNext = document.querySelector('.testimonials-section .testimonial-btn.next');
    const testimonialDots = document.querySelector('.testimonial-dots');
    
    if (testimonialTrack && testimonialCards.length > 0) {
        let currentTestimonial = 0;
        
        // Create dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.style.width = '10px';
            dot.style.height = '10px';
            dot.style.borderRadius = '50%';
            dot.style.background = index === 0 ? 'var(--primary-cyan)' : 'rgba(255, 255, 255, 0.3)';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'all 0.3s';
            
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDots.appendChild(dot);
        });
        
        const dots = testimonialDots.querySelectorAll('.dot');
        
        function goToTestimonial(index) {
            currentTestimonial = index;
            testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
            
            dots.forEach((dot, i) => {
                if (i === currentTestimonial) {
                    dot.style.background = 'var(--primary-cyan)';
                    dot.classList.add('active');
                } else {
                    dot.style.background = 'rgba(255, 255, 255, 0.3)';
                    dot.classList.remove('active');
                }
            });
        }
        
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
                goToTestimonial(currentTestimonial);
            });
        }
        
        if (testimonialNext) {
            testimonialNext.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                goToTestimonial(currentTestimonial);
            });
        }
        
        // Auto-advance testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            goToTestimonial(currentTestimonial);
        }, 7000);
    }
    
    // ===================================
    // Scroll Animations
    // ===================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 0);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    };
    
    animateOnScroll();
    
    // ===================================
    // Parallax Effect for Hero
    // ===================================
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
    
    // ===================================
    // Duplicate logos for infinite scroll
    // ===================================
    const techStackTrack = document.querySelector('.techstack-track');
    if (techStackTrack) {
        const techCards = techStackTrack.innerHTML;
        techStackTrack.innerHTML += techCards; // Duplicate for seamless loop
    }
    
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        const logos = logoTrack.innerHTML;
        logoTrack.innerHTML += logos; // Duplicate for seamless loop
    }
    
    // ===================================
    // Add ripple effect to buttons
    // ===================================
    const buttons = document.querySelectorAll('.btn');
    
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
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    if (!document.getElementById('ripple-animation')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-animation';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // ===================================
    // Keyboard navigation for carousels
    // ===================================
    document.addEventListener('keydown', (e) => {
        // Check if user is focused on showcase section
        const showcaseInView = isElementInViewport(showcaseSection);
        
        if (showcaseInView) {
            if (e.key === 'ArrowLeft' && showcasePrev) {
                showcasePrev.click();
            } else if (e.key === 'ArrowRight' && showcaseNext) {
                showcaseNext.click();
            }
        }
    });
    
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // ===================================
    // Performance Optimization - Lazy load images
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
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
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // CTA Background Animation
    // ===================================
    const ctaAnimation = document.getElementById('cta-animation');
    
    if (ctaAnimation) {
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 6 + 3 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = '#00ffff';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            
            ctaAnimation.appendChild(particle);
        }
    }
    
    console.log('CYNARAX Home Page Loaded Successfully ✓');
});
