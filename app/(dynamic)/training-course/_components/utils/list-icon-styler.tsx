"use client"
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FaCheck } from "react-icons/fa6";

interface ListIconStylerProps {
  content: string;
}

export default function ListIconStyler({ content }: ListIconStylerProps) {
  useEffect(() => {
    const roots: Array<{ root: ReturnType<typeof createRoot>; container: HTMLElement }> = [];
    
    // Function to add icons to list items
    const addIconsToListItems = () => {
      const overviewText = document.querySelector('.overview-text');
      if (!overviewText) return;

      const listItems = overviewText.querySelectorAll('li');
      
      listItems.forEach((li) => {
        // Check if icon already exists to avoid duplicates
        if (li.querySelector('.list-icon-wrapper')) return;
        
        // Create wrapper for the icon
        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'list-icon-wrapper';
        iconWrapper.style.cssText = `
          position: absolute;
          left: 0;
          top: 7px;
          color: #10b981;
          display: inline-flex;
          align-items: center;
          font-size: 15px;
        `;
        
        // Create a container for React icon
        const iconContainer = document.createElement('span');
        iconWrapper.appendChild(iconContainer);
        
        // Insert the wrapper before the first child of li
        if (li.firstChild) {
          li.insertBefore(iconWrapper, li.firstChild);
        } else {
          li.appendChild(iconWrapper);
        }
        
        // Render React icon into the container
        const root = createRoot(iconContainer);
        root.render(<FaCheck />);
        roots.push({ root, container: iconContainer });
      });
    };

    // Add icons when component mounts or content changes
    addIconsToListItems();
    
    // Set up MutationObserver to handle dynamic content changes
    const overviewText = document.querySelector('.overview-text');
    if (overviewText) {
      const observer = new MutationObserver(() => {
        // Debounce to avoid excessive calls
        setTimeout(addIconsToListItems, 100);
      });
      
      observer.observe(overviewText, {
        childList: true,
        subtree: true,
        characterData: true
      });
      
      return () => {
        observer.disconnect();
        // Clean up React roots
        roots.forEach(({ root, container }) => {
          try {
            root.unmount();
          } catch (e) {
            // Ignore unmount errors
          }
        });
        roots.length = 0;
      };
    }
    
    // Also call when DOM is ready (fallback for dynamic content)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addIconsToListItems);
      return () => document.removeEventListener('DOMContentLoaded', addIconsToListItems);
    }
  }, [content]);

  return null; // This component doesn't render anything
}

