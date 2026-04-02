import React from 'react';
import Link from 'next/link';

const SuppliersPage = () => {
  const providers = [
    { name: 'TechCorp Argentina', category: 'Hardware', risk: 'Low', status: 'Active', spend: 'USD 450k', rating: '4.8/5', alert: 'Market favorite' },
    { name: 'Global Logistics', category: 'Shipping', risk: 'Medium', status: 'Reviewing', spend: 'USD 120k', rating: '4.2/5', alert: null },
    { name: 'OfficeMax Supply', category: 'Furniture', risk: 'Low', status: 'Active', spend: 'USD 85k', rating: '4.5/5', alert: null },
    { name: 'EcoPower Solutions', category: 'Energy', risk: 'High', status: 'Pending', spend: 'USD 210k', rating: '3.9/5', alert: 'Renewal due' },
    { name: 'SaaS Connect', category: 'Software', risk: 'Low', status: 'Active', spend: 'USD 300k', rating: '4.9/5', alert: 'Strategic partner' },
  ];

  return (
    <div className="p-10 space-y-12 max-w-[1600px] mx-auto min-h-full">
      {/* Editorial Header */}
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Partner Ecosystem</p>
          <h1 className="text-4xl font-display font-bold tracking-tight">Suppliers Directory</h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search entities..." 
              className="w-64 py-2.5 pl-10 pr-4 bg-white/[0.03] border border-white/5 rounded-sm text-xs focus:outline-none focus:border-primary/30 transition-all font-sans"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 text-sm">🔍</span>
          </div>
          <button className="px-6 py-2.5 bg-primary text-on-primary rounded-sm font-bold text-xs uppercase tracking-widest hover:shadow-premium transition-all">
            + Onboard Entity
          </button>
        </div>
      </header>

      {/* Tonal Stats Layer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="surface-card p-6 border border-white/5">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Total Suppliers</p>
          <p className="text-2xl font-display font-bold">142</p>
        </div>
        <div className="surface-card p-6 border border-white/5">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Strategic Partners</p>
          <p className="text-2xl font-display font-bold text-primary">12</p>
        </div>
        <div className="surface-card p-6 border border-white/5">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Avg. Risk Score</p>
          <p className="text-2xl font-display font-bold text-secondary">Low</p>
        </div>
        <div className="surface-card p-6 border border-white/5">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Renewal Pending</p>
          <p className="text-2xl font-display font-bold text-tertiary">08</p>
        </div>
      </div>

      {/* Directory Table: No-Line Editorial Style */}
      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-premium border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Entity Name</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Classification</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Stability</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Annual Flow</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {providers.map((p) => (
                <tr key={p.name} className="hover:bg-primary/[0.02] transition-colors cursor-pointer group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{p.name}</span>
                      {p.alert && <span className="text-[9px] text-primary/60 font-bold uppercase tracking-tighter mt-1 italic">{p.alert}</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs text-foreground/60">{p.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5 ${
                      p.risk === 'Low' ? 'bg-secondary/5 text-secondary' : p.risk === 'Medium' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        p.risk === 'Low' ? 'bg-secondary' : p.risk === 'Medium' ? 'bg-tertiary' : 'bg-error animate-pulse'
                      }`} />
                      {p.risk} Risk
                    </span>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground">{p.spend}</span>
                        <span className="text-[10px] text-foreground/20 leading-none">{p.status}</span>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <span className="text-sm font-display font-bold text-primary">{p.rating}</span>
                       <div className="flex-1 w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${parseFloat(p.rating) * 20}%` }}
                          />
                       </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 bg-white/[0.01] border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em]">
           <span>Showing 1-5 of 142 historical entities</span>
           <div className="flex gap-4">
              <button className="hover:text-primary transition-colors cursor-pointer">Previous</button>
              <button className="hover:text-primary transition-colors cursor-pointer">Next Record</button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default SuppliersPage;
