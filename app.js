// Modern JavaScript for House of Food Restaurant Website
class HouseOfFoodApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupAnimations();
        this.setupLightbox();
        this.setupMobileMenu();
        this.setupScrollIndicator();
        this.setupParallaxEffects();
        this.setupReviewsScroll();
        this.showAllContent(); // Ensure content is visible
    }

    // Ensure all content is visible on load
    showAllContent() {
        // Remove any loading states and show all content immediately
        const allSections = document.querySelectorAll('.fade-in');
        allSections.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('visible');
        });
        
        // Ensure all sections are visible
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.display = 'block';
            section.style.opacity = '1';
        });
    }

    // Setup navigation functionality
    setupNavigation() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const hamburger = document.querySelector('.hamburger');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                        this.resetHamburgerBars();
                    }
                }
            });
        });

        // Active navigation link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Smooth scrolling and navigation effects
    setupScrollEffects() {
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for navbar background
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (only hide when scrolling down fast)
            if (currentScrollY > lastScrollY && currentScrollY > 400) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }


    // Setup scroll-triggered animations
    setupAnimations() {
        // Intersection Observer for progressive animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, delay * 100);
                }
            });
        }, observerOptions);

        // Observe elements that aren't already visible
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Menu item hover effects
        this.setupMenuItemEffects();

        // Review card animations
        this.setupReviewAnimations();

        // Contact info animations
        this.setupContactInfoAnimations();
    }

    // Enhanced menu item interactions
    setupMenuItemEffects() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.02)';
                item.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            });

            // Add subtle pulse animation on click
            item.addEventListener('click', () => {
                item.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    item.style.animation = '';
                }, 600);
            });
        });
    }

    // Review card stagger animations
    setupReviewAnimations() {
        const reviewCards = document.querySelectorAll('.review-card');
        
        reviewCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                // Add floating effect
                card.style.transform = `translateY(-8px) rotate(${Math.random() * 4 - 2}deg)`;
                card.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotate(0deg)';
            });

            // Animate stars on hover
            const stars = card.querySelectorAll('.star');
            card.addEventListener('mouseenter', () => {
                stars.forEach((star, starIndex) => {
                    setTimeout(() => {
                        star.style.transform = 'scale(1.3) rotate(10deg)';
                        star.style.transition = 'all 0.2s ease-out';
                        setTimeout(() => {
                            star.style.transform = 'scale(1) rotate(0deg)';
                        }, 200);
                    }, starIndex * 50);
                });
            });
        });
    }

    // Contact info card animations
    setupContactInfoAnimations() {
        const contactItems = document.querySelectorAll('.contact-info-item');
        
        contactItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-12px) scale(1.02)';
                item.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            });

            // Add click animation
            item.addEventListener('click', () => {
                item.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    item.style.animation = '';
                }, 600);
            });
        });
    }

    // Setup reviews scroll functionality
    setupReviewsScroll() {
        const reviewsContainer = document.querySelector('.reviews-scroll-container');
        
        if (reviewsContainer) {
            // Add smooth scrolling behavior
            reviewsContainer.style.scrollBehavior = 'smooth';
            
            // Ensure proper scrolling functionality
            reviewsContainer.addEventListener('scroll', () => {
                // Optional: Add scroll-based effects here
            });
        }
    }

    // Gallery lightbox functionality - UPDATED for placeholders
    setupLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxClose = document.getElementById('lightboxClose');

        if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxClose) {
            console.warn('Lightbox elements not found');
            return;
        }

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const placeholder = item.querySelector('.gallery-placeholder');
                const caption = item.querySelector('.gallery-caption');
                
                if (placeholder) {
                    // Copy the placeholder styling to the lightbox
                    const placeholderStyles = window.getComputedStyle(placeholder);
                    lightboxImage.style.background = placeholderStyles.background;
                    lightboxImage.textContent = placeholder.textContent;
                    lightboxCaption.textContent = caption ? caption.textContent : '';
                    
                    lightbox.classList.remove('hidden');
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!hamburger || !navMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            if (hamburger.classList.contains('active')) {
                this.animateHamburgerToX();
            } else {
                this.resetHamburgerBars();
            }
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                this.resetHamburgerBars();
            });
        });
    }

    animateHamburgerToX() {
        const spans = document.querySelectorAll('.hamburger span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
    }

    resetHamburgerBars() {
        const spans = document.querySelectorAll('.hamburger span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '1';
        });
    }

    // Scroll indicator functionality
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    const offsetTop = aboutSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });

            // Hide scroll indicator after scrolling
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                if (scrolled > 200) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '0.7';
                    scrollIndicator.style.pointerEvents = 'all';
                }
            });
        }
    }

    // Subtle parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        window.addEventListener('scroll', this.debounce(() => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 10));
    }

    // Notification system
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#2E7D32' : type === 'error' ? '#d32f2f' : '#1976d2',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '400px',
            wordWrap: 'break-word'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.closeNotification(notification);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            this.closeNotification(notification);
        }, 5000);
    }

    closeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Performance optimization: debounce scroll events
    debounce(func, wait) {
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
}

// Additional CSS animations via JavaScript
const addCustomAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInScale {
            from { 
                opacity: 0; 
                transform: scale(0.8) translateY(30px); 
            }
            to { 
                opacity: 1; 
                transform: scale(1) translateY(0); 
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
        
        /* Smooth scroll animation for reviews container */
        .reviews-scroll-container {
            scroll-behavior: smooth;
        }
        
        /* Custom focus styles for accessibility */
        .contact-info-item:focus-within {
            transform: translateY(-8px);
            box-shadow: 0 20px 50px rgba(46, 125, 50, 0.2);
            outline: 2px solid var(--irish-green);
            outline-offset: 4px;
        }
        
        /* Enhanced hover effects for phone links */
        .contact-info-item a[href^="tel:"]:hover {
            text-decoration: underline;
            transform: scale(1.05);
            display: inline-block;
        }
        
        /* Gallery placeholder hover effects */
        .gallery-placeholder {
            transition: all 0.3s ease;
        }
        
        .gallery-item:hover .gallery-placeholder {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
};

// Page load animations
const initPageLoadAnimations = () => {
    // Show page immediately
    document.body.style.opacity = '1';
    
    // Trigger hero animations after a short delay
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title-main, .hero-tagline, .hero-location, .hero-cta');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `fadeInUp 1s ease-out forwards`;
            }, index * 200);
        });
    }, 300);
};

// Enhanced scroll-to-section functionality
const enhanceScrollToSection = () => {
    // Add keyboard navigation for sections
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            const sections = ['hero', 'about', 'menu-reviews', 'gallery', 'contact'];
            let currentSectionIndex = -1;
            
            // Find current section
            sections.forEach((sectionId, index) => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom > 100) {
                        currentSectionIndex = index;
                    }
                }
            });
            
            // Navigate with Ctrl+Arrow keys
            if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
                e.preventDefault();
                const nextSection = document.getElementById(sections[currentSectionIndex + 1]);
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
                e.preventDefault();
                const prevSection = document.getElementById(sections[currentSectionIndex - 1]);
                if (prevSection) {
                    prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    });
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    addCustomAnimations();
    initPageLoadAnimations();
    enhanceScrollToSection();
    
    // Initialize app immediately
    const app = new HouseOfFoodApp();
    
    // Ensure all content is visible after initialization
    setTimeout(() => {
        app.showAllContent();
    }, 100);
});

// Ensure content is visible on window load as well
window.addEventListener('load', () => {
    // Double-check all sections are visible
    const allElements = document.querySelectorAll('.fade-in, section');
    allElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.display = 'block';
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HouseOfFoodApp;
}

function adjustReviewsMaxHeight() {
      const menu = document.querySelector('.menu-section');
      const reviews = document.querySelector('.reviews-scroll-container');
      if(menu && reviews){
        reviews.style.maxHeight = menu.offsetHeight + 'px';
      }
    }
    window.addEventListener('load', adjustReviewsMaxHeight);
    window.addEventListener('resize', adjustReviewsMaxHeight);