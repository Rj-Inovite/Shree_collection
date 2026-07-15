import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

// --- SVGs & Icons (Self-contained for zero external dependencies) ---
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Contact() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  // Track scrolling for Navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your custom request has been sent to Shree Collection.`);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const triggerWhatsApp = () => {
    const messageText = `Hello Shree Collection! I'm interested in placing a custom order. 
Name: ${formData.name}
Phone: ${formData.phone}
Subject: ${formData.subject}
Message: ${formData.message}`;
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/919923062181?text=${encoded}`, '_blank');
  };

  // Static Data
  const benefits = [
    {
      title: '100% Handmade',
      desc: 'Each creation is crafted carefully using premium threads and traditional embroidery techniques.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.1-8.716-.418m17.432 0L12 21m0 0l-8.716-10.918" />
        </svg>
      )
    },
    {
      title: 'Custom Designs',
      desc: 'Personalized embroidery created exactly according to customer preferences.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.37-9.37m0 0l-1.06-1.061m1.06 1.061L18.47 7.184m2.651-2.651a1.5 1.5 0 112.122 2.122L10.75 19.146a4.5 4.5 0 01-1.801 1.069l-4.147 1.213a.5.5 0 01-.613-.612l1.213-4.147a4.5 4.5 0 011.069-1.801L18.47 4.533z" />
        </svg>
      )
    },
    {
      title: 'Quality Craftsmanship',
      desc: 'Every stitch reflects dedication, patience and attention to detail.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    }
  ];

  const testimonials = [
    { name: "Anjali Mehta", review: "The embroidery exceeded my expectations. Every stitch was perfect.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Priya Sharma", review: "The fabric painting is incredibly detailed and beautiful.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Kiran Deshmukh", review: "Excellent finishing and amazing quality.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Riya Patil", review: "Beautiful handmade work with great attention to detail.", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Sneha Rao", review: "Highly recommended for custom embroidery.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Aditi Joshi", review: "My blouse turned out exactly how I imagined.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1572085312730-23a6b6ec8fc1?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1595959183075-c1d0a161b0c6?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1565193298564-ae98e2491267?auto=format&fit=crop&q=80&w=300"
  ];

  const faqs = [
    { q: "How can I place a custom order?", a: "You can submit your custom requirements using the design form on this page, or directly message us on WhatsApp with details regarding fabric choice, sizing, and pattern design." },
    { q: "What embroidery services do you provide?", a: "We specialize in custom hand embroidery (Aari, French Knots, Zardosi, Bullion stitches, etc.), customized fabric paintings, luxury embroidered cushion covers, and heavy bridal blouses." },
    { q: "Can I request my own design?", a: "Absolutely! You can provide references, sketches, or design pictures. We will meticulously customize every stitch to transform your digital inspiration into a handmade reality." },
    { q: "Do you make personalized gifts?", a: "Yes, we design stunning personalized embroidery hoops featuring initials, anniversaries, wedding vows, and custom family portraits crafted out of fine thread and beads." },
    { q: "How long does embroidery usually take?", a: "Depending on design complexity and backlog, custom projects require anywhere from 5 to 15 business days. We will share a precise timeline once we finalize your design details." },
    { q: "How can I contact Shree Collection?", a: "You can reach us through our contact number, send us an email, or simply connect with us via our verified Instagram or YouTube handles." },
    { q: "Can I order through Instagram or WhatsApp?", a: "Yes, we take direct commissions on both Instagram DM and WhatsApp. Simply shoot us a message with your idea, and our design artisan will get back to you immediately!" }
  ];

  return (
    <div className="shree-contact-wrapper">
      
      {/* Decorative Floating Embroidery Florals in BG */}
      <div className="decor-flower flower-top-left"></div>
      <div className="decor-flower flower-bottom-right"></div>

      {/* --- STICKY NAVIGATION --- */}
      <header className={`shree-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="brand-logo">
            <h2>Shree Collection</h2>
            <span className="sub-logo">Handmade Artistry</span>
          </div>
          
          <nav className="desktop-menu">
            <a href="#home">Home</a>
            <a href="#collections">Collections</a>
            <a href="#contact" className="active">Contact</a>
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
              <a href="#collections" onClick={() => setMobileMenuOpen(false)}>Collections</a>
              <a href="#contact" className="active" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content-container">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero-inner"
          >
            <span className="section-subtitle">Connect With Us</span>
            <h1>Let's Create Something Beautiful Together</h1>
            <p>
              We would love to hear your ideas and help transform them into handcrafted masterpieces. Whether you need custom embroidery, stitching, fabric painting or personalized creations, Shree Collection is always happy to create something made especially for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT INFORMATION & ARTISAN CARD --- */}
      <section className="contact-details-section">
        <div className="grid-container">
          {/* Left Card: Info */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="info-card"
          >
            <h3>Contact Information</h3>
            <p className="card-intro">Reach out to us directly through any of these platforms or give us a ring. We are eager to bring your vision to life.</p>
            
            <div className="social-links-container">
              <a href="tel:+919923062181" className="contact-item-link">
                <div className="icon-badge phone"><PhoneIcon /></div>
                <div className="contact-text-wrap">
                  <span className="label">Phone</span>
                  <span className="val">+91 9923062181</span>
                </div>
              </a>

              <a href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" target="_blank" rel="noopener noreferrer" className="contact-item-link">
                <div className="icon-badge instagram"><InstagramIcon /></div>
                <div className="contact-text-wrap">
                  <span className="label">Instagram</span>
                  <span className="val">@shree_collection_art</span>
                </div>
              </a>

              <a href="https://youtube.com/@shree_hand_embroidery?si=yQ1gxB9E4spQr-pC" target="_blank" rel="noopener noreferrer" className="contact-item-link">
                <div className="icon-badge youtube"><YouTubeIcon /></div>
                <div className="contact-text-wrap">
                  <span className="label">YouTube</span>
                  <span className="val">Shree Hand Embroidery</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Card: Portrait */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="artisan-portrait-card"
          >
            <div className="portrait-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1613987549117-13c4781b32d3?auto=format&fit=crop&q=80&w=800" 
                alt="Artisan embroidery detailing" 
              />
              <div className="floating-hoop-stamp">
                <span>Handmade with Care</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <section className="contact-form-section">
        <div className="container-narrow">
          <motion.div 
            whileInView={{ opacity: 1, y: 40 }}
            initial={{ opacity: 0, y: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="form-luxury-card"
          >
            <h2>Send Us Your Custom Order</h2>
            <p className="form-subtext">Fill in the options below, and we will contact you shortly to lock in your custom handcrafted details.</p>
            
            <form onSubmit={handleFormSubmit} className="premium-form">
              <div className="form-grid">
                <div className="input-group">
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder=" "
                  />
                  <label>Full Name</label>
                </div>

                <div className="input-group">
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder=" "
                  />
                  <label>Phone Number</label>
                </div>

                <div className="input-group">
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder=" "
                  />
                  <label>Email Address</label>
                </div>

                <div className="input-group">
                  <input 
                    type="text" 
                    name="subject" 
                    required 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    placeholder=" "
                  />
                  <label>Subject</label>
                </div>

                <div className="input-group span-full">
                  <textarea 
                    name="message" 
                    rows="4" 
                    required 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder=" "
                  ></textarea>
                  <label>Message</label>
                </div>
              </div>

              <div className="button-group">
                <button type="submit" className="btn-primary stitch-effect">
                  Send Message
                </button>
                <button type="button" onClick={triggerWhatsApp} className="btn-secondary stitch-effect-green">
                  <WhatsAppIcon /> WhatsApp Us
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* --- WHY CUSTOMERS LOVE US --- */}
      <section className="why-love-section">
        <div className="container">
          <h2 className="section-title">Why Customers Love Us</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="benefit-card"
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Words That Inspire Us</h2>
          <div className="testimonials-grid">
            {testimonials.map((test, index) => (
              <motion.div 
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="testimonial-card"
              >
                <div className="testimonial-header">
                  <img src={test.img} alt={test.name} className="testimonial-avatar" />
                  <div className="testimonial-meta">
                    <h5>{test.name}</h5>
                    <div className="stars-row">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                </div>
                <p className="testimonial-text">"{test.review}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CUSTOMER GALLERY --- */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title">Happy Threads</h2>
          <p className="section-sub-center">A glimpse of our cherished community showcasing customized creations and beautiful moments.</p>
          <div className="circular-gallery-row">
            {galleryImages.map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="gallery-bubble"
              >
                <img src={img} alt={`Happy customer ${idx + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="faq-section">
        <div className="container-narrow">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-header">
                  <h4>{faq.q}</h4>
                  <span className="faq-trigger">{activeFaq === index ? '−' : '+'}</span>
                </div>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="faq-body"
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOCIAL MEDIA PREVIEWS --- */}
      <section className="social-journey-section">
        <div className="container">
          <h2 className="section-title">Follow Our Creative Journey</h2>
          <div className="grid-container">
            {/* Instagram Social Card */}
            <motion.div whileHover={{ y: -8 }} className="social-media-card insta-accent">
              <div className="social-card-img-wrap">
                <img src="https://images.unsplash.com/photo-1572085312730-23a6b6ec8fc1?auto=format&fit=crop&q=80&w=500" alt="Instagram Embroidery feed preview" />
                <div className="sc-overlay"><InstagramIcon /></div>
              </div>
              <div className="social-card-body">
                <h4>Embroidery Reels & Behind The Scenes</h4>
                <a href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" target="_blank" rel="noopener noreferrer" className="btn-social-follow stitch-effect">
                  Follow on Instagram
                </a>
              </div>
            </motion.div>

            {/* YouTube Social Card */}
            <motion.div whileHover={{ y: -8 }} className="social-media-card yt-accent">
              <div className="social-card-img-wrap">
                <img src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=500" alt="YouTube stitching tutorials preview" />
                <div className="sc-overlay"><YouTubeIcon /></div>
              </div>
              <div className="social-card-body">
                <h4>Detailed Hand Embroidery Tutorials</h4>
                <a href="https://youtube.com/@shree_hand_embroidery?si=yQ1gxB9E4spQr-pC" target="_blank" rel="noopener noreferrer" className="btn-social-follow stitch-effect-yt">
                  Subscribe on YouTube
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="final-cta-section">
        <div className="cta-overlay-accent"></div>
        <div className="cta-content">
          <h2>Ready to Bring Your Ideas to Life?</h2>
          <p>Let's create something beautiful together with handcrafted embroidery made especially for you.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn-cta-primary stitch-effect">Contact Us</a>
            <button onClick={triggerWhatsApp} className="btn-cta-whatsapp stitch-effect-green">
              <WhatsAppIcon /> WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="luxury-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h3>Shree Collection</h3>
            <p>Finely curated custom embroidery, luxury fabric art, and stunning personal stitches crafted with absolute perfection.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#collections">Collections</a></li>
              <li><a href="#contact" className="active-foot">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contacts">
            <h4>Get In Touch</h4>
            <p>📞 +91 9923062181</p>
            <div className="social-footer-row">
              <a href="https://www.instagram.com/shree_collection_art?igsh=ZW10MGt3MnJxa2M4" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
              <a href="https://youtube.com/@shree_hand_embroidery?si=yQ1gxB9E4spQr-pC" target="_blank" rel="noopener noreferrer"><YouTubeIcon /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Shree Collection. Crafted with Love.</p>
        </div>
      </footer>

    </div>
  );
}