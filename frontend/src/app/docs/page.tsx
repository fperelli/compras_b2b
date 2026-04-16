"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

const sections = [
  {
    id: 'intro',
    icon: '🎯',
    title: { es: 'Introducción', en: 'Introduction' },
    content: {
      es: `## ¿Qué es ProcureAI?

ProcureAI es una plataforma de **negociación B2B asistida por inteligencia artificial** diseñada para equipos de compras corporativas en Latinoamérica.

El sistema combina un agente de IA avanzado con una base de conocimiento corporativa (RAG — Retrieval Augmented Generation) para ayudarte a:

- **Analizar requerimientos de compra** de forma estratégica
- **Generar ofertas y contraofertas** dentro de tus límites presupuestarios
- **Identificar riesgos** en proveedores y cadena de suministro
- **Mantener un historial de auditoría** completo de cada negociación
- **Aplicar políticas corporativas** automáticamente desde tu base de documentos

### ¿Para quién es esta plataforma?
- Gerentes y analistas de compras
- Equipos de procurement y supply chain
- Directores de operaciones con foco en costos
`,
      en: `## What is ProcureAI?

ProcureAI is an **AI-assisted B2B negotiation platform** designed for corporate procurement teams in Latin America.

The system combines an advanced AI agent with a corporate knowledge base (RAG — Retrieval Augmented Generation) to help you:

- **Analyze purchase requirements** strategically
- **Generate offers and counteroffers** within your budget limits
- **Identify risks** in suppliers and supply chain
- **Maintain a complete audit trail** of every negotiation
- **Automatically apply corporate policies** from your document base

### Who is this platform for?
- Procurement managers and analysts
- Procurement and supply chain teams
- Operations directors focused on costs
`
    }
  },
  {
    id: 'getting-started',
    icon: '🚀',
    title: { es: 'Primeros Pasos', en: 'Getting Started' },
    content: {
      es: `## Configuración inicial

### 1. Acceso a la plataforma
Accede en **http://localhost:3000** (desarrollo local) o en la URL de tu entorno de producción.

### 2. Configurar tu empresa
Ve a **Configuración → General** y completa:
- **Nombre de la empresa**: Nombre de tu organización
- **Moneda predeterminada**: USD, ARS, BRL, etc.
- **Idioma**: Español (por defecto) o Inglés

### 3. Cargar proveedores
Ve a **Proveedores** y agrega los proveedores con los que trabajas habitualmente. Incluye:
- Nombre y país
- Categoría de productos
- Información de contacto

### 4. Uploading políticas corporativas (RAG)
Este paso es **crítico** para que la IA tome decisiones alineadas con tus reglas internas.

Ve a **Configuración → Datos y RAG** y sube archivos \`.txt\` o \`.md\` con:
- Políticas de compras de tu empresa
- Límites de gasto por categoría
- Requisitos de compliance con proveedores
- Playbooks de negociación internos

> 💡 **Tip**: Cuanto más específicas sean tus políticas, más precisas serán las recomendaciones del agente.
`,
      en: `## Initial setup

### 1. Platform access
Access at **http://localhost:3000** (local development) or your production URL.

### 2. Configure your company
Go to **Settings → General** and complete:
- **Company name**: Your organization name
- **Default currency**: USD, ARS, BRL, etc.
- **Language**: Spanish (default) or English

### 3. Load suppliers
Go to **Suppliers** and add your usual suppliers, including:
- Name and country
- Product category
- Contact information

### 4. Upload corporate policies (RAG)
This step is **critical** for the AI to make decisions aligned with your internal rules.

Go to **Settings → Data & RAG** and upload \`.txt\` or \`.md\` files with:
- Your company's procurement policies
- Spending limits by category
- Supplier compliance requirements
- Internal negotiation playbooks

> 💡 **Tip**: The more specific your policies, the more accurate the agent's recommendations will be.
`
    }
  },
  {
    id: 'negotiations',
    icon: '🤝',
    title: { es: 'Gestión de Negociaciones', en: 'Managing Negotiations' },
    content: {
      es: `## Ciclo de vida de una negociación

### Crear una nueva negociación
1. Ve a **Negociaciones** y haz clic en **Nueva**
2. Completa los datos del requerimiento:
   - **Proveedor**: Selecciona o ingresa el nombre
   - **Categoría**: Tipo de producto/servicio
   - **Volumen**: Cantidad de unidades
   - **Precio objetivo**: El precio ideal que quieres alcanzar
   - **Precio máximo**: El límite absoluto que no puedes superar
   - **Condiciones de pago**: 30, 60, 90 días, etc.

### Interpretar el análisis del agente
Una vez creada, el agente analizará automáticamente:

**📊 Estrategia (tab principal)**
- **Narrativa Central**: Análisis del contexto de mercado y posición del proveedor
- **Sugerencia de precio IA**: El precio inicial recomendado
- **Táctica Clave**: El hack táctico más relevante para esta negociación

**⚠️ Riesgo**
- Lista de riesgos identificados en el proveedor y la operación

**📝 Borrador de respuesta**
- Texto listo para enviar al proveedor, ajustado a tu tono corporativo

### Aprobar y cerrar
Una vez que el agente genera la estrategia y estás conforme, haz clic en **Aprobar Respuesta** para registrar el cierre.
`,
      en: `## Negotiation lifecycle

### Create a new negotiation
1. Go to **Negotiations** and click **New**
2. Fill in the requirement details:
   - **Supplier**: Select or type the name
   - **Category**: Type of product/service
   - **Volume**: Number of units
   - **Target price**: The ideal price you want to reach
   - **Maximum price**: The absolute limit you cannot exceed
   - **Payment terms**: 30, 60, 90 days, etc.

### Interpreting the agent's analysis
Once created, the agent will automatically analyze:

**📊 Strategy (main tab)**
- **Core Narrative**: Market context analysis and supplier positioning
- **AI price suggestion**: The recommended initial offer
- **Tactical Hack**: The most relevant tactic for this negotiation

**⚠️ Risk**
- List of risks identified in the supplier and operation

**📝 Response draft**
- Text ready to send to the supplier, adjusted to your corporate tone

### Approve and close
Once the agent generates the strategy and you are satisfied, click **Approve Response** to register the closure.
`
    }
  },
  {
    id: 'chat',
    icon: '🤖',
    title: { es: 'Arquitecto de Estrategia (Chat)', en: 'Strategy Architect (Chat)' },
    content: {
      es: `## Conversando con el arquitecto de IA

### ¿Qué puede hacer el chat?
El chat te permite **dialogar en tiempo real** con el agente de IA para:
- Ajustar la estrategia según nueva información
- Pedir variaciones de la oferta
- Preguntar sobre tácticas específicas de negociación
- Interpretar la respuesta de un proveedor

### Ejemplos de preguntas efectivas

**Para ajustar precios:**
> "El proveedor insiste en USD 920. ¿Cuál es nuestra próxima contraoferta?"

**Para entender riesgos:**
> "¿Qué riesgos tiene contratar un proveedor único para este componente?"

**Para tácticas de negociación:**
> "¿Cómo aprovecho que el proveedor necesita liquidez este trimestre?"

**Para interpretar respuestas:**
> "El proveedor dice que tiene problemas de stock. ¿Cómo afecta esto a nuestra negociación?"

### Limitaciones del chat
- El chat no tiene acceso en tiempo real a cotizaciones o bases de datos externas.
- Se basa en las políticas que hayas cargado en el módulo RAG y en el historial de la conversación.
- Para análisis con herramientas completas, el agente necesita soporte de *tool-calling* en el modelo de IA.

> 💡 **Tip**: Si usas Ollama localmente, el modelo \`llama3\` puede responder preguntas estratégicas aunque no ejecute herramientas de búsqueda. Para máxima potencia, usa Gemini en producción.
`,
      en: `## Conversing with the AI architect

### What can the chat do?
The chat allows you to **dialogue in real time** with the AI agent to:
- Adjust strategy based on new information
- Request offer variations
- Ask about specific negotiation tactics
- Interpret a supplier's response

### Examples of effective questions

**To adjust prices:**
> "The supplier insists on USD 920. What's our next counteroffer?"

**To understand risks:**
> "What risks does contracting a single supplier for this component have?"

**For negotiation tactics:**
> "How do I leverage that the supplier needs liquidity this quarter?"

**To interpret responses:**
> "The supplier says they have stock issues. How does this affect our negotiation?"

### Chat limitations
- The chat does not have real-time access to external quotes or databases.
- It relies on the policies you've loaded in the RAG module and the conversation history.
- For analysis with full tools, the agent needs *tool-calling* support in the AI model.

> 💡 **Tip**: If using Ollama locally, the \`llama3\` model can answer strategic questions even without running search tools. For maximum power, use Gemini in production.
`
    }
  },
  {
    id: 'rag',
    icon: '📚',
    title: { es: 'Políticas RAG', en: 'RAG Policies' },
    content: {
      es: `## Gestión de la base de conocimiento

### ¿Qué es RAG?
RAG (Retrieval Augmented Generation) es la tecnología que permite al agente consultar tus **documentos corporativos en tiempo real** antes de generar cualquier recomendación.

### Tipos de documentos recomendados

| Tipo | Ejemplo |
|------|---------|
| Políticas de gasto | "No se puede aprobar compras >$50k sin 3 cotizaciones" |
| Playbooks de negociación | "Estrategia de ancla: empezar 15% bajo el precio objetivo" |
| Perfiles de proveedores | "TechCorp: historial positivo, 98% de entregas a tiempo" |
| Benchmarks de mercado | "Precio de referencia de laptops Q1 2025: USD 820-950" |

### Flujo de carga
1. Ve a **Configuración → Datos y RAG**
2. Arrastra y suelta un archivo \`.txt\` o \`.md\`
3. El sistema lo procesa y lo indexa en ChromaDB automáticamente
4. La próxima negociación ya tendrá acceso a ese conocimiento

### Eliminar políticas obsoletas
En la sección **Políticas Activas**, encontrarás el listado de todos los archivos. Usa el botón 🗑️ para eliminar documentos desactualizados. El índice RAG se actualiza automáticamente.

> ⚠️ **Importante**: Siempre revisa que los documentos que cargues estén vigentes. Una política desactualizada puede llevar al agente a tomar decisiones incorrectas.
`,
      en: `## Knowledge base management

### What is RAG?
RAG (Retrieval Augmented Generation) is the technology that allows the agent to consult your **corporate documents in real time** before generating any recommendation.

### Recommended document types

| Type | Example |
|------|---------|
| Spending policies | "Purchases >$50k cannot be approved without 3 quotes" |
| Negotiation playbooks | "Anchor strategy: start 15% below target price" |
| Supplier profiles | "TechCorp: positive history, 98% on-time deliveries" |
| Market benchmarks | "Laptop reference price Q1 2025: USD 820-950" |

### Upload flow
1. Go to **Settings → Data & RAG**
2. Drag and drop a \`.txt\` or \`.md\` file
3. The system processes and indexes it in ChromaDB automatically
4. The next negotiation will already have access to that knowledge

### Delete obsolete policies
In the **Active Policies** section, you'll find a list of all files. Use the 🗑️ button to delete outdated documents. The RAG index updates automatically.

> ⚠️ **Important**: Always verify that the documents you upload are current. An outdated policy can lead the agent to make incorrect decisions.
`
    }
  },
  {
    id: 'api',
    icon: '🔌',
    title: { es: 'Referencia de API', en: 'API Reference' },
    content: {
      es: `## Endpoints principales del agente

La API está disponible en \`http://localhost:8000/api/v1\` durante el desarrollo. Puedes explorarla in \`http://localhost:8000/docs\` (Swagger UI).

### Endpoints clave

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| \`GET\` | \`/health\` | Estado del servicio |
| \`POST\` | \`/negotiate\` | Iniciar negociación completa |
| \`POST\` | \`/counteroffer\` | Generar contraoferta |
| \`POST\` | \`/chat\` | Chat con el arquitecto |
| \`POST\` | \`/policy/upload\` | Subir política RAG |
| \`GET\` | \`/policy/list\` | Listar políticas |
| \`DELETE\` | \`/policy/delete\` | Eliminar política |

### Ejemplo: Iniciar una negociación
\`\`\`bash
curl -X POST http://localhost:8000/api/v1/negotiate \\
  -H "Content-Type: application/json" \\
  -d '{
    "request_id": "PO-2025-001",
    "tenant_id": "tenant_default",
    "supplier_id": "SUPP-001",
    "supplier_name": "TechCorp Argentina",
    "category": "Laptops",
    "volume": 50,
    "target_price": 800.0,
    "max_price": 900.0,
    "payment_terms": "30 días",
    "required_date": "2025-06-01"
  }'
\`\`\`

### Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| \`LLM_PROVIDER\` | \`ollama\` o \`gemini\` | \`ollama\` |
| \`OLLAMA_BASE_URL\` | URL del servidor Ollama | \`http://localhost:11434\` |
| \`GOOGLE_API_KEY\` | API Key de Google AI (para Gemini) | — |
| \`MONGODB_URI\` | Cadena de conexión MongoDB | — |
`,
      en: `## Main agent endpoints

The API is available at \`http://localhost:8000/api/v1\` during development. You can explore it at \`http://localhost:8000/docs\` (Swagger UI).

### Key endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`GET\` | \`/health\` | Service status |
| \`POST\` | \`/negotiate\` | Start full negotiation |
| \`POST\` | \`/counteroffer\` | Generate counteroffer |
| \`POST\` | \`/chat\` | Chat with architect |
| \`POST\` | \`/policy/upload\` | Upload RAG policy |
| \`GET\` | \`/policy/list\` | List policies |
| \`DELETE\` | \`/policy/delete\` | Delete policy |

### Example: Start a negotiation
\`\`\`bash
curl -X POST http://localhost:8000/api/v1/negotiate \\
  -H "Content-Type: application/json" \\
  -d '{
    "request_id": "PO-2025-001",
    "tenant_id": "tenant_default",
    "supplier_id": "SUPP-001",
    "supplier_name": "TechCorp Argentina",
    "category": "Laptops",
    "volume": 50,
    "target_price": 800.0,
    "max_price": 900.0,
    "payment_terms": "30 days",
    "required_date": "2025-06-01"
  }'
\`\`\`

### Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| \`LLM_PROVIDER\` | \`ollama\` or \`gemini\` | \`ollama\` |
| \`OLLAMA_BASE_URL\` | Ollama server URL | \`http://localhost:11434\` |
| \`GOOGLE_API_KEY\` | Google AI API Key (for Gemini) | — |
| \`MONGODB_URI\` | MongoDB connection string | — |
`
    }
  },
];

export default function DocsPage() {
  const { lang, t } = useTranslation();
  const [activeSection, setActiveSection] = useState('intro');

  const currentSection = sections.find(s => s.id === activeSection);

  // Simple markdown-like renderer
  const renderContent = (md: string) => {
    const lines = md.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-2xl font-display font-bold mt-8 mb-4 text-foreground">{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-lg font-bold mt-6 mb-3 text-primary/80">{line.slice(4)}</h3>);
      } else if (line.startsWith('> ⚠️') || line.startsWith('> 💡')) {
        const isWarning = line.includes('⚠️');
        elements.push(
          <div key={i} className={`my-4 p-4 rounded-lg border-l-4 text-sm leading-relaxed ${isWarning ? 'bg-amber-500/5 border-amber-500/40 text-amber-200/80' : 'bg-primary/5 border-primary/40 text-foreground/70'}`}>
            {line.slice(2)}
          </div>
        );
      } else if (line.startsWith('| ')) {
        // Table
        const tableLines = [];
        while (i < lines.length && lines[i].startsWith('| ')) {
          tableLines.push(lines[i]);
          i++;
        }
        const headers = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim());
        const rows = tableLines.slice(2).map(row => row.split('|').filter(c => c.trim()).map(c => c.trim()));
        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  {headers.map((h, hi) => <th key={hi} className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-widest text-foreground/40">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    {row.map((cell, ci) => <td key={ci} className="py-2 px-3 text-foreground/70 font-mono text-xs">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      } else if (line.startsWith('```')) {
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={`code-${i}`} className="my-4 p-4 bg-black/30 rounded-lg border border-white/5 overflow-x-auto text-xs text-foreground/70 font-mono leading-relaxed">
            {codeLines.join('\n')}
          </pre>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={i} className="ml-4 mb-1 text-foreground/70 text-sm leading-relaxed flex gap-2">
            <span className="text-primary mt-1.5 text-xs">▸</span>
            <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>').replace(/`(.+?)`/g, '<code class="text-primary/80 bg-primary/10 px-1 py-0.5 rounded text-xs font-mono">$1</code>') }} />
          </li>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="my-3 pl-4 border-l-2 border-white/20 italic text-sm text-foreground/60">
            {line.slice(2)}
          </blockquote>
        );
      } else if (line.trim()) {
        elements.push(
          <p key={i} className="mb-3 text-sm text-foreground/70 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>').replace(/`(.+?)`/g, '<code class="text-primary/80 bg-primary/10 px-1 py-0.5 rounded text-xs font-mono">$1</code>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline">$1</a>') }}
          />
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar de secciones */}
      <aside className="w-64 h-full bg-surface-container border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-lg font-display font-bold">
            {lang === 'es' ? 'Manual de Usuario' : 'User Manual'}
          </h1>
          <p className="text-[10px] text-foreground/40 uppercase tracking-widest mt-1">ProcureAI v1.0</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                activeSection === section.id
                  ? 'bg-primary/10 text-primary border-l-2 border-primary font-semibold'
                  : 'text-foreground/50 hover:bg-white/5 hover:text-foreground/80'
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.title[lang]}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-[10px] text-foreground/30 hover:text-foreground/60 transition-colors uppercase tracking-widest"
          >
            ← {t('common.backToDashboard')}
          </Link>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 overflow-y-auto px-12 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Header de sección */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
            <span className="text-4xl">{currentSection?.icon}</span>
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight">
                {currentSection?.title[lang]}
              </h1>
              <p className="text-[10px] text-foreground/30 uppercase tracking-widest mt-1 font-mono">
                ProcureAI · {lang === 'es' ? 'Manual de Usuario' : 'User Manual'}
              </p>
            </div>
          </div>

          {/* Contenido renderizado */}
          <div className="prose prose-invert max-w-none space-y-1">
            {currentSection && renderContent(currentSection.content[lang])}
          </div>

          {/* Navegación entre secciones */}
          <div className="flex justify-between mt-16 pt-8 border-t border-white/5">
            {sections.findIndex(s => s.id === activeSection) > 0 ? (
              <button
                onClick={() => {
                  const idx = sections.findIndex(s => s.id === activeSection);
                  setActiveSection(sections[idx - 1].id);
                }}
                className="flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground/80 transition-colors"
              >
                ← {sections[sections.findIndex(s => s.id === activeSection) - 1].title[lang]}
              </button>
            ) : <div />}

            {sections.findIndex(s => s.id === activeSection) < sections.length - 1 && (
              <button
                onClick={() => {
                  const idx = sections.findIndex(s => s.id === activeSection);
                  setActiveSection(sections[idx + 1].id);
                }}
                className="flex items-center gap-2 text-sm text-primary hover:brightness-125 transition-colors"
              >
                {sections[sections.findIndex(s => s.id === activeSection) + 1].title[lang]} →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
