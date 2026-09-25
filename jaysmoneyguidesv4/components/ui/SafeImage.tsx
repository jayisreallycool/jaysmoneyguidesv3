'use client';

import React, { useState, useEffect } from 'react';
import { getFirebaseStorageUrl } from '@/config/storageConfig';

interface SafeImageProps {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  // legacy props accepted for compatibility
  decoding?: 'auto' | 'async' | 'sync';
  fetchPriority?: 'high' | 'low' | 'auto';
  referrerPolicy?: string;
}

/**
 * Resilient image component using a plain <img> tag.
 *
 * Next/Image is intentionally avoided here — Firebase Storage URLs can
 * return 502s through the Vercel optimizer, and the unoptimized + fill
 * combination causes hydration mismatches that produce console noise.
 * The browser loads these URLs directly; Firebase handles delivery/caching.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  fallbackSrc = '',
  className,
  width,
  height,
  fill,
  sizes,
  priority = false,
  loading,
  decoding,
  fetchPriority,
}) => {
  const resolve = (s?: string): string => {
    if (!s) return fallbackSrc;
    try {
      return getFirebaseStorageUrl(s) || s;
    } catch {
      return s;
    }
  };

  const [imgSrc, setImgSrc] = useState<string>(() => resolve(src));
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setImgSrc(resolve(src));
    setStage(0);
    setFailed(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const handleError = () => {
    if (stage === 0 && src && imgSrc !== src) {
      setStage(1);
      setImgSrc(src);
    } else if (stage <= 1 && fallbackSrc && imgSrc !== fallbackSrc) {
      setStage(2);
      setImgSrc(fallbackSrc);
    } else {
      // All fallbacks exhausted — unmount the element entirely
      setFailed(true);
    }
  };

  // Nothing to render
  if (!imgSrc || failed) return null;

  const style: React.CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : {};

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      decoding={decoding ?? 'async'}
      fetchPriority={priority ? 'high' : (fetchPriority ?? 'auto')}
      width={width}
      height={height}
      sizes={sizes}
      style={style}
    />
  );
};
