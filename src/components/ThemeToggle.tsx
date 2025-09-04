"use client";

import React, { useEffect, useState } from "react";
import { Row, ToggleButton, useTheme } from "@once-ui-system/core";
import styles from "./ThemeToggle.module.scss";

// Create animated overlay for theme transitions
const createOverlay = () => {
  if (typeof document !== 'undefined') {
    const overlay = document.createElement('div');
    overlay.className = styles.themeOverlay;
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 500ms ease';
    
    document.body.appendChild(overlay);
    
    // Trigger animation
    setTimeout(() => {
      overlay.style.opacity = '0.3';
      
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
        }, 300);
      }, 200);
    }, 10);
  }
};

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, [theme]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  const handleThemeToggle = () => {
    createOverlay();
    
    // Apply animation effects based on theme
    if (typeof document !== 'undefined') {
      const sections = document.querySelectorAll('section');
      const root = document.documentElement;
      
      if (nextTheme === 'dark') {
        // Enhanced animations for dark mode
        sections.forEach(section => {
          if (section instanceof HTMLElement) {
            section.style.transition = 'all 0.5s ease';
            section.style.boxShadow = '0 2px 7px rgba(200,200,200,0.1)';
          }
        });
        
        // Apply gradient background animation
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientAnimation 10s ease infinite';
      } else {
        // Enhanced animations for light mode
        sections.forEach(section => {
          if (section instanceof HTMLElement) {
            section.style.transition = 'all 0.5s ease';
            section.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
          }
        });
        
        // Remove gradient background animation
        document.body.style.animation = 'none';
        document.body.style.backgroundSize = 'cover';
      }
    }
    
    setTheme(nextTheme);
  };

  return (
    <ToggleButton
      className={styles.button}
      prefixIcon={icon}
      onClick={handleThemeToggle}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
