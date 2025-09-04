"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectProps {
  to: string;
  delay?: number;
}

export const Redirect: React.FC<RedirectProps> = ({ to, delay = 0 }) => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(to);
    }, delay);

    return () => clearTimeout(timeout);
  }, [to, delay, router]);

  return (
    <p>Redirecting to {to}...</p>
  );
};
