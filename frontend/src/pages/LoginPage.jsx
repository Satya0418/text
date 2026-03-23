import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F3ED] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_-4px_rgba(49,56,81,0.1)] p-10 border border-[#C2CBD3]/20"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/logo.png" alt="Parseon" className="w-10 h-10 object-contain" />
          <span className="text-xl font-extrabold text-[#313851] tracking-tight">Parseon</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-[#313851] text-center mb-1">Welcome back</h1>
        <p className="text-sm text-[#313851]/60 text-center mb-8">Please enter your details to login</p>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#313851]/70 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[#C2CBD3] bg-white text-[#313851] text-sm font-medium placeholder:text-[#C2CBD3] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 focus:border-[#6366F1] transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#313851]/70 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#C2CBD3] bg-white text-[#313851] text-sm font-medium placeholder:text-[#C2CBD3] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 focus:border-[#6366F1] transition-all pr-12"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C2CBD3] hover:text-[#313851] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <div 
                onClick={() => setRemember(!remember)}
                className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all ${remember ? 'bg-[#6366F1] border-[#6366F1]' : 'border-[#C2CBD3]'}`}
                style={{ width: 18, height: 18 }}
              >
                {remember && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </div>
              <span className="text-xs font-medium text-[#313851]/70">Remember me</span>
            </label>
            <a href="#" className="text-xs font-semibold text-[#6366F1] hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.01, boxShadow: '0 6px 20px -4px rgba(99, 102, 241, 0.35)' }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-3 bg-[#6366F1] text-white font-bold text-sm rounded-xl hover:bg-[#5558E6] transition-colors shadow-md"
          >
            Log in
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#C2CBD3]/40"></div>
          <span className="text-xs font-semibold text-[#313851]/40 uppercase">Or</span>
          <div className="flex-1 h-px bg-[#C2CBD3]/40"></div>
        </div>

        {/* Social Logins */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#C2CBD3]/60 rounded-xl text-sm font-semibold text-[#313851] hover:bg-[#F6F3ED] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
            Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#C2CBD3]/60 rounded-xl text-sm font-semibold text-[#313851] hover:bg-[#F6F3ED] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#313851"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Apple
          </motion.button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#313851]/60 mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-[#6366F1] hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
