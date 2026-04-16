# B2B Procurement Negotiation Agent

# 1. Descripción general

El B2B Procurement Negotiation Agent es un asistente de inteligencia artificial diseñado para apoyar a equipos de compras en procesos de negociación con proveedores.

El agente analiza requerimientos de compra, historial de negociaciones y contexto de mercado para:
* Sugerir estrategias de negociación
* Redactar ofertas o contraofertas
* Identificar riesgos
* Optimizar el costo total de adquisición (TCO)

**Nota importante:**
El agente no negocia de forma autónoma ni toma decisiones finales. Todas las acciones requieren revisión o aprobación humana.

Las reglas operativas y límites del agente están definidos en:
* `agent-rules.md`
* `negotiation-playbook.md`

# 2. Objetivos del sistema

## Objetivo principal
Optimizar el Costo Total de Adquisición (TCO) manteniendo relaciones sostenibles con proveedores.

## Objetivos secundarios
Mejorar condiciones comerciales:
* Precio unitario
* Descuentos por volumen
* Condiciones de pago
* Plazos de entrega

* Aumentar la eficiencia del proceso de negociación
* Estandarizar la toma de decisiones del equipo de compras
* Mantener trazabilidad y justificación de cada propuesta generada

# 3. Alcance del agente

El agente puede asistir en:
* Preparación de negociaciones
* Generación de ofertas iniciales
* Generación de contraofertas
* Análisis comparativo contra benchmarks
* Análisis de historial con proveedores
* Detección de riesgos comerciales
* Redacción de mensajes de negociación

---

# 14.6 Human Approval Layer

Antes de enviar cualquier comunicación externa:
* un humano debe aprobar el mensaje
* el sistema registra la decisión

# 15. Modelo de datos

## 15.1 Supplier
* `supplier_id`
* `supplier_name`
* `supplier_type`
* `industry`
* `risk_score`
* `average_delivery_time`
* `relationship_score`

## 15.2 Purchase Request
* `request_id`
* `category`
* `volume`
* `requested_delivery_date`
* `budget`
* `request_owner`
* `priority`

## 15.3 Negotiation
* `negotiation_id`
* `supplier_id`
* `request_id`
* `negotiation_status`
* `strategy_type`
* `current_stage`
* `created_at`
* `updated_at`

**Estados posibles:**
* `preparation`
* `first_offer`
* `negotiation`
* `agreement_pending`
* `closed`

## 15.4 Offer
* `offer_id`
* `negotiation_id`
* `price`
* `payment_terms`
* `delivery_time`
* `created_by`
* `status`
* `timestamp`

## 15.5 Supplier Response
* `response_id`
* `offer_id`
* `message`
* `proposed_price`
* `proposed_terms`
* `timestamp`

## 15.6 Negotiation Log
* `log_id`
* `negotiation_id`
* `event_type`
* `description`
* `created_at`
* `actor`

# 16. Política de negociación escalonada

La lógica detallada de negociación se define en:
`negotiation-playbook.md`