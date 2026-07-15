import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// React Icons
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaYoutube, 
  FaStar, 
  FaQuoteLeft, 
  FaChevronLeft, 
  FaChevronRight, 
  FaArrowUp, 
  FaHeart 
} from 'react-icons/fa';
import { 
  FiMenu, 
  FiX, 
  FiClock, 
  FiCheckCircle, 
  FiLayers, 
  FiAward, 
  FiHeart as FiHeartOutline, 
  FiMail, 
  FiPhone 
} from 'react-icons/fi';
import { 
  GiSewingNeedle, 
  GiSpool, 
  GiEmbroidery, 
  GiPaintBrush, 
  GiAmphora 
} from 'react-icons/gi';

import './Home.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- STATIC IMAGES & DATA ---
const IMAGES = {
  heroRight: "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=1000",
  whyChoose: "https://images.unsplash.com/photo-1572085312730-23a6b6ec8fc1?auto=format&fit=crop&q=80&w=1000",
  ctaBg: "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=1600",
  collections: {
    floral: "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=600",
    bridal: "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=600",
    cushion: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=600",
    bedsheet: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=600",
    personalized: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    festival: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=600"
  },
  masterpieces: [
    "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=600"
  ],
  testimonials: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
  ],
  instagram: [
    "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400"
  ]
};

const SERVICES = [
  { icon: <GiSewingNeedle />, title: "Hand Embroidery", desc: "Meticulous stitch patterns handcrafted with high-sheen embroidery threads." },
  { icon: <GiPaintBrush />, title: "Fabric Painting", desc: "Elegant watercolor and traditional hand-painted motifs directly on organic silks." },
  { icon: <FiLayers />, title: "Custom Stitching", desc: "Perfect tailoring adjusted custom-fit to suit your measurements." },
  { icon: <GiSpool />, title: "Blouse Designs", desc: "Heavy bridal Aari embroidery, mirror work, and customized boutique necklines." },
  { icon: <GiAmphora />, title: "Home Décor", desc: "Stunning table runners, designer cushion sets, and custom statement bedsheets." },
  { icon: <GiEmbroidery />, title: "Custom Orders", desc: "Bespoke monogramming and personalized framing requests made specifically for you." }
];

const FEATURES = [
  { icon: <FiHeartOutline />, title: "Handmade with Love", desc: "Every thread and button is hand-crafted with utmost devotion." },
  { icon: <GiSpool />, title: "Premium Materials", desc: "Sourced high-grade mulmuls, premium pure silks, and heavy linens." },
  { icon: <GiSewingNeedle />, title: "Custom Designs", desc: "Your direct conceptualizations turned into structured wearable art." },
  { icon: <FiAward />, title: "Skilled Craftsmanship", desc: "Hand-stitched by native local artisans preserving generational art." },
  { icon: <FiCheckCircle />, title: "Quality Finishing", desc: "Rigorous detail checking ensures seamless seams and gorgeous borders." },
  { icon: <FiClock />, title: "Timely Delivery", desc: "Accurate creation pacing ensures timely shipments right to your doorstep." }
];

const TIMELINE = [
  { title: "Idea", desc: "We sit together to understand your vision, motifs, and material needs." },
  { title: "Sketch", desc: "Artisans draft accurate visual stencils onto paper, adjusting for dimensions." },
  { title: "Thread Selection", desc: "We map out shade-matched silk and cotton thread reels with gold accents." },
  { title: "Hand Embroidery", desc: "Generational techniques are applied meticulously to craft your design." },
  { title: "Finishing", desc: "Borders are tucked, loose threads cleared, and fabrics gently pressed." },
  { title: "Delivery", desc: "Packed beautifully in sustainable luxury packaging ready to be loved." }
];

const TESTIMONIALS = [
  { name: "Ananya Deshmukh", role: "Pune, India", quote: "The sheer craftsmanship on my wedding blouse is spectacular. The gold threads look incredibly rich and premium.", img: IMAGES.testimonials[0], rating: 5 },
  { name: "Sanjana Rao", role: "Mumbai, India", quote: "Exceptional cushion cover designs! My drawing room feels like a heritage palace room now. High quality mulmul cotton used.", img: IMAGES.testimonials[1], rating: 5 },
  { name: "Meera Nair", role: "Bangalore, India", quote: "They customized an anniversary hoop for my parents with accurate dates and names. Best personalized handiwork ever!", img: IMAGES.testimonials[2], rating: 5 }
];

// --- ORNAMENTAL SVG DIVIDER ---
const OrnamentalDivider = () => (
  <div className="ornamental-divider" aria-hidden="true">
    <div className="ornamental-line"></div>
    <svg className="ornamental-glyph" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 20 C 25 5, 35 5, 50 20 C 65 35, 75 35, 95 20" stroke="#D4AF37" strokeWidth="2" fill="none" />
      <circle cx="50" cy="20" r="4" fill="#C65D3D" />
      <circle cx="20" cy="14" r="2.5" fill="#D4AF37" />
      <circle cx="80" cy="26" r="2.5" fill="#D4AF37" />
    </svg>
    <div className="ornamental-line"></div>
  </div>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentMasterpiece, setCurrentMasterpiece] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroHeadingRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroVisualRef = useRef(null);

  // Initialize Lenis Smooth Scroll & Navbar State Tracking
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  // GSAP Entrance Animations for Hero Section
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(heroHeadingRef.current.querySelectorAll('.hero-anim-line'), 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }
      )
      .fromTo(heroSubtitleRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        '-=0.8'
      )
      .fromTo(heroCtaRef.current, 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.8 }, 
        '-=0.6'
      )
      .fromTo(heroVisualRef.current, 
        { scale: 0.95, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.4 }, 
        '-=1'
      );
    });

    return () => ctx.revert();
  }, []);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919923062181?text=Hello%20Shree%20Collection!%20I'd%20love%20to%20inquire%20about%20your%20custom%20handcrafted%20embroidery.", "_blank");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="shree-root">
      
      {/* Decorative Floating Petals / Particles */}
      <div className="floating-petals" aria-hidden="true">
        <div className="petal petal-1"></div>
        <div className="petal petal-2"></div>
        <div className="petal petal-3"></div>
        <div className="petal petal-4"></div>
        <div className="petal petal-5"></div>
        <div className="petal petal-6"></div>
        <div className="petal petal-7"></div>
        <div className="petal petal-8"></div>
      </div>

      {/* --- 1. PREMIUM STICKY NAVIGATION BAR --- */}
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <a href="#" className="navbar__logo">
            <span className="navbar__logo-mark">S</span>
            <span className="navbar__logo-text">Shree <em>Collection</em></span>
          </a>

          <nav className="navbar__links" aria-label="Main Navigation">
            <a href="#" className="navbar__link">Home</a>
            <a href="#services" className="navbar__link">Services</a>
            <a href="#collections" className="navbar__link">Collections</a>
            <a href="#journey" className="navbar__link">Our Story</a>
            <a href="#contact" className="navbar__link">Contact</a>
          </nav>

          <div className="navbar__actions">
            <button onClick={handleWhatsAppClick} className="btn btn--whatsapp">
              <FaWhatsapp /> <span>Custom Design</span>
            </button>
            <button 
              className="navbar__burger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="navbar__mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a href="#" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#services" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#collections" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Collections</a>
              <a href="#journey" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
              <a href="#contact" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- 2. FULL-SCREEN HERO BANNER --- */}
      <section className="hero">
        <div className="hero__texture"></div>
        <div className="hero__grid">
          
          <div className="hero__text">
            <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> Premium Handmade Indian Art</span>
            <h1 className="hero__heading" ref={heroHeadingRef}>
              <span className="hero-anim-line">Crafted by Hand,</span>
              <span className="hero-anim-line">Made for You</span>
            </h1>
            <p className="hero__subtitle" ref={heroSubtitleRef}>
              Every stitch tells a story of love, patience, creativity, and timeless Indian craftsmanship. Let us spin your custom thread narratives.
            </p>
            <div className="hero__cta" ref={heroCtaRef}>
              <a href="#collections" className="btn btn--primary">Explore Collections</a>
              <a href="#contact" className="btn btn--outline">Contact Us</a>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">100%</span>
                <span className="hero__stat-label">Handcrafted</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">12k+</span>
                <span className="hero__stat-label">Hours Stitching</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">500+</span>
                <span className="hero__stat-label">Bespoke Orders</span>
              </div>
            </div>
          </div>

          <div className="hero__visual" ref={heroVisualRef}>
            <div className="hero__image-glow"></div>
            <div className="hero__image-ring hero__image-ring--1"></div>
            <div className="hero__image-ring hero__image-ring--2"></div>
            <div className="hero__image-frame">
              <img src={IMAGES.heroRight} alt="Cinematic artisan embroidery stitching close-up" className="hero__image" />
              <div className="hero__badge">
                <GiEmbroidery />
                <div>
                  <strong>Pure Mulmul & Silks</strong>
                  <span>Traditional Aari Embroidery</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="hero__scroll-cue">
          <p>Scroll</p>
          <span></span>
        </div>
      </section>

      <OrnamentalDivider />

      {/* --- 3. SERVICES SECTION --- */}
      <section className="services" id="services">
        <div className="section__header">
          <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> Our Creations</span>
          <h2 className="section__title">Our Craft & Services</h2>
          <p className="section__subtitle">We provide high-end manual sewing, tailored fabric embroidery, and designer textile items.</p>
        </div>

        <div className="services__grid">
          {SERVICES.map((serv, index) => (
            <motion.div 
              key={index}
              className="service-card"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="service-card__glow"></div>
              <span className="service-card__index">0{index + 1}</span>
              <div className="service-card__icon">{serv.icon}</div>
              <h3 className="service-card__title">{serv.title}</h3>
              <p className="service-card__desc">{serv.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 4. WHY CHOOSE SHREE COLLECTION --- */}
      <section className="why-choose">
        <div className="why-choose__grid">
          <div className="why-choose__image-wrap">
            <img src={IMAGES.whyChoose} alt="Artisan hands stitching delicate patterns on embroidery frame" className="why-choose__image" />
            <div className="why-choose__image-frame"></div>
            <div className="why-choose__floating-card">
              <FiAward />
              <div>
                <strong>Award-winning designs</strong>
                <span>Stitched by local experts</span>
              </div>
            </div>
          </div>

          <div className="why-choose__content">
            <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> Quality Benchmark</span>
            <h2 className="section__title section__title--left">Why Choose Shree Collection</h2>
            <p className="section__subtitle section__subtitle--left">Every single project is woven around precision. No machine layouts, no hurried shortcuts. Just absolute artistic focus.</p>
            
            <div className="why-choose__features">
              {FEATURES.map((feat, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-card__icon">{feat.icon}</div>
                  <div>
                    <h4 className="feature-card__title">{feat.title}</h4>
                    <p className="feature-card__desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* --- 5. SIGNATURE COLLECTIONS (MASONRY GRID) --- */}
      <section className="collections" id="collections">
        <div className="section__header">
          <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> Curated Vaults</span>
          <h2 className="section__title">Signature Collections</h2>
          <p className="section__subtitle">Wander through our diverse design portfolios crafted for spaces, occasions, and personal memories.</p>
        </div>

        <div className="collections__masonry">
          
          <div className="collection-card collection-card--tall">
            <img src={IMAGES.collections.floral} alt="Floral embroidery frame art" className="collection-card__image" />
            <div className="collection-card__overlay">
              <span className="collection-card__tag">Art Gallery</span>
              <h3 className="collection-card__title">Floral Collection</h3>
              <span className="collection-card__link">View Hoop Arts &rarr;</span>
            </div>
          </div>

          <div className="collection-card collection-card--wide">
            <img src={IMAGES.collections.bridal} alt="Indian Bridal heavy embroidery blouse" className="collection-card__image" />
            <div className="collection-card__overlay">
              <span className="collection-card__tag">Luxury Couture</span>
              <h3 className="collection-card__title">Bridal Blouse Designs</h3>
              <span className="collection-card__link">Discover Custom Fits &rarr;</span>
            </div>
          </div>

          <div className="collection-card collection-card--regular">
            <img src={IMAGES.collections.cushion} alt="Textured luxury embroidered cushion covers" className="collection-card__image" />
            <div className="collection-card__overlay">
              <span className="collection-card__tag">Home Textile</span>
              <h3 className="collection-card__title">Premium Cushions</h3>
              <span className="collection-card__link">Shop Cushions &rarr;</span>
            </div>
          </div>

          <div className="collection-card collection-card--regular">
            <img src={IMAGES.collections.bedsheet} alt="Handloom embroidered bedsheet details" className="collection-card__image" />
            <div className="collection-card__overlay">
              <span className="collection-card__tag">Linen Arts</span>
              <h3 className="collection-card__title">Stunning Bedsheets</h3>
              <span className="collection-card__link">View Bedsheets &rarr;</span>
            </div>
          </div>

          <div className="collection-card collection-card--wide">
            <img src={IMAGES.collections.personalized} alt="Personalized hand embroidery name hoop frames" className="collection-card__image" />
            <div className="collection-card__overlay">
              <span className="collection-card__tag">Keepsakes</span>
              <h3 className="collection-card__title">Personalized Gifts</h3>
              <span className="collection-card__link">Personalize Now &rarr;</span>
            </div>
          </div>

          <div className="collection-card collection-card--tall">
            <img src={IMAGES.collections.festival} alt="Festive and traditional Indian embroidered decor" className="collection-card__image" />
            <div className="collection-card__overlay">
              <span className="collection-card__tag">Celebrations</span>
              <h3 className="collection-card__title">Festival Collection</h3>
              <span className="collection-card__link">Explore Banners &rarr;</span>
            </div>
          </div>

        </div>
      </section>

      {/* --- 6. CRAFTSMANSHIP JOURNEY (TIMELINE) --- */}
      <section className="journey" id="journey">
        <div className="section__header">
          <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> The Atelier Process</span>
          <h2 className="section__title">Crafted Step By Step</h2>
          <p className="section__subtitle">A clear window into how we process raw canvas into stunning embroidery milestones.</p>
        </div>

        <div className="journey__timeline">
          <div className="journey__line"></div>
          {TIMELINE.map((step, idx) => (
            <div className="journey__step" key={idx}>
              <div className="journey__milestone">
                <div className="journey__milestone-glow"></div>
                <span className="journey__milestone-number">0{idx + 1}</span>
              </div>
              <h3 className="journey__step-title">{step.title}</h3>
              <p className="journey__step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <OrnamentalDivider />

      {/* --- 7. FEATURED MASTERPIECES (HORIZONTAL CAROUSEL) --- */}
      <section className="masterpieces">
        <div className="section__header">
          <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> Pure Sophistication</span>
          <h2 className="section__title">Featured Masterpieces</h2>
          <p className="section__subtitle">Explore individual highlights selected straight from our designer archives.</p>
        </div>

        <div className="masterpieces__slider-wrap">
          <div className="slide-container">
            <div className="slide-image-box" style={{ height: '450px' }}>
              <img src={IMAGES.masterpieces[currentMasterpiece]} alt={`Masterpiece highlight ${currentMasterpiece + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="slide-content-box" style={{ padding: '2rem' }}>
              <span className="limited-badge">Signature Line</span>
              <h3>Premium Threadwork Hoop #{currentMasterpiece + 1}</h3>
              <p>Woven completely using high-shine cotton threads with custom brass hoop alignments.</p>
              <button onClick={handleWhatsAppClick} className="btn btn--primary">Inquire Pricing</button>
            </div>
          </div>

          <div className="masterpieces__controls">
            <button 
              className="slider-btn" 
              onClick={() => setCurrentMasterpiece(prev => prev === 0 ? IMAGES.masterpieces.length - 1 : prev - 1)}
            >
              <FaChevronLeft />
            </button>
            <div className="masterpieces__pagination">
              {IMAGES.masterpieces.map((_, idx) => (
                <span key={idx} className={`dot ${currentMasterpiece === idx ? 'active' : ''}`} />
              ))}
            </div>
            <button 
              className="slider-btn" 
              onClick={() => setCurrentMasterpiece(prev => prev === IMAGES.masterpieces.length - 1 ? 0 : prev + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* --- 8. CUSTOMER TESTIMONIALS --- */}
      <section className="testimonials">
        <div className="testimonials__wrap">
          <div className="section__header">
            <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> Customer Love</span>
            <h2 className="section__title">Words That Inspire Us</h2>
          </div>

          <div className="testimonial-card">
            <FaQuoteLeft className="testimonial-card__quote-icon" />
            <p className="testimonial-card__quote">{TESTIMONIALS[currentTestimonial].quote}</p>
            <div className="testimonial-card__stars">
              {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => <FaStar key={i} />)}
            </div>
            <div className="testimonial-card__person">
              <img src={TESTIMONIALS[currentTestimonial].img} alt={TESTIMONIALS[currentTestimonial].name} />
              <div>
                <strong>{TESTIMONIALS[currentTestimonial].name}</strong>
                <span>{TESTIMONIALS[currentTestimonial].role}</span>
              </div>
            </div>
          </div>

          <div className="testimonials__pagination" style={{ marginTop: '2rem' }}>
            {TESTIMONIALS.map((_, idx) => (
              <button 
                key={idx} 
                className={`dot ${currentTestimonial === idx ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(idx)}
                style={{ width: '12px', height: '12px', borderRadius: '50%', margin: '0 5px', border: 'none', cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- 9. INSTAGRAM INSPIRATION --- */}
      <section className="instagram">
        <div className="section__header">
          <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> Behind The Scenes</span>
          <h2 className="section__title">Follow Our Thread Journey</h2>
        </div>

        <div className="instagram__grid">
          {IMAGES.instagram.map((img, index) => (
            <a 
              href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="instagram__item" 
              key={index}
            >
              <img src={img} alt={`Shree Collection Instagram photo ${index + 1}`} />
              <div className="instagram__overlay">
                <FaInstagram />
              </div>
            </a>
          ))}
        </div>

        <a 
          href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn--primary instagram__follow"
        >
          Follow @shree_collection_art
        </a>
      </section>

      {/* --- 10. FINAL CALL TO ACTION --- */}
      <section className="final-cta" style={{ '--cta-bg': `url(${IMAGES.ctaBg})` }} id="contact">
        <div className="final-cta__overlay"></div>
        <div className="final-cta__content">
          <span className="eyebrow"><GiSewingNeedle className="eyebrow-icon"/> Commission Work</span>
          <h2 className="final-cta__heading">Ready to Create Something Beautiful?</h2>
          <p className="final-cta__subtitle">Let us design your personalized silk frame or bridal choli. Drop a custom message to connect directly with the lead designer.</p>
          <div className="final-cta__buttons">
            <button onClick={handleWhatsAppClick} className="btn btn--primary"><FaWhatsapp /> WhatsApp Us</button>
            <a href="tel:+919923062181" className="btn btn--outline" style={{ borderColor: '#ffffff', color: '#ffffff' }}>Call Direct</a>
          </div>
        </div>
      </section>

      {/* --- 11. LUXURY FOOTER --- */}
      <footer className="footer">
        <div className="footer__top">
          <div className="dir-column col-brand-story">
            <div className="footer-brand-header">
              <h3 style={{ color: 'var(--color-gold)', fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>Shree Collection</h3>
            </div>
            <p className="brand-paragraph" style={{ fontSize: '0.88rem', opacity: 0.8, marginTop: '0.5rem', lineHeight: '1.6' }}>
              Curated manual thread art, premium custom-fit Indian stitching, and personalized silk keepsakes made with absolute artistic perfection.
            </p>
            <div className="footer__socials" style={{ marginTop: '1rem' }}>
              <a href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://youtube.com/@shree_hand_embroidery?si=yQ1gxB9E4spQr-pC" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer__links">
            <h4>Quick Nav</h4>
            <a href="#">Home</a>
            <a href="#services">Services</a>
            <a href="#collections">Collections</a>
            <a href="#journey">Atelier Story</a>
          </div>

          <div className="footer__links">
            <h4>Our Specialties</h4>
            <a href="#collections">Aari Embroidery</a>
            <a href="#collections">Bridal Blouses</a>
            <a href="#collections">Custom Cushion Sets</a>
            <a href="#collections">Fabric Painting</a>
          </div>

          <div className="footer__contact">
            <h4>Contact Details</h4>
            <p><FiPhone /> +91 9923062181</p>
            <p><FiMail /> info@shreecollection.art</p>
          </div>
        </div>

        <div className="footer__divider">
          <OrnamentalDivider />
        </div>

        <div className="footer__bottom">
          <p>© 2026 Shree Collection. Crafted with Love & Tradition. All Rights Reserved.</p>
          <p>Made with <FaHeart className="footer__heart" /> in Pune, India</p>
        </div>

        {/* Back to Top Button */}
        <button onClick={handleScrollToTop} className="footer-back-to-top-btn" aria-label="Back to Top">
          <div className="btt-circle-stitch-border">
            <FaArrowUp />
          </div>
        </button>
      </footer>

    </div>
  );
}