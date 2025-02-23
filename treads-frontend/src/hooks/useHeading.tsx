// hooks/useHeadings.ts
import { useEffect } from 'react';
import { useTOC } from '@context/TOCContext';
import { TOCItem } from '@context/TOCContext';

export const useHeadings = () => {
  const { setTOCItems } = useTOC();

  useEffect(() => {
    const generateTOC = () => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      
      const items: TOCItem[] = headings.map((heading) => {
        // Get the heading level from the tag name (h1 = 1, h2 = 2, etc.)
        const level = parseInt(heading.tagName[1]);
        
        // Ensure heading has an id
        if (!heading.id) {
          heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') ?? '';
        }

        return {
          id: heading.id,
          title: heading.textContent ?? '',
          level: level - 1, // Normalize levels to start at 0
          element: heading as HTMLElement,
        };
      });

      setTOCItems(items);
    };

    // Generate TOC on mount and when content changes
    generateTOC();

    // Optional: Set up a MutationObserver to watch for content changes
    const observer = new MutationObserver(generateTOC);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => observer.disconnect();
  }, [setTOCItems]);
};