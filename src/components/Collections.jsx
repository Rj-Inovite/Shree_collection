import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Collections.css';

// --- SVGs & Icons (Self-contained, ultra-clean) ---
const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

// --- STATIC COLLECTIONS DATABASE ---
const CATEGORIES = [
  "All", "Floral Embroidery", "Bridal Designs", "Blouse Collection", 
  "Sarees", "Kids Collection", "Home Décor", "Cushion Covers", 
  "Bedsheets", "Fabric Painting", "Personalized Gifts", "Festival Collection", "Custom Orders"
];

const GALLERY_ITEMS = [
  { id: 1, category: "Floral Embroidery", title: "Vintage Rose Hoop", desc: "Delicate French knots on pristine linen backing.", img: "https://i.pinimg.com/236x/c6/cb/22/c6cb22ab0f3e087bbe2a0ff17dc602ec.jpg", height: "400px" },
  { id: 2, category: "Bridal Designs", title: "Royal Zardosi Blouse", desc: "Gilded metallic threads woven with precision beads.", img: "https://d1311wbk6unapo.cloudfront.net/NushopCatalogue/tr:f-webp,w-600,fo-auto/68d12eb8f9f785e1e2bb946f/cat_img/Beautiful_Patch_Work_Designer_Khadi_Handwork_Blouse_MCXEF68754_2025-12-26_1.jpeg", height: "520px" },
  { id: 3, category: "Fabric Painting", title: "Lotus Bloom Dupatta", desc: "Water-resistant fine hand strokes on silk threads.", img: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=800", height: "460px" },
  { id: 4, category: "Cushion Covers", title: "Marigold Harmony Cover", desc: "Chunky textured Crewel work on raw cotton.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiH0HHg90eNoo-YRaDPPLvMbUBFU9yZR_MyzZSna8ViABmORccb-WHYuo&s=10", height: "380px" },
  { id: 5, category: "Sarees", title: "Kantha Weave Silk Saree", desc: "Stunning running-stitch border depicting rural folklore.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6EuPE3Nr0FO9JEyekMCZYWrgbC0bmaVm-TPFyYQm5ujIiaaOfu6WHtOQ&s=10", height: "540px" },
  { id: 6, category: "Kids Collection", title: "Playful Elephant Romper", desc: "Hypoallergenic soft organic cotton with cute animal silhouettes.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCjeHerHzsqEovyun96WHGXZuw_sA7WbCTJKEu6mQrQ&s=10", height: "420px" },
  { id: 7, category: "Personalized Gifts", title: "Aniversary Keepsake Hoop", desc: "Floral monogram stitched with personalized celebration dates.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnI25sqsiWAMjBinWJxJk89eSMihhwSCt2TqJjjzDqNaTqktjox5QEK5Ww&s=10", height: "480px" },
  { id: 8, category: "Bedsheets", title: "Mandala Garden Sheet", desc: "Symmetrical heavy stitch patterns for your elegant sanctuary.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkHUTyY9ZVGZfXSJ95aZmVWX7dgsXWABJHvOD3nH3iR11kFY1yCfBt5Jj&s=10", height: "360px" },
  { id: 9, category: "Home Décor", title: "Wildflower Table Runner", desc: "Detailed chain stitches depicting lush botanical meadows.", img: "https://i.pinimg.com/236x/8c/d1/d7/8cd1d7458c2cc2a192100f48a082f788.jpg", height: "500px" },
  { id: 10, category: "Festival Collection", title: "Golden Diya Wall Banner", desc: "Splendid festive embroidery with sequence highlights.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrLDVaQNIMwJbjDA5vCz9o0vkJTaNkKc4imB_dfufH4A&s", height: "440px" },
  { id: 11, category: "Custom Orders", title: "Peacock Whispers Hoop", desc: "Intricate blue and emerald satin stitch blend.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiH0HHg90eNoo-YRaDPPLvMbUBFU9yZR_MyzZSna8ViABmORccb-WHYuo&s=10", height: "490px" },
  { id: 12, category: "Blouse Collection", title: "Bridal Crimson Choli", desc: "Classic heavy thread embroidery and pearl borders.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzY7nTDSNXSwgB2o-5KtWhQ5HikU0QTdMpqGvTrV-11Xi9WPtHqTXeyg0&s=10", height: "430px" }
];

const FEATURED_SLIDER = [
  { title: "The Royal Heritage Line", desc: "Regal hand-painted fabrics combined with heavy Aari embroidery borders, crafted over 120 artisan hours.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7KRkY9u8NghX8Y3MxUHsl70cPukfU2E8woy9Zw6ExsA&s=10" },
  { title: "Meadow Whispers", desc: "Soft pastel threads detailing spring blossoms onto raw organic linens, bringing nature right to your home.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvEIeAdtGEy5aPy_Rky6P2qqr9JGr8plZBzX9a1fvkZ-aFRxdE4KLPuW1n&s=10" },
  { title: "Ethereal Bridal Coutures", desc: "Bespoke bridal wear featuring intricate gold bullion work, custom tailored to weave your unique wedding narrative.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2W1X9WSzXPFDWEPeIwk4OzVtupcxmbXA5Knk8cmhQw&s=10" }
];

const BEHIND_THE_CRAFT_TIMELINE = [
  { step: "01", title: "Thread Selection", desc: "We handpick long-staple cotton threads and high-luster silk skeins globally to ensure brilliant sheen and lifetime durability.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUkv4S0MfZYwdiYsJER_PEdGuH1rZn_RTTw2ha4Z0GY4a--Gh9eb3WQbBX&s=10" },
  { step: "02", title: "Sketch Preparation", desc: "Our designs begin as pencil concepts, delicately transferred to premium cloth sheets with strict symmetry markers.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzutxQWM-PVTtF4r3KeryosnwOFHBJ3OoPzgndwiN8UA&s=10" },
  { step: "03", title: "Expert Needlework", desc: "With hours of immense focus, artisans construct perfect knots, satin flats, and exquisite bead layouts.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrLDVaQNIMwJbjDA5vCz9o0vkJTaNkKc4imB_dfufH4A&s=10" },
  { step: "04", title: "Finishing & Wash", desc: "Fabrics are gently stretched, carefully washed, steamed, and framed inside fine organic woods or tailored into heavy apparel.", img: "https://i.pinimg.com/236x/c7/d7/9a/c7d79ab0cc338e0262e9309bf0130cd9.jpg" }
];

const CUSTOMER_FAVORITES = [
  { title: "The Sovereign Peacock Hoop", badge: "Best Seller", desc: "Stunning rich blues blended with genuine emerald green threads.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrLDVaQNIMwJbjDA5vCz9o0vkJTaNkKc4imB_dfufH4A&s=10" },
  { title: "Gilded Ivory Cushion", badge: "Highly Rated", desc: "Luxury textured cushion featuring subtle gold leaf and custom chain stitching.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiH0HHg90eNoo-YRaDPPLvMbUBFU9yZR_MyzZSna8ViABmORccb-WHYuo&s=10" },
  { title: "Monogrammed Linen Frame", badge: "Perfect Gift", desc: "Delicate customizable initials surrounded by classic English spring wreaths.", img: "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=400" }
];

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Lightbox States
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Navigation track
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play Slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === FEATURED_SLIDER.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  // Filtered Items
  const filteredGallery = GALLERY_ITEMS.filter(item => 
    activeCategory === "All" || item.category === activeCategory
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "ArrowLeft") handlePrevLightbox();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/919923062181?text=Hello%20Shree%20Collection!%20I'd%20like%20to%20place%20a%20custom%20order.", "_blank");
  };

  return (
    <div className="shree-collections-page">
      
      {/* Decorative background vectors */}
      <div className="bg-linen-stitch-top"></div>
      <div className="bg-linen-stitch-bottom"></div>

      {/* --- STICKY NAVIGATION --- */}
      <header className={`collections-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="brand-logo">
            <h2>Shree Collection</h2>
            <span className="sub-logo">Handmade Artistry</span>
          </div>
          
          <nav className="desktop-menu">
            <a href="#home">Home</a>
            <a href="#collections" className="active">Collections</a>
            <a href="#contact">Contact</a>
          </nav>

          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mobile-dropdown"
            >
              <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#collections" className="active" onClick={() => setMobileMenuOpen(false)}>Collections</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO BANNER --- */}
      <section className="collections-hero">
        <div className="hero-darkener"></div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-inner"
          >
            <span className="sc-subtitle">Premium Fabric Art Gallery</span>
            <h1>Our Handmade Collections</h1>
            <p>Discover handcrafted embroidery, fabric painting, stitching, and custom creations made with patience, precision, and passion.</p>
            <div className="scroll-indicator">
              <span className="mouse-wheel"></span>
              <span className="label">Scroll to Explore</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CATEGORY FILTER --- */}
      <section className="filter-section">
        <div className="container">
          <div className="category-scroll-container">
            {CATEGORIES.map((cat, idx) => (
              <button 
                key={idx}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- PREMIUM GALLERY MASONRY --- */}
      <section className="gallery-masonry-section">
        <div className="container">
          <motion.div layout className="masonry-grid">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="masonry-item"
                  style={{ height: item.height }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="masonry-inner-card">
                    <img src={item.img} alt={item.title} className="masonry-img" loading="lazy" />
                    <div className="card-luxury-overlay">
                      <div className="dashed-border"></div>
                      <div className="overlay-text">
                        <span className="item-cat">{item.category}</span>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- INTERACTIVE LIGHTBOX --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
          >
            <button className="lightbox-btn close" onClick={() => setLightboxIndex(null)}>
              <CloseIcon />
            </button>
            
            <button className="lightbox-btn prev" onClick={handlePrevLightbox}>
              <ArrowLeft />
            </button>

            <div className="lightbox-content">
              <motion.img 
                key={filteredGallery[lightboxIndex].id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                src={filteredGallery[lightboxIndex].img} 
                alt={filteredGallery[lightboxIndex].title} 
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <span className="cap-cat">{filteredGallery[lightboxIndex].category}</span>
                <h2>{filteredGallery[lightboxIndex].title}</h2>
                <p>{filteredGallery[lightboxIndex].desc}</p>
                <div className="lightbox-counter">
                  {lightboxIndex + 1} of {filteredGallery.length}
                </div>
              </div>
            </div>

            <button className="lightbox-btn next" onClick={handleNextLightbox}>
              <ArrowRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FEATURED COLLECTION SLIDER --- */}
      <section className="featured-slider-section">
        <div className="container">
          <h2 className="section-title">The Masterpiece Selection</h2>
          <div className="slider-wrapper">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className="slide-container"
              >
                <div className="slide-image-box">
                  <img src={FEATURED_SLIDER[currentSlide].img} alt={FEATURED_SLIDER[currentSlide].title} />
                </div>
                <div className="slide-content-box">
                  <span className="limited-badge">Exclusive Handiwork</span>
                  <h3>{FEATURED_SLIDER[currentSlide].title}</h3>
                  <p>{FEATURED_SLIDER[currentSlide].desc}</p>
                  <a href="#contact" className="btn-explore stitch-border">Commission Now</a>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="slider-dots">
              {FEATURED_SLIDER.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`dot ${currentSlide === idx ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- BEHIND THE CRAFT TIMELINE --- */}
      <section className="behind-craft-section">
        <div className="container">
          <h2 className="section-title">Behind the Craft</h2>
          <p className="section-subtitle-text text-center">Take a closer look at the steps we follow to make sure every thread and seam is placed perfectly.</p>
          
          <div className="timeline-journey">
            {BEHIND_THE_CRAFT_TIMELINE.map((item, idx) => (
              <div className="timeline-node" key={idx}>
                <div className="timeline-image">
                  <img src={item.img} alt={item.title} loading="lazy" />
                </div>
                <div className="timeline-content">
                  <span className="step-num">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CUSTOMER FAVORITES --- */}
      <section className="customer-favs-section">
        <div className="container">
          <h2 className="section-title">Cherished by Our Patrons</h2>
          <div className="favs-grid">
            {CUSTOMER_FAVORITES.map((fav, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="fav-card"
              >
                <div className="fav-img-wrap">
                  <img src={fav.img} alt={fav.title} loading="lazy" />
                  <span className="fav-badge">{fav.badge}</span>
                </div>
                <div className="fav-body">
                  <h4>{fav.title}</h4>
                  <p>{fav.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INSTAGRAM SOCIAL REELS STYLE SECTION --- */}
      <section className="insta-style-section">
        <div className="container">
          <h2 className="section-title">Inside Our Studio</h2>
          <p className="section-subtitle-text text-center">Follow our thread-work updates and watch raw linen transform into visual masterpieces.</p>
          
          <div className="insta-row">
            <div className="insta-cell">
              <img src="https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=400" alt="Detail 1" />
              <div className="hover-insta"><InstagramIcon /></div>
            </div>
            <div className="insta-cell">
              <img src="https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=400" alt="Detail 2" />
              <div className="hover-insta"><InstagramIcon /></div>
            </div>
            <div className="insta-cell">
              <img src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=400" alt="Detail 3" />
              <div className="hover-insta"><InstagramIcon /></div>
            </div>
            <div className="insta-cell">
              <img src="https://images.unsplash.com/photo-1572085312730-23a6b6ec8fc1?auto=format&fit=crop&q=80&w=400" alt="Detail 4" />
              <div className="hover-insta"><InstagramIcon /></div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <a href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" target="_blank" rel="noopener noreferrer" className="btn-insta-follow">
              <InstagramIcon /> Follow Us @shree_collection_art
            </a>
          </div>
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="collections-cta">
        <div className="cta-matte-overlay"></div>
        <div className="cta-container">
          <h2>Ready to Create Your Own Custom Design?</h2>
          <p>Whether you need custom bridal blouses, curated family hoops, or rich home fabrics, we construct your aesthetic dreams thread-by-thread.</p>
          <div className="cta-btn-wrap">
            <a href="#contact" className="btn-cta-link stitch-style">Contact Us</a>
            <button onClick={handleWhatsAppRedirect} className="btn-cta-link btn-wa stitch-style-green">
              <WhatsAppIcon /> WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
}