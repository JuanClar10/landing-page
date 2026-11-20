# La Postrería Café

Web y carta de La Postrería Café, Valledupar. Incluye 191 productos de la carta pública de Fudo, búsqueda, filtros, fichas y enlaces al canal de pedidos.

El [plan de implementación](PLAN-IMPLEMENTACION.md) registra las tareas completadas por fase.

## Abrir la web en tu computador

Abre esta carpeta en una terminal y ejecuta estos comandos.

```powershell
npm ci
npm run dev
```

Abre [la web local](http://127.0.0.1:4320). Puedes cerrar el servidor con **Ctrl+C**. Se necesita Node.js 22.18 o posterior.

Para probar la versión de producción en tu computador, usa `npm run build` y luego `npm start`. Un alojamiento Node.js puede configurar `HOST=0.0.0.0` y su `PORT`.

## Wiki y agente

En Obsidian, elige **Abrir carpeta como bóveda** y selecciona la carpeta `wiki` de este proyecto. Empieza por [el índice](wiki/index.md) o [el plan de trabajo](wiki/proyecto/plan.md).

Abre las conversaciones sobre esta web en Codex desde esta misma carpeta. El archivo [AGENTS.md](AGENTS.md) indica al agente cómo actualizar decisiones, hallazgos, fuentes y pendientes en la wiki después de cada conversación relevante. Para verificar los enlaces entre notas, usa `npm run wiki:check`.

## Conexión de stock

El sitio se puede usar desde el primer arranque con la carta consultada el 20 de noviembre de 2026. Para probar el stock real, sigue [la guía de Fudo](wiki/proyecto/fudo-stock.md). Coloca las claves en el archivo privado `.env` y ejecuta `npm run fudo:check`. La lectura del stock visible queda desactivada hasta completar la comprobación.

## Repositorio

[JuanClar10/landing-page](https://github.com/JuanClar10/landing-page), rama `main`.
