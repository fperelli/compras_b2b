"use client";

import FloatingWidget from '@/components/FloatingWidget';
import Link from 'next/link';

export default function EmbedDemoPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#111827] font-sans">
      {/* Fake Header of a corporate intranet */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">G</div>
            <span className="font-bold text-lg text-gray-900 tracking-tight">Globant Intranet</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-5">Dashboard</a>
            <a href="#" className="hover:text-gray-900">Procurement</a>
            <a href="#" className="hover:text-gray-900">HR Portal</a>
            <a href="#" className="hover:text-gray-900">IT Support</a>
          </nav>
          <div className="flex items-center gap-4">
             <Link href="/" className="text-xs text-blue-600 hover:underline">← Volver al Admin App</Link>
             <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </header>

      {/* Fake Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Procurement Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión de proveedores y compras corporativas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Órdenes Recientes</h2>
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Proveedor</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium">ORD-001</td>
                    <td className="px-4 py-3">Apple Inc.</td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Aprobado</span></td>
                    <td className="px-4 py-3">$45,000</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium">ORD-002</td>
                    <td className="px-4 py-3">AWS</td>
                    <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pendiente</span></td>
                    <td className="px-4 py-3">$12,400</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Políticas de Compra Activas</h2>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>Equipos de IT: Máximo $2000 por empleado.</li>
                <li>Suscripciones de software: Requiere aprobación si supera los $500 mensuales.</li>
                <li>Viajes: Usar la agencia corporativa obligatoriamente.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">Asistencia de IA</h3>
                <p className="text-sm text-blue-800 mb-4">
                  Ahora cuentas con un agente de compras virtual. Usa el botón flotante en la esquina inferior derecha para hacer consultas sobre políticas o iniciar una negociación.
                </p>
             </div>
          </div>
        </div>
      </main>

      {/* Aquí es donde el cliente inyecta el widget */}
      <FloatingWidget tenant_id="tenant_default" />

    </div>
  );
}
