'use client';

import { useState, useRef, useEffect, RefAttributes, ForwardRefExoticComponent } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import {
    Shield,
    FileText,
    CheckCircle,
    AlertCircle,
    Info,
    Lock,
    Users,
    Home,
    DollarSign,
    Clock,
    Scale,
    Mail,
    Phone,
    ExternalLink,
    BookOpen,
    Award,
    Eye,
    MapPin,
    Calendar,
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

const sections = [
    { id: 'introduction', title: 'Utangulizi', icon: BookOpen },
    { id: 'acceptance', title: 'Kukubaliana na Sheria', icon: CheckCircle },
    { id: 'eligibility', title: 'Sifa za Kutumia', icon: Users },
    { id: 'user-accounts', title: 'Akaunti za Watumiaji', icon: Lock },
    { id: 'listings', title: 'Maelezo ya Vyumba', icon: Home },
    { id: 'bookings', title: 'Kuweka Nafasi na Malipo', icon: DollarSign },
    { id: 'dalali-obligations', title: 'Wajibu wa Madalali', icon: Scale },
    { id: 'student-obligations', title: 'Wajibu wa Wanafunzi', icon: Users },
    { id: 'verification', title: 'Uhakiki na Uthibitisho', icon: Shield },
    { id: 'privacy-data', title: 'Faragha na Data', icon: Eye },
    { id: 'prohibited-conduct', title: 'Tabia Zisizoruhusiwa', icon: AlertCircle },
    { id: 'termination', title: 'Kufunga Akaunti', icon: Clock },
    { id: 'disclaimers', title: 'Makanusho', icon: Info },
    { id: 'limitation-liability', title: 'Mipaka ya Dhima', icon: AlertCircle },
    { id: 'indemnification', title: 'Fidia', icon: Shield },
    { id: 'modifications', title: 'Mabadiliko ya Sheria', icon: FileText },
    { id: 'governing-law', title: 'Sheria Inayotumika', icon: Scale },
    { id: 'contact', title: 'Mawasiliano', icon: Mail }
];

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
                <FileText size={20} style={{ color: '#006b2c' }} />
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
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${activeSection === section.id
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
            <Calendar size={14} />
            <span>Iliyosasishwa Mwisho: Januari 15, 2026</span>
        </div>
    );
};

// Section Component for consistent styling
const TermsSection = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; children: React.ReactNode }) => {
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

// Main Terms and Conditions Component
export default function TermsAndConditions() {
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
                                Hati Rasmi
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={fadeUp}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                            style={{ color: '#191c1e' }}
                        >
                            Vigezo na{' '}
                            <span style={{ color: '#006b2c' }}>Masharti</span>
                        </motion.h1>
                        <motion.p
                            variants={fadeUp}
                            className="text-lg max-w-2xl mx-auto mb-6"
                            style={{ color: '#3e4a3d' }}
                        >
                            Tafadhali soma vigezo na masharti haya kwa makini kabla ya kutumia jukwaa la Nyumba Connect.
                            Kwa kutumia huduma zetu, unakubali kufuata sheria hizi.
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
                            <TermsSection id="introduction" title="Utangulizi" icon={BookOpen}>
                                <p>
                                    Nyumba Connect (&quot;Jukwaa&quot;, &quot;Sisi&quot;, &quot;Yetu&quot;) ni jukwaa la kidijitali linalowaunganisha wanafunzi wanaotafuta malazi,
                                    madalali wa majengo, na wamiliki wa nyumba nchini Tanzania. Vigezo na Masharti haya yanatawala matumizi yako
                                    ya jukwaa letu, tovuti yetu, programu ya simu, na huduma zetu zote.
                                </p>
                                <p>
                                    Tunakuhimiza usome sheria hizi kwa makini. Kwa kufungua akaunti au kutumia huduma zetu, unakubali
                                    kuwa umesoma, kuelewa, na kukubaliana na Vigezo na Masharti haya. Ikiwa hukubaliani na sehemu yoyote,
                                    tafadhali usitumie jukwaa letu.
                                </p>
                            </TermsSection>

                            {/* Acceptance */}
                            <TermsSection id="acceptance" title="Kukubaliana na Sheria" icon={CheckCircle}>
                                <p>
                                    Kwa kufikia au kutumia Nyumba Connect, unakubali kuwa umesoma, kuelewa, na kukubaliana kuwa na
                                    Vigezo na Masharti haya. Ikiwa haukubaliani na masharti yoyote, huna ruhusa ya kufikia au kutumia jukwaa letu.
                                </p>
                                <p>
                                    Unaweza pia kutakiwa kukubaliana na sheria za ziada (kama vile Sera ya Faragha) wakati wa kutumia
                                    huduma fulani. Sheria zote za ziada zinaunganishwa na Vigezo na Masharti haya.
                                </p>
                            </TermsSection>

                            {/* Eligibility */}
                            <TermsSection id="eligibility" title="Sifa za Kutumia" icon={Users}>
                                <p>
                                    Ili kutumia Nyumba Connect, lazima uwe na umri wa angalau miaka 18 au zaidi. Kwa wanafunzi walio chini ya umri huo,
                                    unatakiwa kupata kibali cha mzazi au mlezi wako kabla ya kutumia jukwaa letu.
                                </p>
                                <p>
                                    Kwa Madalali na wamiliki wa nyumba, lazima uwe na leseni halali ya kufanya biashara ya majengo (kama inavyotakiwa
                                    na sheria za Tanzania) au uthibitisho wa umiliki wa nyumba husika.
                                </p>
                                <p>
                                    Huna ruhusa ya kutumia jukwaa letu ikiwa umewahi kuzuiliwa au kufungiwa akaunti yako na Nyumba Connect kwa
                                    ukiukaji wa sheria zetu.
                                </p>
                            </TermsSection>

                            {/* User Accounts */}
                            <TermsSection id="user-accounts" title="Akaunti za Watumiaji" icon={Lock}>
                                <p>
                                    Unapofungua akaunti, unatakiwa kutoa taarifa sahihi, kamili, na za sasa. Wajibu wako ni kuhakikisha
                                    taarifa zako zinasalia kuwa sahihi na zinasasishwa kila wakati.
                                </p>
                                <p>
                                    Wewe ndiye mwenyeji wa siri (password) yako na shughuli zote zinazotokea kwenye akaunti yako.
                                    Tafadhali tujulishe mara moja ukipata shaka kwamba akaunti yako imeathiriwa na watu wasio na ruhusa.
                                </p>
                                <p>
                                    Hatuwajibikii hasara au madhara yoyote yanayotokana na kushindwa kwako kulinda taarifa zako za kuingia.
                                    Unaweza kufunga akaunti yako wakati wowote kwa kuwasiliana nasi.
                                </p>
                            </TermsSection>

                            {/* Listings */}
                            <TermsSection id="listings" title="Maelezo ya Vyumba" icon={Home}>
                                <p>
                                    Madalali na wamiliki wa nyumba wanawajibika kwa usahihi wa maelezo yote ya vyumba wanayoweka kwenye jukwaa.
                                    Maelezo yanapaswa kuwa ya kweli, sahihi, na yasiyo na utata kwa wanafunzi wanaotafuta malazi.
                                </p>
                                <p>
                                    Nyumba Connect ina haki ya kukagua, kuhariri, au kuondoa maelezo yoyote yanayoonekana kuwa ya uwongo,
                                    ya kutatanisha, au yanayokiuka sheria zetu. Pia tunaweza kuthibitisha baadhi ya maelezo kwa
                                    kupitia ukaguzi wa eneo au mahojiano na wamiliki.
                                </p>
                                <p>
                                    Kwa upande wa wanafunzi, unapaswa kufanya ukaguzi wako mwenyewe kabla ya kukubali kuhama.
                                    Hatuhakikishi usahihi kamili wa maelezo yote na tunakuhimiza kuuliza maswali ya ziada kwa Dalali.
                                </p>
                            </TermsSection>

                            {/* Bookings and Payments */}
                            <TermsSection id="bookings" title="Kuweka Nafasi na Malipo" icon={DollarSign}>
                                <p>
                                    Nyumba Connect haishughulikii malipo kati ya wanafunzi na Madalali. Malipo yote (kodi, depositi, ada zingine)
                                    yanafanywa moja kwa moja kati ya mwanafunzi na Dalali/mmiliki wa nyumba.
                                </p>
                                <p>
                                    Tunapendekeza utumie njia salama za malipo na usitoe malipo kabla ya kuona chumba kwa macho yako.
                                    Nyumba Connect haiwajibikiwi kwa migogoro yoyote inayotokana na malipo kati ya watumiaji.
                                </p>
                                <p>
                                    Hata hivyo, tunaweza kutoa huduma za kuweka nafasi (booking) kwa baadhi ya vyumba vilivyothibitishwa.
                                    Katika kesi hiyo, sheria tofauti zitawekwa wazi wakati wa mchakato wa kuweka nafasi.
                                </p>
                            </TermsSection>

                            {/* Dalali Obligations */}
                            <TermsSection id="dalali-obligations" title="Wajibu wa Madalali" icon={Scale}>
                                <p>
                                    Kama Dalali au mwakala wa majengo, unawajibika kuhakikisha kwamba maelezo yote ya vyumba ni sahihi,
                                    picha ni za kweli, na bei ziko wazi kwa wanafunzi.
                                </p>
                                <p>
                                    Unatakiwa kutoa huduma bora kwa wanafunzi, kuwajibu kwa wakati, na kuhakikisha kuwa nyumba au
                                    hostel unazoweka kwenye jukwaa ziko katika hali nzuri ya kuishi.
                                </p>
                                <p>
                                    Madalali wanaweza kupokea beji ya &quot;Uthibitisho&quot; baada ya kukamilisha mchakato wa uhakiki.
                                    Beji hii inaweza kuondolewa ikiwa tutapokea malalamiko ya kutosha kuhusu huduma zako.
                                </p>
                            </TermsSection>

                            {/* Student Obligations */}
                            <TermsSection id="student-obligations" title="Wajibu wa Wanafunzi" icon={Users}>
                                <p>
                                    Kama mwanafunzi unatafuta malazi, unatakiwa kutoa taarifa zako za kweli wakati wa kufungua akaunti.
                                    Usijifanye kuwa mtu mwingine au kutoa taarifa za uwongo.
                                </p>
                                <p>
                                    Unapokutana na Dalali au kuona chumba, unapaswa kuwa mwenye adabu na kufuata muda uliopangwa.
                                    Ikiwa hutaki tena chumba fulani, tafadhali mjulishe Dalali mapema ili asubiri wanafunzi wengine.
                                </p>
                                <p>
                                    Ukiwa umehamia kwenye nyumba, unapaswa kuheshimu sheria za nyumba, kulipa kodi kwa wakati,
                                    na kuwa mwanachama mwema wa jamii iliyopo katika eneo hilo.
                                </p>
                            </TermsSection>

                            {/* Verification */}
                            <TermsSection id="verification" title="Uhakiki na Uthibitisho" icon={Shield}>
                                <p>
                                    Nyumba Connect inajitahidi kuhakikisha usalama wa watumiaji wetu. Tunafanya ukaguzi wa kimsingi
                                    kwa baadhi ya vyumba na Madalali, lakini hatuwezi kuthibitisha kila maelezo yanayowekwa kwenye jukwaa.
                                </p>
                                <p>
                                    Tunakuomba uripoti maelezo au Madalali wowote unaowashuku kuwa si wa kweli au wanaotaka kukudanganya.
                                    Timu yetu itachukua hatua haraka na ikiwa ni lazima, tunaweza kufunga akaunti ya mtu anayekiuka sheria.
                                </p>
                                <p>
                                    Hata hivyo, hatuhakikishi usalama kamili na hatuwajibikii matukio yoyote ya ulaghai yanayotokea
                                    nje ya mfumo wetu au kwa sababu ya maelezo ya uwongo ambayo hatukuweza kugundua.
                                </p>
                            </TermsSection>

                            {/* Privacy and Data */}
                            <TermsSection id="privacy-data" title="Faragha na Data" icon={Eye}>
                                <p>
                                    Tunakusanya na kuchakata taarifa zako kwa mujibu wa Sera yetu ya Faragha. Sera hiyo inaelezea
                                    jinsi tunavyotumia, kuhifadhi, na kulinda taarifa zako za kibinafsi.
                                </p>
                                <p>
                                    Kwa kutumia Nyumba Connect, unakubali mkusanyaji wa taarifa zako kama ilivyoelezwa kwenye Sera ya Faragha.
                                    Pia unakubali kupokea taarifa za kielektroniki kutoka kwetu kuhusu huduma, sasisho, na matangazo.
                                </p>
                                <p>
                                    Hatutauza au kukodisha taarifa zako za kibinafsi kwa watu wengine. Hata hivyo, tunaweza kushirikisha
                                    taarifa zako na Madalali au wamiliki wa nyumba unapowasiliana nao kupitia jukwaa letu.
                                </p>
                            </TermsSection>

                            {/* Prohibited Conduct */}
                            <TermsSection id="prohibited-conduct" title="Tabia Zisizoruhusiwa" icon={AlertCircle}>
                                <p>
                                    Huwezi kutumia Nyumba Connect kwa shughuli zisizo halali au zilizopigwa marufuku na sheria za Tanzania.
                                    Shughuli zifuatazo haziruhusiwi:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Kuwaeka maelezo ya uwongo au ya kulaghai kwenye jukwaa</li>
                                    <li>Kutumia jukwaa kwa ajili ya biashara au shughuli zisizohusiana na malazi ya wanafunzi</li>
                                    <li>Kuwatisha, kuwanyanyasa, au kuwatendea vibaya watumiaji wengine</li>
                                    <li>Kukusanya taarifa za watumiaji wengine bila idhini yao</li>
                                    <li>Kuharibu au kukera utendaji wa jukwaa letu</li>
                                    <li>Kutumia mfumo wowote wa kiotomatiki kukusanya data (scraping) bila ruhusa yetu</li>
                                </ul>
                            </TermsSection>

                            {/* Termination */}
                            <TermsSection id="termination" title="Kufunga Akaunti" icon={Clock}>
                                <p>
                                    Nyumba Connect ina haki ya kusimamisha au kufunga akaunti yako wakati wowote ikiwa unaaminiwa
                                    kukiuka Vigezo na Masharti haya au sheria za nchi.
                                </p>
                                <p>
                                    Unaweza kufunga akaunti yako kwa hiari yako wakati wowote kwa kuwasiliana na timu yetu ya usaidizi.
                                    Baada ya kufunga akaunti, hutaweza tena kufikia maelezo yako au historia ya mawasiliano yako.
                                </p>
                                <p>
                                    Kufungwa kwa akaunti hakuondoi wajibu wako wa kulipa kodi au makubaliano yoyote uliyotia saini
                                    na Dalali au mmiliki wa nyumba kabla ya kufungwa.
                                </p>
                            </TermsSection>

                            {/* Disclaimers */}
                            <TermsSection id="disclaimers" title="Makanusho" icon={Info}>
                                <p>
                                    Nyumba Connect inatolewa &quot;kama ilivyo&quot; (&quot;as is&quot;) na &quot;kama inavyopatikana&quot; (&quot;as available&quot;).
                                    Hatutozi dhamana yoyote, iwe wazi au isiyo wazi, kuhusu usahihi, kutegemewa, au upatikanaji wa jukwaa.
                                </p>
                                <p>
                                    Hatuwajibikii usahihi wa maelezo ya vyumba, tabia za Madalali, au ubora wa nyumba zinazowekwa kwenye jukwaa.
                                    Wajibu wa kufanya ukaguzi na kutathmini hatari ni wako mwenyewe.
                                </p>
                                <p>
                                    Hatuwezi kuhakikisha kwamba jukwaa litakuwa likifanya kazi bila hitilafu, kukatika, au virusi vya kompyuta.
                                    Unatumia jukwaa kwa hatari yako mwenyewe na unawajibika kwa ulinzi wa data yako.
                                </p>
                            </TermsSection>

                            {/* Limitation of Liability */}
                            <TermsSection id="limitation-liability" title="Mipaka ya Dhima" icon={AlertCircle}>
                                <p>
                                    Kwa kadri inavyoruhusiwa na sheria, Nyumba Connect, wamiliki wake, wafanyakazi, na washirika hawatawajibika
                                    kwa uharibifu wowote wa moja kwa moja, usio wa moja kwa moja, wa kubahatisha, au wa kufuata
                                    unaotokana na matumizi yako ya jukwaa au uwezo wako wa kutumia jukwaa.
                                </p>
                                <p>
                                    Hii inajumuisha, lakini sio tu, uharibifu wa faida, sifa, matumizi ya data, au gharama zingine zisizoonekana,
                                    hata kama tulifahamishwa kuhusu uwezekano wa uharibifu huo.
                                </p>
                                <p>
                                    Katika kesi yoyote, dhima yetu ya jumla kwako haitazidi kiasi ulicholipa (kama kipo) kwa kutumia huduma zetu
                                    au TZS 50,000 kama hukulipa chochote.
                                </p>
                            </TermsSection>

                            {/* Indemnification */}
                            <TermsSection id="indemnification" title="Fidia" icon={Shield}>
                                <p>
                                    Unakubali kulipa fidia na kutuokoa Nyumba Connect, wamiliki wetu, wafanyakazi, na washirika
                                    dhidi ya madai, uharibifu, hasara, na gharama (ikiwemo ada za wanasheria) zinazotokana na:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Ukiukaji wako wa Vigezo na Masharti haya</li>
                                    <li>Matumizi yako mabaya ya jukwaa letu</li>
                                    <li>Migogoro yako na watumiaji wengine (wanafunzi, Madalali, au wamiliki)</li>
                                    <li>Ukiukaji wa sheria au haki za mtu mwingine</li>
                                </ul>
                            </TermsSection>

                            {/* Modifications */}
                            <TermsSection id="modifications" title="Mabadiliko ya Sheria" icon={FileText}>
                                <p>
                                    Nyumba Connect ina haki ya kubadilisha au kusasisha Vigezo na Masharti haya wakati wowote.
                                    Tutakuweka kwenye upepo kwa kuchapisha sheria mpya kwenye ukurasa huu na kubadilisha &quot;Iliyosasishwa Mwisho&quot; hapo juu.
                                </p>
                                <p>
                                    Mabadiliko yanaanza kutumika mara baada ya kuchapishwa. Ikiwa unaendelea kutumia jukwaa letu baada ya mabadiliko,
                                    inamaanisha kuwa unakubaliana na sheria mpya. Ikiwa hukubaliani, tafadhali funga akaunti yako.
                                </p>
                                <p>
                                    Tunakuhimiza kukagua ukurasa huu mara kwa mara ili uwe na habari kuhusu mabadiliko yoyote.
                                </p>
                            </TermsSection>

                            {/* Governing Law */}
                            <TermsSection id="governing-law" title="Sheria Inayotumika" icon={Scale}>
                                <p>
                                    Vigezo na Masharti haya yanatawaliwa na Sheria za Jamhuri ya Muungano wa Tanzania.
                                    Migogoro yoyote itatuliwa katika mahakama zilizo chini ya mamlaka ya Dar es Salaam, Tanzania.
                                </p>
                                <p>
                                    Kama kuna kifungu chochote cha sheria hizi kinachochukuliwa kuwa batili au hakitumiki,
                                    vifungu vingine vitabaki kuwa na nguvu kamili.
                                </p>
                            </TermsSection>

                            {/* Contact Information */}
                            <TermsSection id="contact" title="Mawasiliano" icon={Mail}>
                                <p>
                                    Ikiwa una maswali yoyote kuhusu Vigezo na Masharti haya, tafadhali wasiliana nasi kwa njia zifuatazo:
                                </p>
                                <div className="bg-gray-50 rounded-xl p-4 space-y-2 mt-2">
                                    <p className="flex items-center gap-2">
                                        <Mail size={16} style={{ color: '#006b2c' }} />
                                        <strong>Barua Pepe:</strong> hello@nyumbaconnect.com
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Phone size={16} style={{ color: '#006b2c' }} />
                                        <strong>Simu:</strong> +255 123 456 789
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPin size={16} style={{ color: '#006b2c' }} />
                                        <strong>Anuani:</strong> Dar es Salaam, Tanzania
                                    </p>
                                </div>
                                <p className="mt-2">
                                    Tutajitahidi kukujibu ndani ya siku 3-5 za kazi.
                                </p>
                            </TermsSection>

                            {/* Acknowledgment Section */}
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="mt-8 pt-6 border-t-2 text-center"
                                style={{ borderColor: '#006b2c20' }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#7ffc9720' }}>
                                    <Award size={18} style={{ color: '#006b2c' }} />
                                    <span className="text-sm font-medium" style={{ color: '#006b2c' }}>Asante kwa kutumia Nyumba Connect!</span>
                                </div>
                                <p className="text-sm mt-4" style={{ color: '#3e4a3d' }}>
                                    Kwa kutumia Nyumba Connect, unakubali kuwa umesoma, kuelewa, na kukubaliana na Vigezo na Masharti haya.
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
                            Bado una maswali kuhusu Vigezo na Masharti?
                        </h3>
                        <p className="mb-4" style={{ color: '#3e4a3d' }}>
                            Timu yetu ya usaidizi iko tayari kukusaidia.
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