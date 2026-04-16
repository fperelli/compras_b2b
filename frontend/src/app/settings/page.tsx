"use client";
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function SettingsPage() {
  const { t, lang } = useTranslation();

  const tabs = [
    { key: 'limits', label: lang === 'es' ? 'Límites del Agente' : 'Agent Limits' },
    { key: 'rag',    label: lang === 'es' ? 'Datos y RAG' : 'Data & RAG' },
    { key: 'roles',  label: lang === 'es' ? 'Roles y Permisos' : 'Roles & Permissions' },
    { key: 'api',    label: 'API Integrations' },
  ];

  const [activeTab, setActiveTab] = useState('limits');
  const [settings, setSettings] = useState<any>({
    max_auto_approval_limit: "5,000.00",
    supplier_risk_tolerance: "low",
    force_human_sign_off: true,
    strict_playbook_adherence: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [policies, setPolicies] = useState<any[]>([]);
  const [loadingPolicies, setLoadingPolicies] = useState(false);

  const fetchPolicies = async () => {
    setLoadingPolicies(true);
    try {
      const res = await fetch('/api/settings/policies');
      if (res.ok) {
        const data = await res.json();
        setPolicies(data.files || []);
      }
    } catch (err) {
      console.error('Error fetching policies', err);
    }
    setLoadingPolicies(false);
  };

  useEffect(() => {
    if (activeTab === 'rag') fetchPolicies();
  }, [activeTab]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => { setSettings(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      alert(lang === 'es' ? '✅ Configuración guardada exitosamente' : '✅ Settings saved successfully');
    } catch {
      alert(lang === 'es' ? '❌ Error guardando configuración' : '❌ Error saving settings');
    }
    setSaving(false);
  };

  return (
    <div className="p-10 space-y-12 max-w-[1200px] mx-auto min-h-full">
      {/* Header */}
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            {lang === 'es' ? 'Control de Plataforma' : 'Platform Control'}
          </p>
          <h1 className="text-4xl font-display font-bold tracking-tight">{t('settings.title')}</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-primary text-on-primary rounded-sm font-bold text-sm hover:scale-[1.02] shadow-premium transition-all disabled:opacity-50"
        >
          {saving ? t('settings.general.saving') : t('settings.general.saveChanges')}
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Tab Navigation */}
        <nav className="w-full md:w-64 flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-left px-6 py-4 text-sm font-bold rounded-sm transition-all ${
                activeTab === tab.key
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-foreground/50 hover:bg-white/5 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="flex-1 space-y-8">

          {/* ─── AGENT LIMITS ─── */}
          {activeTab === 'limits' && (
            <>
              <div className="glass p-8 rounded-2xl border border-white/5 shadow-premium space-y-8">
                <div>
                  <h2 className="text-xl font-display font-bold mb-2">
                    {lang === 'es' ? 'Umbrales de Negociación Automatizada' : 'Automated Negotiation Thresholds'}
                  </h2>
                  <p className="text-sm text-foreground/50">
                    {lang === 'es'
                      ? 'Define los límites dentro de los cuales la IA puede operar sin aprobación humana.'
                      : 'Determine the bounds in which the AI can operate without human approval.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">
                      {lang === 'es' ? 'Límite Máximo de Aprobación Automática' : 'Max Auto-Approval Limit'}
                    </label>
                    <div className="flex items-center gap-4 p-4 surface-card border border-white/5">
                      <span className="text-foreground/50">$</span>
                      <input
                        type="text"
                        value={settings?.max_auto_approval_limit || ''}
                        onChange={e => setSettings({...settings, max_auto_approval_limit: e.target.value})}
                        className="bg-transparent border-none outline-none w-full text-foreground font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">
                      {lang === 'es' ? 'Tolerancia al Riesgo de Proveedores' : 'Supplier Risk Tolerance'}
                    </label>
                    <select
                      value={settings?.supplier_risk_tolerance || 'low'}
                      onChange={e => setSettings({...settings, supplier_risk_tolerance: e.target.value})}
                      className="w-full p-4 surface-card border border-white/5 outline-none text-sm text-foreground font-bold appearance-none"
                    >
                      <option value="low">{lang === 'es' ? 'Solo Riesgo Bajo' : 'Low Risk Only'}</option>
                      <option value="medium">{lang === 'es' ? 'Riesgo Medio y Bajo' : 'Medium & Low Risk'}</option>
                      <option value="high">{lang === 'es' ? 'Cualquier Riesgo (No Recomendado)' : 'Any Risk Level (Not Recommended)'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h3 className="text-sm font-bold">
                    {lang === 'es' ? 'Restricciones de Comportamiento' : 'Behavioral Constraints'}
                  </h3>

                  {[
                    {
                      key: 'force_human_sign_off',
                      title: lang === 'es' ? 'Requerir aprobación humana en la 1era oferta' : 'Force human sign-off on 1st offer',
                      desc: lang === 'es'
                        ? 'El agente genera la oferta pero requiere clic manual para enviar.'
                        : 'Agent generates offer but requires manual click to send.',
                    },
                    {
                      key: 'strict_playbook_adherence',
                      title: lang === 'es' ? 'Adherencia estricta al Playbook' : 'Strict adherence to Playbook',
                      desc: lang === 'es'
                        ? 'Evita que el LLM use técnicas de negociación fuera de las políticas RAG.'
                        : 'Prevents LLM from using "creative" negotiation techniques outside RAG.',
                    },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg border border-white/5">
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-foreground/50 mt-1">{item.desc}</p>
                      </div>
                      <div
                        onClick={() => setSettings({...settings, [item.key]: !settings[item.key]})}
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings?.[item.key] ? 'bg-primary' : 'bg-surface-container-high'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${settings?.[item.key] ? 'right-1 bg-on-primary' : 'left-1 bg-foreground/50'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card p-6 border-l-4 border-l-error flex gap-4">
                <div className="text-error text-xl">⚠️</div>
                <div>
                  <h4 className="text-sm font-bold text-error uppercase tracking-widest mb-1">
                    {lang === 'es' ? 'Zona de Peligro' : 'Danger Zone'}
                  </h4>
                  <p className="text-xs text-foreground/60 mb-4">
                    {lang === 'es'
                      ? 'Vaciar el almacén vectorial ChromaDB hará que el agente pierda todo el contexto de negociaciones pasadas y benchmarks de mercado hasta que se ejecute una re-indexación manual.'
                      : 'Clearing the ChromaDB vector storage will force the AI agent to lose all context of past negotiations and market benchmarks until a manual re-index is triggered.'}
                  </p>
                  <button className="px-4 py-2 border border-error/30 text-error text-[10px] font-bold rounded hover:bg-error/10 transition-all uppercase tracking-widest">
                    {lang === 'es' ? 'Vaciar Base RAG' : 'Flush RAG Database'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ─── DATA & RAG ─── */}
          {activeTab === 'rag' && (
            <div className="glass p-8 rounded-2xl border border-white/5 shadow-premium space-y-8">
              <div>
                <h2 className="text-xl font-display font-bold mb-2">{t('settings.rag.title')}</h2>
                <p className="text-sm text-foreground/50">{t('settings.rag.description')}</p>
              </div>

              <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-4 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-2xl">📄</div>
                <div>
                  <p className="font-bold text-sm">{t('settings.rag.dropZoneTitle')}</p>
                  <p className="text-xs text-foreground/40 mt-1">{t('settings.rag.dropZoneHint')}</p>
                </div>

                <input
                  type="file"
                  accept=".md,.txt"
                  className="hidden"
                  id="policy-upload"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('tenant_id', 'tenant_default');
                    try {
                      alert(lang === 'es' ? 'Subiendo y analizando documento...' : 'Uploading and analyzing document...');
                      const res = await fetch('/api/settings/upload', { method: 'POST', body: formData });
                      if (res.ok) {
                        alert(`✅ ${t('settings.rag.uploadSuccess')}`);
                        fetchPolicies();
                      } else {
                        throw new Error('Upload failed');
                      }
                    } catch {
                      alert(`❌ ${t('settings.rag.uploadError')}`);
                    }
                  }}
                />
                <label
                  htmlFor="policy-upload"
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 tracking-widest uppercase text-[10px] font-bold rounded-full cursor-pointer transition-colors"
                >
                  {t('settings.rag.browseFiles')}
                </label>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-sm font-bold">{t('settings.rag.activePolicies')}</h3>
                {loadingPolicies ? (
                  <p className="text-xs text-foreground/50">{t('settings.rag.loadingPolicies')}</p>
                ) : policies.length === 0 ? (
                  <p className="text-xs text-foreground/50">{t('settings.rag.noPolicies')}</p>
                ) : (
                  <div className="space-y-2">
                    {policies.map(p => (
                      <div key={p.name} className="flex justify-between items-center p-4 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg border border-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <span className="text-xl">📄</span>
                          <div>
                            <p className="font-bold text-sm">{p.name}</p>
                            <p className="text-[10px] text-foreground/50 font-mono tracking-widest uppercase">{(p.size_bytes / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            const msg = t('settings.rag.deleteConfirm').replace('{{name}}', p.name);
                            if (!confirm(msg)) return;
                            try {
                              const res = await fetch(`/api/settings/policies?filename=${encodeURIComponent(p.name)}`, { method: 'DELETE' });
                              if (res.ok) fetchPolicies();
                              else alert(t('settings.rag.deleteError'));
                            } catch { alert(t('settings.rag.deleteError')); }
                          }}
                          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-error/10 text-error/50 hover:text-error transition-all"
                          title={t('common.delete')}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── ENTERPRISE LOCKED ─── */}
          {['roles', 'api'].includes(activeTab) && (
            <div className="glass p-12 rounded-2xl border border-white/5 shadow-premium flex flex-col items-center justify-center h-[28rem] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                <span className="text-2xl opacity-50">🔒</span>
              </div>
              <h3 className="text-xl font-display font-bold mb-2">
                {lang === 'es' ? 'Módulo Enterprise' : 'Enterprise Module'}
              </h3>
              <p className="text-sm text-foreground/50 max-w-sm mb-8 leading-relaxed">
                {lang === 'es'
                  ? 'Esta función está disponible exclusivamente para licencias Enterprise. Actualiza para desbloquear controles granulares y acceso de API avanzado.'
                  : 'This feature is restricted to Enterprise licenses. Upgrade to unlock advanced granular controls and raw API access.'}
              </p>
              <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-foreground text-xs font-bold uppercase tracking-widest rounded-full transition-colors border border-white/10 relative z-10">
                {lang === 'es' ? 'Contactar a Ventas' : 'Contact Sales'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
