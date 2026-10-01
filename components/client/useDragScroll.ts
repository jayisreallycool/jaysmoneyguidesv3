'use client';
import { useRef, useCallback } from 'react';

/**
 * Drag-to-scroll for a horizontal container with a MOUSE (desktop).
 * Touch and pen are deliberately ignored: the browser already scrolls an
 * overflow-x-auto element natively (with momentum), and handling touch here
 * too fought the native scroll — pointer capture + manual scrollLeft made rows
 * jittery and could swallow vertical page swipes. Returns a ref + handlers to
 * spread onto the scroll container.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const state = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    state.current.down = true;
    state.current.moved = false;
    state.current.startX = e.clientX;
    state.current.scrollLeft = el.scrollLeft;
    el.setPointerCapture?.(e.pointerId);
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
    el.style.scrollSnapType = 'none'; // snapping fights a mouse drag
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el || !state.current.down) return;
    const dx = e.clientX - state.current.startX;
    if (Math.abs(dx) > 4) state.current.moved = true;
    el.scrollLeft = state.current.scrollLeft - dx;
  }, []);

  const endDrag = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !state.current.down) return;
    state.current.down = false;
    if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.style.cursor = '';
    el.style.userSelect = '';
    el.style.scrollSnapType = '';
  }, []);

  /** Call in a tab's onClick to suppress the click that ends a drag. */
  const didDrag = useCallback(() => state.current.moved, []);

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
      onPointerCancel: endDrag,
    },
    didDrag,
  };
}
