import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Swiper imports & styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// React Icons (Verified & Valid Exports Only)
import { 
  FaWhatsapp, 
  FaInstagram, 
  FaStar, 
  FaQuoteLeft, 
  FaChevronLeft, 
  FaChevronRight, 
  FaPhoneAlt 
} from 'react-icons/fa';

import {
  GiSewingNeedle,
  GiPaintBrush,
  GiFlowerEmblem,
  GiFlowerPot,
  GiAmphora,
  GiClothes
} from 'react-icons/gi';

import { 
  FiLayers, 
  FiHeart, 
  FiAward, 
  FiCheckCircle, 
  FiClock, 
  FiArrowUpRight, 
  FiInstagram 
} from 'react-icons/fi';

import './Home.css';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 1. DATA DICTIONARY (Keeps component clean & easy to maintain)
// ============================================================================
const HOME_DATA = {
  images: {
    hero: "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=1200",
    handsStitching: "https://images.unsplash.com/photo-1572085312730-23a6b6ec8fc1?auto=format&fit=crop&q=80&w=1000",
    ctaBg: "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=1600"
  },
  services: [
    { icon: <GiSewingNeedle />, title: "Hand Embroidery", desc: "Traditional Aari, Zardosi, and French knot stitches meticulously crafted by master artisans." },
    { icon: <GiPaintBrush />, title: "Fabric Painting", desc: "Hand-painted botanical and traditional motifs using colorfast, organic dyes on rich silk." },
    { icon: <FiLayers />, title: "Custom Stitching", desc: "Bespoke tailoring engineered to accentuate your unique silhouette with haute couture precision." },
    { icon: <GiThreads />, title: "Blouse Designs", desc: "Statement necklines, intricate back motifs, and heavily embroidered sleeve borders for bridal wear." },
    { icon: <GiFlowerPot />, title: "Home Décor", desc: "Luxury throw cushions, embroidered wall hoops, and ornamental table runners." },
    { icon: <GiNeedleThread />, title: "Custom Orders", desc: "Monogrammed keepsakes, personalized anniversary hoops, and family heirloom pieces." }
  ],
  features: [
    { icon: <FiHeart />, title: "Handmade with Love", desc: "Crafted with patience and emotional dedication in every thread." },
    { icon: <GiThreads />, title: "Premium Materials", desc: "Pure mulberry silks, high-grade linen, and long-staple cotton threads." },
    { icon: <GiSewingNeedle />, title: "Custom Designs", desc: "Your unique inspiration brought to life with precise artistic renditions." },
    { icon: <FiAward />, title: "Skilled Craftsmanship", desc: "Generational artisans bringing centuries of Indian heritage to light." },
    { icon: <FiCheckCircle />, title: "Quality Finishing", desc: "Flawless border tucks, secure knots, and impeccable lining fabric." },
    { icon: <FiClock />, title: "Timely Delivery", desc: "Rigorous milestone tracking ensuring on-schedule dispatches worldwide." }
  ],
  masonryCollections: [
    { id: 1, type: "tall", tag: "Hoop Art", title: "Floral Collection", img: "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=800" },
    { id: 2, type: "wide", tag: "Couture", title: "Bridal Collection", img: "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=800" },
    { id: 3, type: "standard", tag: "Living", title: "Cushion Covers", img: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800" },
    { id: 4, type: "standard", tag: "Linen", title: "Bedsheets", img: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800" },
    { id: 5, type: "wide", tag: "Personalized", title: "Personalized Gifts", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800" },
    { id: 6, type: "tall", tag: "Festive", title: "Festival Collection", img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800" }
  ],
  timeline: [
    { num: "01", title: "Idea", desc: "We map out your vision, color palettes, and motif references." },
    { num: "02", title: "Sketch", desc: "Precision pencil drafts drawn directly onto the backing stencil." },
    { num: "03", title: "Thread Selection", desc: "Curating luster-matched silk skeins and metallic zari threads." },
    { num: "04", title: "Hand Embroidery", desc: "Artisans execute thousand-stitch patterns over days of focus." },
    { num: "05", title: "Finishing", desc: "Careful steam pressing, border lining, and quality inspection." },
    { num: "06", title: "Delivery", desc: "Hand-wrapped in luxury eco-friendly keepsake packaging." }
  ],
  masterpieces: [
    { title: "The Royal Lotus Hoop", category: "Botanical Hoops", img: "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=800" },
    { title: "Crimson Zardosi Bridal Choli", category: "Bridal Apparel", img: "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=800" },
    { title: "Peacock Whispers Silk Cushion", category: "Luxury Living", img: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800" },
    { title: "Heritage Gold Mandala Sheet", category: "Fine Bedding", img: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800" }
  ],
  testimonials: [
    { name: "Ananya Deshmukh", city: "Pune", text: "The embroidery on my bridal blouse was absolute perfection. Every guest asked where I got it customized!", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" },
    { name: "Sanjana Rao", city: "Mumbai", text: "The customized anniversary hoop made my mother cry tears of joy. The delicate French knots are breathtaking.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
    { name: "Meera Nair", city: "Bangalore", text: "Truly international luxury quality with a warm Indian soul. Shree Collection is now my go-to for bespoke gifts.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" }
  ],
  instagramGallery: [
    "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1572085312730-23a6b6ec8fc1?auto=format&fit=crop&q=80&w=500"
  ]
};

// ============================================================================
// 2. CUSTOM HOOKS
// ============================================================================
const useLenis = () => {
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

    return () => lenis.destroy();
  }, []);
};

const useHeroGsap = (heroTextRef, heroImageRef, heroBadgeRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(heroTextRef.current.children, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
      )
      .fromTo(heroImageRef.current, 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.2 }, 
        "-=0.6"
      )
      .fromTo(heroBadgeRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, [heroTextRef, heroImageRef, heroBadgeRef]);
};

// Global WhatsApp Trigger Utility
const triggerWhatsApp = () => {
  window.open("https://wa.me/919923062181?text=Hello%20Shree%20Collection!%20I'd%20like%20to%20inquire%20about%20a%20custom%20handcrafted%20embroidery%20order.", "_blank");
};

// ============================================================================
// 3. REUSABLE SUB-COMPONENTS
// ============================================================================
const GoldenOrnamentalDivider = () => (
  <div className="ornamental-divider-wrap" aria-hidden="true">
    <div className="divider-line"></div>
    <div className="divider-motif">
      <svg viewBox="0 0 100 30" className="motif-svg">
        <path d="M10 15 C 30 0, 40 0, 50 15 C 60 30, 70 30, 90 15" stroke="#D4AF37" strokeWidth="2" fill="none" />
        <circle cx="50" cy="15" r="4" fill="#C65D3D" />
        <circle cx="20" cy="10" r="2.5" fill="#D4AF37" />
        <circle cx="80" cy="20" r="2.5" fill="#D4AF37" />
      </svg>
    </div>
    <div className="divider-line"></div>
  </div>
);

const SectionHeader = ({ tag, title, subtitle }) => (
  <div className="section-header text-center">
    <span className="eyebrow-tag"><GiSewingNeedle /> {tag}</span>
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);

// --- SECTION MODULES ---
const HeroSection = ({ heroTextRef, heroImageRef, heroBadgeRef }) => (
  <section className="hero-section">
    <div className="hero-bg-texture"></div>
    <div className="container hero-grid">
      <div className="hero-text-col" ref={heroTextRef}>
        <span className="eyebrow-tag">
          <GiSewingNeedle /> Artisanal Indian Heritage
        </span>
        <h1 className="hero-title">
          Crafted by Hand, <br />
          <span className="text-highlight">Made for You</span>
        </h1>
        <p className="hero-subtitle">
          Every stitch tells a story of love, patience, creativity, and timeless Indian craftsmanship.
        </p>
        <div className="hero-btn-group">
          <a href="#collections" className="btn btn-primary stitch-border">Explore Collections</a>
          <a href="#contact" className="btn btn-secondary">Contact Us</a>
        </div>
        <div className="hero-trust-indicators">
          <div className="trust-item">
            <span className="trust-number">100%</span>
            <span className="trust-label">Handmade</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <span className="trust-number">7+</span>
            <span className="trust-label">Major Projects</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <span className="trust-number">5★</span>
            <span className="trust-label">Rating</span>
          </div>
        </div>
      </div>

      <div className="hero-image-col">
        <div className="hero-image-wrapper" ref={heroImageRef}>
          <img src={HOME_DATA.images.hero} alt="Artisan hands stitching floral embroidery hoop" className="hero-main-img" />
          <div className="hero-image-frame"></div>
          <div className="hero-floating-badge" ref={heroBadgeRef}>
            <div className="badge-icon"><GiThreads /></div>
            <div className="badge-text">
              <strong>Silk & Cotton Threads</strong>
              <span>Traditional Handiwork</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="services-section" id="services">
    <div className="container">
      <SectionHeader 
        tag="Our Expertise"
        title="Handcrafted Boutique Services"
        subtitle="Discover our wide array of bespoke embroidery, custom stitching, and handcrafted home decor."
      />
      <div className="services-grid">
        {HOME_DATA.services.map((service, index) => (
          <motion.div 
            key={index} 
            className="service-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="service-card-border-glow"></div>
            <div className="service-icon-box">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
            <span className="service-card-step">0{index + 1}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseSection = () => (
  <section className="why-choose-section">
    <div className="container why-choose-grid">
      <div className="why-image-col">
        <div className="why-img-frame">
          <img src={HOME_DATA.images.handsStitching} alt="Artisan hands stitching delicate fabric" />
          <div className="why-img-gold-border"></div>
        </div>
      </div>
      <div className="why-content-col">
        <span className="eyebrow-tag"><GiSewingNeedle /> Uncompromising Quality</span>
        <h2 className="section-title">Why Choose Shree Collection</h2>
        <p className="section-subtitle">We believe in deliberate luxury. Every single motif is hand-drawn, threaded, and sewn without high-speed machinery.</p>
        <div className="features-grid">
          {HOME_DATA.features.map((feat, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feat.icon}</div>
              <div className="feature-text">
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CollectionsSection = () => (
  <section className="collections-section" id="collections">
    <div className="container">
      <SectionHeader 
        tag="Fine Archives"
        title="Signature Collections"
        subtitle="Explore a curated gallery of our most celebrated handcrafted creations."
      />
      <div className="masonry-grid">
        {HOME_DATA.masonryCollections.map((item) => (
          <motion.div 
            key={item.id} 
            className={`masonry-item ${item.type}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <img src={item.img} alt={item.title} className="masonry-img" />
            <div className="masonry-overlay">
              <span className="masonry-tag">{item.tag}</span>
              <h3 className="masonry-title">{item.title}</h3>
              <div className="masonry-arrow"><FiArrowUpRight /></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const JourneySection = () => (
  <section className="journey-section">
    <div className="container">
      <SectionHeader 
        tag="Atelier Timeline"
        title="Our Craftsmanship Journey"
        subtitle="From pencil draft to final pressed stitch—witness how your bespoke creation unfolds."
      />
      <div className="timeline-wrapper">
        <div className="timeline-line"></div>
        <div className="timeline-steps-grid">
          {HOME_DATA.timeline.map((step, idx) => (
            <div className="timeline-step" key={idx}>
              <div className="timeline-node">
                <span className="node-glow"></span>
                <span className="node-num">{step.num}</span>
              </div>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const MasterpiecesSection = () => (
  <section className="masterpieces-section">
    <div className="container">
      <SectionHeader tag="Exclusive Showcase" title="Featured Masterpieces" />
      <div className="swiper-outer-wrapper">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.masterpieces-pagination' }}
          navigation={{ nextEl: '.mp-next', prevEl: '.mp-prev' }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="masterpieces-swiper"
        >
          {HOME_DATA.masterpieces.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="masterpiece-card">
                <div className="mp-image-wrap">
                  <img src={item.img} alt={item.title} />
                  <span className="mp-tag">{item.category}</span>
                </div>
                <div className="mp-body">
                  <h3>{item.title}</h3>
                  <button onClick={triggerWhatsApp} className="mp-inquire-btn">Inquire Design</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-custom-controls">
          <button className="mp-prev ctrl-btn" aria-label="Previous Slide"><FaChevronLeft /></button>
          <div className="masterpieces-pagination"></div>
          <button className="mp-next ctrl-btn" aria-label="Next Slide"><FaChevronRight /></button>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="testimonials-section">
    <div className="container">
      <SectionHeader tag="Words That Inspire Us" title="Customer Experiences" />
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        breakpoints={{ 768: { slidesPerView: 2 } }}
        className="testimonials-swiper"
      >
        {HOME_DATA.testimonials.map((test, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">"{test.text}"</p>
              <div className="star-row">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <div className="testimonial-profile">
                <img src={test.img} alt={test.name} />
                <div>
                  <h5>{test.name}</h5>
                  <span>{test.city}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

const InstagramSection = () => (
  <section className="instagram-section">
    <div className="container">
      <SectionHeader 
        tag="@shree_collection_art"
        title="Instagram Inspiration"
        subtitle="Peek inside our studio feed for behind-the-scenes stitch reels and work in progress."
      />
      <div className="insta-grid">
        {HOME_DATA.instagramGallery.map((imgUrl, idx) => (
          <a 
            key={idx} 
            href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="insta-item"
          >
            <img src={imgUrl} alt={`Shree Collection Instagram photo ${idx + 1}`} />
            <div className="insta-hover-overlay">
              <FiInstagram />
            </div>
          </a>
        ))}
      </div>
      <div className="text-center mt-4">
        <a 
          href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary stitch-border"
        >
          Follow Us on Instagram
        </a>
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="final-cta-section" style={{ backgroundImage: `url(${HOME_DATA.images.ctaBg})` }} id="contact">
    <div className="cta-matte-overlay"></div>
    <div className="container cta-content text-center">
      <span className="eyebrow-tag gold"><GiSewingNeedle /> Start Your Custom Order</span>
      <h2>Let's Create Something Beautiful Together</h2>
      <p>
        Whether you dream of customized bridal wear, personalized hoop keepsakes, or luxury embroidered throw cushions, we are ready to weave your imagination into timeless fabric art.
      </p>
      <div className="cta-btn-group">
        <a href="tel:+919923062181" className="btn btn-primary stitch-border">
          <FaPhoneAlt /> Call Direct
        </a>
        <button onClick={triggerWhatsApp} className="btn btn-whatsapp">
          <FaWhatsapp /> WhatsApp Us
        </button>
      </div>
    </div>
  </section>
);

// ============================================================================
// 4. MAIN HOMEPAGE COMPONENT
// ============================================================================
export default function Home() {
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroBadgeRef = useRef(null);

  // Initialize Smooth Scrolling Hook
  useLenis();

  // Initialize GSAP Animations Hook
  useHeroGsap(heroTextRef, heroImageRef, heroBadgeRef);

  return (
    <div className="shree-home-wrapper">
      {/* Background Ambient Florals */}
      <div className="floating-floral-decor decor-top-left" aria-hidden="true"><GiFlowerEmblem /></div>
      <div className="floating-floral-decor decor-bottom-right" aria-hidden="true"><GiFlowerEmblem /></div>

      {/* Sections Sequence */}
      <HeroSection heroTextRef={heroTextRef} heroImageRef={heroImageRef} heroBadgeRef={heroBadgeRef} />
      <GoldenOrnamentalDivider />
      
      <ServicesSection />
      <GoldenOrnamentalDivider />
      
      <WhyChooseSection />
      <GoldenOrnamentalDivider />
      
      <CollectionsSection />
      <GoldenOrnamentalDivider />
      
      <JourneySection />
      <GoldenOrnamentalDivider />
      
      <MasterpiecesSection />
      <TestimonialsSection />
      <InstagramSection />
      <CtaSection />
    </div>
  );
}