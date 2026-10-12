import { GetInTouch } from "@/components/site/ctas";

export interface Chapter {
  id: string;
  /** Scroll band assigned to this chapter; the five sum to the engine's 650dvh. */
  band: string;
  align: "left" | "right";
  title: string;
  /** Smaller first line of the name lockup (chapter 1 only). */
  titlePre?: string;
  body: string;
  tags?: string[];
  cta?: boolean;
  /** Shows the recording light (the only accent use inside the film). */
  live?: boolean;
}

/* The single source of the chapter copy. Bands are 140 + 150 + 110 + 150 +
   100 = 650dvh so every pin, including the last, is a full 100dvh like the
   engine's own. Chapter ids are distinct from the engine's article id
   ("walk") so no id is duplicated in the document. */
export const chapters: Chapter[] = [
  {
    id: "set",
    band: "140dvh",
    align: "left",
    titlePre: "Mukuka “Kuka”",
    title: "Simwinga",
    body: "Creative producer, director, artist developer, content creator, A&R, music artist (KVKA). Melbourne.",
    cta: true,
  },
  {
    id: "nine-to-five",
    band: "150dvh",
    align: "left",
    title: "9to5 Production House",
    body: "Co-founder, director, producer. Creative work across music, branded campaigns and digital content.",
    tags: ["Creative Direction", "Production Management", "Campaign Development"],
  },
  {
    id: "death-star",
    band: "110dvh",
    align: "right",
    title: "Death Star",
    body: "Founder, artist developer. Helping artists build sustainable creative careers.",
    tags: ["A&R", "Release Strategy", "Audience Growth"],
  },
  {
    id: "session",
    band: "150dvh",
    align: "left",
    title: "KVKA",
    body: "Artist, songwriter, producer. 5M+ streams, 2M+ YouTube views, national headline tours across New Zealand.",
    tags: ["Triple J", "Rolling Stone AU/NZ", "Low Hum Festival"],
    live: true,
  },
  {
    id: "mic",
    band: "100dvh",
    align: "right",
    title: "See you at 9.",
    body: "Melbourne, Australia.",
    cta: true,
  },
];

/* The five chapters read over the single-shot film. Plain server-rendered
   HTML: each band pins its copy with position: sticky, so no JS is needed
   for the text to be readable. */
export function ChapterRail() {
  return (
    <ol className="walk-rail" aria-label="Introduction">
      {chapters.map((chapter, index) => (
        <li
          key={chapter.id}
          className="walk-rail__band"
          data-align={chapter.align}
          data-chapter={index + 1}
          style={{ minHeight: chapter.band }}
        >
          <div className="walk-rail__pin">
            <div className="walk-rail__copy">
              {index === 0 ? (
                <h1 className="walk-rail__title walk-rail__title--lockup">
                  <span className="walk-rail__title-pre">{chapter.titlePre}</span>{" "}
                  <span className="walk-rail__title-main">{chapter.title}</span>
                </h1>
              ) : (
                <h2 className="walk-rail__title">
                  {chapter.live ? <span className="rec-dot walk-rail__title-dot" aria-hidden="true" /> : null}
                  {chapter.title}
                </h2>
              )}

              <p className="walk-rail__body">{chapter.body}</p>

              {chapter.tags ? (
                <ul className="walk-rail__tags">
                  {chapter.tags.map((tag) => (
                    <li key={tag} className="walk-rail__tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              {chapter.cta ? (
                <div className="walk-rail__actions">
                  <GetInTouch />
                </div>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
