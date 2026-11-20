---
type: proyecto
updated: 2026-11-20
tags: [postreria, plan]
---

# Plan de trabajo

La actualización del logo oficial, WhatsApp e interacciones sigue la [lista de implementación por fases](../../PLAN-IMPLEMENTACION.md), que está en la raíz. Cada fase tiene su propio commit y se respalda en GitHub.

La actualización está implementada y verificada en el navegador. El servidor de producción local entregó la portada, el logo y las 191 fotografías del catálogo. La revisión de los botones en un teléfono físico queda pendiente y figura en la lista de la raíz.

| Hito | Estado | Cómo lo comprobamos |
| --- | --- | --- |
| Investigar la referencia y el negocio | Hecho | Portada de Nina, plantillas representativas, datos del local y carta pública documentados. |
| Construir la primera web | Hecho | Portada, colecciones, fichas, búsqueda, filtros y visita al local. La compilación pasa y se probaron en el navegador el diseño móvil, la búsqueda, el filtro y el enlace a Fudo. |
| Crear el agente y la bóveda | Hecho | Codex lee las reglas desde `AGENTS.md`. La bóveda tiene índice, notas, fuentes y bitácora. |
| Vincular GitHub | Hecho | La rama local `main` sigue a `origin/main`. |
| Revisar con el negocio | Pendiente | Revisar la portada desde el celular, destacados, textos, contacto y horario. |
| Validar inventario con Fudo | Pendiente de credenciales | Probar la lectura del rol Integraciones y comparar tres productos representativos antes de mostrar estados. |
| Publicar en un dominio web | Pendiente | Elegir alojamiento con Node.js, configurar el dominio y comprobar navegación, pedidos y contacto. |

## Cómo trabajar desde aquí

1. Abre el proyecto en Codex y la carpeta `wiki` en Obsidian.
2. Abre la web local con las instrucciones del README. Indica en Codex los cambios de marca, catálogo o navegación que quieras aplicar.
3. El agente incorpora las decisiones en las notas relacionadas y registra el avance en la [[log|bitácora]].
4. Cuando estén listas las claves de Fudo, ejecuta la prueba de [[proyecto/fudo-stock|stock]]. La revisión visual y el catálogo se pueden probar mientras tanto.

Consulta [[proyecto/diseno|Diseño de la web]], [[negocio/catalogo|Carta de Fudo]] y [[proyecto/github|GitHub y publicación]].
