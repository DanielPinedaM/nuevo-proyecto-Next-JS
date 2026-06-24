'use client';

import FixedLoader from '@/shared/ui/loader/FixedLoader';
import { useLoaderStore } from '@/shared/stores/loader/loader.store';

export default function FixedLoaderProvider() {
  const isLoading = useLoaderStore((state) => state.isLoading);

  if (!isLoading) return null;

  return <FixedLoader />;
}
