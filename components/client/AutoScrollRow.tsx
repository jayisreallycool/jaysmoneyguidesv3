'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useAutoScroll } from '@/components/client/useAutoScroll';

/**
 * A row of cards that drifts right-to-left in an endless loop.
 *
 * - Moves the real scroll position (useAutoScroll), so it is swipeable, pauses
 *   under a finger or mouse, and keeps running on phones with Reduce Motion or
 *   a battery saver on.
 * - Loops only when one set of cards is wider than the row; a short row just
 *   sits centred. The second copy of the cards exists only for the loop and is
 *   hidden from screen readers and keyboard.
 */
export function AutoScrollRow<T>({
  items,
  getKey,
  renderItem,
  speed = 28,
  label,
  minItems = 3,
}: {
  items: T[];
  getKey: (item: T) => string;
  /** `copy` is true for the duplicate used by the loop — make it inert */
  renderItem: (item: T, copy: boolean) => ReactNode;
  /** pixels per second */
  speed?: number;
  label: string;
  minItems?: number;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    const tr = track.current;
    if (!el || !tr) return;
    const check = () =>
      setLoop(items.length >= minItems && tr.scrollWidth / (loop ? 2 : 1) > el.clientWidth + 8);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items, loop, minItems]);

  useAutoScroll(scroller, { enabled: loop, speed });

  return (
    <div
      ref={scroller}
      className={`overflow-x-auto scrollbar-none touch-pan-x px-4 ${loop ? '' : 'sm:flex sm:justify-center'}`}
      role="list"
      aria-label={label}
    >
      <div ref={track} className="flex w-max gap-3 sm:gap-4 py-2">
        {(loop ? [...items, ...items] : items).map((item, i) => {
          const copy = i >= items.length;
          return (
            <div key={`${getKey(item)}-${i}`} role={copy ? undefined : 'listitem'} aria-hidden={copy || undefined} className="flex">
              {renderItem(item, copy)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
