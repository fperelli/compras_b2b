import pytest
import unittest.mock as mock
from agent.src.agent.tools import get_supplier_tools

@pytest.fixture
def mock_vector_store():
    # Creamos un mock en crudo, ya no testeamos el global de module namespace.
    return mock.MagicMock()

@pytest.fixture
def generated_tools(mock_vector_store):
    # Genera la lista completa indexada
    # [0]=history, [1]=market_price, [2]=validate_budget, [3]=evaluate_supplier_risk
    return get_supplier_tools(mock_vector_store)

def test_get_supplier_history(mock_vector_store, generated_tools):
    mock_doc = mock.MagicMock()
    mock_doc.page_content = "Historial del proveedor TechCorp: Cumplimiento del 95%, 3 años de relación."
    mock_vector_store.similarity_search.return_value = [mock_doc]
    
    get_supplier_history = generated_tools[0]
    result = get_supplier_history.invoke("SUP-001")
    assert "TechCorp" in result
    mock_vector_store.similarity_search.assert_called_once()

def test_get_market_price(mock_vector_store, generated_tools):
    mock_doc = mock.MagicMock()
    mock_doc.page_content = "Mercado de laptops: Promedio USD 850, tendencia a la baja."
    mock_vector_store.similarity_search.return_value = [mock_doc]
    
    get_market_price = generated_tools[1]
    result = get_market_price.invoke("laptops")
    assert "850" in result
    mock_vector_store.similarity_search.assert_called_once()

def test_evaluate_supplier_risk(mock_vector_store, generated_tools):
    mock_doc = mock.MagicMock()
    mock_doc.page_content = "Riesgo de TechCorp: Bajo en financiero, medio en logístico."
    mock_vector_store.similarity_search.return_value = [mock_doc]
    
    evaluate_supplier_risk = generated_tools[3]
    result = evaluate_supplier_risk.invoke("SUP-001")
    assert "logístico" in result
    mock_vector_store.similarity_search.assert_called_once()
