import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30">
      {/* Editorial Header / Navigation Placeholder */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary font-bold">P</div>
          <span className="font-display font-bold text-xl tracking-tight">ProcureAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/60">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/dashboard" className="px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-all">Sign In</Link>
        </div>
      </nav>

      {/* Hero Section: The "Editorial Hero" */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Intelligence v2.0 is live
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
              The Art of <br />
              <span className="text-primary italic">Precision</span> Negotiation.
            </h1>
            
            <p className="text-xl text-foreground/60 max-w-lg leading-relaxed font-sans">
              Moving procurement beyond data entry. We provide the "Intelligent Architect" for your supply chain—transforming raw benchmarks into tactical authority.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/dashboard" 
                className="group px-8 py-4 bg-primary text-on-primary rounded-sm font-bold text-lg hover:shadow-premium transition-all flex items-center justify-center gap-2"
              >
                Access Platform 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                href="#features" 
                className="px-8 py-4 border border-outline/30 rounded-sm font-bold text-lg hover:bg-white/5 transition-all text-center"
              >
                Explore Methodology
              </Link>
            </div>
          </div>

          {/* Decorative Visual: Glassmorphism Insight Card */}
          <div className="relative hidden lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
            <div className="glass p-8 rounded-2xl relative border border-white/10 shadow-2xl space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Live Strategy Analysis</span>
                <span className="text-[10px] text-foreground/40 font-mono">NODE_AGENT_04</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                <div className="h-2 w-1/2 bg-white/5 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="surface-card p-4 rounded-xl">
                  <span className="text-[10px] text-foreground/40 block mb-1">Target Savings</span>
                  <span className="text-xl font-display font-bold text-secondary">14.2%</span>
                </div>
                <div className="surface-card p-4 rounded-xl">
                  <span className="text-[10px] text-foreground/40 block mb-1">Risk Profile</span>
                  <span className="text-xl font-display font-bold text-tertiary">Low</span>
                </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-sans italic text-primary/80">
                  "Recommendation: Shift to a collaborative strategy. Supplier relationship score is high (8.4/10)."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features: The "No-Line" Hierarchy */}
      <section id="features" className="py-24 bg-surface-container-low px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold tracking-tight">Beyond Dashboards.</h2>
            <p className="text-foreground/40 max-w-xl mx-auto">We use tonal depth and asymmetric clarity to turn complex supply chain data into an editorial narrative.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="surface-card p-8 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-xl font-bold mb-3">Data Sovereignty</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Connect your historical contracts and market benchmarks. We provide the context, you keep the control.
              </p>
            </div>
            <div className="surface-card p-8 group border border-primary/20">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-2xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold mb-3">Flash Response</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Respond to counteroffers in seconds with AI-generated templates that respect your exact budget constraints.
              </p>
            </div>
            <div className="surface-card p-8 group">
              <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary text-2xl mb-6 group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Risk-Aware Logics</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Automatically detect legal and operational vulnerabilities before they reach the negotiation table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Footer */}
      <footer className="py-16 bg-background px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale-0 opacity-80">
            <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center text-background font-bold text-[10px]">P</div>
            <span className="font-display font-bold text-sm tracking-widest uppercase">ProcureAI</span>
          </div>
          <p className="text-xs text-foreground/20 font-mono italic">
            "Design for the ones who decide." — The Intelligent Architect
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-wider text-foreground/40">
            <Link href="#" className="hover:text-primary">Legal</Link>
            <Link href="#" className="hover:text-primary">Security</Link>
            <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
