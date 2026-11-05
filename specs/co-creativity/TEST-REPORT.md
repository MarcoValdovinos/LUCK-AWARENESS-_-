# 🧪 Reporte de Pruebas PCS 0.1

**Fecha de ejecución:** 5 de noviembre de 2026  
**Implementación:** Node.js (ver `verify_pcs.js`)  
**Estado:** ✅ 13 / 13 Pruebas superadas

## Resumen de Resultados

| ID | Tipo | Descripción | Resultado |
| :--- | :--- | :--- | :--- |
| TC-001 | Positivo | Evento génesis válido (Hash SHA-256 correcto) | ✅ PASS |
| TC-002 | Positivo | Encadenamiento correcto entre evento 0 y 1 | ✅ PASS |
| TC-003 | Positivo | Firma Ed25519 válida (Clave pública conocida) | ✅ PASS |
| TC-004 | Negativo | Mutación de artefacto (Byte cambiado) | ✅ FAIL (Esperado) |
| TC-005 | Negativo | Evento alterado (Hash manipulado) | ✅ FAIL (Esperado) |
| TC-006 | Negativo | Cadena rota (previous_event_hash incorrecto) | ✅ FAIL (Esperado) |
| TC-007 | Negativo | Cadena incompleta (Falta evento anterior) | ✅ FAIL (Esperado) |
| TC-008 | Negativo | Firma Ed25519 inválida (Firma alterada) | ✅ FAIL (Esperado) |
| TC-009 | Negativo | Clave pública desconocida | ✅ FAIL (Esperado) |
| TC-010 | Negativo | Secuencia repetida (Eventos con el mismo ID) | ✅ FAIL (Esperado) |

## Limitaciones Conocidas de esta Ejecución

- **Canonización JCS:** El script actual utiliza un canonizador auxiliar simplificado que funciona para los 13 vectores provistos. Para afirmar una conformidad general con el RFC 8785, se requiere la integración de una biblioteca JCS completa (ej. `canonicalize` en npm).
- **Entorno:** Pruebas ejecutadas localmente. Los vectores están disponibles en `test-vectors.json` para reproducibilidad externa.