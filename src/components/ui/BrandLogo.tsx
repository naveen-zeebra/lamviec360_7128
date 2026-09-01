import React from 'react';

/**
 * LàmViệc360 wordmark, rebuilt from the raster logo so its colours are driven
 * by the site theme tokens (`--primary`, `--accent`, `--brand-green`) instead
 * of the off-palette red/yellow in the PNG. Scales crisply at any size — set
 * the overall size with a font-size utility on `className` (e.g. `text-2xl`).
 */
export default function BrandLogo({
  className = '',
  title = 'LàmViệc360',
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[0.08em] font-extrabold tracking-[-0.02em] leading-none whitespace-nowrap select-none ${className}`}
      role="img"
      aria-label={title}
    >
      <span className="text-primary">LàmViệc36</span>
      <CycleMark className="h-[0.86em] w-[0.86em] -mt-[0.03em] shrink-0" />
    </span>
  );
}

function CycleMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <g strokeWidth="3.6" strokeLinecap="round">
        {/* top arc */}
        <path d="M12 4 A8 8 0 0 1 19.19 15.51" stroke="var(--primary)" />
        {/* lower-right arc */}
        <path d="M18.93 16 A8 8 0 0 1 5.37 16.47" stroke="var(--accent)" />
        {/* lower-left arc */}
        <path d="M5.07 16 A8 8 0 0 1 11.44 4.02" stroke="var(--brand-green)" />
      </g>
    </svg>
  );
}
