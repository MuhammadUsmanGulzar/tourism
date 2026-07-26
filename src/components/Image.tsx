import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  className?: string;
}

/**
 * Reusable, high-performance Image component optimized for web performance & accessibility.
 * Enforces async decoding, lazy loading (or high-priority eager load), and clean fallback handling.
 */
export default function Image({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  loading,
  decoding = 'async',
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : (loading || 'lazy')}
      decoding={decoding}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      onError={(e) => {
        // Fallback for broken/missing image paths
        const target = e.currentTarget;
        if (!target.src.endsWith('/assets/images/k2.webp')) {
          target.src = '/assets/images/k2.webp';
        }
      }}
      {...props}
    />
  );
}
