// Event Detail Page JavaScript - Expert UI/UX Design
class EventDetailPage {
    constructor() {
        this.cachedElements = {};
        this.countdownInterval = null;
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupScrollListener();
        this.startCountdown();
        this.loadEventData();
        this.loadUserState();
        setTimeout(() => {
            this.loadUserState();
        }, 500);
        // Handle URL parameters after page is loaded (if needed for other features)
        setTimeout(() => {
            this.handleUrlParameters();
        }, 1000);
        
        // Add backup event listener for exhibitors card (immediate)
        const exhibitorsCard = document.querySelector('.feature-card[onclick*="navigateToExhibitors"]');
        if (exhibitorsCard) {
            console.log('Found exhibitors card, adding backup event listener');
            exhibitorsCard.addEventListener('click', function(e) {
                console.log('Backup event listener triggered');
                e.preventDefault();
                e.stopPropagation();
                navigateToExhibitors();
            });
        } else {
            console.log('Exhibitors card not found');
        }
    }

    cacheElements() {
        this.cachedElements = {
            mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
            mobileNav: document.getElementById('mobile-nav'),
            mobileNavClose: document.querySelector('.mobile-nav-close'),
            avatarDropdown: document.getElementById('avatar-dropdown'),
            avatarBtn: document.querySelector('.avatar-btn'),
            dropdownMenu: document.querySelector('.dropdown-menu'),
            currentTime: document.getElementById('current-time'),
            toastContainer: document.getElementById('toast-container'),
            countdownTimer: document.getElementById('countdown-timer'),
            daysElement: document.getElementById('days'),
            hoursElement: document.getElementById('hours'),
            minutesElement: document.getElementById('minutes'),
            registrationBtns: document.querySelectorAll('.registration-btn'),
            directionBtn: document.querySelector('.direction-btn')
        };
    }

    setupEventListeners() {
        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            const dropdown = this.cachedElements.avatarDropdown;
            const avatarBtn = this.cachedElements.avatarBtn;
            
            if (dropdown && !dropdown.contains(event.target) && !avatarBtn?.contains(event.target)) {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                dropdownMenu?.classList.remove('show');
                avatarBtn?.classList.remove('active');
            }
        });

        // Use event delegation for buttons
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('registration-btn')) {
                this.handleRegistration(event);
            } else if (event.target.closest('.direction-btn')) {
                this.handleDirection(event);
            }
        });

        // Handle browser back/forward navigation
        window.addEventListener('popstate', (event) => {
            console.log('🔄 Browser navigation detected, re-checking visitor status...');
            this.checkVisitorRegistrationStatus();
        });

        // Update time display with throttling
        this.updateTime();
        let lastTimeUpdate = 0;
        const updateTimeThrottled = (timestamp) => {
            if (timestamp - lastTimeUpdate > 60000) {
                this.updateTime();
                lastTimeUpdate = timestamp;
            }
            requestAnimationFrame(updateTimeThrottled);
        };
        requestAnimationFrame(updateTimeThrottled);

        // Modal event listeners
        this.setupModalEventListeners();
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

    setupScrollListener() {
        window.addEventListener('scroll', this.handleHeaderScroll.bind(this));
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

    updateTime() {
        if (this.cachedElements.currentTime) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
            this.cachedElements.currentTime.textContent = timeString;
        }
    }

    startCountdown() {
        // Set event date (example: 7 days from now)
        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + 7);
        eventDate.setHours(11, 0, 0, 0); // 11:00 AM

        let lastUpdate = 0;
        const updateCountdown = (timestamp) => {
            // Throttle updates to every 60 seconds
            if (timestamp - lastUpdate < 60000) {
                requestAnimationFrame(updateCountdown);
                return;
            }
            
            lastUpdate = timestamp;
            const now = new Date().getTime();
            const distance = eventDate.getTime() - now;

            if (distance < 0) {
                // Event has passed
                this.cachedElements.daysElement.textContent = '00';
                this.cachedElements.hoursElement.textContent = '00';
                this.cachedElements.minutesElement.textContent = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // Batch DOM updates
            requestAnimationFrame(() => {
                this.cachedElements.daysElement.textContent = days.toString().padStart(2, '0');
                this.cachedElements.hoursElement.textContent = hours.toString().padStart(2, '0');
                this.cachedElements.minutesElement.textContent = minutes.toString().padStart(2, '0');
            });
        };

        // Update immediately
        updateCountdown(performance.now());
        
        // Start animation frame loop
        requestAnimationFrame(updateCountdown);
    }

    loadEventData() {
        const eventData = localStorage.getItem('currentEventData');
        
        if (eventData) {
            try {
                const event = JSON.parse(eventData);
                this.updateEventDisplay(event);
            } catch (error) {
                console.error('Error parsing event data:', error);
            }
        }
    }

    updateEventDisplay(event) {
        // Update page title
        document.title = `${event.title} - Quick Events`;
        
        // Update event name in hero section
        const eventNameElement = document.querySelector('.event-name');
        if (eventNameElement && event.title) {
            eventNameElement.textContent = event.title;
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

    handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');
        
        if (tab) {
            console.log('📋 URL tab parameter detected:', tab);
            
            // Handle different tab values
            if (tab.includes('Exhibitors')) {
                // Wait for page to be fully loaded
                setTimeout(() => {
                    showExhibitorsContent();
                }, 500);
            }
        }
    }

    showLoggedInState() {
        const avatarDropdown = this.cachedElements.avatarDropdown;
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
        
        const avatarDropdown = this.cachedElements.avatarDropdown;
        const desktopNav = document.querySelector('.desktop-nav');
        
        if (avatarDropdown) {
            avatarDropdown.style.display = 'none';
        }
        
        if (desktopNav) {
            desktopNav.style.display = 'flex';
        }
        
        console.log('✅ Logged out state applied');
    }

    handleRegistration(event) {
        const buttonText = event.target.textContent;
        
        // Show appropriate message for all registration types
        this.showToast(`${buttonText} registration will be available soon!`, 'info');
    }

    handleDirection(event) {
        // Simulate getting directions
        this.showToast('Opening directions in maps...', 'info');
        
        // In a real app, this would open Google Maps or similar
        setTimeout(() => {
            this.showToast('Directions opened successfully!', 'success');
        }, 1000);
    }

    setupModalEventListeners() {
        // Close modal when clicking outside
        document.addEventListener('click', (event) => {
            const modal = document.getElementById('visitorModal');
            if (event.target === modal) {
                closeVisitorModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeVisitorModal();
            }
        });

        // Real-time validation (only setup once)
        if (!this.formValidationSetup) {
            this.setupFormValidation();
            this.formValidationSetup = true;
        }
    }

    setupFormValidation() {
        const form = document.getElementById('visitorForm');
        if (!form) return;

        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                // Clear error when user starts typing
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorMessage = input.closest('.form-group').querySelector('.field-error');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        switch (fieldId) {
            case 'firstName':
            case 'lastName':
                if (!value) {
                    showFieldError(fieldId, `${fieldId === 'firstName' ? 'First' : 'Last'} name is required`);
                }
                break;
                
            case 'email':
                if (!value) {
                    showFieldError(fieldId, 'Email is required');
                } else {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        showFieldError(fieldId, 'Please enter a valid email address');
                    }
                }
                break;
                
            case 'mobile':
                if (!value) {
                    showFieldError(fieldId, 'Mobile number is required');
                } else {
                    const mobileRegex = /^[\d\s\-\+\(\)\.]{7,20}$/;
                    if (!mobileRegex.test(value)) {
                        showFieldError(fieldId, 'Please enter a valid mobile number (7-20 digits)');
                    }
                }
                break;
        }
    }

    showToast(message, type = 'info') {
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

        if (this.cachedElements.toastContainer) {
            this.cachedElements.toastContainer.appendChild(toast);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 5000);
        }
    }

    cleanup() {
        // Cleanup is handled by requestAnimationFrame automatically
        // No manual cleanup needed for optimized version
    }
}

// Global functions for HTML onclick handlers
function goBack() {
    localStorage.removeItem('currentEventData');
    window.location.href = 'event-discovery.html';
}





function toggleAvatarDropdown() {
    const dropdown = document.getElementById('avatar-dropdown');
    const dropdownMenu = dropdown?.querySelector('.dropdown-menu');
    const avatarBtn = dropdown?.querySelector('.avatar-btn');
    dropdownMenu?.classList.toggle('show');
    avatarBtn?.classList.toggle('active');
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileNav?.classList.toggle('active');
    mobileMenuBtn?.classList.toggle('active');
    const isExpanded = mobileNav?.classList.contains('active');
    mobileMenuBtn?.setAttribute('aria-expanded', isExpanded);
}



function showRegistrationModal() {
    // Get the clicked button text more reliably
    const buttonText = event?.target?.textContent || 'Unknown';
    
    if (buttonText.toLowerCase().includes('visitor')) {
        showVisitorModal();
    } else {
        if (window.eventDetailPage) {
            window.eventDetailPage.showToast(`${buttonText} registration will be available soon!`, 'info');
        }
    }
}





function showMyTicket() {
    const visitorData = localStorage.getItem('visitorData');
    if (visitorData) {
        try {
            const visitor = JSON.parse(visitorData);
            const ticketId = new URLSearchParams(window.location.search).get('ticket') || Date.now();
            
            const ticketInfo = `
🎫 **My Event Ticket**
            
👤 **Name:** ${visitor.firstName} ${visitor.lastName}
📧 **Email:** ${visitor.email}
📱 **Mobile:** ${visitor.mobile}
🎫 **Ticket ID:** ${ticketId}
📅 **Event:** PharmaTech & LabTech Expo 2025
📍 **Venue:** India Expo Mart, Greater Noida
⏰ **Date:** 05 - 07 Aug 2025
            
✅ **Status:** Confirmed
🎯 **Type:** Visitor Pass
            `;
            
            if (window.eventDetailPage) {
                window.eventDetailPage.showToast('Ticket details loaded!', 'success');
                // In a real app, this would open a ticket modal or page
                console.log('Ticket Info:', ticketInfo);
            }
        } catch (error) {
            console.error('Error loading ticket:', error);
            if (window.eventDetailPage) {
                window.eventDetailPage.showToast('Error loading ticket details', 'error');
            }
        }
    } else {
        if (window.eventDetailPage) {
            window.eventDetailPage.showToast('No ticket found. Please register first.', 'error');
        }
    }
}

function showEventInfo() {
    // Get visitor data from localStorage
    const visitorData = localStorage.getItem('visitorData');
    let visitorInfo = {};
    
    if (visitorData) {
        try {
            visitorInfo = JSON.parse(visitorData);
        } catch (error) {
            console.error('Error parsing visitor data:', error);
        }
    }
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('ticket') || 'N/A';
    
    // Create modal content
    const modalContent = `
        <div class="modal-overlay" id="eventInfoModal" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 1000; align-items: center; justify-content: center;">
            <div class="modal-content" style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); border: 2px solid #00ff88; border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #333;">
                    <h2 style="color: #00ff88; font-size: 1.5rem; font-weight: 600;">Event Information</h2>
                    <button onclick="closeEventInfoModal()" style="background: none; border: none; color: #666; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">×</button>
                </div>
                <div style="color: white; line-height: 1.6;">
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="color: #00ff88; margin-bottom: 0.5rem;">Event Details</h3>
                        <p><strong>Event:</strong> PharmaTech & LabTech Expo 2025</p>
                        <p><strong>Date:</strong> August 5-7, 2025</p>
                        <p><strong>Venue:</strong> HEC Exhibition Centre, Gandhinagar, India</p>
                        <p><strong>Time:</strong> 9:00 AM - 6:00 PM (Daily)</p>
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="color: #00ff88; margin-bottom: 0.5rem;">Registration Info</h3>
                        <p><strong>Name:</strong> ${visitorInfo.firstName || 'N/A'} ${visitorInfo.lastName || 'N/A'}</p>
                        <p><strong>Email:</strong> ${visitorInfo.email || 'N/A'}</p>
                        <p><strong>Mobile:</strong> ${visitorInfo.mobile || 'N/A'}</p>
                        <p><strong>Ticket ID:</strong> ${ticketId}</p>
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="color: #00ff88; margin-bottom: 0.5rem;">What to Expect</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;">🎯 500+ Exhibitors showcasing latest innovations</li>
                            <li style="margin-bottom: 0.5rem;">🎤 50+ Industry expert speakers</li>
                            <li style="margin-bottom: 0.5rem;">🤝 Networking opportunities</li>
                            <li style="margin-bottom: 0.5rem;">📊 Live demonstrations and workshops</li>
                            <li style="margin-bottom: 0.5rem;">🎁 Exclusive product launches</li>
                        </ul>
                    </div>
                    <div style="background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); border-radius: 8px; padding: 1rem; margin-top: 1.5rem;">
                        <p style="color: #00ff88; font-weight: 600; margin-bottom: 0.5rem;">📱 Don't forget to bring:</p>
                        <ul style="list-style: none; padding: 0; color: #ccc;">
                            <li>• Your mobile device for QR scanning</li>
                            <li>• Business cards for networking</li>
                            <li>• Comfortable walking shoes</li>
                            <li>• Notebook for taking notes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    // Add close functionality
    window.closeEventInfoModal = function() {
        const modal = document.getElementById('eventInfoModal');
        if (modal) {
            modal.remove();
        }
    };
    
    // Close on outside click
    document.getElementById('eventInfoModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeEventInfoModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEventInfoModal();
        }
    });
}

function showScanLead() {
    // Create modal content for scan lead functionality
    const modalContent = `
        <div class="modal-overlay" id="scanLeadModal" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 1000; align-items: center; justify-content: center;">
            <div class="modal-content" style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); border: 2px solid #00ff88; border-radius: 16px; padding: 2rem; max-width: 400px; width: 90%; text-align: center; position: relative;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #333;">
                    <h2 style="color: #00ff88; font-size: 1.5rem; font-weight: 600;">Scan Lead QR Code</h2>
                    <button onclick="closeScanLeadModal()" style="background: none; border: none; color: #666; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">×</button>
                </div>
                <div style="color: white; line-height: 1.6;">
                    <div style="margin-bottom: 2rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📱</div>
                        <h3 style="color: #00ff88; margin-bottom: 1rem;">QR Code Scanner</h3>
                        <p style="margin-bottom: 1.5rem;">Point your camera at any exhibitor's QR code to capture their contact information and add them to your leads.</p>
                    </div>
                    <div style="background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
                        <p style="color: #00ff88; font-weight: 600; margin-bottom: 0.5rem;">How it works:</p>
                        <ul style="list-style: none; padding: 0; color: #ccc; text-align: left;">
                            <li style="margin-bottom: 0.5rem;">1. Find QR codes at exhibitor booths</li>
                            <li style="margin-bottom: 0.5rem;">2. Point your camera at the QR code</li>
                            <li style="margin-bottom: 0.5rem;">3. Automatically capture contact details</li>
                            <li style="margin-bottom: 0.5rem;">4. Add to your leads collection</li>
                        </ul>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="startQRScan()" style="background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a1a; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">Start Scanning</button>
                        <button onclick="viewMyLeads()" style="background: rgba(255, 255, 255, 0.1); color: #00ff88; border: 1px solid #00ff88; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">View My Leads</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    // Add close functionality
    window.closeScanLeadModal = function() {
        const modal = document.getElementById('scanLeadModal');
        if (modal) {
            modal.remove();
        }
    };
    
    // Add scan functionality
    window.startQRScan = function() {
        if (window.eventDetailPage) {
            window.eventDetailPage.showToast('QR Scanner would open here. This feature will be available at the event!', 'info');
        }
        closeScanLeadModal();
    };
    
    window.viewMyLeads = function() {
        if (window.eventDetailPage) {
            window.eventDetailPage.showToast('Your leads collection will be available here after scanning QR codes!', 'info');
        }
        closeScanLeadModal();
    };
    
    // Close on outside click
    document.getElementById('scanLeadModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeScanLeadModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeScanLeadModal();
        }
    });
}

function showSignInModal() {
    if (window.eventDetailPage) {
        window.eventDetailPage.showToast('Sign In modal would open here', 'info');
    }
}

function editProfile() {
    if (window.eventDetailPage) {
        window.eventDetailPage.showToast('Edit Profile would open here', 'info');
    }
}

function viewSettings() {
    if (window.eventDetailPage) {
        window.eventDetailPage.showToast('Settings would open here', 'info');
    }
}

function viewHelp() {
    if (window.eventDetailPage) {
        window.eventDetailPage.showToast('Help & Support would open here', 'info');
    }
}

function logout() {
    if (window.eventDetailPage) {
        window.eventDetailPage.showToast('Logging out...', 'success');
        setTimeout(() => {
            window.eventDetailPage.showLoggedOutState();
        }, 1000);
    }
}

// Share Event Function
function shareEvent() {
    const eventData = {
        title: 'PharmaTech & LabTech Expo 2025',
        description: 'A unique opportunity for pharmaceutical and lab technology professionals',
        url: window.location.href,
        date: '05 - 07 Aug 2025',
        location: 'HEC Exhibition Centre, Gandhinagar, India'
    };

    if (navigator.share) {
        // Use native sharing if available
        navigator.share({
            title: eventData.title,
            text: `${eventData.description}\n\nDate: ${eventData.date}\nLocation: ${eventData.location}`,
            url: eventData.url
        }).then(() => {
            if (window.eventDetailPage) {
                window.eventDetailPage.showToast('Event shared successfully!', 'success');
            }
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare(eventData);
        });
    } else {
        // Fallback for browsers without native sharing
        fallbackShare(eventData);
    }
}

// Fallback sharing method
function fallbackShare(eventData) {
    const shareText = `${eventData.title}\n\n${eventData.description}\n\nDate: ${eventData.date}\nLocation: ${eventData.location}\n\n${eventData.url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            if (window.eventDetailPage) {
                window.eventDetailPage.showToast('Event link copied to clipboard!', 'success');
            }
        }).catch(() => {
            // Final fallback - create temporary textarea
            const textarea = document.createElement('textarea');
            textarea.value = shareText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            if (window.eventDetailPage) {
                window.eventDetailPage.showToast('Event link copied to clipboard!', 'success');
            }
        });
    }
}

// Save Event Function
function saveEvent() {
    const eventData = {
        id: 'pharmatech-2025',
        title: 'PharmaTech & LabTech Expo 2025',
        description: 'A unique opportunity for pharmaceutical and lab technology professionals',
        date: '05 - 07 Aug 2025',
        location: 'HEC Exhibition Centre, Gandhinagar, India',
        savedAt: new Date().toISOString()
    };

    try {
        // Get existing saved events
        const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
        
        // Check if event is already saved
        const existingIndex = savedEvents.findIndex(event => event.id === eventData.id);
        
        if (existingIndex !== -1) {
            // Remove from saved events
            savedEvents.splice(existingIndex, 1);
            localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
            if (window.eventDetailPage) {
                window.eventDetailPage.showToast('Event removed from saved events', 'info');
            }
            
            // Update button appearance
            updateSaveButtonState(false);
        } else {
            // Add to saved events
            savedEvents.push(eventData);
            localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
            if (window.eventDetailPage) {
                window.eventDetailPage.showToast('Event saved successfully!', 'success');
            }
            
            // Update button appearance
            updateSaveButtonState(true);
        }
    } catch (error) {
        console.error('Error saving event:', error);
        if (window.eventDetailPage) {
            window.eventDetailPage.showToast('Error saving event', 'error');
        }
    }
}

// Update save button state
function updateSaveButtonState(isSaved) {
    const saveButtons = document.querySelectorAll('.save-btn, .save-btn-inline');
    saveButtons.forEach(btn => {
        const svg = btn.querySelector('svg');
        if (isSaved) {
            btn.classList.add('saved');
            svg.style.fill = '#ff6b6b';
        } else {
            btn.classList.remove('saved');
            svg.style.fill = 'none';
        }
    });
}

// Check if event is saved on page load
function checkSavedState() {
    try {
        const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
        const eventId = 'pharmatech-2025';
        const isSaved = savedEvents.some(event => event.id === eventId);
        updateSaveButtonState(isSaved);
    } catch (error) {
        console.error('Error checking saved state:', error);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing EventDetailPage...');
    window.eventDetailPage = new EventDetailPage();
    
    // Ensure navigateToExhibitors is immediately available
    if (typeof window.navigateToExhibitors !== 'function') {
        console.error('❌ navigateToExhibitors function not found during initialization!');
    } else {
        console.log('✅ navigateToExhibitors function is available');
    }
    
    checkSavedState();
    initializeTabFromURL();
    
    // Force check visitor status after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (window.eventDetailPage) {
            console.log('🔄 Re-checking visitor status after delay...');
            window.eventDetailPage.checkVisitorRegistrationStatus();
        }
    }, 100);
});

// Global test function - can be called from browser console
function testButtonReplacementNow() {
    console.log('🧪 Testing button replacement NOW...');
    
    // Simulate visitor registration
    const testVisitorData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        mobile: '1234567890'
    };
    
    localStorage.setItem('visitorData', JSON.stringify(testVisitorData));
    console.log('✅ Test data stored in localStorage');
    
    // Immediately show the replacement
    if (window.eventDetailPage) {
        window.eventDetailPage.showVisitorRegisteredState();
        console.log('✅ Button replacement executed');
    } else {
        console.error('❌ EventDetailPage not found!');
    }
}

// Manual test function for button replacement
function testButtonReplacement() {
    console.log('🧪 Testing button replacement...');
    
    // Simulate visitor registration
    const testVisitorData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        mobile: '1234567890'
    };
    
    localStorage.setItem('visitorData', JSON.stringify(testVisitorData));
    
    if (window.eventDetailPage) {
        window.eventDetailPage.showVisitorRegisteredState();
    } else {
        console.error('❌ EventDetailPage not found!');
    }
}

// Manual reset function
function resetButtonState() {
    console.log('🔄 Resetting button state...');
    
    localStorage.removeItem('visitorData');
    
    const registrationButtons = document.getElementById('registrationButtons');
    const ticketButtons = document.getElementById('ticketButtons');
    const ticketStatusBanner = document.getElementById('ticketStatusBanner');
    const registrationLabel = document.getElementById('registrationLabel');
    
    if (registrationButtons) registrationButtons.style.display = 'flex';
    if (ticketButtons) ticketButtons.style.display = 'none';
    if (ticketStatusBanner) ticketStatusBanner.style.display = 'none';
    if (registrationLabel) registrationLabel.textContent = 'Register & Apply';
    
    console.log('✅ Button state reset complete');
}

// Tab Navigation Functions
function switchTab(tabName) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update URL without page reload
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('tab', tabName);
    window.history.pushState({ tab: tabName }, '', currentUrl);
    
    // Handle tab content (you can add content switching logic here)
    handleTabContent(tabName);
}

function handleTabContent(tabName) {
    // You can add content switching logic here
    // For now, we'll just show a toast message
    const tabLabels = {
        'about': 'About',
        'exhibitors': 'Exhibitors',
        'speakers': 'Speakers',
        'reviews': 'Reviews'
    };
    
    const label = tabLabels[tabName] || tabName;
    showToast(`Switched to ${label} tab`, 'info');
}

// Initialize tab from URL on page load
function initializeTabFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab') || 'about';
    switchTab(activeTab);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.eventDetailPage) {
        window.eventDetailPage.cleanup();
    }
});

// Add toast styles
const toastStyles = `
<style>
.toast {
    background: var(--bg-secondary);
    border: 1px solid var(--bg-tertiary);
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    animation: slideIn 0.3s ease;
    max-width: 300px;
}

.toast-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.toast-message {
    color: var(--text-primary);
    font-size: 0.875rem;
    flex: 1;
}

.toast-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.toast-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
}

.toast-info {
    border-left: 4px solid var(--brand-green);
}

.toast-success {
    border-left: 4px solid #00ff88;
}

.toast-error {
    border-left: 4px solid #ff4757;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', toastStyles);

function toggleEventInfo() {
    console.log('📋 Toggling event information...');
    
    const eventInfoBtn = document.getElementById('eventInfoBtn');
    const eventInfoContainer = document.getElementById('eventInfoContainer');
    
    console.log('Event Info Button:', eventInfoBtn);
    console.log('Event Info Container:', eventInfoContainer);
    
    if (!eventInfoBtn || !eventInfoContainer) {
        console.error('Event info elements not found');
        alert('Event info elements not found! Check console for details.');
        return;
    }
    
    const isVisible = eventInfoContainer.style.display !== 'none';
    console.log('Is visible:', isVisible);
    
    if (isVisible) {
        // Hide the content
        eventInfoContainer.style.display = 'none';
        eventInfoBtn.classList.remove('active');
        showToast('Event information hidden', 'info');
        console.log('Event info hidden');
    } else {
        // Show the content
        eventInfoContainer.style.display = 'block';
        eventInfoBtn.classList.add('active');
        showToast('Event information displayed', 'info');
        console.log('Event info shown');
        
        // Smooth scroll to the content
        setTimeout(() => {
            eventInfoContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }
}

function deleteResource(resourceId) {
    console.log('🗑️ Deleting resource:', resourceId);
    
    // Find the resource card element
    const resourceCard = document.querySelector(`[onclick="deleteResource('${resourceId}')"]`).closest('.resource-card');
    
    if (resourceCard) {
        // Add fade out animation
        resourceCard.style.transition = 'all 0.3s ease';
        resourceCard.style.opacity = '0';
        resourceCard.style.transform = 'translateX(-100px)';
        
        // Remove the element after animation
        setTimeout(() => {
            resourceCard.remove();
            showToast('Resource deleted successfully', 'success');
        }, 300);
    } else {
        showToast('Resource not found', 'error');
    }
}

function scrollFeed(direction) {
    const carousel = document.querySelector('.feed-carousel');
    const scrollAmount = 400; // Width of one feed item + gap
    
    if (carousel) {
        if (direction === 'next') {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        } else {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
        
        // Update navigation buttons state
        updateFeedNavigation();
    }
}

function updateFeedNavigation() {
    const carousel = document.querySelector('.feed-carousel');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    
    if (carousel && prevBtn && nextBtn) {
        const isAtStart = carousel.scrollLeft === 0;
        const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
        
        prevBtn.disabled = isAtStart;
        nextBtn.disabled = isAtEnd;
    }
}

// Make function globally accessible
window.navigateToExhibitors = function() {
    console.log('🏢 Navigating to Exhibitors page...');
    
    // Validate function call
    if (typeof window.navigateToExhibitors !== 'function') {
        console.error('❌ navigateToExhibitors is not a function!');
        return;
    }
    
    try {
        // Show loading toast using the correct scope
        if (window.eventDetailPage && typeof window.eventDetailPage.showToast === 'function') {
            window.eventDetailPage.showToast('Loading Exhibitors...', 'info');
        } else {
            console.log('Toast system not available, proceeding with navigation...');
        }
        
        // Navigate to the dedicated exhibitors page
        const targetUrl = 'http://localhost:9008/exhibitors.html';
        
        console.log('Current URL:', window.location.href);
        console.log('Navigating to:', targetUrl);
        
        // Validate target URL
        if (!targetUrl || typeof targetUrl !== 'string') {
            throw new Error('Invalid target URL');
        }
        
        // Navigate to the exhibitors page
        window.location.href = targetUrl;
        
    } catch (error) {
        console.error('❌ Error in navigateToExhibitors:', error);
        if (window.eventDetailPage && typeof window.eventDetailPage.showToast === 'function') {
            window.eventDetailPage.showToast('Navigation error occurred', 'error');
        } else {
            alert(`Navigation Error: ${error.message}`);
        }
    }
};

// Also keep the regular function for compatibility
function navigateToExhibitors() {
    window.navigateToExhibitors();
}

// Networking navigation function
function navigateToNetworking() {
    console.log('Navigating to networking page...');
    if (window.eventDetailPage && typeof window.eventDetailPage.showToast === 'function') {
        window.eventDetailPage.showToast('Navigating to networking...', 'info');
    }
    window.location.href = 'http://localhost:9008/networking.html';
}

// Global toast fallback function
function showToast(message, type = 'info') {
    if (window.eventDetailPage && typeof window.eventDetailPage.showToast === 'function') {
        window.eventDetailPage.showToast(message, type);
    } else {
        // Fallback: simple alert
        console.log(`[${type.toUpperCase()}] ${message}`);
        if (type === 'error') {
            alert(`Error: ${message}`);
        }
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
    
    if (window.eventDetailPage) {
        window.eventDetailPage.showLoggedInState();
        window.eventDetailPage.showToast('Test login successful!', 'success');
    }
}

// Test function to simulate logout
function testLogout() {
    localStorage.removeItem('userData');
    
    if (window.eventDetailPage) {
        window.eventDetailPage.showLoggedOutState();
        window.eventDetailPage.showToast('Test logout successful!', 'info');
    }
}



// Function to handle URL parameters on page load
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    
    if (tab) {
        console.log('📋 URL tab parameter detected:', tab);
        
        // Handle different tab values if needed in the future
        // Currently no specific tab handling required
    }
}








