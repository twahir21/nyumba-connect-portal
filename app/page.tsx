'use client';

import { useEffect } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import {
  Search,
  Home,
  MessageCircle,
  Star,
  ArrowRight,
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
                Inakuja Hivi Karibuni kwenye Android
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: '#191c1e' }}
            >
              Pata Chumba au{' '}
              <span style={{ color: '#006b2c' }}>Hostel Bora</span>{' '}
              kwa Urahisi
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8"
              style={{ color: '#3e4a3d' }}
            >
              Nyumba Connect inaziba ufa kati ya wanafunzi, madalali, na wamiliki wa nyumba. 
              Tafuta, wasiliana, na uhakikishe malazi yako unayotaka bila usumbufu.
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
                Wahi Nafasi Mapema <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full font-semibold transition-all border-2"
                style={{ borderColor: '#006b2c', color: '#006b2c' }}
              >
                Angalia Demo
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
                <p className="text-sm" style={{ color: '#3e4a3d' }}>Inaaminiwa na wanafunzi 500+</p>
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
                alt="Muonekano wa jukwaa la malazi ya wanafunzi"
                width={600}
                height={800}
                className="w-full h-auto rounded-3xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#006b2c] flex items-center justify-center">
                  <Search size={18} color="white" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#191c1e' }}>Tafuta chumba chako</p>
                  <p className="text-xs" style={{ color: '#3e4a3d' }}>Inatafuta Dar es Salaam...</p>
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
    { icon: Search, title: 'Utafutaji Mahiri', description: 'Chuja kwa eneo, bei, huduma, na vinginevyo ili kupata chumba kinachokufaa.', color: '#006b2c' },
    { icon: MessageCircle, title: 'Chat ya Papo Hapo', description: 'Wasiliana moja kwa moja na Madalali pamoja na wamiliki wa nyumba kwa wakati halisi.', color: '#00873a' },
    { icon: Shield, title: 'Vyumba Vilivyothibitishwa', description: 'Nyumba na hostel zote zinahakikiwa ili kuhakikisha usalama na ukweli wake.', color: '#006b2c' },
    { icon: Zap, title: 'Kuweka Nafasi Haraka', description: 'Linda chumba chako haraka sana kupitia mfumo wetu uliorahisishwa.', color: '#00873a' },
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
            Kwa Nini Uichague{' '}
            <span style={{ color: '#006b2c' }}>Nyumba Connect?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
            Tunafanya utafutaji wa malazi ya wanafunzi kuwa rahisi, wa wazi, na usio na usumbufu
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
    { step: '01', title: 'Tafuta & Chuja', description: 'Kagua mamia ya vyumba ukitumia vichujio vya kisasa ili kupata unachotaka.', icon: Search },
    { step: '02', title: 'Ungana & Chati', description: 'Mtumie ujumbe Dalali moja kwa moja kuuliza maswali na kupanga siku ya kuona chumba.', icon: MessageCircle },
    { step: '03', title: 'Tembelea & Chagua', description: 'Kagua chumba na uchague kile kinachokupa hisia za nyumbani.', icon: Home },
    { step: '04', title: 'Hama', description: 'Kamilisha taratibu kidijitali na uhamie kwenye makazi yako mapya.', icon: CheckCircle },
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
            Inavyofanya{' '}
            <span style={{ color: '#006b2c' }}>Kazi</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
            Hatua rahisi za kupata malazi kamili ya mwanafunzi
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
    'Weka idadi isiyo na kikomo ya vyumba',
    'Simamia wateja wako kutoka sehemu moja',
    'Taarifa za papo hapo kwa kila mteja mpya',
    'Takwimu na ufuatiliaji wa utendaji kazi',
    'Beji ya Uthibitisho ili kujenga uaminifu',
    'Msaada wa kipaumbele kwa wateja',
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
              Kwa Madalali & Mawakala
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
              Kuza Biashara Yako{' '}
              <span style={{ color: '#006e2f' }}>ya Majengo</span>
            </h2>
            <p className="text-lg mb-6" style={{ color: '#3e4a3d' }}>
              Ungana na mamia ya Madalali ambao tayari wanatumia Nyumba Connect kuweka vyumba, 
              kuungana na wanafunzi, na kukamilisha mikataba haraka kuliko kawaida.
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
              Kuwa Mshirika Wetu <ArrowRight size={18} />
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
                alt="Muonekano wa dashibodi ya dalali"
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
    { name: 'Sarah M.', role: 'Mwanafunzi, Chuo Kikuu cha Dar (UDSM)', text: 'Nyumba Connect ilifanya utafutaji wa chumba changu cha kwanza kuwa rahisi sana! Mfumo wa chat ulinisaidia kujadili bei moja kwa moja na Dalali.', rating: 5 },
    { name: 'Juma K.', role: 'Dalali wa Majengo', text: 'Kama dalali, napenda sana jinsi ilivyo rahisi kusimamia wateja. Nilikamilisha dili 3 katika mwezi wangu wa kwanza jukwaani!', rating: 5 },
    { name: 'Amina T.', role: 'Mmiliki wa Nyumba', text: 'Kupata wapangaji wanafunzi waaminifu haijawahi kuwa rahisi hivi. Jukwaa hili linaniokolea muda mwingi na nguvu.', rating: 5 },
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
            Maoni ya{' '}
            <span style={{ color: '#006b2c' }}>Watumiaji Wetu</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
            Simulizi halisi kutoka kwa wanafunzi na madalali waliopata mafanikio kupitia Nyumba Connect
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
            Uko Tayari Kupata Nyumba yako Bora?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg mb-8 max-w-2xl mx-auto opacity-90" style={{ color: '#f7fff2' }}>
            Ungana na maelfu ya wanafunzi na madalali ambao tayari wanatumia Nyumba Connect. 
            Wahi nafasi ya mapema kupata app yetu ya Android leo!
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg"
              style={{ backgroundColor: '#ffffff', color: '#006b2c' }}
            >
              <Smartphone size={18} />
              Wahi Nafasi Mapema
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-semibold border-2 border-white transition-all"
              style={{ color: '#ffffff' }}
            >
              Jifunze Zaidi
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};



// Main Page Component
export default function Index() {
  return <>
      <Hero />
      <Features />
      <HowItWorks />
      <ForDalalis />
      <Testimonials />
      <CTA />
  </>;
}