'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CONTENT_STORAGE_KEY, defaultContent, SiteContent } from '@/lib/content';

type ContentContextValue = {
  content: SiteContent;
  ready: boolean;
  saveContent: (content: SiteContent) => void;
  resetContent: () => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CONTENT_STORAGE_KEY);
      if (raw) setContent(JSON.parse(raw) as SiteContent);
    } catch {
      setContent(defaultContent);
    } finally {
      setReady(true);
    }
  }, []);

  const value = useMemo<ContentContextValue>(() => ({
    content,
    ready,
    saveContent(next) {
      setContent(next);
      window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(next));
    },
    resetContent() {
      setContent(defaultContent);
      window.localStorage.removeItem(CONTENT_STORAGE_KEY);
    },
  }), [content, ready]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside ContentProvider');
  return ctx;
}
