/* Each cover's real pixel height (all are 600 wide); the CSS crops every
   cover to a square, so the hint only has to be truthful, not uniform. */
const RELEASE_HEIGHTS = [600, 600, 593, 600, 614, 533, 598];

const RELEASES = RELEASE_HEIGHTS.map((height, i) => ({
  src: `/assets/releases/release-${i + 1}-web.jpg`,
  height,
}));

/* The seven covers repeated three times per track so a track is wider than
   any screen; two identical tracks follow each other and the animation moves
   exactly one track width, so the loop is continuous with no seam and no
   gap. Nothing pauses it. Under reduced motion the CSS turns it into a
   static scrollable row and hides the duplicate track. */
const TRACK = [...RELEASES, ...RELEASES, ...RELEASES];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="release-marquee__track" aria-hidden={hidden ? "true" : undefined}>
      {TRACK.map((release, i) => (
        <li key={`${release.src}-${i}`} className="release-cover">
          <img
            src={release.src}
            alt={hidden || i >= RELEASES.length ? "" : `KVKA release ${i + 1}`}
            width={600}
            height={release.height}
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}

export function ReleaseMarquee() {
  return (
    <>
      <div className="site-wrap">
        <p id="releases-title" className="label label--first mt-12 md:mt-16">
          Selected releases
        </p>
      </div>

      <section className="release-marquee mt-5" aria-labelledby="releases-title">
        <Track />
        <Track hidden />
      </section>
    </>
  );
}
