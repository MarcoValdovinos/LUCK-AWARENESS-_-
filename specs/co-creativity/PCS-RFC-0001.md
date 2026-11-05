# PCS-RFC-0001: Protocolo de Co-Creatividad Simbiótica

**Versión:** 0.1.0-draft  
**Estado:** Borrador de discusión; no es un estándar aprobado  
**Fecha:** 5 de noviembre de 2026  
**Idioma normativo:** español  
**Autoría de esta propuesta:** borrador elaborado para revisión de Marco Antonio Rojas Valdovinos. La atribución de cada versión debe mantenerse en el historial público del proyecto.  
**Nombre corto:** PCS

Este documento especifica un formato interoperable para registrar declaraciones de participación humana y de sistemas de IA en la creación o modificación de artefactos digitales. No certifica autoría, titularidad, originalidad, legalidad, calidad ni cumplimiento normativo.

## Resumen

El Protocolo de Co-Creatividad Simbiótica (PCS) define un manifiesto JSON y un registro de eventos encadenados para describir, de manera verificable y con minimización de datos, un proceso creativo en el que participan una o más personas y herramientas o servicios de IA.

PCS separa cuatro conceptos que no deben confundirse:

- **Declaración:** lo que una persona u organización afirma sobre el proceso.
- **Integridad:** si los bytes de una versión coinciden con los bytes identificados por su hash.
- **Autenticación de firma:** si una firma criptográfica corresponde a una clave pública determinada.
- **Identidad, autoría y derechos:** cuestiones que requieren pruebas y reglas externas al protocolo.

Una implementación conforme puede comprobar los tres primeros aspectos dentro de sus límites. No puede inferir por sí sola quién creó una obra ni quién tiene derechos sobre ella.

## Estado y convenciones

Este es un borrador inicial para revisión pública. No es un RFC del IETF, una norma ISO, una certificación, un dictamen legal ni una declaración de prioridad intelectual. Las palabras DEBE, NO DEBE, REQUERIDO, DEBERÍA, NO DEBERÍA, PUEDE y OPCIONAL se interpretan como requisitos normativos del documento.

PCS usa JSON UTF-8. Los nombres de propiedades normativas son sensibles a mayúsculas y minúsculas y se escriben en `snake_case`.

## 1. Propósito y alcance

PCS permite:
- identificar un proyecto creativo y sus versiones de artefactos;
- registrar declaraciones de contribución con atribución explícita;
- señalar cuándo intervino una herramienta o servicio de IA;
- encadenar eventos para detectar alteraciones o eliminaciones;
- verificar hashes y firmas disponibles;
- registrar consentimiento, correcciones, impugnaciones y revocaciones;
- permitir que distintas implementaciones interpreten los mismos datos.

PCS no:
- decide qué cuenta como autoría conforme a una jurisdicción;
- asigna porcentajes de autoría ni mide el valor creativo de cada participante;
- demuestra que una declaración es verdadera por el mero hecho de estar firmada;
- prueba cuándo se concibió una idea si no existe una fuente de tiempo independiente;
- determina si el uso de un modelo o material fue legal;
- conserva por defecto prompts, conversaciones, datos personales o archivos originales;
- sustituye un registro de derechos, una firma cualificada, una auditoría o una autoridad.

## 2. Principios de diseño

- **Agencia humana:** las personas conservan la decisión de publicar, atribuir, corregir o retirar declaraciones.
- **Transparencia proporcional:** revelar información suficiente para interpretar la participación, sin exponer secretos o datos innecesarios.
- **Atribución explícita:** distinguir personas, organizaciones, modelos, herramientas y servicios.
- **No antropomorfismo:** un sistema automatizado se registra como herramienta o sistema, no se presume que sea una persona o titular de derechos.
- **Verificabilidad limitada:** cada resultado debe indicar qué se verificó y qué quedó fuera.
- **Corrección sin borrado silencioso:** los errores se corrigen mediante eventos que referencian la declaración anterior.
- **Interoperabilidad:** los datos básicos no dependen de un proveedor único.
- **Privacidad desde el diseño:** los datos sensibles y las claves privadas nunca forman parte del manifiesto público.
- **Neutralidad de participación:** no se presume que la proporción de texto, tiempo, tokens o ediciones mida la autoría.
- **No exclusividad histórica:** el protocolo no reclama la invención de la co-creación humano-IA ni de la expresión “creatividad simbiótica”.

## 3. Terminología

- **Artefacto:** archivo o conjunto de archivos creativos, como texto, imagen, audio, video, software o modelo derivado.
- **Proyecto:** contexto lógico que agrupa participantes, eventos y versiones.
- **Participante:** persona u organización que declara una contribución.
- **Sistema de IA:** modelo, servicio o agente automatizado que intervino en una etapa.
- **Contribución:** descripción atribuida de una acción o decisión. Es una declaración, no una conclusión automática sobre derechos.
- **Manifiesto:** documento JSON que identifica el proyecto y sus artefactos actuales.
- **Evento:** registro inmutable de una declaración, decisión o cambio.
- **Cadena:** secuencia ordenada de eventos enlazados por hashes.
- **Emisor del evento:** titular o controlador de la clave que firma el evento, si existe una firma.
- **Verificador:** programa que valida estructura, hashes, enlaces y firmas disponibles.
- **Declaración:** afirmación cuya verdad puede requerir evidencia externa.
- **Identificador de participante:** identificador estable, público o seudónimo; no equivale a identidad civil.

## 4. Modelo de datos

Un paquete PCS puede contener:
```text
pcs-package/
├── manifest.json
├── events/
│   ├── 00000000.json
│   └── 00000001.json
├── signatures/                 # Opcional; firma separada por evento
├── timestamps/                 # Opcional; tokens de autoridad de tiempo
└── artifacts/                  # Opcional; incluir solo con permiso y base legítima
```

Los archivos de artefacto pueden residir fuera del paquete. En ese caso, el manifiesto conserva su hash, tamaño y tipo de medio declarados. El paquete NO DEBE incluir claves privadas.

### 4.1 Manifiesto

El manifiesto describe la versión actual del proyecto y apunta a los eventos que la sustentan. No reemplaza al registro histórico. (Ver ejemplo en la Sección 15).

La fecha del manifiesto es declarada por quien lo emite. Sin un token de tiempo confiable externo, no prueba por sí sola la fecha real de creación.

### 4.2 Participantes

Cada participante DEBE tener:
- `participant_id`: identificador local único;
- `kind`: `human`, `organization` o `ai_system`;
- `display_name`: nombre mostrado, que puede ser seudónimo;
- `role`: etiqueta descriptiva, no una categoría legal.

Para un `ai_system`, `system` PUEDE incluir proveedor, nombre/versionado del modelo y URL informativa. Si se desconoce la versión, el campo DEBE indicar `unknown`; no se debe inventar.

Los datos de contacto, documento de identidad, credenciales y datos personales sensibles NO DEBEN incluirse en el paquete público. Puede referenciarse un mecanismo separado de identidad o contacto, con consentimiento.

### 4.3 Artefactos

Cada artefacto DEBE incluir:
- `artifact_id`: identificador único dentro del proyecto;
- `version_id`: identificador de la versión;
- `media_type`: tipo MIME declarado;
- `byte_length`: longitud en bytes del archivo exacto, cuando esté disponible;
- `digest`: algoritmo y valor hexadecimal del hash;
- `label`: descripción legible opcional.

PCS 0.1 REQUIERE SHA-256 para `digest`. El digest se calcula sobre los bytes exactos del archivo, sin normalizar, re-guardar ni convertir el contenido. Si los bytes cambian, se crea una versión nueva.

## 5. Registro de eventos

### 5.1 Secuencia e inmutabilidad lógica

Los eventos se numeran consecutivamente desde `0`. El evento `0` es el génesis del registro y usa `previous_event_hash: null`. Cada evento siguiente DEBE apuntar al hash del evento inmediatamente anterior. Un cambio se representa con un nuevo evento; los eventos publicados NO DEBEN editarse en silencio.

La eliminación de un evento de una copia local rompe la continuidad detectable desde el primer evento ausente. Una copia incompleta debe informarse como tal y no mostrarse como cadena íntegra.

### 5.2 Tipos de evento

PCS 0.1 define:
- `project_created`
- `participant_declared`
- `contribution_declared`
- `artifact_created`
- `artifact_versioned`
- `consent_recorded`
- `correction_recorded`
- `dispute_opened`
- `dispute_resolved`
- `participation_withdrawn`
- `project_closed`

Las extensiones pueden proponer otros tipos con un prefijo propio, por ejemplo `org.example.review_completed`. Un verificador que desconozca un tipo de extensión DEBE conservarlo y mostrarlo como no interpretado; no debe rechazar por ello la cadena criptográfica.

### 5.3 Estructura del evento

```json
{
  "protocol": "https://example.org/pcs/0.1",
  "project_id": "urn:uuid:7d5f2f39-7e2c-4a48-94c8-a8d7a120c7d4",
  "sequence": 0,
  "event_id": "urn:uuid:9f22bd08-59f5-4b90-9d81-7f51f13c9821",
  "event_type": "project_created",
  "occurred_at": "2026-11-05T12:00:00Z",
  "recorded_at": "2026-11-05T12:00:00Z",
  "actor_id": "person-001",
  "previous_event_hash": null,
  "data": {
    "manifest_id": "0f2e291d-9fb9-4d62-bfb6-bf0c22b38c21"
  },
  "event_hash": {
    "algorithm": "sha-256",
    "value": "REPLACE_WITH_64_LOWERCASE_HEX_CHARACTERS"
  },
  "signature": null
}
```

`occurred_at` es la hora que declara el actor. `recorded_at` es la hora que declara quien incorpora el evento. Ambas pueden diferir. Son informativas salvo que una autoridad de tiempo valide una marca externa.

### 5.4 Datos del evento

`data` es un objeto JSON específico al tipo de evento. Los eventos de contribución DEBERÍAN especificar:
- `contribution_id`;
- `participant_id`;
- `action`: verbo o categoría descriptiva, por ejemplo `drafted`, `edited`, `selected`, `directed`, `generated`, `reviewed`;
- `description`: explicación breve;
- `artifact_refs`: cero o más pares `artifact_id` / `version_id`;
- `basis`: `participant_statement`, `tool_log`, `third_party_record` u otra base declarada;
- `sensitivity`: `public`, `private` o `restricted`.

La propiedad `basis` describe la procedencia de la declaración; no es un aval de veracidad.

## 6. Canonicalización y criptografía

### 6.1 Canonicalización

Para construir el hash del evento, la implementación DEBE:
1. retirar del objeto de evento las propiedades `event_hash` y `signature`;
2. serializar el objeto restante según JSON Canonicalization Scheme (JCS), RFC 8785;
3. codificar el resultado como UTF-8;
4. calcular SHA-256 sobre esos bytes;
5. representar el resultado como 64 caracteres hexadecimales en minúsculas.

Los campos desconocidos incluidos en el objeto canonicalizado quedan cubiertos por el hash. Una extensión que requiera cálculo distinto debe tener otra versión del protocolo, no modificar esta regla.

### 6.2 Enlace de cadena

Para todo evento `n > 0`:
```text
event[n].previous_event_hash == event[n-1].event_hash.value
```
`sequence` DEBE aumentar exactamente en uno. IDs de evento repetidos, huecos, hashes no coincidentes o enlaces rotos son errores de validación estructural.

### 6.3 Firmas

Las firmas son OPCIONALES en PCS 0.1. Si existe una firma, los verificadores conformes DEBEN reconocer Ed25519 como suite de firma base y pueden reconocer suites adicionales registradas como extensiones.

La firma se calcula sobre los bytes UTF-8 de:
```text
PCS-EVENT-SIGNATURE-V0.1\n
<event_hash.value>\n
<key_id>\n
Ed25519
```
La firma y la clave pública se codifican en base64url sin relleno. `key_id` identifica una clave pública, no una persona civil. El paquete PUEDE llevar el certificado o la clave pública, pero la inclusión de una clave no establece su titularidad. El verificador debe informar por separado que la firma es matemáticamente válida y si la identidad del firmante está o no corroborada por una fuente externa.

No se aceptan claves privadas en eventos, manifiestos, ejemplos ni repositorios públicos.

### 6.4 Marcas de tiempo externas

PCS 0.1 permite referencias a tokens de tiempo RFC 3161 u otros mecanismos documentados como extensión. Un token externo puede respaldar que ciertos datos existían no después de una fecha validada por ese servicio. No prueba la autoría ni la fecha de concepción.

## 7. Correcciones, desacuerdos y retiro

Las declaraciones pueden ser corregidas o disputadas sin eliminar el evento previo:
- `correction_recorded` DEBE referenciar el `event_id` corregido y explicar la corrección.
- `dispute_opened` DEBE identificar el alcance de la impugnación y su autor declarado.
- `dispute_resolved` PUEDE registrar el resultado y la evidencia usada; no implica que el protocolo adjudique derechos.
- `participation_withdrawn` registra que un participante retira su consentimiento para usos futuros identificados. No borra las copias que ya fueron distribuidas ni resuelve obligaciones legales de retención.

Los verificadores DEBEN mostrar la existencia de correcciones, disputas o retiros relevantes y no presentar una declaración disputada como indiscutida.

## 8. Estados de verificación

Un verificador PCS DEBERÍA informar resultados independientes, nunca un único sello ambiguo de “auténtico”. Una firma válida no transforma una afirmación falsa en verdadera. Un hash coincidente solo confirma que los bytes comprobados corresponden al digest declarado.

## 9. Privacidad y gestión de datos

- La publicación es voluntaria y requiere base legítima y consentimiento cuando corresponda.
- Debe preferirse la divulgación selectiva: publicar resúmenes y hashes, y conservar archivos sensibles localmente.
- Los prompts completos, conversaciones, datos de salud, credenciales y datos personales sensibles NO DEBEN incluirse por defecto.
- Los identificadores seudónimos son recomendables para participantes que no quieran revelar su identidad.
- La revocación de consentimiento debe tener alcance y fecha explícitos.
- Los operadores deben publicar política de retención, exportación y eliminación de datos.
- Un hash de un archivo de baja entropía puede permitir ataques de diccionario; los implementadores deben evaluar si divulgarlo revela información.

## 10. Modelo de amenazas y seguridad

PCS considera, como mínimo:
- modificación, sustitución o reordenamiento de eventos;
- omisión de eventos de una copia;
- suplantación mediante claves ajenas o comprometidas;
- afirmaciones falsas firmadas por su emisor;
- filtración de prompts, archivos o metadatos personales;
- confusión entre “hash válido”, “firma válida” y “autoría probada”;
- falsificación de reloj local;
- dependencia o indisponibilidad de un proveedor de almacenamiento;
- algoritmos debilitados o implementación incorrecta.

Mitigaciones: cadena de hashes, firma opcional, validación JCS, custodia segura de claves, copias independientes, registro de marcas de tiempo externas, minimización de datos, documentación de incertidumbre, actualización criptográfica con control de versión y pruebas interoperables.

PCS 0.1 no ofrece confidencialidad, disponibilidad, resistencia a censura, identidad civil ni no repudio legal. La seguridad de una aplicación depende también de su sistema operativo, almacenamiento, bibliotecas y procedimientos.

## 11. Conformidad

Una implementación que se anuncie como PCS 0.1 conforme DEBE:
- aceptar y validar la estructura del manifiesto y eventos;
- calcular los hashes conforme a la sección 6;
- verificar continuidad y secuencia de la cadena;
- comprobar el hash de artefactos cuando se le proporcionen los bytes;
- separar estado criptográfico de identidad, autoría y validez legal;
- mostrar errores, datos incompletos y extensiones desconocidas;
- no modificar eventos existentes durante una corrección;
- incluir pruebas públicas para casos válidos e inválidos.

La verificación de Ed25519 es REQUERIDA solo para una implementación que declare soporte de firmas PCS 0.1. Un verificador que no soporte firmas puede informar `unsupported`, pero no debe afirmar que una firma fue validada.

### 11.1 Pruebas mínimas

1. evento génesis válido;
2. evento siguiente con enlace válido;
3. byte de artefacto cambiado;
4. hash de evento incorrecto;
5. hueco o secuencia repetida;
6. `previous_event_hash` incorrecto;
7. firma válida y firma inválida;
8. clave desconocida;
9. corrección que referencia evento existente;
10. disputa no resuelta;
11. extensión desconocida conservada sin alterar la validación de hashes.

## 12. Versionado e interoperabilidad

La versión `0.1.0-draft` es experimental. Cambios incompatibles requieren incrementar la versión mayor antes de una eventual versión estable. Añadir campos opcionales que no cambien canonicalización puede ser compatible si los verificadores conservan esos campos.

Cada paquete DEBERÍA incluir:
- versión del esquema;
- implementación y versión del verificador;
- vectores de prueba utilizados;
- notas de compatibilidad;
- aviso de limitaciones.

Las implementaciones no deben tratar una URL de protocolo como garantía de disponibilidad permanente; deben almacenar la versión de esquema o su identificador junto al paquete.

## 13. Gobernanza propuesta

Durante el borrador 0.x, el mantenedor publica propuestas de cambio y conserva historial visible. Antes de declarar PCS estable, el proyecto DEBERÍA:
- aceptar comentarios públicos;
- documentar conflictos de interés y contribuciones;
- establecer un proceso de revisión y versionado;
- publicar una política de seguridad y divulgación responsable;
- obtener revisión técnica y de privacidad independiente;
- permitir implementaciones independientes y mantener vectores comunes.

La gobernanza de una futura versión estable debe incluir un proceso para propuestas, objeciones, decisiones, apelaciones y retiro de versiones inseguras. Este documento no crea una organización formal.

## 14. Consideraciones legales

PCS es un formato técnico para organizar declaraciones y verificaciones. No otorga derechos de autor, no transfiere titularidad, no crea una licencia y no garantiza admisibilidad probatoria. Las reglas cambian por jurisdicción y tipo de obra. Cada proyecto debe enlazar por separado las licencias, autorizaciones y avisos aplicables.

Las etiquetas `human`, `organization` y `ai_system` describen participantes dentro del registro; no resuelven la condición jurídica de una IA ni la elegibilidad de una obra para protección.

## 15. Ejemplo de manifiesto

El siguiente ejemplo es ilustrativo. Los valores de hash son marcadores y no deben utilizarse como evidencia real.

```json
{
  "protocol": "https://example.org/pcs/0.1",
  "manifest_id": "0f2e291d-9fb9-4d62-bfb6-bf0c22b38c21",
  "created_at": "2026-11-05T12:00:00Z",
  "project": {
    "project_id": "urn:uuid:7d5f2f39-7e2c-4a48-94c8-a8d7a120c7d4",
    "title": "Ejemplo educativo",
    "description": "Ejemplo ficticio para ilustrar PCS 0.1."
  },
  "participants": [
    {
      "participant_id": "person-001",
      "kind": "human",
      "display_name": "Participante A",
      "role": "dirección y selección",
      "identity_status": "self-asserted"
    },
    {
      "participant_id": "ai-001",
      "kind": "ai_system",
      "display_name": "Sistema de generación de ejemplo",
      "role": "asistencia en borradores",
      "system": {
        "provider": "unknown",
        "model": "unknown",
        "version": "unknown"
      }
    }
  ],
  "artifacts": [
    {
      "artifact_id": "artifact-001",
      "version_id": "v1",
      "label": "Borrador final",
      "media_type": "text/plain",
      "byte_length": 0,
      "digest": {
        "algorithm": "sha-256",
        "value": "REPLACE_WITH_64_LOWERCASE_HEX_CHARACTERS"
      },
      "availability": "external"
    }
  ],
  "event_log": {
    "format": "pcs-json-events-v0.1",
    "events_uri": "./events/",
    "first_sequence": 0,
    "last_sequence": 1,
    "last_event_hash": "REPLACE_WITH_64_LOWERCASE_HEX_CHARACTERS"
  },
  "disclaimer": "Las contribuciones y roles son declaraciones; este manifiesto no adjudica autoría ni derechos."
}
```

## 16. Ejemplo de evento de contribución

```json
{
  "protocol": "https://example.org/pcs/0.1",
  "project_id": "urn:uuid:7d5f2f39-7e2c-4a48-94c8-a8d7a120c7d4",
  "sequence": 1,
  "event_id": "urn:uuid:4856d487-3c0a-4c5d-b04f-718873a9e2a1",
  "event_type": "contribution_declared",
  "occurred_at": "2026-11-05T12:10:00Z",
  "recorded_at": "2026-11-05T12:11:00Z",
  "actor_id": "person-001",
  "previous_event_hash": "REPLACE_WITH_PREVIOUS_EVENT_HASH",
  "data": {
    "contribution_id": "contribution-001",
    "participant_id": "person-001",
    "action": "selected_and_revised",
    "description": "La persona revisó, seleccionó y editó el borrador.",
    "artifact_refs": [
      {
        "artifact_id": "artifact-001",
        "version_id": "v1"
      }
    ],
    "basis": "participant_statement",
    "sensitivity": "public"
  },
  "event_hash": {
    "algorithm": "sha-256",
    "value": "REPLACE_WITH_64_LOWERCASE_HEX_CHARACTERS"
  },
  "signature": null
}
```

## 17. Referencias normativas

- RFC 3339 — fecha y hora en Internet: https://www.rfc-editor.org/rfc/rfc3339
- RFC 8785 — JSON Canonicalization Scheme (JCS): https://www.rfc-editor.org/rfc/rfc8785
- FIPS 180-4 — Secure Hash Standard (incluye SHA-256): https://csrc.nist.gov/pubs/fips/180-4/upd1/final
- RFC 8032 — EdDSA/Ed25519: https://www.rfc-editor.org/rfc/rfc8032
- RFC 3161 — protocolo de autoridad de sellado de tiempo: https://www.rfc-editor.org/rfc/rfc3161

## Apéndice A. Lista de verificación para una implementación

1. Validar JSON UTF-8 y rechazar claves duplicadas.
2. Validar UUID, fechas RFC 3339, secuencias y tipos conocidos.
3. Canonicalizar con JCS antes del cálculo de hash.
4. Recalcular cada hash; no confiar en el valor recibido.
5. Verificar los enlaces desde el génesis.
6. Verificar hashes de artefactos sobre bytes exactos.
7. Verificar firmas solo cuando se disponga de una clave pública.
8. Reportar por separado firma, identidad, integridad y declaración.
9. No usar `innerHTML` con contenido no confiable en una interfaz web.
10. No cargar claves privadas en el navegador o en el paquete.
11. Ofrecer exportación del resultado y de los errores de validación.
12. No mostrar etiquetas como “auténtico” o “autor probado” basadas solo en SHA-256.

## Apéndice B. Decisiones abiertas para revisión antes de 1.0

- URI definitiva del protocolo y política de alojamiento de esquemas.
- Perfil formal de claves y rotación/revocación de claves.
- Formato de firmas detached e interoperabilidad entre bibliotecas.
- Modelo de credenciales opcionales para organizaciones, sin obligar identidad civil pública.
- Perfil de privacidad y consentimiento para proyectos con múltiples participantes.
- Registro de extensiones y proceso de gobernanza independiente.
- Evaluación de la necesidad de múltiples algoritmos hash en futuras versiones.
- Pruebas de conformidad mantenidas por más de una implementación independiente.

## 18. Vectores de Prueba y Conformidad

Para garantizar la interoperabilidad, el repositorio incluye un archivo `test-vectors.json` con casos de prueba reproducibles. Cualquier implementación debe pasar estos vectores usando el script `verify_pcs.js` provisto en Node.js (o su equivalente en otro lenguaje).

Los vectores cubren:
- **Pruebas positivas:** Hashes correctos, encadenamiento válido y firmas Ed25519 correctas.
- **Pruebas negativas:** Alteración de bytes (hash incorrecto), salto de secuencia, y enlaces de cadena rotos.



## 19. Formatos de Fecha y Hora (RFC 3339)

Para garantizar la interoperabilidad global y evitar ambigüedades en las marcas de tiempo, PCS 0.1 exige que todos los campos temporales (`occurred_at`, `recorded_at` y cualquier otro campo de fecha) cumplan estrictamente con el estándar **RFC 3339** (Perfil de ISO 8601 para Internet).

### 19.1. Reglas de Formato
1. **Fecha completa:** `YYYY-MM-DD`.
2. **Separador:** La letra `T` (mayúscula).
3. **Hora completa:** `hh:mm:ss`.
4. **Fracciones de segundo:** Opcionales (`hh:mm:ss.SSS`).
5. **Offset obligatorio:** Se DEBE indicar la zona horaria usando `Z` (para UTC) o un offset numérico (`+hh:mm` o `-hh:mm`).
6. **Prohibición:** NO se permite el uso de zonas horarias alfabéticas (ej. "PST", "EST") ni el uso de tiempos locales sin offset.
7. **Segundos Bisiestos:** Un segundo bisiesto (ej. `1990-12-31T23:59:60Z`) es válido bajo este perfil y DEBE ser aceptado por el validador.

### 19.2. Ejemplos Válidos
- `2026-11-05T12:00:00Z` (UTC)
- `2026-11-05T12:00:00.500Z` (UTC con milisegundos)
- `2026-11-05T06:00:00-06:00` (Hora local de México con offset)
---

**Fin de PCS-RFC-0001, versión 0.1.0-draft.**