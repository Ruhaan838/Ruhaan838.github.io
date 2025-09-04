"use client";

// This utility provides a client-side alternative to the server API routes
// for handling authentication in a static site (GitHub Pages)

// Local storage key for auth token
const AUTH_TOKEN_KEY = "portfolioAuthToken";

/**
 * Check if the user is authenticated by looking for the token in localStorage
 * @returns boolean indicating authentication status
 */
export function checkAuth(): boolean {
  // Only run in browser environment
  if (typeof window === "undefined") {
    return false;
  }
  
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token === "authenticated";
}

/**
 * Attempt to authenticate with password
 * @param password The password to authenticate with
 * @returns Promise resolving to authentication success/failure
 */
export async function authenticate(password: string): Promise<boolean> {
  // Only run in browser environment
  if (typeof window === "undefined") {
    return false;
  }
  
  // In a static site, we need to check against a hard-coded or environment variable
  // This is a simplification - in production you'd want a more secure approach
  // like a hash comparison or external authentication service
  
  // Get password from environment (Next.js public env var)
  const correctPassword = process.env.NEXT_PUBLIC_PAGE_ACCESS_PASSWORD;
  
  if (!correctPassword) {
    console.error("NEXT_PUBLIC_PAGE_ACCESS_PASSWORD environment variable is not set");
    return false;
  }
  
  const success = password === correctPassword;
  
  if (success) {
    // Store the auth token in localStorage
    localStorage.setItem(AUTH_TOKEN_KEY, "authenticated");
    
    // Set expiration (1 hour from now)
    const expiration = Date.now() + (60 * 60 * 1000);
    localStorage.setItem(`${AUTH_TOKEN_KEY}_expiration`, expiration.toString());
  }
  
  return success;
}

/**
 * Check if the authentication token has expired
 * @returns boolean indicating if the token is expired
 */
export function isAuthExpired(): boolean {
  // Only run in browser environment
  if (typeof window === "undefined") {
    return true;
  }
  
  const expiration = localStorage.getItem(`${AUTH_TOKEN_KEY}_expiration`);
  if (!expiration) {
    return true;
  }
  
  return Date.now() > parseInt(expiration, 10);
}

/**
 * Clear the authentication token
 */
export function logout(): void {
  // Only run in browser environment
  if (typeof window === "undefined") {
    return;
  }
  
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(`${AUTH_TOKEN_KEY}_expiration`);
}

/**
 * Initialize auth by checking expiration
 * Call this on app initialization
 */
export function initAuth(): void {
  // Only run in browser environment
  if (typeof window === "undefined") {
    return;
  }
  
  // Check if token is expired and clear it if necessary
  if (isAuthExpired()) {
    logout();
  }
}
