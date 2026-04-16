# Guía del Agente de Compras — ProcureAI v1.0

> **Para el equipo de procurement y compradores corporativos**
> Esta guía explica cómo usar ProcureAI en tu trabajo diario de negociación B2B con proveedores.
> No necesitás conocimientos técnicos para entenderla.

---

## 1. ¿Qué es ProcureAI y para qué sirve?

ProcureAI es tu **asistente de inteligencia artificial para negociaciones de compras corporativas**. En lugar de negociar manualmente desde cero con cada proveedor, el sistema analiza el contexto completo y te propone la mejor estrategia.

### Lo que el sistema hace por vos

- **Analiza al proveedor**: Revisa el historial de comportamiento, tiempos de entrega y cumplimiento de acuerdos anteriores.
- **Consulta precios de mercado**: Compara el precio propuesto contra los benchmarks de mercado de tu categoría.
- **Aplica tus políticas**: Usa los límites presupuestarios y las reglas de negociación de tu empresa automáticamente.
- **Redacta el mensaje**: Propone un texto profesional listo para enviar al proveedor.
- **Te acompaña en el chat**: Podés consultarle cualquier duda durante la negociación en tiempo real.

### Lo que VOS decidís siempre

- Si aprobás o no cada oferta antes de que salga.
- Si ajustás el texto del mensaje.
- Si cerrás o escalás la negociación.

> El sistema **nunca envía nada sin tu aprobación explícita**. Siempre sos vos quien tiene la última palabra.

---

## 2. Cómo navegar la plataforma

El menú lateral izquierdo te da acceso a todas las secciones:

| Sección | Para qué la usás |
|---------|-----------------|
| **Panel** | Resumen del día — métricas de ahorro y negociaciones activas |
| **Negociaciones** | Lista completa de todos tus casos activos y pasados |
| **Proveedores** | Directorio de proveedores y punto de partida para negociaciones nuevas |
| **Analítica** | Reportes de ahorro, rendimiento y tendencias |
| **Configuración** | Preferencias del sistema (solo para administradores) |
| **Manual** | Esta guía, disponible en cualquier momento |

En la parte inferior del menú hay un **toggle de idioma** (🇦🇷 / 🇺🇸) para cambiar entre Español e Inglés.

---

## 3. El Panel de Control — Tu vista diaria

Al ingresar, el Panel te muestra cuatro números clave:

**Negociaciones Activas**: Cuántos casos están en curso ahora mismo. Si el número es alto, priorizá los que tienen fecha de entrega más próxima.

**Acuerdos Completados**: Total de negociaciones cerradas este mes.

**Ahorro Promedio**: El porcentaje que estás ahorrando respecto al precio inicial del proveedor. Un buen benchmark es entre 5% y 15% según la categoría.

**Proveedores Activos**: Proveedores con los que tenés operaciones vigentes.

---

## 4. Iniciar una negociación — Paso a paso

### Opción A: Desde el directorio de Proveedores (más común)

1. Hacé clic en **Proveedores** en el menú lateral.
2. Buscá el proveedor con quien necesitás negociar (podés usar el buscador arriba a la derecha).
3. Hacé clic en la fila del proveedor. Se abre el panel de inicialización.
4. Completá los tres campos:

| Campo | Qué ingresar | Ejemplo |
|-------|-------------|---------|
| **Volumen (Unidades)** | Cantidad total que necesitás comprar | `50` |
| **Precio Objetivo (USD)** | El precio ideal que querés lograr por unidad | `800` |
| **Precio Máximo** | El tope absoluto. El sistema nunca lo supera | `950` |

5. Hacé clic en **"Iniciar Flujo de Negociación"**.
6. El sistema te lleva automáticamente a la Sala de Negociación.

### Opción B: Desde la sección Negociaciones

1. Hacé clic en **Negociaciones** en el menú.
2. Hacé clic en el botón **"+ Nueva"** arriba a la derecha.
3. Completá el formulario con los datos del proveedor y del pedido.

> ⚠️ **Consejo sobre el Precio Máximo**: Este es el límite que no podés cruzar según las políticas de tu empresa. Si el proveedor no acepta nada por debajo de ese valor, la negociación no es viable y debés escalarla o buscar alternativas.

---

## 5. La Sala de Negociación — Centro de operaciones

Esta pantalla es donde transcurre todo el trabajo. Está dividida en dos zonas.

### Zona izquierda — El caso en vivo

**Encabezado del caso**

Arriba ves el nombre del proveedor, la categoría del producto y el ID del caso (útil para referencias internas). El estado puede ser:
- `Caso en Vivo` — Negociación activa, el motor de IA está procesando
- `Falla del Sistema` — Problema de conectividad con el motor (avisá a IT)
- `Completada` — La negociación fue cerrada y aprobada

**Tres indicadores de precio**

Los tres cuadros de métricas te muestran de un vistazo:
- **Precio Objetivo**: Tu meta (debería estar en verde)
- **Límite Máximo**: El tope permitido (en amarillo)
- **Estado**: Si el motor de estrategia está en línea o no

**Historial de Auditoría**

Una línea de tiempo con todo lo que pasó en esta negociación. Cada movimiento queda registrado: qué propuso el agente, qué respondió el proveedor, y el razonamiento usado. Este historial no se puede borrar — es la trazabilidad del caso.

Ejemplo de lo que verías en el historial:
```
AGENTE IA — Oferta Inicial       → USD 800  "Basado en precio objetivo"
TECHCORP  — Contraoferta         → USD 920  "Problemas de stock"
AGENTE IA — Revisión Estratégica → --       "Analizando posición táctica..."
```

**Borrador de Respuesta**

El texto que el sistema propone enviar al proveedor. Es completamente editable — podés cambiar cualquier parte antes de aprobar.

Ejemplo de borrador:
> *"Estimado equipo de TechCorp, agradecemos la propuesta recibida. Tras evaluar los benchmarks de mercado y nuestras necesidades operativas, nos permitimos proponer una oferta de USD 845 por unidad para un volumen de 50 unidades, con condiciones de pago a 30 días. Quedamos atentos a su respuesta."*

Para aprobar: hacé clic en **"Confirmar y Enviar"** debajo del texto, o en **"Aprobar Respuesta"** en el encabezado de la página.

---

### Zona derecha — El Arquitecto de Estrategia

Este panel flotante es tu asesor inteligente. Tiene tres pestañas.

---

## 6. Las tres pestañas del Arquitecto

### 📊 Pestaña "Estrategia"

Acá está el análisis completo del agente dividido en tres bloques:

#### Narrativa Central

Un análisis contextual que explica la situación de mercado y la posición del proveedor. Leelo antes de aprobar cualquier oferta.

**Ejemplo real de lo que verías:**
> *"TechCorp Argentina opera con un margen del 18% sobre el precio promedio regional para laptops empresariales. Su historial en los últimos 12 meses muestra 2 negociaciones exitosas con descuentos de 8-12%. Actualmente el mercado de laptops está en baja por exceso de stock post-pandemia. Hay palanca táctica significativa."*

#### Sugerencia de Precio IA

El precio concreto recomendado como punto de partida para la negociación. Ejemplo: `USD 845`. Este número ya considera tus límites y el contexto de mercado.

#### Táctica Clave

El "hack" táctico más relevante para este caso. Puede ser:
- *"Fin de trimestre fiscal: el proveedor necesita cerrar ventas. Presioná por volumen."*
- *"Mencioná que estás evaluando dos proveedores alternativos para este lote."*
- *"Ofrecé pago anticipado a 15 días a cambio de un descuento adicional del 3%."*

---

### 💬 Pestaña "Chat" — Cómo conversas con el agente

El chat te permite dialogar con el agente en tiempo real para ajustar la estrategia.

#### ¿Cuándo usar el chat?

**Situación 1 — El proveedor rechazó tu oferta inicial**
> "El proveedor me dijo que no puede bajar de USD 890 porque sus costos de importación subieron. ¿Cómo continúo?"

**Situación 2 — Nueva información cambió el contexto**
> "El proveedor mencionó que tiene exceso de stock del modelo anterior. ¿Cómo aprovecho esto?"

**Situación 3 — Querés comparar opciones**
> "Si acepto los USD 890 pero negocio pago a 90 días, ¿me conviene financieramente?"

**Situación 4 — Tenés dudas sobre la táctica**
> "¿Por qué el agente recomienda empezar en USD 800 si el mercado está en USD 850?"

**Situación 5 — El proveedor dio un argumento que no sabés cómo rebatir**
> "Dice que el aumento se debe al tipo de cambio. ¿Es válido ese argumento para este producto?"

#### Cómo escribirle al agente

1. Hacé clic en el cuadro de texto abajo en el panel derecho.
2. Escribí tu pregunta en lenguaje natural, como si hablaras con un colega.
3. Presioná **Enter** o el botón ↗.
4. La respuesta aparece en segundos.

> 💡 **Clave para mejores respuestas**: Cuanto más contexto le des, mejor responde. En lugar de "¿qué hago?", escribí "el proveedor dice X, yo ofrecí Y, la fecha límite es Z — ¿qué hago?"

#### Qué puede y qué no puede hacer el chat

**Puede hacer:**
- Sugerirte tácticas de negociación específicas
- Explicarte por qué recomienda un precio
- Redactarte variantes del mensaje al proveedor
- Analizar el argumento del proveedor
- Ayudarte a calcular el impacto de distintas condiciones de pago

**No puede hacer:**
- Enviar mensajes al proveedor (eso siempre lo aprobás vos)
- Acceder a información externa en tiempo real (cotizaciones del día, noticias)
- Tomar decisiones por vos
- Ver emails o chats que tuviste fuera del sistema

---

### ⚠️ Pestaña "Riesgo"

Lista de los riesgos identificados por el agente para esta negociación específica.

**Tipos de riesgo que puede identificar:**

| Tipo de Riesgo | Qué significa para vos |
|----------------|------------------------|
| **Dependencia Única** | Este es el único proveedor del producto. Si falla, no tenés alternativa. |
| **Historial de Demoras** | El proveedor tuvo incumplimientos en plazos anteriores. Pedí garantías. |
| **Concentración de Gasto** | Ya gastás demasiado con este proveedor. Diversificá. |
| **Riesgo de Precio** | El precio propuesto tiene alta variabilidad histórica. |
| **Riesgo de Compliance** | Hay información pendiente de validar sobre el proveedor. |

> **¿Qué hacer si hay riesgos?** Leelos antes de aprobar. Podés consultarle al chat cómo mitigar cada uno, o incluir cláusulas específicas en la negociación (ej: penalidades por demora, garantías de stock).

---

## 7. Aprobar y cerrar una negociación

Cuando llegaste a un acuerdo con el proveedor:

1. Revisá el **Borrador de Respuesta** por última vez.
2. Editá el texto si querés hacer algún ajuste final.
3. Hacé clic en **"Confirmar y Enviar"** (en el borrador) o **"Aprobar Respuesta"** (en el encabezado).
4. El sistema muestra una notificación de confirmación y cambia el estado a `Completada`.
5. En 2-3 segundos te lleva de vuelta al listado de negociaciones.

Todo queda registrado en el historial de auditoría con fecha, hora y los términos del acuerdo.

---

## 8. Casos especiales y qué hacer en cada uno

### El motor de IA está fuera de línea

Si ves el mensaje *"Arquitecto con Demora"* o *"Motor Fuera de Línea"*:

1. Hacé clic en **"Forzar Conexión"** para intentar reconectar.
2. Si el problema persiste, avisá al equipo de IT.
3. Podés seguir viendo el historial del caso mientras esperás.

### El proveedor rechazó varias ofertas

Si ya hiciste 2-3 rondas sin acuerdo:

1. Usá el chat: *"Después de 3 rondas sin acuerdo, ¿cuándo recomendás escalar o buscar alternativa?"*
2. El agente puede ayudarte a evaluar si el BATNA (mejor alternativa) es más conveniente.
3. Si decidís no seguir, podés cerrar la negociación como "Cancelada".

### Necesitás incluir condiciones especiales

Si necesitás agregar cláusulas fuera de lo estándar (ej: penalidad por demora, exclusividad, garantía extendida):

1. Editá directamente el borrador de respuesta antes de aprobar.
2. También podés preguntarle al agente: *"Redactame una cláusula de penalidad por demora de entrega para incluir en este mensaje."*

### El proveedor responde fuera del sistema

Si el proveedor te contestó por email o teléfono, podés informarle al agente en el chat:

> "El proveedor me llamó y me dijo que acepta USD 870 si confirmamos esta semana. ¿Cómo registro esto y qué hago?"

---

## 9. Gestión del Directorio de Proveedores

### Qué ves en la tabla

| Columna | Qué informa |
|---------|-------------|
| **Proveedor** | Nombre y alerta si hay algo urgente que revisés |
| **Clasificación** | Categoría de productos (Tecnología, Logística, Servicios, etc.) |
| **Estabilidad** | `Bajo`, `Medio` o `Alto` riesgo — evaluado por el agente |
| **Flujo Anual** | Gasto total acumulado con ese proveedor en el año fiscal |
| **Rendimiento** | Calificación de 1 a 5 basada en historial de entregas y cumplimiento |

### Los indicadores de riesgo

- 🟢 **Riesgo Bajo**: Proveedor confiable, historial sólido. Podés negociar con confianza.
- 🟡 **Riesgo Medio**: Hay alertas menores. Revisá la pestaña de Riesgo antes de negociar.
- 🔴 **Riesgo Alto**: Señales preocupantes. Consultá con tu jefe antes de comprometer presupuesto.

---

## 10. Analítica — Cómo leer tus resultados

La sección Analítica te muestra el rendimiento de tus negociaciones.

**Ahorros en el Tiempo**: Gráfico de evolución mensual. Si la curva sube, estás logrando mejores resultados. Si baja, revisá si cambiaron las condiciones de mercado o si hay categorías donde el sistema necesita más contexto (podés subir políticas actualizadas en Configuración).

**Negociaciones por Categoría**: Qué tipos de compras concentran más actividad. Útil para priorizar dónde entrenar más al equipo.

**Rendimiento de Proveedores**: Comparativa de calificaciones. Identificá quiénes son tus mejores socios y quiénes necesitan revisión.

**Tiempo de Ciclo Promedio**: Cuántos días tarda una negociación de inicio a cierre. El objetivo habitual es menos de 5 días hábiles para compras estándar.

---

## 11. Buenas prácticas para mejores resultados

### Antes de negociar
- Revisá siempre la pestaña **Riesgo** antes de hacer tu primera oferta.
- Leé la **Narrativa Central** para entender el contexto de mercado.
- Si tenés información reciente sobre el proveedor (llegó tarde, cambió de dueño, etc.), informásela al agente en el chat **antes** de iniciar.

### Durante la negociación
- Usá el chat cada vez que el proveedor dé una respuesta inesperada.
- No aceptes el primer "no" — preguntale al agente cómo manejar la objeción.
- Si el proveedor da argumentos que desconocés, validalos con el agente antes de ceder.

### Al cerrar
- Siempre revisá el borrador final antes de aprobar.
- Asegurate de que los términos de pago queden claros en el mensaje.
- Si acordaste algo verbalmente que no está en el borrador, editalo antes de cerrar.

---

## 12. Preguntas frecuentes

**¿El sistema envía el mensaje directamente al proveedor?**
No. Genera el borrador pero siempre necesita tu aprobación. Vos tenés el control final.

**¿Puedo editar el texto que propone el agente?**
Sí, el cuadro del borrador es completamente editable.

**¿Qué hago si el agente recomienda un precio que me parece muy bajo?**
Consultale en el chat por qué llegó a ese número y pedile que ajuste la estrategia.

**¿El historial de negociaciones se guarda para siempre?**
Sí, todo queda registrado. Podés acceder a cualquier negociación pasada desde la sección Negociaciones.

**¿El agente entiende modismos del español latinoamericano?**
Sí, está entrenado para comunicarse en español latinoamericano con vocabulario de compras corporativas.

**¿Qué hago si el chat dice "No pude procesar tu consulta"?**
Avisá al equipo de IT. Mientras tanto, podés usar la estrategia que ya generó el agente en la pestaña Estrategia.

**¿Puedo usar el chat aunque el análisis inicial ya esté completo?**
Sí, en cualquier momento de la negociación.

**¿Puedo iniciar varias negociaciones al mismo tiempo?**
Sí, podés tener múltiples casos activos. Cada uno tiene su propia sala de negociación.

**¿Qué pasa si cometí un error en el precio máximo al crear el caso?**
Contactá al administrador del sistema para que pueda corregirlo desde la configuración.

---

## 13. Glosario

| Término | Significado |
|---------|-------------|
| **Precio Objetivo** | El precio ideal que querés alcanzar |
| **Precio Máximo / Límite** | El tope absoluto permitido por políticas de la empresa |
| **Arquitecto de Estrategia** | El asistente de IA que analiza y recomienda |
| **RAG** | Base de conocimiento con las políticas de tu empresa que usa el agente |
| **Playbook** | Conjunto de reglas tácticas de negociación de tu empresa |
| **Historial de Auditoría** | Registro completo e inmutable de todos los movimientos del caso |
| **Contraoferta** | La respuesta estratégica a la propuesta del proveedor |
| **Ancla Inicial** | El primer precio que se propone; define el tono de la negociación |
| **Concesión** | Un movimiento de precio o condición que cedés para avanzar |
| **BATNA** | Mejor alternativa si no hay acuerdo (Best Alternative To Negotiated Agreement) |
| **Benchmark** | Precio de referencia del mercado para comparar la oferta del proveedor |
| **Riesgo de Proveedor** | Evaluación de confiabilidad financiera, operativa y de cumplimiento |

---

*ProcureAI — Guía del Agente de Compras v1.0*
*Para uso interno del equipo de procurement*
