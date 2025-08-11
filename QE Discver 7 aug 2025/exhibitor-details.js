// Exhibitor Details Page JavaScript
class ExhibitorDetailsPage {
    constructor() {
        this.isBookmarked = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTimeUpdate();
        this.updateTime();
        this.loadUserState();
        this.loadExhibitorData();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.toggle('active');
            });
        }

        // Avatar dropdown toggle
        const avatarBtn = document.querySelector('.avatar-btn');
        const avatarDropdown = document.getElementById('avatar-dropdown');
        
        if (avatarBtn && avatarDropdown) {
            avatarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                avatarDropdown.classList.toggle('active');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (avatarDropdown) {
                avatarDropdown.classList.remove('active');
            }
        });

        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    loadUserState() {
        // Check if user is logged in
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user && user.name) {
                    this.showLoggedInState();
                    return;
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        
        // Show logged out state
        console.log('👤 Showing logged out state');
        this.showLoggedOutState();
    }

    showLoggedInState() {
        const avatarDropdown = document.getElementById('avatar-dropdown');
        const desktopNav = document.querySelector('.desktop-nav');
        
        if (avatarDropdown) {
            avatarDropdown.style.display = 'flex';
        }
        
        if (desktopNav) {
            desktopNav.style.display = 'none';
        }
    }

    showLoggedOutState() {
        console.log('👤 Showing logged out state...');
        
        const avatarDropdown = document.getElementById('avatar-dropdown');
        const desktopNav = document.querySelector('.desktop-nav');
        
        if (avatarDropdown) {
            avatarDropdown.style.display = 'none';
        }
        
        if (desktopNav) {
            desktopNav.style.display = 'flex';
        }
        
        console.log('✅ Logged out state applied');
    }

    loadExhibitorData() {
        // Get exhibitor ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const exhibitorId = urlParams.get('id');
        
        if (exhibitorId) {
            // In a real app, this would fetch data from an API
            console.log('Loading exhibitor data for ID:', exhibitorId);
            this.updateExhibitorDisplay(exhibitorId);
        } else {
            // Default data for demo
            this.updateExhibitorDisplay('xyz-company');
        }
    }

    updateExhibitorDisplay(exhibitorId) {
        // Get exhibitor name from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const exhibitorName = urlParams.get('name');
        
        // Update page title and company name based on exhibitor
        const companyNameElement = document.querySelector('.company-name');
        const pageTitleElement = document.querySelector('.page-title');
        
        if (exhibitorName) {
            if (companyNameElement) companyNameElement.textContent = exhibitorName;
            if (pageTitleElement) pageTitleElement.textContent = `Exhibitor Details - ${exhibitorName}`;
        } else if (exhibitorId === 'xyz-company') {
            if (companyNameElement) companyNameElement.textContent = 'XYZ Company';
            if (pageTitleElement) pageTitleElement.textContent = 'Exhibitor Details - XYZ Company';
        } else {
            if (companyNameElement) companyNameElement.textContent = 'TechCorp Solutions';
            if (pageTitleElement) pageTitleElement.textContent = 'Exhibitor Details - TechCorp Solutions';
        }
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata'
        });
        
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = `${timeString} GMT+5:30`;
        }
    }

    startTimeUpdate() {
        // Update time every minute
        setInterval(() => {
            this.updateTime();
        }, 60000);
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
}

// Global functions
function goBack() {
    window.history.back();
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

function toggleAvatarDropdown() {
    const avatarDropdown = document.getElementById('avatar-dropdown');
    if (avatarDropdown) {
        avatarDropdown.classList.toggle('active');
    }
}

function showSignInModal() {
    // Implementation for sign in modal
    console.log('Show sign in modal');
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showToast('Sign In modal would open here', 'info');
    }
}

function editProfile() {
    // Implementation for edit profile
    console.log('Edit profile');
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showToast('Edit Profile would open here', 'info');
    }
}

function viewSettings() {
    // Implementation for view settings
    console.log('View settings');
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showToast('Settings would open here', 'info');
    }
}

function viewHelp() {
    // Implementation for view help
    console.log('View help');
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showToast('Help & Support would open here', 'info');
    }
}

function logout() {
    // Implementation for logout
    console.log('Logging out...');
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showToast('Logging out...', 'success');
    }
}

// Exhibitor-specific functions
function toggleBookmark() {
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.isBookmarked = !window.exhibitorDetailsPage.isBookmarked;
        const bookmarkBtn = document.querySelector('.bookmark-btn');
        
        if (bookmarkBtn) {
            if (window.exhibitorDetailsPage.isBookmarked) {
                bookmarkBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                `;
                window.exhibitorDetailsPage.showToast('Exhibitor saved to favorites!', 'success');
            } else {
                bookmarkBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                `;
                window.exhibitorDetailsPage.showToast('Exhibitor removed from favorites', 'info');
            }
        }
    }
}

function scheduleMeeting(representativeId) {
    console.log('Scheduling meeting with representative:', representativeId);
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showToast(`Opening meeting scheduler for ${representativeId}...`, 'info');
        // Navigate to meeting scheduler page
        setTimeout(() => {
            window.location.href = `meeting-scheduler.html?id=${representativeId}&name=${encodeURIComponent(representativeId === 'pramod' ? 'Mr. Pramod Jain' : 'Ms. Aarti Sharma')}`;
        }, 1000);
    }
}

function messageRepresentative(representativeId) {
    console.log('Messaging representative:', representativeId);
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showToast(`Opening chat with ${representativeId}...`, 'info');
    }
}

// Test function to simulate login (for testing purposes)
function testLogin() {
    const testUser = {
        name: "Test User",
        email: "test@example.com",
        avatar: "T"
    };
    localStorage.setItem('userData', JSON.stringify(testUser));
    
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showLoggedInState();
        window.exhibitorDetailsPage.showToast('Test login successful!', 'success');
    }
}

// Test function to simulate logout
function testLogout() {
    localStorage.removeItem('userData');
    
    if (window.exhibitorDetailsPage) {
        window.exhibitorDetailsPage.showLoggedOutState();
        window.exhibitorDetailsPage.showToast('Test logout successful!', 'info');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    window.exhibitorDetailsPage = new ExhibitorDetailsPage();
});
