import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const { setScreen, setAuthenticated } = useAppStore();
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
    setScreen('Home');
  };
  return (
    <div className="w-full h-full bg-brand-dark flex flex-col px-6 pt-20 relative overflow-y-auto hide-scrollbar">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-brand-red/10 to-transparent pointer-events-none"></div>

      <div className="mb-10">
        <div className="w-12 h-12 bg-brand-red/20 rounded-xl flex items-center justify-center mb-6">
          <Shield className="text-brand-red" size={24} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {isLogin ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="text-white/50">
          {isLogin ?
          'Enter your details to access your safety dashboard.' :
          'Join AstraSafe to protect yourself and your loved ones.'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="flex flex-col gap-4">
        {!isLogin &&
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={20} className="text-white/40" />
            </div>
            <input
            type="text"
            placeholder="Full Name"
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all"
            required />
          
          </div>
        }

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail size={20} className="text-white/40" />
          </div>
          <input
            id="input-email"
            type="email"
            placeholder="Email Address"
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all"
            required
            defaultValue="sarah@example.com" />
          
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock size={20} className="text-white/40" />
          </div>
          <input
            id="input-password"
            type="password"
            placeholder="Password"
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all"
            required
            defaultValue="password123" />
          
        </div>

        {isLogin &&
        <div className="flex justify-end">
            <button
            id="btn-forgot-password"
            type="button"
            className="text-sm text-brand-red font-medium">
            
              Forgot password?
            </button>
          </div>
        }

        <button
          id="btn-auth-submit"
          type="submit"
          className="w-full h-14 bg-brand-red hover:bg-brand-redDark text-white rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 mt-4 transition-colors shadow-[0_4px_20px_rgba(255,45,85,0.4)]">
          
          {isLogin ? 'Sign In' : 'Sign Up'}
          <ArrowRight size={20} />
        </button>
      </form>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-white/40 text-sm">or continue with</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <button
        id="btn-google-auth"
        type="button"
        className="w-full h-14 bg-white text-black rounded-2xl font-semibold text-base flex items-center justify-center gap-3 mt-8 active:scale-95 transition-transform">
        
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          
        </svg>
        Google
      </button>

      <div className="mt-auto pb-10 pt-8 text-center">
        <p className="text-white/50 text-sm">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            id="btn-toggle-auth"
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-red font-medium hover:underline">
            
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>);

}