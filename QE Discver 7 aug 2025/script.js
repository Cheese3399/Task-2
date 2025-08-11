// Quick Events - Interactive JavaScript
// Award-winning UI/UX for Gen Z audience

class QuickEventsApp {
    constructor() {
        this.timers = new Set();
        this.state = {
            user: null,
            isAuthenticated: false,
            selectedCategories: [],
            accessibilityMode: 'normal'
        };
        this.init();
        this.setupEventListeners();
        this.startAnimations();
        this.updateClock();
        this.loadState();
    }

    // State management methods
    loadState() {
        try {
            const userData = localStorage.getItem('userData');
            const selectedCategories = localStorage.getItem('selectedCategories');
            const accessibilityMode = localStorage.getItem('accessibility-mode') || 'normal';
            
            if (userData) {
                this.state.user = JSON.parse(userData);
                this.state.isAuthenticated = true;
            }
            
            if (selectedCategories) {
                this.state.selectedCategories = JSON.parse(selectedCategories);
            }
            
            this.state.accessibilityMode = accessibilityMode;
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }

    saveState() {
        try {
            if (this.state.user) {
                localStorage.setItem('userData', JSON.stringify(this.state.user));
            }
            if (this.state.selectedCategories.length > 0) {
                localStorage.setItem('selectedCategories', JSON.stringify(this.state.selectedCategories));
            }
            localStorage.setItem('accessibility-mode', this.state.accessibilityMode);
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    // Cleanup method for timers
    cleanup() {
        this.timers.forEach(timer => {
            clearTimeout(timer);
            clearInterval(timer);
        });
        this.timers.clear();
    }

    // Safe timer wrapper
    safeSetTimeout(callback, delay) {
        const timer = setTimeout(callback, delay);
        this.timers.add(timer);
        return timer;
    }

    safeSetInterval(callback, delay) {
        const timer = setInterval(callback, delay);
        this.timers.add(timer);
        return timer;
    }

    init() {
        // Initialize the app
        
        // Add loading animation
        document.body.classList.add('loading');
        
        // Remove loading class after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
            }, 500);
        });
        
        // Check user state and update header accordingly
        this.checkUserState();
    }

    setupEventListeners() {
        // Use event delegation for better performance
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        document.addEventListener('mouseenter', this.handleGlobalMouseEnter.bind(this));
        document.addEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
        
        // Global event listeners
        window.addEventListener('scroll', this.handleParallax.bind(this));
        window.addEventListener('scroll', this.handleHeaderScroll.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('keydown', this.handleKeyboard.bind(this));

        // Auth form event listeners
        this.setupAuthEventListeners();
    }

    handleGlobalClick(event) {
        const target = event.target;
        
        // CTA Button
        if (target.closest('.cta-button')) {
            this.handleCTAClick(event);
        }
        
        // Search icon
        if (target.closest('.search-icon')) {
            this.handleSearchClick(event);
        }
        
        // Notification icon
        if (target.closest('.notification-icon')) {
            this.handleNotificationClick(event);
        }
        
        // Social icons
        if (target.closest('.social-icon')) {
            this.handleSocialClick(event);
        }
        
        // Smooth scroll anchors
        if (target.closest('a[href^="#"]')) {
            this.handleSmoothScroll(event);
        }
    }

    handleGlobalMouseEnter(event) {
        const target = event.target;
        
        // Nav links
        if (target.closest('.nav-link')) {
            this.handleNavHover(event);
        }
        
        // Phone mockup
        if (target.closest('.phone-mockup')) {
            this.handlePhoneHover(event);
        }
        
        // Floating icons
        if (target.closest('.floating-icon')) {
            this.handleIconHover(event);
        }
        
        // CTA Button
        if (target.closest('.cta-button')) {
            this.handleButtonHover(event);
        }
    }

    handleGlobalMouseLeave(event) {
        const target = event.target;
        
        // Nav links
        if (target.closest('.nav-link')) {
            this.handleNavLeave(event);
        }
        
        // Phone mockup
        if (target.closest('.phone-mockup')) {
            this.handlePhoneLeave(event);
        }
        
        // Floating icons
        if (target.closest('.floating-icon')) {
            this.handleIconLeave(event);
        }
        
        // CTA Button
        if (target.closest('.cta-button')) {
            this.handleButtonLeave(event);
        }
    }

    setupAuthEventListeners() {
        // Sign In Form
        const signInForm = document.getElementById('signin-form');
        if (signInForm) {
            signInForm.addEventListener('submit', this.handleSignIn.bind(this));
            this.setupFormValidation(signInForm);
        }

        // Sign Up Form
        const signUpForm = document.getElementById('signup-form');
        if (signUpForm) {
            signUpForm.addEventListener('submit', this.handleSignUp.bind(this));
            this.setupFormValidation(signUpForm);
        }

        // OTP Form
        const otpForm = document.getElementById('otp-form');
        if (otpForm) {
            otpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitOTP();
            });
        }

        // Social auth buttons
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(button => {
            button.addEventListener('click', this.handleSocialAuth.bind(this));
        });

        // Modal close on overlay click
        const modalOverlays = document.querySelectorAll('.modal-overlay');
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', this.closeAllModals.bind(this));
        });

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input[type="email"], input[type="text"], input[type="password"]');
        
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateField(e.target);
            });
            
            input.addEventListener('blur', (e) => {
                this.validateField(e.target);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        this.clearFieldError(field);
        
        // Validation rules
        if (fieldType === 'email' && value) {
            if (!this.validateEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        if (fieldType === 'password' && value) {
            if (value.length < 6) {
                isValid = false;
                errorMessage = 'Password must be at least 6 characters';
            }
        }
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Show/hide error
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '4px';
        
        field.parentNode.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    handleError(error, userMessage = 'Something went wrong') {
        console.error('Error:', error);
        
        // Show user-friendly message
        this.showNotification(userMessage, 'error');
        
        // Log for developers
        this.logError({
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
    }
    
    logError(errorData) {
        // In a real app, this would send to error tracking service
        console.error('Error logged:', errorData);
        
        // Store in localStorage for debugging
        const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
        errors.push(errorData);
        localStorage.setItem('app_errors', JSON.stringify(errors.slice(-10))); // Keep last 10
    }

    startAnimations() {
        this.animateParticles();
        this.animateFloatingIcons();
        this.animateGradients();
        this.animatePhoneGlow();
    }

    updateClock() {
        const timeDisplay = document.getElementById('current-time');
        if (!timeDisplay) return;

        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Kolkata'
            });
            const timezone = 'GMT+5:30';
            timeDisplay.textContent = `${timeString} ${timezone}`;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    handleCTAClick(event) {
        event.preventDefault();
        
        const button = event.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        this.showNotification('🎉 Welcome to Quick Events!', 'success');
        
        setTimeout(() => {
            this.simulateEventCreation();
        }, 1000);
    }

    handleButtonHover(event) {
        const button = event.currentTarget;
        const glow = button.querySelector('.btn-glow');
        
        if (glow) {
            glow.style.left = '100%';
        }
        
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.6)';
    }

    handleButtonLeave(event) {
        const button = event.currentTarget;
        const glow = button.querySelector('.btn-glow');
        
        if (glow) {
            glow.style.left = '-100%';
        }
        
        button.style.transform = '';
        button.style.boxShadow = '';
    }

    handleNavHover(event) {
        const link = event.currentTarget;
        link.style.transform = 'translateY(-2px)';
        link.style.color = '#ffffff';
    }

    handleNavLeave(event) {
        const link = event.currentTarget;
        link.style.transform = '';
        link.style.color = '';
    }

    handlePhoneHover(event) {
        const phone = event.currentTarget;
        phone.style.transform = 'translateY(-10px) rotateY(5deg) scale(1.02)';
        phone.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.7)';
        
        const screen = phone.querySelector('.phone-screen');
        if (screen) {
            screen.style.boxShadow = 'inset 0 0 20px rgba(176, 38, 255, 0.3)';
        }
    }

    handlePhoneLeave(event) {
        const phone = event.currentTarget;
        phone.style.transform = '';
        phone.style.boxShadow = '';
        
        const screen = phone.querySelector('.phone-screen');
        if (screen) {
            screen.style.boxShadow = '';
        }
    }

    handleIconHover(event) {
        const icon = event.currentTarget;
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.boxShadow = '0 15px 45px rgba(176, 38, 255, 0.6)';
        
        const tooltip = icon.getAttribute('data-tooltip');
        if (tooltip) {
            this.showTooltip(icon, tooltip);
        }
    }

    handleIconLeave(event) {
        const icon = event.currentTarget;
        icon.style.transform = '';
        icon.style.boxShadow = '';
        
        this.hideTooltip();
    }

    handleSocialClick(event) {
        event.preventDefault();
        const icon = event.currentTarget;
        const platform = icon.getAttribute('aria-label');
        
        icon.style.transform = 'scale(0.8)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 200);
        
        this.showNotification(`📱 Connecting to ${platform}...`, 'info');
    }

    handleSearchClick() {
        // Show search functionality
        this.showNotification('🔍 Search functionality coming soon!', 'info');
    }

    handleNotificationClick() {
        // Show notifications
        this.showNotification('🔔 No new notifications', 'info');
    }

    handleSmoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    handleHeaderScroll() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        
        if (header) {
            if (scrolled > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    handleMouseMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        const phone = document.querySelector('.phone-mockup');
        if (phone) {
            const rect = phone.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) * 0.02;
            const deltaY = (mouseY - centerY) * 0.02;
            
            phone.style.transform = `translateY(-5px) rotateY(${deltaX}deg) rotateX(${deltaY}deg)`;
        }
        
        this.createCursorTrail(mouseX, mouseY);
    }

    handleKeyboard(event) {
        switch(event.key) {
            case 'Enter':
                if (document.activeElement.classList.contains('cta-button')) {
                    this.handleCTAClick(event);
                }
                break;
            case 'Escape':
                this.hideAllModals();
                break;
        }
    }

    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const delay = Math.random() * 8;
            const duration = 8 + Math.random() * 4;
            
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            const colors = ['#b026ff', '#ff69b4', '#00d4ff', '#00ff88'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = randomColor;
        });
    }

    animateFloatingIcons() {
        const icons = document.querySelectorAll('.floating-icon');
        
        icons.forEach((icon, index) => {
            const rotation = Math.random() * 360;
            const scale = 0.8 + Math.random() * 0.4;
            
            icon.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            
            setInterval(() => {
                icon.style.transform = `scale(${scale * 1.1})`;
                setTimeout(() => {
                    icon.style.transform = `scale(${scale})`;
                }, 200);
            }, 3000 + Math.random() * 2000);
        });
    }

    animateGradients() {
        const gradientElements = document.querySelectorAll('.gradient-text, .banner-gradient');
        
        gradientElements.forEach(element => {
            setInterval(() => {
                element.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    element.style.filter = 'hue-rotate(0deg)';
                }, 1500);
            }, 3000);
        });
    }

    animatePhoneGlow() {
        const phoneGlow = document.querySelector('.phone-glow');
        if (!phoneGlow) return;
        
        setInterval(() => {
            phoneGlow.style.opacity = '0.8';
            phoneGlow.style.transform = 'translate(-50%, -50%) scale(1.05)';
            
            setTimeout(() => {
                phoneGlow.style.opacity = '0.6';
                phoneGlow.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 2000);
        }, 4000);
    }

    createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: var(--neon-purple);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 300);
        }, 100);
    }

    showTooltip(element, text) {
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);
        
        this.currentTooltip = tooltip;
    }

    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.style.opacity = '0';
            this.currentTooltip.style.transform = 'translateY(10px)';
            setTimeout(() => {
                if (this.currentTooltip.parentNode) {
                    this.currentTooltip.parentNode.removeChild(this.currentTooltip);
                }
                this.currentTooltip = null;
            }, 300);
        }
    }

    showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            padding: 16px 20px;
            border-radius: 12px;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid var(--neon-purple);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    simulateEventCreation() {
        const steps = [
            '🎯 Setting up your event page...',
            '📧 Preparing invitation system...',
            '💳 Configuring payment gateway...',
            '🎉 Your event is ready to go!'
        ];
        
        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < steps.length) {
                this.showNotification(steps[stepIndex], 'success');
                stepIndex++;
            } else {
                clearInterval(interval);
                this.showNotification('🚀 Welcome to Quick Events! Start creating amazing events!', 'success');
            }
        }, 1500);
    }

    hideAllModals() {
        const modals = document.querySelectorAll('.modal, .overlay');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Authentication Methods
    showSignInModal() {
        const modal = document.getElementById('signin-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            setTimeout(() => {
                const emailInput = document.getElementById('email');
                if (emailInput) emailInput.focus();
            }, 100);
            
            // Setup focus trap
            this.setupModalFocusTrap(modal);
            
            // Announce to screen readers
            this.announceToScreenReader('Sign in modal opened');

            // Initialize auth mode toggle
            const toggle = document.getElementById('auth-mode-toggle');
            if (toggle) {
                toggle.onclick = () => this.toggleAuthMode(toggle);
            }
        }
    }
    
    setupModalFocusTrap(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
            
            if (e.key === 'Escape') {
                this.closeSignInModal();
            }
        };
        
        modal.addEventListener('keydown', handleKeyDown);
        
        // Store for cleanup
        modal._focusTrapHandler = handleKeyDown;
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-label', message);
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        document.body.appendChild(announcement);
        
        this.safeSetTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    closeSignInModal() {
        const modal = document.getElementById('signin-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    toggleAuthMode(toggleBtn) {
        try {
            const pressed = toggleBtn.getAttribute('aria-pressed') === 'true';
            const nextPressed = !pressed;
            toggleBtn.setAttribute('aria-pressed', String(nextPressed));
            const textEl = toggleBtn.querySelector('.toggle-text');
            const input = document.getElementById('email');
            if (nextPressed) {
                // Mobile mode
                if (textEl) textEl.textContent = 'Use Email Instead';
                if (input) {
                    input.type = 'tel';
                    input.value = '';
                    input.placeholder = '+1234567890';
                    input.setAttribute('inputmode', 'tel');
                    input.setAttribute('autocomplete', 'tel');
                    input.setAttribute('pattern', '^\\+?[0-9]{7,15}$');
                }
                this.announceToScreenReader('Mobile sign-in selected');
            } else {
                // Email mode
                if (textEl) textEl.textContent = 'Use Mobile Number';
                if (input) {
                    input.type = 'email';
                    input.value = '';
                    input.placeholder = 'you@email.com';
                    input.setAttribute('inputmode', 'email');
                    input.setAttribute('autocomplete', 'email');
                    input.removeAttribute('pattern');
                }
                this.announceToScreenReader('Email sign-in selected');
            }
        } catch (_) {}
    }

    showSignUpModal() {
        const modal = document.getElementById('signup-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            // Focus on first input
            setTimeout(() => {
                const nameInput = document.getElementById('signup-name');
                if (nameInput) nameInput.focus();
            }, 100);
        }
    }

    closeSignUpModal() {
        const modal = document.getElementById('signup-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        this.closeSignInModal();
        this.closeSignUpModal();
    }

    handleSignIn(event) {
        event.preventDefault();
        
        try {
            const form = event.target;
            const email = this.sanitizeInput(form.email?.value || '');
            const isTelMode = form.email && form.email.type === 'tel';

            if (!email) {
                this.showNotification('❌ Please enter your email or mobile number', 'error');
                return;
            }

            if (!isTelMode && !this.validateEmail(email)) {
                this.showNotification('❌ Please enter a valid email address!', 'error');
                return;
            }
            if (isTelMode && !/^\+?[0-9]{7,15}$/.test(email)) {
                this.showNotification('❌ Please enter a valid mobile number', 'error');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('.auth-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Signing In...';
            }

            // Simulate API call
            this.safeSetTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                }
                this.showOTPStep(email);
            }, 1500);
        } catch (error) {
            console.error('Error in sign in:', error);
            this.showNotification('❌ An error occurred during sign in!', 'error');
            
            // Reset button state on error
            const submitBtn = form.querySelector('.auth-btn');
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = 'Sign In';
            }
        }
    }

    // Input validation methods
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input.trim()
            .replace(/[<>]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '');
    }

    // Security: Validate and sanitize user data
    validateUserData(userData) {
        if (!userData || typeof userData !== 'object') return false;
        
        const requiredFields = ['name', 'email'];
        return requiredFields.every(field => 
            userData[field] && typeof userData[field] === 'string' && userData[field].trim()
        );
    }

    handleSignUp(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const terms = form.terms.checked;

        // Show loading state
        const submitBtn = form.querySelector('.auth-btn');
        submitBtn.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            if (name && email && password && terms) {
                this.showNotification('✅ Account created successfully!', 'success');
                this.closeSignUpModal();
                this.updateHeaderForUser(name);
            } else {
                this.showNotification('❌ Please fill in all fields and accept terms', 'error');
            }
            submitBtn.classList.remove('loading');
        }, 1500);
    }

    handleSocialAuth(event) {
        event.preventDefault();
        const button = event.currentTarget;
        const provider = button.classList.contains('google-btn') ? 'Google' : 'LinkedIn';

        // Show loading state
        button.style.opacity = '0.7';
        button.style.pointerEvents = 'none';

        // Simulate social auth
        setTimeout(() => {
            this.showNotification(`🔐 Connecting to ${provider}...`, 'info');
            setTimeout(() => {
                this.showNotification(`✅ Successfully signed in with ${provider}!`, 'success');
                this.closeAllModals();
                this.updateHeaderForUser('User');
            }, 1000);
        }, 500);
    }

    checkUserState() {
        try {
            const userData = localStorage.getItem('userData');
            const signInBtn = document.querySelector('.header-right .btn-ghost');
            const avatarDropdown = document.getElementById('avatar-dropdown');
            
            if (userData && signInBtn && avatarDropdown) {
                const user = JSON.parse(userData);
                if (user && user.name) {
                    // User is logged in - show avatar, hide sign in button
                    signInBtn.style.display = 'none';
                    avatarDropdown.style.display = 'flex';
                    
                    // Update user info in dropdown
                    const userNameElement = avatarDropdown.querySelector('.user-name');
                    const userEmailElement = avatarDropdown.querySelector('.user-email');
                    const avatarInitial = avatarDropdown.querySelector('.avatar-initial');
                    
                    if (userNameElement) userNameElement.textContent = sanitizeForDisplay(user.name);
                    if (userEmailElement) userEmailElement.textContent = user.email || 'user@email.com';
                    if (avatarInitial) avatarInitial.textContent = user.name.charAt(0).toUpperCase();
                } else {
                    // No valid user data - show sign in button, hide avatar
                    signInBtn.style.display = 'flex';
                    avatarDropdown.style.display = 'none';
                }
            } else {
                // No user data - show sign in button, hide avatar
                if (signInBtn) signInBtn.style.display = 'flex';
                if (avatarDropdown) avatarDropdown.style.display = 'none';
            }
        } catch (error) {
            console.error('Error checking user state:', error);
            // Fallback: show sign in button, hide avatar
            const signInBtn = document.querySelector('.header-right .btn-ghost');
            const avatarDropdown = document.getElementById('avatar-dropdown');
            if (signInBtn) signInBtn.style.display = 'flex';
            if (avatarDropdown) avatarDropdown.style.display = 'none';
        }
    }

    updateHeaderForUser(userName) {
        try {
            if (!userName || typeof userName !== 'string') {
                console.error('Invalid userName provided to updateHeaderForUser');
                return;
            }
            
            const signInBtn = document.querySelector('.header-right .btn-ghost');
            const avatarDropdown = document.getElementById('avatar-dropdown');
            
            if (signInBtn && avatarDropdown) {
                // Hide sign in button and show avatar dropdown
                signInBtn.style.display = 'none';
                avatarDropdown.style.display = 'flex';
                
                // Update user info in dropdown
                const userNameElement = avatarDropdown.querySelector('.user-name');
                const userEmailElement = avatarDropdown.querySelector('.user-email');
                const avatarInitial = avatarDropdown.querySelector('.avatar-initial');
                
                if (userNameElement) userNameElement.textContent = sanitizeForDisplay(userName);
                if (userEmailElement) userEmailElement.textContent = 'user@email.com';
                if (avatarInitial) avatarInitial.textContent = userName.charAt(0).toUpperCase();
                
                showToast(`Welcome back, ${sanitizeForDisplay(userName)}!`, 'success');
            }
        } catch (error) {
            console.error('Error updating header for user:', error);
            showToast('Error updating user interface', 'error');
        }
    }

    showUserMenu() {
        this.toggleAvatarDropdown();
    }

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.querySelector('.password-toggle');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.innerHTML = `
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            `;
        } else {
            passwordInput.type = 'password';
            toggleBtn.innerHTML = `
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            `;
        }
    }

    toggleSignUpPassword() {
        const passwordInput = document.getElementById('signup-password');
        const toggleBtn = document.querySelector('#signup-modal .password-toggle');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.innerHTML = `
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            `;
        } else {
            passwordInput.type = 'password';
            toggleBtn.innerHTML = `
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            `;
        }
    }

    showOTPStep(email) {
        // Hide step 1 and show step 2
        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
        
        // Update the email display
        document.getElementById('otp-email-display').textContent = email;
        
        // Focus on first OTP input
        const firstOtpInput = document.querySelector('.otp-input[data-index="0"]');
        if (firstOtpInput) {
            firstOtpInput.focus();
        }
        
        // Start timer
        this.startOTPTimer();
        
        // Setup OTP input handlers
        this.setupOTPInputs();
    }

    goBackToStep1() {
        // Hide step 2 and show step 1
        document.getElementById('step-2').style.display = 'none';
        document.getElementById('step-1').style.display = 'block';
        
        // Clear OTP inputs
        document.querySelectorAll('.otp-input').forEach(input => {
            input.value = '';
            input.classList.remove('filled');
        });
        
        // Stop timer
        this.stopOTPTimer();
    }

    setupOTPInputs() {
        const otpInputs = document.querySelectorAll('.otp-input');
        
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                
                // Only allow numbers
                if (!/^\d*$/.test(value)) {
                    e.target.value = '';
                    return;
                }
                
                if (value.length === 1) {
                    input.classList.add('filled');
                    
                    // Move to next input
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    } else {
                        // All inputs filled, submit form
                        this.submitOTP();
                    }
                } else {
                    input.classList.remove('filled');
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    // Move to previous input on backspace
                    otpInputs[index - 1].focus();
                }
            });
        });
    }

    submitOTP() {
        const otpInputs = document.querySelectorAll('.otp-input');
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        
        if (otp.length === 6) {
            // Show loading state
            const submitBtn = document.querySelector('#otp-form .auth-btn');
            submitBtn.classList.add('loading');
            
            // Simulate OTP verification
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                this.showCategorySelection();
            }, 1500);
        }
    }

    startOTPTimer() {
        let countdown = 30;
        const timerElement = document.getElementById('timer-count');
        const timerContainer = document.getElementById('otp-timer');
        
        this.otpTimer = setInterval(() => {
            countdown--;
            if (timerElement) {
                timerElement.textContent = countdown;
            }
            
            if (countdown <= 0) {
                this.stopOTPTimer();
                if (timerContainer) {
                    timerContainer.innerHTML = '<span>Resend available</span>';
                }
            }
        }, 1000);
    }

    stopOTPTimer() {
        if (this.otpTimer) {
            clearInterval(this.otpTimer);
            this.otpTimer = null;
        }
    }

    resendOTP() {
        // Show loading state
        this.showNotification('📧 Resending OTP...', 'info');
        
        // Restart timer
        this.startOTPTimer();
        
        // Clear OTP inputs
        document.querySelectorAll('.otp-input').forEach(input => {
            input.value = '';
            input.classList.remove('filled');
        });
        
        // Focus on first input
        const firstOtpInput = document.querySelector('.otp-input[data-index="0"]');
        if (firstOtpInput) {
            firstOtpInput.focus();
        }
    }

    showCategorySelection() {
        console.log('🎯 Showing category selection...');
        
        try {
            // Hide step 2 and show step 3
            const step2 = document.getElementById('step-2');
            const step3 = document.getElementById('step-3');
            
            if (step2 && step3) {
                step2.style.display = 'none';
                step3.style.display = 'block';
                console.log('✅ Switched from step 2 to step 3');
            } else {
                console.error('❌ Step 2 or Step 3 elements not found!');
                return;
            }
            
            // Add class to modal content for wider width
            const modalContent = document.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.add('category-step');
                console.log('✅ Added category-step class to modal');
            }
            
            // Update header: set title, show back arrow, hide auth toggle
            const headerTitle = document.getElementById('signin-title');
            if (headerTitle) {
                headerTitle.textContent = 'Choose categories';
                console.log('✅ Updated header title');
            }
            
            const authToggle = document.getElementById('auth-mode-toggle');
            if (authToggle) {
                authToggle.style.display = 'none';
                console.log('✅ Hidden auth toggle');
            }
            
            const backBtn = document.getElementById('modal-back-btn');
            if (backBtn) {
                backBtn.style.display = '';
                console.log('✅ Showed back button');
            }
            
            // Setup category selection
            this.setupCategorySelection();
            
            // Force update counter after a short delay to ensure DOM is ready
            setTimeout(() => {
                this.updateCategoryCounter();
                console.log('✅ Forced counter update after delay');
            }, 100);
            
        } catch (error) {
            console.error('❌ Error in showCategorySelection:', error);
        }
    }

    goBackToStep2() {
        // Hide step 3 and show step 2
        document.getElementById('step-3').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
        
        // Remove class from modal content
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('category-step');
        }
        // Restore header for OTP step
        const headerTitle = document.getElementById('signin-title');
        if (headerTitle) headerTitle.textContent = 'Email or Mobile';
        const authToggle = document.getElementById('auth-mode-toggle');
        if (authToggle) authToggle.style.display = '';
        const backBtn = document.getElementById('modal-back-btn');
        if (backBtn) backBtn.style.display = 'none';
        
        // Clear category selections
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Reset state
        this.state.selectedCategories = [];
        
        // Reset counter
        this.updateCategoryCounter();
        
        // Save state
        this.saveState();
    }

    setupCategorySelection() {
        console.log('🔧 Setting up category selection...');
        
        const categoryCards = document.querySelectorAll('.category-card');
        console.log(`Found ${categoryCards.length} category cards`);
        
        if (categoryCards.length === 0) {
            console.error('❌ No category cards found!');
            return;
        }
        
        // Remove existing event listeners to prevent duplication
        categoryCards.forEach(card => {
            card.removeEventListener('click', this.handleCategoryCardClick);
        });
        
        // Add event listeners
        categoryCards.forEach(card => {
            card.addEventListener('click', this.handleCategoryCardClick.bind(this));
            console.log(`✅ Added click listener to: ${card.querySelector('.category-name')?.textContent || 'Unknown'}`);
        });
        
        // Initialize counter
        this.updateCategoryCounter();
        
        console.log('✅ Category selection setup complete');
    }

    handleCategoryCardClick(event) {
        const card = event.currentTarget;
        const categoryName = card.querySelector('.category-name')?.textContent || 'Unknown';
        
        console.log(`🖱️ Category clicked: ${categoryName}`);
        
        // Toggle selection
        card.classList.toggle('selected');
        const isSelected = card.classList.contains('selected');
        
        console.log(`Category ${categoryName} is now ${isSelected ? 'selected' : 'unselected'}`);
        
        // Update state
        if (isSelected) {
            if (!this.state.selectedCategories.includes(categoryName)) {
                this.state.selectedCategories.push(categoryName);
                console.log(`✅ Added ${categoryName} to selected categories`);
            }
        } else {
            const index = this.state.selectedCategories.indexOf(categoryName);
            if (index > -1) {
                this.state.selectedCategories.splice(index, 1);
                console.log(`❌ Removed ${categoryName} from selected categories`);
            }
        }
        
        console.log(`Current selected categories: ${this.state.selectedCategories.join(', ')}`);
        
        // Update counter and button
        this.updateCategoryCounter();
        
        // Save state
        this.saveState();
    }

    updateCategoryCounter() {
        console.log('🔄 Updating category counter...');
        
        const selectedCards = document.querySelectorAll('.category-card.selected');
        const counter = document.getElementById('category-counter');
        const continueBtn = document.querySelector('.category-continue-btn');
        const count = selectedCards.length;
        
        console.log(`Found ${count} selected cards`);
        
        if (counter) {
            if (count === 0) {
                counter.innerHTML = '<span>0 Categories Selected</span>';
                if (continueBtn) {
                    continueBtn.classList.remove('show');
                    continueBtn.disabled = true;
                    console.log('❌ Continue button hidden (no categories selected)');
                }
            } else if (count === 1) {
                counter.innerHTML = '<span>1 Category Selected</span>';
                if (continueBtn) {
                    continueBtn.classList.add('show');
                    continueBtn.disabled = false;
                    console.log('✅ Continue button shown (1 category selected)');
                }
            } else {
                counter.innerHTML = `<span>${count} Categories Selected</span>`;
                if (continueBtn) {
                    continueBtn.classList.add('show');
                    continueBtn.disabled = false;
                    console.log(`✅ Continue button shown (${count} categories selected)`);
                }
            }
        } else {
            console.error('❌ Category counter element not found!');
        }
        
        // Add visual feedback for button state
        if (continueBtn) {
            const btnText = continueBtn.querySelector('.btn-text');
            if (btnText) {
                if (count > 0) {
                    btnText.textContent = `Continue (${count})`;
                } else {
                    btnText.textContent = 'Continue';
                }
            }
            
            // Ensure button is clickable when shown
            if (count > 0) {
                continueBtn.style.pointerEvents = 'auto';
                continueBtn.style.opacity = '1';
                console.log('✅ Continue button is clickable');
            } else {
                continueBtn.style.pointerEvents = 'none';
                continueBtn.style.opacity = '0.5';
                console.log('❌ Continue button is not clickable');
            }
        } else {
            console.error('❌ Continue button element not found!');
        }
        
        console.log(`Category counter updated: ${count} categories selected`);
    }

    completeOnboarding() {
        console.log('🚀 Starting complete onboarding...');
        
        try {
            // Collect selected categories from DOM
            const selectedCards = document.querySelectorAll('.category-card.selected');
            const selectedCategories = Array.from(selectedCards).map(card => 
                card.querySelector('.category-name')?.textContent || 'Unknown'
            );
            
            console.log(`Selected categories from DOM: ${selectedCategories.join(', ')}`);
            
            // Update state with selected categories
            this.state.selectedCategories = selectedCategories;
            
            // Store user data
            const userData = {
                name: this.state.user?.name || 'User',
                email: this.state.user?.email || 'user@example.com',
                categories: this.state.selectedCategories
            };
            
            console.log('Saving user data:', userData);
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message
            this.showNotification('✅ Welcome to Quick Events!', 'success');
            
            console.log('✅ User data saved, redirecting to event-discovery.html...');
            
            // Redirect to discovery page
            setTimeout(() => {
                window.location.href = 'event-discovery.html';
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error in completeOnboarding:', error);
            this.showNotification('❌ Error completing onboarding', 'error');
        }
    }

    // Avatar Dropdown Methods
    toggleAvatarDropdown() {
        const dropdown = document.getElementById('dropdown-menu');
        const avatarBtn = document.querySelector('.avatar-btn');
        
        if (dropdown && avatarBtn) {
            const isOpen = dropdown.classList.contains('show');
            
            if (isOpen) {
                this.closeAvatarDropdown();
            } else {
                this.openAvatarDropdown();
            }
        }
    }

    openAvatarDropdown() {
        const dropdown = document.getElementById('dropdown-menu');
        const avatarBtn = document.querySelector('.avatar-btn');
        
        if (dropdown && avatarBtn) {
            dropdown.classList.add('show');
            avatarBtn.classList.add('active');
            
            // Close dropdown when clicking outside
            setTimeout(() => {
                document.addEventListener('click', this.handleOutsideClick.bind(this));
            }, 0);
        }
    }

    closeAvatarDropdown() {
        const dropdown = document.getElementById('dropdown-menu');
        const avatarBtn = document.querySelector('.avatar-btn');
        
        if (dropdown && avatarBtn) {
            dropdown.classList.remove('show');
            avatarBtn.classList.remove('active');
            
            // Remove outside click listener
            document.removeEventListener('click', this.handleOutsideClick.bind(this));
        }
    }

    handleOutsideClick(event) {
        const avatarDropdown = document.getElementById('avatar-dropdown');
        const dropdown = document.getElementById('dropdown-menu');
        
        if (avatarDropdown && !avatarDropdown.contains(event.target)) {
            this.closeAvatarDropdown();
        }
    }

    editProfile() {
        this.closeAvatarDropdown();
        this.showNotification('📝 Redirecting to Edit Profile...', 'info');
        
        // Redirect to edit profile page
        setTimeout(() => {
            window.location.href = 'edit-profile.html';
        }, 500);
    }

    viewSettings() {
        this.closeAvatarDropdown();
        this.showNotification('⚙️ Settings page coming soon!', 'info');
    }

    viewHelp() {
        this.closeAvatarDropdown();
        this.showNotification('❓ Help & Support coming soon!', 'info');
    }

    logout() {
        this.closeAvatarDropdown();
        this.showNotification('👋 Logging out...', 'info');
        
        // Simulate logout process
        setTimeout(() => {
            // Reset to sign in state
            const signInBtn = document.querySelector('.header-right .btn-ghost');
            const avatarDropdown = document.getElementById('avatar-dropdown');
            
            if (signInBtn && avatarDropdown) {
                signInBtn.style.display = 'flex';
                avatarDropdown.style.display = 'none';
            }
            
            // Clear user data from localStorage
            localStorage.removeItem('userData');
            localStorage.removeItem('selectedCategories');
            
            // Reset any user-specific state
            this.resetUserState();
            
            this.showNotification('✅ Successfully logged out!', 'success');
        }, 1000);
    }

    resetUserState() {
        // Reset any user-specific app state
        // Clear any user-specific data
    }

    showEditProfileModal() {
        // Create edit profile modal
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Edit Profile</h2>
                    <button class="modal-close" onclick="closeEditProfileModal()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="modal-body">
                    <form class="auth-form" id="edit-profile-form">
                        <div class="form-group">
                            <label class="form-label">Profile Picture</label>
                            <div class="profile-upload">
                                <div class="profile-preview">
                                    <span class="avatar-initial">U</span>
                                </div>
                                <button type="button" class="upload-btn" onclick="uploadProfilePhoto()">Upload Photo</button>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-name" class="form-label">Full Name</label>
                            <div class="input-wrapper">
                                <input type="text" id="edit-name" class="form-input" value="User Name" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-email" class="form-label">Email</label>
                            <div class="input-wrapper">
                                <input type="email" id="edit-email" class="form-input" value="user@email.com" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-phone" class="form-label">Phone Number</label>
                            <div class="input-wrapper">
                                <input type="tel" id="edit-phone" class="form-input" value="+1 234 567 8900" placeholder="Enter phone number">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-bio" class="form-label">Bio</label>
                            <div class="input-wrapper">
                                <textarea id="edit-bio" class="form-input" rows="3" placeholder="Tell us about yourself..."></textarea>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-location" class="form-label">Location</label>
                            <div class="input-wrapper">
                                <input type="text" id="edit-location" class="form-input" value="New York, NY" placeholder="Enter your location">
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="closeEditProfileModal()">Cancel</button>
                            <button type="submit" class="btn btn-primary auth-btn">
                                <span class="btn-text">Save Changes</span>
                                <div class="btn-loading">
                                    <div class="spinner"></div>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Add form submission handler
        const form = document.getElementById('edit-profile-form');
        if (form) {
            form.addEventListener('submit', this.handleEditProfileSubmit.bind(this));
        }
        
        // Focus on first input
        setTimeout(() => {
            const nameInput = document.getElementById('edit-name');
            if (nameInput) nameInput.focus();
        }, 100);
    }

    handleEditProfileSubmit(event) {
        event.preventDefault();
        
        try {
            const form = event.target;
            const name = form.querySelector('#edit-name')?.value || '';
            const email = form.querySelector('#edit-email')?.value || '';
            const phone = form.querySelector('#edit-phone')?.value || '';
            const bio = form.querySelector('#edit-bio')?.value || '';
            const location = form.querySelector('#edit-location')?.value || '';
            
            // Validate required fields
            if (!name.trim() || !email.trim()) {
                this.showNotification('❌ Name and email are required!', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('.auth-btn');
            if (submitBtn) submitBtn.classList.add('loading');
            
            // Simulate API call to update profile
            setTimeout(() => {
                if (submitBtn) submitBtn.classList.remove('loading');
                
                try {
                    // Update user data in localStorage
                    const userData = {
                        name: name.trim(),
                        email: email.trim(),
                        phone: phone.trim(),
                        bio: bio.trim(),
                        location: location.trim(),
                        updatedAt: new Date().toISOString()
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    // Update avatar dropdown with new name
                    this.updateAvatarWithUserData(userData);
                    
                    this.showNotification('✅ Profile updated successfully!', 'success');
                    closeEditProfileModal();
                } catch (storageError) {
                    console.error('Error saving user data:', storageError);
                    this.showNotification('❌ Error saving profile data!', 'error');
                }
            }, 1500);
        } catch (error) {
            console.error('Error handling edit profile submit:', error);
            this.showNotification('❌ Error updating profile!', 'error');
        }
    }

    updateAvatarWithUserData(userData) {
        try {
            const avatarDropdown = document.getElementById('avatar-dropdown');
            if (!avatarDropdown || !userData) return;
            
            const userNameElement = avatarDropdown.querySelector('.user-name');
            const userEmailElement = avatarDropdown.querySelector('.user-email');
            const avatarInitial = avatarDropdown.querySelector('.avatar-initial');
            const avatarImage = avatarDropdown.querySelector('.avatar-image');
            
            if (userNameElement) userNameElement.textContent = this.sanitizeInput(userData.name);
            if (userEmailElement) userEmailElement.textContent = userData.email || 'user@email.com';
            if (avatarInitial) {
                avatarInitial.textContent = userData.name.charAt(0).toUpperCase();
                avatarInitial.style.display = 'flex';
                avatarInitial.style.visibility = 'visible';
            }
            if (avatarImage) {
                avatarImage.style.display = 'flex';
                avatarImage.style.background = 'var(--gradient-primary)';
                avatarImage.style.visibility = 'visible';
            }
            
            // Force visibility of avatar dropdown
            avatarDropdown.style.display = 'flex';
            avatarDropdown.style.visibility = 'visible';
            
            // Hide any generic person icons
            const genericIcons = avatarDropdown.querySelectorAll('.generic-person-icon');
            genericIcons.forEach(icon => {
                icon.style.display = 'none';
            });
        } catch (error) {
            console.error('Error updating avatar with user data:', error);
        }
    }
}

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

document.addEventListener('DOMContentLoaded', () => {
    const app = new QuickEventsApp();
    window.quickEventsApp = app; // Make app globally available
    
    // Performance optimization: Single scroll handler with requestAnimationFrame
    let scrollTicking = false;
    const handleScroll = () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                app.handleParallax();
                app.handleHeaderScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    };
    
    const optimizedMouseMove = debounce(app.handleMouseMove.bind(app), 16);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousemove', optimizedMouseMove, { passive: true });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.hero-text, .hero-visual, .floating-icon');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    if ('serviceWorker' in navigator) {
        // Service Worker registration would go here
        // for PWA functionality
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuickEventsApp;
}

// Mobile Menu Functions
function toggleMobileMenu() {
    try {
        const mobileNav = document.getElementById('mobile-nav');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileNav && mobileBtn) {
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                mobileNav.classList.remove('active');
                mobileBtn.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                mobileNav.classList.add('active');
                mobileBtn.classList.add('active');
                mobileBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        }
    } catch (error) {
        console.error('Error toggling mobile menu:', error);
    }
}

// Toast Notification System
function showToast(message, type = 'info', duration = 4000) {
    try {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${sanitizeForDisplay(message)}</span>
            <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        
        container.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
        
    } catch (error) {
        console.error('Error showing toast:', error);
    }
}

// Enhanced sanitization for display
function sanitizeForDisplay(input) {
    if (typeof input !== 'string') return '';
    
    return input
        .trim()
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/data:/gi, '')
        .substring(0, 200); // Limit length
}

// Global functions for HTML onclick handlers
function showSignInModal() {
    try {
        if (window.quickEventsApp) {
            window.quickEventsApp.showSignInModal();
        } else {
            showToast('System is initializing, please try again', 'warning');
        }
    } catch (error) {
        console.error('Error showing sign in modal:', error);
        showToast('Unable to open sign in. Please refresh the page.', 'error');
    }
}

function closeSignInModal() {
    if (window.quickEventsApp) {
        window.quickEventsApp.closeSignInModal();
    }
}

function showSignUpModal() {
    if (window.quickEventsApp) {
        window.quickEventsApp.showSignUpModal();
    }
}

function closeSignUpModal() {
    if (window.quickEventsApp) {
        window.quickEventsApp.closeSignUpModal();
    }
}

function togglePassword() {
    if (window.quickEventsApp) {
        window.quickEventsApp.togglePassword();
    }
}

function toggleSignUpPassword() {
    if (window.quickEventsApp) {
        window.quickEventsApp.toggleSignUpPassword();
    }
}

function goBackToStep1() {
    if (window.quickEventsApp) {
        window.quickEventsApp.goBackToStep1();
    }
}

function resendOTP() {
    if (window.quickEventsApp) {
        window.quickEventsApp.resendOTP();
    }
}

function goBackToStep2() {
    if (window.quickEventsApp) {
        window.quickEventsApp.goBackToStep2();
    }
}

function completeOnboarding() {
    console.log('🚀 Global completeOnboarding called');
    
    try {
        if (window.quickEventsApp) {
            console.log('✅ Using QuickEventsApp instance');
            window.quickEventsApp.completeOnboarding();
        } else {
            console.log('⚠️ QuickEventsApp not available, using fallback');
            
            // Fallback implementation
            const selectedCards = document.querySelectorAll('.category-card.selected');
            const selectedCategories = Array.from(selectedCards).map(card => 
                card.querySelector('.category-name')?.textContent || 'Unknown'
            );
            
            console.log(`Selected categories: ${selectedCategories.join(', ')}`);
            
            const userData = {
                name: "User",
                email: "user@example.com",
                categories: selectedCategories
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('✅ User data saved via fallback');
            
            // Show success message
            if (typeof showToast === 'function') {
                showToast('✅ Welcome to Quick Events!', 'success');
            } else {
                alert('✅ Welcome to Quick Events!');
            }
            
            // Redirect to discovery page
            setTimeout(() => {
                window.location.href = 'event-discovery.html';
            }, 1000);
        }
    } catch (error) {
        console.error('❌ Error in global completeOnboarding:', error);
        alert('❌ Error completing onboarding. Please try again.');
    }
}

// Avatar Dropdown Functions
function toggleAvatarDropdown() {
    if (window.quickEventsApp) {
        window.quickEventsApp.toggleAvatarDropdown();
    }
}

function editProfile() {
    if (window.quickEventsApp) {
        window.quickEventsApp.editProfile();
    } else {
        // Fallback if app is not initialized
        showToast('📝 Redirecting to Edit Profile...', 'info');
        setTimeout(() => {
            window.location.href = 'edit-profile.html';
        }, 500);
    }
}

function viewSettings() {
    if (window.quickEventsApp) {
        window.quickEventsApp.viewSettings();
    }
}

function viewHelp() {
    if (window.quickEventsApp) {
        window.quickEventsApp.viewHelp();
    }
}

function logout() {
    if (window.quickEventsApp) {
        window.quickEventsApp.logout();
    }
}

function closeEditProfileModal() {
    const modal = document.querySelector('.modal.show');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function uploadProfilePhoto() {
    // Create file input for photo upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Update profile preview
                const preview = document.querySelector('.profile-preview');
                if (preview) {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
                }
                
                // Show success notification
                if (window.quickEventsApp) {
                    window.quickEventsApp.showNotification('📸 Profile photo uploaded!', 'success');
                }
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}



// Footer Enhancement Functions
function setupFooterInteractions() {
    // Accessibility toggle
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', toggleAccessibility);
    }
    
    // Feedback button
    const feedbackBtn = document.getElementById('feedback-btn');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', openFeedbackModal);
    }
    
    // Enhanced link tracking
    setupLinkTracking();
    
    // Keyboard navigation
    setupKeyboardNavigation();
}

function toggleAccessibility() {
    const footer = document.querySelector('.footer');
    const isHighContrast = footer.classList.contains('high-contrast');
    
    if (isHighContrast) {
        footer.classList.remove('high-contrast');
        localStorage.setItem('accessibility-mode', 'normal');
        showFooterNotification('Accessibility mode disabled');
    } else {
        footer.classList.add('high-contrast');
        localStorage.setItem('accessibility-mode', 'high-contrast');
        showFooterNotification('High contrast mode enabled');
    }
}

function openFeedbackModal() {
    // Create feedback modal
    const modal = document.createElement('div');
    modal.className = 'feedback-modal';
    modal.innerHTML = `
        <div class="feedback-content">
            <h3>Send Feedback</h3>
            <textarea placeholder="Tell us what you think..." rows="4"></textarea>
            <div class="feedback-actions">
                <button class="btn-secondary" onclick="closeFeedbackModal()">Cancel</button>
                <button class="btn-primary" onclick="submitFeedback()">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus management
    const textarea = modal.querySelector('textarea');
    textarea.focus();
    
    // Close on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFeedbackModal();
        }
    });
}

function closeFeedbackModal() {
    const modal = document.querySelector('.feedback-modal');
    if (modal) {
        modal.remove();
    }
}

function submitFeedback() {
    const textarea = document.querySelector('.feedback-modal textarea');
    const feedback = textarea.value.trim();
    
    if (feedback) {
        // Here you would send the feedback to your backend
        showFooterNotification('Thank you for your feedback!');
        closeFeedbackModal();
    } else {
        showFooterNotification('Please enter your feedback');
    }
}

function setupLinkTracking() {
    const links = document.querySelectorAll('.footer-link, .social-link');
    
            links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Track link clicks for analytics
                const linkText = this.textContent.trim();
                const linkHref = this.href;
                
                // Add loading state
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            });
        });
}

function setupKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('.footer-link, .social-link, .footer-btn');
    
    focusableElements.forEach((element, index) => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add tabindex for better keyboard navigation
        element.setAttribute('tabindex', '0');
    });
}

function showFooterNotification(message) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'footer-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize footer functionality
document.addEventListener('DOMContentLoaded', () => {
    setupFooterInteractions();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.quickEventsApp) {
        window.quickEventsApp.cleanup();
    }
}); 