import type { SVGProps } from "react";

type GlyphProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
  focusable: "false",
} as const;

export function PinGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0c0 4.9-6.5 10.5-6.5 10.5z" />
      <circle cx="12" cy="11" r="2.4" />
    </svg>
  );
}

export function PhoneGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 3h4l2 5-2.5 1.5a11.5 11.5 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function MailGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 7 9 6.5L21 7" />
    </svg>
  );
}

export function InstagramGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function NineFiveMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <img
      className={className}
      src="/assets/brand/nine-to-five-mark.png"
      alt="9+5 mark"
      width={size}
      height={size}
      decoding="async"
    />
  );
}
