"use client";
import React, { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';

const NegotiationDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: paramsId } = use(params);
  const { t, lang } = useTranslation();
  const [activeTab, setActiveTab] = useState('strategy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiData, setAiData] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [negotiation, setNegotiation] = useState<any>(null);

  const fetchNegotiationDetails = async () => {
    try {
      const res = await fetch(`/api/negotiations?id=${paramsId}`);
      if (res.ok) {
        const data = await res.json();
        setNegotiation({
          id: data.id,
          supplier: data.supplier,
          category: data.category,
          volume: data.volume,
          targetPrice: data.target_price,
          maxPrice: data.max_price,
          currentOffer: data.target_price + 50,
          lastSupplierResponse: data.max_price + 20,
          status: data.status
        });
      } else {
        throw new Error('Case not found');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(lang === 'es' ? 'Negociación no encontrada en la base de datos.' : 'Negotiation case not found in database.');
    }
  };

  useEffect(() => { if (paramsId) fetchNegotiationDetails(); }, [paramsId]);

  const parseAIOutput = (text: string) => {
    const sections: any = {};
    const lines = text.split('\n');
    let currentSection = '';

    lines.forEach(line => {
      if (line.match(/^\d\./) || line.includes('###') || line.match(/^[A-ZÁÉÍÓÚÑ\s]+$/)) {
        currentSection = line.toLowerCase();
      }
      if (currentSection.includes('hacks') || currentSection.includes('táctic') || currentSection.includes('tactic')) {
        sections.hacks = (sections.hacks || '') + line + '\n';
      } else if (currentSection.includes('narrativa') || currentSection.includes('narrative') || currentSection.includes('análisis') || currentSection.includes('analysis') || currentSection.includes('contexto')) {
        sections.narrative = (sections.narrative || '') + line + '\n';
      } else if (currentSection.includes('riesgo') || currentSection.includes('risk')) {
        sections.risks = (sections.risks || '') + line + '\n';
      } else if (currentSection.includes('mensaje') || currentSection.includes('message') || currentSection.includes('borrador') || currentSection.includes('draft') || currentSection.includes('propuesta')) {
        sections.message = (sections.message || '') + line + '\n';
      } else if (currentSection.includes('precio') || currentSection.includes('price') || currentSection.includes('oferta') || currentSection.includes('offer')) {
        sections.pricing = (sections.pricing || '') + line + '\n';
      }
    });

    return {
      hacks:    sections.hacks?.replace(/.*###.*\n|.*\d\..*\n/g, '').trim() || (lang === 'es' ? 'Identificando palancas...' : 'Identifying leverage...'),
      narrative: sections.narrative?.replace(/.*###.*\n|.*\d\..*\n/g, '').trim() || (lang === 'es' ? 'Analizando posición estratégica...' : 'Analyzing strategic position...'),
      risks:    sections.risks?.split('\n').filter((l: string) => l.startsWith('-') || l.match(/^\d\./)).map((l: string) => l.replace(/^-|\d\./, '').trim()) || [],
      message:  sections.message?.replace(/.*###.*\n|.*\d\..*\n/g, '').trim() || (lang === 'es' ? 'Generando borrador...' : 'Awaiting draft...'),
      pricing:  sections.pricing?.trim() || 'USD 890 (Recommended)'
    };
  };

  const triggerAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/negotiations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: negotiation.id,
          supplier: negotiation.supplier,
          category: negotiation.category,
          volume: negotiation.volume,
          target_price: negotiation.targetPrice,
          max_price: negotiation.maxPrice
        })
      });

      if (res.ok) {
        const data = await res.json();
        const parsed = parseAIOutput(data.ai_output);
        setAiData(parsed);
        setChatHistory([{
          role: 'assistant',
          content: t('architect.greeting')
            .replace('{{supplier}}', negotiation.supplier)
            .replace('{{pricing}}', parsed.pricing)
        }]);
      } else {
        throw new Error('Intelligence server unreachable');
      }
    } catch (err) {
      console.error('Failed to fetch AI analysis:', err);
      setError(lang === 'es' ? 'Motor de estrategia fuera de línea. Verifique la conectividad del backend.' : 'Strategy engine offline. Check backend connectivity.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (negotiation) triggerAnalysis(); }, [negotiation?.id]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory, isChatLoading]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);
    setActiveTab('chat');

    try {
      const res = await fetch('/api/negotiations/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: negotiation.id,
          history: [...chatHistory, userMsg]
        })
      });

      if (res.ok) {
        const data = await res.json();
        setChatHistory(prev => [...prev, { role: 'assistant', content: data.output }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'assistant', content: t('architect.errorResponse') }]);
      }
    } catch {
      setChatHistory(prev => [...prev, { role: 'assistant', content: lang === 'es' ? 'Conexión perdida con el arquitecto.' : 'Connection to architect lost.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const res = await fetch('/api/negotiations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: negotiation.id, status: 'Completed' })
      });
      if (res.ok) {
        setNegotiation((prev: any) => ({ ...prev, status: 'Completed' }));
        setTimeout(() => router.push('/negotiations'), 2000);
      } else throw new Error('Failed to approve');
    } catch {
      setIsApproving(false);
      alert(lang === 'es' ? '❌ Error al aprobar la oferta.' : '❌ Failed to submit approval.');
    }
  };

  const history = [
    {
      date: '2026-03-28 10:45',
      author: lang === 'es' ? 'Agente IA' : 'AI Agent',
      type: lang === 'es' ? 'Oferta Inicial' : 'Initial Offer',
      value: 'USD 800',
      note: lang === 'es' ? 'Basado en precio objetivo' : 'Based on target price'
    },
    {
      date: '2026-03-29 09:12',
      author: negotiation?.supplier || 'Proveedor',
      type: lang === 'es' ? 'Contraoferta' : 'Counter-offer',
      value: 'USD 920',
      note: lang === 'es' ? 'Problemas de disponibilidad de stock' : 'Stock availability issues'
    },
    {
      date: lang === 'es' ? 'Ahora' : 'Just now',
      author: lang === 'es' ? 'Agente IA' : 'AI Agent',
      type: lang === 'es' ? 'Revisión Estratégica' : 'Strategic Review',
      value: '--',
      note: error
        ? (lang === 'es' ? 'Conectividad del motor perdida.' : 'Engine connectivity lost.')
        : (aiData?.narrative?.substring(0, 100) + '...' || (lang === 'es' ? 'Ejecutando análisis profundo...' : 'Running deep analysis...'))
    },
  ];

  return (
    <div className="flex h-screen bg-surface-container-low overflow-hidden relative">
      {/* Toast Approval */}
      {negotiation?.status === 'Completed' && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="bg-primary text-on-primary px-8 py-4 rounded-full shadow-premium flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
            <p className="font-bold text-sm tracking-wide">
              {t('negotiationDetail.offerApproved').replace('{{supplier}}', negotiation?.supplier || '')}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12">
        {!negotiation && !error ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-foreground/40 font-mono">{t('negotiationDetail.loadingCore')}</div>
          </div>
        ) : error && !negotiation ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="text-error text-4xl">!</div>
            <p className="text-foreground/60 font-sans">{error}</p>
            <Link href="/dashboard" className="px-6 py-2 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/5">
              {t('common.backToDashboard')}
            </Link>
          </div>
        ) : negotiation ? (
          <>
            {/* Header */}
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${
                    error ? 'bg-error/10 text-error border-error/20' : 'bg-primary/10 text-primary border-primary/20'
                  }`}>
                    {error ? t('negotiationDetail.systemFault') : t('negotiationDetail.liveCase')}
                  </span>
                  <span className="text-foreground/40 text-[10px] font-mono">{negotiation.id}</span>
                </div>
                <h1 className="text-5xl font-display font-bold tracking-tighter">{negotiation.supplier}</h1>
                <p className="text-foreground/40 text-sm font-sans">
                  {t('negotiations.fields.category')}: <span className="text-foreground font-medium">{negotiation.category}</span> •{' '}
                  {t('negotiations.fields.volume')}: <span className="text-foreground font-medium">{negotiation.volume} {lang === 'es' ? 'unidades' : 'units'}</span>
                </p>
              </div>

              <div className="flex gap-4 mb-1">
                <button className="px-6 py-3 border border-outline/20 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                  {t('negotiationDetail.editSpecs')}
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isApproving || negotiation?.status === 'Completed'}
                  className="px-6 py-3 bg-primary text-on-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-premium transition-all disabled:opacity-50"
                >
                  {isApproving ? t('negotiationDetail.approving') : negotiation?.status === 'Completed' ? t('negotiationDetail.approved') : t('negotiationDetail.approveResponse')}
                </button>
              </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="surface-card p-6 bg-surface-container-lowest border border-white/5">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">{t('negotiationDetail.targetPrice')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold text-secondary">${negotiation.targetPrice}</span>
                  <span className="text-[10px] text-foreground/30 italic">{lang === 'es' ? 'Objetivo' : 'Target'}</span>
                </div>
              </div>
              <div className="surface-card p-6 bg-surface-container-lowest border border-white/5">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">{t('negotiationDetail.maxLimit')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold text-tertiary">${negotiation.maxPrice}</span>
                  <span className="text-[10px] text-foreground/30 italic">{lang === 'es' ? 'Límite' : 'Cap'}</span>
                </div>
              </div>
              <div className="surface-card p-6 bg-surface-container-lowest border border-white/5">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">{t('negotiationDetail.negotiationStatus')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold">
                    {error ? t('negotiationDetail.maintenance') : loading ? t('negotiationDetail.analyzing') : (lang === 'es' ? 'Activa' : 'Active')}
                  </span>
                  <span className={`text-[10px] italic ${error ? 'text-error/60' : 'text-foreground/30'}`}>
                    {error ? t('negotiationDetail.engineOffline') : t('negotiationDetail.engineOnline')}
                  </span>
                </div>
              </div>
            </div>

            {/* Audit Trail */}
            <section className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-display font-bold">{t('negotiationDetail.auditTrail')}</h2>
                <div className="h-px flex-1 bg-white/5 mx-8" />
              </div>
              <div className="space-y-8 pl-4">
                {history.map((item, idx) => (
                  <div key={idx} className="flex gap-12 relative group">
                    {idx < history.length - 1 && <div className="absolute left-[3px] top-6 bottom-[-32px] w-[1px] bg-white/5" />}
                    <div className={`mt-2 w-[7px] h-[7px] rounded-full ring-4 ring-background ${
                      item.author === (lang === 'es' ? 'Agente IA' : 'AI Agent') ? 'bg-primary' : 'bg-foreground/20'
                    }`} />
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          item.author === (lang === 'es' ? 'Agente IA' : 'AI Agent') ? 'text-primary' : 'text-foreground/40'
                        }`}>{item.author}</span>
                        <span className="text-[10px] font-mono text-foreground/20">{item.date}</span>
                      </div>
                      <div className="surface-card p-6 bg-surface-container-lowest border border-white/5 group-hover:border-primary/20 transition-all duration-500">
                        <h4 className="text-sm font-bold font-display mb-2">{item.type}</h4>
                        <p className="text-sm text-foreground/60 italic font-sans">"{item.note}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Draft Response */}
            <section className="pt-8 space-y-4 pb-20">
              <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('negotiationDetail.nextMove')}</h2>
              <div className={`bg-surface-container-lowest p-8 rounded-sm border space-y-6 ${error ? 'border-error/20' : 'border-primary/20'}`}>
                <textarea
                  className="w-full h-48 bg-transparent text-lg font-sans text-foreground/80 leading-relaxed focus:outline-none resize-none"
                  value={error
                    ? (lang === 'es' ? 'No se pudo generar la estrategia. Reiniciar núcleo de inteligencia.' : 'Unable to generate strategy. Reset intelligence core.')
                    : (aiData?.message || (loading ? (lang === 'es' ? 'Generando borrador basado en contexto RAG...' : 'Generating draft based on RAG context...') : ''))
                  }
                  readOnly={loading || !!error}
                />
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <p className="text-[10px] text-foreground/30 italic">{t('negotiationDetail.aiGenerated')}</p>
                  <div className="flex gap-4">
                    {error && (
                      <button onClick={triggerAnalysis} className="text-[10px] font-bold uppercase tracking-widest text-error hover:brightness-110">
                        {t('negotiationDetail.retryAnalysis')}
                      </button>
                    )}
                    <button
                      onClick={handleApprove}
                      disabled={!!error || isApproving || negotiation?.status === 'Completed'}
                      className="text-[10px] font-bold uppercase tracking-widest bg-primary text-on-primary px-4 py-2 rounded-sm shadow-premium hover:brightness-110 active:scale-95 transition-all disabled:opacity-30"
                    >
                      {isApproving ? t('negotiationDetail.sending') : t('negotiationDetail.confirmSend')}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>

      {/* Floating AI Assistant */}
      <aside className="w-[480px] h-full flex flex-col p-8 relative z-50">
        <div className="flex-1 glass rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-4 space-y-1">
            <div className="flex justify-between items-center mb-4">
              <span className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${error ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'}`}>
                {error ? '⚠️' : '🤖'}
              </span>
              <div className="flex gap-1">
                <div className={`w-1.5 h-1.5 bg-primary rounded-full ${isChatLoading || loading ? 'animate-bounce' : ''}`} />
                <div className={`w-1.5 h-1.5 bg-primary/60 rounded-full ${isChatLoading || loading ? 'animate-bounce delay-75' : ''}`} />
                <div className={`w-1.5 h-1.5 bg-primary/30 rounded-full ${isChatLoading || loading ? 'animate-bounce delay-150' : ''}`} />
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold tracking-tight">{t('architect.title')}</h2>
            <p className="text-[10px] text-foreground/40 uppercase tracking-widest">
              {error ? t('negotiationDetail.intelligenceOffline') : loading ? t('negotiationDetail.contextIngestion') : t('negotiationDetail.intelligenceActive')}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="px-8 flex gap-6 border-b border-white/5">
            {[
              { key: 'strategy', label: t('architect.tabs.strategy') },
              { key: 'chat', label: t('architect.tabs.chat') },
              { key: 'risk', label: t('architect.tabs.risk') },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.key ? 'text-primary border-b-2 border-primary' : 'text-foreground/20'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
            {error ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center text-2xl mb-2">!</div>
                <h3 className="text-lg font-display font-bold">{t('negotiationDetail.architectDelayed')}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed font-sans">{error}</p>
                <button onClick={triggerAnalysis} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10">
                  {t('negotiationDetail.forceConnection')}
                </button>
              </div>
            ) : (
              <>
                {activeTab === 'strategy' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="space-y-2">
                      <span className="text-[10px] text-primary/60 font-bold uppercase tracking-widest">{t('architect.coreNarrative')}</span>
                      <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                        <p className="text-sm text-foreground/60 leading-relaxed font-sans min-h-[80px]">
                          {aiData?.narrative || (loading ? t('architect.benchmarkAnalyzing') : 'N/A')}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <p className="text-[10px] text-foreground/30 mb-1 tracking-widest">{lang === 'es' ? 'Objetivo' : 'Target'}</p>
                        <p className="text-lg font-display font-bold text-foreground">${negotiation?.targetPrice || '--'}</p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-[10px] text-primary/60 mb-1 tracking-widest">{t('architect.aiSuggestion')}</p>
                        <p className="text-lg font-display font-bold text-primary truncate">{aiData?.pricing || '--'}</p>
                      </div>
                    </div>
                    <div className="p-5 bg-tertiary/5 rounded-2xl border border-tertiary/20">
                      <span className="text-[10px] text-tertiary/60 font-bold uppercase tracking-widest block mb-2">{t('architect.tacticalHack')}</span>
                      <p className="text-xs text-tertiary font-medium leading-relaxed italic">"{aiData?.hacks || t('architect.identifyingLeverage')}"</p>
                    </div>
                  </div>
                )}

                {activeTab === 'chat' && (
                  <div className="space-y-4 animate-in fade-in">
                    {chatHistory.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                          msg.role === 'user'
                            ? 'bg-primary text-on-primary rounded-tr-none'
                            : 'bg-white/[0.05] border border-white/5 text-foreground/80 rounded-tl-none'
                        }`}>
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/[0.05] border border-white/5 p-4 rounded-2xl rounded-tl-none">
                          <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-pulse" />
                            <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-pulse delay-75" />
                            <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-pulse delay-150" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'risk' && (
                  <div className="space-y-4 animate-in fade-in">
                    {aiData?.risks?.length > 0 ? aiData.risks.map((risk: string, i: number) => (
                      <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex gap-4">
                        <div className="w-2 h-2 rounded-full mt-1.5 bg-secondary shadow-premium-secondary" />
                        <p className="text-sm text-foreground/60 font-sans">{risk}</p>
                      </div>
                    )) : (
                      <p className="text-sm text-foreground/40 text-center pt-8">
                        {loading ? t('architect.benchmarkAnalyzing') : (lang === 'es' ? 'Sin riesgos identificados.' : 'No risks identified.')}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-8 border-t border-white/5 bg-white/[0.01]">
            <div className="relative">
              <input
                disabled={!!error || loading}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                type="text"
                placeholder={error ? t('architect.systemLocked') : t('architect.askPlaceholder')}
                className="w-full py-4 pl-6 pr-12 bg-white/[0.03] border border-white/5 rounded-2xl text-xs focus:outline-none focus:border-primary/30 transition-all font-sans disabled:opacity-30"
              />
              <button
                onClick={handleSendMessage}
                disabled={isChatLoading || !!error || loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:scale-110 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
              >
                <span className="text-xl">↗</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NegotiationDetailPage;
