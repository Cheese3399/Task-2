// Networking Page JavaScript
class NetworkingPage {
    constructor() {
        this.isNetworkingEnabled = false; // Default to false (toggle off)
        this.bookmarkedAttendees = new Set();
        this.attendees = [
            {
                id: 'pramod',
                name: 'Pramod Jain',
                title: 'Founder',
                company: 'xyz company',
                avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiM0Q0Y1RjEiLz4KPHN2ZyB4PSIxNSIgeT0iMTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz4KPC9zdmc+Cjwvc3ZnPgo='
            },
            {
                id: 'aarti',
                name: 'Aarti Sharma',
                title: 'Head of Marketing',
                company: 'xyz company',
                avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRjQ3NTciLz4KPHN2ZyB4PSIxNSIgeT0iMTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz4KPC9zdmc+Cjwvc3ZnPgo='
            }
        ];
    }

    init() {
        this.setupEventListeners();
        this.loadUserState();
        this.startTimeUpdate();
        this.loadBookmarks();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.toggle('active');
                const isExpanded = mobileNav.classList.contains('active');
                mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            });
        }

        // Avatar dropdown toggle
        const avatarBtn = document.querySelector('.avatar-btn');
        const avatarDropdown = document.getElementById('avatar-dropdown');
        
        if (avatarBtn && avatarDropdown) {
            avatarBtn.addEventListener('click', () => {
                avatarDropdown.classList.toggle('active');
                const isExpanded = avatarDropdown.classList.contains('active');
                avatarBtn.setAttribute('aria-expanded', isExpanded);
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (avatarDropdown && !avatarDropdown.contains(e.target)) {
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
        // For testing: Always show avatar by default
        this.showLoggedInState();
    }

    showLoggedInState() {
        const avatarDropdown = document.getElementById('avatar-dropdown');
        const desktopNav = document.querySelector('.desktop-nav');
        
        if (avatarDropdown) {
            avatarDropdown.style.display = 'block';
        }
        
        if (desktopNav) {
            desktopNav.style.display = 'none';
        }
    }

    showLoggedOutState() {
        const avatarDropdown = document.getElementById('avatar-dropdown');
        const desktopNav = document.querySelector('.desktop-nav');
        
        if (avatarDropdown) {
            avatarDropdown.style.display = 'none';
        }
        
        if (desktopNav) {
            desktopNav.style.display = 'block';
        }
    }

    startTimeUpdate() {
        this.updateTime();
        setInterval(() => this.updateTime(), 60000); // Update every minute
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
            timeElement.textContent = timeString;
        }
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

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 3000);
    }

    loadBookmarks() {
        const savedBookmarks = localStorage.getItem('networkingBookmarks');
        if (savedBookmarks) {
            this.bookmarkedAttendees = new Set(JSON.parse(savedBookmarks));
            this.updateBookmarkButtons();
        }
    }

    updateBookmarkButtons() {
        this.bookmarkedAttendees.forEach(attendeeId => {
            const bookmarkBtn = document.querySelector(`[onclick="toggleBookmark('${attendeeId}')"]`);
            if (bookmarkBtn) {
                bookmarkBtn.classList.add('bookmarked');
            }
        });
    }
}

// Global functions
function goBack() {
    window.history.back();
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && mobileMenuBtn) {
        mobileNav.classList.toggle('active');
        const isExpanded = mobileNav.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    }
}

function toggleAvatarDropdown() {
    const avatarDropdown = document.getElementById('avatar-dropdown');
    const avatarBtn = document.querySelector('.avatar-btn');
    
    if (avatarDropdown && avatarBtn) {
        avatarDropdown.classList.toggle('active');
        const isExpanded = avatarDropdown.classList.contains('active');
        avatarBtn.setAttribute('aria-expanded', isExpanded);
    }
}

function showSignInModal() {
    if (window.networkingPage) {
        window.networkingPage.showToast('Sign in functionality coming soon!', 'info');
    }
}

function editProfile() {
    if (window.networkingPage) {
        window.networkingPage.showToast('Edit profile functionality coming soon!', 'info');
    }
}

function viewSettings() {
    if (window.networkingPage) {
        window.networkingPage.showToast('Settings functionality coming soon!', 'info');
    }
}

function viewHelp() {
    if (window.networkingPage) {
        window.networkingPage.showToast('Help & Support functionality coming soon!', 'info');
    }
}

function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    if (window.networkingPage) {
        window.networkingPage.showLoggedOutState();
        window.networkingPage.showToast('Logged out successfully!', 'success');
    }
}

// Networking specific functions
function toggleNetworking() {
    const toggle = document.getElementById('networking-toggle');
    if (toggle) {
        const isEnabled = toggle.checked;
        if (window.networkingPage) {
            window.networkingPage.isNetworkingEnabled = isEnabled;
            const message = isEnabled ? 'Networking mode enabled!' : 'Networking mode disabled!';
            window.networkingPage.showToast(message, isEnabled ? 'success' : 'info');
        }
    }
}

function showMyContacts() {
    if (window.networkingPage) {
        window.networkingPage.showToast('My Contacts functionality coming soon!', 'info');
    }
}

function showMyMeetings() {
    if (window.networkingPage) {
        window.networkingPage.showToast('My Meetings functionality coming soon!', 'info');
    }
}

function searchAttendees() {
    const searchInput = document.getElementById('search-input');
    if (searchInput && window.networkingPage) {
        const query = searchInput.value.toLowerCase();
        // Implement search functionality here
        window.networkingPage.showToast(`Searching for: ${query}`, 'info');
    }
}

function showFilters() {
    if (window.networkingPage) {
        window.networkingPage.showToast('Filter options coming soon!', 'info');
    }
}

function showAIMatches() {
    if (window.networkingPage) {
        window.networkingPage.showToast('AI Matches functionality coming soon!', 'info');
    }
}

function toggleBookmark(attendeeId) {
    if (window.networkingPage) {
        const isBookmarked = window.networkingPage.bookmarkedAttendees.has(attendeeId);
        
        if (isBookmarked) {
            window.networkingPage.bookmarkedAttendees.delete(attendeeId);
            window.networkingPage.showToast('Removed from bookmarks!', 'info');
        } else {
            window.networkingPage.bookmarkedAttendees.add(attendeeId);
            window.networkingPage.showToast('Added to bookmarks!', 'success');
        }
        
        // Save to localStorage
        localStorage.setItem('networkingBookmarks', JSON.stringify([...window.networkingPage.bookmarkedAttendees]));
        
        // Update button appearance
        const bookmarkBtn = document.querySelector(`[onclick="toggleBookmark('${attendeeId}')"]`);
        if (bookmarkBtn) {
            bookmarkBtn.classList.toggle('bookmarked', !isBookmarked);
        }
    }
}

// Test functions
function testLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('showAvatarForTesting', 'true');
    if (window.networkingPage) {
        window.networkingPage.showLoggedInState();
        window.networkingPage.showToast('Test login successful!', 'success');
    }
}

function testLogout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('showAvatarForTesting', 'false');
    if (window.networkingPage) {
        window.networkingPage.showLoggedOutState();
        window.networkingPage.showToast('Test logout successful!', 'info');
    }
}

function showAvatarForTesting() {
    localStorage.setItem('showAvatarForTesting', 'true');
    if (window.networkingPage) {
        window.networkingPage.showLoggedInState();
        window.networkingPage.showToast('Avatar shown for testing!', 'success');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Networking page initializing...');
    window.networkingPage = new NetworkingPage();
    window.networkingPage.init();
    console.log('✅ Networking page initialized successfully!');
    
    // Debug: Check if avatar is visible
    setTimeout(() => {
        const avatarDropdown = document.getElementById('avatar-dropdown');
        if (avatarDropdown) {
            console.log('👤 Avatar dropdown found:', avatarDropdown.style.display);
        } else {
            console.log('❌ Avatar dropdown not found');
        }
    }, 500);
});
