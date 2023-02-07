const express = require('express');
const dbMessages = require('./database/Message_Iteractions')
const app = express();

const portRequests = 3000;
const portChat = 3001;

const http = require('http').Server(app)
http.listen(portRequests, () => console.log("Express server running on port " + portRequests))


//setup routes
const loginRouter = require('./routes/Login')
const shipRouter = require('./routes/Ship_handler')
const routesRouter = require('./routes/Route_handler')
const towerRouter = require('./routes/Tower_handler')

//params for access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
//initialize routes
app.use('/login', loginRouter)
app.use('/shipreq', shipRouter)
app.use('/routereq', routesRouter)
app.use('/towerreq', towerRouter)




const
    {Server} = require("socket.io"),
    server = new Server(portChat);
let clientConnected = new Map()


// event fired every time a new client connects:
server.on("connection", (socket) => {
    socket.on("requestConnection", function(data) {
        const jsonData = JSON.parse(data)
        clientConnected.set(socket, jsonData.name);
        console.info("Client " + jsonData.name + " connected with "+`[id=${socket.id}]`);
    });

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        clientConnected.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

// // sends each client its current sequence number
// setInterval(() => {
//     for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
//         client.emit("seq-num", sequenceNumber);
//         sequenceNumberByClient.set(client, sequenceNumber + 1);
//     }
// }, 1000);