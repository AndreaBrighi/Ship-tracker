const express = require('express');
const dbMessages = require('./database/Message_Iteractions')
const app = express();

const portRequests = 3000;

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
    server = new Server(3001);
let clientConnected = new Map() //la mappa è coposta da una socket (key) + nome della nave


// event fired every time a new client connects:
server.on("connection", (socket) => {
    socket.on("requestConnection", function(data) {
        const jsonData = JSON.parse(data)
        clientConnected.set(socket, jsonData.name);
        // console.info("Client " + jsonData.name + " connected with "+`[id=${socket.id}]`);
    });

    socket.on("sendMessage", function(data) {
        const jsonData = JSON.parse(data)
        const reciverShip = getSocket(jsonData.reciver)
        if(reciverShip != undefined) //se la nave esiste, è online. le invio il messaggio
            reciverShip.emit("newMessage", JSON.stringify({sender: jsonData.sender, message: jsonData.message}))
        //after all, store the message in the db
        dbMessages.storeMessage(jsonData)
        
    });

    socket.on("getMessages", async function(data) {
        const jsonData = JSON.parse(data) //include sender and reciver
        socket.emit("allMessages", JSON.stringify(await dbMessages.getMessages_From_To(jsonData.sender, jsonData.reciver)))
    });

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        clientConnected.delete(socket);
        // console.info(`Client gone [id=${socket.id}]`);
    });
});



function getSocket(shipNameFind) {
    for (const [shipSocket, shipName] of clientConnected.entries()) {
        if(shipName === shipNameFind)  //Search for all ships. get the one with the name equals to the reciver
            return shipSocket;
    }
    return undefined;
}