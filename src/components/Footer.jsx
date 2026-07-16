import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

// --- SVGs & Icons (Self-Contained Premium Vector Assets) ---
const NeedleThreadIcon = () => (
  <svg className="footer-needle-icon" width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 75 L75 20" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="71" cy="24" r="2" fill="#4B2F25" />
    <path d="M71 24 C80 30, 85 15, 65 40 C55 55, 40 45, 80 75" stroke="#C65D3D" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
  </svg>
);

const GoldFlourishIcon = () => (
  <svg width="40" height="20" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="gold-divider-svg">
    <path d="M5 20 C 25 5, 35 5, 50 20 C 65 35, 75 35, 95 20" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="20" r="3" fill="#C65D3D" />
    <circle cx="25" cy="14" r="2" fill="#D4AF37" />
    <circle cx="75" cy="26" r="2" fill="#D4AF37" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const UpArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

export default function Footer() {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleWhatsAppAction = () => {
    window.open("https://wa.me/919923062181?text=Hello%20Shree%20Collection!%20I%20am%20ready%20to%20create%20something%20beautiful%20together.", "_blank");
  };

  const instagramStripImages = [
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsP6A6aB9Np6cWe4xG8mRwsCVmJ9CEGwgHRdOQOWeVHWckh24NMNUtAs8&s=10", alt: "Embroidery Hoop Closeup" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWtIvZAjwfXg5D_nHOdDgOAQavtOAMHiN4viY2AdfX0dilPpALUJaKAvSR&s=10", alt: "Embroidered Shirt Design" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBbHjT9epm7y2erMqb8yfCDq2gWJky4m3mefZ0JJOEBR9Awf1DlP-wvCY&s=10", alt: "Handcrafted Cushion Covers" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vLX41lLtT6Rocix_RFfCU_nAg5ZtdV-juEFaxtsEoA&s=10", alt: "Detailed Fabric Painting" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwutJyspfUBrLVEFnZSxyUd_apEAEB96L8N6bbLJpPjNtRxfD5Am9_5kEX&s=10", alt: "Colorful Embroidery Threads" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUhgza4UBRTe5yMslFCUS-r7GsqhVgts-Dw94Ic6vJQ&s=10", alt: "Artisan Workspace Details" }
  ];

  return (
    <footer className="shree-luxury-footer">
      {/* Decorative ambient background assets */}
      <div className="footer-bg-flourish flourish-left"></div>
      <div className="footer-bg-flourish flourish-right"></div>
      <div className="floating-thread-particles"></div>

   

      {/* --- SECTION 2: METICULOUS FOUR-COLUMN ROW --- */}
      <section className="footer-columns-directory">
        <div className="directory-grid-max">
          
          {/* Column 1: Brand Story */}
          <div className="dir-column col-brand-story">
            <div className="footer-brand-header">
              <svg className="gold-hoop-svg" width="28" height="28" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="3" strokeDasharray="6 4" />
                <path d="M50 25 C52 40 65 42 75 42 C65 46 62 55 50 75 C38 55 35 46 25 42 C35 42 48 40 50 25Z" fill="#C65D3D" />
              </svg>
              <h3>Shree Collection</h3>
            </div>
            <p className="brand-paragraph">
              Shree Collection celebrates the timeless beauty of handmade embroidery, fabric painting, custom stitching, and artistic craftsmanship. Every creation is lovingly handcrafted with passion, creativity, and attention to every tiny detail, ensuring each design becomes a cherished memory.
            </p>
            <GoldFlourishIcon />
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="dir-column col-navigation-links">
            <h4>Quick Links</h4>
            <nav className="footer-nav-links" aria-label="Footer Nav Links">
              <Link to="/" className={`foot-link ${location.pathname === '/' ? 'active-foot-link' : ''}`}>
                <span className="dot-prefix"></span> Home
              </Link>
              <Link to="/collections" className={`foot-link ${location.pathname === '/collections' ? 'active-foot-link' : ''}`}>
                <span className="dot-prefix"></span> Collections
              </Link>
              <Link to="/contact" className={`foot-link ${location.pathname === '/contact' ? 'active-foot-link' : ''}`}>
                <span className="dot-prefix"></span> Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact & Social Ecosystem */}
          <div className="dir-column col-contact-comms">
            <h4>Contact Information</h4>
            <div className="phone-comms-row">
              <PhoneIcon />
              <a href="tel:+919923062181" className="phone-anchor">+91 9923062181</a>
            </div>
            <div className="social-icon-bubbles-row">
              <a href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" target="_blank" rel="noopener noreferrer" className="social-bubble-link" aria-label="Instagram Profile">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com/@shree_hand_embroidery?si=yQ1gxB9E4spQr-pC" target="_blank" rel="noopener noreferrer" className="social-bubble-link" aria-label="YouTube Channel">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Column 4: Specialties Cards */}
          <div className="dir-column col-specialties-index">
            <h4>Our Specialties</h4>
            <div className="specialties-vertical-stack">
              {["Hand Embroidery", "Fabric Painting", "Custom Stitching", "Bridal Designs", "Home Décor", "Personalized Gifts"].map((spec, i) => (
                <div key={i} className="specialty-mini-card">
                  <span className="card-stitch-node"></span>
                  <span className="spec-title">{spec}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: INSTAGRAM INSPIRATION STRIP --- */}
      <section className="footer-instagram-inspiration-strip">
        <div className="insta-strip-grid-max">
          {instagramStripImages.map((img, idx) => (
            <motion.a 
              href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4"
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              className="insta-strip-item"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="strip-image-crop">
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="strip-hover-curtain">
                  <InstagramIcon />
                  <span className="follow-prompt-text">View Feed</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* --- EMBROIDERED RUNNING STITCH SEAM SEPARATOR --- */}
      <div className="embroidered-seam-divider">
        <div className="running-thread-line"></div>
      </div>

   

      {/* --- FLOATING BACK TO TOP INTERACTIVE --- */}
      <button 
        onClick={scrollToTop} 
        className="footer-back-to-top-btn"
        aria-label="Scroll back to top of the page"
      >
        <div className="btt-circle-stitch-border">
          <UpArrowIcon />
        </div>
      </button>

    </footer>
  );
}