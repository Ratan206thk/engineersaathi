// Engineer Sathi Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.getElementsByTagName('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    const spans = navToggle.getElementsByTagName('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // Improved smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.header');
                const contactBar = document.querySelector('.contact-bar');
                let headerHeight = 0;
                
                if (header) headerHeight += header.offsetHeight;
                if (contactBar) headerHeight += contactBar.offsetHeight;
                
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Training Tabs Functionality - Fixed
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Initialize first tab as active if none is active
    if (tabButtons.length > 0 && !document.querySelector('.tab-button.active')) {
        tabButtons[0].classList.add('active');
        if (tabContents.length > 0) {
            tabContents[0].classList.add('active');
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Contact Form Handling - Fixed
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone || !service || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Remove focused class from form groups
            const formGroups = this.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('focused'));
            
            // Log form data for debugging
            console.log('Form submitted successfully:', {
                name,
                email,
                phone,
                service,
                message
            });
        });
    }

    // Fixed notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification status status--${type}`;
        notification.textContent = message;
        
        // Enhanced styling
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            max-width: 350px;
            padding: 16px 20px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        // Force reflow and animate in
        notification.offsetHeight;
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 6000);
        
        // Allow manual dismissal by clicking
        notification.addEventListener('click', function() {
            this.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (this.parentNode) {
                    this.remove();
                }
            }, 300);
        });
    }

    // Active navigation link highlighting - Fixed
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const header = document.querySelector('.header');
            const contactBar = document.querySelector('.contact-bar');
            let offset = 100;
            
            if (header) offset += header.offsetHeight;
            if (contactBar) offset += contactBar.offsetHeight;
            
            if (scrollPosition >= sectionTop - offset && 
                scrollPosition < sectionTop + sectionHeight - offset) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Handle case when at top of page
        if (scrollPosition < 100) {
            currentSection = 'home';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
        }, 50);
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(252, 252, 249, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.borderBottom = '1px solid rgba(94, 82, 64, 0.1)';
            } else {
                header.style.backgroundColor = '';
                header.style.backdropFilter = '';
                header.style.borderBottom = '';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and leader cards for animation
    const animatedElements = document.querySelectorAll('.service-card, .leader-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    // Keyboard navigation for tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let targetIndex = index;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                targetIndex = index > 0 ? index - 1 : tabButtons.length - 1;
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                targetIndex = index < tabButtons.length - 1 ? index + 1 : 0;
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                return;
            }
            
            if (targetIndex !== index) {
                tabButtons[targetIndex].focus();
                tabButtons[targetIndex].click();
            }
        });
    });

    // WhatsApp button analytics
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            showNotification('Redirecting to WhatsApp...', 'info');
        });
    }

    // Form field enhancements
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            if (this.parentNode) {
                this.parentNode.classList.add('focused');
            }
        });
        
        control.addEventListener('blur', function() {
            if (!this.value && this.parentNode) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Initialize state for pre-filled fields
        if (control.value && control.parentNode) {
            control.parentNode.classList.add('focused');
        }
    });

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                const button = this.querySelector('.btn');
                if (button) {
                    button.click();
                }
            }
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = this.querySelector('.btn');
                if (button) {
                    button.click();
                }
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });

    // Initialize page
    updateActiveNavLink();
    
    // Add loading complete class for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Handle window resize for responsive navigation
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.getElementsByTagName('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // Add error handling for missing elements
    console.log('Engineer Sathi website initialized successfully');
});

// Utility functions
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

// Global functions
window.EngineerSathi = {
    showNotification: function(message, type = 'info') {
        const event = new CustomEvent('showNotification', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    }
};