// Test de la Bóveda de Evidencia
console.log("🧪 Ejecutando tests de evidence-vault.js...");

async function testEvidenceVault() {
    // Test 1: Guardar y recuperar evidencia
    const mockParsed = { urls: ["http://test.com"], emails: ["a@b.com"] };
    const mockRisk = { score: 50, level: "Alto", cssClass: "score-high" };
    
    // Limpiar localStorage antes del test
    localStorage.removeItem('kronos_evidence');

    const evidence = await saveEvidence("test", mockParsed, [], mockRisk);
    
    console.assert(evidence.id.length === 8, "❌ Fallo: ID de evidencia incorrecto");
    console.assert(evidence.hash.length === 64, "❌ Fallo: Hash de evidencia incorrecto");
    
    const history = JSON.parse(localStorage.getItem('kronos_evidence'));
    console.assert(history.length === 1, "❌ Fallo: No se guardó en LocalStorage");
    
    console.log("✅ Test 1 pasado: Evidencia guardada y recuperada correctamente.");
    
    // Limpieza final
    localStorage.removeItem('kronos_evidence');
}

testEvidenceVault();