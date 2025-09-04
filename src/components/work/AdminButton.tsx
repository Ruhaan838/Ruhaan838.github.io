'use client';

import { useEffect, useState } from 'react';
import { Button } from "@once-ui-system/core";
import styles from './AdminButton.module.scss';

interface AdminButtonProps {
  onToggle?: (isAdmin: boolean) => void;
}

export function AdminButton({ onToggle }: AdminButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Show button on keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (((e.ctrlKey && e.altKey) || (e.metaKey && e.altKey)) && e.code === 'Backquote') {
        setIsVisible(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className={styles.adminButton}>
      <Button 
        onClick={() => {
          const newState = !isAdmin;
          setIsAdmin(newState);
          if (onToggle) onToggle(newState);
        }}
      >
        {isAdmin ? 'Exit Admin Mode' : 'Enter Admin Mode'}
      </Button>
    </div>
  );
}
