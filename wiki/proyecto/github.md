---
type: proyecto
updated: 2026-11-20
tags: [postreria, git, publicacion]
---

# GitHub y publicación

La carpeta de trabajo se inicializó en la rama `main` y quedó vinculada a [JuanClar10/landing-page](https://github.com/JuanClar10/landing-page). Git usa la cuenta JuanClar10 y su dirección privada de GitHub como identidad de autor para este repositorio.

Antes de sincronizar cambios, revisa lo que cambió, ejecuta `npm run build` y `npm run wiki:check`, y sube los cambios autorizados a `origin/main`. El código y la wiki versionada se respaldan juntos. El archivo local `.env` y las capturas administrativas en `wiki/raw/privado/` se quedan fuera de Git.

Para publicar la web con el lector de stock, el alojamiento debe poder ejecutar Node.js y guardar las claves como variables privadas. Véase [[proyecto/plan|Plan de trabajo]] y [[proyecto/fudo-stock|Stock desde Fudo]].
