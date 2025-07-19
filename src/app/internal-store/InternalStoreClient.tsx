'use client';

import { useTrackInternalStore } from '@/hooks/useTrackInternalStore';

export default function InternalStoreClient() {
  useTrackInternalStore();
  return null;
}