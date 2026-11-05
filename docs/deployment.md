# 🚀 Guía de Despliegue

Al ser una aplicación estática, se puede alojar gratis en cualquier CDN.

## Opción 1: GitHub Pages
1. Ve a los *Settings* de tu repositorio en GitHub.
2. Ve a *Pages*.
3. En *Source*, selecciona la rama `main` y la carpeta `/root`.
4. Guarda. Tu app estará en `https://<tu-usuario>.github.io/kronos-luck-awareness/`.

## Opción 2: Surge.sh
```bash
surge . kronos-luck.surge.sh