// Test del Calculador de Riesgo
console.log("🧪 Ejecutando tests de risk-score.js...");

function testRiskScore() {
    // Test 1: Riesgo Bajo (sin banderas)
    const scoreLow = calculateRiskScore([]);
    console.assert(scoreLow.score === 0, "❌ Fallo: Score bajo no es 0");
    console.assert(scoreLow.level === "Bajo", "❌ Fallo: Nivel bajo incorrecto");
    console.log("✅ Test 1 pasado: Riesgo bajo calculado correctamente.");

    // Test 2: Riesgo Crítico (muchas banderas)
    const mockFlags = [
        { weight: 35 }, { weight: 30 }, { weight: 25 } // Total 90
    ];
    const scoreHigh = calculateRiskScore(mockFlags);
    console.assert(scoreHigh.score === 90, "❌ Fallo: Score alto no es 90");
    console.assert(scoreHigh.level === "Crítico", "❌ Fallo: Nivel crítico incorrecto");
    console.log("✅ Test 2 pasado: Riesgo crítico calculado correctamente.");
}

testRiskScore();