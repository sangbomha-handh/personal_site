// Load header and footer
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// Initialize components
async function initializeComponents() {
    await loadComponent('header-placeholder', 'header.html');
    await loadComponent('footer-placeholder', 'footer.html');

    // After header is loaded, initialize navigation
    initializeNavigation();
}

// Navigation and tab functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Fade out current tab
            const currentTab = document.querySelector('.tab-content.active');
            const tabId = link.getAttribute('data-tab');
            const nextTab = document.getElementById(tabId);

            if (currentTab && currentTab !== nextTab) {
                currentTab.classList.remove('visible');
                setTimeout(() => {
                    currentTab.classList.remove('active');
                    nextTab.classList.add('active');
                    // Trigger reflow then fade in
                    requestAnimationFrame(() => {
                        nextTab.classList.add('visible');
                    });
                    if (tabId === 'home') {
                        setTimeout(() => animateStats(), 100);
                    }
                    window.location.hash = tabId;
                }, 150);
            } else if (!currentTab) {
                nextTab.classList.add('active');
                requestAnimationFrame(() => {
                    nextTab.classList.add('visible');
                });
            }
        });
    });
}

// Stats animation function
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        const percentageEl = card.querySelector('.percentage');
        const progressBar = card.querySelector('.progress-fill');

        // Get the target value from the text (e.g. "90%")
        const targetValue = parseInt(percentageEl.textContent);

        // Set initial state
        percentageEl.childNodes[0].nodeValue = "0";
        progressBar.style.width = "0%";

        // Function to animate number
        const animateValue = (element, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                // Easing function (easeOutExpo)
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                element.childNodes[0].nodeValue = Math.floor(easeProgress * (end - start) + start);

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        // Trigger animations with a slight delay
        setTimeout(() => {
            progressBar.style.width = targetValue + "%";
            animateValue(percentageEl, 0, targetValue, 1500);
        }, 300);
    });
}

// Project card expand/collapse
function toggleProject(headerEl) {
    const card = headerEl.closest('.project-card');
    card.classList.toggle('expanded');
}

// Detail section expand/collapse
function toggleDetailSection(titleEl) {
    const section = titleEl.closest('.detail-section');
    section.classList.toggle('expanded');
}

// Navigate to project detail in projects tab
function goToProjectDetail(event, projectId) {
    event.preventDefault();
    switchToTab('projects', function() {
        const target = document.getElementById(projectId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Navigate back to experience tab
function goToExperience(event) {
    event.preventDefault();
    switchToTab('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to another project within projects tab
function goToProject(event, projectId) {
    event.preventDefault();
    const target = document.getElementById(projectId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Switch tab programmatically
function switchToTab(tabId, callback) {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentTab = document.querySelector('.tab-content.active');
    const nextTab = document.getElementById(tabId);

    navLinks.forEach(l => l.classList.remove('active'));
    const targetLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
    if (targetLink) targetLink.classList.add('active');

    if (currentTab && currentTab !== nextTab) {
        currentTab.classList.remove('visible');
        setTimeout(() => {
            currentTab.classList.remove('active');
            nextTab.classList.add('active');
            requestAnimationFrame(() => {
                nextTab.classList.add('visible');
                if (callback) setTimeout(callback, 50);
            });
        }, 150);
    } else if (currentTab === nextTab) {
        if (callback) callback();
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Load header and footer first
    await initializeComponents();

    // Restore tab from URL hash
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['home', 'summary', 'experience', 'projects'];
    if (hash && validTabs.includes(hash) && hash !== 'home') {
        switchToTab(hash);
    } else {
        // Initial animation on page load
        animateStats();
    }
});
