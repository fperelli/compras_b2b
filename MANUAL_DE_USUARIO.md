# Manual de Usuario — ProcureAI v1.0

> Plataforma de Negociación B2B Asistida por Inteligencia Artificial

## Introducción

ProcureAI es una plataforma de negociación B2B asistida por inteligencia artificial para equipos de compras corporativas en Latinoamérica.

El sistema combina un agente de IA avanzado con una base de conocimiento corporativa (RAG) para ayudarte a:

- Analizar requerimientos de compra de forma estratégica
- Generar ofertas y contraofertas dentro de tus límites presupuestarios
- Identificar riesgos en proveedores y cadena de suministro
- Mantener historial de auditoría completo por cada negociación
- Aplicar políticas corporativas automáticamente desde tus documentos

---

## Primeros Pasos

1. Accede en `http://localhost:3000`
2. Ve a **Configuración > General**: configura nombre, moneda e idioma
3. Agrega proveedores en **Proveedores**
4. Carga tus políticas en **Configuración > Datos y RAG** (archivos `.txt` o `.md`)

---

## Gestión de Negociaciones

### Crear una nueva negociación

1. **Negociaciones > Nueva**
2. Completa: proveedor, categoría, volumen, precio objetivo, precio máximo, condiciones de pago

### Secciones del análisis

| Sección | Contenido |
|---------|-----------|
| Estrategia | Narrativa de mercado, precio sugerido y táctica clave |
| Riesgo | Riesgos identificados del proveedor y la operación |
| Borrador | Texto listo para enviar al proveedor |

Haz clic en **Aprobar Respuesta** para registrar el cierre.

---

## Arquitecto de Estrategia (Chat)

El chat permite dialogar en tiempo real con el agente de IA ajustando la estrategia.

**Ejemplos de preguntas:**

```
"El proveedor insiste en USD 920. Cual es nuestra proxima contraoferta?"
"Que riesgos tiene contratar un proveedor unico para este componente?"
"Como aprovecho que el proveedor necesita liquidez este trimestre?"
"El proveedor dice que tiene problemas de stock. Como afecta a la negociacion?"
```

> Con modelos Ollama locales (Llama3), el chat responde estratégicamente aunque no ejecute herramientas RAG en tiempo real. Para máxima potencia, usa Gemini en producción configurando `LLM_PROVIDER=gemini`.

---

## Políticas RAG — Base de Conocimiento

| Tipo de documento | Ejemplo |
|-------------------|---------|
| Políticas de gasto | "No se aprueba compras >$50k sin 3 cotizaciones" |
| Playbooks | "Estrategia de ancla: 15% bajo el precio objetivo" |
| Perfiles de proveedores | "TechCorp: 98% entregas a tiempo" |
| Benchmarks de mercado | "Precio laptops Q1 2025: USD 820-950" |

**Flujo de carga:** Configuración > Datos y RAG > arrastra archivo > se indexa automáticamente en ChromaDB.

Para eliminar: usa el botón 🗑️ en **Políticas Activas**.

---

## Arquitectura y Despliegue

La plataforma utiliza una arquitectura de microservicios contenerizada con Docker:

- **Frontend**: Next.js 15 (App Router) con soporte i18n dinámico (Español/Inglés).
- **Agente**: FastAPI (Python 3.13) con procesamiento **asíncrono** para evitar bloqueos durante la inferencia.
- **LLM**: Ollama (local) o Gemini (nube).
- **Memoria**: MongoDB (datos operativos) y ChromaDB (almacén vectorial para RAG).

### Soporte Multi-idioma (i18n)

El sistema detecta automáticamente el idioma del navegador pero permite el cambio manual desde el menú lateral. Las traducciones se gestionan en `frontend/src/lib/i18n/`.

---

## Variables de Entorno Avanzadas

| Variable | Descripción | Default |
|----------|-------------|---------|
| `LLM_PROVIDER` | `ollama` (local) o `gemini` (producción) | `ollama` |
| `OLLAMA_MODEL` | Nombre del modelo en Ollama | `llama3` |
| `OLLAMA_BASE_URL` | URL interna de Docker para Ollama | `http://ollama:11434` |
| `GOOGLE_API_KEY` | API Key de Google AI (para Gemini) | — |
| `MONGODB_URI` | Cadena de conexión MongoDB | `mongodb://mongo:27017` |

---

## Referencia de API

**Base URL:** `http://localhost:8000/api/v1`  
**Swagger UI:** `http://localhost:8000/docs`

> **Nota sobre Asincronía:** Todas las rutas de negociación (`/negotiate`, `/chat`, `/counteroffer`) son ahora no-bloqueantes. Si el modelo está cargando, la API responderá cuando el proceso termine sin congelar el servidor.

---

## Solución de Problemas (Troubleshooting)

### El chat "no responde" o se queda en "Ingesta..."
1. **Carga de Modelo**: Si usas CPU, Llama 3 tarda ~2 minutos en cargar. Verifica con:
   ```bash
   docker logs -f b2b-ollama
   ```
2. **Modelo no encontrado**: Asegúrate de haber bajado el modelo correcto:
   ```bash
   docker exec -it b2b-ollama ollama pull llama3
   ```

### Errores de Compilación TypeScript
Si añades nuevas traducciones y el build falla por tipos, el sistema usa un tipado flexible `Record<Lang, any>` en `index.tsx` para permitir discrepancias menores entre idiomas.

### Reinicio Limpio
Si el sistema se comporta de forma errática tras un cambio de configuración:
```bash
docker-compose down
docker-compose up -d --build
```
