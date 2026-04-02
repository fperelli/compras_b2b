import os

def build_system_prompt() -> str:
    """Lee el system prompt desde el archivo MD en la carpeta spec."""
    # La ruta es relativa al archivo prompts.py: ../../spec/system-prompt.md
    current_dir = os.path.dirname(os.path.abspath(__file__))
    prompt_path = os.path.join(current_dir, "..", "..", "spec", "system-prompt.md")
    
    if not os.path.exists(prompt_path):
        # Fallback si el archivo no existe
        return "Eres un asistente de compras B2B. Ayuda al usuario a negociar con proveedores."
        
    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()
