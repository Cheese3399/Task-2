// Edit Profile JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the edit profile page
    initializeEditProfile();
    
    // Check user state and update header
    checkUserState();
});

// Initialize edit profile functionality
function initializeEditProfile() {
    console.log('Initializing edit profile page...');
    
    // Check user state first
    checkUserState();
    
    // Setup form interactions
    setupFormInteractions();
    
    // Setup navigation tabs
    setupNavigationTabs();
    
    // Setup profile tags
    setupProfileTags();
    
    // Setup header functionality
    setupHeaderFunctionality();
    
    console.log('Edit profile page initialized successfully');
}

// Load user profile data
function loadUserProfile() {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            console.log('Loading user profile data:', userData);
            
            // Update profile card
            updateProfileCard(userData);
            
            // Load form data
            loadFormData(userData);
        } else {
            console.log('No user data found, using defaults');
            // Set default values
            setDefaultProfile();
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
        setDefaultProfile();
    }
}

// Update profile card with user data
function updateProfileCard(userData) {
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    
    if (profileName && userData.name) {
        profileName.textContent = userData.name;
    }
    
    if (profileEmail && userData.email) {
        profileEmail.textContent = userData.email;
    }
    
    // Update profile photo if exists
    if (userData.profilePhoto) {
        const placeholder = document.getElementById('profile-avatar');
        const avatarImg = document.getElementById('profile-avatar-img');
        
        if (placeholder && avatarImg) {
            placeholder.style.display = 'none';
            avatarImg.src = userData.profilePhoto;
            avatarImg.style.display = 'block';
        }
    }
    
    // Update profile tags based on opportunities
    if (userData.opportunities) {
        updateProfileTags(userData.opportunities);
    }
}

// Load form data from user data
function loadFormData(userData) {
    // About me
    const aboutMe = document.getElementById('about-me');
    if (aboutMe && userData.about) {
        aboutMe.value = userData.about;
        updateSelectedValues('about', userData.about);
    }
    
    // Opportunities
    if (userData.opportunities) {
        updateOpportunitiesCheckboxes(userData.opportunities);
        updateSelectedValues('opportunities', userData.opportunities.join(', '));
    }
    
    // Sector
    const sectorSelect = document.getElementById('sector-select');
    if (sectorSelect && userData.sector) {
        sectorSelect.value = userData.sector;
        updateSelectedValues('sector', userData.sector);
    }
    
    // Industries
    const industriesSelect = document.getElementById('industries-select');
    if (industriesSelect && userData.industries) {
        industriesSelect.value = userData.industries;
        updateSelectedValues('industries', userData.industries);
    }
    
    // Topics
    const topicsInput = document.getElementById('topics-input');
    if (topicsInput && userData.topics) {
        topicsInput.value = userData.topics;
        updateSelectedValues('topics', userData.topics);
    }
    
    // Location
    const locationInput = document.getElementById('location-input');
    if (locationInput && userData.location) {
        locationInput.value = userData.location;
        updateSelectedValues('location', userData.location);
    }
    
    // Company
    const companyInput = document.getElementById('company-input');
    if (companyInput && userData.company) {
        companyInput.value = userData.company;
        updateSelectedValues('company', userData.company);
    }
    
    // Designation
    const designationInput = document.getElementById('designation-input');
    if (designationInput && userData.designation) {
        designationInput.value = userData.designation;
        updateSelectedValues('designation', userData.designation);
    }
}

// Set default profile values
function setDefaultProfile() {
    const defaultData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        opportunities: ['attend', 'sponsor', 'host'],
        sector: 'telecommunication',
        industries: 'telecommunication'
    };
    
    updateProfileCard(defaultData);
    loadFormData(defaultData);
}

// Setup form interactions
function setupFormInteractions() {
    // Setup section expansion
    setupSectionExpansion();
    
    // Setup input change handlers
    setupInputHandlers();
    
    // Setup checkbox handlers
    setupCheckboxHandlers();
}

// Setup section expansion functionality
function setupSectionExpansion() {
    const sections = document.querySelectorAll('.form-section');
    
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        const content = section.querySelector('.section-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                const isExpanded = section.classList.contains('expanded');
                
                // Close all sections
                sections.forEach(s => s.classList.remove('expanded'));
                
                // Open clicked section if it wasn't expanded
                if (!isExpanded) {
                    section.classList.add('expanded');
                }
            });
        }
    });
}

// Setup input change handlers
function setupInputHandlers() {
    // About me
    const aboutMe = document.getElementById('about-me');
    if (aboutMe) {
        aboutMe.addEventListener('input', (e) => {
            updateSelectedValues('about', e.target.value || 'Add about me');
        });
    }
    
    // Sector select
    const sectorSelect = document.getElementById('sector-select');
    if (sectorSelect) {
        sectorSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            updateSelectedValues('sector', selectedOption.text || 'Select sector');
        });
    }
    
    // Industries select
    const industriesSelect = document.getElementById('industries-select');
    if (industriesSelect) {
        industriesSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            updateSelectedValues('industries', selectedOption.text || 'Select industries');
        });
    }
    
    // Topics input
    const topicsInput = document.getElementById('topics-input');
    if (topicsInput) {
        topicsInput.addEventListener('input', (e) => {
            updateSelectedValues('topics', e.target.value || 'Add topics and products');
        });
    }
    
    // Location input
    const locationInput = document.getElementById('location-input');
    if (locationInput) {
        locationInput.addEventListener('input', (e) => {
            updateSelectedValues('location', e.target.value || 'Add your location');
        });
    }
    
    // Company input
    const companyInput = document.getElementById('company-input');
    if (companyInput) {
        companyInput.addEventListener('input', (e) => {
            updateSelectedValues('company', e.target.value || 'Add your company');
        });
    }
    
    // Designation input
    const designationInput = document.getElementById('designation-input');
    if (designationInput) {
        designationInput.addEventListener('input', (e) => {
            updateSelectedValues('designation', e.target.value || 'Add your designation');
        });
    }
}

// Setup checkbox handlers for opportunities
function setupCheckboxHandlers() {
    const checkboxes = document.querySelectorAll('.option-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateOpportunitiesDisplay();
        });
    });
}

// Update opportunities display
function updateOpportunitiesDisplay() {
    const checkboxes = document.querySelectorAll('.option-item input[type="checkbox"]');
    const selectedOpportunities = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOpportunities.push(checkbox.value);
        }
    });
    
    const displayText = selectedOpportunities.length > 0 
        ? selectedOpportunities.map(opp => opp.charAt(0).toUpperCase() + opp.slice(1)).join(', ')
        : 'Select opportunities';
    
    updateSelectedValues('opportunities', displayText);
    updateProfileTags(selectedOpportunities);
}

// Update profile tags
function updateProfileTags(opportunities) {
    const tags = document.querySelectorAll('.profile-tags .tag');
    
    tags.forEach(tag => {
        const role = tag.getAttribute('data-role');
        if (opportunities.includes(role)) {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
    });
}

// Update selected values display
function updateSelectedValues(field, value) {
    const valuesElement = document.getElementById(`${field}-values`);
    if (valuesElement) {
        valuesElement.textContent = value;
    }
}

// Update opportunities checkboxes
function updateOpportunitiesCheckboxes(opportunities) {
    const checkboxes = document.querySelectorAll('.option-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = opportunities.includes(checkbox.value);
    });
}

// Setup navigation tabs
function setupNavigationTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Handle tab navigation
            handleTabNavigation(targetTab);
        });
    });
}

// Handle tab navigation
function handleTabNavigation(tab) {
    console.log('Navigating to tab:', tab);
    
    switch(tab) {
        case 'profile':
            // Navigate to profile view (could be a separate page)
            window.location.href = 'profile.html';
            break;
        case 'edit':
            // Already on edit page
            break;
        case 'settings':
            // Navigate to settings page
            window.location.href = 'settings.html';
            break;
    }
}

// Setup profile tags interaction
function setupProfileTags() {
    const tags = document.querySelectorAll('.profile-tags .tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const role = tag.getAttribute('data-role');
            const isActive = tag.classList.contains('active');
            
            // Toggle active state
            if (isActive) {
                tag.classList.remove('active');
            } else {
                tag.classList.add('active');
            }
            
            // Update opportunities checkboxes
            updateOpportunitiesFromTags();
        });
    });
}

// Update opportunities from profile tags
function updateOpportunitiesFromTags() {
    const tags = document.querySelectorAll('.profile-tags .tag');
    const selectedOpportunities = [];
    
    tags.forEach(tag => {
        if (tag.classList.contains('active')) {
            selectedOpportunities.push(tag.getAttribute('data-role'));
        }
    });
    
    // Update checkboxes
    const checkboxes = document.querySelectorAll('.option-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectedOpportunities.includes(checkbox.value);
    });
    
    // Update display
    updateOpportunitiesDisplay();
}

// Handle avatar upload with enhanced UI/UX
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    console.log('Avatar upload:', file.name);
    
    // Enhanced file validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
        showToast('Please select a valid image file (JPG, PNG, WebP)', 'error');
        return;
    }
    
    if (file.size > maxSize) {
        showToast('File size must be less than 5MB', 'error');
        return;
    }
    
    // Add loading state
    const avatarContainer = document.querySelector('.profile-avatar');
    avatarContainer.classList.add('avatar-uploading');
    
    try {
        const reader = new FileReader();
        reader.onload = function(e) {
            const placeholder = document.getElementById('profile-avatar');
            const avatarImg = document.getElementById('profile-avatar-img');
            
            // Hide placeholder and show image
            placeholder.style.display = 'none';
            avatarImg.src = e.target.result;
            avatarImg.style.display = 'block';
            
            // Save profile photo to localStorage
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            userData.profilePhoto = e.target.result;
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Also update the main avatar in header if it exists
            const headerAvatar = document.querySelector('.avatar img');
            if (headerAvatar) {
                headerAvatar.src = e.target.result;
            }
            
            // Remove loading state and add success animation
            avatarContainer.classList.remove('avatar-uploading');
            avatarContainer.classList.add('avatar-success');
            
            // Remove success class after animation
            setTimeout(() => {
                avatarContainer.classList.remove('avatar-success');
            }, 500);
            
            showToast('Profile photo updated successfully!', 'success');
        };
        
        reader.onerror = function() {
            avatarContainer.classList.remove('avatar-uploading');
            avatarContainer.classList.add('avatar-error');
            showToast('Failed to upload image. Please try again.', 'error');
            
            setTimeout(() => {
                avatarContainer.classList.remove('avatar-error');
            }, 500);
        };
        
        reader.readAsDataURL(file);
        
    } catch (error) {
        console.error('Upload error:', error);
        avatarContainer.classList.remove('avatar-uploading');
        avatarContainer.classList.add('avatar-error');
        showToast('Upload failed. Please try again.', 'error');
        
        setTimeout(() => {
            avatarContainer.classList.remove('avatar-error');
        }, 500);
    }
}

// Save profile function
function saveProfile() {
    console.log('Saving profile...');
    
    const saveBtn = document.querySelector('.form-actions .btn');
    saveBtn.classList.add('loading');
    
    // Collect form data
    const profileData = collectFormData();
    
    // Simulate API call
    setTimeout(() => {
        try {
            // Save to localStorage
            const existingData = JSON.parse(localStorage.getItem('userData') || '{}');
            const updatedData = { ...existingData, ...profileData };
            localStorage.setItem('userData', JSON.stringify(updatedData));
            
            console.log('Profile saved successfully:', updatedData);
            showToast('Profile updated successfully!', 'success');
            
            // Remove loading state
            saveBtn.classList.remove('loading');
            
        } catch (error) {
            console.error('Error saving profile:', error);
            showToast('Error saving profile. Please try again.', 'error');
            saveBtn.classList.remove('loading');
        }
    }, 1500);
}

// Collect form data
function collectFormData() {
    const data = {};
    
    // About me
    const aboutMe = document.getElementById('about-me');
    if (aboutMe) {
        data.about = aboutMe.value;
    }
    
    // Opportunities
    const checkboxes = document.querySelectorAll('.option-item input[type="checkbox"]');
    const opportunities = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            opportunities.push(checkbox.value);
        }
    });
    data.opportunities = opportunities;
    
    // Sector
    const sectorSelect = document.getElementById('sector-select');
    if (sectorSelect) {
        data.sector = sectorSelect.value;
    }
    
    // Industries
    const industriesSelect = document.getElementById('industries-select');
    if (industriesSelect) {
        data.industries = industriesSelect.value;
    }
    
    // Topics
    const topicsInput = document.getElementById('topics-input');
    if (topicsInput) {
        data.topics = topicsInput.value;
    }
    
    // Location
    const locationInput = document.getElementById('location-input');
    if (locationInput) {
        data.location = locationInput.value;
    }
    
    // Company
    const companyInput = document.getElementById('company-input');
    if (companyInput) {
        data.company = companyInput.value;
    }
    
    // Designation
    const designationInput = document.getElementById('designation-input');
    if (designationInput) {
        data.designation = designationInput.value;
    }
    
    return data;
}

// Check user state and update header
function checkUserState() {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.name) {
            console.log('User is signed in:', userData.name);
            updateHeaderForUser(userData.name);
        } else {
            console.log('No user data found');
            // Redirect to login if not signed in
            // window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error checking user state:', error);
    }
}

// Update header for user
function updateHeaderForUser(userName) {
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
        const avatarImage = avatarDropdown.querySelector('.avatar-image .avatar-initial');
        
        if (userNameElement) userNameElement.textContent = sanitizeForDisplay(userName);
        if (userEmailElement) userEmailElement.textContent = 'user@email.com';
        
        // Check if user has uploaded a profile photo
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const hasProfilePhoto = userData.profilePhoto;
        
        if (hasProfilePhoto) {
            // Show uploaded photo
            if (avatarInitial) {
                avatarInitial.style.display = 'none';
                const img = avatarInitial.parentElement.querySelector('img');
                if (img) {
                    img.src = hasProfilePhoto;
                    img.style.display = 'block';
                }
            }
            if (avatarImage) {
                avatarImage.style.display = 'none';
                const img = avatarImage.parentElement.querySelector('img');
                if (img) {
                    img.src = hasProfilePhoto;
                    img.style.display = 'block';
                }
            }
        } else {
            // Show placeholder with user initial
            if (avatarInitial) {
                avatarInitial.textContent = userName.charAt(0).toUpperCase();
                avatarInitial.style.display = 'flex';
            }
            if (avatarImage) {
                avatarImage.textContent = userName.charAt(0).toUpperCase();
                avatarImage.style.display = 'flex';
            }
        }
        
        console.log('Avatar dropdown updated for user:', userName);
    }
}

// Toast notification function
function showToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#333'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after duration
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Setup header functionality
function setupHeaderFunctionality() {
    // Update time display
    updateTimeDisplay();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup avatar dropdown
    setupAvatarDropdown();
}

// Update time display
function updateTimeDisplay() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
            timeElement.textContent = timeString;
        };
        
        updateTime();
        setInterval(updateTime, 60000); // Update every minute
    }
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            toggleMobileMenu();
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav) {
        const isOpen = mobileNav.classList.contains('show');
        
        if (isOpen) {
            mobileNav.classList.remove('show');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        } else {
            mobileNav.classList.add('show');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        }
    }
}

// Setup avatar dropdown
function setupAvatarDropdown() {
    console.log('🎯 Setting up avatar dropdown...');
    const avatarBtn = document.querySelector('.avatar-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    console.log('Avatar button found:', avatarBtn);
    console.log('Dropdown menu found:', dropdownMenu);
    
    if (avatarBtn && dropdownMenu) {
        // Remove any existing listeners
        avatarBtn.removeEventListener('click', handleAvatarClick);
        
        // Add new click listener
        avatarBtn.addEventListener('click', handleAvatarClick);
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!avatarBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                closeAvatarDropdown();
            }
        });
        
        console.log('✅ Avatar dropdown setup complete');
    } else {
        console.error('❌ Avatar button or dropdown menu not found');
    }
}

// Handle avatar click
function handleAvatarClick(e) {
    e.stopPropagation();
    console.log('🎯 Avatar clicked!');
    toggleAvatarDropdown();
}

// Toggle avatar dropdown - Make globally accessible
window.toggleAvatarDropdown = function() {
    console.log('🎯 Toggle avatar dropdown called');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const avatarBtn = document.querySelector('.avatar-btn');
    
    console.log('Dropdown menu:', dropdownMenu);
    console.log('Avatar button:', avatarBtn);
    
    if (dropdownMenu && avatarBtn) {
        const isOpen = dropdownMenu.classList.contains('show');
        console.log('Is dropdown open:', isOpen);
        
        if (isOpen) {
            closeAvatarDropdown();
        } else {
            openAvatarDropdown();
        }
    } else {
        console.error('❌ Dropdown menu or avatar button not found');
    }
}

// Open avatar dropdown - Clean production version
window.openAvatarDropdown = function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const avatarBtn = document.querySelector('.avatar-btn');
    
    if (dropdownMenu && avatarBtn) {
        dropdownMenu.classList.add('show');
        avatarBtn.setAttribute('aria-expanded', 'true');
        avatarBtn.classList.add('active');
    }
}

// Close avatar dropdown - Clean production version
window.closeAvatarDropdown = function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const avatarBtn = document.querySelector('.avatar-btn');
    
    if (dropdownMenu && avatarBtn) {
        dropdownMenu.classList.remove('show');
        avatarBtn.setAttribute('aria-expanded', 'false');
        avatarBtn.classList.remove('active');
    }
}

// Show Industries popup (category selection)
function showIndustriesPopup() {
    console.log('🎯 Showing Industries popup...');
    
    try {
        // Create modal HTML if it doesn't exist
        if (!document.getElementById('industries-modal')) {
            createIndustriesModal();
        }
        
        // Show the modal
        const modal = document.getElementById('industries-modal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('show');
            
            // Setup category selection
            setupIndustriesCategorySelection();
            
            console.log('✅ Industries popup shown');
        } else {
            console.error('❌ Failed to create or find industries modal');
            showToast('Error opening industries popup', 'error');
        }
    } catch (error) {
        console.error('❌ Error showing industries popup:', error);
        showToast('Error opening industries popup', 'error');
    }
}

// Show Topics popup
function showTopicsPopup() {
    console.log('🎯 Showing Topics popup...');
    
    try {
        // Create modal HTML if it doesn't exist
        if (!document.getElementById('topics-modal')) {
            createTopicsModal();
        }
        
        // Show the modal
        const modal = document.getElementById('topics-modal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('show');
            
            // Setup category selection
            setupTopicsCategorySelection();
            
            console.log('✅ Topics popup shown');
        } else {
            console.error('❌ Failed to create or find topics modal');
            showToast('Error opening topics popup', 'error');
        }
    } catch (error) {
        console.error('❌ Error showing topics popup:', error);
        showToast('Error opening topics popup', 'error');
    }
}

// Create Industries modal HTML - EXACT SAME DESIGN AS CATEGORIES
function createIndustriesModal() {
    const modalHTML = `
        <div class="modal" id="industries-modal">
            <div class="modal-overlay" onclick="closeIndustriesModal()"></div>
            <div class="modal-content category-step">
                <div class="modal-header">
                    <button class="modal-back-btn" onclick="closeIndustriesModal()" aria-label="Go back">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <h2 class="modal-title" id="industries-title">Choose categories</h2>
                    <button class="modal-close" onclick="closeIndustriesModal()" aria-label="Close modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="category-header">
                        <h3 class="category-title">Choose one or more to personalize your experience</h3>
                    </div>
                    
                    <div class="category-grid" id="industries-grid">
                        <!-- Industries will be populated here -->
                    </div>
                    
                    <div class="category-footer">
                        <div class="category-counter">
                            <span id="industries-counter">0</span> Categories selected
                        </div>
                        <button class="category-continue-btn" id="industries-continue-btn" onclick="saveIndustriesSelection()">
                            <span class="btn-text">Continue</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Create Topics modal HTML - EXACT SAME DESIGN AS CATEGORIES
function createTopicsModal() {
    const modalHTML = `
        <div class="modal" id="topics-modal">
            <div class="modal-overlay" onclick="closeTopicsModal()"></div>
            <div class="modal-content category-step">
                <div class="modal-header">
                    <button class="modal-back-btn" onclick="closeTopicsModal()" aria-label="Go back">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <h2 class="modal-title" id="topics-title">Choose categories</h2>
                    <button class="modal-close" onclick="closeTopicsModal()" aria-label="Close modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="category-header">
                        <h3 class="category-title">Choose one or more to personalize your experience</h3>
                    </div>
                    
                    <!-- Search Bar -->
                    <div class="search-container">
                        <div class="search-wrapper">
                            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input type="text" id="topics-search" class="search-input" placeholder="Search topics..." oninput="filterTopics(this.value)">
                        </div>
                    </div>
                    
                    <div class="category-grid" id="topics-grid">
                        <!-- Topics will be populated here -->
                    </div>
                    
                    <div class="category-footer">
                        <div class="category-counter">
                            <span id="topics-counter">0</span> Categories selected
                        </div>
                        <button class="category-continue-btn" id="topics-continue-btn" onclick="saveTopicsSelection()">
                            <span class="btn-text">Continue</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Setup Industries category selection - EXACT SAME AS ORIGINAL CATEGORIES
function setupIndustriesCategorySelection() {
    const industries = [
        { id: 'agriculture-forestry', name: 'Agriculture & Forestry', icon: '🌾' },
        { id: 'animals-pets', name: 'Animals & Pets', icon: '🐾' },
        { id: 'apparel-clothing', name: 'Apparel & Clothing', icon: '👕' },
        { id: 'arts-crafts', name: 'Arts & Crafts', icon: '🎨' },
        { id: 'auto-automotive', name: 'Auto & Automotive', icon: '🚗' },
        { id: 'baby-kids-maternity', name: 'Baby, Kids & Maternity', icon: '👶' },
        { id: 'banking-finance', name: 'Banking & Finance', icon: '💰' },
        { id: 'fashion-beauty', name: 'Fashion & Beauty', icon: '💄' },
        { id: 'food-beverages', name: 'Food & Beverages', icon: '🍽️' },
        { id: 'building-construction', name: 'Building & Construction', icon: '🏗️' },
        { id: 'business-services', name: 'Business Services', icon: '💼' },
        { id: 'security-defense', name: 'Security & Defense', icon: '🛡️' },
        { id: 'education-training', name: 'Education & Training', icon: '🎓' },
        { id: 'electric-electronics', name: 'Electric & Electronics', icon: '⚡' },
        { id: 'power-energy', name: 'Power & Energy', icon: '⚡' },
        { id: 'industrial-engineering', name: 'Industrial Engineering', icon: '⚙️' },
        { id: 'entertainment-media', name: 'Entertainment & Media', icon: '🎬' },
        { id: 'environment-waste', name: 'Environment & Waste', icon: '🌿' },
        { id: 'wellness-health-fitness', name: 'Wellness, Health & Fitness', icon: '🧘' },
        { id: 'home-office', name: 'Home & Office', icon: '🏠' },
        { id: 'hospitality', name: 'Hospitality', icon: '🏨' },
        { id: 'it-technology', name: 'IT & Technology', icon: '💻' }
    ];
    
    const grid = document.getElementById('industries-grid');
    if (grid) {
        grid.innerHTML = industries.map(industry => `
            <div class="category-card" data-category="${industry.id}">
                <div class="category-icon">${industry.icon}</div>
                <div class="category-name">${industry.name}</div>
            </div>
        `).join('');
        
        // Add click handlers
        grid.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', handleIndustryCardClick);
        });
        
        // Load previously selected industries
        loadPreviouslySelectedIndustries();
    }
}

// Load previously selected categories - EXACT SAME AS ORIGINAL
function loadPreviouslySelectedIndustries() {
    try {
        const savedCategories = localStorage.getItem('selectedCategories');
        if (savedCategories) {
            const selectedCategories = JSON.parse(savedCategories);
            
            // Mark previously selected cards
            selectedCategories.forEach(categoryId => {
                const card = document.querySelector(`[data-category="${categoryId}"]`);
                if (card) {
                    card.classList.add('selected');
                }
            });
            
            // Update counter
            updateIndustriesCounter();
            
            console.log('Loaded previously selected categories:', selectedCategories);
        }
    } catch (error) {
        console.error('Error loading previously selected categories:', error);
    }
}

// Handle industry card click - EXACT SAME AS ORIGINAL
function handleIndustryCardClick(event) {
    const card = event.currentTarget;
    const categoryId = card.dataset.category;
    
    card.classList.toggle('selected');
    
    // Update counter
    updateIndustriesCounter();
    
    console.log('Category card clicked:', categoryId);
}

// Update industries counter - EXACT SAME AS ORIGINAL
function updateIndustriesCounter() {
    const selectedCards = document.querySelectorAll('#industries-grid .category-card.selected');
    const counter = document.getElementById('industries-counter');
    const continueBtn = document.getElementById('industries-continue-btn');
    
    if (counter) {
        counter.textContent = selectedCards.length;
    }
    
    if (continueBtn) {
        if (selectedCards.length > 0) {
            continueBtn.classList.add('show');
            continueBtn.disabled = false;
        } else {
            continueBtn.classList.remove('show');
            continueBtn.disabled = true;
        }
    }
}

// Save industries selection - EXACT SAME AS ORIGINAL
function saveIndustriesSelection() {
    try {
        const selectedCards = document.querySelectorAll('#industries-grid .category-card.selected');
        const selectedCategories = Array.from(selectedCards).map(card => card.dataset.category);
        
        // Update the industries values display
        const industriesValues = document.getElementById('industries-values');
        if (industriesValues) {
            const categoryNames = selectedCards.length > 0 
                ? Array.from(selectedCards).map(card => card.querySelector('.category-name').textContent).join(', ')
                : 'No categories selected';
            industriesValues.textContent = categoryNames;
        }
        
        // Save to localStorage
        localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
        
        // Close modal
        closeIndustriesModal();
        
        showToast('Categories updated successfully!', 'success');
        
        console.log('Categories saved:', selectedCategories);
    } catch (error) {
        console.error('❌ Error saving categories selection:', error);
        showToast('Error saving categories selection', 'error');
    }
}

// Close Industries modal
function closeIndustriesModal() {
    const modal = document.getElementById('industries-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            // Reset counter and button state
            const counter = document.getElementById('industries-counter');
            const continueBtn = document.getElementById('industries-continue-btn');
            if (counter) counter.textContent = '0';
            if (continueBtn) {
                continueBtn.classList.remove('show');
                continueBtn.disabled = true;
            }
            
            // Clean up event listeners to prevent memory leaks
            cleanupModalEventListeners();
        }, 300);
    }
}

// Clean up modal event listeners
function cleanupModalEventListeners() {
    const grid = document.getElementById('industries-grid');
    if (grid) {
        const cards = grid.querySelectorAll('.category-card');
        cards.forEach(card => {
            // Remove old event listeners by cloning and replacing
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
        });
    }
}

// Logout function - Make globally accessible
window.logout = function() {
    console.log('Logging out...');
    localStorage.removeItem('userData');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}



// Toggle avatar dropdown - Clean production version
window.toggleAvatarDropdown = function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const avatarBtn = document.querySelector('.avatar-btn');
    
    if (dropdownMenu && avatarBtn) {
        const isOpen = dropdownMenu.classList.contains('show');
        
        if (isOpen) {
            closeAvatarDropdown();
        } else {
            openAvatarDropdown();
        }
    }
}

// Missing dropdown functions - Make globally accessible
window.editProfile = function() {
    console.log('Edit Profile clicked');
    // Already on edit profile page, do nothing or show toast
    showToast('You are already on the Edit Profile page', 'info');
}

window.viewSettings = function() {
    console.log('Settings clicked');
    showToast('Settings page coming soon!', 'info');
}

window.viewHelp = function() {
    console.log('Help & Support clicked');
    showToast('Help & Support page coming soon!', 'info');
}

