const WebSocket = require("ws");
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

// Lista de clientes conectados
let clients = [];

wss.on("connection", (ws) => {
  // Agregar el cliente a la lista
  clients.push(ws);
  console.log("Nuevo cliente conectado");

  // Escuchar mensajes del cliente
  ws.on("message", (message) => {
    const messageText = message.toString(); // Convertir el mensaje a string
    console.log("Mensaje recibido del cliente:", messageText);

    // Responder con base en el mensaje recibido
    let response;

    if (messageText === "actualizar") {
        response = "actualizar";
    } else if (messageText === "tabla") {
        response = "tabla";
    } else if (!isNaN(messageText) && parseInt(messageText) >= 1 && parseInt(messageText) <= 30) {
        // Mensajes numéricos entre 1 y 30
        response = `Pregunta ${messageText}`;
    } else {
        response = "Pregunta no valida";
    }

    // Enviar la respuesta a todos los clientes conectados
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(response);
        }
    });
});

  // Manejar la desconexión del cliente
  ws.on("close", () => {
    console.log("Cliente desconectado");
    clients = clients.filter((client) => client !== ws); // Remover cliente de la lista
  });

  // Enviar mensaje inicial al cliente
  ws.send("Hello! Message From Server!!");
});
