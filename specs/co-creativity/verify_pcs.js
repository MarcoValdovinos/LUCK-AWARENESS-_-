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
    
    console.log(`✅ Integridad OK (Hash: ${hash.substring(0, 16)}...)`);
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
    console.log(`✅ Cadena de eventos verificada (${events.length} eventos).`);
    return true;
}

// --- MODO DE PRUEBA AUTOMÁTICO ---
if (require.main === module) {
    console.log("🔱 Iniciando pruebas de verificación PCS 0.1...\n");
    
    try {
        const testData = JSON.parse(fs.readFileSync('./test-vectors.json', 'utf8'));
        
        // Prueba 1: Validar evento génesis
        console.log(`▶ Ejecutando: ${testData.vectors[0].id}`);
        verifyHash(testData.vectors[0].event);

        // Prueba 2: Evento negativo
        console.log(`\n▶ Ejecutando: ${testData.vectors[2].id}`);
        verifyHash(testData.vectors[2].event);
        
        console.log("\n🎉 Pruebas completadas.");
    } catch (e) {
        console.error("Error ejecutando las pruebas:", e.message);
    }
}

module.exports = { verifyHash, verifyChain };