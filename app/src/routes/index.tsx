import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { ScrollScrubScene } from "@/components/scroll-scrub/scroll-scrub";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import { SiteNav } from "@/components/site/site-nav";
import { ChapterRail } from "@/components/site/chapter-rail";
import { ReleaseMarquee } from "@/components/site/release-marquee";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  ContactStamp,
  FollowInstagram,
  GetInTouch,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/components/site/ctas";
import { InstagramGlyph, MailGlyph, NineFiveMark, PhoneGlyph, PinGlyph } from "@/components/site/glyphs";

/* The engine gets one scene (the single-shot walk). Its CTA is attached here,
   at module scope, so the scenes array keeps a stable identity. */
const scenes: ScrollScrubScene[] = scrollScrubScenes.map((scene, i) =>
  i === 0 || i === 4 ? { ...scene, actions: <GetInTouch /> } : scene,
);

/* ------------------------------------------------------------------ */
/* Copy, transcribed from the CV                                        */
/* ------------------------------------------------------------------ */

const METRICS = [
  { value: "5M+", label: "Streams", sub: "across digital platforms" },
  { value: "2M+", label: "YouTube views" },
  { value: "20K+", label: "Social following" },
];

/* The CV's own logo art, cropped from the document as monochrome PNGs at
   twice their printed size. width/height are the PNG's pixels; the row is
   laid out at the CV's proportions through --w (half the PNG width). */
interface Logo {
  name: string;
  src: string;
  width: number;
  height: number;
}

const PRESS_LOGOS: Logo[] = [
  { name: "Rolling Stone AU/NZ", src: "/assets/logos/press-rolling-stone.png", width: 275, height: 89 },
  { name: "VICE", src: "/assets/logos/press-vice.png", width: 160, height: 54 },
  { name: "Acclaim Magazine", src: "/assets/logos/press-acclaim.png", width: 170, height: 95 },
  { name: "NZ Herald", src: "/assets/logos/press-nz-herald.png", width: 107, height: 98 },
  { name: "Sniffers", src: "/assets/logos/press-sniffers.png", width: 188, height: 47 },
  { name: "Complex 16 Bars", src: "/assets/logos/press-complex.png", width: 176, height: 91 },
];

const CAMERA_LOGOS: Logo[] = [
  { name: "Ichpig", src: "/assets/logos/brand-ichpig.png", width: 286, height: 67 },
  { name: "Puma", src: "/assets/logos/brand-puma.png", width: 268, height: 139 },
  { name: "Palmer", src: "/assets/logos/brand-palmer.png", width: 254, height: 51 },
  { name: "Zero Latency VR", src: "/assets/logos/brand-zero-latency-vr.png", width: 312, height: 170 },
];

const PROFILE = [
  "I'm a multidisciplinary artist and creative working across music, fashion, content, culture and brand development, bringing ideas to life through storytelling, creative direction and world-building.",
  "Over the past decade I've built audiences, developed artists, produced campaigns, directed projects, created content and helped turn ideas into real-world outcomes. My experience spans independent music, creative production, artist development, fashion campaigns, live events and brand storytelling.",
  "As the co-founder of 9to5 Production House and founder of Death Star, I work across the entire creative process, from strategy and concept development through to production, rollout and audience engagement.",
  "I bring a mix of creative thinking, practical execution and strong people skills, backed by experience in sales, customer service, retail and education. I've led projects, built relationships, managed teams and learned how to communicate with a wide range of people and audiences.",
  "Experienced enough to contribute immediately, but still adaptable, coachable and always looking to improve.",
];

const NINE_TO_FIVE = {
  title: "9to5 Production House",
  meta: "Co-founder | Director | Producer",
  dates: "2024 to present",
  summary:
    "Co-founded a multidisciplinary production house delivering creative work across music, branded campaigns and digital content.",
  responsibilities: [
    "Creative Direction",
    "Production Management",
    "Campaign Development",
    "Artist Development",
    "Content Creation",
    "Rollout Planning",
    "Talent Coordination",
    "Creative Strategy",
    "Lighting & Visual Execution",
    "Project Delivery",
  ],
  contributions: [
    "Developed campaign concepts and visual direction for artists and brands.",
    "Led production planning, logistics and on-set execution.",
    "Managed talent, crews and project delivery.",
    "Oversaw multiple productions simultaneously.",
    "Built systems and workflow for creative projects from concept through to release.",
  ],
};

const DEATH_STAR = {
  title: "Death Star",
  meta: "Founder | Artist Developer",
  summary:
    "Artist development and creative consultancy focused on helping artists build sustainable creative careers.",
  responsibilities: [
    "Artist Development",
    "Branding",
    "A&R",
    "Release Strategy",
    "Creative Direction",
    "Audience Growth",
    "Content Planning",
    "Project Management",
  ],
};

const PROJECTS = [
  {
    title: "The Shuttle",
    role: "Creator & Producer",
    desc: "Live performance series showcasing emerging artists and creative talent.",
    src: "/assets/projects/the-shuttle.jpg",
  },
  {
    title: "Immortal Fate",
    role: "Campaign Production",
    desc: "Produced campaign content and creative assets.",
    src: "/assets/projects/immortal-fate.jpg",
  },
  {
    title: "Atala",
    role: "Campaign Production & Development",
    desc: "Produced campaign content and ongoing creative development.",
    src: "/assets/projects/atala.jpg",
  },
  {
    title: "9to5 Production House",
    role: "Creative Production",
    desc: "Creative production for music, brands and digital content.",
    src: "/assets/projects/9to5.jpg",
  },
];

/* In the CV's column order: the first five items are the left column, the
   last four the right. The list is laid out column-first to match. */
const MUSIC_SPAN = [
  "5M+ streams",
  "2M+ YouTube views",
  "National radio support",
  "International media coverage",
  "Festival appearances including Low Hum Festival",
  "Multiple national headline tours across New Zealand",
  "Scuse Me Tour 1 & Scuse Me Tour 2",
  "Independent releases",
  "Community building",
];
const MUSIC_SPAN_ROWS = 5;

const MEDIA_FEATURES = [
  "Rolling Stone AU/NZ",
  "VICE Australia",
  "Acclaim Magazine",
  "Acclaim: The New Locals",
  "NZ Herald Viva",
  "Sniffers",
  "Triple J Unearthed",
  "Complex: 16 Bars",
];

const RADIO_SUPPORT = [
  "Triple J",
  "Triple J Unearthed",
  "bFM",
  "Base FM",
  "George FM",
  "Radio New Zealand (RNZ)",
  "Radio Active",
  "RDU",
  "Radio One 91FM",
];

const SHARED_STAGES = ["GZA (Wu-Tang Clan)", "Rejjie Snow", "Wiki", "Keith Ape", "G-Flip", "DC The Don"];

const PERFORMED_AT = [
  "Low Hum Festival",
  "Silver Scroll Awards",
  "Brunswick Music Festival",
  "Footscray Music Festival",
  "White Night",
  "The Operatives Showcase",
  "Mirage Records Showcase",
];

const TOURS = ["Multiple national headline tours across New Zealand", "Scuse Me Tour 1", "Scuse Me Tour 2"];

const FOUNDATION = [
  {
    role: "Fashion Retail & Consumer Insight",
    org: "AS Colour",
    items: [
      "Product Storytelling",
      "Visual Merchandising",
      "Consumer Behaviour",
      "Fashion Retail",
      "Brand Representation",
      "Customer Engagement",
    ],
  },
  {
    role: "Sales & Relationship Building",
    org: "Karcher",
    items: [
      "Relationship Management",
      "Communication",
      "Negotiation",
      "Stakeholder Engagement",
      "Sales Strategy",
      "Customer Acquisition",
    ],
  },
  {
    role: "Customer Experience & Operations",
    org: "Hydro Tasmania",
    items: [
      "Customer Experience",
      "Problem Solving",
      "Process Improvement",
      "Training",
      "Team Support",
      "Operational Excellence",
    ],
  },
  {
    role: "Marketing & Lead Generation",
    org: "1Contact",
    items: [
      "Customer Acquisition",
      "Marketing Support",
      "Lead Generation",
      "Audience Understanding",
      "Relationship Building",
      "Campaign Execution",
    ],
  },
  {
    role: "Administration & Coordination",
    org: "Pola Psychology",
    items: [
      "Administration",
      "Organization",
      "Stakeholder Coordination",
      "Communication",
      "Front-of-House Operations",
    ],
  },
  {
    role: "Education & Engagement",
    org: "Sholem Aleichem College",
    items: ["Communication", "Facilitation", "Engagement", "Relationship Building", "Leadership", "Planning"],
  },
];

const SKILLS = [
  "Creative Direction",
  "Artist Development",
  "A&R",
  "Production Management",
  "Campaign Development",
  "Content Creation",
  "Brand Development",
  "Visual Storytelling",
  "Project Management",
  "Video Production",
  "Photography",
  "Videography",
  "Lighting",
  "Gaffing",
  "Editing",
  "Marketing",
  "Social Media",
  "Strategic Planning",
  "Relationship Building",
  "Sales",
  "Public Speaking",
  "Event Production",
];

const STUDY_AREAS = [
  "Content Marketing",
  "Social Media Strategy",
  "Campaign Planning",
  "Audience Communications",
  "Brand Consultancy",
  "Customer Journey Development",
];

const WHAT_I_BRING = [
  "I enjoy building things from the ground up. Whether it's developing an artist, producing a campaign, creating content, running an event or helping shape a brand, I'm at my best when turning ideas into something people genuinely connect with.",
  "My career has never followed a traditional path, but every role, creative or otherwise, has contributed to the same skillset: understanding people, communicating ideas and delivering work that resonates.",
];

/* ------------------------------------------------------------------ */
/* Pieces                                                               */
/* ------------------------------------------------------------------ */

function LogoImage({ logo }: { logo: Logo }) {
  return (
    <img
      className="wordmark__logo"
      src={logo.src}
      alt={logo.name}
      width={logo.width}
      height={logo.height}
      loading="lazy"
      decoding="async"
      style={{ "--w": `${logo.width / 2}px` } as CSSProperties}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Route                                                                */
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteNav />

      <main id="main" tabIndex={-1}>
        {/* 1. Film hero: one scene, five chapters read over it */}
        <div id="top" className="film" data-band="ink" data-film="true">
          <ScrollScrub scenes={scenes} theme={scrollScrubTheme} />
          <ChapterRail />
        </div>

        {/* 2. Career snapshot */}
        <section className="band band--ink" data-band="ink" aria-labelledby="snapshot-title">
          <div className="site-wrap">
            <h2 id="snapshot-title" className="eyebrow">
              Career snapshot
            </h2>
            <ul className="metrics">
              {METRICS.map((m) => (
                <li key={m.label} className="metric">
                  <span className="metric__value">{m.value}</span>
                  <span className="metric__label">{m.label}</span>
                  {m.sub ? <span className="metric__sub">{m.sub}</span> : null}
                </li>
              ))}
            </ul>
            <div className="mt-12 md:mt-16">
              <p className="label label--first">Featured in</p>
              <ul className="wordmark-row mt-5">
                {PRESS_LOGOS.map((logo) => (
                  <li key={logo.name} className="wordmark">
                    <LogoImage logo={logo} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Profile + creative experience */}
        <section id="work" className="band band--paper" data-band="paper" aria-labelledby="experience-title">
          <div className="site-wrap">
            <div className="section-head">
              <h2 id="experience-title" className="section-title text-4xl md:text-6xl leading-[0.92]">
                Creative experience
              </h2>
              <span className="section-head__rule" aria-hidden="true" />
            </div>

            <div className="experience">
              <div className="experience__profile">
                <h3 className="sub-title">Profile</h3>
                <div className="prose">
                  {PROFILE.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </div>

              <article className="role">
                <h3 className="sub-title">{NINE_TO_FIVE.title}</h3>
                <p className="role__meta">{NINE_TO_FIVE.meta}</p>
                <p className="role__meta">{NINE_TO_FIVE.dates}</p>
                <p className="role__summary">{NINE_TO_FIVE.summary}</p>
                <p className="label">Responsibilities include:</p>
                <ul className="dot-list">
                  {NINE_TO_FIVE.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="label">Key contributions:</p>
                <ul className="dot-list">
                  {NINE_TO_FIVE.contributions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="role">
                <h3 className="sub-title">{DEATH_STAR.title}</h3>
                <p className="role__meta">{DEATH_STAR.meta}</p>
                <p className="role__summary">{DEATH_STAR.summary}</p>
                <p className="label">Responsibilities include:</p>
                <ul className="dot-list">
                  {DEATH_STAR.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="experience-photos">
              <figure className="photo-frame photo-frame--crew">
                <img
                  src="/assets/photos/crew-on-set-web.jpg"
                  alt="Three crew on set reviewing a shot on a cinema camera"
                  width={1800}
                  height={2709}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* 4. Selected projects */}
        <section className="band band--paper" data-band="paper" aria-labelledby="projects-title">
          <div className="site-wrap">
            <div className="section-head">
              <h2 id="projects-title" className="section-title text-4xl md:text-6xl leading-[0.92]">
                Selected projects
              </h2>
              <span className="section-head__rule" aria-hidden="true" />
            </div>
            <ul className="project-grid">
              {PROJECTS.map((project) => (
                <li key={project.title} className="project-tile">
                  <div className="project-tile__frame">
                    <img
                      className="project-tile__img"
                      src={project.src}
                      alt={project.title}
                      width={1200}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="project-tile__caption" aria-hidden="true">
                      {project.role}
                    </span>
                  </div>
                  <h3 className="project-tile__title">{project.title}</h3>
                  <p className="project-tile__role">{project.role}</p>
                  <p className="project-tile__desc">{project.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Music career (KVKA) */}
        <section id="music" className="band band--paper" data-band="paper" aria-labelledby="music-title">
          <div className="site-wrap">
            <div className="section-head">
              <h2 id="music-title" className="section-title text-4xl md:text-6xl leading-[0.92]">
                Music career
              </h2>
              <span className="section-head__rule" aria-hidden="true" />
              <span className="section-tile">KVKA</span>
            </div>

            <div className="music">
              <div>
                <p className="lede">Artist, songwriter, producer and creative director.</p>
                <div className="prose mt-6">
                  <p>Born in Zambia, raised between the United Kingdom and New Zealand, and currently based in Melbourne.</p>
                </div>
                <p className="label">Built an independent music career spanning:</p>
                <ul className="dot-list dot-list--two" style={{ "--rows": MUSIC_SPAN_ROWS } as CSSProperties}>
                  {MUSIC_SPAN.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-10">
                  <FollowInstagram />
                </div>
              </div>

              <figure className="photo-frame photo-frame--live">
                <img
                  src="/assets/photos/kvka-live-bw-web.jpg"
                  alt="KVKA performing live, black and white"
                  width={1400}
                  height={1750}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <ul className="ruled-table mt-12 md:mt-16">
              <li className="ruled-table__col">
                <h3 className="sub-title">Selected media features</h3>
                <ul className="dot-list">
                  {MEDIA_FEATURES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
              <li className="ruled-table__col">
                <h3 className="sub-title">Radio support</h3>
                <ul className="dot-list">
                  {RADIO_SUPPORT.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
              <li className="ruled-table__col">
                <h3 className="sub-title">Performance highlights</h3>
                <p className="label label--first">Supported or shared stages with:</p>
                <ul className="dot-list">
                  {SHARED_STAGES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="label">Performed at:</p>
                <ul className="dot-list">
                  {PERFORMED_AT.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="label">Tours:</p>
                <ul className="dot-list">
                  {TOURS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <ReleaseMarquee />
        </section>

        {/* 6. In front of the camera + the foundation */}
        <section className="band band--paper pt-0" data-band="paper" aria-labelledby="camera-title">
          <div className="site-wrap">
            <div className="section-head">
              <h2 id="camera-title" className="section-title text-4xl md:text-6xl leading-[0.92]">
                In front of the camera
              </h2>
              <span className="section-head__rule" aria-hidden="true" />
            </div>
            <ul className="wordmark-row">
              {CAMERA_LOGOS.map((logo) => (
                <li key={logo.name} className="wordmark">
                  <LogoImage logo={logo} />
                </li>
              ))}
            </ul>
            <p className="wordmark-note">Plus various fashion and lifestyle campaigns</p>

            <div className="section-head mt-16 md:mt-24">
              <h2 className="section-title text-4xl md:text-6xl leading-[0.92]">The foundation</h2>
              <span className="section-head__rule" aria-hidden="true" />
            </div>
            <ul className="foundation-grid">
              {FOUNDATION.map((cell) => (
                <li key={cell.org} className="foundation-cell">
                  <h3 className="foundation-cell__role">
                    {cell.role}
                    <span className="foundation-cell__org">{cell.org}</span>
                  </h3>
                  <ul className="dot-list mt-4">
                    {cell.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Skills + professional development */}
        <section className="band band--paper pt-0" data-band="paper" aria-labelledby="skills-title">
          <div className="site-wrap">
            <div className="skills">
              <div>
                <div className="section-head">
                  <h2 id="skills-title" className="section-title text-4xl md:text-6xl leading-[0.92]">
                    Skills
                  </h2>
                  <span className="section-head__rule" aria-hidden="true" />
                </div>
                <ul className="chip-cloud">
                  {SKILLS.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="skills__dev">
                <div className="section-head">
                  <h2 className="section-title text-4xl md:text-6xl leading-[0.92]">Professional development</h2>
                  <span className="section-head__rule" aria-hidden="true" />
                </div>
                <div className="prose">
                  <p>HubSpot Digital Marketing Certification (In Progress)</p>
                </div>
                <p className="label">Current areas of study:</p>
                <ul className="dot-list">
                  {STUDY_AREAS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 8. What I bring + contact */}
        <section id="contact" className="band band--ink" data-band="ink" aria-labelledby="contact-title">
          <div className="site-wrap">
            <div className="closing">
              <h2 id="contact-title" className="section-title text-4xl md:text-6xl leading-[0.92]">
                What I bring
              </h2>
              <div className="prose">
                {WHAT_I_BRING.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
              <NineFiveMark className="closing__mark" size={224} />
            </div>

            <p className="signoff text-3xl md:text-5xl leading-[0.92]">See you at 9.</p>

            <h3 className="eyebrow">Contact</h3>
            <ul className="contact-rows">
              <li>
                <ContactStamp label="Based in" value="Melbourne, Australia" glyph={<PinGlyph />} />
              </li>
              <li>
                <ContactStamp href={CONTACT_PHONE_HREF} label="Phone" value={CONTACT_PHONE_DISPLAY} glyph={<PhoneGlyph />} />
              </li>
              <li>
                <ContactStamp href={`mailto:${CONTACT_EMAIL}`} label="Email" value={CONTACT_EMAIL} glyph={<MailGlyph />} />
              </li>
              <li>
                <ContactStamp
                  href={INSTAGRAM_URL}
                  external
                  label="Instagram"
                  value={INSTAGRAM_HANDLE}
                  glyph={<InstagramGlyph />}
                />
              </li>
            </ul>

            <footer className="site-footer">
              <span>Mukuka Simwinga</span>
              <span>Melbourne, Australia</span>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
