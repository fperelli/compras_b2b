# Architecture

Este documento describe la arquitectura técnica del agente de negociación B2B.

El sistema está diseñado como un **AI Agent con herramientas externas, memoria y recuperación de conocimiento (RAG)**.

## Componentes principales

1. LLM Engine
2. Agent Controller
3. Tools Layer
4. Memory Layer
5. RAG Layer
6. Human Approval Interface
7. Data Storage

---

## 1. LLM Engine

El modelo de lenguaje es responsable de:
* analizar contexto de negociación
* seleccionar estrategia
* generar propuestas
* redactar mensajes al proveedor
* explicar decisiones

El modelo **no es fuente de datos**.
Toda información debe provenir de:
* herramientas
* memoria
* documentos recuperados.

---

## 2. Agent Controller

El controlador del agente gestiona el flujo de ejecución.

Responsabilidades:
* recibir solicitudes
* invocar herramientas
* mantener el estado de la negociación
* validar reglas de negocio
* llamar al LLM

**Flujo simplificado:**
`Request` -> `Controller` -> `Tools / RAG` -> `LLM` -> `Negotiation Decision`

---

## 3. Tools Layer

Las herramientas proporcionan datos estructurados al agente.

Ejemplos:
* supplier history
* market benchmarks
* budget validation
* risk evaluation

Las herramientas son la fuente principal de verdad.

---

## 4. Memory Layer

El sistema mantiene dos tipos de memoria.

### Short term memory
Estado actual de la negociación. Incluye:
* ofertas realizadas
* respuestas del proveedor
* estrategia actual

### Long term memory
Datos históricos:
* precios pagados
* contratos anteriores
* desempeño del proveedor

---

## 5. RAG Layer

El sistema utiliza Retrieval Augmented Generation para recuperar información relevante.

Fuentes:
* contratos históricos
* políticas internas
* benchmarks de mercado
* documentación legal

**Flujo:**
`query` -> `vector search` -> `document retrieval` -> `context for LLM`

Esto reduce alucinaciones y mejora precisión.

---

## 6. Human Approval Interface

Antes de enviar cualquier comunicación externa:
* un humano debe aprobar el mensaje
* el sistema registra la decisión

Esto reduce riesgos operativos.

---

## 7. Data Storage

El sistema utiliza almacenamiento persistente para:
* negociaciones
* ofertas
* respuestas
* logs
* métricas