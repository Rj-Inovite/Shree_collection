import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

// --- Self-Contained SVG Icons ---
const LogoEmbroideryIcon = () => (
  <svg className="logo-stitch-icon" width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Concentric Gold Hoops */}
    <circle cx="50" cy="50" r="42" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="50" cy="50" r="38" stroke="#D4AF37" strokeWidth="1" />
    {/* Stylized Indian Floral Motif (Stitch-style) */}
    <path d="M50 20 C52 35 65 38 80 38 C65 42 62 55 50 80 C38 55 35 42 20 38 C35 38 48 35 50 20Z" fill="#C65D3D" opacity="0.85" />
    <path d="M50 30 C51 40 60 42 70 42 C60 44 58 52 50 70 C42 52 40 44 30 42 C40 42 49 40 50 30Z" fill="#D4AF37" />
    <circle cx="50" cy="50" r="5" fill="#FAF4EC" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  // Track window scroll to change background design styles dynamically
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gracefully close drawer if Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle outside click closures on Mobile view
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('mobile-drawer-overlay')) {
      setIsDrawerOpen(false);
    }
  };

  const triggerWhatsAppInquiry = () => {
    const waText = encodeURIComponent("Hello Shree Collection! I am visiting your digital boutique and would love to place a premium custom embroidery design inquiry.");
    window.open(`https://wa.me/919923062181?text=${waText}`, '_blank');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Contact', path: '/contact' }
  ];

  // Framer Motion Animation Variants
  const sidebarVariants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 350, damping: 35 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const linkContainerVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const singleLinkVariants = {
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    closed: { opacity: 0, y: 25 }
  };

  return (
    <>
      <header className={`shree-nav-header ${isScrolled ? 'scrolled-glass' : ''}`}>
        <div className="nav-gold-accent-line"></div>
        <div className="nav-wrapper-container">
          
          {/* --- LEFT: LOGO --- */}
          <NavLink to="/" className="brand-logo-container" aria-label="Shree Collection Home">
            <div className="logo-icon-wrapper">
              <LogoEmbroideryIcon />
            </div>
            <div className="brand-text-block">
              <span className="brand-shree">Shree</span>
              <span className="brand-collection">Collection</span>
            </div>
          </NavLink>

          {/* --- CENTER: DESKTOP NAVIGATION --- */}
          <nav className="desktop-navigation-links" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink 
                  key={item.name} 
                  to={item.path} 
                  className={({ isActive }) => `nav-item-anchor ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                  {/* Elegant active marker flourish */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator" 
                      className="active-gold-stitch-line"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      <span className="micro-stitch-node"></span>
                    </motion.div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* --- RIGHT: BUTTON --- */}
          <div className="nav-right-actions">
            <button 
              onClick={triggerWhatsAppInquiry} 
              className="premium-wa-pill-btn"
              aria-label="Inquire on WhatsApp"
            >
              <WhatsAppIcon />
              <span className="wa-text">Custom Inquiry</span>
            </button>

            {/* --- MOBILE HAMBURGER BUTTON --- */}
            <button 
              onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
              className="mobile-hamburger-btn"
              aria-expanded={isDrawerOpen}
              aria-label="Toggle Navigation Menu"
            >
              <div className={`hamburger-box ${isDrawerOpen ? 'morph' : ''}`}>
                <span className="ham-line line-top"></span>
                <span className="ham-line line-mid"></span>
                <span className="ham-line line-bot"></span>
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* --- FLOATING MOBILE DRAWER --- */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div 
            className="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          >
            <motion.div 
              className="mobile-side-drawer"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Internal Decorative corner flourish inside drawer */}
              <div className="drawer-corner-stitch-top"></div>
              <div className="drawer-corner-stitch-bottom"></div>

              {/* Drawer Top Header */}
              <div className="drawer-header">
                <div className="brand-logo-container">
                  <LogoEmbroideryIcon />
                  <div className="brand-text-block">
                    <span className="brand-shree text-brown">Shree</span>
                    <span className="brand-collection text-brown">Collection</span>
                  </div>
                </div>
              </div>

              <hr className="drawer-divider" />

              {/* Drawer Nav links */}
              <motion.nav 
                className="drawer-navigation-menu"
                variants={linkContainerVariants}
              >
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={singleLinkVariants}>
                    <NavLink 
                      to={item.path} 
                      onClick={() => setIsDrawerOpen(false)}
                      className={({ isActive }) => `drawer-link-item ${isActive ? 'active-drawer-item' : ''}`}
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Drawer Actions */}
              <div className="drawer-footer-actions">
                <button onClick={triggerWhatsAppInquiry} className="premium-wa-pill-btn w-100">
                  <WhatsAppIcon />
                  <span>Custom Inquiry</span>
                </button>

                <div className="drawer-socials">
                  <a href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href="https://youtube.com/@shree_hand_embroidery?si=yQ1gxB9E4spQr-pC" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <YouTubeIcon />
                  </a>
                </div>

                <div className="drawer-craft-notice">
                  <span>© 2026 Shree Collection • Handcrafted Art</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}