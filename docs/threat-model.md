# 🛡️ Modelo de Amenazas (Threat Model)

Este documento define las amenazas que KRONOS Luck-Awareness busca mitigar y cómo lo hace.

## 1. Amenazas Principales (El Enemigo)

| Amenaza | Descripción | Vector de Ataque |
| :--- | :--- | :--- |
| **Phishing** | Robo de credenciales mediante suplantación de identidad. | Correos, SMS, WhatsApp. |
| **Esquemas Piramidales** | Promesas de riqueza rápida sin producto real. | Redes sociales, grupos de Telegram. |
| **Falsos Premios** | Notificaciones de loterías no jugadas. | Pop-ups, mensajes directos. |
| **Ingeniería Social** | Manipulación psicológica (urgencia, miedo). | Cualquier canal de texto. |

## 2. Controles de Seguridad (Nuestra Defensa)

1. **Análisis Heurístico:** El motor de banderas rojas busca patrones conocidos de manipulación.
2. **Aislamiento (Client-Side):** Al no procesar datos en un servidor, el atacante no puede interceptar el mensaje analizado.
3. **Cero Ejecución de Enlaces:** La herramienta extrae las URLs pero **nunca** hace peticiones a ellas, evitando ataques de SSRF o XSS desde el sitio web del estafador.
4. **Evidencia Inmutable:** Se genera un hash SHA-256 del texto original para evitar que el estafador borre la evidencia posteriormente.

---
*◯_● · SCDR-001*