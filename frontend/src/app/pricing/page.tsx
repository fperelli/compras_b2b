import React from 'react';
import Link from 'next/link';

const PricingPage = () => {
  const plans = [
    { 
      name: 'Standard', 
      price: 'Free', 
      description: 'Foundational tools for small procurement teams.',
      features: ['3 active negotiations', 'Basic AI insights', 'Market benchmarks', 'Manual report export'],
      cta: 'Start Free',
      highlight: false
    },
    { 
      name: 'Professional', 
      price: '$49', 
      description: 'The "Intelligent Architect" for scaling operations.',
      features: ['Unlimited negotiations', 'Advanced Strategic AI', 'Real-time risk scoring', 'Counteroffer automation', 'Priority architect support'],
      cta: 'Go Pro',
      highlight: true
    },
    { 
      name: 'Enterprise', 
      price: 'Custom', 
      description: 'Maximum sovereignty for global supply chains.',
      features: ['SSO & RBAC security', 'Full API access', 'Dedicated strategist', 'Custom AI fine-tuning', 'On-premise ingestion'],
      cta: 'Contact Sales',
      highlight: false
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 py-24 px-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <header className="max-w-4xl mx-auto text-center space-y-6 mb-24">
        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Investment Hierarchy</p>
        <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9]">
          Scale your <br />
          <span className="text-primary italic">Strategic Authority.</span>
        </h1>
        <p className="text-xl text-foreground/40 max-w-xl mx-auto leading-relaxed">
          Transparent, tonal pricing for teams who value precision over volume.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`flex flex-col relative transition-all duration-500 ${
              plan.highlight 
                ? 'glass border-primary/30 shadow-[0_0_40px_rgba(173,199,247,0.1)] scale-105 z-10 rounded-3xl' 
                : 'bg-surface-container-low border border-white/5 rounded-2xl'
            } p-10 space-y-10`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[8px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Most Strategic
              </span>
            )}

            <div className="space-y-4">
               <h2 className={`text-xl font-display font-bold ${plan.highlight ? 'text-primary uppercase tracking-widest' : 'text-foreground/60'}`}>
                 {plan.name}
               </h2>
               <div className="flex items-baseline gap-1">
                 <span className="text-5xl font-display font-bold">{plan.price}</span>
                 {plan.price !== 'Custom' && <span className="text-xs text-foreground/20 font-mono uppercase tracking-widest">/mo</span>}
               </div>
               <p className="text-sm text-foreground/40 leading-relaxed italic">{plan.description}</p>
            </div>

            <ul className="flex-1 space-y-5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-4 text-sm text-foreground/60 group">
                  <span className={`mt-1 text-xs ${plan.highlight ? 'text-primary' : 'text-foreground/20'}`}>⚡</span>
                  <span className="group-hover:text-foreground transition-colors leading-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard"
              className={`w-full py-4 rounded-sm font-bold text-xs uppercase tracking-[0.2em] text-center transition-all ${
                plan.highlight 
                  ? 'bg-primary text-on-primary shadow-premium hover:scale-[1.02]' 
                  : 'bg-white/5 text-foreground hover:bg-white/10'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Tonal Comparison Teaser */}
      <footer className="mt-32 max-w-4xl mx-auto text-center space-y-8 pb-12">
         <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
         <p className="text-[10px] text-foreground/20 uppercase tracking-[0.2em] font-bold">
           "Software that pays for itself within the first quarter."
         </p>
         <div className="flex justify-center gap-12 grayscale opacity-20 hover:opacity-100 transition-opacity duration-700">
           <span className="text-2xl font-display font-bold">TechGroup</span>
           <span className="text-2xl font-display font-bold">LogisticsX</span>
           <span className="text-2xl font-display font-bold">SafeFound</span>
         </div>
      </footer>
    </div>
  );
};

export default PricingPage;
