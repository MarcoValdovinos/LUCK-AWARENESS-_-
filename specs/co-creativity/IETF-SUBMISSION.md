# 📡 Propuesta de Presentación: PCS en el IETF Hackathon

## Resumen
El Protocolo de Co-Creatividad Simbiótica (PCS) busca registrar la procedencia de obras generadas por humanos e IA. Actualmente, es un borrador (Draft 0.1) con una implementación de referencia en Node.js y un conjunto de pruebas reproducible.

## ¿Por qué PCS aplica al IETF?
La Inteligencia Artificial Generativa está redefiniendo la autoría. PCS propone un formato JSON estandarizado para registrar contribuciones, utilizando criptografía post-cuántica (Ed25519 y SHA-256) y marcas de tiempo (RFC 3161 y RFC 3339).

## Objetivo para el Hackathon
**Reto Técnico:** Escribir una segunda implementación (ej. en Python, Go o Rust) del verificador `verify_pcs.js` para demostrar **interoperabilidad**.

### Entregables esperados:
1. Código funcional que lea `test-vectors.json` y valide los hashes.
2. Un reporte de que el nuevo código pasa las 3 pruebas (positivas y negativas).
3. Una discusión sobre cómo mejorar el RFC 0.1 para su futura estandarización.

## Enlaces
- **Repositorio:** https://github.com/Marcorojas17/ARKHE-ZERO (carpeta `specs/co-creativity`)
- **Documentación:** PCS-RFC-0001.md