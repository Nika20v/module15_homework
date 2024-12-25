const wsUrl = 'wss://echo-ws-service.herokuapp.com';

let socket;
let messages = [];

function initWebSocket() {
 socket = new WebSocket(wsUrl);
 socket.onopen = function(event) {
 console.log('WebSocket connection established.');
 };
 socket.onmessage = function(event) {
 const message = event.data;
 displayMessage(message);
 };
 socket.onclose = function(event) {
 console.error('WebSocket connection closed.');
 };
}

function displayMessage(message) {
 const messageElement = document.createElement('div');
 messageElement.textContent = message;
 messages.push(messageElement);
 document.getElementById('messages').appendChild(messageElement);
}

function sendMessage() {
 const messageInput = document.getElementById('messageInput');
 const message = messageInput.value;
 messageInput.value = '';
 
 displayMessage(message);
 socket.send(message);
}

function sendLocation() {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(function(position) {
 const latitude = position.coords.latitude;
 const longitude = position.coords.longitude;
 
 const locationLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
 document.getElementById('locationLink').textContent = locationLink;
 socket.send(latitude + ',' + longitude);
 }, function(error) {
 console.error('Error getting location:', error);
 });
 } else {
 console.error('Geolocation is not supported by this browser.');
 }
}

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('sendLocation').addEventListener('click', sendLocation);

initWebSocket();