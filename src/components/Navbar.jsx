import React, { useEffect, useRef, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

/* ============================================================================
   1. NAV DATA  (your routes are kept exactly as they were)
   ==========================================================================*/
const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Collections", to: "/collections" },
  { label: "Contact", to: "/contact" },
];

const WHATSAPP_NUMBER = "919999999999";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello Shree Collection! I'd love to place a custom embroidery inquiry."
)}`;

/* ============================================================================
   2. DECORATIVE PRIMITIVES
   ==========================================================================*/

/**
 * Delicate floral embroidery-inspired mark.
 * A central bloom with 4 layered petals and embroidered leaf trails.
 * Drawn at 56x56 so it always reads crisp at any rendered size.
 */
const EmbroideryMark = () => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="snav-logo__mark-svg"
    aria-hidden="true"
  >
    {/* Outer faint halo */}
    <circle
      cx="28"
      cy="28"
      r="24"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeDasharray="1 3"
      opacity="0.45"
    />

    {/* Four embroidered leaves around the bloom */}
    <g
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Top */}
      <path d="M28 8 C30 14 32 18 28 22 C24 18 26 14 28 8 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M28 12 L28 19" opacity="0.6" />
      {/* Right */}
      <path d="M48 28 C42 30 38 32 34 28 C38 24 42 26 48 28 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M44 28 L37 28" opacity="0.6" />
      {/* Bottom */}
      <path d="M28 48 C26 42 24 38 28 34 C32 38 30 42 28 48 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M28 44 L28 37" opacity="0.6" />
      {/* Left */}
      <path d="M8 28 C14 26 18 24 22 28 C18 32 14 30 8 28 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M12 28 L19 28" opacity="0.6" />
    </g>

    {/* Diagonal embroidered accents */}
    <g
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      opacity="0.7"
    >
      <path d="M16 16 C19 19 21 21 22 22" />
      <path d="M40 16 C37 19 35 21 34 22" />
      <path d="M16 40 C19 37 21 35 22 34" />
      <path d="M40 40 C37 37 35 35 34 34" />
    </g>

    {/* Central bloom */}
    <g>
      <circle cx="28" cy="28" r="5.2" fill="currentColor" fillOpacity="0.22" />
      <circle cx="28" cy="28" r="5.2" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="28" r="1.8" fill="currentColor" />
      {/* Tiny stamen dots */}
      <circle cx="25.4" cy="25.4" r="0.7" fill="currentColor" />
      <circle cx="30.6" cy="25.4" r="0.7" fill="currentColor" />
      <circle cx="25.4" cy="30.6" r="0.7" fill="currentColor" />
      <circle cx="30.6" cy="30.6" r="0.7" fill="currentColor" />
    </g>
  </svg>
);

/** Minimal floral corner flourish used inside the navbar + drawer. */
const FloralFlourish = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`snav-flourish ${className}`}
    aria-hidden="true"
  >
    <path
      d="M6 6c18 0 24 12 24 24M6 6c0 18 12 24 24 24"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <circle cx="30" cy="30" r="3.5" stroke="currentColor" strokeWidth="1" />
    <circle cx="30" cy="30" r="1" fill="currentColor" />
    <path
      d="M14 14c2 4 2 6 0 10M22 22c4 2 6 2 10 0"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

/** A tiny decorative flourish rendered under the active nav link. */
const ActiveFlourish = () => (
  <svg
    viewBox="0 0 40 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="snav-link__flourish"
    aria-hidden="true"
  >
    <path
      d="M2 7c6-8 12-8 18 0s12 8 18 0"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="20" cy="7" r="1.6" fill="currentColor" />
  </svg>
);

/* ============================================================================
   3. MAIN COMPONENT
   ==========================================================================*/

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const firstFocusableRef = useRef(null);

  /* ---------------------------------------------------------------------
     3.1 Frosted-glass transition on scroll
     -------------------------------------------------------------------*/
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------------------------------------------------------------
     3.2 Lock body scroll while the mobile drawer is open
     -------------------------------------------------------------------*/
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* ---------------------------------------------------------------------
     3.3 Close on Escape key
     -------------------------------------------------------------------*/
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ---------------------------------------------------------------------
     3.4 Move focus into the drawer when it opens (basic accessibility)
     -------------------------------------------------------------------*/
  useEffect(() => {
    if (drawerOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  /* ---------------------------------------------------------------------
     3.5 Framer Motion variants
     -------------------------------------------------------------------*/
  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const drawerListVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };

  const drawerItemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* ================================================================
          EMBEDDED STYLES — plain CSS scoped with the `snav-` prefix
      ================================================================= */}
      <style>{NAVBAR_CSS}</style>

      <header
        className={`snav ${isScrolled ? "snav--scrolled" : ""}`}
        role="banner"
      >
        <FloralFlourish className="snav-flourish--left" />
        <FloralFlourish className="snav-flourish--right" />

        <div className="snav__inner">
          {/* ============================================================
              LOGO — left
          ============================================================= */}
          <NavLink
            to="/"
            className="snav-logo"
            aria-label="Shree Collection — Home"
          >
            <motion.span
              className="snav-logo__mark"
              whileHover={{ rotate: 14, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
            >
              <EmbroideryMark />
            </motion.span>
            <span className="snav-logo__text">
              <span className="snav-logo__brand">
                <span className="snav-logo__brand-shree">Shree</span>
                <span className="snav-logo__brand-dot" aria-hidden="true">·</span>
              </span>
              <span className="snav-logo__sub">Embroidery Atelier</span>
            </span>
          </NavLink>

          {/* ============================================================
              CENTER NAVIGATION
          ============================================================= */}
          <nav className="snav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `snav-link ${isActive ? "snav-link--active" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="snav-link__label">{item.label}</span>
                    <span className="snav-link__underline" aria-hidden="true" />
                    {isActive && <ActiveFlourish />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ============================================================
              RIGHT SIDE — WhatsApp CTA + Mobile Menu Button
          ============================================================= */}
          <div className="snav-actions">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="snav-whatsapp"
            >
              <FaWhatsapp className="snav-whatsapp__icon" />
              <span>Custom Inquiry</span>
            </a>

            <button
              type="button"
              className={`snav-burger ${drawerOpen ? "snav-burger--open" : ""}`}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="snav-drawer"
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              <span className="snav-burger__line snav-burger__line--1" />
              <span className="snav-burger__line snav-burger__line--2" />
              <span className="snav-burger__line snav-burger__line--3" />
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================
          MOBILE DRAWER
      ================================================================= */}
      <AnimatePresence>
        {drawerOpen && (
          <React.Fragment key="drawer-root">
            <motion.div
              className="snav-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeDrawer}
            />
            <motion.aside
              id="snav-drawer"
              className="snav-drawer"
              ref={drawerRef}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <FloralFlourish className="snav-flourish--drawer-top" />
              <FloralFlourish className="snav-flourish--drawer-bottom" />

              <div className="snav-drawer__header">
                <NavLink
                  to="/"
                  className="snav-logo snav-logo--drawer"
                  onClick={closeDrawer}
                  ref={firstFocusableRef}
                >
                  <span className="snav-logo__mark">
                    <EmbroideryMark />
                  </span>
                  <span className="snav-logo__text">
                    <span className="snav-logo__brand">
                      <span className="snav-logo__brand-shree">Shree</span>
                      <span className="snav-logo__brand-dot" aria-hidden="true">·</span>
                    </span>
                    <span className="snav-logo__sub">Embroidery Atelier</span>
                  </span>
                </NavLink>
                <button
                  type="button"
                  className="snav-drawer__close"
                  aria-label="Close menu"
                  onClick={closeDrawer}
                >
                  ✕
                </button>
              </div>

              <span className="snav-drawer__eyebrow">~ Menu ~</span>

              <motion.nav
                className="snav-drawer__links"
                aria-label="Mobile primary"
                variants={drawerListVariants}
                initial="hidden"
                animate="visible"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div key={item.to} variants={drawerItemVariants}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `snav-drawer__link ${
                          isActive ? "snav-drawer__link--active" : ""
                        }`
                      }
                      onClick={closeDrawer}
                    >
                      <span className="snav-drawer__link-num">
                        0{NAV_ITEMS.indexOf(item) + 1}
                      </span>
                      <span className="snav-drawer__link-label">{item.label}</span>
                      <span className="snav-drawer__link-arrow">→</span>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>

              <span className="snav-drawer__divider" aria-hidden="true" />

              <motion.div
                className="snav-drawer__footer"
                variants={drawerItemVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="snav-whatsapp snav-whatsapp--full"
                  onClick={closeDrawer}
                >
                  <FaWhatsapp className="snav-whatsapp__icon" />
                  <span>Custom Inquiry on WhatsApp</span>
                </a>

                <div className="snav-drawer__socials">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </motion.div>
            </motion.aside>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
};

/* ============================================================================
   4. EMBEDDED CSS
   Plain CSS, scoped with the `snav-` prefix so it can be dropped into any
   project without colliding with existing class names.
   ==========================================================================*/
const NAVBAR_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Italiana&family=Poppins:wght@300;400;500;600;700&display=swap");

:root {
  --snav-cream: #faf4ec;
  --snav-ivory: #f8efe6;
  --snav-burnt-orange: #c65d3d;
  --snav-terracotta: #b85a32;
  --snav-gold: #c8a96a;
  --snav-gold-soft: #d9be85;
  --snav-gold-dark: #a8884c;
  --snav-brown: #4b2f25;
  --snav-brown-soft: #6b4a3b;
  --snav-rose: #e8c8c2;
  --snav-olive: #6f7d4e;
  --snav-white: #fffdfa;
  --snav-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --snav-shadow-soft: 0 12px 32px -18px rgba(75, 47, 37, 0.35);
  --snav-shadow-strong: 0 24px 60px -25px rgba(75, 47, 37, 0.45);
}

/* ---------------------------------------------------------------------
   Header shell — transparent over hero, frosted glass once scrolled
--------------------------------------------------------------------- */
.snav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  background: transparent;
  border-bottom: 1px solid transparent;
  box-shadow: none;
  transition: background 0.5s var(--snav-ease), padding 0.5s var(--snav-ease),
    box-shadow 0.5s var(--snav-ease), border-color 0.5s var(--snav-ease);
  font-family: "Poppins", sans-serif;
}

.snav--scrolled {
  padding: 0.85rem 0;
  background: rgba(250, 244, 236, 0.78);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  box-shadow: var(--snav-shadow-soft);
  border-bottom: 1px solid rgba(200, 169, 106, 0.35);
}

.snav__inner {
  position: relative;
  z-index: 2;
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
}

/* ---------------------------------------------------------------------
   Decorative flourishes (no more moving particles)
--------------------------------------------------------------------- */
.snav-flourish {
  position: absolute;
  top: 0;
  width: 70px;
  height: 70px;
  color: var(--snav-gold);
  opacity: 0.32;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.5s var(--snav-ease);
}

.snav-flourish--left {
  left: 0.6rem;
}

.snav-flourish--right {
  right: 0.6rem;
  transform: scaleX(-1);
}

.snav-flourish--drawer-top {
  top: 1rem;
  left: 1rem;
  width: 56px;
  height: 56px;
  opacity: 0.35;
}

.snav-flourish--drawer-bottom {
  bottom: 1rem;
  right: 1rem;
  top: auto;
  width: 56px;
  height: 56px;
  opacity: 0.28;
  transform: scale(-1, -1);
}

/* ---------------------------------------------------------------------
   Logo — refined typography + multi-petal embroidery mark
--------------------------------------------------------------------- */
.snav-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  justify-self: start;
}

.snav-logo__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid rgba(200, 169, 106, 0.55);
  color: var(--snav-gold);
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 253, 250, 0.9), rgba(250, 244, 236, 0.6) 70%);
  box-shadow:
    0 6px 18px -8px rgba(200, 169, 106, 0.5),
    inset 0 0 0 4px rgba(200, 169, 106, 0.08);
  transition: box-shadow 0.4s var(--snav-ease), border-color 0.4s var(--snav-ease);
}

.snav-logo:hover .snav-logo__mark {
  box-shadow:
    0 10px 24px -6px rgba(200, 169, 106, 0.6),
    inset 0 0 0 4px rgba(200, 169, 106, 0.14);
  border-color: var(--snav-gold);
}

.snav-logo__mark-svg {
  width: 30px;
  height: 30px;
}

.snav-logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.snav-logo__brand {
  font-family: "Italiana", "Cormorant Garamond", serif;
  font-size: 1.85rem;
  font-weight: 400;
  color: var(--snav-brown);
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: baseline;
  gap: 0.05em;
  transition: color 0.4s var(--snav-ease);
}

.snav-logo__brand-shree {
  background: linear-gradient(135deg, var(--snav-brown) 0%, var(--snav-burnt-orange) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.4s var(--snav-ease);
}

.snav-logo__brand-dot {
  color: var(--snav-gold);
  -webkit-text-fill-color: var(--snav-gold);
  font-size: 0.7em;
  font-weight: 600;
  margin: 0 0.06em;
  transition: transform 0.4s var(--snav-ease);
  display: inline-block;
}

.snav-logo:hover .snav-logo__brand-dot {
  transform: rotate(90deg) scale(1.2);
}

.snav-logo__sub {
  font-family: "Poppins", sans-serif;
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: var(--snav-terracotta);
  margin-top: 0.25rem;
  transition: letter-spacing 0.4s var(--snav-ease), color 0.4s var(--snav-ease);
}

.snav-logo:hover .snav-logo__sub {
  letter-spacing: 0.5em;
  color: var(--snav-gold-dark);
}

/* ---------------------------------------------------------------------
   Center navigation links
--------------------------------------------------------------------- */
.snav-links {
  display: flex;
  align-items: center;
  gap: 2.75rem;
  justify-self: center;
}

.snav-link {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0.1rem;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--snav-brown);
  transition: color 0.4s var(--snav-ease), letter-spacing 0.4s var(--snav-ease);
}

.snav-link:hover {
  color: var(--snav-burnt-orange);
  letter-spacing: 0.08em;
}

.snav-link__underline {
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--snav-gold), transparent);
  transform: translateX(-50%);
  transition: width 0.45s var(--snav-ease);
}

.snav-link:hover .snav-link__underline {
  width: 70%;
}

.snav-link--active {
  color: var(--snav-burnt-orange);
  font-weight: 600;
}

.snav-link--active .snav-link__underline {
  width: 90%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--snav-gold) 50%, transparent);
  box-shadow: 0 0 12px rgba(200, 169, 106, 0.7);
}

.snav-link__flourish {
  width: 36px;
  height: 12px;
  margin-top: 4px;
  color: var(--snav-gold);
  opacity: 0.9;
}

/* ---------------------------------------------------------------------
   Right side — WhatsApp CTA + burger button
--------------------------------------------------------------------- */
.snav-actions {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  justify-self: end;
}

.snav-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.45rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--snav-white);
  background: linear-gradient(135deg, var(--snav-burnt-orange), var(--snav-terracotta));
  border: 1px solid rgba(200, 169, 106, 0.6);
  box-shadow:
    0 10px 24px -12px rgba(198, 93, 61, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition: transform 0.4s var(--snav-ease), box-shadow 0.4s var(--snav-ease),
    background 0.4s var(--snav-ease);
  white-space: nowrap;
  letter-spacing: 0.04em;
}

.snav-whatsapp:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow:
    0 18px 36px -12px rgba(198, 93, 61, 0.75),
    0 0 0 3px rgba(200, 169, 106, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);
  background: linear-gradient(135deg, var(--snav-terracotta), var(--snav-burnt-orange));
}

.snav-whatsapp__icon {
  font-size: 1.05rem;
}

.snav-whatsapp--full {
  width: 100%;
  justify-content: center;
  padding: 0.95rem 1.5rem;
  font-size: 0.9rem;
}

/* Mobile menu button — three lines morphing into an X */
.snav-burger {
  display: none;
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1.5px solid rgba(200, 169, 106, 0.55);
  background: rgba(255, 253, 250, 0.5);
  align-items: center;
  justify-content: center;
  transition: background 0.3s var(--snav-ease), border-color 0.3s var(--snav-ease);
}

.snav-burger:hover {
  background: rgba(255, 253, 250, 0.85);
  border-color: var(--snav-gold);
}

.snav-burger__line {
  position: absolute;
  width: 20px;
  height: 1.6px;
  background: var(--snav-brown);
  border-radius: 2px;
  transition: transform 0.4s var(--snav-ease), opacity 0.3s var(--snav-ease),
    top 0.4s var(--snav-ease);
}

.snav-burger__line--1 { top: 16px; }
.snav-burger__line--2 { top: 23px; }
.snav-burger__line--3 { top: 30px; }

.snav-burger--open .snav-burger__line--1 {
  top: 23px;
  transform: rotate(45deg);
  background: var(--snav-burnt-orange);
}

.snav-burger--open .snav-burger__line--2 {
  opacity: 0;
  transform: scaleX(0);
}

.snav-burger--open .snav-burger__line--3 {
  top: 23px;
  transform: rotate(-45deg);
  background: var(--snav-burnt-orange);
}

/* ---------------------------------------------------------------------
   Mobile drawer + backdrop
--------------------------------------------------------------------- */
.snav-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: linear-gradient(120deg, rgba(75, 47, 37, 0.55), rgba(75, 47, 37, 0.3));
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.snav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  width: 86%;
  max-width: 400px;
  padding: 2rem 1.85rem;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg,
    rgba(250, 244, 236, 0.94) 0%,
    rgba(248, 239, 230, 0.94) 100%);
  backdrop-filter: blur(24px) saturate(170%);
  -webkit-backdrop-filter: blur(24px) saturate(170%);
  border-left: 1.5px solid rgba(200, 169, 106, 0.45);
  box-shadow: var(--snav-shadow-strong);
  overflow-y: auto;
}

.snav-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.snav-logo--drawer {
  gap: 0.6rem;
}

.snav-drawer__close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid rgba(200, 169, 106, 0.5);
  color: var(--snav-brown);
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 253, 250, 0.5);
  transition: background 0.3s var(--snav-ease), color 0.3s var(--snav-ease),
    transform 0.3s var(--snav-ease);
}

.snav-drawer__close:hover {
  background: var(--snav-brown);
  color: var(--snav-white);
  transform: rotate(90deg);
}

.snav-drawer__eyebrow {
  display: block;
  text-align: center;
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--snav-gold-dark);
  letter-spacing: 0.1em;
  margin: 1.5rem 0 0.5rem;
  position: relative;
  z-index: 2;
}

.snav-drawer__divider {
  display: block;
  height: 1px;
  margin: 1.5rem 0;
  background: linear-gradient(90deg, transparent, rgba(200, 169, 106, 0.55), transparent);
}

.snav-drawer__links {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
  z-index: 2;
}

.snav-drawer__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 0;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.55rem;
  font-weight: 500;
  color: var(--snav-brown);
  border-bottom: 1px solid rgba(200, 169, 106, 0.12);
  transition: color 0.3s var(--snav-ease), padding-left 0.4s var(--snav-ease),
    border-color 0.3s var(--snav-ease);
}

.snav-drawer__link:hover {
  color: var(--snav-burnt-orange);
  padding-left: 0.4rem;
  border-color: var(--snav-gold);
}

.snav-drawer__link--active {
  color: var(--snav-burnt-orange);
  border-color: var(--snav-gold);
}

.snav-drawer__link--active .snav-drawer__link-num {
  color: var(--snav-burnt-orange);
}

.snav-drawer__link--active .snav-drawer__link-arrow {
  opacity: 1;
  transform: translateX(0);
}

.snav-drawer__link-num {
  font-family: "Poppins", sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--snav-gold);
  min-width: 24px;
}

.snav-drawer__link-label {
  flex: 1;
}

.snav-drawer__link-arrow {
  font-size: 1.1rem;
  color: var(--snav-gold);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s var(--snav-ease), transform 0.3s var(--snav-ease);
}

.snav-drawer__link:hover .snav-drawer__link-arrow {
  opacity: 1;
  transform: translateX(0);
}

.snav-drawer__footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}

.snav-drawer__socials {
  display: flex;
  gap: 0.9rem;
  justify-content: center;
}

.snav-drawer__socials a {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(200, 169, 106, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--snav-brown);
  font-size: 1.05rem;
  background: rgba(255, 253, 250, 0.5);
  transition: background 0.3s var(--snav-ease), color 0.3s var(--snav-ease),
    transform 0.3s var(--snav-ease);
}

.snav-drawer__socials a:hover {
  background: var(--snav-gold);
  color: var(--snav-white);
  transform: translateY(-3px);
}

/* ---------------------------------------------------------------------
   Accessibility — visible focus states
--------------------------------------------------------------------- */
.snav a:focus-visible,
.snav button:focus-visible,
.snav-drawer a:focus-visible,
.snav-drawer button:focus-visible {
  outline: 2px solid var(--snav-burnt-orange);
  outline-offset: 3px;
  border-radius: 4px;
}

/* ---------------------------------------------------------------------
   Responsive — tablet
--------------------------------------------------------------------- */
@media (max-width: 1024px) {
  .snav__inner {
    padding: 0 1.75rem;
  }

  .snav-links {
    gap: 1.8rem;
  }

  .snav-link {
    font-size: 1rem;
  }

  .snav-logo__brand {
    font-size: 1.55rem;
  }

  .snav-whatsapp span {
    display: none;
  }

  .snav-whatsapp {
    padding: 0.75rem;
  }
}

/* ---------------------------------------------------------------------
   Responsive — mobile
--------------------------------------------------------------------- */
@media (max-width: 768px) {
  .snav {
    padding: 1.1rem 0;
  }

  .snav--scrolled {
    padding: 0.75rem 0;
  }

  .snav__inner {
    grid-template-columns: auto 1fr auto;
  }

  .snav-links {
    display: none;
  }

  .snav-actions {
    gap: 0.75rem;
  }

  .snav-whatsapp {
    display: none;
  }

  .snav-burger {
    display: inline-flex;
  }

  .snav-flourish {
    width: 44px;
    height: 44px;
    opacity: 0.22;
  }
}

@media (max-width: 480px) {
  .snav-logo__brand {
    font-size: 1.4rem;
  }

  .snav-logo__sub {
    font-size: 0.52rem;
    letter-spacing: 0.3em;
  }

  .snav-logo__mark {
    width: 42px;
    height: 42px;
  }

  .snav-logo__mark-svg {
    width: 26px;
    height: 26px;
  }

  .snav-drawer {
    width: 92%;
    padding: 1.5rem 1.35rem;
  }

  .snav-drawer__link {
    font-size: 1.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .snav,
  .snav-link,
  .snav-link__underline,
  .snav-whatsapp,
  .snav-burger__line,
  .snav-drawer__close,
  .snav-drawer__socials a,
  .snav-logo__brand-dot {
    transition: none !important;
    animation: none !important;
  }
}
`;

export default Navbar;
