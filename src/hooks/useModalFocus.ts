import { useEffect, useRef } from 'react';

/**
 * Combined modal accessibility + scroll helper.
 *
 * While an overlay is open (`active === true`) this hook:
 *  1. Locks background page scrolling (body.modal-open) so the page behind
 *     the modal can't scroll — fixes the "scroll issue on modal focus".
 *  2. Moves keyboard focus into the dialog when it opens.
 *  3. Traps Tab / Shift+Tab focus inside the dialog.
 *  4. Closes the dialog on Escape.
 *  5. Restores focus to the element that was focused before opening.
 *
 * Attach `ref` to the OUTER overlay element (the fixed inset-0 div with
 * role="dialog").
 */
export function useModalFocus(active: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    // --- Body scroll lock -------------------------------------------------
    const previousOverflow = document.body.style.overflow;
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    // --- Focus management -------------------------------------------------
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = ref.current;

    const getFocusable = () =>
      Array.from(
        container?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

    // Focus the first focusable element (or the dialog itself) after paint.
    const focusTimer = window.setTimeout(() => {
      const els = getFocusable();
      (els[0] ?? container)?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !container) return;

      const els = getFocusable();
      if (els.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }
      const first = els[0];
      const last = els[els.length - 1];
      const activeEl = document.activeElement;

      if (e.shiftKey && (activeEl === first || activeEl === container)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.classList.remove('modal-open');
      document.body.style.overflow = previousOverflow;
      // Restore focus to the trigger element.
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        try {
          previouslyFocused.focus({ preventScroll: true });
        } catch {
          previouslyFocused.focus();
        }
      }
    };
  }, [active, onClose]);

  return ref;
}

export default useModalFocus;
