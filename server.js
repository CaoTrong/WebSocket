const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
   ws.on('message', message => {
       // Chuyển buffer thành chuỗi trước
       const msgText = message.toString(); // <=== thêm dòng này
   
       // (Tuỳ bạn, có thể parse JSON nếu cần thêm xử lý)
       // const parsed = JSON.parse(msgText);
   
       const payload = JSON.stringify({ message: msgText });
   
       wss.clients.forEach(client => {
           if (client.readyState === WebSocket.OPEN) {
               client.send(payload);
           }
       });
   });
});

console.log("WebSocket server running on port " + PORT);
