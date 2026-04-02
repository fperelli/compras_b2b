'use client';

import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-8 overflow-hidden antialiased selection:bg-primary/30">
      {/* Background Decors: Glowing Nodes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 blur-[120px] rounded-full -z-10" />

      {/* Main Auth Card */}
      <div className="w-full max-w-[480px] z-10 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
        <div className="glass p-12 rounded-[40px] border border-white/10 shadow-2xl space-y-10 relative overflow-hidden">
          {/* Subtle Scanline Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-20 opacity-20 pointer-events-none animate-pulse" />
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary font-bold shadow-[0_0_15px_rgba(173,199,247,0.5)]">P</div>
              <span className="font-display font-bold text-2xl tracking-tighter text-foreground uppercase">Procure<span className="text-primary italic text-lg">AI</span></span>
            </div>
            <h2 className="text-xl font-display font-bold text-foreground/80 tracking-tight">Access Secure Interface</h2>
            <p className="text-xs text-foreground/30 font-mono uppercase tracking-[0.2em]">End-to-end encrypted session</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1" htmlFor="email">Identity</label>
              <div className="relative group">
                <input 
                  id="email"
                  type="email" 
                  placeholder="john.doe@enterprise.com" 
                  className="w-full py-4 px-6 bg-white/[0.03] border border-white/5 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all font-sans placeholder:text-foreground/20"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/10 group-focus-within:text-primary/40 transition-colors">👤</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest leading-none" htmlFor="password">Passkey</label>
                <button className="text-[9px] font-bold text-primary/60 hover:text-primary transition-colors tracking-tighter">RESET ACCESS</button>
              </div>
              <div className="relative group">
                <input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full py-4 px-6 bg-white/[0.03] border border-white/5 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all font-sans placeholder:text-foreground/20"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/10 group-focus-within:text-primary/40 transition-colors">🔒</span>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="block w-full py-5 bg-primary text-on-primary rounded-2xl font-bold text-xs uppercase tracking-[0.3em] text-center shadow-[0_0_20px_rgba(173,199,247,0.2)] hover:shadow-[0_0_30px_rgba(173,199,247,0.4)] hover:scale-[1.01] transition-all active:scale-[0.99]"
            >
              Initialize Console
            </Link>
          </form>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[9px] text-foreground/20 font-bold uppercase tracking-widest whitespace-nowrap px-2">Secondary Authentication</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            
            <button className="w-full py-4 border border-white/5 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-foreground/60">
               <span className="grayscale opacity-50">G</span> Sign in with SSO
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-foreground/20 font-sans tracking-tight">
          Don't have an approved identity? <Link href="/onboarding" className="text-primary/60 font-bold hover:text-primary transition-colors">Request Access Profile</Link>
        </p>
      </div>

      {/* Footer Branding */}
      <footer className="fixed bottom-8 w-full text-center hidden md:block">
        <p className="text-[10px] font-mono text-foreground/10 uppercase tracking-widest">
          Sovereignty through intelligence. Built for the Intelligent Architect.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
