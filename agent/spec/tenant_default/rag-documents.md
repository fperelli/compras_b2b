# 1. Propósito

Este documento define qué fuentes documentales alimentan el sistema de Retrieval Augmented Generation (RAG) del B2B Procurement Negotiation Agent.

El objetivo del RAG es:
* proporcionar datos confiables al agente
* reducir alucinaciones del modelo
* garantizar que las recomendaciones se basen en información verificable
* permitir trazabilidad de decisiones

El modelo de lenguaje no debe generar información fuera de las fuentes disponibles.

# 2. Tipos de documentos utilizados por el RAG

El sistema debe indexar distintos tipos de documentos relevantes para el proceso de compras.

## 2.1 Historial de negociaciones

Contiene información de negociaciones anteriores con proveedores.

Ejemplos de contenido:
* precios acordados
* condiciones de pago
* tiempos de entrega
* volumen negociado
* duración del contrato
* comportamiento del proveedor en negociaciones previas

Campos recomendados:
* `supplier_id`
* `supplier_name`
* `category`
* `negotiation_date`
* `price`
* `payment_terms`
* `delivery_time`
* `volume`
* `contract_duration`
* `negotiation_notes`

Uso por el agente:
* identificar patrones de negociación
* estimar margen de reducción de precio
* evaluar comportamiento del proveedor

## 2.2 Benchmarks de mercado

Contiene referencias de precios del mercado.

Ejemplos:
* precios promedio por categoría
* rangos de precios
* tendencias de mercado

Estructura sugerida:
* `category`
* `market_price`
* `price_range`
* `trend`

# 5. Reglas de uso de RAG

El agente debe cumplir las siguientes reglas:

## 5.1 Uso obligatorio de contexto
Antes de generar una recomendación el agente debe:
* consultar fuentes relevantes
* recuperar documentos aplicables

## 5.2 Prohibición de generación inventada
El agente no puede generar información que no exista en:
* datos de entrada
* herramientas del sistema
* documentos del RAG

## 5.3 Referencia implícita de datos
Cuando el agente utilice información del RAG debe:
* reflejar esa información en su razonamiento
* justificar decisiones con esos datos

*Ejemplo:*
"El precio histórico del proveedor en esta categoría fue de X durante los últimos contratos."

# 6. Actualización del conocimiento

El sistema debe permitir actualización periódica de documentos.

Recomendaciones:
* **Benchmarks de mercado** → actualización mensual
* **Evaluaciones de proveedores** → actualización trimestral
* **Contratos históricos** → actualización al cerrar cada negociación

# 7. Beneficios del uso de RAG

El uso de RAG permite:
* reducir alucinaciones del modelo
* mejorar precisión de recomendaciones
* garantizar cumplimiento de políticas
* permitir auditoría de decisiones

## Estructura recomendada de carpeta

Ejemplo de organización:
```text
rag/
 ├── benchmarks/
 │    market_prices.json
 │
 ├── supplier-history/
 │    supplier_negotiations.json
 │
 ├── policies/
      internal_rules.pdf