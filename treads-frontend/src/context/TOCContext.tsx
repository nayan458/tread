// context/TOCContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TOCItem } from 'src/types';

interface TOCContextType {
  tocItems: TOCItem[];
  setTOCItems: React.Dispatch<React.SetStateAction<TOCItem[]>>;
  activeId: string;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export const TOCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tocItems, setTOCItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight * 0.4); // Add 40vh offset

      // Find the last heading that's above our scroll position
      const activeHeading = tocItems
        .filter(item => item.element)
        .reduce((active, item) => {
          if (!item.element) return active;
          if (item.element.offsetTop <= scrollPosition) {
            if (!active || active.element!.offsetTop <= item.element!.offsetTop) {
              return item;
            }
          }
          return active;
        }, null as TOCItem | null);

      if (activeHeading) {
        setActiveId(activeHeading.id);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  return (
    <TOCContext.Provider value={{ tocItems, setTOCItems, activeId, setActiveId }}>
      {children}
    </TOCContext.Provider>
  );
};

export const useTOC = () => {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error('useTOC must be used within a TOCProvider');
  }
  return context;
};