'use client';

import { useState, useRef, useEffect, RefAttributes, ForwardRefExoticComponent } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import {
  Shield,
  Lock,
  Database,
  UserCheck,
  Cookie,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Share2,
  AlertTriangle,
  CheckCircle,
  Info,
  FileText,
  Settings,
  Activity,
  Users,
  Server,
  ExternalLink,
  Scale,
  LucideProps
} from 'lucide-react';

// Animation variants (consistent with landing page)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
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

  const sections = [
    { id: 'introduction', title: 'Utangulizi', icon: Info },
    { id: 'information-collect', title: 'Taarifa Tunazokusanya', icon: Database },
    { id: 'how-we-use', title: 'Jinsi Tunavyotumia Taarifa', icon: Settings },
    { id: 'legal-basis', title: 'Msingi wa Kisheria', icon: Scale },
    { id: 'cookies', title: 'Vidakuzi na Teknolojia', icon: Cookie },
    { id: 'sharing', title: 'Kushiriki Taarifa', icon: Share2 },
    { id: 'data-security', title: 'Usalama wa Data', icon: Lock },
    { id: 'data-retention', title: 'Uhifadhi wa Data', icon: Clock },
    { id: 'user-rights', title: 'Haki za Mtumiaji', icon: UserCheck },
    { id: 'children-privacy', title: 'Watoto na Faragha', icon: Users },
    { id: 'third-party', title: 'Viungo vya Nje', icon: ExternalLink },
    { id: 'international', title: 'Uhamisho wa Data', icon: Globe },
    { id: 'updates', title: 'Mabadiliko ya Sera', icon: FileText },
    { id: 'contact', title: 'Wasiliana Nasi', icon: Mail }
  ];

// Table of Contents Component
const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction');


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections.reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: '#e0e3e5' }}>
        <Shield size={20} style={{ color: '#006b2c' }} />
        <h3 className="font-bold text-lg" style={{ color: '#191c1e' }}>Yaliyomo</h3>
      </div>
      <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              activeSection === section.id
                ? 'font-semibold'
                : 'hover:bg-gray-50'
            }`}
            style={{
              color: activeSection === section.id ? '#006b2c' : '#3e4a3d',
              backgroundColor: activeSection === section.id ? '#7ffc9720' : 'transparent'
            }}
          >
            <section.icon size={14} />
            <span className="truncate">{section.title}</span>
          </a>
        ))}
      </nav>
    </motion.div>
  );
};

// Last Updated Badge
const LastUpdated = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#f7f9fb', color: '#3e4a3d' }}>
      <Clock size={14} />
      <span>Iliyosasishwa Mwisho: Januari 15, 2026</span>
    </div>
  );
};

// Section Component for consistent styling
const PrivacySection = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; children: React.ReactNode }) => {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={controls}
      className="scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006b2c15' }}>
          <Icon size={20} style={{ color: '#006b2c' }} />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: '#191c1e' }}>{title}</h2>
      </div>
      <div className="pl-14 space-y-3" style={{ color: '#3e4a3d' }}>
        {children}
      </div>
    </motion.section>
  );
};

// Data Collection Card Component
const DataCollectionCard = ({ icon: Icon, title, items, color }: {icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; title: string; items: string[]; color: string }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#e0e3e5' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
          <Icon size={20} style={{ color: color }} />
        </div>
        <h3 className="font-semibold text-lg" style={{ color: '#191c1e' }}>{title}</h3>
      </div>
      <ul className="space-y-2 pl-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <CheckCircle size={14} style={{ color: color }} className="mt-0.5 shrink-0" />
            <span style={{ color: '#3e4a3d' }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main Privacy Policy Component
export default function PrivacyPolicy() {
  const { ref: heroRef, controls: heroControls } = useScrollAnimation();

  const personalInfoItems = [
    'Jina kamili na jina la mtumiaji',
    'Barua pepe na nambari ya simu',
    'Anuani yako (kwa wanafunzi)',
    'Anuani ya biashara (kwa Madalali)',
    'Taarifa za kitambulisho (kwa uthibitisho)',
    'Picha yako ya wasifu (ikiwa utaweka)'
  ];

  const accountInfoItems = [
    'Historia ya kutafuta na kuangalia vyumba',
    'Mawasiliano yako na Madalali',
    'Mapendeleo yako ya kutafuta',
    'Tathmini na maoni uliyotoa',
    'Maelezo ya malipo (kama unatumia huduma za kulipwa)',
    'Historia ya kuingia na shughuli zako'
  ];

  const technicalInfoItems = [
    'Anuani ya IP na aina ya kivinjari',
    'Mfumo wa uendeshaji wa kifaa chako',
    'Taarifa za kifaa (modeli, ukubwa wa skrini)',
    'Muda na tarehe ya kutembelea jukwaa',
    'Kurasa ulizotembelea na muda uliotumia',
    'Vidakuzi na teknolojia zinazofanana'
  ];

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
                Usalama na Faragha
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#191c1e' }}
            >
              Sera ya{' '}
              <span style={{ color: '#006b2c' }}>Faragha</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg max-w-2xl mx-auto mb-6"
              style={{ color: '#3e4a3d' }}
            >
              Tunajali sana faragha yako. Sera hii inaelezea jinsi tunavyokusanya, kutumia, na kulinda
              taarifa zako za kibinafsi unapotumia Nyumba Connect.
            </motion.p>
            <motion.div variants={fadeUp}>
              <LastUpdated />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Table of Contents */}
            <div className="lg:col-span-1">
              <TableOfContents />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-10">
              {/* Introduction */}
              <PrivacySection id="introduction" title="Utangulizi" icon={Info}>
                <p>
                  Nyumba Connect (&quot;Jukwaa&quot;, &quot;Sisi&quot;, &quot;Yetu&quot;) inaheshimu faragha yako na imejitolea kulinda
                  taarifa zako za kibinafsi. Sera hii ya faragha inaelezea aina za taarifa tunazokusanya,
                  jinsi tunavyozitumia, na haki zako kuhusu taarifa zako.
                </p>
                <p>
                  Sera hii inatumika kwa watumiaji wote wa Nyumba Connect, ikiwemo wanafunzi wanaotafuta malazi,
                  Madalali wa majengo, na wamiliki wa nyumba. Kwa kutumia jukwaa letu, unakubali mkusanyaji
                  na matumizi ya taarifa zako kama ilivyoelezwa hapa.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 mt-3 flex items-start gap-3">
                  <Info size={20} style={{ color: '#006b2c' }} className="shrink-0 mt-0.5" />
                  <p className="text-sm" style={{ color: '#191c1e' }}>
                    <strong>Kumbuka:</strong> Sera hii ni sehemu ya Sheria na Masharti yetu.
                    Ikiwa hukubaliani na Sera hii, tafadhali usitumie jukwaa letu.
                  </p>
                </div>
              </PrivacySection>

              {/* Information We Collect */}
              <PrivacySection id="information-collect" title="Taarifa Tunazokusanya" icon={Database}>
                <p>
                  Tunakusanya aina mbalimbali za taarifa ili kukupa huduma bora na salama.
                  Hizi ni pamoja na:
                </p>
                
                <div className="grid md:grid-cols-2 gap-5 mt-4">
                  <DataCollectionCard
                    icon={UserCheck}
                    title="Taarifa za Kibinafsi"
                    items={personalInfoItems}
                    color="#006b2c"
                  />
                  <DataCollectionCard
                    icon={Activity}
                    title="Taarifa za Akaunti na Matumizi"
                    items={accountInfoItems}
                    color="#00873a"
                  />
                  <DataCollectionCard
                    icon={Server}
                    title="Taarifa za Kiufundi"
                    items={technicalInfoItems}
                    color="#006b2c"
                  />
                </div>

                <p className="mt-4">
                  Kwa Madalali na wamiliki wa nyumba, tunaweza pia kukusanya taarifa za ziada kama vile
                  leseni ya biashara, kitambulisho cha kodi, na hati za umiliki wa nyumba kwa ajili ya uthibitisho.
                </p>
              </PrivacySection>

              {/* How We Use Information */}
              <PrivacySection id="how-we-use" title="Jinsi Tunavyotumia Taarifa" icon={Settings}>
                <p>
                  Tunatumia taarifa tunazokusanya kwa madhumuni yafuatayo:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Kukupa na kuboresha huduma zetu za kutafuta na kuunganisha na malazi</li>
                  <li>Kuruhusu mawasiliano kati ya wanafunzi, Madalali, na wamiliki wa nyumba</li>
                  <li>Kuhakikisha usalama na uhalali wa watumiaji wetu kupitia mchakato wa uthibitisho</li>
                  <li>Kukupa mapendekezo ya vyumba kulingana na historia yako ya kutafuta</li>
                  <li>Kutuma arifa muhimu kuhusu akaunti yako, maelezo uliyoweka, au mabadiliko ya huduma</li>
                  <li>Kuchambua na kuboresha utendaji wa jukwaa letu</li>
                  <li>Kuzuia ulaghai, unyanyasaji, na shughuli zisizo halali kwenye jukwaa</li>
                  <li>Kutii majukumu yetu ya kisheria na udhibiti</li>
                </ul>
                <p className="mt-3">
                  Hatutatumia taarifa zako kwa madhumuni mengine bila idhini yako, isipokuwa pale
                  inapotakiwa na sheria.
                </p>
              </PrivacySection>

              {/* Legal Basis */}
              <PrivacySection id="legal-basis" title="Msingi wa Kisheria" icon={Scale}>
                <p>
                  Tunachakata taarifa zako kwa misingi ifuatayo ya kisheria (kwa mujibu wa sheria za Tanzania
                  na kanuni za kimataifa za faragha):
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Idhini yako:</strong> Unapokubali kutoa taarifa zako kwa hiari unapofungua akaunti</li>
                  <li><strong>Utekelezaji wa mkataba:</strong> Ili kukupa huduma ulizoombwa (kama kuunganisha na Dalali)</li>
                  <li><strong>Wajibu wa kisheria:</strong> Tunapotakiwa na sheria kuhifadhi au kutoa taarifa zako</li>
                  <li><strong>Maslahi halali:</strong> Kuboresha jukwaa, kuzuia ulaghai, na kulinda usalama wa watumiaji</li>
                </ul>
              </PrivacySection>

              {/* Cookies and Tracking */}
              <PrivacySection id="cookies" title="Vidakuzi na Teknolojia" icon={Cookie}>
                <p>
                  Tunatumia vidakuzi (cookies) na teknolojia zinazofanana ili kuboresha matumizi yako kwenye
                  Nyumba Connect. Vidakuzi ni faili ndogo zinazowekwa kwenye kifaa chako unapotembelea tovuti yetu.
                </p>
                <p>
                  Aina za vidakuzi tunazotumia:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Vidakuzi muhimu:</strong> Vinavyohitajika kwa utendaji wa kimsingi wa jukwaa</li>
                  <li><strong>Vidakuzi vya utendaji:</strong> Vinavyotusaidia kukumbuka mapendeleo yako</li>
                  <li><strong>Vidakuzi vya uchambuzi:</strong> Vinavyotusaidia kuelewa jinsi unavyotumia jukwaa</li>
                  <li><strong>Vidakuzi vya matangazo:</strong> Vinavyotumika kukuonesha matangazo yanayokufaa (kama unaruhusu)</li>
                </ul>
                <p className="mt-3">
                  Unaweza kudhibiti vidakuzi kupitia mipangilio ya kivinjari chako. Hata hivyo, kuzima vidakuzi
                  kunaweza kuathiri baadhi ya vipengele vya jukwaa letu.
                </p>
              </PrivacySection>

              {/* Sharing Information */}
              <PrivacySection id="sharing" title="Kushiriki Taarifa" icon={Share2}>
                <p>
                  Hatutauzi, kukodisha, au kushiriki taarifa zako za kibinafsi na watu wengine isipokuwa katika
                  hali zifuatazo:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>
                    <strong>Kwa Madalali na wamiliki wa nyumba:</strong> Unapowasiliana nao kupitia jukwaa,
                    taarifa zako za msingi (jina, nambari ya simu, barua pepe) zinaonekana ili waweze kukujibu.
                  </li>
                  <li>
                    <strong>Watoa huduma washirika:</strong> Tunashirikiana na watoa huduma wanaoaminika
                    (kwa mfano, watoa huduma za seva, uchambuzi wa data) ambao hutii viwango vya usalama.
                  </li>
                  <li>
                    <strong>Mahitaji ya kisheria:</strong> Tunapotakiwa na sheria, mahakama, au mamlaka za serikali
                    kutoa taarifa zako.
                  </li>
                  <li>
                    <strong>Kulinda haki zetu:</strong> Ili kulinda usalama wa Nyumba Connect, watumiaji wetu,
                    au umma kutokana na madhara.
                  </li>
                  <li>
                    <strong>Mabadiliko ya umiliki:</strong> Ikiwa kampuni yetu inauzwa au kuunganishwa na kampuni nyingine,
                    taarifa zako zinaweza kuhamishiwa kwa mmiliki mpya.
                  </li>
                </ul>
                <div className="bg-amber-50 rounded-xl p-4 mt-3 flex items-start gap-3">
                  <AlertTriangle size={20} style={{ color: '#d97706' }} className="shrink-0 mt-0.5" />
                  <p className="text-sm" style={{ color: '#92400e' }}>
                    <strong>Tahadhari:</strong> Kamwe usishiriki taarifa nyeti kama namba ya kitambulisho,
                    namba ya akaunti ya benki, au nywila kwenye mazungumzo ya jukwaani. Tumia mfumo wa malipo salama.
                  </p>
                </div>
              </PrivacySection>

              {/* Data Security */}
              <PrivacySection id="data-security" title="Usalama wa Data" icon={Lock}>
                <p>
                  Tunachukua hatua makini za usalama kulinda taarifa zako dhidi ya upotevu, matumizi mabaya,
                  au ufikiaji usioidhinishwa. Hatua zetu za usalama zinajumuisha:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Usimbaji fiche (encryption) wa data inaposafirishwa kwenye mtandao (SSL/TLS)</li>
                  <li>Uhifadhi salama wa data kwenye seva zilizolindwa kwa ngome za usalama</li>
                  <li>Ufikiaji wa data kwa wafanyakazi wetu tu wanaohitaji kufanya kazi zao</li>
                  <li>Ukaguzi wa mara kwa mara wa mifumo yetu ili kugundua udhaifu</li>
                  <li>Mafunzo kwa wafanyakazi wetu kuhusu umuhimu wa faragha na usalama wa data</li>
                </ul>
                <p className="mt-3">
                  Hata hivyo, hakuna mfumo wa usalama ambao hauwezi kuvunjwa. Hatuwezi kuhakikisha usalama kamili
                  wa data yako. Unatumia jukwaa letu kwa hatari yako mwenyewe.
                </p>
              </PrivacySection>

              {/* Data Retention */}
              <PrivacySection id="data-retention" title="Uhifadhi wa Data" icon={Clock}>
                <p>
                  Tunahifadhi taarifa zako kwa muda unaohitajika kutimiza malengo yaliyoelezwa kwenye Sera hii,
                  au kwa muda unaotakiwa na sheria. Kwa ujumla:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Taarifa za akaunti: Kwa muda wa akaunti yako ikiwa hai</li>
                  <li>Mawasiliano na historia: Kwa muda wa miaka 3 baada ya shughuli ya mwisho</li>
                  <li>Taarifa za malipo: Kwa muda unaotakiwa na sheria za kodi (miaka 5-7)</li>
                  <li>Vidakuzi: Kulingana na muda uliowekwa kwenye kivinjari chako</li>
                </ul>
                <p className="mt-3">
                  Baada ya muda wa uhifadhi kumalizika, tutafuta au kutokufahamisha taarifa zako,
                  isipokuwa tumepewa sababu za kisheria za kuzihifadhi kwa muda mrefu zaidi.
                </p>
              </PrivacySection>

              {/* User Rights */}
              <PrivacySection id="user-rights" title="Haki za Mtumiaji" icon={UserCheck}>
                <p>
                  Kwa mujibu wa sheria za faragha, una haki zifuatazo kuhusu taarifa zako:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {[
                    { right: 'Haki ya kufahamishwa', desc: 'Kujua ni taarifa gani tunazokusanya na jinsi tunavyozitumia' },
                    { right: 'Haki ya kufikia', desc: 'Kuomba nakala ya taarifa zako tulizozikusanya' },
                    { right: 'Haki ya kusahihisha', desc: 'Kuomba tusahihishe taarifa zako zisizo sahihi' },
                    { right: 'Haki ya kufuta', desc: 'Kuomba tufute taarifa zako (haki ya kusahauliwa)' },
                    { right: 'Haki ya kupinga', desc: 'Kupinga jinsi tunavyochakata taarifa zako' },
                    { right: 'Haki ya kuhamisha', desc: 'Kuomba tukupe taarifa zako katika muundo unaoweza kusomeka' },
                    { right: 'Haki ya kujiondoa', desc: 'Kujiondoa kwenye matangazo au mawasiliano ya biashara' },
                    { right: 'Haki ya kulalamika', desc: 'Kulalamika kwa mamlaka husika za ulinzi wa data' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle size={14} style={{ color: '#006b2c' }} />
                        <span className="font-semibold text-sm" style={{ color: '#191c1e' }}>{item.right}</span>
                      </div>
                      <p className="text-xs" style={{ color: '#3e4a3d' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4">
                  Ili kutumia haki zozote kati ya hizi, tafadhali wasiliana nasi kwa barua pepe: privacy@nyumbaconnect.com.
                  Tutajibu ombi lako ndani ya siku 30 za kazi.
                </p>
              </PrivacySection>

              {/* Children Privacy */}
              <PrivacySection id="children-privacy" title="Watoto na Faragha" icon={Users}>
                <p>
                  Nyumba Connect haikusudiwi kwa watoto walio chini ya umri wa miaka 13. Hatukusanyi kwa makusudi
                  taarifa za kibinafsi za watoto chini ya umri huo.
                </p>
                <p>
                  Kwa wanafunzi wenye umri kati ya miaka 13 na 18, tunahitaji kibali cha mzazi au mlezi wao
                  kabla ya kutumia jukwaa letu. Mzazi au mlezi anawajibika kusimamia shughuli za mtoto wao
                  kwenye jukwaa letu.
                </p>
                <p>
                  Ikiwa utagundua kuwa mtoto wako ametoa taarifa zake kwenye jukwaa letu bila idhini yako,
                  tafadhali wasiliana nasi mara moja ili tuweze kufuta taarifa hizo.
                </p>
              </PrivacySection>

              {/* Third Party Links */}
              <PrivacySection id="third-party" title="Viungo vya Nje" icon={ExternalLink}>
                <p>
                  Jukwaa letu linaweza kuwa na viungo (links) vinavyoelekeza kwenye tovuti au programu za watu wengine.
                  Viungo hivi vinatolewa kwa urahisi wako tu na hatudhibiti maudhui au sera za faragha za tovuti hizo.
                </p>
                <p>
                  Tunakuhimiza usome sera za faragha za tovuti zozote za nje unazotembelea kupitia viungo vyetu.
                  Hatutawajibikia mkusanyaji, matumizi, au usalama wa taarifa zako kwenye tovuti za watu wengine.
                </p>
              </PrivacySection>

              {/* International Transfers */}
              <PrivacySection id="international" title="Uhamisho wa Data" icon={Globe}>
                <p>
                  Nyumba Connect inafanya kazi nchini Tanzania, na seva zetu ziko nchini Tanzania.
                  Hata hivyo, tunaweza kutumia watoa huduma wa kimataifa ambao wana seva katika nchi nyingine.
                </p>
                <p>
                  Unapotumia jukwaa letu, taarifa zako zinaweza kuhamishwa na kuhifadhiwa katika nchi ambazo
                  zina sheria tofauti za ulinzi wa data. Tunachukua hatua zinazofaa kuhakikisha kwamba
                  taarifa zako zinalindwa kulingana na viwango vya kimataifa.
                </p>
              </PrivacySection>

              {/* Updates to Policy */}
              <PrivacySection id="updates" title="Mabadiliko ya Sera" icon={FileText}>
                <p>
                  Tunaweza kusasisha Sera hii ya Faragha mara kwa mara ili kuakisi mabadiliko katika huduma zetu
                  au mahitaji ya kisheria. Tutachapisha toleo jipya kwenye ukurasa huu na kubadilisha
                  &quot;Iliyosasishwa Mwisho&quot; hapo juu.
                </p>
                <p>
                  Mabadiliko makubwa tutakujulisha kupitia barua pepe (kwa watumiaji waliojisajili) au
                  kwa kutangaza kwenye jukwaa letu. Tunakuhimiza ukague Sera hii mara kwa mara ili
                  uwe na habari kuhusu jinsi tunavyolinda faragha yako.
                </p>
                <p>
                  Ikiwa unaendelea kutumia Nyumba Connect baada ya mabadiliko kuanza kutumika,
                  inamaanisha kuwa unakubaliana na Sera mpya.
                </p>
              </PrivacySection>

              {/* Contact */}
              <PrivacySection id="contact" title="Wasiliana Nasi" icon={Mail}>
                <p>
                  Ikiwa una maswali, wasiwasi, au ombi lolote kuhusu Sera hii ya Faragha au jinsi tunavyoshughulikia
                  taarifa zako, tafadhali wasiliana nasi kwa njia zifuatazo:
                </p>
                <div className="bg-gray-50 rounded-xl p-5 space-y-3 mt-3">
                  <p className="flex items-center gap-3">
                    <Mail size={18} style={{ color: '#006b2c' }} />
                    <span><strong>Barua Pepe (Masuala ya Faragha):</strong> privacy@nyumbaconnect.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail size={18} style={{ color: '#006b2c' }} />
                    <span><strong>Barua Pepe (Jumla):</strong> hello@nyumbaconnect.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone size={18} style={{ color: '#006b2c' }} />
                    <span><strong>Simu:</strong> +255 123 456 789</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin size={18} style={{ color: '#006b2c' }} />
                    <span><strong>Anuani ya Barua:</strong> Sokoine Drive, Plot No. 123, Dar es Salaam, Tanzania</span>
                  </p>
                </div>
                <p className="mt-3">
                  Tunajitahidi kukujibu ndani ya siku 30 za kazi. Ikiwa haujaridhika na jibu letu,
                  una haki ya kulalamika kwa Mamlaka ya Ulinzi wa Data na Faragha ya Tanzania (kama itakuwepo)
                  au mahakama husika.
                </p>
              </PrivacySection>

              {/* Acknowledgment Section */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8 pt-6 border-t-2 text-center"
                style={{ borderColor: '#006b2c20' }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#7ffc9720' }}>
                  <Shield size={18} style={{ color: '#006b2c' }} />
                  <span className="text-sm font-medium" style={{ color: '#006b2c' }}>Faragha yako ni muhimu kwetu!</span>
                </div>
                <p className="text-sm mt-4" style={{ color: '#3e4a3d' }}>
                  Kwa kutumia Nyumba Connect, unakubali mkusanyaji na matumizi ya taarifa zako kama ilivyoelezwa
                  kwenye Sera hii ya Faragha.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12" style={{ backgroundColor: '#f7f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-3" style={{ color: '#191c1e' }}>
              Bado una maswali kuhusu faragha yako?
            </h3>
            <p className="mb-4" style={{ color: '#3e4a3d' }}>
              Timu yetu ya usaidizi iko tayari kukusaidia na masuala yote ya faragha na usalama.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold shadow-md"
              style={{ backgroundColor: '#006b2c', color: '#ffffff' }}
            >
              Wasiliana Nasi
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}