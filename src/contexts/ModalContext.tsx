'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import LeadEnrichmentModal from '@/components/Stats/LeadEnrichmentModal';

interface ModalContextType {
  open: (onSubmit: (input: string) => void) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [onSubmit, setOnSubmit] = useState<(input: string) => void>(() => {});

  const open = (submitHandler: (input: string) => void) => {
    setOnSubmit(() => submitHandler);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen && <LeadEnrichmentModal onClose={close} onSubmit={onSubmit} />}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
