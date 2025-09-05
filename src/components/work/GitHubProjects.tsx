'use client';

import { useEffect, useState } from 'react';
import { db, firebaseAvailable } from '@/utils/firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Card, Column, Row, Text, Grid, Button } from "@once-ui-system/core";
import { AdminButton } from './AdminButton';
import styles from './GitHubProjects.module.scss';
import './GitHubProjects.theme.css';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  language: string | null;
  // Optional fields for stars and forks
  stargazers_count?: number;
  forks_count?: number;
}

// Default list of projects to display if API fails
const DEFAULT_PROJECTS: GitHubRepo[] = [
  {
    id: 1,
    name: "Decision-Tree-From-Scratch-Implementation",
    description: "Decision Tree that I build is completely from scratch and it's make a decision based on features",
    html_url: "https://github.com/Ruhaan838/Decision-Tree-From-Scratch-Implementation",
    created_at: "2023-01-15T12:00:00Z",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0
  },
  {
    id: 2,
    name: "gpu-accelerated-computing",
    description: "High-performance computing with CUDA acceleration",
    html_url: "https://github.com/Ruhaan838/gpu-accelerated-computing",
    created_at: "2023-03-22T12:00:00Z",
    language: "CUDA",
    stargazers_count: 0,
    forks_count: 0
  },
  {
    id: 3,
    name: "algorithms-cpp",
    description: "Efficient algorithms and data structures implemented in C++",
    html_url: "https://github.com/Ruhaan838/algorithms-cpp",
    created_at: "2023-05-10T12:00:00Z",
    language: "C++",
    stargazers_count: 0,
    forks_count: 0
  },
  {
    id: 4,
    name: "portfolio",
    description: "My personal portfolio website built with Next.js and Once UI",
    html_url: "https://github.com/Ruhaan838/portfolio",
    created_at: "2023-06-15T12:00:00Z",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0
  }
];

// Function to get color for programming language
const getLanguageColor = (language: string | null): string => {
  if (!language) return "#858585";
  
  const languageColors: Record<string, string> = {
    "Python": "#3572A5",
    "CUDA": "#3A4E3A",
    "C++": "#f34b7d",
    "TypeScript": "#2b7489",
    "JavaScript": "#f1e05a",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Java": "#b07219",
    "Go": "#00ADD8",
    "Rust": "#dea584",
    "Ruby": "#701516",
    "PHP": "#4F5D95",
    "Swift": "#ffac45",
    "Kotlin": "#F18E33",
    "Dart": "#00B4AB",
    "C#": "#178600",
    "R": "#198CE7"
  };
  
  return languageColors[language] || "#858585";
};

export function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Initialize selected projects from Firestore (fallback to defaults on failure)
  useEffect(() => {
    const load = async () => {
      const defaultNames = DEFAULT_PROJECTS.map(p => p.name);
      if (!firebaseAvailable() || !db) {
        console.warn('[Projects] Firebase not available – using defaults only');
        setSelectedProjects(defaultNames);
        return;
      }
      try {
        const ref = doc(db, 'portfolio', 'selectedProjects');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          console.log('[Projects] Loaded Firestore doc:', data);
          if (Array.isArray(data.names) && data.names.length) {
            setSelectedProjects(data.names as string[]);
            return;
          }
        }
        console.log('[Projects] Creating initial Firestore doc with defaults');
        setSelectedProjects(defaultNames);
        await setDoc(ref, { names: defaultNames, updatedAt: Date.now() }, { merge: true });
      } catch (e) {
        console.warn('[Projects] Firestore load failed, using defaults', e);
        setSelectedProjects(defaultNames);
      }
    };
    load();
  }, []);

  // Function to fetch repositories from GitHub
  const fetchRepos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching GitHub repositories (client-side)...');

      // Simple 5 minute cache to reduce rate limit hits (60/hr unauthenticated)
      const CACHE_KEY = 'github_repos_cache_v1';
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
          setRepos(parsed.data);
          setIsLoading(false);
          return;
        }
      }

      const ghResponse = await fetch('https://api.github.com/users/Ruhaan838/repos?per_page=100&sort=updated', {
        headers: {
          'Accept': 'application/vnd.github+json'
        }
      });

      if (!ghResponse.ok) {
        // Rate limit specific messaging
        if (ghResponse.status === 403) {
          setError('GitHub rate limit reached. Showing default projects. Try again later.');
        } else {
          setError('Failed to load repositories. Using default projects instead.');
        }
        console.error('GitHub API error status:', ghResponse.status);
        setRepos(DEFAULT_PROJECTS);
        setIsLoading(false);
        return;
      }

      const data: any[] = await ghResponse.json();
      if (!Array.isArray(data) || data.length === 0) {
        console.log('GitHub API returned empty array, using defaults');
        setRepos(DEFAULT_PROJECTS);
      } else {
        // Filter out forks / archived for a cleaner list
        const cleaned = data
          .filter(r => !r.fork && !r.archived)
          .map(r => ({
            id: r.id,
            name: r.name,
            description: r.description || '',
            html_url: r.html_url,
            created_at: r.created_at,
            language: r.language,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count
          })) as GitHubRepo[];

        const sorted = cleaned.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setRepos(sorted);
        // Save cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: sorted }));
      }
    } catch (err) {
      console.error('Error fetching repos:', err);
      setError('Failed to load repositories. Using default projects instead.');
      setRepos(DEFAULT_PROJECTS);
    } finally {
      setIsLoading(false);
    }
  };

  // Save selected projects to localStorage
  const updateSelectedProjects = async (projects: string[]) => {
    setSelectedProjects(projects);
    if (!firebaseAvailable() || !db) {
      console.warn('[Projects] Firebase unavailable – selection not persisted');
      return;
    }
    try {
      const ref = doc(db, 'portfolio', 'selectedProjects');
      console.log('[Projects] Saving selection to Firestore:', projects);
      await setDoc(ref, { names: projects, updatedAt: Date.now() }, { merge: true });
      console.log('[Projects] Saved successfully');
    } catch (e) {
      console.error('[Projects] Failed to persist selection to Firestore', e);
    }
  };

  // Toggle a project's selection status
  const toggleProjectSelection = (repoName: string) => {
    const newSelectedProjects = [...selectedProjects];
    const index = newSelectedProjects.indexOf(repoName);
    
    if (index === -1) {
      newSelectedProjects.push(repoName);
    } else {
      newSelectedProjects.splice(index, 1);
    }
    
    updateSelectedProjects(newSelectedProjects);
  };

  // Toggle admin mode with keyboard shortcut (Ctrl+Alt+` or Cmd+Alt+`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (((e.ctrlKey && e.altKey) || (e.metaKey && e.altKey)) && e.code === 'Backquote') {
        setIsAdminMode(prev => !prev);
        console.log('Admin mode toggled:', !isAdminMode);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminMode]);

  // Fetch repositories on component mount
  useEffect(() => {
    fetchRepos();
  }, []);

  // Get unique languages from repositories with priority ordering for Python, CUDA, C++
  const getUniqueLanguages = () => {
    const languages = repos.map(repo => repo.language).filter(Boolean) as string[];
    const uniqueLanguages = Array.from(new Set(languages));
    
    // Define priority languages
    const priorityLanguages = ["Python", "CUDA", "C++"];
    
    // Split languages into priority and other
    const priorityFound = priorityLanguages.filter(lang => uniqueLanguages.includes(lang));
    const otherLanguages = uniqueLanguages
      .filter(lang => !priorityLanguages.includes(lang))
      .sort();
    
    // Return priority languages first, followed by alphabetically sorted others
    return [...priorityFound, ...otherLanguages];
  };
  
  // Filter repositories based on admin mode and language filter
  const displayedRepos = isAdminMode 
    ? (selectedLanguage ? repos.filter(repo => repo.language === selectedLanguage) : repos)
    : repos.filter(repo => {
        const passesProjectFilter = selectedProjects.includes(repo.name);
        const passesLanguageFilter = selectedLanguage ? repo.language === selectedLanguage : true;
        return passesProjectFilter && passesLanguageFilter;
      });

  return (
    <Column gap="24">
      <AdminButton onToggle={(isAdmin) => setIsAdminMode(isAdmin)} />
      
      {/* Language filter buttons */}
      <Row gap="8" wrap={true} marginBottom="16">
        <Button 
          variant={selectedLanguage === null ? "primary" : "secondary"}
          onClick={() => setSelectedLanguage(null)}
        >
          All Languages
        </Button>
        {getUniqueLanguages().map(language => {
          const isPriorityLanguage = ["Python", "CUDA", "C++"].includes(language);
          const languageColor = getLanguageColor(language);
          
          return (
            <Button 
              key={language}
              variant="secondary"
              onClick={() => setSelectedLanguage(language)}
              className={`${styles.languageButton} ${selectedLanguage === language ? styles.selectedLanguageButton : ''} ${isPriorityLanguage ? styles.priorityLanguage : ''}`}
              style={{
                '--language-color': languageColor,
                '--language-color-light': `${languageColor}33`, // 20% opacity
              } as React.CSSProperties}
            >
              {language}
            </Button>
          );
        })}
      </Row>
      
      {isAdminMode && (
        <Row marginBottom="16" vertical="center" gap="8">
          <Text variant="heading-strong-m">
            Admin Mode
          </Text>
          <Text variant="body-default-s">
            Click on repositories to toggle selection
          </Text>
        </Row>
      )}
      
      {isLoading ? (
        <Text variant="body-default-m">Loading repositories...</Text>
      ) : error ? (
        <>
          <Text variant="body-default-m">
            {error}
          </Text>
          <Button onClick={fetchRepos}>
            Try Again
          </Button>
        </>
      ) : (
        <Grid columns="3" s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedRepos.map((repo: GitHubRepo) => {
            const isSelected = selectedProjects.includes(repo.name);
            const formattedDate = new Date(repo.created_at).toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            });
            
            return (
              <Card
                key={repo.id}
                fillWidth
                padding="24"
                radius="l"
                background="transparent"
                border="transparent"
                className={`repoCard ${styles.repoCard} ${isSelected ? styles.selectedCard : isAdminMode ? styles.nonSelectedCard : ''}`}
                transition="micro-medium"
                style={{ 
                  borderColor: isSelected ? 'var(--color-accent)' : 'transparent',
                  background: 'transparent'
                }}
                onClick={isAdminMode ? () => toggleProjectSelection(repo.name) : undefined}
                href={isAdminMode ? undefined : repo.html_url}
              >
                <Column gap="16">
                  {/* Repository Header */}
                  <Row gap="16" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    width: '100%'
                  }}>
                    <Row gap="8" vertical="center" style={{ maxWidth: '85%' }}>
                      <div className={styles.repoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20">
                          <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-3.5a.25.25 0 0 1-.25-.25Z"></path>
                        </svg>
                      </div>
                      <Text variant="heading-strong-m" className={styles.repoName} title={repo.name}>
                        {repo.name}
                      </Text>
                    </Row>
                    <Text variant="body-default-xs" className={styles.repoDate}>
                      {formattedDate}
                    </Text>
                  </Row>
                  
                  {/* Repository Description */}
                  <Text variant="body-default-s" className={styles.repoDescription} title={repo.description || "No description available."}>
                    {repo.description || "No description available."}
                  </Text>
                  
                  {/* Repository Footer */}
                  <Row gap="16" wrap={true} vertical="center" className={styles.repoFooter}>
                    {repo.language && (
                      <Row gap="8" vertical="center" className={styles.languageContainer}>
                        <span 
                          className={styles.languageColor} 
                          style={{
                            backgroundColor: getLanguageColor(repo.language)
                          }}
                        />
                        <Text variant="body-default-xs" className={styles.languageTag}>
                          {repo.language}
                        </Text>
                      </Row>
                    )}
                    
                    <div className={`${styles.actionButton} ${styles.statsItem}`} title={`${repo.stargazers_count || 0} stars`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                        <path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
                      </svg>
                      <span>{repo.stargazers_count !== undefined ? repo.stargazers_count.toLocaleString() : '0'}</span>
                    </div>
                    
                    <div className={`${styles.actionButton} ${styles.statsItem}`} title={`${repo.forks_count || 0} forks`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                        <path fill="currentColor" d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                      </svg>
                      <span>{repo.forks_count !== undefined ? repo.forks_count.toLocaleString() : '0'}</span>
                    </div>
                  </Row>
                </Column>
              </Card>
            );
          })}
        </Grid>
      )}
      
      {!isLoading && displayedRepos.length === 0 && (
        <Text variant="body-default-m">
          {isAdminMode 
            ? "No repositories found. Try refreshing the page."
            : "No selected repositories to display."}
        </Text>
      )}
    </Column>
  );
}
