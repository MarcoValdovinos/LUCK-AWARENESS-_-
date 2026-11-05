# 🔐 Modelo de Privacidad (Privacy by Design)

## 1. Zero-Backend
No hay servidores, no hay base de datos centralizada, no hay API. La aplicación se ejecuta enteramente en el navegador del usuario (Vanilla JS).

## 2. Almacenamiento Local
Los reportes se guardan en el `localStorage` del navegador. 
- El usuario tiene control total.
- Si borra la caché del navegador, los datos desaparecen.
- Si desea conservarlos, debe usar el botón "Exportar Reporte" para descargar el HTML.

## 3. Sin Rastreo (Zero-Tracking)
- No usamos Google Analytics.
- No usamos Facebook Pixel.
- No usamos cookies de sesión ni de publicidad.
- El único script externo es el propio código JavaScript.

---
*◯_● · SCDR-001*