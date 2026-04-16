"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';

export default function NegotiationsPage() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [negotiations, setNegotiations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const filterLabels: Record<string, string> = {
    All: lang === 'es' ? 'Todos' : 'All',
    'In Progress': lang === 'es' ? 'En Progreso' : 'In Progress',
    Approving: lang === 'es' ? 'En Aprobación' : 'Approving',
    Completed: lang === 'es' ? 'Completado' : 'Completed',
  };

  useEffect(() => {
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
  }, []);

  const filteredNegotiations = filter === 'All' 
    ? negotiations 
    : negotiations.filter(n => (n.status || n.stage) === filter);

  return (
    <div className="p-10 space-y-12 max-w-[1600px] mx-auto min-h-full">
      {/* Header */}
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{lang === 'es' ? 'Operaciones' : 'Operations'}</p>
          <h1 className="text-4xl font-display font-bold tracking-tight">{t('negotiations.title')}</h1>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-primary/20 text-primary rounded-sm font-bold text-sm hover:bg-primary/10 transition-all">
            {t('common.export')}
          </button>
          <button className="px-6 py-3 bg-primary text-on-primary rounded-sm font-bold text-sm hover:scale-[1.02] shadow-premium transition-all active:scale-[0.98]">
            + {t('negotiations.new')}
          </button>
        </div>
      </header>

      {/* Grid Layout: Visual Filters & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left column: Filters & AI Insight */}
        <div className="space-y-8">
          <div className="surface-card p-6 space-y-4">
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest border-b border-white/5 pb-4">{lang === 'es' ? 'Vistas' : 'Views'}</h3>
            <div className="space-y-2">
              {(['All', 'In Progress', 'Approving', 'Completed'] as const).map(status => (
                <button 
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`w-full text-left px-4 py-2 text-sm font-medium rounded-sm flex justify-between items-center transition-all ${
                    filter === status 
                      ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                      : 'text-foreground/60 hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  {filterLabels[status]}
                  {status === 'All' && <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded">{negotiations.length}</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 flex gap-4 flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/10 rounded-full blur-2xl" />
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary text-sm">⚠️</div>
               <span className="text-xs font-bold text-tertiary uppercase tracking-widest">{lang === 'es' ? 'Alerta de Riesgo' : 'Risk Alert'}</span>
             </div>
             <p className="text-sm text-foreground/70 leading-relaxed relative z-10">
               {lang === 'es'
                 ? <>3 negociaciones tienen riesgo de proveedor por encima del nivel <span className="text-tertiary font-bold">aceptable</span>. La IA recomienda intervención inmediata.</>
                 : <>3 ongoing negotiations have supplier risk above <span className="text-tertiary font-bold">acceptable level</span>. AI recommends immediate intervention.</>
               }
             </p>
          </div>
        </div>

        {/* Right column: Main Table */}
        <div className="lg:col-span-3">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-premium border border-white/5">
            <div className="overflow-x-auto min-h-[500px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02]">
                    <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{lang === 'es' ? 'Código' : 'Code'}</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{lang === 'es' ? 'Entidad y Categoría' : 'Entity & Focus'}</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{t('negotiations.fields.status')}</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{lang === 'es' ? 'Ahorro Objetivo' : 'Target Saving'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-6 text-center text-foreground/40 text-sm">{t('common.loading')}</td>
                    </tr>
                  ) : filteredNegotiations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-16 text-center text-foreground/40 space-y-4">
                        <p className="text-lg">{t('negotiations.empty')}</p>
                      </td>
                    </tr>
                  ) : filteredNegotiations.map((neg) => (
                    <tr 
                      key={neg.id} 
                      onClick={() => router.push(`/negotiations/${neg.id}`)}
                      className="hover:bg-primary/[0.02] transition-colors cursor-pointer group"
                    >
                      <td className="px-8 py-6 text-xs font-mono text-primary font-bold">{neg.id}</td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{neg.supplier}</span>
                          <span className="text-[10px] text-foreground/40 uppercase tracking-tight">{neg.category} • {neg.risk || 'Low'} Risk</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.05] text-[10px] font-bold rounded-full border border-white/5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            (neg.status || neg.stage) === 'Approving' ? 'bg-secondary animate-pulse' 
                            : (neg.status || neg.stage) === 'Completed' ? 'bg-green-500' 
                            : 'bg-primary'
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
          </div>
        </div>

      </div>
    </div>
  );
}
