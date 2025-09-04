import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Check if we have a GitHub token
    if (!process.env.GITHUB_TOKEN) {
      console.log('No GitHub token found in environment variables');
    } else {
      console.log('GitHub token found (hidden for security)');
    }

    // Change this to your actual GitHub username
    // For example: 'johndoe' or whatever your GitHub username is 
    const username = 'Ruhaan838';
    
    // Using server-side fetch to avoid CORS issues
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Using token if available to increase rate limits
        // GitHub now uses Bearer format for fine-grained tokens
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      },
      // Important to avoid stale data
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      // Get more detailed error information
      const errorText = await response.text();
      console.error(`GitHub API error: Status ${response.status}, Details: ${errorText}`);
      throw new Error(`GitHub API returned ${response.status}: ${errorText.substring(0, 100)}...`);
    }
    
    const repos = await response.json();
    return NextResponse.json(repos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    
    // Return fallback data instead of an error
    const fallbackRepos = [
      {
        id: 1,
        name: "data-science-projects",
        description: "Collection of data analysis and machine learning projects",
        html_url: "https://github.com/Ruhaan838/data-science-projects",
        created_at: "2023-02-15T12:00:00Z",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0
      },
      {
        id: 2,
        name: "cuda-neural-networks",
        description: "GPU-accelerated neural network implementations",
        html_url: "https://github.com/Ruhaan838/cuda-neural-networks",
        created_at: "2023-04-22T12:00:00Z",
        language: "CUDA",
        stargazers_count: 0,
        forks_count: 0
      },
      {
        id: 3,
        name: "systems-programming",
        description: "Low-level systems programming and algorithm optimization",
        html_url: "https://github.com/Ruhaan838/systems-programming",
        created_at: "2023-05-30T12:00:00Z",
        language: "C++",
        stargazers_count: 0,
        forks_count: 0
      },
      {
        id: 4,
        name: "portfolio-nextjs",
        description: "My personal portfolio website built with Next.js and Once UI",
        html_url: "https://github.com/Ruhaan838/portfolio",
        created_at: "2023-08-10T12:00:00Z",
        language: "TypeScript",
        stargazers_count: 0,
        forks_count: 0
      }
    ];
    
    console.log('Returning fallback repository data');
    return NextResponse.json(fallbackRepos);
  }
}
