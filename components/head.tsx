'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links mpya zilizosasishwa kwa Kiswahili na njia zake (paths)
  const navLinks = [
    { name: 'Nyumbani', path: '/' },
    { name: 'Wasiliana Nasi', path: '/contact' },
    { name: 'Kuhusu Sisi', path: '/about' },
    { name: 'Vigezo na Masharti', path: '/terms' },
    { name: 'Sera ya Faragha', path: '/privacy' }
  ];

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
          <Link href="/" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Image
                src="/logo.png"
                alt="Nembo ya Nyumba Connect"
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
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.path}
                href={link.path}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: '#191c1e' }}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-xl"
              style={{ backgroundColor: '#006b2c', color: '#ffffff' }}
            >
              Anza Sasa
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
              key={link.path}
              href={link.path}
              className="block py-2 text-base font-medium transition-colors hover:opacity-70"
              style={{ color: '#191c1e' }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            className="w-full px-5 py-2 rounded-full font-semibold transition-all"
            style={{ backgroundColor: '#006b2c', color: '#ffffff' }}
          >
            Anza Sasa
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
};