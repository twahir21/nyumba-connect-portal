'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,

  Smartphone,
  Building,
  Users,
  Award
} from 'lucide-react';
import { PHONE, PHONE_TEXT } from '@/tools/url.const';
// Animation variants (consistent with landing page)
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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

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

// Contact Form Component
const ContactForm = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success (in real app, you'd send to your backend)
    setFormStatus('success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    // Reset after 3 seconds
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <motion.form
      variants={fadeRight}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold mb-6" style={{ color: '#191c1e' }}>
        Tuma Ujumbe Kwetu
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#3e4a3d' }}>
            Jina Kamili *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
            style={{
              borderColor: '#e0e3e5',
              backgroundColor: '#f7f9fb',
              color: '#191c1e'
            }}
            onFocus={(e) => e.target.style.borderColor = '#006b2c'}
            onBlur={(e) => e.target.style.borderColor = '#e0e3e5'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#3e4a3d' }}>
            Barua Pepe *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
            style={{
              borderColor: '#e0e3e5',
              backgroundColor: '#f7f9fb',
              color: '#191c1e'
            }}
            onFocus={(e) => e.target.style.borderColor = '#006b2c'}
            onBlur={(e) => e.target.style.borderColor = '#e0e3e5'}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#3e4a3d' }}>
            Nambari ya Simu
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
            style={{
              borderColor: '#e0e3e5',
              backgroundColor: '#f7f9fb',
              color: '#191c1e'
            }}
            onFocus={(e) => e.target.style.borderColor = '#006b2c'}
            onBlur={(e) => e.target.style.borderColor = '#e0e3e5'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#3e4a3d' }}>
            Mada *
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
            style={{
              borderColor: '#e0e3e5',
              backgroundColor: '#f7f9fb',
              color: '#191c1e'
            }}
            onFocus={(e) => e.target.style.borderColor = '#006b2c'}
            onBlur={(e) => e.target.style.borderColor = '#e0e3e5'}
          >
            <option value="">Chagua Mada</option>
            <option value="general">Maswali ya Jumla</option>
            <option value="support">Usaidizi wa Kiufundi</option>
            <option value="partnership">Ushirikiano na Madalali</option>
            <option value="complaint">Malalamiko</option>
            <option value="other">Nyinginezo</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" style={{ color: '#3e4a3d' }}>
          Ujumbe *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none"
          style={{
            borderColor: '#e0e3e5',
            backgroundColor: '#f7f9fb',
            color: '#191c1e'
          }}
          onFocus={(e) => e.target.style.borderColor = '#006b2c'}
          onBlur={(e) => e.target.style.borderColor = '#e0e3e5'}
          placeholder="Tuandikie chochote unachotaka kujua..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={formStatus === 'submitting'}
        className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
        style={{ backgroundColor: '#006b2c', color: '#ffffff' }}
      >
        {formStatus === 'submitting' && (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {formStatus === 'success' && <CheckCircle size={20} />}
        {formStatus === 'error' && <AlertCircle size={20} />}
        {formStatus === 'idle' && <Send size={18} />}
        {formStatus === 'submitting' && 'Inatuma...'}
        {formStatus === 'success' && 'Imetumwa!'}
        {formStatus === 'error' && 'Hitilafu, Jaribu Tena'}
        {formStatus === 'idle' && 'Tuma Ujumbe'}
      </motion.button>
    </motion.form>
  );
};

// Contact Info Card Component
const ContactInfo = () => {
  const contactItems = [
    { icon: Phone, title: 'Simu', details: [ PHONE_TEXT ] , color: '#006b2c' },
    { icon: Mail, title: 'Barua Pepe', details: ['huduma@nyumba-connect.co.tz'], color: '#00873a' },
    { icon: MapPin, title: 'Ofisi Yetu', details: ['Dar es Salaam, Tanzania'], color: '#006b2c' },
    { icon: Clock, title: 'Saa za Kufanya Kazi', details: ['Jumatatu - Ijumaa: 8:00 - 18:00', 'Jumamosi: 9:00 - 14:00'], color: '#00873a' },
  ];

  return (
    <motion.div
      variants={fadeLeft}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#191c1e' }}>
          Wasiliana Nasi
        </h3>
        <p className="mb-6" style={{ color: '#3e4a3d' }}>
          Tuko hapa kukusaidia. Wasiliana nasi kwa njia yoyote utakayoipenda na tutakujibu haraka iwezekanavyo.
        </p>

        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="flex gap-4"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '20' }}>
                <item.icon size={22} style={{ color: item.color }} />
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: '#191c1e' }}>{item.title}</h4>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-sm" style={{ color: '#3e4a3d' }}>{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t" style={{ borderColor: '#e0e3e5' }}>
          <h4 className="font-semibold mb-4 style={{ color: '#191c1e' }}">Tuungane Mitandao ya Kijamii</h4>
          <div className="flex gap-3">
            {[FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ backgroundColor: '#f7f9fb', color: '#006b2c' }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Stats Section
const ContactStats = () => {
  const { ref, controls } = useScrollAnimation();

  const stats = [
    { icon: Users, value: '10,000+', label: 'Watumiaji Wenye Furaha', color: '#006b2c' },
    { icon: Building, value: '500+', label: 'Vyumba Vilivyothibitishwa', color: '#00873a' },
    { icon: Award, value: '98%', label: 'Kiwango cha Kuridhika', color: '#006b2c' },
    { icon: Smartphone, value: '2026', label: 'Inazinduliwa Android', color: '#00873a' },
  ];

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={controls}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={scaleUp}
          className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: stat.color + '15' }}>
            <stat.icon size={28} style={{ color: stat.color }} />
          </div>
          <p className="text-2xl font-bold mb-1" style={{ color: '#191c1e' }}>{stat.value}</p>
          <p className="text-sm" style={{ color: '#3e4a3d' }}>{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

// FAQ Accordion Component
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, controls } = useScrollAnimation();

  const faqs = [
    {
      question: 'Je, Nyumba Connect ni bure kutumia kwa wanafunzi?',
      answer: 'Ndiyo, Nyumba Connect ni bure kabisa kwa wanafunzi wanaotafuta malazi. Hakuna gharama zozote za kutafuta, kuwasiliana, au kuweka nafasi kupitia jukwaa letu.'
    },
    {
      question: 'Ninawezaje kuwa Dalali au Mwanachama kwenye jukwaa?',
      answer: 'Ili kuwa Dalali, unahitaji kujaza fomu ya ushirikiano kwenye sehemu ya "Kwa Madalali". Timu yetu itakusaidia kuthibitisha akaunti yako na kuanza kuweka vyumba vyako.'
    },
    {
      question: 'Je, vyumba vyote kwenye jukwaa vinathibitishwa?',
      answer: 'Ndiyo, tunahakikisha kwamba kila nyumba, hostel, au chumba kinachowekwa kwenye jukwaa letu kinapitia mchakato wa uthibitishaji ili kuhakikisha usalama na ukweli wa taarifa.'
    },
    {
      question: 'Ninawezaje kuripoti tatizo au mlaghai kwenye jukwaa?',
      answer: 'Unaweza kuripoti tatizo lolote kwa kutumia fomu yetu ya mawasiliano hapo juu au kutuma barua pepe moja kwa moja kwa huduma@nyumba-connect.co.tz. Timu yetu itachukua hatua haraka.'
    },
    {
      question: 'Je, ninaweza kuweka nafasi ya chumba kabla ya kukiona?',
      answer: 'Tunapendekeza uwe unakiona chumba kwanza kabla ya kutoa malipo yoyote. Hata hivyo, mfumo wetu unakuwezesha kuwasiliana na Dalali na kupanga siku ya kuangalia chumba.'
    },
    {
      question: 'App ya Nyumba Connect inapatikana lini kwenye Android?',
      answer: 'App yetu ya Android inatarajiwa kuzinduliwa mwanzoni mwa mwaka 2026. Unaweza kujiunga na orodha ya wanaosubiri kupata taarifa za mapema na ofa za kipekee.'
    }
  ];

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={controls}
      className="mt-16"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: '#191c1e' }}>
        Maswali Yanayoulizwa{' '}
        <span style={{ color: '#006b2c' }}>Mara kwa Mara</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="text-center mb-10" style={{ color: '#3e4a3d' }}>
        Haya ni maswali ya kawaida kutoka kwa wanafunzi na madalali
      </motion.p>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center"
            >
              <span className="font-semibold" style={{ color: '#191c1e' }}>{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: '#006b2c' }}
              >
                ▼
              </motion.span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4">
                <p style={{ color: '#3e4a3d' }}>{faq.answer}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Map Component (Placeholder - can be replaced with actual map integration)
const MapPlaceholder = () => {
  return (
    <motion.div
      variants={scaleUp}
      className="rounded-2xl overflow-hidden shadow-xl h-64 md:h-80"
    >
      <div className="w-full h-full relative" style={{ backgroundColor: '#eceef0' }}>
        {/* Placeholder for Google Maps or Leaflet integration */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <MapPin size={48} style={{ color: '#006b2c' }} />
          <p className="mt-2 text-sm" style={{ color: '#3e4a3d' }}>Ramani ya eneo - Dar es Salaam, Tanzania</p>
          <p className="text-xs mt-1 opacity-60" style={{ color: '#3e4a3d' }}>Sokoine Drive, Plot No. 123</p>
        </div>
        {/* If you have a map API key, you can integrate Google Maps here */}
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=..."
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        /> */}
      </div>
    </motion.div>
  );
};

// Main Contact Component
export default function Contact() {
  const { ref: heroRef, controls: heroControls } = useScrollAnimation();

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-28 pb-12" style={{ backgroundColor: '#f7f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={heroRef}
            variants={staggerContainer}
            initial="hidden"
            animate={heroControls}
            className="text-center"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#7ffc97', color: '#002109' }}>
                Tuko Hapa Kukusaidia
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#191c1e' }}
            >
              Wasiliana{' '}
              <span style={{ color: '#006b2c' }}>Nasi</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#3e4a3d' }}
            >
              Una maswali yoyote? Tunafurahi kukusaidia. Wasiliana nasi kwa njia yoyote na tutakujibu haraka iwezekanavyo.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactStats />
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-12" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12" style={{ backgroundColor: '#f7f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MapPlaceholder />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 pb-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion />
        </div>
      </section>

      {/* CTA Section for App Download */}
      <section className="py-16" style={{ backgroundColor: '#006b2c' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Unahitaji Usaidizi wa Haraka?
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto" style={{ color: '#f7fff2' }}>
              Piga simu au tutumie ujumbe kwenye WhatsApp, tutakujibu ndani ya dakika 30
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={`tel:+${PHONE}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg"
                style={{ backgroundColor: '#ffffff', color: '#006b2c' }}
              >
                <Phone size={18} />
                Piga Simu Sasa
              </motion.a>
              <motion.a
                href={`https://wa.me/${PHONE}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 border-2 border-white transition-all"
                style={{ color: '#ffffff' }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}