'use client';

import { useState, useEffect, useRef } from 'react';
import { knowledgeItems, generateId, KnowledgeItemData } from '@/lib/knowledge-data';
import { ScrollArea } from "@/components/ui/scroll-area";

const KnowledgeToc = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  // const itemRefs = useRef<{ [key: string]: HTMLElement | null }>({}); // itemRefs not currently used, can be removed or kept for future

  // Function to handle smooth scrolling - Manual Calculation
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const viewportHeight = window.innerHeight;
      const elementRect = element.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      
      // Calculate the desired top position relative to the viewport (20% down)
      const desiredViewportOffset = viewportHeight * 0.20;
      
      // Calculate the target absolute scroll position
      const targetScrollY = currentScrollY + elementRect.top - desiredViewportOffset;
      
      // Use window.scrollTo for precise positioning
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        let bestVisibleEntry: IntersectionObserverEntry | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
             // Prioritize entries that are fully visible or higher up
            if (!bestVisibleEntry || entry.intersectionRatio > bestVisibleEntry.intersectionRatio) {
                bestVisibleEntry = entry;
            } else if (entry.intersectionRatio === bestVisibleEntry.intersectionRatio && entry.boundingClientRect.top < bestVisibleEntry.boundingClientRect.top) {
                bestVisibleEntry = entry;
            }
          }
        });

        // Suppress persistent Linter error
        // @ts-ignore - TS cannot infer target type correctly here
        if (bestVisibleEntry?.target) { 
           // @ts-ignore - TS cannot infer target type correctly here
           const targetWithId = bestVisibleEntry.target as Element & { id?: string };
           if (targetWithId.id) {
              setActiveId(targetWithId.id);
           } 
        } 
      },
      {
        // Keep the correct rootMargin and threshold
        rootMargin: '-20% 0px -75% 0px', 
        threshold: 0.1 
      }
    );

    const currentObserver = observerRef.current;
    const elementsToObserve: Element[] = [];
    knowledgeItems.forEach((item) => {
      const id = generateId(item.title);
      const element = document.getElementById(id);
      if (element) {
        elementsToObserve.push(element);
        // itemRefs.current[id] = element;
      }
    });
    elementsToObserve.forEach(el => currentObserver.observe(el));

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, []);

  // Separate items into categories
  const techItems = knowledgeItems.filter(item => item.category === 'tech');
  const otherItems = knowledgeItems.filter(item => item.category === 'other' || !item.category);

  const renderListItems = (items: KnowledgeItemData[]) => {
    return items.map((item) => {
      const id = generateId(item.title);
      const isActive = activeId === id;
      return (
        <li key={id}>
          <button
            onClick={() => scrollToId(id)}
            className={`block w-full text-left transition-colors duration-200 truncate 
              ${
                isActive
                  ? 'font-semibold text-[#3f2c5f] dark:text-white' 
                  : 'text-neutral-500 dark:text-neutral-300 hover:text-[#3f2c5f] dark:hover:text-white'
              }
            `}
          >
            {item.title}
          </button>
        </li>
      );
    });
  };

  return (
    // Restore original py-9 and h-[96.95vh] for consistent appearance
    <div className="lg:flex hidden toc flex-[1.5] min-w-[238px] py-9 sticky top-16 h-[96.95vh]"> 
      {/* Remove max-height, rely on parent height and ScrollArea */}
      <div className="flex flex-col gap-3 w-full pl-2"> 
        {/* Remove flex-shrink-0 if present */}
        <h3 className="font-medium text-sm">On this page</h3> 
        <ScrollArea className="pb-2 pt-0.5 overflow-y-auto">
          {/* Keep the category rendering logic */}
          {techItems.length > 0 && (
            <>
              <h4 className="font-medium text-xs text-neutral-500 dark:text-neutral-400 mt-3 mb-1 pl-1">Tech</h4>
              <ul className="space-y-1 text-sm">
                {renderListItems(techItems)}
              </ul>
            </>
          )}
          {otherItems.length > 0 && (
            <>
              <h4 className="font-medium text-xs text-neutral-500 dark:text-neutral-400 mt-3 mb-1 pl-1">Other</h4>
              <ul className="space-y-1 text-sm">
                {renderListItems(otherItems)}
              </ul>
            </>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default KnowledgeToc; 