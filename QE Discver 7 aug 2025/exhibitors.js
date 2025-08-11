// Exhibitors Page JavaScript
class ExhibitorsPage {
    constructor() {
        this.exhibitors = [
            {
                id: 1,
                name: "TechCorp Solutions",
                description: "Leading provider of innovative technology solutions for modern businesses.",
                category: "tech",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMwMEE4RkYiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMkwyIDd2MTBjMCA1LjUgNC41IDEwIDEwIDEwczEwLTQuNSAxMC0xMFY3bC0xMC01eiIvPgo8cGF0aCBkPSJNMjIgMTJ2LTJsLTYtMyIvPgo8L3N2Zz4KPC9zdmc+Cg==",
                tags: ["Technology", "AI/ML", "Cloud"],
                featured: true
            },
            {
                id: 2,
                name: "HealthTech Innovations",
                description: "Revolutionary healthcare technology improving patient outcomes worldwide.",
                category: "health",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRjQ3NTciLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMkwyIDd2MTBjMCA1LjUgNC41IDEwIDEwIDEwczEwLTQuNSAxMC0xMFY3bC0xMC01eiIvPgo8cGF0aCBkPSJNMjIgMTJ2LTJsLTYtMyIvPgo8L3N2Zz4KPC9zdmc+Cg==",
                tags: ["Healthcare", "Medical", "AI"],
                featured: true
            },
            {
                id: 3,
                name: "FinFlow Systems",
                description: "Next-generation financial technology solutions for digital banking.",
                category: "finance",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRjQ3NTciLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMkwyIDd2MTBjMCA1LjUgNC41IDEwIDEwIDEwczEwLTQuNSAxMC0xMFY3bC0xMC01eiIvPgo8cGF0aCBkPSJNMjIgMTJ2LTJsLTYtMyIvPgo8L3N2Zz4KPC9zdmc+Cg==",
                tags: ["Finance", "Banking", "Blockchain"],
                featured: false
            },
            {
                id: 4,
                name: "EduTech Pro",
                description: "Innovative educational technology platforms for modern learning.",
                category: "education",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRkMxMDciLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMkwyIDd2MTBjMCA1LjUgNC41IDEwIDEwIDEwczEwLTQuNSAxMC0xMFY3bC0xMC01eiIvPgo8cGF0aCBkPSJNMjIgMTJ2LTJsLTYtMyIvPgo8L3N2Zz4KPC9zdmc+Cg==",
                tags: ["Education", "E-Learning", "VR/AR"],
                featured: false
            },
            {
                id: 5,
                name: "GreenTech Solutions",
                description: "Sustainable technology solutions for a greener future.",
                category: "tech",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRjQ3NTciLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMkwyIDd2MTBjMCA1LjUgNC41IDEwIDEwIDEwczEwLTQuNSAxMC0xMFY3bC0xMC01eiIvPgo8cGF0aCBkPSJNMjIgMTJ2LTJsLTYtMyIvPgo8L3N2Zz4KPC9zdmc+Cg==",
                tags: ["Sustainability", "Green Tech", "IoT"],
                featured: false
            },
            {
                id: 6,
                name: "MediCare Plus",
                description: "Advanced medical technology for improved healthcare delivery.",
                category: "health",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRjQ3NTciLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMkwyIDd2MTBjMCA1LjUgNC41IDEwIDEwIDEwczEwLTQuNSAxMC0xMFY3bC0xMC01eiIvPgo8cGF0aCBkPSJNMjIgMTJ2LTJsLTYtMyIvPgo8L3N2Zz4KPC9zdmc+Cg==",
                tags: ["Medical", "Healthcare", "Diagnostics"],
                featured: false
            }
        ];
        this.filteredExhibitors = [...this.exhibitors];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderExhibitors();
        this.startTimeUpdate();
        this.updateTime();
        this.loadUserState();
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

    updateTime() {
        const timeDisplay = document.getElementById('current-time');
        if (timeDisplay) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeDisplay.textContent = timeString;
        }
    }

    startTimeUpdate() {
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    renderExhibitors() {
        const exhibitorsGrid = document.getElementById('exhibitors-grid');
        if (!exhibitorsGrid) return;
        
        exhibitorsGrid.innerHTML = '';
        
        this.filteredExhibitors.forEach(exhibitor => {
            const exhibitorCard = document.createElement('div');
            exhibitorCard.className = 'exhibitor-card';
            exhibitorCard.onclick = () => this.viewExhibitor(exhibitor.id);
            
            exhibitorCard.innerHTML = `
                <div class="exhibitor-logo">
                    <img src="${exhibitor.logo}" alt="${exhibitor.name}" class="logo-image">
                </div>
                <div class="exhibitor-content">
                    <h3 class="exhibitor-name">${exhibitor.name}</h3>
                    <p class="exhibitor-description">${exhibitor.description}</p>
                    <div class="exhibitor-tags">
                        ${exhibitor.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            exhibitorsGrid.appendChild(exhibitorCard);
        });
    }

    filterExhibitors() {
        const categoryFilter = document.getElementById('category-filter');
        const searchInput = document.getElementById('search-exhibitors');
        
        if (!categoryFilter || !searchInput) return;
        
        const selectedCategory = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        this.filteredExhibitors = this.exhibitors.filter(exhibitor => {
            const matchesCategory = !selectedCategory || exhibitor.category === selectedCategory;
            const matchesSearch = !searchTerm || 
                exhibitor.name.toLowerCase().includes(searchTerm) ||
                exhibitor.description.toLowerCase().includes(searchTerm) ||
                exhibitor.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            return matchesCategory && matchesSearch;
        });
        
        this.renderExhibitors();
    }

    viewExhibitor(id) {
        const exhibitor = this.exhibitors.find(e => e.id === id);
        if (exhibitor) {
            this.showToast(`Loading ${exhibitor.name} details...`, 'info');
            // Navigate to exhibitor details page
            setTimeout(() => {
                window.location.href = `exhibitor-details.html?id=${exhibitor.id}&name=${encodeURIComponent(exhibitor.name)}`;
            }, 1000);
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
}

function editProfile() {
    // Implementation for edit profile
    console.log('Edit profile');
}

function viewSettings() {
    // Implementation for view settings
    console.log('View settings');
}

function viewHelp() {
    // Implementation for view help
    console.log('View help');
}

function logout() {
    // Implementation for logout
    console.log('Logging out...');
    if (window.exhibitorsPage) {
        window.exhibitorsPage.showToast('Logging out...', 'success');
    }
}

function filterExhibitors() {
    if (window.exhibitorsPage) {
        window.exhibitorsPage.filterExhibitors();
    }
}

function viewExhibitor(id) {
    if (window.exhibitorsPage) {
        window.exhibitorsPage.viewExhibitor(id);
    }
}

function showSignInModal() {
    // Implementation for sign in modal
    console.log('Show sign in modal');
}

function showSignUpModal() {
    // Implementation for sign up modal
    console.log('Show sign up modal');
}

// Test function to simulate login (for testing purposes)
function testLogin() {
    const testUser = {
        name: "Test User",
        email: "test@example.com",
        avatar: "T"
    };
    localStorage.setItem('userData', JSON.stringify(testUser));
    
    if (window.exhibitorsPage) {
        window.exhibitorsPage.showLoggedInState();
        window.exhibitorsPage.showToast('Test login successful!', 'success');
    }
}

// Test function to simulate logout
function testLogout() {
    localStorage.removeItem('userData');
    
    if (window.exhibitorsPage) {
        window.exhibitorsPage.showLoggedOutState();
        window.exhibitorsPage.showToast('Test logout successful!', 'info');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    window.exhibitorsPage = new ExhibitorsPage();
});
