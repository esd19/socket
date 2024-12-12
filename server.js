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
    switch (messageText) {
      case "actualizar":
        response = "actualizar";
        break;
      case "tabla":
        response = "tabla";
        break;

      case "1":
        response = "Pregunta 1";
        break;
      case "2":
        response = "Pregunta 2";
        break;
      case "3":
        response = "Pregunta 3";
        break;
      case "4":
        response = "Pregunta 4";
        break;
      case "5":
        response = "Pregunta 5";
        break;
      case "6":
        response = "Pregunta 6";
        break;
      case "7":
        response = "Pregunta 7";
        break;
      case "8":
        response = "Pregunta 8";
        break;
      case "9":
        response = "Pregunta 9";
        break;
      case "10":
        response = "Pregunta 10";
        break;
      case "11":
        response = "Pregunta 11";
        break;
      case "12":
        response = "Pregunta 12";
        break;
      case "13":
        response = "Pregunta 13";
        break;
      case "14":
        response = "Pregunta 14";
        break;
      case "15":
        response = "Pregunta 15";
        break;
      case "16":
        response = "Pregunta 16";
        break;
      case "17":
        response = "Pregunta 17";
        break;
      case "18":
        response = "Pregunta 18";
        break;
      case "19":
        response = "Pregunta 19";
        break;
      case "20":
        response = "Pregunta 20";
        break;
      case "21":
        response = "Pregunta 21";
        break;
      case "22":
        response = "Pregunta 22";
        break;
      case "23":
        response = "Pregunta 23";
        break;
      case "24":
        response = "Pregunta 24";
        break;
      case "25":
        response = "Pregunta 25";
        break;
      case "26":
        response = "Pregunta 26";
        break;
      case "27":
        response = "Pregunta 27";
        break;
      case "28":
        response = "Pregunta 28";
        break;
      case "29":
        response = "Pregunta 29";
        break;
      case "30":
        response = "Pregunta 30";
        break;

      default:
        response = "Pregunta no valida";
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
  ws.on("close", () => {
    console.log("Cliente desconectado");
    clients = clients.filter((client) => client !== ws); // Remover cliente de la lista
  });

  // Enviar mensaje inicial al cliente
  ws.send("Hello! Message From Server!!");
});
