import json
import hashlib
import sys

def verify_manifest(file_path, actual_file_path=None):
    print(f"🔍 Verificando: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            manifest = json.load(f)
    except Exception as e:
        print(f"❌ Error leyendo el JSON: {e}")
        return False

    # 1. Validar campos mínimos obligatorios
    required = ["protocol_version", "work_id", "version", "timestamp", "content_hash", "contributions", "limitations_and_disputes"]
    for field in required:
        if field not in manifest:
            print(f"❌ Falta el campo obligatorio: {field}")
            return False

    print("✅ Estructura básica válida.")

    # 2. Verificar integridad del contenido (si se proporcionó el archivo original)
    if actual_file_path:
        print(f"📂 Calculando hash del archivo real: {actual_file_path}")
        sha256_hash = hashlib.sha256()
        with open(actual_file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        
        calculated_hash = sha256_hash.hexdigest()
        if calculated_hash == manifest['content_hash']:
            print(f"✅ INTEGRIDAD VERIFICADA: El hash coincide ({calculated_hash})")
        else:
            print(f"❌ ALERTA DE INTEGRIDAD: El archivo ha sido alterado.")
            print(f"   Esperado: {manifest['content_hash']}")
            print(f"   Obtenido: {calculated_hash}")
            return False

    # 3. Verificar declaraciones de consentimiento
    for contrib in manifest['contributions']:
        if contrib['entity_type'] == 'human' and not contrib.get('consent_given'):
            print(f"⚠️ Advertencia: El humano {contrib['entity_id']} no tiene consentimiento explícito registrado.")

    print("\n✅ Manifiesto validado correctamente.")
    print(f"⚠️ NOTA LEGAL: {manifest['limitations_and_disputes']}")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python verify_manifest.py <manifest.json> [archivo_original_opcional]")
        sys.exit(1)
    
    manifest_file = sys.argv[1]
    original_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    verify_manifest(manifest_file, original_file)