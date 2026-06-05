'use client';

import { useState, useRef, useEffect, ForwardRefExoticComponent, RefAttributes } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import {
  Heart,
  Target,
  Eye,
  Users,
  MapPin,
  Globe,
  Shield,
  Zap,
  Smartphone,
  ArrowRight,
  Quote,
  Coffee,
  Rocket,
  TrendingUp,
  Handshake,
  Star,
  Building,
  GraduationCap,
  Clock,
  Mail,
  LucideProps,
} from 'lucide-react';

import Image from 'next/image';

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

// Team Member Component
const TeamMember = ({ name, role, description, delay }: { name: string; role: string; description: string; image: string; delay: number }) => {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      <div className="relative h-64 w-full overflow-hidden bg-linear-to-br from-[#006b2c] to-[#00873a]">
        <div className="absolute inset-0 flex items-center justify-center">
          <Users size={64} className="text-white/30" />
        </div>
        {/* In a real implementation, you would use actual images */}
        {/* <Image src={image} alt={name} fill className="object-cover" /> */}
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold mb-1" style={{ color: '#191c1e' }}>{name}</h3>
        <p className="text-sm font-semibold mb-2" style={{ color: '#006b2c' }}>{role}</p>
        <p className="text-sm" style={{ color: '#3e4a3d' }}>{description}</p>
      </div>
    </motion.div>
  );
};

// Milestone Component
const Milestone = ({ year, title, description, icon: Icon, delay }: { year: string; title: string; description: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; delay: number }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative pl-8 pb-8 border-l-2 last:pb-0"
      style={{ borderColor: '#006b2c30' }}
    >
      <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full" style={{ backgroundColor: '#006b2c' }}></div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006b2c15' }}>
          <Icon size={18} style={{ color: '#006b2c' }} />
        </div>
        <span className="text-sm font-bold px-2 py-1 rounded" style={{ backgroundColor: '#7ffc97', color: '#002109' }}>{year}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#191c1e' }}>{title}</h3>
      <p className="text-sm" style={{ color: '#3e4a3d' }}>{description}</p>
    </motion.div>
  );
};

// Value Card Component
const ValueCard = ({ icon: Icon, title, description, delay }: { icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; title: string; description: string; delay: number }) => {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#006b2c15' }}>
        <Icon size={32} style={{ color: '#006b2c' }} />
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#191c1e' }}>{title}</h3>
      <p className="text-sm" style={{ color: '#3e4a3d' }}>{description}</p>
    </motion.div>
  );
};

// Stat Counter Component
const StatCounter = ({ value, label, icon: Icon, suffix = '' }: { value: number; label: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, controls } = useScrollAnimation();

  useEffect(() => {
    if (controls) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [controls, value]);

  return (
    <motion.div
      ref={ref}
      variants={scaleUp}
      initial="hidden"
      animate={controls}
      className="text-center"
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#006b2c15' }}>
        <Icon size={24} style={{ color: '#006b2c' }} />
      </div>
      <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#006b2c' }}>
        {count}{suffix}
      </p>
      <p className="text-sm" style={{ color: '#3e4a3d' }}>{label}</p>
    </motion.div>
  );
};

// Testimonial Card
const TestimonialCard = ({ quote, name, role, delay }: { quote: string; name: string; role: string; image: string; delay: number }) => {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-md relative"
    >
      <Quote size={32} className="absolute top-4 right-4 opacity-10" style={{ color: '#006b2c' }} />
      <p className="text-sm md:text-base italic mb-4" style={{ color: '#3e4a3d' }}>&quot;{quote}&quot;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#006b2c] to-[#00873a] flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: '#191c1e' }}>{name}</p>
          <p className="text-xs" style={{ color: '#3e4a3d' }}>{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main About Us Component
export default function AboutUs() {
  const { ref: heroRef, controls: heroControls } = useScrollAnimation();

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-28 pb-16" style={{ backgroundColor: '#f7f9fb' }}>
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
                Hadithi Yetu
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#191c1e' }}
            >
              Kuhusu{' '}
              <span style={{ color: '#006b2c' }}>Nyumba Connect</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#3e4a3d' }}
            >
              Tunabadilisha jinsi wanafunzi wanavyopata malazi na jinsi Madalali wanavyouza huduma zao
              kwa kutumia teknolojia ya kisasa na imani ya ukweli.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#191c1e' }}>
                Hadithi ya <span style={{ color: '#006b2c' }}>Nyumba Connect</span>
              </h2>
              <div className="space-y-4" style={{ color: '#3e4a3d' }}>
                <p>
                  Nyumba Connect ilizaliwa mwaka 2024 kutokana na changamoto za wanafunzi wanaotafuta malazi 
                  nchini Tanzania. Wazo hili lilianza kwenye chuo kikuu cha Dar es Salaam (UDSM), 
                  ambapo wanafunzi walikuwa wakipoteza muda mwingi kutembea kutoka nyumba moja hadi nyingine 
                  kwa siku nzima bila mafanikio.
                </p>
                <p>
                  Mwanzilishi wetu, ambaye mwenyewe alikuwa mwanafunzi, aliona pengo kubwa kwenye soko la malazi ya 
                  wanafunzi. Madalali na wamiliki wa nyumba walikuwa wakitegemea matangazo ya karatasi au mdomo kwa mdomo, 
                  huku wanafunzi wakihangaika kupata taarifa sahihi na za kuaminika.
                </p>
                <p>
                  Leo hii, Nyumba Connect imekuwa jukwaa la kuaminika linalowaunganisha wanafunzi na malazi bora 
                  kote Tanzania. Tunajivunia kuwa na zaidi ya wanafunzi 10,000 waliosajiliwa na Madalali 500+ 
                  wanaotumia jukwaa letu kukuza biashara zao.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-tr from-[#006b2c]/30 to-transparent"></div>
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=700&fit=crop"
                  alt="Wanafunzi wakijifunza pamoja - asili ya Nyumba Connect"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7ffc97' }}>
                  <GraduationCap size={24} style={{ color: '#006b2c' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: '#3e4a3d' }}>Imeanzishwa</p>
                  <p className="font-bold text-lg" style={{ color: '#191c1e' }}>2024</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16" style={{ backgroundColor: '#f7f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md text-center"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#006b2c15' }}>
                <Target size={40} style={{ color: '#006b2c' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#191c1e' }}>Dhamira Yetu</h3>
              <p className="text-base leading-relaxed" style={{ color: '#3e4a3d' }}>
                Kuwawezesha wanafunzi na Madalali kupata fursa bora za malazi kwa njia rahisi, salama, 
                na ya kisasa kupitia teknolojia inayowaunganisha moja kwa moja.
              </p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md text-center"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#006b2c15' }}>
                <Eye size={40} style={{ color: '#006b2c' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#191c1e' }}>Malengo Yetu</h3>
              <p className="text-base leading-relaxed" style={{ color: '#3e4a3d' }}>
                Kuwa jukwaa la malazi la kuaminika zaidi Afrika Mashariki kwa kuwaunganisha wanafunzi 
                na nyumba bora, huku tukikuza uchumi wa kidijitali kwa Madalali na wamiliki wa nyumba.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <StatCounter value={100} label="Wanafunzi Waliosajiliwa" icon={Users} suffix="+" />
            <StatCounter value={50} label="Madalali Washirika" icon={Handshake} suffix="+" />
            <StatCounter value={120} label="Vyumba Vilivyowekwa" icon={Building} suffix="+" />
            <StatCounter value={93} label="Kiwango cha Kuridhika" icon={Star} suffix="%" />
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16" style={{ backgroundColor: '#f7f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
              Thamani Zetu za <span style={{ color: '#006b2c' }}>Msingi</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
              Kanuni zinazotuongoza katika kutoa huduma bora kwa wanafunzi na Madalali wetu
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard 
              icon={Shield} 
              title="Uaminifu na Usalama" 
              description="Tunahakikisha vyumba na Madalali wote wanapitia mchakato wa uthibitisho kabla ya kuanza kutumia jukwaa."
              delay={0.1}
            />
            <ValueCard 
              icon={Zap} 
              title="Ufanisi na Haraka" 
              description="Tunatumia teknolojia ya kisasa kuhakikisha utafutaji wa chumba unachukua dakika chache tu."
              delay={0.2}
            />
            <ValueCard 
              icon={Heart} 
              title="Huduma kwa Wateja" 
              description="Timu yetu iko tayari 24/7 kukusaidia na maswali yoyote au changamoto unazokutana nayo."
              delay={0.3}
            />
            <ValueCard 
              icon={Rocket} 
              title="Ubunifu na Maendeleo" 
              description="Tunaendelea kuboresha jukwaa letu na kuongeza vipengele vipya kukidhi mahitaji ya wateja wetu."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Timeline / Journey Section */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
              Safari Yetu <span style={{ color: '#006b2c' }}>Hadi Leo</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
              Kutoka wazo dogo hadi kuwa jukwaa linaloaminika la malazi nchini Tanzania
            </motion.p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Milestone 
              year="2024 - Q1"
              title="Wazo la Kuanzisha"
              description="Mwanzilishi wetu alipata wazo la kuunda jukwaa la kidijitali la malazi baada ya kukutana na changamoto za wanafunzi wenzake wanaotafuta vyumba."
              icon={Coffee}
              delay={0.1}
            />
            <Milestone 
              year="2024 - Q3"
              title="Uzinduzi wa Tovuti"
              description="Nyumba Connect ilizinduliwa rasmi kama tovuti, ikiwa na vyumba 50 vya kwanza kutoka maeneo ya jirani za chuo kikuu."
              icon={Globe}
              delay={0.15}
            />
            <Milestone 
              year="2025 - Q1"
              title="Wafikia Wanafunzi 5,000"
              description="Idadi ya wanafunzi waliosajiliwa ilifikia 5,000 na Madalali 200 waliojiunga na jukwaa letu."
              icon={TrendingUp}
              delay={0.2}
            />
            <Milestone 
              year="2025 - Q3"
              title="Mfumo wa Uthibitisho"
              description="Tukazindua mfumo wa uhakiki na uthibitisho wa vyumba na Madalali ili kuongeza usalama na uaminifu."
              icon={Shield}
              delay={0.25}
            />
            <Milestone 
              year="2026 - Q1"
              title="Kuzinduliwa kwa App ya Android"
              description="Tunatarajia kuzindua programu yetu ya Android, na kuleta urahisi zaidi kwa wanafunzi kutumia Nyumba Connect."
              icon={Smartphone}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16" style={{ backgroundColor: '#f7f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
              Timu Yetu ya <span style={{ color: '#006b2c' }}>Wataalamu</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
              Watu waliopo nyuma ya mafanikio ya Nyumba Connect, wakifanya kazi kwa bidii kukupa huduma bora.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamMember 
              name="John Mwakyembe"
              role="Mwanzilishi & CEO"
              description="Alizaliwa na wazo la Nyumba Connect akiwa mwanafunzi. Ana ndoto ya kubadilisha sekta ya majengo nchini Tanzania."
              image="/team/john.jpg"
              delay={0.1}
            />
            <TeamMember 
              name="Sarah Mushi"
              role="Afisa Mkuu wa Teknolojia"
              description="Mtaalamu wa teknolojia na ujenzi wa programu anayesimamia maendeleo ya jukwaa letu."
              image="/team/sarah.jpg"
              delay={0.2}
            />
            <TeamMember 
              name="James Mwita"
              role="Afisa Mkuu wa Uendeshaji"
              description="Anasimamia shughuli za kila siki na kuhakikisha wateja wanapata huduma bora."
              image="/team/james.jpg"
              delay={0.3}
            />
            <TeamMember 
              name="Grace Mwenda"
              role="Afisa Mkuu wa Uhusiano"
              description="Anawajibika kwa uhusiano na Madalali na wamiliki wa nyumba wanaotumia jukwaa letu."
              image="/team/grace.jpg"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#191c1e' }}>
              Wanachosema <span style={{ color: '#006b2c' }}>Wateja Wetu</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
              Maoni halisi kutoka kwa wanafunzi na Madalali wanaotumia Nyumba Connect
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              quote="Nyumba Connect iliniokoa muda mwingi sana. Nilitafuta chumba kwa wiki tatu bila mafanikio, lakini siku moja tu baada ya kutumia jukwaa, nilipata chumba bora karibu na chuo."
              name="Aisha Juma"
              role="Mwanafunzi, UDSM"
              image="/testimonials/aisha.jpg"
              delay={0.1}
            />
            <TestimonialCard 
              quote="Kama Dalali, nimeweza kufikia wanafunzi wengi zaidi kuliko hapo awali. Jukwaa ni rahisi kutumia na nimekamilisha dili nyingi kwa mwezi mmoja tu."
              name="Hamza Hassan"
              role="Dalali wa Majengo"
              image="/testimonials/hamza.jpg"
              delay={0.2}
            />
            <TestimonialCard 
              quote="Nilikuwa na wasiwasi kuhusu usalama, lakini mfumo wa uthibitisho wa Nyumba Connect ulinipa amani ya akili. Nafahamu kuwa vyumba na Madalali wamehakikiwa."
              name="Catherine John"
              role="Mwanafunzi, MUHAS"
              image="/testimonials/catherine.jpg"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16" style={{ backgroundColor: '#f7f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#191c1e' }}>
              Washirika <span style={{ color: '#006b2c' }}>Wetu</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base max-w-2xl mx-auto" style={{ color: '#3e4a3d' }}>
              Tunashirikiana na taasisi na kampuni zinazoamini katika maendeleo ya wanafunzi na teknolojia
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Building size={32} className="text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#006b2c' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Jiunge na Mapinduzi ya Malazi
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90" style={{ color: '#f7fff2' }}>
              Iwe wewe ni mwanafunzi unayetafuta chumba au Dalali unayetaka kukuza biashara yako,
              Nyumba Connect iko hapa kukusaidia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg"
                style={{ backgroundColor: '#ffffff', color: '#006b2c' }}
              >
                Jiunge Sasa <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full font-semibold border-2 border-white transition-all flex items-center justify-center gap-2"
                style={{ color: '#ffffff' }}
              >
                Wasiliana Nasi
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Footer Section */}
      <section className="py-12" style={{ backgroundColor: '#191c1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <MapPin size={20} style={{ color: '#62df7d' }} />
                <h3 className="font-semibold" style={{ color: '#ffffff' }}>Tupo Wapi</h3>
              </div>
              <p className="text-sm opacity-70" style={{ color: '#eff1f3' }}>Dar es Salaam, Tanzania</p>
              <p className="text-sm opacity-70" style={{ color: '#eff1f3' }}>Sokoine Drive, Plot No. 123</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Clock size={20} style={{ color: '#62df7d' }} />
                <h3 className="font-semibold" style={{ color: '#ffffff' }}>Saa za Kufanya Kazi</h3>
              </div>
              <p className="text-sm opacity-70" style={{ color: '#eff1f3' }}>Jumatatu - Ijumaa: 8:00 - 18:00</p>
              <p className="text-sm opacity-70" style={{ color: '#eff1f3' }}>Jumamosi: 9:00 - 14:00</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Mail size={20} style={{ color: '#62df7d' }} />
                <h3 className="font-semibold" style={{ color: '#ffffff' }}>Wasiliana Nasi</h3>
              </div>
              <p className="text-sm opacity-70" style={{ color: '#eff1f3' }}>hello@nyumbaconnect.com</p>
              <p className="text-sm opacity-70" style={{ color: '#eff1f3' }}>+255 123 456 789</p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}