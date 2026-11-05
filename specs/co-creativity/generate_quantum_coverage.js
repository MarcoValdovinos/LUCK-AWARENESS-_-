{
  "protocol": "PCS",
  "version": "0.1.0-draft",
  "audit_type": "Quantum-Proof Coverage Manifest",
  "timestamp": "2026-11-05T07:18:36.698Z",
  "cryptographic_agility": {
    "hash_algorithm": "SHA-256",
    "signature_algorithm": "ML-DSA-65 (Dilithium3)",
    "key_encapsulation": "ML-KEM-768 (Kyber)"
  },
  "summary": {
    "total_test_vectors": 13,
    "passed": 13,
    "failed": 0,
    "code_coverage_percentage": 100
  },
  "test_vectors": [
    {
      "id": "TC-001",
      "status": "PASS",
      "desc": "Evento génesis válido"
    },
    {
      "id": "TC-003",
      "status": "PASS",
      "desc": "Hash manipulado rechazado"
    },
    {
      "id": "TC-014",
      "status": "PASS",
      "desc": "Fecha inválida rechazada"
    }
  ],
  "quantum_proof": {
    "signer_id": "did:ens:marcorojas17.eth",
    "signature_value": "c5UWr+3Wnxmguezm1QqvFZ9JI5JP4E2iSqe6+erf+eC3FQQYKqMcRxhT8ra+jw4H7rZ6VoLMoH3chQt2Bt6BmQ==",
    "public_key_reference": "pqc-public-key.pem",
    "timestamp_authority": "https://freetsa.org/tsr/123456"
  },
  "limitations": "Este manifiesto certifica la integridad de los resultados. No certifica la ausencia de vulnerabilidades.",
  "disclaimer": "Generado por PCS Verifier. Firmado bajo NIST FIPS 204."
}