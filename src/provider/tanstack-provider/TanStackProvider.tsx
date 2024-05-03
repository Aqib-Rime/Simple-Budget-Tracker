'use client';

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // TODO: may be you want to modify this
      staleTime: Infinity,
    },
  },
});
