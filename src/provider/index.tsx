'use client';

import { ReactNode } from 'react';
import TanStackProvider from '@/provider/tanstack-provider/TanStackProvider';
import { ThemeProvider } from '@/provider/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <TanStackProvider>
        <ClerkProvider>{children}</ClerkProvider>
      </TanStackProvider>
    </ThemeProvider>
  );
}
