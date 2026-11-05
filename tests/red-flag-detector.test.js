// Test del Detector de Banderas Rojas
console.log("🧪 Ejecutando tests de red-flag-detector.js...");

function testRedFlagDetector() {
    // Mock de parsedData
    const mockParsed = {
        text: "urgente inversión segura con bitcoin para ganar dinero rápido",
        urls: [],
        emails: []
    };

    const flags = detectRedFlags(mockParsed);
    
    // Test 1: Debe detectar al menos 2 banderas (urgency, wealth)
    console.assert(flags.length >= 2, "❌ Fallo: No se detectaron suficientes banderas rojas");
    console.log("✅ Test 1 pasado: Banderas rojas detectadas correctamente.");

    // Test 2: Debe detectar "bitcoin" dentro de la bandera de riqueza
    const wealthFlag = flags.find(f => f.id === 'wealth');
    console.assert(wealthFlag && wealthFlag.matches.includes('bitcoin'), "❌ Fallo: No se detectó la palabra bitcoin");
    console.log("✅ Test 2 pasado: Patrones de riqueza detectados.");
}

testRedFlagDetector();