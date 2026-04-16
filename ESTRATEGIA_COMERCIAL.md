# ProcureAI: Estrategia Comercial y Go-To-Market

Este documento contiene la estrategia consolidada de Product Marketing, Pricing y Ventas para **ProcureAI**, orientada exclusivamente a clientes corporativos B2B.

---

## A. Estrategia de marketing

### ICP Ideal (Ideal Customer Profile)
- **Empresas:** Medianas y grandes empresas ($50M+ de facturación anual) con áreas de compras centralizadas o híbridas.
- **Decisores:** Chief Procurement Officer (CPO), Head of Purchasing, Supply Chain Director, CFO.
- **Usuarios Finales:** Compradores, Category Managers, Analistas de Compras.
- **Contexto:** Manejan alto volumen de proveedores, sufren demoras en la aprobación de contratos y les cuesta asegurar que cada comprador aplique las políticas internas de forma consistente.

### Principales Dolores
1. **Pérdida de memoria institucional:** Cuando un comprador senior se va, se lleva el "know-how" de cómo negociar con ciertos proveedores.
2. **Falta de cumplimiento (Compliance Risk):** Negociaciones que ignoran límites de presupuesto o políticas corporativas por falta de control en tiempo real.
3. **Ciclos de negociación lentos:** El análisis manual de benchmarks y el rebote interno con Legales/Finanzas demora semanas.
4. **Asimetría de información:** Los proveedores suelen tener más datos del mercado que el comprador corporativo.

### Propuesta de Valor
**ProcureAI empodera a tu equipo de compras para negociar más rápido, con menor riesgo y asegurando el máximo ahorro.** Combina la inteligencia de tus propios playbooks con análisis de mercado en tiempo real, garantizando que ninguna comunicación salga sin supervisión humana.

### Posicionamiento
El "Copiloto Estratégico de Procurement". No reemplaza al comprador, sino que elimina la carga operativa del análisis y redacción, dándole "superpoderes" analíticos y asegurando que negocie como tu mejor empleado el 100% de las veces.

### Mensajes Clave
- **"Estandarizá la excelencia en cada negociación:"** Todos tus compradores aplicando las mejores prácticas corporativas automáticamente.
- **"Inteligencia Artificial con control total:"** La IA analiza y redacta; vos tenés la última palabra antes de enviar cualquier propuesta (Human-in-the-loop).
- **"Privacidad sin concesiones:"** Tus contratos y estrategias no entrenan modelos públicos. Despliegue On-Premise (Ollama) o Cloud seguro (Gemini).

### Objeciones Típicas y Respuestas
- **Objeción:** "No confío en que la IA negocie por mi empresa, puede cometer errores costosos."
  - **Respuesta:** *ProcureAI nunca envía mensajes por sí solo. Funciona como un redactor y analista experto (Human-in-the-loop). El control final y la aprobación siempre están en manos de tu equipo.*
- **Objeción:** "Nuestros datos de contratos son ultra-confidenciales."
  - **Respuesta:** *Entendemos el riesgo. Por eso ofrecemos despliegue On-Premise con modelos locales (Ollama), garantizando que ningún dato salga de tu red corporativa.*
- **Objeción:** "Ya tenemos un ERP (ej. SAP Ariba) para compras."
  - **Respuesta:** *ProcureAI no reemplaza tu ERP transaccional, se integra vía API. Aporta la capa estratégica de negociación y análisis que los ERPs tradicionales no tienen.*

### Canales Recomendados
- **Outbound B2B (ABM):** Campañas dirigidas por LinkedIn y Cold Email a CPOs y CFOs de un listado de cuentas target.
- **Eventos y Webinars:** Participación en ferias de Supply Chain y webinars educativos sobre "El futuro de las compras corporativas con IA".
- **Casos de Estudio / Whitepapers:** Contenido profundo mostrando ROI real y mitigación de riesgos.

### Etapas del Funnel
1. **Awareness:** Posts en LinkedIn sobre riesgos de compliance y casos de "maverick spend".
2. **Consideration:** Calculadora de ROI (ahorro en TCO vs costo del software) y Webinars en vivo.
3. **Decision:** Prueba de Concepto (PoC) guiada de 30 días usando un playbook real del cliente.

---

## B. Estrategia de Pricing / Packaging

### Criterio de Pricing Recomendado
El modelo recomendado es **Platform Fee + Tiers por Volumen de Proveedores/Negociaciones Activas**.
*No recomendamos cobrar por usuario/asiento* porque el objetivo es que **todo** el equipo lo use para unificar criterios. Cobrar por asiento fomenta el uso compartido de contraseñas y reduce la adopción institucional. La métrica de valor es el volumen de operaciones optimizadas.

### 3 Planes Sugeridos

#### 1. Plan Professional (Cloud)
- **Ideal para:** Equipos de compras medianos buscando agilizar procesos estándar.
- **Incluye:**
  - Despliegue Cloud seguro (basado en Gemini).
  - Usuarios ilimitados.
  - Hasta 50 negociaciones activas / mes.
  - RAG estándar con 3 playbooks corporativos.
  - Análisis de riesgo de proveedor básico.
  - Soporte vía email.
- **Precio referencial:** $X,XXX / año.

#### 2. Plan Enterprise (Cloud / Híbrido)
- **Ideal para:** Grandes corporaciones con políticas complejas y presupuestos estrictos.
- **Incluye:**
  - Todo lo del plan Professional.
  - Volumen personalizado (ej. 200+ negociaciones / mes).
  - RAG avanzado con documentos ilimitados y políticas multi-región.
  - Límites por presupuesto, alertas de compliance y benchmarks del mercado.
  - Integración completa vía API / FastAPI a sistemas internos (ERPs).
  - Customer Success Manager dedicado.
- **Precio referencial:** Custom (basado en volumen, típicamente $XX,XXX / año).

#### 3. Plan Secure / On-Premise
- **Ideal para:** Bancos, sector salud o empresas con regulaciones de privacidad extremas.
- **Incluye:**
  - Todo lo del Enterprise.
  - Despliegue local (On-Premise) usando infraestructura propia con Ollama.
  - Garantía de "Zero Data Sharing" (ningún dato va a la nube pública).
  - SLA de soporte 24/7 y asistencia en instalación de infraestructura.
- **Precio referencial:** Setup Fee alto + Licencia/Mantenimiento Anual.

### Pros y Contras del Enfoque
- **Pros:** Elimina fricción de adopción interna (asientos ilimitados). Alinea el precio con el valor real (cuantas más negociaciones asiste, más valor genera).
- **Contras:** Requiere controlar y comunicar claramente qué se considera una "negociación activa" para evitar fricciones en la facturación.

**Recomendación final:** Empezar con contratos anuales (Plan Enterprise como ancla principal) para garantizar tiempo de adopción y configuración del RAG, cobrando un setup fee inicial por la curación e ingesta de los playbooks del cliente.

---

## C. Presentación Comercial (Pitch Deck)

**Estructura sugerida de slides:**

- **Slide 1: Título**
  - *Título:* ProcureAI
  - *Subtítulo:* El copiloto de negociación que escala la rentabilidad y el control de tu equipo de compras.
- **Slide 2: El Problema**
  - Las negociaciones corporativas son lentas, manuales y los criterios están descentralizados.
  - El conocimiento de los mejores compradores se va cuando rota el personal.
  - Se pierde valor (TCO) por falta de benchmarks cruzados o políticas que no se aplican en el día a día.
- **Slide 3: La Solución (ProcureAI)**
  - Una plataforma SaaS B2B que ingiere tus playbooks y asiste en tiempo real a tus compradores, analizando proveedores y redactando estrategias óptimas.
- **Slide 4: ¿Cómo funciona?**
  - *Gráfico de 4 pasos:*
    1. **Contexto:** Ingesta tu política corporativa (RAG) y los correos del proveedor.
    2. **Análisis:** Cruza datos con benchmarks del mercado y detecta riesgos.
    3. **Estrategia:** Genera un borrador de respuesta respetando tus límites presupuestarios.
    4. **Aprobación (Human-in-the-loop):** Tu equipo revisa, ajusta si es necesario, y envía.
- **Slide 5: Beneficios Core**
  - Reducción directa del Total Cost of Acquisition.
  - 100% de trazabilidad y Compliance.
  - Reducción de los ciclos de negociación.
  - Institucionalización del conocimiento tácito.
- **Slide 6: Seguridad y Despliegue (Pruebas de confianza)**
  - Opciones de arquitectura para empresas modernas:
    - *Cloud Seguro:* Modelos Gemini con máxima encriptación.
    - *On-Premise:* Despliegue 100% local con Ollama para privacidad absoluta.
  - APIs listas para integrarse a tu flujo actual.
- **Slide 7: Casos de Uso Frecuentes**
  - Renovación anual de licencias SaaS.
  - Contratos de servicios de facility management o logística.
  - Evaluación de nuevos proveedores estratégicos frente a benchmarks.
- **Slide 8: Cierre Comercial**
  - *Pregunta clave:* "¿Cuánto margen estás dejando en la mesa por falta de estandarización en tus compras?"
  - *CTA:* Agendemos un análisis de viabilidad (PoC) de 30 días con tus propios playbooks.

---

## D. Mensaje de venta inicial (Outbound)

### Versión para Email (Cold Email)
**Asunto:** Reducción de TCO y cumplimiento en tus negociaciones de compras

Hola [Nombre],

He notado que en [Empresa] manejan un volumen crítico de proveedores. Uno de los mayores desafíos para los líderes de compras hoy es asegurar que su equipo negocie aplicando consistentemente los playbooks corporativos sin dilatar los tiempos.

En ProcureAI desarrollamos un copiloto de IA para equipos de procurement. La plataforma ingiere tus políticas y ayuda a tus compradores a analizar riesgos, comparar benchmarks y redactar respuestas comerciales, siempre manteniendo la decisión final en un humano.

¿Estarías abierto a una breve charla de 15 minutos la semana que viene para mostrarte cómo mitigamos riesgos y reducimos ciclos de negociación?

Saludos,

### Versión para LinkedIn (Mensaje Corto)
Hola [Nombre], vi el crecimiento de [Empresa]. ¿Cómo están asegurando hoy que todo el equipo de compras siga exactamente los playbooks y no pierdan memoria institucional ante la rotación? Hemos creado una IA para Procurement que estandariza estas estrategias, con opciones 100% On-Premise por seguridad. ¿Te interesaría ver cómo funciona en 10 min?

### Versión para Llamada Comercial (Cold Call / Pitch 30s)
"Hola [Nombre], soy [Tu Nombre] de ProcureAI. Sé que no me estabas esperando, seré muy breve.

Ayudamos a líderes de compras a evitar fugas de capital y problemas de compliance. Nuestra plataforma usa inteligencia artificial para analizar propuestas de proveedores y sugerirle a tus compradores exactamente cómo negociar, basándose en *tus* políticas internas corporativas. Tu equipo siempre tiene la última palabra.

Me gustaría saber, actualmente, ¿cómo aseguran que todos apliquen los mismos criterios de rentabilidad antes de aprobar un contrato? [Silencio y escuchar]".

---

## Supuestos y preguntas abiertas

1. **Supuesto de Integración:** Se asume que ProcureAI actuará en paralelo o se integrará al flujo de correos/ERP. *Pregunta abierta para el equipo:* ¿Existen ERPs específicos (como SAP Ariba, Coupa o Jaggaer) con los que ProcureAI deba integrarse nativamente en esta etapa inicial?
2. **Supuesto de Seguridad:** Se asume que las empresas Enterprise exigirán la versión On-Premise o garantías estrictas cloud. *Pregunta abierta:* ¿Tenemos la capacidad operativa para dar soporte On-Premise en el tier más alto desde el día 1, o empujaremos la versión Cloud al inicio?
3. **Setup Inicial:** *Pregunta abierta:* Ingestar playbooks en el sistema RAG puede requerir limpieza de datos del cliente. ¿Ofreceremos este "Setup/Onboarding" de forma gratuita como gancho de venta o se cobrará un Implementation Fee separado?

---

### Resumen Ejecutivo
**ProcureAI** se posiciona como una herramienta B2B estratégica (no transaccional) para líderes de Compras (CPOs), ofreciendo reducción de TCO, cumplimiento garantizado y escalabilidad del conocimiento mediante IA asistida (Human-in-the-loop). Su Go-to-Market prioriza la venta consultiva de confianza —destacando opciones On-Premise— y un modelo de precios basado en volumen de negociaciones en lugar de asientos, para lograr que la plataforma se convierta en el estándar institucional de toda el área de compras.
