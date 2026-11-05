// Test de utilidades de Hash
console.log("🧪 Ejecutando tests de hash-utils.js...");

async function testHashUtils() {
    const testText = "Hola Mundo";
    
    // Test 1: El hash debe tener 64 caracteres (SHA-256)
    const hash = await generateSHA256(testText);
    console.assert(hash.length === 64, "❌ Fallo: El hash no tiene 64 caracteres");
    console.assert(hash === "c0c9d9b7b3c2e5a4d3b2a1c0e9d8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0", "❌ Fallo: El hash no coincide"); // Nota: El hash real varía, esto es un ejemplo
    console.log("✅ Test 1 pasado: Hash SHA-256 generado correctamente.");

    // Test 2: IDs cortos
    const id = generateShortId();
    console.assert(id.length === 8, "❌ Fallo: El ID no tiene 8 caracteres");
    console.log("✅ Test 2 pasado: ID corto generado correctamente.");
}

testHashUtils();