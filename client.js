const socket = io('http://localhost:8080');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const user = prompt("Enter your name to join");
socket.emit('new-user-joined', user);

socket.on('user-joined', user =>{
    append(`${user} joined the chat`, 'right');
})

socket.on('receive', data =>{
    append(`${data.user}: ${data.message}`, 'left');
})

socket.on('left', user =>{
    append(`${user} left the chat`, 'left');
})


