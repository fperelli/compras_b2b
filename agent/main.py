"""
CLI entry point for the B2B Procurement Negotiation Agent.
"""
import sys
import json
import argparse
from dotenv import load_dotenv

load_dotenv()

DIVIDER = "═" * 65


def print_header():
    print(f"\n{DIVIDER}")
    print("  B2B Procurement Negotiation Agent")
    print("  Powered by Google Gemini 2.0 Flash + LangGraph")
    print(DIVIDER)


def run_test_negotiation():
    """Caso de prueba: negociación inicial con TechCorp Argentina."""
    test_request = {
        "request_id": "REQ-001",
        "supplier_id": "SUP-001",
        "supplier_name": "TechCorp Argentina",
        "category": "laptops",
        "volume": 50,
        "target_price": 800.0,
        "max_price": 900.0,
        "payment_terms": "net_60",
        "required_date": "2026-05-01",
        "restrictions": "Preferencia por proveedores con certificación ISO 9001",
    }

    print(f"\n📋 REQUERIMIENTO DE COMPRA:")
    print(json.dumps(test_request, ensure_ascii=False, indent=2))
    print(f"\n{DIVIDER}")
    print("⏳ Procesando negociación...")
    print(DIVIDER)

    from agent.src.agent.agent import run_negotiation
    result = run_negotiation(test_request)

    print("\n" + result)
    print(f"\n{DIVIDER}")
    print("✅ Negociación procesada. Requiere aprobación humana.")
    print(DIVIDER + "\n")


def run_test_counteroffer():
    """Caso de prueba: contraoferta ante respuesta del proveedor."""
    test_request = {
        "request_id": "REQ-001",
        "supplier_id": "SUP-001",
        "supplier_name": "TechCorp Argentina",
        "category": "laptops",
        "original_target_price": 800.0,
        "max_price": 900.0,
        "payment_terms": "net_60",
        "supplier_response_price": 920.0,
        "supplier_message": (
            "Estimados, agradecemos su propuesta. "
            "Nuestro mejor precio para 50 unidades es USD 920 por unidad."
        ),
        "negotiation_stage": "negotiation",
    }

    print(f"\n📋 CONTRAOFERTA — Respuesta recibida:")
    print(json.dumps(test_request, ensure_ascii=False, indent=2))
    print(f"\n{DIVIDER}")
    print("⏳ Generando contraoferta...")
    print(DIVIDER)

    from agent.src.agent.agent import run_counteroffer
    result = run_counteroffer(test_request)

    print("\n" + result)
    print(f"\n{DIVIDER}")
    print("✅ Contraoferta generada.")
    print(DIVIDER + "\n")


def main():
    print_header()
    parser = argparse.ArgumentParser()
    parser.add_argument("--counteroffer", action="store_true")
    args = parser.parse_args()

    if args.counteroffer:
        run_test_counteroffer()
    else:
        run_test_negotiation()


if __name__ == "__main__":
    main()
