---
type: proyecto
updated: 2026-11-20
tags: [postreria, fudo, stock]
---

# Stock desde Fudo

**Sí, es posible leer el stock registrado de productos con la API Pública General.** La documentación técnica de Fudo incluye `GET /products` y `GET /products/{id}`, con `stock`, `stockControl` y `minStock`. El servidor intercambia API Key y API Secret en `https://auth.fu.do/api` por un token temporal de unas 24 horas y lo renueva según su vencimiento. Véase [[fuentes/fudo|Fuentes de Fudo]].

## Qué revisar en tu cuenta

1. La captura muestra **API Pública General activa** y un usuario dedicado, **Landing**, con el rol **Integraciones**. Fudo indica que la API está incluida en el Plan Pro. La configuración mostrada ya cubre la activación.
2. En **Administración → Usuarios → Landing**, verifica que el usuario esté activo. Copia la API Key y, si todavía no hay un secreto disponible, usa **Establecer** para generarlo. Generar otro secreto puede invalidar el anterior.
3. Comprueba que el rol pueda consultar productos. Fudo aplica los permisos del usuario. Si la prueba devuelve 403, revisa el acceso del rol a la lectura de productos con un administrador de Fudo.
4. Para los productos que llevan inventario por unidad, revisa **Productos → Control de Stock** y comprueba que el control esté habilitado en el producto y que la cantidad coincida con lo que hay en el local.

## Prueba preparada

Crea `.env` a partir de `.env.example` y escribe allí las dos claves. Ejecuta `npm run fudo:check`. El comando solo lee productos e imprime el conteo de coincidencias con la carta y cuántas tienen stock numérico. Para ver los datos de productos concretos en tu terminal, usa sus identificadores, por ejemplo `npm run fudo:check -- 72 74 23`. El archivo `.env` está excluido de Git. Si la web se aloja en un servidor, configura las claves como variables privadas de ese servidor.

Antes de poner `FUDO_SHOW_STOCK=true`, compara los resultados con Fudo con un producto que tenga unidades, otro con stock cero y otro cuya cantidad dependa de una receta. Verifica que cada ID del menú público corresponda al ID y nombre que devuelve la API. Solo entonces reinicia la web con la variable activada.

El servidor publica estados para coincidencias de ID y nombre con control activado y una cantidad numérica. Si un producto figura sin cantidad, la web dirige a Fudo para confirmar disponibilidad. El stock registrado y la disponibilidad calculada a partir de ingredientes son datos distintos. La documentación revisada expone datos de receta e ingredientes, pero la prueba con esta cuenta sigue pendiente para determinar si se puede reproducir la disponibilidad que muestra la carta.

**Estado:** el lector de Fudo está implementado. La conexión real con La Postrería Café está pendiente de credenciales y prueba. La web funciona con la [[negocio/catalogo|carta pública]] y deja los pedidos en Fudo.
