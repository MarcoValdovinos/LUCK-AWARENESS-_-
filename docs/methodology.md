# 🧠 Metodología de Análisis

## ¿Cómo funciona el motor de riesgo?

El motor (`risk-score.js`) se basa en un sistema de **puntuación ponderada (Weighted Scoring)**.

### 1. Extracción de Características
El texto se limpia y se buscan patrones predefinidos en el archivo `data/red-flags.json`.

### 2. Asignación de Pesos
Cada bandera roja tiene un peso del 10 al 35 dependiendo de qué tan letal sea:
- **Urgencia (20 pts):** Los estafadores crean pánico temporal.
- **Riqueza (30 pts):** Promesas de dinero fácil.
- **Amenaza (35 pts):** "Tu cuenta será bloqueada" o "Acción legal".

### 3. Cálculo Final
Si el texto contiene múltiples banderas, los puntos se suman. Si la suma supera los umbrales definidos en `data/risk-rules.json` (25, 50, 80), el nivel cambia de *Bajo* a *Medio*, *Alto* o *Crítico*.

### 4. Generación de Hash (Forense)
Se utiliza `crypto.subtle.digest('SHA-256')` del navegador para crear una huella digital única del texto. Si cambia una sola coma, el hash cambia por completo.

---
*◯_● · SCDR-001*