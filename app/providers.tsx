'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import dynamic from 'next/dynamic';

// Dynamically import ReactQueryDevtools to avoid SSR issues
const ReactQueryDevtoolsProduction = dynamic(() =>
  import('@tanstack/react-query-devtools/production').then(d => ({
    default: d.ReactQueryDevtools
  })),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      {process.env.NODE_ENV === 'production' && <ReactQueryDevtoolsProduction />}
    </QueryClientProvider>
  );
} 