"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const [stats, setStats] = useState<any[]>([]);
  const [negotiations, setNegotiations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch negotiations
    fetch('/api/negotiations')
      .then(res => res.json())
      .then(data => {
        setNegotiations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching negotiations:', err);
        setLoading(false);
      });

    // Fetch analytics KPIs for dashboard header
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if(data && data.kpis) {
           // Mapping analytics data to the shapes the dashboard expects
           const mappedStats = data.kpis.map((kpi: any) => ({
              label: kpi.metric,
              value: kpi.value,
              trend: kpi.target, // using target as a trend mock
              color: kpi.color
           }));
           setStats(mappedStats);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-10 space-y-12 max-w-[1600px] mx-auto min-h-full">
      {/* Editorial Header */}
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Operational Overview</p>
          <h1 className="text-4xl font-display font-bold tracking-tight">Procurement Console</h1>
        </div>
        <button className="px-6 py-3 bg-primary text-on-primary rounded-sm font-bold text-sm hover:scale-[1.02] shadow-premium transition-all active:scale-[0.98]">
          + New Purchase Request
        </button>
      </header>

      {/* KPI Stats: Tonal Layering Illustration */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="surface-card p-8 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
            
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-4">{stat.label}</p>
            <div className="flex justify-between items-end relative z-10">
              <span className="text-4xl font-display font-bold">{stat.value}</span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                stat.color === 'error' 
                  ? 'bg-error/10 text-error border-error/20' 
                  : 'bg-primary/10 text-primary border-primary/20'
              }`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Negotiations: No-Line Table Experience */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display font-bold tracking-tight">Active Negotiations</h2>
          <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View Deep Analytics</button>
        </div>
        
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-premium border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Code</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Entity</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-6 text-center text-foreground/40 text-sm">Loading operations...</td>
                  </tr>
                ) : negotiations.map((neg) => (
                  <tr 
                    key={neg.id} 
                    onClick={() => router.push(`/negotiations/${neg.id}`)}
                    className="hover:bg-primary/[0.02] transition-colors cursor-pointer group"
                  >
                    <td className="px-8 py-6 text-xs font-mono text-primary font-bold">{neg.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{neg.supplier}</span>
                        <span className="text-[10px] text-foreground/40 uppercase tracking-tight">{neg.risk || 'Low'} Risk Profile</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs text-foreground/60">{neg.category}</td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.05] text-[10px] font-bold rounded-full border border-white/5">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          neg.status === 'Approving' ? 'bg-secondary animate-pulse' : 'bg-primary'
                        }`} />
                        {neg.status || neg.stage || 'In Progress'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-display font-bold text-secondary">+{neg.saving || '0%'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-white/[0.01] border-t border-white/5 text-center">
             <button className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.15em] hover:text-foreground transition-colors tracking-widest">Show all historical records</button>
          </div>
        </div>
      </section>

      {/* AI Assistant Insight (Sample Glassmorphism) */}
      <div className="glass p-8 rounded-2xl border border-white/5 shadow-premium flex gap-8 items-center max-w-4xl">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl animate-pulse">🤖</div>
        <div className="space-y-2 flex-1">
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Tactical Insight</h4>
          <p className="text-sm text-foreground/80 leading-relaxed italic">
            "We've detected a significant drop in microchip benchmarks (-4.2%). I recommend accelerating the 'NEG-001' counteroffer to secure current availability at the new market rate."
          </p>
        </div>
        <button className="px-4 py-2 border border-primary/30 text-primary text-[10px] font-bold rounded hover:bg-primary/10 transition-all uppercase tracking-widest">Review Strategy</button>
      </div>
    </div>
  );
};

export default DashboardPage;
