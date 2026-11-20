---
type: proyecto
updated: 2026-11-20
tags: [postreria, diseno, web]
---

# Diseño de la web

La página lleva al visitante de una portada de marca a cuatro colecciones, una selección de postres, la carta completa y los datos para visitar el local. Se tomó la jerarquía de [[fuentes/nina|Nina con Amore]] como referencia. Para [[negocio/la-postreria|La Postrería Café]] se eligieron tonos crema y vino, tipografía editorial y fotografías del catálogo del negocio. La portada destaca el Cheesecake Frutos del Bosque.

El buscador acepta palabras con o sin tilde. La carta permite combinar búsqueda, colección y subcategoría. Cada ficha presenta nombre, precio en COP, descripción disponible y acceso directo al producto en Fudo.

El logo oficial aparece en el encabezado, el pie y la pestaña del navegador. WhatsApp al **+57 316 644 7477** es la acción principal de la portada y el encabezado. La ficha abre un mensaje con el nombre del producto. La sección de visita abre una pregunta sobre el horario. Cada enlace deja el mensaje listo para que el cliente decida enviarlo. Fudo sigue disponible desde la carta y las fichas.

Se aplicó la [[fuentes/emil-kowalski|guía de Emil Kowalski]] a las interacciones.

| Antes | Después | Motivo |
| --- | --- | --- |
| Las fotos se ampliaban al pasar el cursor. | El cambio de borde o subrayado indica qué se puede pulsar en dispositivos con puntero. | La carta se recorre con menos movimiento. |
| Los botones cambiaban de color. | Los botones principales responden a la pulsación con una escala breve y sutil. | La respuesta táctil es inmediata. |
| La ficha aparecía de golpe. | Al abrirla con el puntero, la ficha entra en 220 ms. Con el teclado o movimiento reducido, abre de forma inmediata. | El cambio de contexto se entiende y respeta la preferencia de movimiento. |

La primera implementación usa React y TypeScript en la interfaz y un servidor Node.js pequeño para servir la web y consultar [[proyecto/fudo-stock|stock cuando se habilite]]. El catálogo se carga desde la extracción documentada en [[negocio/catalogo|Carta pública de Fudo]].
