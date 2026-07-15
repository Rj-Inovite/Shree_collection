/* ============================================================================
   Navbar.jsx
   Shree Collection — Luxury Handmade Embroidery Brand Navigation
   ----------------------------------------------------------------------------
   Single-file deliverable: markup, animation logic, AND styling all live here.
   CSS is plain CSS (no Tailwind, no CSS-in-JS library) injected via a single
   <style> tag so nothing outside this file is required to make it look right.

   Usage — import and drop it at the top of every routed page:

     import Navbar from "./Navbar";

     function Home() {
       return (
         <>
           <Navbar />
           ...page content...
         </>
       );
     }

   Routing — this component renders React Router <NavLink> elements pointing
   at "/", "/collections" and "/contact". Wrap your app in a <BrowserRouter>
   and register those three routes (Home.jsx, Collections.jsx, Contact.jsx)
   in App.jsx — see the App.jsx example provided alongside this file.
   ==========================================================================*/

import React, { useEffect, useRef, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

/* ============================================================================
   1. NAV DATA
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

/** Delicate floral embroidery-inspired mark used as the logo icon. */
const EmbroideryMark = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="snav-logo__mark-svg"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="3.2" fill="currentColor" />
    <path
      d="M24 20.8c2.6-4.4 7-4.4 9-.6-2.6 2.4-6.4 2.4-9 .6Zm0 0c-2.6-4.4-7-4.4-9-.6 2.6 2.4 6.4 2.4 9 .6Zm0 6.4c2.6 4.4 7 4.4 9 .6-2.6-2.4-6.4-2.4-9-.6Zm0 0c-2.6 4.4-7 4.4-9 .6 2.6-2.4 6.4-2.4 9-.6Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 24c-3.6 1.4-5 4-4.4 6.8M33 24c3.6 1.4 5 4 4.4 6.8M15 24c-3.6-1.4-5-4-4.4-6.8M33 24c3.6-1.4 5-4 4.4-6.8"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.65"
    />
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

/** Slow-drifting ambient particles for subtle luxury atmosphere. */
const FloatingParticles = () => {
  const dots = new Array(6).fill(0);
  return (
    <div className="snav-particles" aria-hidden="true">
      {dots.map((_, i) => (
        <span key={i} className={`snav-particle snav-particle-${i + 1}`} />
      ))}
    </div>
  );
};

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
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
        <FloatingParticles />
        <FloralFlourish className="snav-flourish--left" />
        <FloralFlourish className="snav-flourish--right" />

        <div className="snav__inner">
          {/* ============================================================
              LOGO — left
          ============================================================= */}
          <NavLink to="/" className="snav-logo" aria-label="Shree Collection — Home">
            <motion.span
              className="snav-logo__mark"
              whileHover={{ rotate: 12, scale: 1.12 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
            >
              <EmbroideryMark />
            </motion.span>
            <span className="snav-logo__text">
              <span className="snav-logo__brand">Shree</span>
              <span className="snav-logo__sub">Collection</span>
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
                    <span className="snav-logo__brand">Shree</span>
                    <span className="snav-logo__sub">Collection</span>
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

              <span className="snav-drawer__divider" aria-hidden="true" />

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
                      {item.label}
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
                  <span>Custom Inquiry</span>
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
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600;700&display=swap");

:root {
  --snav-cream: #faf4ec;
  --snav-ivory: #f8efe6;
  --snav-burnt-orange: #c65d3d;
  --snav-terracotta: #b85a32;
  --snav-gold: #d4af37;
  --snav-brown: #4b2f25;
  --snav-olive: #6f7d4e;
  --snav-white: #fffdfa;
  --snav-ease: cubic-bezier(0.22, 1, 0.36, 1);
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
  padding: 1.6rem 0;
  background: transparent;
  border-bottom: 1px solid transparent;
  box-shadow: none;
  transition: background 0.5s var(--snav-ease), padding 0.5s var(--snav-ease),
    box-shadow 0.5s var(--snav-ease), border-color 0.5s var(--snav-ease);
  font-family: "Poppins", sans-serif;
}

.snav--scrolled {
  padding: 0.85rem 0;
  background: rgba(250, 244, 236, 0.7);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  box-shadow: 0 12px 32px -18px rgba(75, 47, 37, 0.35);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
}

.snav__inner {
  position: relative;
  z-index: 2;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
}

/* ---------------------------------------------------------------------
   Ambient decoration — floral flourishes + floating particles
--------------------------------------------------------------------- */
.snav-flourish {
  position: absolute;
  top: 0;
  width: 70px;
  height: 70px;
  color: var(--snav-gold);
  opacity: 0.3;
  pointer-events: none;
  z-index: 1;
}

.snav-flourish--left {
  left: 0.5rem;
}

.snav-flourish--right {
  right: 0.5rem;
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
  opacity: 0.25;
  transform: scale(-1, -1);
}

.snav-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.snav-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--snav-gold);
  opacity: 0.35;
  animation: snav-drift 10s ease-in-out infinite;
}

.snav-particle-1 { top: 20%; left: 30%; animation-delay: 0s; }
.snav-particle-2 { top: 60%; left: 45%; background: var(--snav-terracotta); animation-delay: 1.4s; }
.snav-particle-3 { top: 35%; left: 62%; animation-delay: 2.8s; }
.snav-particle-4 { top: 70%; left: 78%; background: var(--snav-olive); animation-delay: 4.2s; }
.snav-particle-5 { top: 15%; left: 85%; animation-delay: 5.6s; }
.snav-particle-6 { top: 50%; left: 12%; background: var(--snav-terracotta); animation-delay: 7s; }

@keyframes snav-drift {
  0%, 100% { transform: translate(0, 0); opacity: 0.25; }
  50% { transform: translate(8px, -14px); opacity: 0.55; }
}

/* ---------------------------------------------------------------------
   Logo
--------------------------------------------------------------------- */
.snav-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  justify-self: start;
}

.snav-logo__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid rgba(212, 175, 55, 0.55);
  color: var(--snav-gold);
  background: radial-gradient(circle, rgba(212, 175, 55, 0.12), transparent 70%);
}

.snav-logo__mark-svg {
  width: 24px;
  height: 24px;
}

.snav-logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  transition: color 0.4s var(--snav-ease);
}

.snav-logo__brand {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.65rem;
  font-weight: 600;
  color: var(--snav-brown);
  transition: color 0.4s var(--snav-ease);
}

.snav-logo__sub {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--snav-terracotta);
  margin-top: 0.15rem;
  transition: letter-spacing 0.4s var(--snav-ease), color 0.4s var(--snav-ease);
}

.snav-logo:hover .snav-logo__brand {
  color: var(--snav-burnt-orange);
}

.snav-logo:hover .snav-logo__sub {
  letter-spacing: 0.4em;
  color: var(--snav-gold);
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
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--snav-brown);
  transition: color 0.35s var(--snav-ease), letter-spacing 0.35s var(--snav-ease);
}

.snav-link:hover {
  color: var(--snav-burnt-orange);
  letter-spacing: 0.05em;
}

.snav-link__underline {
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 1.5px;
  background: var(--snav-gold);
  transform: translateX(-50%);
  transition: width 0.4s var(--snav-ease);
}

.snav-link:hover .snav-link__underline {
  width: 60%;
}

.snav-link--active {
  color: var(--snav-burnt-orange);
  font-weight: 600;
}

.snav-link--active .snav-link__underline {
  width: 80%;
  height: 2px;
  background: var(--snav-gold);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
}

.snav-link__flourish {
  width: 34px;
  height: 12px;
  margin-top: 3px;
  color: var(--snav-gold);
  opacity: 0.85;
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
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--snav-white);
  background: linear-gradient(135deg, var(--snav-burnt-orange), var(--snav-terracotta));
  border: 1px solid rgba(212, 175, 55, 0.6);
  box-shadow: 0 10px 24px -12px rgba(198, 93, 61, 0.6);
  transition: transform 0.35s var(--snav-ease), box-shadow 0.35s var(--snav-ease),
    background 0.35s var(--snav-ease);
  white-space: nowrap;
}

.snav-whatsapp:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 16px 34px -12px rgba(198, 93, 61, 0.75), 0 0 0 3px rgba(212, 175, 55, 0.18);
  background: linear-gradient(135deg, var(--snav-terracotta), var(--snav-burnt-orange));
}

.snav-whatsapp__icon {
  font-size: 1.05rem;
}

.snav-whatsapp--full {
  width: 100%;
  justify-content: center;
}

/* Mobile menu button — three lines morphing into an X */
.snav-burger {
  display: none;
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1.5px solid rgba(212, 175, 55, 0.5);
  background: rgba(255, 253, 250, 0.4);
  align-items: center;
  justify-content: center;
}

.snav-burger__line {
  position: absolute;
  width: 20px;
  height: 1.6px;
  background: var(--snav-gold);
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
}

.snav-burger--open .snav-burger__line--2 {
  opacity: 0;
  transform: scaleX(0);
}

.snav-burger--open .snav-burger__line--3 {
  top: 23px;
  transform: rotate(-45deg);
}

/* ---------------------------------------------------------------------
   Mobile drawer + backdrop
--------------------------------------------------------------------- */
.snav-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(75, 47, 37, 0.45);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.snav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  width: 84%;
  max-width: 380px;
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  background: rgba(250, 244, 236, 0.88);
  backdrop-filter: blur(22px) saturate(160%);
  -webkit-backdrop-filter: blur(22px) saturate(160%);
  border-left: 1.5px solid rgba(212, 175, 55, 0.45);
  box-shadow: -24px 0 60px -25px rgba(75, 47, 37, 0.45);
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
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid rgba(212, 175, 55, 0.5);
  color: var(--snav-brown);
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s var(--snav-ease), color 0.3s var(--snav-ease);
}

.snav-drawer__close:hover {
  background: var(--snav-brown);
  color: var(--snav-white);
}

.snav-drawer__divider {
  display: block;
  height: 1px;
  margin: 1.5rem 0;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.55), transparent);
}

.snav-drawer__links {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  position: relative;
  z-index: 2;
}

.snav-drawer__link {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--snav-brown);
  transition: color 0.3s var(--snav-ease), padding-left 0.3s var(--snav-ease);
}

.snav-drawer__link:hover {
  color: var(--snav-burnt-orange);
  padding-left: 0.4rem;
}

.snav-drawer__link--active {
  color: var(--snav-burnt-orange);
}

.snav-drawer__footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  position: relative;
  z-index: 2;
}

.snav-drawer__socials {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.snav-drawer__socials a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--snav-brown);
  transition: background 0.3s var(--snav-ease), color 0.3s var(--snav-ease);
}

.snav-drawer__socials a:hover {
  background: var(--snav-gold);
  color: var(--snav-white);
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

  .snav-logo__brand {
    font-size: 1.45rem;
  }

  .snav-whatsapp span {
    display: none;
  }

  .snav-whatsapp {
    padding: 0.7rem;
  }
}

/* ---------------------------------------------------------------------
   Responsive — mobile
--------------------------------------------------------------------- */
@media (max-width: 768px) {
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
    opacity: 0.2;
  }
}

@media (max-width: 480px) {
  .snav {
    padding: 1.1rem 0;
  }

  .snav--scrolled {
    padding: 0.7rem 0;
  }

  .snav-logo__brand {
    font-size: 1.3rem;
  }

  .snav-logo__sub {
    font-size: 0.56rem;
    letter-spacing: 0.26em;
  }

  .snav-drawer {
    width: 88%;
    padding: 1.5rem 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .snav,
  .snav-link,
  .snav-link__underline,
  .snav-whatsapp,
  .snav-burger__line,
  .snav-particle {
    transition: none !important;
    animation: none !important;
  }
}
`;

export default Navbar;
