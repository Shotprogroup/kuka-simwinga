import { useEffect, useState } from "react";
import { GetInTouch } from "@/components/site/ctas";
import { NineFiveMark } from "@/components/site/glyphs";

const NAV_LINKS = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#music", id: "music", label: "Music" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;

type Band = "ink" | "paper";

/* Fixed site nav. Server-renders as paper text over the ink film; once the
   page is live, an IntersectionObserver watches every [data-band] block in
   <main> and keys the nav colour off whichever band is under it. The header
   carries its own data-band for styling, so the query is scoped to <main>
   to keep the nav from observing itself. */
export function SiteNav() {
  const [band, setBand] = useState<Band>("ink");
  const [overFilm, setOverFilm] = useState(true);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const bands = Array.from(document.querySelectorAll<HTMLElement>("main [data-band]"));
    if (bands.length === 0) return;

    const live = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            live.add(entry.target as HTMLElement);
          } else {
            live.delete(entry.target as HTMLElement);
          }
        }
        /* Of the bands touching the top strip, the one furthest down the
           page is the one arriving under the nav. Rects are read fresh here:
           an entry's boundingClientRect is only a snapshot from the moment
           that entry fired. */
        let current: HTMLElement | null = null;
        let currentTop = Number.NEGATIVE_INFINITY;
        for (const el of live) {
          const top = el.getBoundingClientRect().top;
          if (top > currentTop) {
            currentTop = top;
            current = el;
          }
        }
        if (current) {
          setBand(current.dataset.band === "paper" ? "paper" : "ink");
          setOverFilm(current.dataset.film === "true");
        }
      },
      { rootMargin: "0px 0px -94% 0px", threshold: 0 },
    );
    bands.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActive(id);
          } else {
            setActive((current) => (current === id ? null : current));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-nav" data-band={band} data-over-film={overFilm ? "true" : "false"}>
      <div className="site-nav__left">
        <a className="site-nav__brand" href="#top" aria-label="Mukuka Simwinga, back to top">
          <NineFiveMark className="site-nav__mark" size={28} />
          <span className="site-nav__wordmark">Kuka</span>
        </a>
        <nav aria-label="Site">
          <ul className="site-nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  className="site-nav__link"
                  href={link.href}
                  data-active={active === link.id ? "true" : undefined}
                  aria-current={active === link.id ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="hidden md:block">
        <GetInTouch compact />
      </div>
    </header>
  );
}
