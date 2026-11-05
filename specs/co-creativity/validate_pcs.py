import json
import sys
import hashlib

def canonicalize(data):
    """Aproximación a JSON Canonicalization Scheme (JCS) de Python"""
    return json.dumps(data, separators=(',', ':'), sort_keys=True).encode('utf-8')

def validate_event(event):
    # 1. Copia profunda sin event_hash ni signature
    event_copy = {k: v for k, v in event.items() if k not in ['event_hash', 'signature']}
    
    # 2. Canonicalizar
    canonical_bytes = canonicalize(event_copy)
    
    # 3. Calcular SHA-256
    calculated_hash = hashlib.sha256(canonical_bytes).hexdigest()
    
    # 4. Comparar
    declared_hash = event.get("event_hash", {}).get("value", "")
    return calculated_hash == declared_hash

def main():
    if len(sys.argv) < 2:
        print("Uso: python validate_pcs.py <event.json>")
        sys.exit(1)
        
    filepath = sys.argv[1]
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            event = json.load(f)
    except Exception as e:
        print(f"❌ Error leyendo JSON: {e}")
        sys.exit(1)
        
    print(f"🔍 Validando evento: {event.get('event_id')}")
    
    if validate_event(event):
        print("✅ Integridad verificada: El hash del evento es correcto.")
        print(f"   Hash: {event['event_hash']['value']}")
    else:
        print("❌ ALERTA: El hash declarado no coincide con los datos.")
        print(f"   Esperado: {event.get('event_hash', {}).get('value')}")
        # Imprimir el calculado para depuración
        event_copy = {k: v for k, v in event.items() if k not in ['event_hash', 'signature']}
        print(f"   Calculado: {hashlib.sha256(canonicalize(event_copy)).hexdigest()}")

if __name__ == "__main__":
    main()