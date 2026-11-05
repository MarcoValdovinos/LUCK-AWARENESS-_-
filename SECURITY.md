# 🛡️ Política de Seguridad

## Versiones Soportadas
Actualmente, solo la última versión (v1.x) recibe actualizaciones de seguridad.

## Reportar una Vulnerabilidad
Si encuentras una falla de seguridad, **por favor NO abras un Issue público**. 
Envía un correo a `security@kronos-legado.digital` con los detalles. Nos comprometemos a responder en menos de 48 horas.

## Arquitectura de Seguridad
- **Cero Backend:** No hay servidores, bases de datos ni APIs externas. Todo el procesamiento es local (Client-Side).
- **Zero-Trust:** El sistema asume que el mensaje analizado es malicioso y lo procesa en un entorno aislado (sandbox del navegador).
- **Criptografía:** Se utiliza la API nativa `crypto.subtle` del navegador para generar hashes SHA-256 inmutables.
- **XSS Prevention:** Todo el texto introducido por el usuario es sanitizado antes de ser mostrado en la interfaz o en los reportes.

---
*◯_● · 51/49/100 · SCDR-001*