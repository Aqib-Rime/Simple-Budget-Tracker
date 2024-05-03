'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/provider/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <ClerkProvider>{children}</ClerkProvider>
    </ThemeProvider>
  );
}
