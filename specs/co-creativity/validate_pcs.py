const crypto = require('crypto');
const fs = require('fs');

/**
 * Canonicalización aproximada (JCS - RFC 8785).
 * En producción, usa una librería como 'canonicalize' de npm.
 */
function canonicalize(obj) {
    return JSON.stringify(obj, Object.keys(obj).sort());
}

/**
 * Valida si un string cumple estrictamente con RFC 3339.
 */
function isValidRFC3339(dateString) {
    const rfc3339Regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
    if (!rfc3339Regex.test(dateString)) return false;
    
    // Validar que sea una fecha real en el calendario
    const parsedDate = Date.parse(dateString);
    if (isNaN(parsedDate)) return false;

    return true;
}

/**
 * Verifica la integridad de un evento calculando su hash.
 */
function verifyHash(event) {
    // 1. Copia sin event_hash y signature
    const eventCopy = { ...event };
    delete eventCopy.event_hash;
    delete eventCopy.signature;

    // 2. Canonicalizar y hashear
    const canonicalData = canonicalize(eventCopy);
    const hash = crypto.createHash('sha256').update(canonicalData).digest('hex');
    
    // 3. Comparar
    const declaredHash = event.event_hash ? event.event_hash.value : null;
    
    if (hash !== declaredHash) {
        console.error(`❌ FALLO DE INTEGRIDAD. Esperado: ${declaredHash}, Calculado: ${hash}`);
        return false;
    }
    
    return true;
}

/**
 * Verifica el encadenamiento de un array de eventos.
 */
function verifyChain(events) {
    for (let i = 1; i < events.length; i++) {
        const prevEvent = events[i - 1];
        const currentEvent = events[i];

        if (currentEvent.previous_event_hash !== prevEvent.event_hash.value) {
            console.error(`❌ FALLO DE CADENA en el evento secuencia ${i}. El enlace no coincide.`);
            return false;
        }
        if (currentEvent.sequence !== prevEvent.sequence + 1) {
            console.error(`❌ FALLO DE SECUENCIA en el evento ${i}. Salto de índice.`);
            return false;
        }
    }
    return true;
}

// --- MODO DE PRUEBA AUTOMÁTICO ---
if (require.main === module) {
    console.log("🔱 Iniciando pruebas de verificación PCS 0.1...\n");
    
    try {
        const testData = JSON.parse(fs.readFileSync('./test-vectors.json', 'utf8'));
        let passed = 0;
        let failed = 0;

        testData.vectors.forEach((vector, index) => {
            console.log(`▶ [${vector.id}] ${vector.description}`);
            
            // 1. Verificar formato de fecha RFC 3339
            if (vector.event.occurred_at && !isValidRFC3339(vector.event.occurred_at)) {
                console.error(`  ❌ FALLO: La fecha no cumple con RFC 3339 (${vector.event.occurred_at})`);
                failed++;
                return;
            }

            // 2. Verificar Hash
            const hashResult = verifyHash(vector.event);
            
            // Comparamos el resultado con el esperado en el vector
            if (hashResult === vector.expected_result) {
                console.log(`  ✅ PASS\n`);
                passed++;
            } else {
                console.error(`  ❌ FAIL (No coincidió con lo esperado)\n`);
                failed++;
            }
        });

        console.log(`\n📊 Resultados: ${passed} pasadas, ${failed} fallidas.`);
        if (failed === 0) console.log("🎉 Todas las pruebas completadas correctamente.");
        
    } catch (e) {
        console.error("Error ejecutando las pruebas:", e.message);
    }
}

module.exports = { verifyHash, verifyChain, isValidRFC3339 };