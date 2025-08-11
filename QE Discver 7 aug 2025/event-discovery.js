class EventDiscoveryPage {
    constructor() {
        this.cachedElements = {};
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupMobileMenu();
        
        this.loadUserState();
        setTimeout(() => {
            this.loadUserState();
        }, 500);
    }

    cacheElements() {
        this.cachedElements = {
            searchInput: document.querySelector('.search-hero-input'),
            searchBtn: document.querySelector('.search-hero-btn'),
            signInBtn: document.querySelector('.header-right .btn-ghost'),
            avatarDropdown: document.getElementById('avatar-dropdown'),
            mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
            mobileNav: document.querySelector('.mobile-nav'),
            mobileNavClose: document.querySelector('.mobile-nav-close'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            toastContainer: document.querySelector('.toast-container')
        };
    }

    setupEventListeners() {
        if (this.cachedElements.searchInput) {
            this.cachedElements.searchInput.addEventListener('input', this.handleSearch.bind(this));
        }
        
        if (this.cachedElements.searchBtn) {
            this.cachedElements.searchBtn.addEventListener('click', this.handleSearch.bind(this));
        }

        this.cachedElements.filterBtns.forEach(btn => {
            btn.addEventListener('click', this.handleFilter.bind(this));
        });

        // Add click handlers for event cards
        this.setupEventCardClicks();
    }

    setupMobileMenu() {
        if (this.cachedElements.mobileMenuBtn) {
            this.cachedElements.mobileMenuBtn.addEventListener('click', () => {
                this.cachedElements.mobileNav.classList.toggle('active');
                this.cachedElements.mobileMenuBtn.classList.toggle('active');
                
                const isExpanded = this.cachedElements.mobileNav.classList.contains('active');
                this.cachedElements.mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            });
        }

        if (this.cachedElements.mobileNavClose) {
            this.cachedElements.mobileNavClose.addEventListener('click', () => {
                this.cachedElements.mobileNav.classList.remove('active');
                this.cachedElements.mobileMenuBtn.classList.remove('active');
                this.cachedElements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        }
    }

    loadUserState() {
        const userData = localStorage.getItem('userData');
        
        if (userData) {
            try {
                const user = JSON.parse(userData);
                this.updateHeaderForUser(user);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            this.updateHeaderForGuest();
        }
    }

    updateHeaderForUser(user) {
        if (this.cachedElements.signInBtn) {
            this.cachedElements.signInBtn.style.display = 'none';
        }
        
        if (this.cachedElements.avatarDropdown) {
            this.cachedElements.avatarDropdown.style.display = 'flex';
            
            // Update user info in dropdown
            const userName = this.cachedElements.avatarDropdown.querySelector('.user-name');
            const userEmail = this.cachedElements.avatarDropdown.querySelector('.user-email');
            const avatarInitial = this.cachedElements.avatarDropdown.querySelector('.avatar-initial');
            
            if (userName && user.name) {
                userName.textContent = user.name;
            }
            
            if (userEmail && user.email) {
                userEmail.textContent = user.email;
            }
            
            if (avatarInitial && user.name) {
                avatarInitial.textContent = user.name.charAt(0).toUpperCase();
            }
        }
    }

    updateHeaderForGuest() {
        if (this.cachedElements.signInBtn) {
            this.cachedElements.signInBtn.style.display = 'block';
        }
        
        if (this.cachedElements.avatarDropdown) {
            this.cachedElements.avatarDropdown.style.display = 'none';
        }
    }

    handleSearch(event) {
        const query = event.target.value.trim();
        
        if (query) {
            this.showToast(`🔍 Searching for: "${query}"`, 'info');
            // Add search functionality here
        }
    }

    handleFilter(event) {
        const filterBtn = event.currentTarget;
        const filterType = filterBtn.textContent.trim();
        
        // Remove active class from all filter buttons
        this.cachedElements.filterBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        filterBtn.classList.add('active');
        
        this.showToast(`🎯 Filter applied: ${filterType}`, 'success');
    }

    showToast(message, type = 'info') {
        if (!this.cachedElements.toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${this.getToastIcon(type)}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        
        this.cachedElements.toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }

    getToastIcon(type) {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
            default:
                return 'ℹ️';
        }
    }

    setupEventCardClicks() {
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            card.addEventListener('click', this.handleEventCardClick.bind(this));
        });
    }

    handleEventCardClick(event) {
        const eventCard = event.currentTarget;
        const eventTitle = eventCard.querySelector('.event-title')?.textContent || 'Event';
        
        // Store event data for the detail page
        const eventData = {
            title: eventTitle,
            date: eventCard.querySelector('.event-detail span')?.textContent || '02 April 2025 • 11:00 AM',
            location: eventCard.querySelectorAll('.event-detail span')[1]?.textContent || 'Delhi',
            attendees: eventCard.querySelector('.attendees span')?.textContent || '2.1K Attendees',
            entryFee: eventCard.querySelector('.entry-fee span')?.textContent || 'Free Entry'
        };
        
        localStorage.setItem('currentEventData', JSON.stringify(eventData));
        
        // Navigate to event detail page
        window.location.href = 'event-detail.html';
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EventDiscoveryPage();
});
