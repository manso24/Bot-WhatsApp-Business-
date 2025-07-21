# 🇦🇴 Explore Angola - Chatbot da Agência de Viagens

Um chatbot inteligente desenvolvido especificamente para uma agência de viagens angolana, utilizando tecnologia de IA avançada (ChatGPT) para oferecer suporte personalizado e informações detalhadas sobre destinos em Angola.

## ✨ Características Principais

### 🤖 Inteligência Artificial Avançada
- Powered by ChatGPT com conhecimento especializado sobre Angola
- Respostas contextuais e personalizadas
- Suporte em português angolano
- Memória de conversação para continuidade

### 🌍 Conhecimento Local Especializado
- **Destinos Populares**: Luanda, Benguela, Huambo, Lubango, Namibe, Cabinda
- **Atrações Naturais**: Cataratas de Kalandula, Fenda da Tundavala, Deserto do Namibe
- **Cultura e História**: Museus, fortalezas, centros culturais
- **Informações Práticas**: Documentação, vacinas, melhor época para visitar

### 🎨 Interface Moderna
- Design responsivo com tema angolano (cores da bandeira)
- Interface intuitiva e profissional
- Suporte completo para dispositivos móveis
- Animações suaves e feedback visual

### 🛠️ Funcionalidades Avançadas
- Mensagens rápidas para destinos populares
- Exportação de conversas
- Indicador de digitação em tempo real
- Histórico de conversação
- Verificação de conectividade

## 🚀 Tecnologias Utilizadas

- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **IA**: OpenAI GPT-3.5-turbo
- **Estilo**: CSS Grid/Flexbox, Font Awesome
- **Responsividade**: Mobile-first design

## 📋 Pré-requisitos

- Python 3.8+
- Conta na OpenAI com API key
- Navegador moderno

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <repository-url>
cd explore-angola-chatbot
```

### 2. Instale as dependências
```bash
pip install -r requirements.txt
```

### 3. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env e adicione sua chave da OpenAI
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Execute a aplicação
```bash
python app.py
```

### 5. Acesse no navegador
```
http://localhost:5000
```

## 🌟 Funcionalidades do Chatbot

### Serviços da Agência
- ✈️ Pacotes turísticos nacionais e internacionais
- 🏨 Reservas de hotéis e pousadas
- 🚗 Aluguel de viaturas 4x4
- 👨‍🏫 Guias especializados
- 🎭 Tours culturais e de aventura
- 📄 Vistos e documentação
- 🛡️ Seguro viagem

### Destinos Destacados
- **Luanda**: Capital cosmopolita, Ilha do Cabo, vida noturna
- **Benguela**: Praias paradisíacas, Baía Azul, arquitetura colonial
- **Lubango**: Fenda da Tundavala, Cristo Rei, Deserto do Namibe
- **Huambo**: Cidade das flores, clima ameno, natureza exuberante
- **Namibe**: Deserto único, welwitschia, praias selvagens
- **Cabinda**: Florestas tropicais, biodiversidade, Mayombe

### Informações Práticas
- 📅 Melhor época para visitar (maio a setembro - estação seca)
- 📋 Documentação necessária
- 💉 Vacinas recomendadas
- 💰 Informações sobre moeda (Kwanza - AOA)
- 🗣️ Idiomas (Português, línguas nacionais)

## 🎯 Casos de Uso

### Para Turistas
- Planeamento de viagens personalizadas
- Informações sobre atrações e atividades
- Recomendações de hotéis e restaurantes
- Orientações sobre documentação e saúde

### Para a Agência
- Atendimento 24/7 automatizado
- Qualificação de leads
- Informações padronizadas e atualizadas
- Redução da carga de trabalho da equipe

## 🔧 Configurações Avançadas

### Personalização do Prompt
Edite a variável `SYSTEM_PROMPT` em `app.py` para ajustar:
- Tom e estilo das respostas
- Informações específicas da agência
- Promoções e ofertas especiais
- Políticas e procedimentos

### Adição de Novos Destinos
Atualize o dicionário `ANGOLA_KNOWLEDGE` para incluir:
- Novos destinos
- Atrações adicionais
- Informações culturais
- Eventos sazonais

## 📱 Responsividade

O chatbot é totalmente responsivo e otimizado para:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (até 767px)

## 🔒 Segurança

- Validação de entrada do usuário
- Rate limiting (pode ser implementado)
- Sanitização de respostas
- Proteção contra injeção de prompts

## 🚀 Deployment

### Opções de Deploy
1. **Heroku**: Pronto para deploy com Procfile
2. **Vercel**: Suporte nativo para Flask
3. **AWS/GCP**: Para maior controle e escalabilidade
4. **VPS**: Instalação manual com Nginx

### Variáveis de Ambiente para Produção
```bash
FLASK_ENV=production
FLASK_DEBUG=False
OPENAI_API_KEY=your_production_key
SECRET_KEY=your_secure_secret_key
```

## 📊 Monitoramento

### Métricas Importantes
- Número de conversas iniciadas
- Tempo médio de resposta
- Satisfação dos usuários
- Destinos mais consultados
- Conversões para contactos

## 🛠️ Manutenção

### Atualizações Regulares
- Atualizar informações sobre destinos
- Adicionar novos pacotes e promoções
- Ajustar prompts baseado no feedback
- Atualizar dependências de segurança

### Backup e Recuperação
- Histórico de conversas (se ativado)
- Configurações personalizadas
- Base de conhecimento

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste thoroughly
5. Submeta um pull request

## 📞 Suporte

Para suporte técnico ou dúvidas sobre implementação:
- 📧 Email: dev@exploreangola.ao
- 📱 WhatsApp: +244 923 456 789
- 🌐 Site: www.exploreangola.ao

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- OpenAI pela tecnologia GPT
- Comunidade Python Flask
- Designers que inspiraram o tema visual
- Beta testers e feedback da comunidade angolana

---

**Developed with ❤️ for Angola by Explore Angola Team**

*Promovendo o turismo angolano através da tecnologia* 
