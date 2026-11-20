---
type: bitacora
updated: 2026-11-20
tags: [postreria, bitacora]
---

# Bitácora

Entradas en orden de incorporación. El [[index|índice]] enlaza el estado actual de cada tema.

## [2026-11-20] ingest | Fuentes del proyecto

Se revisaron la portada y los tipos de página de [[fuentes/nina|Nina con Amore]]. Se guardó la extracción de 192 fichas de [[negocio/catalogo|Fudo]] con precios, descripciones visibles y fotografías. Se registraron horario, ubicación y contacto en [[negocio/la-postreria|La Postrería Café]].

## [2026-11-20] query | Lectura de stock en Fudo

La API documenta lectura de productos y stock registrado. Las capturas confirman activación y un usuario de integración. La prueba con el negocio quedó pendiente de credenciales y comprobación de permisos. Véase [[proyecto/fudo-stock|Stock desde Fudo]].

## [2026-11-20] decision | Alcance de la primera web

Se implementó una carta web en React, TypeScript y Node.js con el pedido en Fudo. Las colecciones y los destacados se eligieron a partir de la carta y se definió una identidad visual crema y vino. Véase [[proyecto/diseno|Diseño de la web]].

## [2026-11-20] build | Agente y flujo de trabajo

Se creó la bóveda siguiendo el patrón [[fuentes/llm-wiki|LLM Wiki]], se configuró el agente en `AGENTS.md` y se dejó el [[proyecto/plan|plan de trabajo]]. Se vinculó la carpeta a [[proyecto/github|GitHub]].
## [2026-11-20] lint | Validación de la web y la wiki

Se comprobaron la compilación y los enlaces de las 11 notas. En el navegador se probaron la navegación, la carta con 191 productos únicos, los filtros, la búsqueda sin tilde, el recorrido hacia la ficha oficial y el diseño móvil de 390 píxeles. La consulta de stock se probó con datos simulados. La conexión a la cuenta de Fudo sigue pendiente.

## [2026-11-20] decision | Logo oficial, WhatsApp y trabajo por fases

El usuario entregó el logo oficial y eligió WhatsApp al 316 644 7477 para los botones de contacto de la landing. También pidió aplicar la guía de Emil Kowalski y marcar el avance en un plan en la raíz. Se dejó la [lista de implementación](../PLAN-IMPLEMENTACION.md) y se vinculó desde [[proyecto/plan|Plan de trabajo]].

## [2026-11-20] build | Marca oficial y contacto por WhatsApp

Se incorporó el PNG oficial en la web. Los botones abren WhatsApp con texto de pedido, de consulta sobre el producto o de horario. Se mantuvieron los enlaces a Fudo y se aplicó [[fuentes/emil-kowalski|la guía de interacción]] al toque, el foco y la apertura de fichas. Véase [[proyecto/diseno|Diseño de la web]].

## [2026-11-20] lint | Verificación del logo, WhatsApp y catálogo

Se comprobó que el logo coincide con el PNG del usuario y que los cuatro botones preparan sus mensajes para el número +57 316 644 7477. Se verificaron la búsqueda sin tilde, los filtros, la ficha de Café Americano en Fudo y la apertura y cierre con teclado y retorno de foco. La transición de la ficha con puntero quedó condicionada a la preferencia de movimiento en CSS. Se revisó en escritorio y a 320 y 390 píxeles en el navegador. La prueba en teléfono físico está pendiente. Se marcó la revisión en la [lista de implementación](../PLAN-IMPLEMENTACION.md).
