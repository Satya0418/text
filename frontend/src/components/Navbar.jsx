import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#F6F3ED]/80 backdrop-blur-md border-b border-[#C2CBD3]/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Parseon Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
          <span className="font-extrabold text-xl tracking-tight text-[#313851]">Parseon</span>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm font-semibold text-[#313851] hover:text-[#6366F1] transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium text-[#313851]/70 hover:text-[#6366F1] transition-colors">Docs</a>
          {/* Profile Avatar */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-md"
          >
            S
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
