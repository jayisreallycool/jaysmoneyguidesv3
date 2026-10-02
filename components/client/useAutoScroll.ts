'use client';
import { useEffect, type RefObject } from 'react';

/**
 * Slowly auto-scrolls a horizontal overflow container right-to-left, looping
 * forever. The container's content must be rendered twice back to back; when
 * one full copy has scrolled past, the position wraps by exactly one copy so
 * the loop is invisible.
 *
 * It scrolls the real scroll position (not a CSS transform), so the row stays
 * swipeable: touching, dragging, wheeling or hovering pauses it, and it picks
 * up again from wherever the visitor left it.
 */
export function useAutoScroll(
  ref: RefObject<HTMLElement | null>,
  { enabled, speed = 28, resumeDelay = 2500 }: { enabled: boolean; speed?: number; resumeDelay?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft; // float position — scrollLeft itself is rounded
    let pausedUntil = 0;
    let holding = false; // finger down or mouse hovering
    let visible = true;

    /** Width of one copy = distance between the first item and its duplicate. */
    const copyWidth = () => {
      const track = el.firstElementChild as HTMLElement | null;
      const n = track ? track.children.length / 2 : 0;
      if (!track || n < 1) return 0;
      const a = track.children[0] as HTMLElement;
      const b = track.children[n] as HTMLElement;
      return b.offsetLeft - a.offsetLeft;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - (last || now), 64); // clamp after tab switches
      last = now;
      const w = copyWidth();
      if (!w) return;

      if (holding || now < pausedUntil || !visible || document.hidden) {
        // Visitor is in control: follow them, but keep the loop endless
        if (el.scrollLeft >= w) el.scrollLeft -= w;
        pos = el.scrollLeft;
        return;
      }

      pos += (speed * dt) / 1000;
      if (pos >= w) pos -= w;
      el.scrollLeft = pos;
    };

    const pause = () => { pausedUntil = performance.now() + resumeDelay; };
    const hold = () => { holding = true; };
    const release = () => { holding = false; pause(); };
    // Hover pause is for real mice only — a tap on a phone also fires a
    // 'mouse enter' with no matching 'leave', which would freeze the row.
    const hoverIn = (e: PointerEvent) => { if (e.pointerType === 'mouse') hold(); };
    const hoverOut = (e: PointerEvent) => { if (e.pointerType === 'mouse') release(); };

    el.addEventListener('touchstart', hold, { passive: true });
    el.addEventListener('touchend', release, { passive: true });
    el.addEventListener('touchcancel', release, { passive: true });
    el.addEventListener('pointerenter', hoverIn);
    el.addEventListener('pointerleave', hoverOut);
    el.addEventListener('wheel', pause, { passive: true });
    el.addEventListener('focusin', hold);
    el.addEventListener('focusout', release);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.1 });
    io.observe(el);

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener('touchstart', hold);
      el.removeEventListener('touchend', release);
      el.removeEventListener('touchcancel', release);
      el.removeEventListener('pointerenter', hoverIn);
      el.removeEventListener('pointerleave', hoverOut);
      el.removeEventListener('wheel', pause);
      el.removeEventListener('focusin', hold);
      el.removeEventListener('focusout', release);
    };
  }, [ref, enabled, speed, resumeDelay]);
}
