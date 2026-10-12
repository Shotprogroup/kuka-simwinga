import type { CSSProperties, ReactNode } from "react";

export const CONTACT_EMAIL = "Mukukasim@gmail.com";
export const CONTACT_PHONE_DISPLAY = "0435 398 086";
export const CONTACT_PHONE_HREF = "tel:+61435398086";
export const INSTAGRAM_HANDLE = "@Angryboykv";
export const INSTAGRAM_URL = "https://www.instagram.com/angryboykv";

/* Garment: viewfinder. Four corner brackets close around the label on hover,
   turn signal red while active or focused. */
export function GetInTouch({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={compact ? "cta-viewfinder cta-viewfinder--compact" : "cta-viewfinder"}
      href={`mailto:${CONTACT_EMAIL}`}
    >
      <span className="cta-viewfinder__label">Get in touch</span>
    </a>
  );
}

/* Garment: waveform underline. A row of bars sits as a dotted rule under the
   label and swells into a moving waveform on hover. */
const WAVE_BARS = [4, 9, 14, 7, 18, 11, 22, 9, 15, 6, 12, 20, 8, 16, 10, 5, 13, 19, 7, 11, 16, 6, 9, 14];

export function FollowInstagram() {
  return (
    <a className="cta-waveform" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
      <span className="cta-waveform__label">Follow {INSTAGRAM_HANDLE}</span>
      <svg
        className="cta-waveform__wave"
        viewBox="0 0 96 24"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {WAVE_BARS.map((h, i) => (
          <rect
            key={i}
            x={i * 4 + 1}
            y={12 - h / 2}
            width="2"
            height={h}
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </svg>
    </a>
  );
}

/* Garment: stamp. The row imprints (scale + skew) while pressed. */
export function ContactStamp({
  href,
  external = false,
  label,
  value,
  glyph,
}: {
  href?: string;
  external?: boolean;
  label: string;
  value: string;
  glyph: ReactNode;
}) {
  const inner = (
    <>
      <span className="contact-stamp__glyph" aria-hidden="true">
        {glyph}
      </span>
      <span className="contact-stamp__label">{label}</span>
      <span className="contact-stamp__value">{value}</span>
    </>
  );

  if (!href) {
    return <div className="contact-stamp">{inner}</div>;
  }

  if (external) {
    return (
      <a className="contact-stamp" href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <a className="contact-stamp" href={href}>
      {inner}
    </a>
  );
}
