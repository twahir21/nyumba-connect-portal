'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb] px-4">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Sehemu ya Namba na Ujumbe (Zimetenganishwa vizuri sasa) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-1"
        >
          {/* 404 ikiwa juu na yenye uzito mkubwa zaidi wa rangi */}
          <h1 
            className="text-9xl font-black tracking-tight select-none opacity-30 leading-none"
            style={{ color: '#006b2c' }}
          >
            404
          </h1>
          {/* Ukurasa Haupatikani ikiwa chini */}
          <p 
            className="text-2xl font-bold tracking-wide"
            style={{ color: '#006b2c' }}
          >
            Ukurasa Haupatikani
          </p>
        </motion.div>

        {/* Ujumbe kwa Mtumiaji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-semibold text-[#191c1e]">
            Samahani, tumepoteana kidogo!
          </h2>
          <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            Kiunganishi unachojaribu kukifungua huenda kimefutwa, kimebadilishwa jina, au hakipo kabisa duniani.
          </p>
        </motion.div>

        {/* Vitufe vya Kurudi Nyuma / Nyumbani */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          {/* Kitufe cha kurudi nyuma kwenye Kivinjari */}
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-full font-medium text-sm border flex items-center justify-center gap-2 transition-all bg-white text-gray-700 hover:bg-gray-50 border-gray-200 shadow-sm"
          >
            <ArrowLeft size={16} />
            Rudi Nyuma
          </button>

          {/* Kitufe cha Kwenda Nyumbani */}
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl text-white"
            style={{ backgroundColor: '#006b2c' }}
          >
            <Home size={16} />
            Mwanzo (Home)
          </Link>
        </motion.div>

      </div>
    </div>
  );
}