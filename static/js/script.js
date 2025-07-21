// Variáveis globais
let conversationHistory = [];
let isWaitingForResponse = false;

// Elementos DOM
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const loadingSpinner = document.getElementById('loadingSpinner');

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
    setupEventListeners();
    scrollToBottom();
});

// Configurar event listeners
function setupEventListeners() {
    // Enter key para enviar mensagem
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize do input
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Sidebar interactions
    setupSidebarInteractions();
}

// Configurar interações da sidebar
function setupSidebarInteractions() {
    // Destinos populares
    document.querySelectorAll('.destinations-list li').forEach(item => {
        item.addEventListener('click', function() {
            const destination = this.textContent.trim();
            const message = `Quero saber mais sobre ${destination}`;
            sendQuickMessage(message);
        });
    });

    // Serviços
    document.querySelectorAll('.services-list li').forEach(item => {
        item.addEventListener('click', function() {
            const service = this.textContent.trim();
            const message = `Preciso de informações sobre ${service}`;
            sendQuickMessage(message);
        });
    });
}

// Inicializar chatbot
function initializeChatbot() {
    // Adicionar mensagem de boas-vindas ao histórico
    const welcomeMessage = {
        role: 'assistant',
        content: 'Olá! Bem-vindo à Explore Angola! Sou o seu assistente virtual especializado em viagens por Angola.'
    };
    conversationHistory.push(welcomeMessage);
}

// Enviar mensagem principal
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message || isWaitingForResponse) {
        return;
    }

    // Adicionar mensagem do usuário à interface
    addMessageToChat(message, 'user');
    
    // Limpar input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Adicionar ao histórico
    conversationHistory.push({
        role: 'user',
        content: message
    });

    // Mostrar indicador de digitação
    showTypingIndicator();
    
    // Desabilitar envio
    setInputState(false);

    try {
        // Enviar para o backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: conversationHistory.slice(-10) // Últimas 10 mensagens
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao processar mensagem');
        }

        // Remover indicador de digitação
        hideTypingIndicator();

        // Adicionar resposta do bot
        addMessageToChat(data.response, 'bot');
        
        // Adicionar ao histórico
        conversationHistory.push({
            role: 'assistant',
            content: data.response
        });

    } catch (error) {
        console.error('Erro:', error);
        hideTypingIndicator();
        addMessageToChat(
            'Desculpe, houve um problema ao processar a sua mensagem. Por favor, tente novamente.', 
            'bot'
        );
    } finally {
        setInputState(true);
        scrollToBottom();
    }
}

// Enviar mensagem rápida
function sendQuickMessage(message) {
    messageInput.value = message;
    sendMessage();
}

// Adicionar mensagem ao chat
function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const currentTime = new Date().toLocaleTimeString('pt-PT', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const avatarIcon = sender === 'bot' ? 'fa-robot' : 'fa-user';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${avatarIcon}"></i>
        </div>
        <div class="message-content">
            ${formatMessage(message)}
        </div>
        <div class="message-time">${currentTime}</div>
    `;

    chatMessages.appendChild(messageDiv);
    
    // Animar entrada da mensagem
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        messageDiv.offsetHeight; // Force reflow
        messageDiv.style.transition = 'all 0.5s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);

    scrollToBottom();
}

// Formatar mensagem (suporte a markdown básico)
function formatMessage(message) {
    // Converter quebras de linha
    message = message.replace(/\n/g, '<br>');
    
    // Converter **texto** para <strong>texto</strong>
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Converter *texto* para <em>texto</em>
    message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Converter listas simples
    message = message.replace(/^- (.*$)/gim, '<li>$1</li>');
    message = message.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    return message;
}

// Mostrar indicador de digitação
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span style="margin-left: 10px;">O assistente está a responder...</span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Esconder indicador de digitação
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Controlar estado do input
function setInputState(enabled) {
    isWaitingForResponse = !enabled;
    messageInput.disabled = !enabled;
    sendButton.disabled = !enabled;
    
    if (enabled) {
        messageInput.focus();
    }
}

// Scroll para o final do chat
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Limpar chat
function clearChat() {
    if (confirm('Tem certeza que deseja limpar toda a conversa?')) {
        // Manter apenas mensagem inicial
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Olá! Bem-vindo à <strong>Explore Angola</strong>! 🇦🇴</p>
                    <p>Sou o seu assistente virtual especializado em viagens por Angola. Como posso ajudá-lo hoje?</p>
                    <ul>
                        <li>🏖️ Explorar destinos incríveis</li>
                        <li>🏨 Encontrar acomodações</li>
                        <li>🚗 Planear a sua viagem</li>
                        <li>📋 Informações sobre documentação</li>
                    </ul>
                    <p>Que tipo de experiência está à procura?</p>
                </div>
                <div class="message-time">Agora</div>
            </div>
        `;
        
        // Resetar histórico
        conversationHistory = [{
            role: 'assistant',
            content: 'Olá! Bem-vindo à Explore Angola! Sou o seu assistente virtual especializado em viagens por Angola.'
        }];
        
        scrollToBottom();
    }
}

// Exportar conversa
function exportChat() {
    if (conversationHistory.length <= 1) {
        alert('Não há conversa para exportar!');
        return;
    }

    let exportContent = 'CONVERSA COM EXPLORE ANGOLA - ASSISTENTE VIRTUAL\n';
    exportContent += '='.repeat(50) + '\n\n';
    exportContent += `Data: ${new Date().toLocaleDateString('pt-PT')}\n`;
    exportContent += `Hora: ${new Date().toLocaleTimeString('pt-PT')}\n\n`;
    
    conversationHistory.forEach((msg, index) => {
        if (index === 0) return; // Pular mensagem inicial
        
        const speaker = msg.role === 'user' ? 'VOCÊ' : 'ASSISTENTE EXPLORE ANGOLA';
        exportContent += `${speaker}:\n${msg.content}\n\n`;
    });
    
    exportContent += '='.repeat(50) + '\n';
    exportContent += 'Agência de Viagens Explore Angola\n';
    exportContent += 'Email: info@exploreangola.ao\n';
    exportContent += 'Telefone: +244 923 456 789\n';

    // Criar e baixar arquivo
    const blob = new Blob([exportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa-explore-angola-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Funções de utilidade
function showLoadingSpinner() {
    loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
}

// Detectar dispositivo móvel
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Ajustar interface para mobile
function adjustForMobile() {
    if (isMobileDevice()) {
        // Ajustes específicos para mobile
        document.body.classList.add('mobile-device');
    }
}

// Event listener para redimensionamento
window.addEventListener('resize', adjustForMobile);

// Analytics simples (opcional)
function trackInteraction(action, details = {}) {
    // Implementar analytics se necessário
    console.log('Interação:', action, details);
}

// Verificar conectividade
function checkConnection() {
    if (!navigator.onLine) {
        addMessageToChat(
            'Parece que está sem conexão à internet. Por favor, verifique a sua ligação.', 
            'bot'
        );
        return false;
    }
    return true;
}

// Event listeners para online/offline
window.addEventListener('online', function() {
    addMessageToChat('Conexão restaurada! Já pode continuar a conversar.', 'bot');
});

window.addEventListener('offline', function() {
    addMessageToChat('Conexão perdida. As mensagens serão enviadas quando a conexão for restaurada.', 'bot');
});

// Auto-save do histórico no localStorage (opcional)
function saveConversationHistory() {
    try {
        localStorage.setItem('exploreAngola_chatHistory', JSON.stringify(conversationHistory));
    } catch (error) {
        console.warn('Não foi possível salvar o histórico da conversa');
    }
}

function loadConversationHistory() {
    try {
        const saved = localStorage.getItem('exploreAngola_chatHistory');
        if (saved) {
            conversationHistory = JSON.parse(saved);
        }
    } catch (error) {
        console.warn('Não foi possível carregar o histórico da conversa');
    }
}

// Salvar histórico periodicamente
setInterval(saveConversationHistory, 30000); // A cada 30 segundos

// Carregar histórico ao inicializar
// loadConversationHistory();

// Feedback de qualidade (opcional)
function showFeedbackDialog() {
    // Implementar sistema de feedback se necessário
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
    initializeChatbot();
}