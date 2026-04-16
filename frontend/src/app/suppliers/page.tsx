"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';

const SuppliersPage = () => {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  
  // Modal State
  const [volume, setVolume] = useState('100');
  const [targetPrice, setTargetPrice] = useState('800');
  const [maxPrice, setMaxPrice] = useState('950');
  const [isCreating, setIsCreating] = useState(false);

  // ABM Modals State
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [newSupplier, setNewSupplier] = useState({ name: '', category: '' });

  const refreshSuppliers = () => {
    setLoading(true);
    fetch('/api/suppliers')
      .then(res => res.json())
      .then(data => {
        setProviders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching suppliers:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshSuppliers();
  }, []);

  const handleCreateRequest = async () => {
    if (!selectedSupplier) return;
    setIsCreating(true);
    try {
      const res = await fetch('/api/negotiations/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supplier: selectedSupplier.name,
          supplier_id: selectedSupplier.id || 'SUP-000',
          category: selectedSupplier.category,
          risk: selectedSupplier.risk,
          volume,
          target_price: targetPrice,
          max_price: maxPrice
        })
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/negotiations/${data.id}`);
      } else {
        alert("Failed to initialize negotiation");
        setIsCreating(false);
      }
    } catch(err) {
      console.error(err);
      setIsCreating(false);
    }
  };

  const handleOnboard = async () => {
    if (!newSupplier.name) return;
    setIsCreating(true);
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplier)
      });
      if (res.ok) {
        setIsOnboarding(false);
        setNewSupplier({ name: '', category: '' });
        refreshSuppliers();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to onboard supplier");
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEdit = async () => {
    if (!editingSupplier.name) return;
    setIsCreating(true);
    try {
      const res = await fetch(`/api/suppliers/${editingSupplier.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSupplier)
      });
      if (res.ok) {
        setEditingSupplier(null);
        refreshSuppliers();
      } else {
        alert("Failed to update supplier");
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm(lang === 'es' ? '¿Estás seguro de eliminar este proveedor?' : 'Are you sure you want to delete this supplier?')) return;
    try {
      const res = await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        refreshSuppliers();
      } else {
        alert("Failed to delete supplier");
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 space-y-12 max-w-[1600px] mx-auto min-h-full relative">
      
      {/* Modal Requisition */}
      {selectedSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass w-full max-w-xl rounded-3xl p-10 border border-white/10 shadow-2xl relative">
             <button 
                onClick={() => setSelectedSupplier(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-foreground/40 transition-colors">
                ✕
             </button>
             <h2 className="text-3xl font-display font-bold mb-2">{lang === 'es' ? 'Inicializar Operación' : 'Initialize Operation'}</h2>
             <p className="text-sm font-sans text-foreground/60 mb-8 border-b border-white/5 pb-4">
                {lang === 'es' ? 'Enrutando solicitud de compra al Agente vía' : 'Routing new procurement request to Agent via'} <span className="font-bold text-primary">{selectedSupplier.name}</span>
             </p>
             
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2 block">{lang === 'es' ? 'Volumen (Unidades)' : 'Volume (Units)'}</label>
                   <input type="number" value={volume} onChange={e => setVolume(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-4 px-4 font-sans text-sm focus:border-primary/50 focus:outline-none" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2 block">{lang === 'es' ? 'Precio Objetivo (USD)' : 'Target Price (USD target)'}</label>
                     <input type="number" value={targetPrice} onChange={e => setTargetPrice(e.target.value)} className="w-full bg-primary/[0.03] border border-primary/20 rounded-sm py-4 px-4 font-sans text-sm focus:border-primary/50 focus:outline-none" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold uppercase tracking-widest text-tertiary/60 mb-2 block">{lang === 'es' ? 'Precio Máximo (Límite)' : 'Max Price Limit (Cap)'}</label>
                     <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full bg-tertiary/[0.03] border border-tertiary/20 rounded-sm py-4 px-4 font-sans text-sm focus:border-tertiary/50 focus:outline-none" />
                   </div>
                </div>
                <button 
                  onClick={handleCreateRequest}
                  disabled={isCreating}
                  className="w-full py-4 mt-4 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 shadow-premium disabled:opacity-50">
                   {isCreating ? (lang === 'es' ? 'Desplegando Arquitecto...' : 'Deploying Architect...') : (lang === 'es' ? 'Iniciar Flujo de Negociación' : 'Start Negotiation Workflow')}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Modal Onboarding */}
      {isOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass w-full max-w-md rounded-3xl p-10 border border-white/10 shadow-2xl relative">
             <button 
                onClick={() => setIsOnboarding(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-foreground/40 transition-colors">
                ✕
             </button>
             <h2 className="text-2xl font-display font-bold mb-2">{lang === 'es' ? 'Dar de Alta Entidad' : 'Onboard New Entity'}</h2>
             <p className="text-xs font-sans text-foreground/60 mb-8 border-b border-white/5 pb-4">
                {lang === 'es' ? 'Registrar un nuevo proveedor en el ecosistema' : 'Register a new supplier in the ecosystem'}
             </p>
             
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2 block">{lang === 'es' ? 'Nombre de la Entidad' : 'Entity Name'}</label>
                   <input 
                    type="text" 
                    value={newSupplier.name} 
                    onChange={e => setNewSupplier({...newSupplier, name: e.target.value})} 
                    placeholder="e.g. Globant"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-3 px-4 font-sans text-sm focus:border-primary/50 focus:outline-none" 
                   />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2 block">{lang === 'es' ? 'Categoría / Rubro' : 'Category / Industry'}</label>
                   <input 
                    type="text" 
                    value={newSupplier.category} 
                    onChange={e => setNewSupplier({...newSupplier, category: e.target.value})} 
                    placeholder="e.g. Software Services"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-3 px-4 font-sans text-sm focus:border-primary/50 focus:outline-none" 
                   />
                 </div>
                
                <button 
                  onClick={handleOnboard}
                  disabled={isCreating || !newSupplier.name}
                  className="w-full py-4 mt-4 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 shadow-premium disabled:opacity-50">
                   {isCreating ? (lang === 'es' ? 'Registrando...' : 'Registering...') : (lang === 'es' ? 'Confirmar Alta' : 'Confirm Onboarding')}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {editingSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass w-full max-w-md rounded-3xl p-10 border border-white/10 shadow-2xl relative">
             <button 
                onClick={() => setEditingSupplier(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-foreground/40 transition-colors">
                ✕
             </button>
             <h2 className="text-2xl font-display font-bold mb-2">{lang === 'es' ? 'Editar Entidad' : 'Edit Entity'}</h2>
             <p className="text-xs font-sans text-foreground/60 mb-8 border-b border-white/5 pb-4">
                {lang === 'es' ? 'Modificar datos del proveedor' : 'Modify supplier details'}
             </p>
             
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2 block">{lang === 'es' ? 'Nombre' : 'Name'}</label>
                   <input 
                    type="text" 
                    value={editingSupplier.name} 
                    onChange={e => setEditingSupplier({...editingSupplier, name: e.target.value})} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-3 px-4 font-sans text-sm focus:border-primary/50 focus:outline-none" 
                   />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2 block">{lang === 'es' ? 'Categoría' : 'Category'}</label>
                   <input 
                    type="text" 
                    value={editingSupplier.category} 
                    onChange={e => setEditingSupplier({...editingSupplier, category: e.target.value})} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-3 px-4 font-sans text-sm focus:border-primary/50 focus:outline-none" 
                   />
                 </div>
                
                <button 
                  onClick={handleEdit}
                  disabled={isCreating || !editingSupplier.name}
                  className="w-full py-4 mt-4 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 shadow-premium disabled:opacity-50">
                   {isCreating ? (lang === 'es' ? 'Actualizando...' : 'Updating...') : (lang === 'es' ? 'Guardar Cambios' : 'Save Changes')}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Editorial Header */}
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{lang === 'es' ? 'Ecosistema de Socios' : 'Partner Ecosystem'}</p>
          <h1 className="text-4xl font-display font-bold tracking-tight">{t('suppliers.title')}</h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input 
              type="text" 
              placeholder={lang === 'es' ? 'Buscar proveedores...' : 'Search entities...'} 
              className="w-64 py-2.5 pl-10 pr-4 bg-white/[0.03] border border-white/5 rounded-sm text-xs focus:outline-none focus:border-primary/30 transition-all font-sans"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 text-sm">🔍</span>
          </div>
          <button 
            onClick={() => setIsOnboarding(true)}
            className="px-6 py-2.5 bg-primary text-on-primary rounded-sm font-bold text-xs uppercase tracking-widest hover:shadow-premium transition-all">
            + {lang === 'es' ? 'Agregar Proveedor' : 'Onboard Entity'}
          </button>
        </div>
      </header>

      {/* Tonal Stats Layer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="surface-card p-6 border border-white/5">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">{lang === 'es' ? 'Total Proveedores' : 'Total Suppliers'}</p>
          <p className="text-2xl font-display font-bold">{loading ? '--' : providers.length}</p>
        </div>
        <div className="surface-card p-6 border border-white/5">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">{lang === 'es' ? 'Socios Estratégicos' : 'Strategic Partners'}</p>
          <p className="text-2xl font-display font-bold text-primary">12</p>
        </div>
        <div className="surface-card p-6 border border-white/5">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">{lang === 'es' ? 'Puntaje de Riesgo' : 'Avg. Risk Score'}</p>
          <p className="text-2xl font-display font-bold text-secondary">{lang === 'es' ? 'Bajo' : 'Low'}</p>
        </div>
        <div className="surface-card p-6 border border-white/5">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">{lang === 'es' ? 'Renovación Pendiente' : 'Renewal Pending'}</p>
          <p className="text-2xl font-display font-bold text-tertiary">08</p>
        </div>
      </div>

      {/* Directory Table: No-Line Editorial Style */}
      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-premium border border-white/5">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{lang === 'es' ? 'Proveedor' : 'Entity Name'}</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{lang === 'es' ? 'Clasificación' : 'Classification'}</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{lang === 'es' ? 'Estabilidad' : 'Stability'}</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{lang === 'es' ? 'Flujo Anual' : 'Annual Flow'}</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{lang === 'es' ? 'Rendimiento' : 'Performance'}</th>
                <th className="px-8 py-5 text-[10px] font-bold text-foreground/30 uppercase tracking-widest text-right">{lang === 'es' ? 'Acciones' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center font-mono text-sm text-foreground/40">{t('common.loading')}</td>
                </tr>
              ) : providers.map((p) => (
                <tr 
                  key={p.id || p.name} 
                  onClick={() => setSelectedSupplier(p)}
                  className="hover:bg-primary/[0.02] transition-colors cursor-pointer group"
                >
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
                      {lang === 'es'
                        ? `${p.risk === 'Low' ? 'Bajo' : p.risk === 'Medium' ? 'Medio' : 'Alto'} Riesgo`
                        : `${p.risk} Risk`
                      }
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
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingSupplier(p); }}
                          className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/10 text-foreground/20 hover:text-primary flex items-center justify-center transition-all"
                          title={lang === 'es' ? 'Editar' : 'Edit'}
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={(e) => handleDelete(e, p.id)}
                          className="w-8 h-8 rounded-full bg-white/5 hover:bg-error/10 text-foreground/20 hover:text-error flex items-center justify-center transition-all"
                          title={lang === 'es' ? 'Eliminar Proveedor' : 'Delete Supplier'}
                        >
                          🗑️
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 bg-white/[0.01] border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em]">
           <span>Showing directory records</span>
           <div className="flex gap-4">
              <button className="hover:text-primary transition-colors cursor-pointer disabled:opacity-50">Previous</button>
              <button className="hover:text-primary transition-colors cursor-pointer">Next Record</button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default SuppliersPage;
