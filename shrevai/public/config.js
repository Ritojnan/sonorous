console.log('Hello, world!');// public/embed-chatbot.js
(function() {
  const iframe = document.createElement('iframe');
  iframe.src = 'http://127.0.0.1:3000/embed'; // Replace with your domain and path
  iframe.style.width = '100%';
  iframe.style.height = '500px';
  iframe.style.border = 'none';
  iframe.title = 'ChatBot';

  const container = document.getElementById('chatbot-container');
  if (container) {
    container.appendChild(iframe);
  } else {
    console.error('ChatBot container not found');
  }
})();
