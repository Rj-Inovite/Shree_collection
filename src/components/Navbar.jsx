import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

// --- SVGs & Luxury Iconography ---
const LuxuryLogoEmblem = () => (
  <svg className="logo-stitch-icon" width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Gold Ornamental Ring */}
    <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.85" />
    <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="1" />
    <circle cx="50" cy="50" r="37" stroke="#C65D3D" strokeWidth="0.8" opacity="0.6" />
    
    {/* Central Royal Zardosi Star / Flower Motif */}
    <path d="M50 18 C53 34 66 37 82 37 C66 41 63 54 50 82 C37 54 34 41 18 37 C34 37 47 34 50 18Z" fill="#C65D3D" opacity="0.9" />
    <path d="M50 28 C52 38 60 40 70 40 C60 42 58 50 50 70 C42 50 40 42 30 40 C40 40 48 38 50 28Z" fill="#D4AF37" />
    <circle cx="50" cy="50" r="5" fill="#FAF4EC" stroke="#4B2F25" strokeWidth="1" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Scroll handler for transparent to frosted glass shift
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('mobile-drawer-overlay')) {
      setIsDrawerOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Contact', path: '/contact' }
  ];

  // Motion animation variants
  const sidebarVariants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 350, damping: 35 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const linkContainerVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const singleLinkVariants = {
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
    closed: { opacity: 0, y: 20 }
  };

  return (
    <>
      <header className={`shree-nav-header ${isScrolled ? 'scrolled-glass' : ''}`}>
        {/* Subtle Ornamental Top Gold Thread Filament */}
        <div className="nav-gold-accent-line"></div>
        
        <div className="nav-wrapper-container">
          
          {/* --- LEFT: REFINED BRAND LOGO --- */}
          <NavLink to="/" className="brand-logo-container" aria-label="Shree Collection Home">
            <div className="logo-icon-wrapper">
              <LuxuryLogoEmblem />
            </div>
            <div className="brand-text-block">
              <span className="brand-shree">Shree</span>
              <span className="brand-collection">COLLECTION</span>
              <span className="brand-subtitle-tag">Handcrafted Atelier</span>
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

          {/* --- RIGHT: AMBIENT ACTIONS & MENU TOGGLE --- */}
          <div className="nav-right-actions">
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="nav-action-circle-btn" 
              aria-label="Search Collections"
            >
              <SearchIcon />
            </button>

            {/* Mobile Animated Hamburger */}
            <button 
              onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
              className="mobile-hamburger-btn"
              aria-expanded={isDrawerOpen}
              aria-label="Toggle Menu"
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

      {/* --- QUICK OVERLAY SEARCH BAR --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="search-bar-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="search-input-container">
              <SearchIcon />
              <input type="text" placeholder="Search bridal motifs, hoops, cushion art..." autoFocus />
              <button className="search-close-btn" onClick={() => setIsSearchOpen(false)}>
                <CloseIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="drawer-corner-stitch-top"></div>
              <div className="drawer-corner-stitch-bottom"></div>

              {/* Drawer Brand Header */}
              <div className="drawer-header">
                <div className="brand-logo-container">
                  <LuxuryLogoEmblem />
                  <div className="brand-text-block">
                    <span className="brand-shree text-brown">Shree</span>
                    <span className="brand-collection text-brown">COLLECTION</span>
                  </div>
                </div>
              </div>

              <hr className="drawer-divider" />

              {/* Nav Menu */}
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

              {/* Drawer Footer Details */}
              <div className="drawer-footer-actions">
                <div className="drawer-socials">
                  <a href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href="https://youtube.com/@shree_hand_embroidery?si=yQ1gxB9E4spQr-pC" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <YouTubeIcon />
                  </a>
                </div>

                <div className="drawer-craft-notice">
                  <span>© 2026 Shree Collection • Luxury Handcraft</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}