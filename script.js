const saadSelectorBtn = document.querySelector('#Saad-selector')
const asadSelectionBtn = document.querySelector('#Asad-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')
const senderBtn = document.querySelector('.send-button')

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Saad' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender} </div>
        <div class="message-text">${message.text} </div>
        <div class="message-timestamp">${message.timestamp} </div>
    </div>
`
let messageSender = 'Saad'

const updateMessageSender = (name) =>{
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`

    if(name === 'Saad') {
        saadSelectorBtn.classList.add('active-person')
        asadSelectionBtn.classList.remove('active-person')
    }
    if(name === 'Asad') {
        asadSelectionBtn.classList.add('active-person')
        saadSelectorBtn.classList.remove('active-person')
    }
    chatInput.focus()
}
saadSelectorBtn.onclick = () => updateMessageSender('Saad')
asadSelectionBtn.onclick = () => updateMessageSender('Asad')

const sendMessage = (e) =>{
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute:'numeric',hour12: true})
    const message = {
        sender: messageSender,
        text:chatInput.value,
        timestamp,
    }
    localStorage.setItem('messages', JSON.stringify(message))
    chatMessages.innerHTML += createChatMessageElement(message)
    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)