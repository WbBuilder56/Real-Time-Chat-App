const saadSelectorBtn = document.querySelector('#Saad-selector');
const asadSelectionBtn = document.querySelector('#Asad-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

// Load messages or initialize empty array
let messages = JSON.parse(localStorage.getItem('messages')) || [];

let messageSender = 'Saad'; // Default sender

// Function to create a message element
const createChatMessageElement = (message) => {
    const isCurrentSender = message.sender === messageSender;

    return `
        <div class="message ${isCurrentSender ? 'blue-bg' : 'gray-bg'}" 
            style="align-self: ${isCurrentSender ? 'flex-end' : 'flex-start'};">
            <div class="message-sender">${message.sender}</div>
            <div class="message-text">${message.text}</div>
            <div class="message-timestamp">${message.timestamp}</div>
        </div>
    `;
};

// Render messages with correct alignment
const renderMessages = () => {
    chatMessages.innerHTML = '';
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

window.onload = renderMessages;

const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`;

    // Highlight the active user
    saadSelectorBtn.classList.toggle('active-person', name === 'Saad');
    asadSelectionBtn.classList.toggle('active-person', name === 'Asad');

    renderMessages();
    chatInput.focus();
};

saadSelectorBtn.onclick = () => updateMessageSender('Saad');
asadSelectionBtn.onclick = () => updateMessageSender('Asad');

const sendMessage = (e) => {
    e.preventDefault();

    if (!chatInput.value.trim()) return;

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    };

    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));

    renderMessages();
    chatInputForm.reset();
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
    messages = [];
    localStorage.removeItem('messages');
    chatMessages.innerHTML = '';
});
