---
type: proyecto
updated: 2026-11-20
tags: [postreria, diseno, web]
---

# Diseño de la web

La página lleva al visitante de una portada de marca a cuatro colecciones, una selección de postres, la carta completa y los datos para visitar el local. Se tomó la jerarquía de [[fuentes/nina|Nina con Amore]] como referencia. Para [[negocio/la-postreria|La Postrería Café]] se eligieron tonos crema y vino, tipografía editorial y fotografías del catálogo del negocio. La portada destaca el Cheesecake Frutos del Bosque.

El buscador acepta palabras con o sin tilde. La carta permite combinar búsqueda, colección y subcategoría. Cada ficha presenta el nombre, precio en COP, descripción disponible y acceso directo al producto en Fudo. Los pedidos se completan en el canal existente. La visita se facilita con horario, indicaciones de Google Maps y WhatsApp.

La primera implementación usa React y TypeScript en la interfaz y un servidor Node.js pequeño para servir la web y consultar [[proyecto/fudo-stock|stock cuando se habilite]]. El catálogo se carga desde la extracción documentada en [[negocio/catalogo|Carta pública de Fudo]].
