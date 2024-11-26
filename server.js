const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

// Lista de clientes conectados
let clients = [];

wss.on('connection', ws => {
  // Agregar el cliente a la lista
  clients.push(ws);
  console.log('Nuevo cliente conectado');

  // Escuchar mensajes del cliente
  ws.on('message', (message) => {
    const messageText = message.toString(); // Convertir el mensaje a string
    console.log('Mensaje recibido del cliente:', messageText);

    // Responder con base en el mensaje recibido
    let response;
    switch (messageText) {
      case '1':
        response = 'Pregunta 1';
        break;
      case '2':
        response = 'Pregunta 2';
        break;
      case '3':
        response = 'Pregunta 3';
        break;
      case '4':
        response = 'Pregunta 4';
        break;
      case '5':
        response = 'Pregunta 5';
        break;
      default:
        response = 'Mensaje no válido';
        break;
    }

    // Enviar la respuesta a todos los clientes conectados
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(response);
      }
    });
  });

  // Manejar la desconexión del cliente
  ws.on('close', () => {
    console.log('Cliente desconectado');
    clients = clients.filter(client => client !== ws); // Remover cliente de la lista
  });

  // Enviar mensaje inicial al cliente
  ws.send('Hello! Message From Server!!');
});
