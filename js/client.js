const socket = io('http://localhost:8000', { transports: ['websocket'] });

// respective dom elements
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
let audio = new Audio('ding.mp3');

// get new user's name
const name = prompt("Enter your name to join");

// function which will append to container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left')
        audio.play();
}

// if form gets submitetd , send teh form to server
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit('send', message);
    messageInput.value = '';
})

// let the server know new  user has joined
socket.emit('new-user-joined', name);


//recieve the event his, her name from the server if a nw user joins
socket.on('user-joined', name => {
    append(`${name} joined the chat`, "right");
})


// if server sends the message recieve it
socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

// if a user leaves the chat, append the info  to container
socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})