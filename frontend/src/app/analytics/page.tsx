"use client";
import React, { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState<{ kpis?: any[], chartData?: number[], opportunities?: any[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching analytics:', err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-10 space-y-12 max-w-[1600px] mx-auto min-h-full">
      {/* Header */}
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Intelligence</p>
          <h1 className="text-4xl font-display font-bold tracking-tight">Analytics Console</h1>
        </div>
        <div className="flex bg-surface-container rounded-sm p-1 border border-white/5">
          {['1W', '1M', '1Q', 'YTD'].map(period => (
            <button key={period} className={`px-4 py-2 text-xs font-bold rounded-sm ${period === 'YTD' ? 'bg-white/10 text-foreground' : 'text-foreground/40 hover:text-foreground'}`}>
              {period}
            </button>
          ))}
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
           <div className="col-span-full text-center text-foreground/50 py-10">Loading Intelligence...</div>
        ) : (data.kpis || []).map((item: any, idx: number) => (
          <div key={idx} className="surface-card p-6 border border-white/5 relative overflow-hidden group">
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20 blur-[40px] bg-${item.color}`} />
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-4">{item.metric}</p>
            <div className="flex items-end justify-between relative z-10">
              <span className="text-4xl font-display font-bold">{item.value}</span>
              <span className="text-xs text-foreground/40 font-mono flex items-center gap-1">
                Target: {item.target}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area Mock */}
        <div className="lg:col-span-2 glass rounded-2xl p-8 border border-white/5 shadow-premium flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70">Performance vs Benchmarks over time</h3>
            <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider font-bold">Node Model 04</span>
          </div>
          <div className="flex-1 bg-surface-container-lowest/50 rounded-xl border border-white/5 flex items-end px-8 py-4 gap-4 min-h-[300px]">
            {/* Extremely simple CSS mock chart */}
            {(data.chartData || []).map((height: number, i: number) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 relative group cursor-crosshair">
                <div 
                  className="w-full bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-sm opacity-60 group-hover:opacity-100 transition-all origin-bottom"
                  style={{ height: `${height}%` }}
                />
                <div 
                  className="absolute w-full border-t border-secondary/50"
                  style={{ bottom: `${height + 5}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Suggestions */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 pl-2">AI Value Opportunities</h3>
          <div className="space-y-4">
            {(data.opportunities || []).map((opp: any, i: number) => (
              <div key={i} className={`surface-card p-6 border-l-4 border-l-${opp.color}`}>
                <h4 className={`text-xs font-bold text-${opp.color} uppercase tracking-widest mb-2`}>{opp.category}</h4>
                <p className="text-sm text-foreground/60">{opp.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
