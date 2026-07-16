/* ============================================================================
   Collections.jsx
   Shree Collection — Luxury Embroidery Gallery Page
   ----------------------------------------------------------------------------
   Stack: React (Vite) + Framer Motion + Swiper + react-icons + React Router
   Pairs with: Collections.css (plain CSS, class-prefixed `coll-`)
   Reuses: <Navbar /> from Navbar.jsx (same nav used on Home.jsx / Contact.jsx)
   ==========================================================================*/

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaSearchPlus,
} from "react-icons/fa";
import { GiSewingNeedle, GiYarn } from "react-icons/gi";
import { LuHandHeart } from "react-icons/lu";

import Navbar from "./Navbar";
import "./Collections.css";

/* ============================================================================
   1. IMAGE MAP — swap with real studio photography whenever ready
   ==========================================================================*/
const IMG = {
  hero: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR02y6ixssbADVdMUkc46YrxKUfDPOfPctgaqYgAOuodXlay1ki52sO_Q4&s=10",
  g1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgcXJPYMhA5kRtZmk4nCidriFldGN_yodGM0je8xTJA&s=10",
  g2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpD66ssixd4L4EsQnj_aeUZDyDRzZkf48p7K-ohxmeggKfufrMGJsYFgI&s=10",
  g3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1itS33RCOEuLWHYaa-2KrQ8D7WTjrSWGTjub__zugnCzH_wEDm1gIzq-B&s=10",
  g4: "https://i.pinimg.com/236x/20/44/45/2044454d451d98e1e2a6b5cd5dc7109a.jpg",
  g5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdS7Cd6iOr3IRkUaZJ9eHM_XqkqtVv3mz0zMBonaAC4QzSVFVZIFbaxHGW&s=10",
  g6: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs66bdgtqD6WYxlFmjuiHh26ZoSsfZyqCYeUgZQt_o3KfeKEjJjmEcSQc&s=10",
  g7: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=900&auto=format&fit=crop",
  g8: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhDe8pNasJsszN0vhiEcVd73yrWgRV2uWrXP_iKdeGvZbd1FkQQT0a0&s=10",
  g9: "https://i.pinimg.com/236x/94/62/9a/94629a1cb353a4228697a1af3afff849.jpg",
  g10: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=900&auto=format&fit=crop",
  g11: "https://i.pinimg.com/736x/e9/54/7c/e9547c342bcdd11a657271567971191e.jpg",
  g12: "https://content.jdmagicbox.com/comp/def_content_category/zari-dealers/274928433-346035627540217-5045704114973915906-n-zari-dealers-9-ozrpi.jpg",
  g13: "https://images.unsplash.com/photo-1611933772280-e21bbf49c0b9?q=80&w=900&auto=format&fit=crop",
  g14: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6EdQv9lsl0yq7ot0mTUJPYlQ-G4z-SZzOLh7ydHcBKg&s",
  g15: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX2VI500H9WSb7uc2_EzwpbmLW15l0ec66FPvwWvdDMw&s=10",
  g16: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=900&auto=format&fit=crop",
  g17: "https://i.pinimg.com/236x/81/8d/7f/818d7fb3acd53cde5baf85fd5dc01f7d.jpg",
  g18: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdS7Cd6iOr3IRkUaZJ9eHM_XqkqtVv3mz0zMBonaAC4QzSVFVZIFbaxHGW&s=10",
  g19: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?q=80&w=900&auto=format&fit=crop",
  g20: "https://m.media-amazon.com/images/I/A1v3qhSl9XL._AC_UF894,1000_QL80_.jpg",
  g21: "https://images.unsplash.com/photo-1600431521340-491eca880813?q=80&w=900&auto=format&fit=crop",
  g22: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=900&auto=format&fit=crop",
  g23: "https://images.unsplash.com/photo-1590418606746-018840f9cd85?q=80&w=900&auto=format&fit=crop",
  g24: "https://images.unsplash.com/photo-1610030180310-6b2a9cf29a8a?q=80&w=900&auto=format&fit=crop",
  featured1: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=1400&auto=format&fit=crop",
  featured2: "https://images.unsplash.com/photo-1610030180922-6c85ed88a49b?q=80&w=1400&auto=format&fit=crop",
  featured3: "https://images.unsplash.com/photo-1600369672771-4a6f3f6d0b5f?q=80&w=1400&auto=format&fit=crop",
  featured4: "https://images.unsplash.com/photo-1594736797933-d0f06ba0a7d4?q=80&w=1400&auto=format&fit=crop",
  craft1: "https://images.unsplash.com/photo-1592878849122-facb97520f9b?q=80&w=1000&auto=format&fit=crop",
  craft2: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop",
  craft3: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop",
  craft4: "https://images.unsplash.com/photo-1611933772280-e21bbf49c0b9?q=80&w=1000&auto=format&fit=crop",
  craft5: "https://images.unsplash.com/photo-1595341595379-cf1cd0fb7fb4?q=80&w=1000&auto=format&fit=crop",
  favorite1: "https://images.unsplash.com/photo-1616627561950-9f746e330187?q=80&w=900&auto=format&fit=crop",
  favorite2: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=900&auto=format&fit=crop",
  favorite3: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=900&auto=format&fit=crop",
  favorite4: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=900&auto=format&fit=crop",
  insta1: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop",
  insta2: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop",
  insta3: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=600&auto=format&fit=crop",
  insta4: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
  insta5: "https://images.unsplash.com/photo-1600431521340-491eca880813?q=80&w=600&auto=format&fit=crop",
  insta6: "https://images.unsplash.com/photo-1613310023042-ad79320c00ff?q=80&w=600&auto=format&fit=crop",
  ctaBg: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1800&auto=format&fit=crop",
};

/* ============================================================================
   2. STATIC CONTENT DATA
   ==========================================================================*/

const CATEGORIES = [
  "All",
  "Floral Embroidery",
  "Bridal Designs",
  "Blouse Collection",
  "Sarees",
  "Kids Collection",
  "Home Décor",
  "Cushion Covers",
  "Bedsheets",
  "Fabric Painting",
  "Personalized Gifts",
  "Festival Collection",
  "Custom Orders",
];

/** `h` controls the masonry rhythm: s = short, m = medium, t = tall */
const GALLERY_ITEMS = [
  { id: "gl-01", image: IMG.g1, title: "Marigold Bloom Hoop", desc: "Hand-stitched floral hoop art in warm marigold thread.", category: "Floral Embroidery", h: "t" },
  { id: "gl-02", image: IMG.g2, title: "Ivory Bridal Dupatta", desc: "Zardozi bridal dupatta finished with gold thread borders.", category: "Bridal Designs", h: "m" },
  { id: "gl-03", image: IMG.g3, title: "Peacock Zardozi Blouse", desc: "Statement blouse with a hand-embroidered peacock motif.", category: "Blouse Collection", h: "t" },
  { id: "gl-04", image: IMG.g4, title: "Hand-Painted Silk Runner", desc: "Fabric-painted table runner in earthen hues.", category: "Fabric Painting", h: "s" },
  { id: "gl-05", image: IMG.g5, title: "Lotus Cushion Set", desc: "Cushion covers embroidered with a symmetrical lotus motif.", category: "Cushion Covers", h: "m" },
  { id: "gl-06", image: IMG.g6, title: "Terracotta Bedsheet Set", desc: "Hand-embroidered bedsheet with terracotta floral border.", category: "Bedsheets", h: "t" },
  { id: "gl-07", image: IMG.g7, title: "Named Keepsake Hoop", desc: "Personalised name embroidery, framed as a keepsake gift.", category: "Personalized Gifts", h: "s" },
  { id: "gl-08", image: IMG.g8, title: "Diwali Torans", desc: "Festive door torans hand-stitched for Diwali celebrations.", category: "Festival Collection", h: "m" },
  { id: "gl-09", image: IMG.g9, title: "Thread Palette Study", desc: "A curated spool arrangement chosen for a bridal commission.", category: "Custom Orders", h: "t" },
  { id: "gl-10", image: IMG.g10, title: "Artisan Hands at Work", desc: "A karigar's hands mid-stitch on a silk saree border.", category: "Sarees", h: "m" },
  { id: "gl-11", image: IMG.g11, title: "Mandala Wall Hoop", desc: "A large mandala hoop designed for wall display.", category: "Home Décor", h: "s" },
  { id: "gl-12", image: IMG.g12, title: "Little Blooms Frock", desc: "Delicate floral embroidery on a kids' festive frock.", category: "Kids Collection", h: "t" },
  { id: "gl-13", image: IMG.g13, title: "Rosebud Saree Border", desc: "Fine rosebud embroidery along a handloom saree edge.", category: "Sarees", h: "m" },
  { id: "gl-14", image: IMG.g14, title: "Workshop Golden Hour", desc: "Our Old Delhi atelier bathed in late afternoon light.", category: "Custom Orders", h: "s" },
  { id: "gl-15", image: IMG.g15, title: "Emerald Vine Blouse", desc: "Vine and leaf motif embroidered along a scalloped neckline.", category: "Blouse Collection", h: "t" },
  { id: "gl-16", image: IMG.g16, title: "Sunrise Floral Hoop", desc: "A warm-toned floral hoop, framed in raw wood.", category: "Floral Embroidery", h: "m" },
  { id: "gl-17", image: IMG.g17, title: "Festive Cushion Trio", desc: "Three cushion covers stitched for the festival season.", category: "Cushion Covers", h: "s" },
  { id: "gl-18", image: IMG.g18, title: "Hand-Painted Cotton Throw", desc: "Botanical fabric painting on soft handloom cotton.", category: "Fabric Painting", h: "t" },
  { id: "gl-19", image: IMG.g19, title: "Anniversary Keepsake", desc: "A personalised gift commissioned for a 25th anniversary.", category: "Personalized Gifts", h: "m" },
  { id: "gl-20", image: IMG.g20, title: "Bridal Blouse Detail", desc: "Close-up detail of hand-stitched bridal blouse embroidery.", category: "Bridal Designs", h: "s" },
  { id: "gl-21", image: IMG.g21, title: "Playful Petals Bedsheet", desc: "Kids' bedsheet embroidered with playful petal motifs.", category: "Kids Collection", h: "t" },
  { id: "gl-22", image: IMG.g22, title: "Marigold Festival Set", desc: "Festival décor pieces stitched in marigold and gold thread.", category: "Festival Collection", h: "m" },
  { id: "gl-23", image: IMG.g23, title: "Linen Cushion Cover", desc: "Minimal floral embroidery on natural linen cushion covers.", category: "Cushion Covers", h: "s" },
  { id: "gl-24", image: IMG.g24, title: "Heirloom Bedsheet Border", desc: "A generational motif recreated for a modern bedsheet set.", category: "Bedsheets", h: "t" },
];

const FEATURED_COLLECTIONS = [
  {
    id: "feat-01",
    image: IMG.featured1,
    title: "Peacock Zardozi Edit",
    desc: "Our most requested bridal motif, reimagined across sarees and blouses.",
  },
  {
    id: "feat-02",
    image: IMG.featured2,
    title: "The Bridal Trousseau",
    desc: "A complete bridal capsule stitched over six patient weeks.",
  },
  {
    id: "feat-03",
    image: IMG.featured3,
    title: "Floral Heritage Series",
    desc: "Classic floral motifs drawn from three generations of family sketches.",
  },
  {
    id: "feat-04",
    image: IMG.featured4,
    title: "Festival Home Edit",
    desc: "Cushions, runners, and torans designed for the festival season.",
  },
];

const CRAFT_STEPS = [
  {
    id: "craft-01",
    title: "Thread Selection",
    desc: "Every hue is chosen by eye against natural light before a single stitch begins.",
    image: IMG.craft1,
  },
  {
    id: "craft-02",
    title: "Sketch Preparation",
    desc: "Motifs are drawn by hand and refined until the proportions feel right.",
    image: IMG.craft2,
  },
  {
    id: "craft-03",
    title: "Needlework Begins",
    desc: "Karigars transfer the sketch onto fabric and begin the first stitches.",
    image: IMG.craft3,
  },
  {
    id: "craft-04",
    title: "Embroidery in Progress",
    desc: "Days of patient stitching bring the motif to life, layer by layer.",
    image: IMG.craft4,
  },
  {
    id: "craft-05",
    title: "Final Finishing",
    desc: "Threads are secured, edges pressed, and every knot checked by hand.",
    image: IMG.craft5,
  },
];

const INSPIRATION_IMAGES = [
  IMG.g1, IMG.g4, IMG.g9, IMG.g2, IMG.g13, IMG.g6,
  IMG.g11, IMG.g18, IMG.g3, IMG.g21, IMG.g8, IMG.g15,
  IMG.g5, IMG.g24, IMG.g10, IMG.g17,
];

const CUSTOMER_FAVORITES = [
  {
    id: "fav-01",
    image: IMG.favorite1,
    title: "Lotus Cushion Set",
    desc: "Our best-selling cushion pair, hand-embroidered in three colourways.",
  },
  {
    id: "fav-02",
    image: IMG.favorite2,
    title: "Keepsake Name Hoop",
    desc: "A personalised gift loved for birthdays and anniversaries alike.",
  },
  {
    id: "fav-03",
    image: IMG.favorite3,
    title: "Festival Toran Set",
    desc: "Our most-reordered festive décor piece, every Diwali season.",
  },
  {
    id: "fav-04",
    image: IMG.favorite4,
    title: "Heritage Bedsheet",
    desc: "A generational motif, restitched for modern bedrooms.",
  },
];

const INSTAGRAM_POSTS = [
  IMG.insta1, IMG.insta2, IMG.insta3, IMG.insta4, IMG.insta5, IMG.insta6,
];

const WHATSAPP_NUMBER = "919999999999";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello Shree Collection! I'd love to know more about a custom design."
)}`;

/* ============================================================================
   3. ANIMATION VARIANTS
   ==========================================================================*/
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ============================================================================
   4. DECORATIVE PRIMITIVES
   ==========================================================================*/
const FloralCorner = ({ className = "" }) => (
  <svg
    className={`coll-floral-corner ${className}`}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 10c30 0 40 20 40 40M10 10c0 30 20 40 40 40M10 10c50 5 90 45 95 95"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="52" cy="52" r="6" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const OrnamentalDivider = () => (
  <div className="coll-divider" aria-hidden="true">
    <span className="coll-divider__line" />
    <svg viewBox="0 0 64 24" fill="none" className="coll-divider__glyph">
      <path
        d="M32 12c-4-8-12-8-16-2 4 4 10 4 16 2Zm0 0c4-8 12-8 16-2-4 4-10 4-16 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="32" cy="12" r="3" fill="currentColor" />
    </svg>
    <span className="coll-divider__line" />
  </div>
);

const Eyebrow = ({ children }) => (
  <motion.span
    className="coll-eyebrow"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.6 }}
  >
    <GiYarn className="coll-eyebrow__icon" />
    {children}
  </motion.span>
);

/* ============================================================================
   5. GALLERY IMAGE — lazy load + skeleton placeholder
   ==========================================================================*/
const GalleryImage = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`coll-img-wrap ${className}`}>
      {!loaded && <span className="coll-skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`coll-img ${loaded ? "coll-img--loaded" : ""}`}
      />
    </div>
  );
};

/* ============================================================================
   6. LIGHTBOX
   ==========================================================================*/
const Lightbox = ({ items, index, onClose, onNav }) => {
  const touchStartX = useRef(null);
  const current = items[index];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 60) onNav(-1);
    else if (delta < -60) onNav(1);
    touchStartX.current = null;
  };

  if (!current) return null;

  return (
    <motion.div
      className="coll-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.title} — image ${index + 1} of ${items.length}`}
    >
      <button
        className="coll-lightbox__close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close image viewer"
      >
        <FaTimes />
      </button>

      <button
        className="coll-lightbox__nav coll-lightbox__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label="Previous image"
      >
        <FaChevronLeft />
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={current.id}
          className="coll-lightbox__figure"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={current.image} alt={current.title} />
          <figcaption>
            <h3>{current.title}</h3>
            <p>{current.desc}</p>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <button
        className="coll-lightbox__nav coll-lightbox__nav--next"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        aria-label="Next image"
      >
        <FaChevronRight />
      </button>

      <div className="coll-lightbox__counter">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  );
};

/* ============================================================================
   7. MAIN COMPONENT
   ==========================================================================*/
const Collections = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navigateLightbox = useCallback(
    (dir) => {
      setLightboxIndex((prev) => {
        if (prev === null) return prev;
        const total = filteredItems.length;
        return (prev + dir + total) % total;
      });
    },
    [filteredItems.length]
  );

  return (
    <div className="coll-root">
      <Navbar />

      {/* ================================================================
          HERO BANNER
      ================================================================= */}
      <section className="coll-hero">
        <div className="coll-hero__bg">
          <img src={IMG.hero} alt="Close-up of colourful hand embroidery in warm natural light" />
          <div className="coll-hero__overlay" />
        </div>
        <FloralCorner className="coll-floral-corner--top-left coll-floral-corner--light" />
        <FloralCorner className="coll-floral-corner--bottom-right coll-floral-corner--light" />

        <motion.div
          className="coll-hero__content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span className="coll-eyebrow coll-eyebrow--light" variants={fadeUp}>
            <GiSewingNeedle className="coll-eyebrow__icon" />
            The Full Collection
          </motion.span>
          <motion.h1 className="coll-hero__heading" variants={fadeUp} custom={1}>
            Our Handmade Collections
          </motion.h1>
          <motion.p className="coll-hero__subtitle" variants={fadeUp} custom={2}>
            Discover handcrafted embroidery, fabric painting, stitching, and
            custom creations made with patience, precision, and passion.
          </motion.p>
        </motion.div>

        <div className="coll-hero__scroll-cue" aria-hidden="true">
          <span />
          Scroll to browse
        </div>
      </section>

      {/* ================================================================
          CATEGORY FILTER
      ================================================================= */}
      <section className="coll-filter-section">
        <div className="coll-filter" role="tablist" aria-label="Filter collections by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`coll-filter__btn ${
                activeCategory === cat ? "coll-filter__btn--active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ================================================================
          PREMIUM IMAGE GALLERY (Masonry + Filter + Lightbox)
      ================================================================= */}
      <section className="coll-gallery" id="gallery">
        <motion.div
          className="coll-gallery__masonry"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.button
                key={item.id}
                className={`coll-card coll-card--${item.h}`}
                layout
                variants={scaleIn}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -6 }}
                onClick={() => openLightbox(GALLERY_ITEMS.indexOf(item))}
              >
                <GalleryImage src={item.image} alt={item.title} className="coll-card__image-wrap" />
                <span className="coll-card__border" aria-hidden="true" />
                <div className="coll-card__overlay">
                  <span className="coll-card__zoom">
                    <FaSearchPlus />
                  </span>
                  <h3 className="coll-card__title">{item.title}</h3>
                  <p className="coll-card__desc">{item.desc}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <p className="coll-gallery__empty">No pieces found in this category yet.</p>
        )}
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={GALLERY_ITEMS}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNav={navigateLightbox}
          />
        )}
      </AnimatePresence>

      <OrnamentalDivider />

      {/* ================================================================
          FEATURED COLLECTION SLIDER
      ================================================================= */}
      <section className="coll-featured">
        <div className="coll-section__header">
          <Eyebrow>Editor's Picks</Eyebrow>
          <motion.h2
            className="coll-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Featured Collections
          </motion.h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1.15}
          spaceBetween={28}
          centeredSlides={false}
          grabCursor
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          navigation={{
            nextEl: ".coll-featured__next",
            prevEl: ".coll-featured__prev",
          }}
          pagination={{ clickable: true, el: ".coll-featured__pagination" }}
          breakpoints={{
            700: { slidesPerView: 1.6 },
            1100: { slidesPerView: 2.4 },
          }}
          className="coll-featured__swiper"
        >
          {FEATURED_COLLECTIONS.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="coll-featured-card">
                <img src={item.image} alt={item.title} />
                <div className="coll-featured-card__info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <a href="#gallery" className="coll-btn coll-btn--outline-light">
                    Explore <FaArrowRight />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="coll-featured__controls">
          <button className="coll-featured__prev coll-slider-btn" aria-label="Previous">
            <FaChevronLeft />
          </button>
          <div className="coll-featured__pagination" />
          <button className="coll-featured__next coll-slider-btn" aria-label="Next">
            <FaChevronRight />
          </button>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          BEHIND THE CRAFT — zig-zag storytelling timeline
      ================================================================= */}
      <section className="coll-craft">
        <div className="coll-section__header">
          <Eyebrow>Our Process</Eyebrow>
          <motion.h2
            className="coll-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Behind the Craft
          </motion.h2>
          <motion.p
            className="coll-section__subtitle"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            A closer look at the hands and hours behind every finished piece.
          </motion.p>
        </div>

        <div className="coll-craft__timeline">
          {CRAFT_STEPS.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <motion.div
                className={`coll-craft__row ${isEven ? "coll-craft__row--reverse" : ""}`}
                key={step.id}
                variants={isEven ? slideFromRight : slideFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="coll-craft__image-wrap">
                  <img src={step.image} alt={step.title} />
                </div>
                <div className="coll-craft__content">
                  <span className="coll-craft__step-number">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          INSPIRATION GALLERY — Pinterest style
      ================================================================= */}
      <section className="coll-inspiration">
        <div className="coll-section__header">
          <Eyebrow>Mood Board</Eyebrow>
          <motion.h2
            className="coll-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Inspiration Gallery
          </motion.h2>
        </div>

        <motion.div
          className="coll-inspiration__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {INSPIRATION_IMAGES.map((src, i) => (
            <motion.div
              className="coll-inspiration__item"
              key={i}
              variants={fadeUp}
              custom={i % 6}
            >
              <GalleryImage src={src} alt={`Embroidery inspiration ${i + 1}`} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          CUSTOMER FAVORITES
      ================================================================= */}
      <section className="coll-favorites">
        <div className="coll-section__header">
          <Eyebrow>Best Sellers</Eyebrow>
          <motion.h2
            className="coll-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Customer Favorites
          </motion.h2>
        </div>

        <motion.div
          className="coll-favorites__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {CUSTOMER_FAVORITES.map((item, i) => (
            <motion.div
              className="coll-favorite-card"
              key={item.id}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -8 }}
            >
              <div className="coll-favorite-card__image-wrap">
                <GalleryImage src={item.image} alt={item.title} />
                <span className="coll-favorite-card__badge">
                  <LuHandHeart /> Handmade
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          INSTAGRAM STYLE SECTION
      ================================================================= */}
      <section className="coll-instagram">
        <div className="coll-section__header">
          <Eyebrow>@shreecollection</Eyebrow>
          <motion.h2
            className="coll-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Follow the Journey
          </motion.h2>
        </div>

        <motion.div
          className="coll-instagram__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {INSTAGRAM_POSTS.map((src, i) => (
            <motion.a
              href="#"
              key={i}
              className="coll-instagram__item"
              variants={scaleIn}
              custom={i}
              onClick={(e) => e.preventDefault()}
            >
              <img src={src} alt={`Instagram post ${i + 1}`} loading="lazy" />
              <div className="coll-instagram__overlay">
                <FaInstagram />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="coll-btn coll-btn--outline"
        >
          <FaInstagram /> Follow Us
        </a>
      </section>

      {/* ================================================================
          FINAL CALL TO ACTION
      ================================================================= */}
      <section className="coll-final-cta" style={{ "--coll-cta-bg": `url(${IMG.ctaBg})` }}>
        <div className="coll-final-cta__overlay" />
        <FloralCorner className="coll-floral-corner--top-left coll-floral-corner--light" />
        <FloralCorner className="coll-floral-corner--bottom-right coll-floral-corner--light" />

        <motion.div
          className="coll-final-cta__content"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Eyebrow>Let's Talk Design</Eyebrow>
          <h2 className="coll-final-cta__heading">
            Ready to Create Your Own Custom Design?
          </h2>
          <div className="coll-final-cta__buttons">
            <a href="/contact" className="coll-btn coll-btn--primary">
              Contact Us <FaArrowRight />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="coll-btn coll-btn--whatsapp"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* ================================================================
          FOOTER — matches the premium footer used on Home.jsx
      ================================================================= */}
      <footer className="coll-footer">
        <FloralCorner className="coll-floral-corner--top-left coll-floral-corner--muted" />
        <div className="coll-footer__top">
          <div className="coll-footer__brand">
            <a href="/" className="coll-footer__logo">
              <span className="coll-footer__logo-mark">
                <GiSewingNeedle />
              </span>
              <span>
                Shree <em>Collection</em>
              </span>
            </a>
            <p className="coll-footer__tagline">
              Handmade embroidery, stitched with heritage, designed for today.
            </p>
            <div className="coll-footer__socials">
              <a href="https://instagram.com" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://pinterest.com" aria-label="Pinterest">
                <FaPinterestP />
              </a>
              <a href={WHATSAPP_LINK} aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="coll-footer__links">
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="/collections">Collections</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="coll-footer__links">
            <h4>Popular</h4>
            <a href="#gallery">Bridal Designs</a>
            <a href="#gallery">Home Décor</a>
            <a href="#gallery">Festival Collection</a>
          </div>

          <div className="coll-footer__contact">
            <h4>Reach Us</h4>
            <p>
              <FaMapMarkerAlt /> Chandni Chowk, Old Delhi, India
            </p>
            <p>
              <FaPhoneAlt /> +91 99999 99999
            </p>
            <p>
              <FaEnvelope /> hello@shreecollection.in
            </p>
          </div>
        </div>

        <div className="coll-footer__divider">
          <OrnamentalDivider />
        </div>

        <div className="coll-footer__bottom">
          <p>© {new Date().getFullYear()} Shree Collection. All threads reserved.</p>
          <p>
            Designed with <span className="coll-footer__heart">♥</span> for handmade craft.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Collections;
