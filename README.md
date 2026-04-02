# B2B Procurement Negotiation Agent

Agente de negociación impulsado por Inteligencia Artificial (Google Gemini 2.0 Flash) y orquestado mediante **LangGraph**. El sistema fue diseñado para asistir a equipos de compras (Procurement) en procesos B2B, optimizando costos totales de adquisición (TCO) mientras mantiene trazabilidad y cumplimiento de políticas internas.

## 🌟 Características Principales

* **Decisiones basadas en datos (Tool-Augmented):** El agente no inventa cifras. Recupera datos en tiempo real de 4 mock-apis internas:
  * Historial histórico de negociaciones con el proveedor.
  * Benchmarks y tendencias del mercado por categoría.
  * Perfil de riesgo del proveedor.
  * Presupuestos asignados y límites de gasto por departamento.
* **Flujos dinámicos con LangGraph:** Orquesta la toma de decisiones, determinando cuándo pedir qué datos para establecer una estrategia (agresiva, colaborativa o mixta).
* **Motor Base Documental (RAG):** Indexa e interpola conocimiento del *Playbook de negociación*, políticas corporativas y resultados previos para guiar cada mensaje e interacción en la negociación.
* **Doble Interfaz:** CLI interactivo para desarrollo rápido y FastAPI listo para integrarse a ERPs y software de Procurement.
* **Humano en el Medio (HITL):** El agente redacta las propuestas y justifica sus decisiones, pero marca límites claros en la necesidad de revisión y aprobación humana para envío.

---

## 🏗️ Arquitectura del Sistema

```text
compras_b2b/
├── agent/                        # [Docs] Especificación de reglas y playbooks de negociación
├── data/
│   ├── mock/                     # [Base de datos mock] Perfiles de proveedores y presupuestos
│   └── rag/                      # [Documentos RAG] Políticas, benchmarks y negociaciones previas
├── src/
│   ├── agent/                    # [Orquestador] Lógica central LangGraph (ReAct), estado y tools
│   ├── api/                      # [Servicios] Esquemas Pydantic y rutas FastAPI
│   └── rag/                      # [Recuperador] Scripts para vectorizar ChromaDB
├── chroma_db/                    # [Almacén Vectorial] Base de datos local autogenerada
├── main.py                       # CLI para pruebas rápidas de casos (oferta inicial / contraoferta)
└── requirements.txt
```

---

## 🚀 Setup Rápido

### Prerrequisitos
* Python 3.11+
* Archivo `.env` en la raíz (usa `.env.example` como plantilla).

### Variables de entorno necesarias
Consigue una API key de Google AI Studio (tiene capa gratuita generosa para Gemini 2.0 Flash).

```env
GOOGLE_API_KEY=tu_api_key_aqui
```

### Instalación

1. **Crear e inicializar el entorno virtual.**
    ```powershell
    python -m venv .venv
    .venv\Scripts\activate
    ```

2. **Instalar dependencias.**
    ```powershell
    pip install -r requirements.txt
    ```

3. **Indexar conocimiento en ChromaDB (RAG).** Esto leerá todos los playbooks y JSON de datos para alimentar la base del agente.
    ```powershell
    python -m src.rag.loader
    ```

---

## 💻 Ejecución y Pruebas

Tienes dos formas principales de correr y probar el agente:

### 1. Test vía CLI interactivo (main.py)

El CLI corre unos tests precargados (una *ofeta inicial* y una *respuesta a contraoferta*) para mostrar el workflow de razonamiento del modelo y la estructura de salida de 6 secciones.

**Test de Negociación Inicial:**
```powershell
python main.py
```

**Test de Contraoferta (Escenario de respuesta):**
```powershell
python main.py --counteroffer
```

### 2. Uso como API REST (FastAPI)

Excelente si quieres integrar el agente con React/Next.js o un software B2B existente.

**Arrancar servidor HTTP:**
```powershell
python -m uvicorn src.api.main:app --reload
```

* Swagger UI interactivo: [http://localhost:8000/docs](http://localhost:8000/docs)
* Redoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📄 Formato del Agente (Salida esperada)

Cuando envías una consulta, el agente responde respetando siempre este formato de 6 pilares:

1. **Resumen ejecutivo**: Qué se pide y contexto del mercado actual.
2. **Estrategia sugerida**: El por qué del enfoque (Ej. por qué jugar al "buen comprador" vs "presionar precio").
3. **Oferta propuesta**: Límites en el cálculo financiero extraído de los budgets y benchmarks combinados.
4. **Riesgos detectados**: Análisis del SLA del proveedor vs el contexto operativo.
5. **Recomendación para aprobación humana**: Qué debe asegurar el gerente visualmente antes de dar play.
6. **Próximo mensaje**: Un boceto del email amigable y ejecutivo, redactado por Gemini, listo para copiar y pegar.

---

## 🔒 Privacidad y Rate Limit (API)

Al usar la versión gratuita, **Gemini Flash** restringe las llamadas muy rápidas (Request Per Minute). Debido a que *LangGraph* usa múltiples saltos (llamar a un tool, devolver datos al modelo, iterar a otra de las 4 tools), podrías chocar con un Error `429 Too Many Requests`. Si esto sucede, permite enfriar a la API por ~45 segundos y reitenta.
