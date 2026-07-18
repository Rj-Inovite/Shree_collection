// =====================================================================
// Shree Collection — Premium Luxury Home Page
// Handcrafted Elegance, Made with Love.
// File: Home.jsx  (React + Vite)
// =====================================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Home.css";

// ---------------------------------------------------------------------
// 1) STATIC DATA — defined outside the component so they're not
//    re-created on every render. Easy to maintain, easy to extend.
// ---------------------------------------------------------------------

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1606293459275-87df2057c1ec?auto=format&fit=crop&w=1920&q=80",
    alt: "Hand embroidery close up with golden thread",
  },
  {
    src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=80",
    alt: "Floral thread work on pastel fabric",
  },
  {
    src: "https://images.unsplash.com/photo-1602573991155-21f0143bb45a?auto=format&fit=crop&w=1920&q=80",
    alt: "Hand painted designer kurta",
  },
  {
    src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1920&q=80",
    alt: "Embroidered saree with intricate motifs",
  },
  {
    src: "https://images.unsplash.com/photo-1610189025573-5a7c9f51f2a3?auto=format&fit=crop&w=1920&q=80",
    alt: "Stone work on bridal blouse",
  },
  {
    src: "https://images.unsplash.com/photo-1610189000264-3f06d7be0b14?auto=format&fit=crop&w=1920&q=80",
    alt: "Embroidery hoop with colorful threads",
  },
];

const HERO_COLLAGE = [
  "https://images.unsplash.com/photo-1606293459207-fff61ceaeb38?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1620331317943-ee5b5a4c3a4b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1606293459407-44db5d2cd72f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=600&q=80",
];

const SERVICES = [
  {
    title: "Hand Embroidery",
    desc: "Aari, zardosi, thread work and mirror work — every stitch is placed by patient, loving hands.",
    icon: "✶",
    img: "https://images.unsplash.com/photo-1606293459275-87df2057c1ec?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#F6E6DC 0%,#FFFDF8 100%)",
  },
  {
    title: "Fabric Painting",
    desc: "Hand-painted florals, peacocks, Radha Krishna motifs and abstract art on fabric that lasts generations.",
    icon: "❀",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#E8C8C2 0%,#F8F4EC 100%)",
  },
  {
    title: "Stone & Bead Work",
    desc: "Crystal, kundan, sequin and pearl embellishments that add a soft, royal sparkle to every outfit.",
    icon: "✦",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#F8F4EC 0%,#F6E6DC 100%)",
  },
  {
    title: "Custom Blouse Stitching",
    desc: "Designer blouses tailored to your measurements, with custom necklines, sleeves and embroidery patterns.",
    icon: "❖",
    img: "https://images.unsplash.com/photo-1610189025573-5a7c9f51f2a3?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#FFFDF8 0%,#E8C8C2 100%)",
  },
  {
    title: "Designer Kurtas",
    desc: "Hand painted and embroidered kurtas for festivals, haldi, mehendi, casual elegance and gifting.",
    icon: "❀",
    img: "https://images.unsplash.com/photo-1602573991155-21f0143bb45a?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#F6E6DC 0%,#E8C8C2 100%)",
  },
  {
    title: "Embroidered Lehengas",
    desc: "Bridal and occasion lehengas with intricate hand embroidery, scallop edges and rich finishing.",
    icon: "✶",
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#F8F4EC 0%,#FFFDF8 100%)",
  },
  {
    title: "Custom Orders",
    desc: "Send us your design reference, fabric or idea — we'll turn it into a one-of-a-kind handcrafted piece.",
    icon: "✦",
    img: "https://images.unsplash.com/photo-1606293459407-44db5d2cd72f?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#E8C8C2 0%,#F6E6DC 100%)",
  },
  {
    title: "Personalized Gifts",
    desc: "Embroidered hoops, hand-painted tote bags, name initials, baby gifts — thoughtful, personal, handmade.",
    icon: "❖",
    img: "https://images.unsplash.com/photo-1606293459207-fff61ceaeb38?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#FFFDF8 0%,#F8F4EC 100%)",
  },
  {
    title: "Decorative Wall Art",
    desc: "Framed embroidery hoops, fabric paintings and tapestries that bring handcrafted warmth to your walls.",
    icon: "✶",
    img: "https://images.unsplash.com/photo-1620331317943-ee5b5a4c3a4b?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#F6E6DC 0%,#F8F4EC 100%)",
  },
  {
    title: "Bridal Customization",
    desc: "Bridal blouses, lehengas, dupattas and trousseau pieces — designed, embroidered and finished with love.",
    icon: "✦",
    img: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=80",
    grad: "linear-gradient(135deg,#F8F4EC 0%,#E8C8C2 100%)",
  },
];

const COLLECTIONS = [
  {
    src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    title: "Floral Thread Embroidery",
    tag: "Thread Work",
  },
  {
    src: "https://images.unsplash.com/photo-1606293459275-87df2057c1ec?auto=format&fit=crop&w=800&q=80",
    title: "Peacock Motif Embroidery",
    tag: "Hand Embroidery",
  },
  {
    src: "https://images.unsplash.com/photo-1602573991155-21f0143bb45a?auto=format&fit=crop&w=800&q=80",
    title: "Radha Krishna Painted Kurta",
    tag: "Fabric Painting",
  },
  {
    src: "https://images.unsplash.com/photo-1610189025573-5a7c9f51f2a3?auto=format&fit=crop&w=800&q=80",
    title: "Custom Bridal Blouse",
    tag: "Bridal",
  },
  {
    src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    title: "Embroidered Bedsheet Set",
    tag: "Home Decor",
  },
  {
    src: "https://images.unsplash.com/photo-1606293459407-44db5d2cd72f?auto=format&fit=crop&w=800&q=80",
    title: "Stone Work Lehenga",
    tag: "Stone & Bead",
  },
  {
    src: "https://images.unsplash.com/photo-1620331317943-ee5b5a4c3a4b?auto=format&fit=crop&w=800&q=80",
    title: "Hand Painted Dupatta",
    tag: "Fabric Painting",
  },
  {
    src: "https://images.unsplash.com/photo-1606293459207-fff61ceaeb38?auto=format&fit=crop&w=800&q=80",
    title: "Designer Anarkali",
    tag: "Designer Wear",
  },
  {
    src: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=800&q=80",
    title: "Embroidered Cushion Covers",
    tag: "Home Decor",
  },
  {
    src: "https://images.unsplash.com/photo-1610189000264-3f06d7be0b14?auto=format&fit=crop&w=800&q=80",
    title: "Floral Hoop Art",
    tag: "Wall Art",
  },
];

const FEATURES = [
  { title: "Handmade with Love", icon: "♥", desc: "Every piece is created stitch by stitch, never mass produced." },
  { title: "100% Custom Designs", icon: "✦", desc: "Send your idea, reference or sketch — we craft it just for you." },
  { title: "Premium Quality Threads", icon: "❀", desc: "We use only trusted, color-fast threads, beads and stones." },
  { title: "Personalised Orders", icon: "✶", desc: "Names, initials, dates, custom colors — fully personal to you." },
  { title: "Fine Detailing", icon: "❖", desc: "Clean finishing, neat backs, sharp motifs — premium by design." },
  { title: "Affordable Pricing", icon: "✿", desc: "Direct-from-artisan pricing — luxury that doesn't break the bank." },
  { title: "Traditional Craft", icon: "✤", desc: "Indian hand embroidery techniques passed down through generations." },
  { title: "Modern Fusion", icon: "✥", desc: "Heritage craft meets contemporary cuts, colors and silhouettes." },
  { title: "Fast & Safe Delivery", icon: "✜", desc: "Carefully packed and shipped across India and worldwide." },
  { title: "Customer Happiness", icon: "♥", desc: "Hundreds of happy customers and counting — your joy is our goal." },
];

const PROCESS = [
  {
    step: "01",
    title: "Sketch & Concept",
    desc: "We start with your idea — a sketch, reference image, fabric piece or even a rough thought. We translate it into a thoughtful design.",
    img: "https://images.unsplash.com/photo-1606293459207-fff61ceaeb38?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "02",
    title: "Design Planning",
    desc: "Motif placement, thread colors, fabric choice and technique — every detail is planned before a single stitch is placed.",
    img: "https://images.unsplash.com/photo-1620331317943-ee5b5a4c3a4b?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "03",
    title: "Hand Embroidery",
    desc: "Skilled hands bring the design to life — aari, zardosi, thread work or mirror work, exactly as planned.",
    img: "https://images.unsplash.com/photo-1606293459275-87df2057c1ec?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "04",
    title: "Painting or Stone Work",
    desc: "Fabric painting, stone, sequin and bead embellishments are added layer by layer for a rich, royal finish.",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "05",
    title: "Finishing & Delivery",
    desc: "Clean finishing, neat backs, careful pressing, premium packaging and safe doorstep delivery to your home.",
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
  },
];

const SHOWCASE = [
  {
    title: "Blouse Embroidery",
    desc: "Custom blouses with intricate thread and stone work, designed to match your saree or lehenga. From elegant everyday florals to heavy bridal masterpieces — every blouse is stitched to your measurements and embroidered to perfection.",
    img: "https://images.unsplash.com/photo-1610189025573-5a7c9f51f2a3?auto=format&fit=crop&w=1200&q=80",
    points: ["Custom necklines", "Stone & thread", "Perfect fit"],
  },
  {
    title: "Kurta Embroidery & Painting",
    desc: "Hand painted kurtas with traditional motifs — peacock, Radha Krishna, florals, mandalas. We work on cotton, silk, georgette and chanderi, with matching dupattas and bottoms available.",
    img: "https://images.unsplash.com/photo-1602573991155-21f0143bb45a?auto=format&fit=crop&w=1200&q=80",
    points: ["All fabrics", "Custom motifs", "Matching sets"],
  },
  {
    title: "Fabric Painting",
    desc: "From sarees and dupattas to kurtas and home linen — we hand paint every piece with love. Soft water based colors, sharp outlines, and a finish that stays beautiful wash after wash.",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    points: ["Color fast", "Sharp detail", "Soft feel"],
  },
  {
    title: "Bridal Customization",
    desc: "Your wedding deserves pieces made only for you. We work closely with brides to design custom bridal blouses, lehengas, dupattas and trousseau pieces — fully embroidered and painted.",
    img: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=1200&q=80",
    points: ["Bridal lehenga", "Custom blouse", "Trousseau sets"],
  },
  {
    title: "Bedsheet Embroidery",
    desc: "Hand embroidered bedsheets, pillow covers and cushion covers that turn your bedroom into a soft, luxurious haven. Floral borders, scallop edges and matching sets available.",
    img: "https://images.unsplash.com/photo-1606293459407-44db5d2cd72f?auto=format&fit=crop&w=1200&q=80",
    points: ["Full sets", "Custom sizes", "Soft threads"],
  },
  {
    title: "Personalised Embroidery Gifts",
    desc: "Names, initials, dates, baby names, wedding dates — embroidered onto hoops, tote bags, baby rompers, towels and more. The most thoughtful, personal gift you can give.",
    img: "https://images.unsplash.com/photo-1606293459207-fff61ceaeb38?auto=format&fit=crop&w=1200&q=80",
    points: ["Names & initials", "Baby gifts", "Wedding favors"],
  },
];

const TESTIMONIALS = [
  {
    name: "Aanya Sharma",
    role: "Bride, Jaipur",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    quote:
      "My bridal blouse and lehenga were nothing short of a dream. The stone work, the finish, the patience with my endless changes — I felt so cared for. I cannot recommend Shree Collection enough.",
  },
  {
    name: "Meera Iyer",
    role: "Designer, Mumbai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    quote:
      "I sent them a reference image of my grandmother's saree and they recreated the embroidery so beautifully I cried. Real craftsmanship, real people, real love in every stitch.",
  },
  {
    name: "Roshni Patel",
    role: "Customer, Ahmedabad",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    quote:
      "The hand painted kurta I ordered is honestly the most beautiful thing in my wardrobe. Colors are so soft, the fabric feels rich, and the fit is perfect. Already planning my next order!",
  },
  {
    name: "Kavya Reddy",
    role: "Content Creator, Hyderabad",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80",
    quote:
      "I bought personalised embroidery hoops as wedding favors for my sister. Every single guest asked where they came from. The packaging, the detailing — premium from start to finish.",
  },
  {
    name: "Sneha Kapoor",
    role: "Doctor, Delhi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote:
      "I have ordered three blouses and a bedsheet set from Shree Collection. Every single piece has been flawless. The team is warm, the delivery is fast, and the work is just stunning.",
  },
  {
    name: "Priya Nair",
    role: "Homemaker, Bengaluru",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    quote:
      "The cushion covers and wall hoops I ordered completely changed the vibe of my living room. People literally think I got them from a high-end boutique. Thank you for the love!",
  },
];

const STATS = [
  { value: 1250, suffix: "+", label: "Happy Customers" },
  { value: 3800, suffix: "+", label: "Custom Orders Completed" },
  { value: 9500, suffix: "+", label: "Handcrafted Designs Created" },
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 4.9, suffix: "★", label: "Average Customer Rating", decimals: 1 },
];

const INSTAGRAM = [
  "https://images.unsplash.com/photo-1606293459275-87df2057c1ec?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1602573991155-21f0143bb45a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1610189025573-5a7c9f51f2a3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1606293459407-44db5d2cd72f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1620331317943-ee5b5a4c3a4b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1606293459207-fff61ceaeb38?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1610189000264-3f06d7be0b14?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1606293459287-3f6b1d9b0a93?auto=format&fit=crop&w=600&q=80",
];

// ---------------------------------------------------------------------
// 2) SMALL REUSABLE SUB-COMPONENTS
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

// ---------------------------------------------------------------------
// 3) CUSTOM HOOK — IntersectionObserver-based reveal-on-scroll
// ---------------------------------------------------------------------
const useReveal = (options = { threshold: 0.15 }) => {
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
// 4) MAIN HOME COMPONENT
// ---------------------------------------------------------------------
const Home = () => {
  // ------- Hero slider state -------
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  // ------- Scroll reveal triggers for staggered children -------
  const [craftRef, craftVisible] = useReveal();
  const [serviceRef, serviceVisible] = useReveal();
  const [galleryRef, galleryVisible] = useReveal();
  const [whyRef, whyVisible] = useReveal();
  const [processRef, processVisible] = useReveal();
  const [showcaseRef, showcaseVisible] = useReveal();
  const [testiRef, testiVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [instaRef, instaVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  // ------- Testimonial slider state -------
  const [tIndex, setTIndex] = useState(0);
  const nextTesti = () => setTIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prevTesti = () => setTIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // ------- Animated counters -------
  const [counted, setCounted] = useState(false);
  useEffect(() => {
    if (statsVisible) setCounted(true);
  }, [statsVisible]);

  // ------- Instagram lightbox state -------
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  // ------- Memoized visible testimonial slice -------
  const visibleTestimonials = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(TESTIMONIALS[(tIndex + i) % TESTIMONIALS.length]);
    }
    return arr;
  }, [tIndex]);

  // -----------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------
  return (
    <main className="sc-home">
      {/* ============== 1. HERO BANNER ============== */}
      <section className="sc-hero" id="home">
        {/* Background slider */}
        <div className="sc-hero-slider">
          {HERO_SLIDES.map((s, i) => (
            <div
              key={i}
              className={`sc-hero-slide ${i === slide ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${s.src})` }}
              aria-hidden={i !== slide}
            />
          ))}
          <div className="sc-hero-overlay" />
        </div>

        {/* Floating decorative SVG threads */}
        <div className="sc-hero-threads" aria-hidden="true">
          <svg className="sc-thread sc-thread-1" viewBox="0 0 200 200">
            <path
              d="M20,100 C50,40 150,160 180,100"
              fill="none"
              stroke="#C8A96A"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />
          </svg>
          <svg className="sc-thread sc-thread-2" viewBox="0 0 200 200">
            <path
              d="M10,150 Q90,30 190,150"
              fill="none"
              stroke="#E8C8C2"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="2 8"
            />
          </svg>
          <svg className="sc-thread sc-thread-3" viewBox="0 0 200 200">
            <path
              d="M30,40 C100,180 140,20 180,170"
              fill="none"
              stroke="#6F8A5E"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="3 7"
            />
          </svg>
          <span className="sc-float-flower sc-flower-1">❀</span>
          <span className="sc-float-flower sc-flower-2">✿</span>
          <span className="sc-float-flower sc-flower-3">✦</span>
          <span className="sc-float-flower sc-flower-4">❖</span>
        </div>

        {/* Hero content */}
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
            <a href="#collections" className="sc-btn sc-btn-primary">
              <span>Explore Collection</span>
              <span className="sc-btn-icon">→</span>
            </a>
            <a href="#contact" className="sc-btn sc-btn-ghost">
              <span className="sc-btn-icon">✦</span>
              <span>Custom Order</span>
            </a>
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

        {/* Right side collage */}
        <div className="sc-hero-collage" aria-hidden="true">
          {HERO_COLLAGE.map((src, i) => (
            <div key={i} className={`sc-collage-item sc-collage-${i + 1}`}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="sc-scroll-cue">
          <span>Scroll</span>
          <div className="sc-scroll-line" />
        </div>
      </section>

      {/* ============== 2. OUR CRAFTSMANSHIP ============== */}
      <section className="sc-craft" ref={craftRef} id="craft">
        <div className="sc-container">
          <div className={`sc-craft-grid ${craftVisible ? "is-visible" : ""}`}>
            <div className="sc-craft-image">
              <div className="sc-craft-frame">
                <img
                  src="https://images.unsplash.com/photo-1606293459275-87df2057c1ec?auto=format&fit=crop&w=1000&q=80"
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
              <a href="#process" className="sc-link-arrow">
                See how we create <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 3. OUR SERVICES ============== */}
      <section className="sc-services" ref={serviceRef} id="services">
        <div className="sc-container">
          <SectionHeading
            eyebrow="What We Create"
            title="Our Signature Services"
            subtitle="From intricate embroidery to personalised gifts — every service is handcrafted with patience, premium materials and a lot of heart."
          />

          <div className={`sc-services-grid ${serviceVisible ? "is-visible" : ""}`}>
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className="sc-service-card"
                style={{ background: s.grad, animationDelay: `${i * 80}ms` }}
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
                <p className="sc-service-desc">{s.desc}</p>
                <a href="#contact" className="sc-service-cta">
                  Enquire Now <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 4. FEATURED COLLECTIONS ============== */}
      <section className="sc-collections" ref={galleryRef} id="collections">
        <div className="sc-container">
          <SectionHeading
            eyebrow="Featured Gallery"
            title="A Glimpse Into Our Work"
            subtitle="A curated collection of recent pieces — embroidery, fabric painting, stone work, bridal wear and personalised art. Hover to see the story behind each design."
          />

          <div className={`sc-masonry ${galleryVisible ? "is-visible" : ""}`}>
            {COLLECTIONS.map((c, i) => (
              <figure
                key={c.title}
                className={`sc-masonry-item sc-masonry-${(i % 5) + 1}`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <img src={c.src} alt={c.title} loading="lazy" />
                <figcaption className="sc-masonry-caption">
                  <span className="sc-masonry-tag">{c.tag}</span>
                  <h4>{c.title}</h4>
                  <button className="sc-masonry-btn">View Design →</button>
                </figcaption>
              </figure>
            ))}
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
                style={{ animationDelay: `${i * 60}ms` }}
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

      {/* ============== 6. OUR WORKING PROCESS ============== */}
      <section className="sc-process" ref={processRef} id="process">
        <div className="sc-container">
          <SectionHeading
            eyebrow="From Idea to Art"
            title="Our Working Process"
            subtitle="A simple, transparent journey — from your first idea to a finished handcrafted piece delivered to your door."
          />

          <div className={`sc-timeline ${processVisible ? "is-visible" : ""}`}>
            <div className="sc-timeline-line" aria-hidden="true" />
            {PROCESS.map((p, i) => (
              <div
                key={p.step}
                className={`sc-timeline-step sc-step-${i + 1}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="sc-step-dot" aria-hidden="true">
                  {p.step}
                </div>
                <div className="sc-step-card">
                  <div className="sc-step-img">
                    <img src={p.img} alt={p.title} loading="lazy" />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 7. IMAGE SHOWCASE ============== */}
      <section className="sc-showcase" ref={showcaseRef} id="showcase">
        <div className="sc-container">
          <SectionHeading
            eyebrow="The Artistry"
            title="Handcrafted With Heart"
            subtitle="A deeper look at the work we love — six signature crafts that define Shree Collection."
          />

          <div className={`sc-showcase-list ${showcaseVisible ? "is-visible" : ""}`}>
            {SHOWCASE.map((b, i) => (
              <article
                key={b.title}
                className={`sc-showcase-block ${i % 2 === 1 ? "is-reverse" : ""}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="sc-showcase-img">
                  <img src={b.img} alt={b.title} loading="lazy" />
                  <span className="sc-showcase-deco">❀</span>
                </div>
                <div className="sc-showcase-content">
                  <span className="sc-eyebrow">Craft No. {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="sc-h3">{b.title}</h3>
                  <p>{b.desc}</p>
                  <ul className="sc-showcase-points">
                    {b.points.map((pt) => (
                      <li key={pt}>
                        <span>✦</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 8. CUSTOMER TESTIMONIALS ============== */}
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

      {/* ============== 9. STATISTICS COUNTER ============== */}
      <section className="sc-stats" ref={statsRef} id="stats">
        <div className="sc-container">
          <div className={`sc-stats-grid ${statsVisible ? "is-visible" : ""}`}>
            {STATS.map((s, i) => (
              <div key={s.label} className="sc-stat" style={{ animationDelay: `${i * 90}ms` }}>
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

      {/* ============== 10. INSTAGRAM GALLERY ============== */}
      <section className="sc-insta" ref={instaRef} id="instagram">
        <div className="sc-container">
          <SectionHeading
            eyebrow="Follow Along"
            title="Instagram Inspiration"
            subtitle="A peek into our daily handcraft life — embroidery, painting, packaging and happy customers. Follow @shreecollection on Instagram."
          />

          <div className={`sc-insta-grid ${instaVisible ? "is-visible" : ""}`}>
            {INSTAGRAM.map((src, i) => (
              <button
                key={i}
                className="sc-insta-tile"
                onClick={() => setLightbox(src)}
                aria-label={`Open Instagram image ${i + 1}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img src={src} alt={`Instagram inspiration ${i + 1}`} loading="lazy" />
                <span className="sc-insta-zoom">+</span>
              </button>
            ))}
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className="sc-btn sc-btn-outline sc-insta-cta"
          >
            <span>Follow on Instagram</span>
            <span className="sc-btn-icon">→</span>
          </a>
        </div>
      </section>

      {/* ============== 11. CALL TO ACTION ============== */}
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
              <a href="#collections" className="sc-btn sc-btn-ghost sc-btn-lg">
                <span>Browse Collection</span>
                <span className="sc-btn-icon">→</span>
              </a>
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

// ---------------------------------------------------------------------
// 5) CountUp — small sub-component for animated statistics
// ---------------------------------------------------------------------
const CountUp = ({ end, duration = 1800, decimals = 0 }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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
