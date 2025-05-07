const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
   ws.on('message', message => {
        // Giả sử message là chuỗi thuần, bọc vào JSON
        const payload = JSON.stringify({ message });
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(payload);
            }
        });
    });
});

console.log("WebSocket server running on port " + PORT);
