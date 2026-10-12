import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

/*
 * The film hero: one continuous steadicam take that carries Kuka from the
 * film set, through the studio door, into a live session and up to the mic.
 * The engine gets exactly ONE scene so the clip plays once across the whole
 * band. The five chapters read over the film are owned and rendered by the
 * ChapterRail (components/site/chapter-rail.tsx); the engine's own pinned
 * copy block is hidden in styles.css, so this file holds only the theme and
 * the one scene.
 *
 * Theme values are hex strings on purpose: this file is not in src/routes and
 * the engine consumes them as inline CSS custom properties. They are the same
 * four values as the tokens in styles.css (ink, paper, mid, accent).
 */

export const scrollScrubTheme: ScrollScrubTheme = {
  background: "#0E0E0E",
  ink: "#ECECEA",
  muted: "#8A8A86",
  accent: "#E3261C",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "walk",
    label: "Intro",
    title: "Mukuka “Kuka” Simwinga",
    body: "Creative producer, director, artist developer, content creator, A&R, music artist (KVKA). Melbourne.",
    scroll: 6.5,
    linger: 0,
    objectPosition: "50% 50%",
    mobileObjectPosition: "50% 50%",
    clip: "/assets/world/walk.mp4",
    poster: "/assets/world/walk-poster.jpg",
    mobileClip: "/assets/world/walk-mobile.mp4",
    mobilePoster: "/assets/world/walk-mobile-poster.jpg",
  },
];
