from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import json
import datetime

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configurar OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Base de conhecimento sobre Angola e destinos
ANGOLA_KNOWLEDGE = {
    "destinos_populares": [
        "Luanda - Capital vibrante com praias, museus e vida noturna",
        "Benguela - Cidade costeira com belas praias e arquitetura colonial",
        "Huambo - Cidade das flores com clima ameno e natureza exuberante",
        "Lubango - Porta de entrada para o Deserto do Namibe e Fenda da Tundavala",
        "Namibe - Deserto e costa atlântica única",
        "Cabinda - Província rica em petróleo com florestas tropicais",
        "Soyo - Ponto de encontro do Rio Congo com o Atlântico"
    ],
    "atracoes_naturais": [
        "Cataratas de Kalandula - Entre as maiores de África",
        "Fenda da Tundavala - Vista panorâmica espetacular",
        "Deserto do Namibe - Paisagens únicas e dunas",
        "Parque Nacional da Kissama - Safari angolano",
        "Pedras Negras de Pungo Andongo - Formações rochosas místicas",
        "Lagoa do Arco-íris - Beleza natural preservada"
    ],
    "cultura": [
        "Museu Nacional de Antropologia",
        "Fortaleza de São Miguel",
        "Museu da Moeda",
        "Centro Cultural Português",
        "Mercado do Artesanato"
    ]
}

SYSTEM_PROMPT = """
Você é um assistente especializado da agência de viagens angolana "Explore Angola". 
Você tem conhecimento profundo sobre:

1. DESTINOS EM ANGOLA:
- Luanda: Capital cosmopolita, Ilha do Cabo, Fortaleza de São Miguel, vida noturna
- Benguela: Praias, arquitetura colonial, Baía Azul
- Huambo: Cidade das flores, clima ameno, natureza
- Lubango: Fenda da Tundavala, Deserto do Namibe, Cristo Rei
- Namibe: Deserto, welwitschia, praias selvagens
- Cabinda: Florestas tropicais, petróleo, Mayombe
- Soyo: Rio Congo, pesca, história

2. ATRAÇÕES NATURAIS:
- Cataratas de Kalandula (2ª maior de África)
- Parque Nacional da Kissama
- Pedras Negras de Pungo Andongo
- Fenda da Tundavala
- Deserto do Namibe

3. SERVIÇOS DA AGÊNCIA:
- Pacotes turísticos nacionais e internacionais
- Reservas de hotéis e pousadas
- Aluguel de viaturas 4x4
- Guias especializados
- Tours culturais e de aventura
- Vistos e documentação
- Seguro viagem

4. ASPECTOS PRÁTICOS:
- Melhor época para visitar (maio a setembro - estação seca)
- Documentação necessária
- Vacinas recomendadas
- Moeda: Kwanza (AOA)
- Idiomas: Português, línguas nacionais

DIRETRIZES:
- Seja caloroso, profissional e conhecedor
- Use português angolano quando apropriado
- Ofereça sempre alternativas de pacotes
- Mencione preços em Kwanzas quando relevante
- Promova o turismo interno angolano
- Seja específico sobre localizações e atividades
- Pergunte sobre preferências do cliente para personalizar sugestões
"""

def get_chatbot_response(user_message, conversation_history=[]):
    try:
        # Preparar mensagens para a API
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        # Adicionar histórico da conversa
        for msg in conversation_history[-10:]:  # Últimas 10 mensagens
            messages.append(msg)
        
        # Adicionar mensagem atual
        messages.append({"role": "user", "content": user_message})
        
        # Chamar API do OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=800,
            temperature=0.7,
            frequency_penalty=0.3,
            presence_penalty=0.3
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        return f"Desculpe, houve um problema técnico. Por favor, tente novamente. Erro: {str(e)}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        conversation_history = data.get('history', [])
        
        if not user_message:
            return jsonify({'error': 'Mensagem não pode estar vazia'}), 400
        
        # Obter resposta do chatbot
        bot_response = get_chatbot_response(user_message, conversation_history)
        
        return jsonify({
            'response': bot_response,
            'timestamp': datetime.datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@app.route('/destinations')
def get_destinations():
    return jsonify(ANGOLA_KNOWLEDGE)

@app.route('/health')
def health_check():
    return jsonify({'status': 'OK', 'service': 'Chatbot Explore Angola'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)