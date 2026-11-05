# 🔱 Protocolo de Co-Creatividad Simbiótica (PCS)

**Estado:** Borrador 0.1 · Buscando revisión independiente

## 🎯 ¿Qué es esto?
PCS es una especificación abierta (RFC) y un formato de datos (JSON) para registrar, de manera auditable e interoperable, la participación de humanos y sistemas de IA en la creación de obras.

**No** dictamina derechos de autor. **No** certifica identidad legal. **Sí** garantiza la integridad criptográfica de las declaraciones y la trazabilidad del proceso.

## 📂 Contenido del Directorio
- `PCS-RFC-0001.md`: El documento normativo principal (borrador 0.1).
- `manifest.schema.json`: El esquema JSON estricto para validar registros.
- `test-vectors.json`: Vectores de prueba reproducibles (positivos y negativos).
- `verify_pcs.js` / `validate_pcs.py`: Scripts de verificación de referencia.
- `TEST-REPORT.md`: Reporte de ejecución de las 13 pruebas (6 positivas, 7 negativas).
- `example-manifest.json`: Ejemplo completo de un registro válido.

## 🚀 ¿Cómo contribuir o revisar?
Buscamos revisores de:
- **Criptografía** (validación de hashes y firmas).
- **Derecho digital** (análisis de las limitaciones legales).
- **Privacidad** (minimización de datos).
- **Desarrollo** (implementaciones en otros lenguajes).

Si encuentras un error de seguridad o una ambigüedad en el texto, por favor abre un *Issue* o envía un *Pull Request*.

## 🧪 Reproducir las pruebas
Para verificar que los vectores funcionan en tu entorno:
```bash
node verify_pcs.js