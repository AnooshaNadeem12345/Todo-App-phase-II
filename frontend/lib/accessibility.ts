// Accessibility utilities for the 3D Todo application

/**
 * Focus trap for modals and dialogs
 */
export const focusTrap = (containerRef: React.RefObject<HTMLElement>, isActive: boolean) => {
  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus first element when activated
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, isActive]);
};

/**
 * Announce dynamic content changes to screen readers
 */
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement is processed
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Utility to add ARIA attributes to 3D elements
 */
export const addAriaAttributes = (
  element: HTMLElement,
  label: string,
  description?: string
) => {
  element.setAttribute('role', 'figure');
  element.setAttribute('aria-label', label);
  
  if (description) {
    element.setAttribute('aria-describedby', description);
  }
};

/**
 * Keyboard navigation for 3D scene elements
 */
export const keyboardNavigationFor3D = (
  onArrowLeft: () => void,
  onArrowRight: () => void,
  onArrowUp: () => void,
  onArrowDown: () => void
) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          onArrowLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onArrowRight();
          break;
        case 'ArrowUp':
          e.preventDefault();
          onArrowUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onArrowDown();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onArrowLeft, onArrowRight, onArrowUp, onArrowDown]);
};