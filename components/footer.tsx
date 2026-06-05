'use client';
import { Mail, MapPin,  PhoneCall, Smartphone } from "lucide-react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { PHONE_TEXT } from "@/tools/url.const";
import Link from "next/link";


// Footer
export const Footer = () => {
  return (
    <footer className="py-12" style={{ backgroundColor: '#191c1e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Nembo ya Nyumba Connect"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-bold text-xl" style={{ color: '#ffffff' }}>Nyumba Connect</span>
            </div>
            <p className="text-sm opacity-70" style={{ color: '#eff1f3' }}>
              Jukwaa la kisasa la kidijitali la majengo na malazi ya wanafunzi linalowaunganisha wapangaji na Madalali pamoja na wamiliki wa nyumba.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Viungo vya Haraka</h4>
            <ul className="space-y-2 text-sm opacity-70" style={{ color: '#eff1f3' }}>
              <li><Link href="/" className="hover:opacity-100 transition">Nyumbani</Link></li>
              <li><Link href="/contact" className="hover:opacity-100 transition">Wasiliana Nasi</Link></li>
              <li><Link href="/about" className="hover:opacity-100 transition">Kuhusu Sisi</Link></li>
              <li><Link href="/terms" className="hover:opacity-100 transition">Vigezo na Masharti</Link></li>
              <li><Link href="/privacy" className="hover:opacity-100 transition">Sera ya Faragha</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Mawasiliano</h4>
            <ul className="space-y-2 text-sm opacity-70" style={{ color: '#eff1f3' }}>
              <li className="flex items-center gap-2"><Mail size={14} /> huduma@nyumba-connect.co.tz</li>
              <li className="flex items-center gap-2"><PhoneCall size={14} /> {PHONE_TEXT} </li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Dar es Salaam, Tanzania</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Pakua App</h4>
            <div className="space-y-2">
              <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur w-full">
                <Smartphone size={18} style={{ color: '#62df7d' }} />
                <span className="text-sm" style={{ color: '#ffffff' }}>Inakuja Karibuni kwenye Android</span>
              </motion.button>
            </div>
          </div>
        </div>
        <div className="pt-8 text-center text-sm opacity-60" style={{ color: '#eff1f3' }}>
          <p>&copy; 2026 Nyumba Connect. Haki zote zimehifadhiwa. Imeundwa kwa ajili ya wanafunzi na Madalali nchini Tanzania.</p>
        </div>
      </div>
    </footer>
  );
};