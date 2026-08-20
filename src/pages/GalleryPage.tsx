import { Link, useParams } from "react-router-dom";

interface GalleryImage { src: string; caption: string; }
interface Collection {
  slug: string;
  title: string;
  kicker: string;
  lead: string;
  hero: string;
  images: GalleryImage[];
}

const COLLECTIONS: Record<string, Collection> = {
  boston: {
    slug: "boston",
    title: "Boston, MA · 2026",
    kicker: "Becoming Students Again: AI",
    lead: "Hosted by Vaness Gardner and Spencer Karns. Three days on AI, ethics, and what it means to be a student again, from the Museum of Science to the hospitality suites.",
    hero: "/ami/boston-ai-hero.jpg",
    images: [
      { src: "/ami/boston-ai-hero.jpg",                 caption: "Boston 2026" },
      { src: "/ami/DSC_0916-1024x683.jpg",              caption: "Beg, Brag, What-If in session" },
      { src: "/ami/Joe-Gammal-fullsizeoutput_834b.jpg", caption: "The African proverb wall" },
      { src: "/ami/DSC_0894.jpg",                       caption: "Stan Gryskiewicz" },
      { src: "/ami/pdf-063.jpg",                        caption: "From the gathering" },
      { src: "/ami/pdf-070.jpg",                        caption: "From the gathering" },
      { src: "/ami/pdf-176.jpg",                        caption: "From the gathering" },
    ],
  },
  seattle: {
    slug: "seattle",
    title: "Seattle, WA · 2018",
    kicker: "Building Cities of Innovation",
    lead: "The community in the Emerald City, from The Spheres to the group photo everyone still shares.",
    hero: "/ami/DebraLucenti-SeattleGroupPhoto.jpg",
    images: [
      { src: "/ami/DebraLucenti-SeattleGroupPhoto.jpg", caption: "The Seattle group photo" },
      { src: "/ami/Joe-Gammal-IMG_1043.jpg",            caption: "The Spheres" },
      { src: "/ami/Joe-Gammal-IMG_1033.jpg",            caption: "Out in the city" },
    ],
  },
  greensboro: {
    slug: "greensboro",
    title: "Greensboro, NC · 2023",
    kicker: "Manufacturing's Next Chapter",
    lead: "Back in North Carolina, where AMI's roots run deep, for a gathering on the future of making things.",
    hero: "/ami/Greensboro.jpg",
    images: [
      { src: "/ami/Greensboro.jpg",                                      caption: "Greensboro 2023" },
      { src: "/ami/JimmyWilliams-CC116936-8510-4CE4-BB68-DC799C59C31D.jpg", caption: "From the gathering" },
      { src: "/ami/2016-04-06-18.30.34.jpg",                             caption: "AMI through the years" },
    ],
  },
  "beg-brag-what-if": {
    slug: "beg-brag-what-if",
    title: "Beg, Brag, What-If",
    kicker: "The signature ritual",
    lead: "Three asks, three offers, in three minutes. Each member shares what they need, what they've shipped, and the question that won't leave them alone. The room answers with intros, ideas, and immediate help.",
    hero: "/ami/DSC_0916-1024x683.jpg",
    images: [
      { src: "/ami/DSC_0916-1024x683.jpg",   caption: "The room responds" },
      { src: "/ami/stock/sticky-notes.jpg",  caption: "Asks and offers, captured" },
      { src: "/ami/stock/roundtable.jpg",    caption: "Small-group rounds" },
      { src: "/ami/stock/workshop.jpg",      caption: "Working the what-ifs" },
    ],
  },
};

const ORDER = ["boston", "seattle", "greensboro", "beg-brag-what-if"];

export default function GalleryPage() {
  const { slug } = useParams();
  const collection = slug ? COLLECTIONS[slug] : undefined;

  if (!collection) {
    return (
      <>
        <section className="section">
          <span className="kicker">Galleries</span>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 10px" }}>
            Moments, by gathering.
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            Photos from the cities and rituals that shaped the community. Click into any collection.
          </p>
          <div className="galleryWall">
            <span className="galleryWall__wire" aria-hidden />
            {ORDER.map((s) => {
              const c = COLLECTIONS[s];
              return (
                <Link key={s} to={`/gallery/${s}`} className="galleryFrame">
                  <span className="galleryFrame__nail" aria-hidden />
                  <span className="galleryFrame__photo">
                    <img src={c.hero} alt="" loading="lazy" />
                  </span>
                  <span className="galleryFrame__label">
                    <strong>{c.title}</strong>
                    <em>{c.kicker}</em>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="pageBanner">
        <img src={collection.hero} alt="" />
        <div className="pageBanner__scrim" />
        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">{collection.kicker}</span>
          <h1 className="pageBanner__title">{collection.title}</h1>
          <p className="pageBanner__lead">{collection.lead}</p>
        </div>
      </section>

      <section className="section">
        <Link to="/gallery" className="galleryBack">← All galleries</Link>
        <div className="galleryGrid">
          {collection.images.map((img) => (
            <figure key={img.src}>
              <img src={img.src} alt={img.caption} loading="lazy" />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
