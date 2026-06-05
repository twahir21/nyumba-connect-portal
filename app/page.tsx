// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import {
  Search,
  Home,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  Menu,
  X,
  Shield,
  Zap,
  Smartphone,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};

// Animation variants
// 2. Add the : Variants type annotation to your objects
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Features', 'How It Works', 'For Dalalis', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="Nyumba Connect Logo"
              width={32}
              height={32}
              className="object-contain"
            />

            <span
              className="font-bold text-xl"
              style={{ color: "#00B34A" }}
            >
              Nyumba Connect
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: '#191c1e' }}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-xl"
              style={{ backgroundColor: '#006b2c', color: '#ffffff' }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: '#006b2c' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md"
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              className="block py-2 text-base font-medium transition-colors hover:opacity-70"
              style={{ color: '#191c1e' }}
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <button
            className="w-full px-5 py-2 rounded-full font-semibold transition-all"
            style={{ backgroundColor: '#006b2c', color: '#ffffff' }}
          >
            Get Started
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 overflow-hidden" style={{ backgroundColor: '#f7f9fb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#7ffc97', color: '#002109' }}>
                Coming Soon on Android
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: '#191c1e' }}
            >
              Find Your Perfect{' '}
              <span style={{ color: '#006b2c' }}>Student Home</span>{' '}
              with Ease
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8"
              style={{ color: '#3e4a3d' }}
            >
              Nyumba Connect bridges the gap between students, real estate agents (Dalalis),
              and property owners. Discover, connect, and secure your ideal accommodation effortlessly.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
                style={{ backgroundColor: '#006b2c', color: '#ffffff' }}
              >
                Get Early Access <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full font-semibold transition-all border-2"
                style={{ borderColor: '#006b2c', color: '#006b2c' }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-8 mt-8 pt-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#e0e3e5', color: '#191c1e' }}>
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm" style={{ color: '#3e4a3d' }}>Trusted by 500+ students</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-tr from-[#006b2c]/20 to-transparent"></div>
              <Image
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=800&fit=crop"
                alt="Student housing platform preview"
                width={600}
                height={800}
                className="w-full h-auto rounded-3xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#006b2c] flex items-center justify-center">
                  <Search size={18} color="white" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#191c1e' }}>Find your room</p>
                  <p className="text-xs" style={{ color: '#3e4a3d' }}>Searching in Dar es Salaam...</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Features Section
const Features = () => {
  const { ref, controls } = useScrollAnimation();

  const features = [
    { icon: Search, title: 'Smart Search', description: 'Filter by location, price, amenities, and more to find your perfect match.', color: '#006b2c' },
    { icon: MessageCircle, title: 'Instant Chat', description: 'Communicate directly with Dalalis and property owners in real-time.', color: '#00873a' },
    { icon: Shield, title: 'Verified Listings', description: 'All properties are verified to ensure safety and authenticity.', color: '#006b2c' },
    { icon: Zap, title: 'Fast Booking', description: 'Secure your room quickly with our streamlined booking process.', color: '#00873a' },
  ];

  return (
    <section id="features" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
            Why Choose{' '}
            <span style={{ color: '#006b2c' }}>Nyumba Connect</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
            We make finding student housing simple, transparent, and hassle-free
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl text-center transition-all shadow-sm hover:shadow-xl"
              style={{ backgroundColor: '#f7f9fb' }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: feature.color + '20' }}>
                <feature.icon size={32} style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#191c1e' }}>{feature.title}</h3>
              <p className="text-sm" style={{ color: '#3e4a3d' }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorks = () => {
  const { ref, controls } = useScrollAnimation();

  const steps = [
    { step: '01', title: 'Search & Filter', description: 'Browse hundreds of properties with advanced filters to find what you need.', icon: Search },
    { step: '02', title: 'Connect & Chat', description: 'Message Dalalis directly to ask questions and schedule viewings.', icon: MessageCircle },
    { step: '03', title: 'Visit & Choose', description: 'Tour properties and select the one that feels like home.', icon: Home },
    { step: '04', title: 'Move In', description: 'Complete paperwork digitally and move into your new space.', icon: CheckCircle },
  ];

  return (
    <section id="how-it-works" className="py-20" style={{ backgroundColor: '#f7f9fb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
            How{' '}
            <span style={{ color: '#006b2c' }}>It Works</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
            Simple steps to find your perfect student accommodation
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-full h-0.5 hidden lg:block" style={{ backgroundColor: '#bdcaba' }}></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate={controls}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg relative z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold" style={{ backgroundColor: '#006b2c', color: '#ffffff' }}>
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#7ffc97' }}>
                    <step.icon size={32} style={{ color: '#006b2c' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#191c1e' }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: '#3e4a3d' }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// For Dalalis Section
const ForDalalis = () => {
  const { ref, controls } = useScrollAnimation();

  const benefits = [
    'Post unlimited property listings',
    'Manage leads from a centralized dashboard',
    'Instant notifications for new inquiries',
    'Analytics and performance tracking',
    'Verified agent badge for trust',
    'Priority customer support',
  ];

  return (
    <section id="for-dalalis" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            variants={fadeLeft}
            initial="hidden"
            animate={controls}
          >
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#6bff8f', color: '#002109' }}>
              For Dalalis & Agents
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
              Grow Your{' '}
              <span style={{ color: '#006e2f' }}>Real Estate Business</span>
            </h2>
            <p className="text-lg mb-6" style={{ color: '#3e4a3d' }}>
              Join hundreds of Dalalis who are already using Nyumba Connect to list properties,
              connect with students, and close deals faster than ever before.
            </p>
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeRight}
                  initial="hidden"
                  animate={controls}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={20} style={{ color: '#006e2f' }} />
                  <span style={{ color: '#191c1e' }}>{benefit}</span>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg"
              style={{ backgroundColor: '#006e2f', color: '#ffffff' }}
            >
              Become a Partner <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <div className="bg-linear-to-br rounded-3xl p-8" style={{ backgroundColor: '#eceef0' }}>
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=600&fit=crop"
                alt="Dalali dashboard preview"
                width={500}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full flex items-center justify-center shadow-xl" style={{ backgroundColor: '#6bff8f' }}>
                <span className="text-2xl font-bold" style={{ color: '#002109' }}>+50%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const { ref, controls } = useScrollAnimation();

  const testimonials = [
    { name: 'Sarah M.', role: 'Student, University of Dar', text: 'Nyumba Connect made finding my first apartment so easy! The chat feature helped me negotiate directly with the Dalali.', rating: 5 },
    { name: 'Juma K.', role: 'Real Estate Agent', text: 'As a Dalali, I love how simple it is to manage leads. I closed 3 deals in my first month on the platform!', rating: 5 },
    { name: 'Amina T.', role: 'Property Owner', text: 'Finding responsible student tenants has never been easier. The platform saves me so much time and effort.', rating: 5 },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#f7f9fb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
            What Our{' '}
            <span style={{ color: '#006b2c' }}>Users Say</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
            Real stories from students and Dalalis who found success with Nyumba Connect
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={scaleUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <p className="mb-4 italic" style={{ color: '#191c1e' }}>&quot;{testimonial.text}&quot;</p>
              <div>
                <p className="font-semibold" style={{ color: '#006b2c' }}>{testimonial.name}</p>
                <p className="text-sm" style={{ color: '#3e4a3d' }}>{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="py-20" style={{ backgroundColor: '#006b2c' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
            Ready to Find Your Perfect Home?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg mb-8 max-w-2xl mx-auto opacity-90" style={{ color: '#f7fff2' }}>
            Join thousands of students and Dalalis already using Nyumba Connect.
            Get early access to our Android app today!
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg"
              style={{ backgroundColor: '#ffffff', color: '#006b2c' }}
            >
              <Smartphone size={18} />
              Get Early Access
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-semibold border-2 border-white transition-all"
              style={{ color: '#ffffff' }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-12" style={{ backgroundColor: '#191c1e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Nyumba Connect Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-bold text-xl" style={{ color: '#ffffff' }}>Nyumba Connect</span>
            </div>
            <p className="text-sm opacity-70" style={{ color: '#eff1f3' }}>
              Modern digital real estate and student housing platform connecting tenants with Dalalis and property owners.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70" style={{ color: '#eff1f3' }}>
              <li><a href="#features" className="hover:opacity-100 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:opacity-100 transition">How It Works</a></li>
              <li><a href="#for-dalalis" className="hover:opacity-100 transition">For Dalalis</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Contact</h4>
            <ul className="space-y-2 text-sm opacity-70" style={{ color: '#eff1f3' }}>
              <li className="flex items-center gap-2"><Mail size={14} /> hello@nyumbaconnect.com</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +255 123 456 789</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Dar es Salaam, Tanzania</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Download App</h4>
            <div className="space-y-2">
              <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur w-full">
                <Smartphone size={18} style={{ color: '#62df7d' }} />
                <span className="text-sm" style={{ color: '#ffffff' }}>Coming Soon on Android</span>
              </motion.button>
            </div>
          </div>
        </div>
        <div className="pt-8 text-center text-sm opacity-60" style={{ color: '#eff1f3' }}>
          <p>&copy; 2024 Nyumba Connect. All rights reserved. Built for students and Dalalis in Tanzania.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Index() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <ForDalalis />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}