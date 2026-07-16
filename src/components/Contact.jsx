/* ============================================================================
   Contact.jsx
   Shree Collection — Luxury Contact Page
   ----------------------------------------------------------------------------
   Stack: React (Vite) + Framer Motion + react-icons
   Pairs with: Contact.css (plain CSS, class-prefixed `ct-`)
   Reuses: <Navbar /> from Navbar.jsx (same nav used on Home.jsx / Collections.jsx)
   ==========================================================================*/

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaStar,
  FaQuoteLeft,
  FaPlus,
  FaMinus,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaArrowRight,
  FaGem,
  FaPalette,
  FaAward,
} from "react-icons/fa";

import Navbar from "./Navbar";
import "./Contact.css";

/* ============================================================================
   1. IMAGE MAP — swap with real studio photography whenever ready
   ==========================================================================*/
const IMG = {
  hero: "https://jessicalongembroidery.com/cdn/shop/files/20250127_111211.jpg?v=1761668632&width=1946",
  illustration: "https://i.ytimg.com/vi/yDPEXBOCgHI/sddefault.jpg?v=67565a65",
  ctaBg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPjbMabAMbbnNaQ8yymm6rcE09FtmPvDdGcp9GBRYRw&s=10",
  igPreview: "https://i.etsystatic.com/31754910/r/il/674bc0/6858867370/il_fullxfull.6858867370_97vg.jpg",
  ytThumb: "https://i.pinimg.com/736x/9c/12/f7/9c12f7f4e694d7d1aaf04478fb0f6d44.jpg",
  t1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpm0NSZL2gewZb4xw3vaU_ccy_uo4tleoonvGq6bOOQ&s=10",
  t2: "https://i.etsystatic.com/21489612/r/il/42aa6d/4009063794/il_fullxfull.4009063794_rnx4.jpg",
  t3: "https://mona-kollektiv.ch/wp-content/uploads/2022/02/margeriten_instagram_4-1200x1200.jpg",
  t4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUhgza4UBRTe5yMslFCUS-r7GsqhVgts-Dw94Ic6vJQ&s=10",
  t5: "https://cdn.prod.website-files.com/5def57dd0244b4764ff02db7/63b35dd303f3a11e92ab9895_il_570xN.2877151968_4gye.jpeg",
  t6: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwutJyspfUBrLVEFnZSxyUd_apEAEB96L8N6bbLJpPjNtRxfD5Am9_5kEX&s=10",
  c1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0SPPkGzD-Jx2AVSEFooUswB3yofdypLpPQS-Fz_9UMCrvKJyL5admnnn&s=10",
  c2: "https://i.pinimg.com/236x/e8/3d/c3/e83dc32882a29df9f0330ca86755f85d.jpg",
  c3: "https://img.magnific.com/premium-psd/hand-embroidery-designs-flower-isolated-transparent-background_1144345-32029.jpg?semt=ais_hybrid&w=740&q=80",
  c4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25rNiajWwMFRgXtHLLj16RIH7KPhG29Od1WhZLeOnvw&s=10",
  c5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBbHjT9epm7y2erMqb8yfCDq2gWJky4m3mefZ0JJOEBR9Awf1DlP-wvCY&s=10",
  c6: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vLX41lLtT6Rocix_RFfCU_nAg5ZtdV-juEFaxtsEoA&s=10",
  c7: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwutJyspfUBrLVEFnZSxyUd_apEAEB96L8N6bbLJpPjNtRxfD5Am9_5kEX&s=10",
  c8: "https://crewelghoul.com/wp-content/uploads/2024/06/daisy-embroidery-design-edited.jpg",
};

/* ============================================================================
   2. CONTACT + SOCIAL CONSTANTS
   ==========================================================================*/
const PHONE_DISPLAY = "+91 9923062181";
const PHONE_TEL = "+919923062181";
const WHATSAPP_NUMBER = "919923062181";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello Shree Collection! I'd love to place a custom embroidery inquiry."
)}`;
const INSTAGRAM_LINK =
  "https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4";
const INSTAGRAM_HANDLE = "@shree_collection_art";
const YOUTUBE_LINK =
  "https://youtube.com/@shree_hand_embroidery?si=yQ1gxB9E4spQr-pC";
const YOUTUBE_NAME = "Shree Hand Embroidery";

/* ============================================================================
   3. STATIC CONTENT DATA
   ==========================================================================*/
const WHY_CARDS = [
  {
    id: "why-01",
    icon: FaGem,
    title: "100% Handmade",
    desc: "Each creation is crafted carefully using premium threads and traditional embroidery techniques.",
  },
  {
    id: "why-02",
    icon: FaPalette,
    title: "Custom Designs",
    desc: "Personalized embroidery created exactly according to customer preferences.",
  },
  {
    id: "why-03",
    icon: FaAward,
    title: "Quality Craftsmanship",
    desc: "Every stitch reflects dedication, patience, and attention to detail.",
  },
];

const TESTIMONIALS = [
  { id: "t-01", name: "Ananya Rao", image: IMG.t1, review: "The embroidery exceeded my expectations. Every stitch was perfect." },
  { id: "t-02", name: "Meera Nair", image: IMG.t2, review: "The fabric painting is incredibly detailed and beautiful." },
  { id: "t-03", name: "Rohan Malhotra", image: IMG.t3, review: "Excellent finishing and amazing quality." },
  { id: "t-04", name: "Priya Verma", image: IMG.t4, review: "Beautiful handmade work with great attention to detail." },
  { id: "t-05", name: "Kavita Iyer", image: IMG.t5, review: "Highly recommended for custom embroidery." },
  { id: "t-06", name: "Arjun Sharma", image: IMG.t6, review: "My blouse turned out exactly how I imagined." },
];

const CUSTOMER_GALLERY = [
  IMG.c1, IMG.c2, IMG.c3, IMG.c4, IMG.c5, IMG.c6, IMG.c7, IMG.c8,
];

const FAQS = [
 
  {
    id: "faq-02",
    q: "What embroidery services do you provide?",
    a: "We offer hand embroidery, fabric painting, custom stitching, blouse design, home décor pieces, and fully bespoke commissions.",
  },
  {
    id: "faq-03",
    q: "Can I request my own design?",
    a: "Absolutely. Share a sketch, photo, or even a rough idea — our artists will translate it into a hand-drawn motif before any stitching begins.",
  },
  {
    id: "faq-04",
    q: "Do you make personalized gifts?",
    a: "Yes — name embroidery, anniversary keepsakes, and personalised home textiles are some of our most loved commissions.",
  },
  {
    id: "faq-05",
    q: "How long does embroidery usually take?",
    a: "Simple pieces take about a week; detailed bridal or festival commissions can take two to four weeks depending on intricacy.",
  },
  {
    id: "faq-06",
    q: "How can I contact Shree Collection?",
    a: `You can call us at ${PHONE_DISPLAY}, message us on WhatsApp, or reach out through Instagram at ${INSTAGRAM_HANDLE}.`,
  },

];

/* ============================================================================
   4. ANIMATION VARIANTS
   ==========================================================================*/
const fadeUp = {
  hidden: { opacity: 0, y: 46 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ============================================================================
   5. DECORATIVE PRIMITIVES
   ==========================================================================*/
const FloralCorner = ({ className = "" }) => (
  <svg
    className={`ct-floral-corner ${className}`}
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
  <div className="ct-divider" aria-hidden="true">
    <span className="ct-divider__line" />
    <svg viewBox="0 0 64 24" fill="none" className="ct-divider__glyph">
      <path
        d="M32 12c-4-8-12-8-16-2 4 4 10 4 16 2Zm0 0c4-8 12-8 16-2-4 4-10 4-16 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="32" cy="12" r="3" fill="currentColor" />
    </svg>
    <span className="ct-divider__line" />
  </div>
);

const Eyebrow = ({ children, light = false }) => (
  <motion.span
    className={`ct-eyebrow ${light ? "ct-eyebrow--light" : ""}`}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.6 }}
  >
    <span className="ct-eyebrow__dot" />
    {children}
  </motion.span>
);

/** Soft blurred colour blobs used behind sections to avoid a flat, plain look. */
const GlowBlobs = ({ variant = "default" }) => (
  <div className={`ct-glow-blobs ct-glow-blobs--${variant}`} aria-hidden="true">
    <span className="ct-glow-blob ct-glow-blob--1" />
    <span className="ct-glow-blob ct-glow-blob--2" />
  </div>
);

/* ============================================================================
   6. FLOATING-LABEL FORM FIELD
   ==========================================================================*/
const FormField = ({ id, label, type = "text", icon: Icon, textarea, value, onChange }) => (
  <div className={`ct-field ${value ? "ct-field--filled" : ""}`}>
    <span className="ct-field__icon">
      <Icon />
    </span>
    {textarea ? (
      <textarea
        id={id}
        name={id}
        rows={5}
        value={value}
        onChange={onChange}
        className="ct-field__input ct-field__input--textarea"
        required
      />
    ) : (
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className="ct-field__input"
        required
      />
    )}
    <label htmlFor={id} className="ct-field__label">
      {label}
    </label>
  </div>
);

/* ============================================================================
   7. MAIN COMPONENT
   ==========================================================================*/
const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // In production, wire this up to your email/API endpoint of choice.
      setSubmitted(true);
      setFormData({ fullName: "", phone: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    },
    []
  );

  const toggleFaq = useCallback((id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="ct-root">
      <Navbar />

      {/* ================================================================
          HERO SECTION
      ================================================================= */}
      <section className="ct-hero">
        <div className="ct-hero__bg">
          <img
            src={IMG.hero}
            alt="Artisan workspace with embroidery hoop, colourful threads, and warm golden sunlight"
          />
          <div className="ct-hero__overlay" />
        </div>
        <FloralCorner className="ct-floral-corner--top-left ct-floral-corner--light" />
        <FloralCorner className="ct-floral-corner--bottom-right ct-floral-corner--light" />

        <motion.div
          className="ct-hero__content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Eyebrow light>Get in Touch</Eyebrow>
          <motion.h1 className="ct-hero__heading" variants={fadeUp} custom={1}>
            Let&apos;s Create Something Beautiful Together
          </motion.h1>
          <motion.p className="ct-hero__subtitle" variants={fadeUp} custom={2}>
            .
          </motion.p>
        </motion.div>
      </section>

      {/* ================================================================
          CONTACT INFORMATION — two cards
      ================================================================= */}
      <section className="ct-info">
        <GlowBlobs variant="info" />
        <div className="ct-info__grid">
          <motion.div
            className="ct-info-card"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Eyebrow>Reach Us Directly</Eyebrow>
            <h2 className="ct-info-card__title">Contact Information</h2>

            <a href={`tel:${PHONE_TEL}`} className="ct-contact-row">
              <span className="ct-contact-row__icon">
                <FaPhoneAlt />
              </span>
              <div>
                <strong>Phone Number</strong>
                <span>{PHONE_DISPLAY}</span>
              </div>
            </a>

            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-contact-row"
            >
              <span className="ct-contact-row__icon">
                <FaInstagram />
              </span>
              <div>
                <strong>Instagram</strong>
                <span>{INSTAGRAM_HANDLE}</span>
              </div>
            </a>

            <a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-contact-row"
            >
              <span className="ct-contact-row__icon">
                <FaYoutube />
              </span>
              <div>
                <strong>YouTube</strong>
                <span>{YOUTUBE_NAME}</span>
              </div>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-btn ct-btn--whatsapp ct-info-card__cta"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            className="ct-info-visual"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="ct-info-visual__frame">
              <img
                src={IMG.illustration}
                alt="A smiling artisan hand-stitching colourful floral embroidery in a wooden hoop"
              />
            </div>
            <span className="ct-info-visual__petal ct-info-visual__petal--1" />
            <span className="ct-info-visual__petal ct-info-visual__petal--2" />
            <span className="ct-info-visual__petal ct-info-visual__petal--3" />
          </motion.div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          WHY CUSTOMERS LOVE US
      ================================================================= */}
      <section className="ct-why">
        <div className="ct-section__header">
          <Eyebrow>Our Promise</Eyebrow>
          <motion.h2
            className="ct-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Why Customers Love Us
          </motion.h2>
        </div>

        <motion.div
          className="ct-why__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {WHY_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                className="ct-why-card"
                key={card.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -10 }}
              >
                <span className="ct-why-card__icon">
                  <Icon />
                </span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          CUSTOMER TESTIMONIALS
      ================================================================= */}
      <section className="ct-testimonials">
        <GlowBlobs variant="testimonials" />
        <div className="ct-section__header">
          <Eyebrow>What They Say</Eyebrow>
          <motion.h2
            className="ct-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Words That Inspire Us
          </motion.h2>
        </div>

        <motion.div
          className="ct-testimonials__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              className="ct-testimonial-card"
              key={t.id}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -8 }}
            >
              <FaQuoteLeft className="ct-testimonial-card__quote-icon" />
              <p className="ct-testimonial-card__review">{t.review}</p>
              <div className="ct-testimonial-card__stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <div className="ct-testimonial-card__person">
                <img src={t.image} alt={t.name} />
                <strong>{t.name}</strong>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          CUSTOMER GALLERY
      ================================================================= */}
      <section className="ct-gallery">
        <div className="ct-section__header">
          <Eyebrow>Happy Customers</Eyebrow>
          <motion.h2
            className="ct-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Customer Gallery
          </motion.h2>
        </div>

        <motion.div
          className="ct-gallery__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {CUSTOMER_GALLERY.map((src, i) => (
            <motion.div
              className="ct-gallery__item"
              key={i}
              variants={scaleIn}
              custom={i}
              whileHover={{ scale: 1.06 }}
            >
              <img src={src} alt={`Happy Shree Collection customer ${i + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          FAQ ACCORDION
      ================================================================= */}
      <section className="ct-faq">
        <div className="ct-section__header">
          <Eyebrow>Good to Know</Eyebrow>
          <motion.h2
            className="ct-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="ct-faq__list">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === faq.id;
            return (
              <motion.div
                className={`ct-faq-item ${isOpen ? "ct-faq-item--open" : ""}`}
                key={faq.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <button
                  className="ct-faq-item__question"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-answer`}
                >
                  <span>{faq.q}</span>
                  <span className="ct-faq-item__toggle">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>
                <div className="ct-faq-item__answer-wrap" id={`${faq.id}-answer`}>
                  <div className="ct-faq-item__answer-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <OrnamentalDivider />

      {/* ================================================================
          SOCIAL MEDIA SECTION
      ================================================================= */}
      <section className="ct-social">
        <div className="ct-section__header">
          <Eyebrow>Stay Connected</Eyebrow>
          <motion.h2
            className="ct-section__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Follow Our Creative Journey
          </motion.h2>
        </div>

        <motion.div
          className="ct-social__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="ct-social-card" variants={fadeLeft}>
            <div className="ct-social-card__image-wrap">
              <img src={IMG.igPreview} alt="Preview of Shree Collection's Instagram embroidery feed" />
              <span className="ct-social-card__icon">
                <FaInstagram />
              </span>
            </div>
            <h3>Instagram</h3>
            <p>Daily glimpses of our embroidery hoops, works-in-progress, and finished pieces.</p>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-btn ct-btn--outline"
            >
              Follow on Instagram <FaArrowRight />
            </a>
          </motion.div>

          <motion.div className="ct-social-card" variants={fadeRight}>
            <div className="ct-social-card__image-wrap">
              <img src={IMG.ytThumb} alt="Preview of Shree Collection's YouTube embroidery tutorials" />
              <span className="ct-social-card__icon">
                <FaYoutube />
              </span>
            </div>
            <h3>YouTube</h3>
            <p>Slow-stitch process videos and behind-the-scenes footage from our workshop.</p>
            <a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-btn ct-btn--outline"
            >
              Subscribe on YouTube <FaArrowRight />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================
          FINAL CALL TO ACTION
      ================================================================= */}
      <section className="ct-final-cta" style={{ "--ct-cta-bg": `url(${IMG.ctaBg})` }}>
        <div className="ct-final-cta__overlay" />
        <FloralCorner className="ct-floral-corner--top-left ct-floral-corner--light" />
        <FloralCorner className="ct-floral-corner--bottom-right ct-floral-corner--light" />

        <motion.div
          className="ct-final-cta__content"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Eyebrow light>One Message Away</Eyebrow>
          <h2 className="ct-final-cta__heading">Ready to Bring Your Ideas to Life?</h2>
          <p className="ct-final-cta__subtitle">
            Let&apos;s create something beautiful together with handcrafted
            embroidery made especially for you.
          </p>
          <div className="ct-final-cta__buttons">
            <a href="#contact-form" className="ct-btn ct-btn--primary">
              Contact Us <FaArrowRight />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-btn ct-btn--whatsapp"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

     
    </div>
  );
};

export default Contact;
