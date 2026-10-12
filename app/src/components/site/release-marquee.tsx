import { useState } from "react";

/* Each cover's real pixel height (all are 600 wide); the CSS crops every
   cover to a square, so the hint only has to be truthful, not uniform. */
const RELEASE_HEIGHTS = [600, 600, 593, 600, 614, 533, 598];

const RELEASES = RELEASE_HEIGHTS.map((height, i) => ({
  src: `/assets/releases/release-${i + 1}-web.jpg`,
  height,
}));

/* The seven release covers from the CV in a continuous marquee that does not stop on hover. Auto-moving
   content gets a visible Pause control (the only thing that stops it;
   under reduced motion the CSS turns it into a static scrollable row
   and hides the duplicate track. Covers carry no titles: the CV gives none. */
export function ReleaseMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div className="site-wrap">
        <div className="marquee-head mt-12 md:mt-16">
          <p id="releases-title" className="label label--first">
            Selected releases
          </p>
          <button type="button" className="marquee-toggle" onClick={() => setPaused((value) => !value)}>
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>

      <section
        className="release-marquee mt-5"
        aria-labelledby="releases-title"
        data-paused={paused ? "true" : "false"}
      >
        <ul className="release-marquee__track">
          {RELEASES.map((release, i) => (
            <li key={release.src} className="release-cover">
              <img
                src={release.src}
                alt={`KVKA release ${i + 1}`}
                width={600}
                height={release.height}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
        <ul className="release-marquee__track" aria-hidden="true">
          {RELEASES.map((release) => (
            <li key={release.src} className="release-cover">
              <img src={release.src} alt="" width={600} height={release.height} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
