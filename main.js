// Consolidated main.js - common functions and page-specific logic

// Create animated overlay for theme transitions
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 500);
}

// Unified theme toggle function
function toggleTheme() {
    createOverlay();
    const root = document.documentElement;
    const themeButton = document.getElementById('theme-toggle');
    const sections = document.querySelectorAll('section');
    const nav = document.querySelector('nav');
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        // Switch to light mode
        root.style.setProperty('--bg-color', '#f0f2f5');
        root.style.setProperty('--text-color', '#333');
        root.style.setProperty('--nav-bg', '#fff');
        root.style.setProperty('--section-bg', '#fff');
        root.style.setProperty('--heading-color', '#1976d2');
        root.style.setProperty('--skill-bg', '#e3f2fd');
        root.style.setProperty('--ai-pair-bg', '#f8f9fa');
        root.style.setProperty('--accent-color', '#2196f3');
        root.style.setProperty('--gradient-bg', 'linear-gradient(135deg, white, #add8e6)');
        localStorage.setItem('theme', 'light');
        themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="light-icon">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        </svg>`;
        nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        sections.forEach(section => { section.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'; });
        document.body.style.animation = 'none';
        document.body.style.backgroundSize = 'cover';
    } else {
        // Switch to dark mode
        root.style.setProperty('--bg-color', '#1a1a1a');
        root.style.setProperty('--text-color', '#e0e0e0');
        root.style.setProperty('--nav-bg', '#2d2d2d');
        root.style.setProperty('--section-bg', '#2d2d2d');
        root.style.setProperty('--heading-color', '#64b5f6');
        root.style.setProperty('--skill-bg', '#1a237e');
        root.style.setProperty('--ai-pair-bg', '#3d3d3d');
        root.style.setProperty('--accent-color', '#64b5f6');
        root.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #232526, #414345)');
        localStorage.setItem('theme', 'dark');
        themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="dark-icon">
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
        </svg>`;
        nav.style.boxShadow = '0 2px 7px rgba(200,200,200,0.1)';
        sections.forEach(section => { section.style.boxShadow = '0 2px 7px rgba(200,200,200,0.1)'; });
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientAnimation 10s ease infinite';
    }
}

// DOMContentLoaded common initialization
document.addEventListener('DOMContentLoaded', function() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const root = document.documentElement;
    const sections = document.querySelectorAll('section');
    const nav = document.querySelector('nav');
    const themeButton = document.getElementById('theme-toggle');
    if (currentTheme === 'dark') {
        root.style.setProperty('--bg-color', '#1a1a1a');
        root.style.setProperty('--text-color', '#e0e0e0');
        root.style.setProperty('--nav-bg', '#2d2d2d');
        root.style.setProperty('--section-bg', '#2d2d2d');
        root.style.setProperty('--heading-color', '#64b5f6');
        root.style.setProperty('--skill-bg', '#1a237e');
        root.style.setProperty('--ai-pair-bg', '#3d3d3d');
        root.style.setProperty('--accent-color', '#64b5f6');
        root.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #232526, #414345)');
        nav.style.boxShadow = '0 2px 7px rgba(200,200,200,0.1)';
        sections.forEach(section => { section.style.boxShadow = '0 2px 7px rgba(200,200,200,0.1)'; });
        if(themeButton) themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="dark-icon">
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
        </svg>`;
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientAnimation 10s ease infinite';
    } else {
        root.style.setProperty('--bg-color', '#f0f2f5');
        root.style.setProperty('--text-color', '#333');
        root.style.setProperty('--nav-bg', '#fff');
        root.style.setProperty('--section-bg', '#fff');
        root.style.setProperty('--heading-color', '#1976d2');
        root.style.setProperty('--skill-bg', '#e3f2fd');
        root.style.setProperty('--ai-pair-bg', '#f8f9fa');
        root.style.setProperty('--accent-color', '#2196f3');
        root.style.setProperty('--gradient-bg', 'linear-gradient(135deg, white, #add8e6)');
        nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        sections.forEach(section => { section.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'; });
        if(themeButton) themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="light-icon">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        </svg>`;
        document.body.style.animation = 'none';
        document.body.style.backgroundSize = 'cover';
    }

    // Projects page specific code (if element exists)
    const adminButton = document.getElementById('adminControl');
    if (adminButton) {
        // Firebase initialization (using compat libraries)
        try {
            const firebaseConfig = {
                apiKey: "AIzaSyD-HoQoBIVjxEyoAw1cncImOOYQkVJsRHA",
                authDomain: "myportfolio-3982d.firebaseapp.com",
                projectId: "myportfolio-3982d",
                storageBucket: "myportfolio-3982d.firebasestorage.app",
                messagingSenderId: "466852161255",
                appId: "1:466852161255:web:eda037922c646fd513a442",
                measurementId: "G-E4T3S30FFY"
            };
            firebase.initializeApp(firebaseConfig);
        } catch (error) {
            console.error("Firebase init error:", error);
        }
        const db = firebase.firestore();

        // Toggle admin mode and load repos
        let isAdminMode = false;
        adminButton.addEventListener('click', function() {
            isAdminMode = !isAdminMode;
            adminButton.textContent = isAdminMode ? 'Exit Admin Mode' : 'Toggle Admin Mode';
            loadRepos();
        });

        // Fetch selected projects from Firestore
        async function fetchSelectedProjects() {
            try {
                const docRef = db.collection("selectedProjects").doc("projects");
                const docSnap = await docRef.get();
                return docSnap.exists ? (docSnap.data().selectedProjects || []) : [];
            } catch (error) {
                console.error("Error fetching projects:", error);
                return [];
            }
        }
        async function updateCloudSelectedProjects(selectedProjects) {
            try {
                await db.collection("selectedProjects").doc("projects").set({ selectedProjects });
            } catch (error) {
                console.error("Error updating projects:", error);
            }
        }
        async function loadRepos() {
            try {
                const projectsSection = document.getElementById('projects');
                const loadingBar = document.getElementById('loading-bar');
                const loadingMessage = document.getElementById('loading-message');
                // Remove existing project cards
                projectsSection.querySelectorAll('.project-card').forEach(card => card.remove());
                // Show loading states
                loadingBar.style.display = 'block';
                loadingMessage.style.display = 'block';
                const response = await fetch('https://api.github.com/users/Ruhaan838/repos');
                if (!response.ok) throw new Error('Network error');
                const repos = await response.json();
                repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Changed from updated_at to created_at
                const selectedProjects = await fetchSelectedProjects();
                loadingBar.style.display = 'none';
                loadingMessage.style.display = 'none';
                repos.forEach(repo => {
                    const projectLink = document.createElement('a');
                    projectLink.href = repo.html_url;
                    projectLink.target = '_blank';
                    projectLink.className = 'project-card';

                    const headerDiv = document.createElement('div');
                    headerDiv.className = 'project-header';

                    const titleSpan = document.createElement('span');
                    titleSpan.className = 'project-title';
                    titleSpan.textContent = repo.name;

                    const dateSpan = document.createElement('span');
                    dateSpan.className = 'blog-date';
                    dateSpan.textContent = new Date(repo.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); // Changed from updated_at to created_at

                    headerDiv.appendChild(titleSpan);
                    headerDiv.appendChild(dateSpan);
                    projectLink.appendChild(headerDiv);

                    const descriptionPara = document.createElement('p');
                    descriptionPara.className = 'project-description';
                    descriptionPara.textContent = repo.description || 'No description available.';
                    projectLink.appendChild(descriptionPara);

                    if (isAdminMode) {
                        projectLink.style.position = 'relative';
                        const isSelected = selectedProjects.includes(repo.name);
                        projectLink.style.opacity = isSelected ? '1' : '0.5';
                        if (isSelected) projectLink.style.borderLeft = '4px solid var(--accent-color)';
                        projectLink.addEventListener('click', async function(e) {
                            e.preventDefault();
                            const index = selectedProjects.indexOf(repo.name);
                            if (index === -1) {
                                selectedProjects.push(repo.name);
                                projectLink.style.opacity = '1';
                                projectLink.style.borderLeft = '4px solid var(--accent-color)';
                            } else {
                                selectedProjects.splice(index, 1);
                                projectLink.style.opacity = '0.5';
                                projectLink.style.borderLeft = 'none';
                            }
                            await updateCloudSelectedProjects(selectedProjects);
                        });
                    } else {
                        if (!selectedProjects.includes(repo.name)) return;
                        projectLink.style.borderLeft = '4px solid var(--accent-color)';
                    }

                    projectsSection.appendChild(projectLink);
                });
            } catch (error) {
                console.error('Failed to load repos:', error);
                const loadingBar = document.getElementById('loading-bar');
                const loadingMessage = document.getElementById('loading-message');
                loadingBar.style.display = 'none';
                loadingMessage.style.display = 'none';
                document.getElementById('projects').innerHTML += '<p style="color: var(--text-color); text-align: center;">Failed to load projects. Please try again later.</p>';
            }
        }
        loadRepos();
    }

    // Add keyboard shortcut for admin control:
    document.addEventListener('keydown', function(e) {
        if (((e.ctrlKey && e.altKey) || (e.metaKey && e.altKey)) && e.code === 'Backquote') {
            const adminBtn = document.getElementById('adminControl');
            if (adminBtn) {
                adminBtn.style.display = 'block';
            }
        }
    });
});
