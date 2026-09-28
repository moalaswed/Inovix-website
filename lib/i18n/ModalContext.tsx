"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (triggerEl?: HTMLElement | null) => void;
  closeModal: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  triggerRef: { current: null },
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((triggerEl?: HTMLElement | null) => {
    if (triggerEl) triggerRef.current = triggerEl;
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Return focus to the element that opened the modal
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, triggerRef }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextType {
  return useContext(ModalContext);
}
