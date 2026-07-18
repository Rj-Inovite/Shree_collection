// =====================================================================
// Shree Collection — Premium Luxury Home Page
// Handcrafted Elegance, Made with Love.
// File: Home.jsx  (React + Vite)
// =====================================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// ---------------------------------------------------------------------
// 1) STATIC DATA
// ---------------------------------------------------------------------

const HERO_SLIDES = [
  {
    src: "https://i.pinimg.com/474x/68/87/6e/68876ecba001a07cc552d4125cce2976.jpg",
    alt: "Hand embroidery close up with golden thread",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-OP0i0J5zCFqbHqWcuzRQ6-7catr_zDdFHTGI-e92zBt3-iAnzRil38GK&s=10",
    alt: "Floral thread work on pastel fabric",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUVQoRdXUArRUjfbcmEc_qFrj5OTtIB8YWI6Out1Tyw&s=10",
    alt: "Hand painted designer kurta",
  },
  {
    src: "https://i.pinimg.com/564x/88/99/0e/88990e7035e73632c707bfc0ca8c97d9.jpg",
    alt: "Embroidered saree with intricate motifs",
  },
  {
    src: "https://cdn0.weddingwire.in/article/2168/original/1280/jpg/98612-types-of-blouse-embroidery-designs-13.jpeg",
    alt: "Stone work on bridal blouse",
  },
];

const SERVICES = [
  {
    title: "Hand Embroidery",
    shortDesc: "Aari, zardosi & thread work",
    longDesc:
      "Aari, zardosi, thread work and mirror work — every stitch is placed by patient, loving hands trained in traditional Indian craft.",
    icon: "✶",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-OP0i0J5zCFqbHqWcuzRQ6-7catr_zDdFHTGI-e92zBt3-iAnzRil38GK&s=10",
    grad: "linear-gradient(135deg,#FFE9D6 0%,#FFD0C2 100%)",
  },
  {
    title: "Fabric Painting",
    shortDesc: "Florals, peacocks & motifs",
    longDesc:
      "Hand-painted florals, peacocks, Radha Krishna motifs and abstract art on fabric that lasts generations — soft, color-fast, beautiful.",
    icon: "❀",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1oaWAwHthtWdebNpeXkxz_khkr4Lu_UYIDSPl2cVhGKNQUR1MSNDOXBk&s=10",
    grad: "linear-gradient(135deg,#FFD9DC 0%,#FFC0A8 100%)",
  },
  {
    title: "Stone & Bead Work",
    shortDesc: "Crystal, kundan & sequins",
    longDesc:
      "Crystal, kundan, sequin and pearl embellishments that add a soft, royal sparkle to every bridal and occasion outfit.",
    icon: "✦",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-OP0i0J5zCFqbHqWcuzRQ6-7catr_zDdFHTGI-e92zBt3-iAnzRil38GK&s=10",
    grad: "linear-gradient(135deg,#FFE2B8 0%,#FFD089 100%)",
  },
  {
    title: "Bespoke Tailoring",
    shortDesc: "Made-to-measure perfection",
    longDesc:
      "Made-to-measure blouses, kurtas, lehengas and dresses — cut to your measurements, finished with our signature clean seams.",
    icon: "❖",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUVQoRdXUArRUjfbcmEc_qFrj5OTtIB8YWI6Out1Tyw&s=10",
    grad: "linear-gradient(135deg,#E8D8FF 0%,#C9B6F0 100%)"
  },
];

// 4 images for the Glimpse gallery
const COLLECTIONS = [
  {
    src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=95",
    title: "Floral Thread Embroidery",
  },
  {
    src: "https://images.unsplash.com/photo-1602573991155-21f0143bb45a?auto=format&fit=crop&w=1400&q=95",
    title: "Painted Designer Kurta",
  },
  {
    src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=95",
    title: "Embroidered Saree",
  },
  {
    src: "https://images.unsplash.com/photo-1610189025573-5a7c9f51f2a3?auto=format&fit=crop&w=1400&q=95",
    title: "Custom Bridal Blouse",
  },
];

// 3 items for Handcrafted With Heart — no text on images
const SHOWCASE = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1oaWAwHthtWdebNpeXkxz_khkr4Lu_UYIDSPl2cVhGKNQUR1MSNDOXBk&s=10",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUVQoRdXUArRUjfbcmEc_qFrj5OTtIB8YWI6Out1Tyw&s=10",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUVQoRdXUArRUjfbcmEc_qFrj5OTtIB8YWI6Out1Tyw&s=10",
  },
];

const FEATURES = [
  { title: "Handmade with Love", icon: "♥", desc: "Every piece is created stitch by stitch — never mass produced." },
  { title: "100% Custom Designs", icon: "✦", desc: "Send your idea, reference or sketch — we craft it just for you." },
  { title: "Premium Quality", icon: "❀", desc: "Only trusted threads, beads, stones and color-fast paints." },
  { title: "Personalised Orders", icon: "✶", desc: "Names, initials, dates, custom colors — fully personal to you." },
  { title: "Fine Detailing", icon: "❖", desc: "Clean finishing, neat backs, sharp motifs — premium by design." },
  { title: "Affordable Pricing", icon: "✿", desc: "Direct-from-artisan pricing — luxury that doesn't break the bank." },
  { title: "Traditional Craft", icon: "✤", desc: "Indian hand embroidery techniques passed through generations." },
  { title: "Customer Happiness", icon: "♥", desc: "Hundreds of happy customers and counting — your joy is our goal." },
];

const TESTIMONIALS = [
  {
    name: "Aanya Sharma",
    role: "Bride, Jaipur",
    avatar: "https://www.embroiderywale.com/wp-content/uploads/2025/07/JMD027-3-1300x1733.jpg",
    quote:
      "My bridal blouse and lehenga were nothing short of a dream. The stone work, the finish, the patience with my endless changes — I felt so cared for. I cannot recommend Shree Collection enough.",
  },
  {
    name: "Meera Iyer",
    role: "Designer, Mumbai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=95",
    quote:
      "I sent them a reference image of my grandmother's saree and they recreated the embroidery so beautifully I cried. Real craftsmanship, real people, real love in every stitch.",
  },
  {
    name: "Roshni Patel",
    role: "Customer, Ahmedabad",
    avatar: "https://www.zilikaa.com/cdn/shop/files/i-4_f07ce4ca-bc7d-4c8b-ad3a-69239f04c835.jpg?v=1746691573",
    quote:
      "The hand painted kurta I ordered is honestly the most beautiful thing in my wardrobe. Colors are so soft, the fabric feels rich, and the fit is perfect. Already planning my next order!",
  },
  {
    name: "Kavya Reddy",
    role: "Content Creator, Hyderabad",
    avatar: "https://hyderabad.ksethnic.com/blouse/2025/03/elegant-white-zardosi-work-raw-silk-blouse-1.webp",
    quote:
      "I bought personalised embroidery hoops as wedding favors for my sister. Every single guest asked where they came from. The packaging, the detailing — premium from start to finish.",
  },
  {
    name: "Sneha Kapoor",
    role: "Doctor, Delhi",
    avatar: "https://tiimg.tistatic.com/fp/1/005/043/plain-cotton-embroidered-bed-sheets-829.jpg",
    quote:
      "I have ordered three blouses and a bedsheet set from Shree Collection. Every single piece has been flawless. The team is warm, the delivery is fast, and the work is just stunning.",
  },
];

const STATS = [
  { value: 1250, suffix: "+", label: "Happy Customers" },
  { value: 3800, suffix: "+", label: "Custom Orders Completed" },
  { value: 9500, suffix: "+", label: "Handcrafted Designs Created" },
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 4.9, suffix: "★", label: "Average Customer Rating", decimals: 1 },
];

// ---------------------------------------------------------------------
// 2) REUSABLE SUB-COMPONENTS
// ---------------------------------------------------------------------

const SectionHeading = ({ eyebrow, title, subtitle, light }) => (
  <div className={`sc-section-heading ${light ? "is-light" : ""}`}>
    {eyebrow && <span className="sc-eyebrow">{eyebrow}</span>}
    <h2 className="sc-h2">{title}</h2>
    {subtitle && <p className="sc-subtitle">{subtitle}</p>}
    <div className="sc-heading-divider" aria-hidden="true">
      <span className="sc-div-line" />
      <span className="sc-div-flower">❀</span>
      <span className="sc-div-line" />
    </div>
  </div>
);

// IntersectionObserver-based reveal hook
const useReveal = (options = { threshold: 0.12 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      options
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, visible];
};

// ---------------------------------------------------------------------
// 3) MAIN HOME COMPONENT
// ---------------------------------------------------------------------

const Home = () => {
  // Hero slider
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  // Section reveal triggers
  const [craftRef, craftVisible] = useReveal();
  const [serviceRef, serviceVisible] = useReveal();
  const [galleryRef, galleryVisible] = useReveal();
  const [whyRef, whyVisible] = useReveal();
  const [showcaseRef, showcaseVisible] = useReveal();
  const [testiRef, testiVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  // Testimonials slider
  const [tIndex, setTIndex] = useState(0);
  const nextTesti = () => setTIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prevTesti = () => setTIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Counters
  const [counted, setCounted] = useState(false);
  useEffect(() => {
    if (statsVisible) setCounted(true);
  }, [statsVisible]);

  // Lightbox for any image click (collections + showcase)
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  // Compute visible testimonials
  const visibleTestimonials = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(TESTIMONIALS[(tIndex + i) % TESTIMONIALS.length]);
    }
    return arr;
  }, [tIndex]);

  return (
    <main className="sc-home">
      {/* ============== 1. HERO BANNER ============== */}
      <section className="sc-hero" id="home">
        {/* Background slider — sharp HD images, no blur */}
        <div className="sc-hero-slider">
          {HERO_SLIDES.map((s, i) => (
            <div
              key={i}
              className={`sc-hero-slide ${i === slide ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${s.src})` }}
              aria-hidden={i !== slide}
            />
          ))}
          {/* Soft warm gradient — keeps text readable, doesn't blur photo */}
          <div className="sc-hero-overlay" />
          {/* Vignette for premium feel */}
          <div className="sc-hero-vignette" />
        </div>

        {/* Floating decorative SVG threads + florals */}
        <div className="sc-hero-threads" aria-hidden="true">
          <svg className="sc-thread sc-thread-1" viewBox="0 0 200 200">
            <path
              d="M20,100 C50,40 150,160 180,100"
              fill="none"
              stroke="#C8A96A"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />
          </svg>
          <svg className="sc-thread sc-thread-2" viewBox="0 0 200 200">
            <path
              d="M10,150 Q90,30 190,150"
              fill="none"
              stroke="#E8C8C2"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="2 8"
            />
          </svg>
          <svg className="sc-thread sc-thread-3" viewBox="0 0 200 200">
            <path
              d="M30,40 C100,180 140,20 180,170"
              fill="none"
              stroke="#6F8A5E"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="3 7"
            />
          </svg>
          <span className="sc-float-flower sc-flower-1">❀</span>
          <span className="sc-float-flower sc-flower-2">✿</span>
          <span className="sc-float-flower sc-flower-3">✦</span>
          <span className="sc-float-flower sc-flower-4">❖</span>
          <span className="sc-float-flower sc-flower-5">✦</span>
        </div>

        {/* Hero text content */}
        <div className="sc-hero-content">
          <span className="sc-hero-eyebrow">~ Handcrafted with love since 2013 ~</span>
          <h1 className="sc-hero-title">
            Handcrafted <em>Elegance</em>,
            <br /> Made with <span className="sc-gold">Love</span>.
          </h1>
          <p className="sc-hero-sub">
            From intricate aari embroidery to soft hand-painted florals, every design at
            Shree Collection is created carefully by skilled hands — with creativity,
            patience and a whole lot of passion.
          </p>
          <div className="sc-hero-cta">
            <Link to="/collections" className="sc-btn sc-btn-primary">
              <span>Explore Collection</span>
              <span className="sc-btn-icon">→</span>
            </Link>
            <a href="#contact" className="sc-btn sc-btn-ghost">
              <span className="sc-btn-icon">✦</span>
              <span>Custom Order</span>
            </a>
          </div>

          {/* Hero stats inline */}
          <div className="sc-hero-stats">
            <div className="sc-hero-stat">
              <strong>1250+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="sc-hero-stat-divider" />
            <div className="sc-hero-stat">
              <strong>12+</strong>
              <span>Years of Artistry</span>
            </div>
            <div className="sc-hero-stat-divider" />
            <div className="sc-hero-stat">
              <strong>4.9★</strong>
              <span>Customer Rating</span>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="sc-hero-dots">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                className={`sc-dot ${i === slide ? "is-active" : ""}`}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <a href="#craft" className="sc-scroll-cue" aria-label="Scroll down">
          <span>Scroll</span>
          <div className="sc-scroll-line" />
        </a>
      </section>

      {/* ============== 2. OUR CRAFTSMANSHIP ============== */}
      <section className="sc-craft" ref={craftRef} id="craft">
        <div className="sc-container">
          <div className={`sc-craft-grid ${craftVisible ? "is-visible" : ""}`}>
            <div className="sc-craft-image">
              <div className="sc-craft-frame">
                <img
                  src="https://tiimg.tistatic.com/fp/1/005/043/plain-cotton-embroidered-bed-sheets-829.jpg"
                  alt="Hand embroidery in progress"
                  loading="lazy"
                />
                <div className="sc-craft-badge">
                  <span className="sc-badge-num">12+</span>
                  <span className="sc-badge-text">Years of Artistry</span>
                </div>
              </div>
              <span className="sc-float-deco sc-deco-1">❀</span>
              <span className="sc-float-deco sc-deco-2">✦</span>
            </div>

            <div className="sc-craft-content">
              <span className="sc-eyebrow">Our Craftsmanship</span>
              <h2 className="sc-h2">
                A studio where every <em>stitch tells a story</em>.
              </h2>
              <p className="sc-lead">
                Shree Collection is a homegrown Indian handcraft studio specialising in
                embroidery, fabric painting, stone work, custom blouses, designer kurtas,
                lehengas and personalised gifts. We blend traditional techniques with a
                modern, feminine aesthetic.
              </p>
              <ul className="sc-craft-list">
                <li>
                  <span className="sc-li-icon">✶</span>
                  <div>
                    <strong>Hand Embroidery & Aari Work</strong>
                    <p>Intricate thread, mirror, sequin and zardosi embroidery for sarees, blouses, lehengas and home decor.</p>
                  </div>
                </li>
                <li>
                  <span className="sc-li-icon">❀</span>
                  <div>
                    <strong>Fabric Painting</strong>
                    <p>Hand painted florals, peacocks, Radha Krishna, mandalas and abstract art on fabric.</p>
                  </div>
                </li>
                <li>
                  <span className="sc-li-icon">✦</span>
                  <div>
                    <strong>Stone, Bead & Sequin Work</strong>
                    <p>Premium crystal, kundan and pearl embellishments for bridal and occasion wear.</p>
                  </div>
                </li>
                <li>
                  <span className="sc-li-icon">❖</span>
                  <div>
                    <strong>Custom Tailoring & Personalisation</strong>
                    <p>Made-to-measure blouses, custom outfits, name embroidery, monograms and personalised gifts.</p>
                  </div>
                </li>
              </ul>
              <Link to="/collections" className="sc-link-arrow">
                Explore our work <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 3. OUR SERVICES (4 signature) ============== */}
      <section className="sc-services" ref={serviceRef} id="services">
        <div className="sc-container">
          <SectionHeading
            eyebrow="What We Create"
            title="Our Signature Services"
            subtitle="Four signature crafts we pour our heart into — every piece is handcrafted with patience, premium materials and love."
          />

          <div className={`sc-services-grid ${serviceVisible ? "is-visible" : ""}`}>
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className="sc-service-card"
                style={{ background: s.grad, animationDelay: `${i * 110}ms` }}
              >
                <div className="sc-service-corner sc-corner-tl">❀</div>
                <div className="sc-service-corner sc-corner-br">❀</div>
                <div className="sc-service-img">
                  <img src={s.img} alt={s.title} loading="lazy" />
                </div>
                <div className="sc-service-icon" aria-hidden="true">
                  {s.icon}
                </div>
                <h3 className="sc-service-title">{s.title}</h3>
                <p className="sc-service-short">{s.shortDesc}</p>
                <p className="sc-service-desc">{s.longDesc}</p>
                <Link to="/collections" className="sc-service-cta">
                  Enquire Now <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 4. A GLIMPSE INTO OUR WORK (4 images) ============== */}
      <section className="sc-collections" ref={galleryRef} id="collections">
        <div className="sc-container">
          <SectionHeading
            eyebrow="Featured Gallery"
            title="A Glimpse Into Our Work"
            subtitle="A curated peek at recent pieces — embroidery, fabric painting, stone work and bridal wear. Click any image to view it larger."
          />

          <div className={`sc-glimpse-grid ${galleryVisible ? "is-visible" : ""}`}>
            {COLLECTIONS.map((c, i) => (
              <button
                key={c.title}
                className="sc-glimpse-tile"
                onClick={() => setLightbox(c.src)}
                aria-label={`View ${c.title}`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <img src={c.src} alt={c.title} loading="lazy" />
                <span className="sc-glimpse-zoom" aria-hidden="true">+</span>
                <span className="sc-glimpse-glow" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="sc-glimpse-more-wrap">
            <Link to="/collections" className="sc-btn sc-btn-primary sc-btn-lg">
              <span>See More</span>
              <span className="sc-btn-icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============== 5. WHY CHOOSE US ============== */}
      <section className="sc-why" ref={whyRef} id="why">
        <div className="sc-container">
          <SectionHeading
            eyebrow="Why Shree Collection"
            title="Why Customers Choose Us"
            subtitle="Premium handcraft, transparent pricing, and a deeply personal experience — that's the Shree promise."
          />

          <div className={`sc-why-grid ${whyVisible ? "is-visible" : ""}`}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="sc-why-card"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="sc-why-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="sc-why-shine" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 6. HANDCRAFTED WITH HEART (3 images) ============== */}
      <section className="sc-showcase" ref={showcaseRef} id="showcase">
        <div className="sc-container">
          <SectionHeading
            eyebrow="The Artistry"
            title="Handcrafted With Heart"
            subtitle="Three signature pieces that capture everything we love about our craft — pure, hand-made, beautiful."
          />

          <div className={`sc-showcase-grid ${showcaseVisible ? "is-visible" : ""}`}>
            {SHOWCASE.map((s, i) => (
              <button
                key={i}
                className="sc-showcase-tile"
                onClick={() => setLightbox(s.src)}
                aria-label={`View handcrafted piece ${i + 1}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <img src={s.src} alt={`Handcrafted piece ${i + 1}`} loading="lazy" />
                <span className="sc-showcase-zoom" aria-hidden="true">+</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 7. CUSTOMER TESTIMONIALS ============== */}
      <section className="sc-testimonials" ref={testiRef} id="testimonials">
        <div className="sc-container">
          <SectionHeading
            eyebrow="Loved by Customers"
            title="What People Are Saying"
            subtitle="Real words from real customers — brides, designers, gift-givers and handcraft lovers."
          />

          <div className={`sc-testi-wrap ${testiVisible ? "is-visible" : ""}`}>
            <div className="sc-testi-grid">
              {visibleTestimonials.map((t, i) => (
                <article key={`${t.name}-${tIndex}-${i}`} className="sc-testi-card">
                  <span className="sc-quote">”</span>
                  <p className="sc-testi-text">{t.quote}</p>
                  <div className="sc-testi-stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <div className="sc-testi-user">
                    <img src={t.avatar} alt={t.name} loading="lazy" />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="sc-testi-controls">
              <button className="sc-testi-btn" onClick={prevTesti} aria-label="Previous testimonial">
                ←
              </button>
              <div className="sc-testi-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`sc-tdot ${i === tIndex ? "is-active" : ""}`}
                    onClick={() => setTIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button className="sc-testi-btn" onClick={nextTesti} aria-label="Next testimonial">
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 8. STATISTICS COUNTER ============== */}
      <section className="sc-stats" ref={statsRef} id="stats">
        <div className="sc-container">
          <div className={`sc-stats-grid ${statsVisible ? "is-visible" : ""}`}>
            {STATS.map((s, i) => (
              <div key={s.label} className="sc-stat" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="sc-stat-value">
                  {counted ? (
                    <CountUp end={s.value} decimals={s.decimals || 0} />
                  ) : (
                    "0"
                  )}
                  <span className="sc-stat-suffix">{s.suffix}</span>
                </span>
                <span className="sc-stat-label">{s.label}</span>
                <span className="sc-stat-bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 9. CALL TO ACTION ============== */}
      <section className="sc-cta" ref={ctaRef} id="contact">
        <div className="sc-cta-border" aria-hidden="true">
          <span>❀</span>
          <span>✿</span>
          <span>❀</span>
          <span>✿</span>
          <span>❀</span>
          <span>✿</span>
          <span>❀</span>
          <span>✿</span>
        </div>
        <div className="sc-container">
          <div className={`sc-cta-content ${ctaVisible ? "is-visible" : ""}`}>
            <span className="sc-eyebrow">Let's Create Together</span>
            <h2 className="sc-cta-title">
              Got an idea? <em>Let's turn it</em>
              <br /> into something <span className="sc-gold">beautiful.</span>
            </h2>
            <p className="sc-cta-sub">
              Whether it's a bridal blouse, a hand painted dupatta, a personalised gift
              or a full custom outfit — we can't wait to craft something truly special
              for you. Every piece, made with love.
            </p>
            <div className="sc-cta-buttons">
              <a href="#contact-form" className="sc-btn sc-btn-primary sc-btn-lg">
                <span>Start Your Custom Order</span>
                <span className="sc-btn-icon">✦</span>
              </a>
              <Link to="/collections" className="sc-btn sc-btn-ghost sc-btn-lg">
                <span>Browse Collection</span>
                <span className="sc-btn-icon">→</span>
              </Link>
            </div>
            <div className="sc-cta-meta">
              <div className="sc-cta-meta-item">
                <span>✶</span> Free consultation
              </div>
              <div className="sc-cta-meta-item">
                <span>✶</span> Pan-India shipping
              </div>
              <div className="sc-cta-meta-item">
                <span>✶</span> Made with love
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== LIGHTBOX ============== */}
      {lightbox && (
        <div className="sc-lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button className="sc-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            ×
          </button>
          <img src={lightbox} alt="Preview" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
};

// CountUp sub-component
const CountUp = ({ end, duration = 1800, decimals = 0 }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(end * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setVal(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return <>{val.toFixed(decimals)}</>;
};

export default Home;
