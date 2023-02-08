//procedura standard da mettere all'inizio. Stabilisce la connessione e registra la nave come online
const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:3001"); //establish connection to chat server
    ioClient.emit("requestConnection", JSON.stringify({name: "ship2"}))

//subito sotto la comunicazione, è importante impostare cosa fare nella ricezione dei messaggi

//Setup per la ricezione di un messaggio da parte del server
ioClient.on("newMessage", function(data) {
    const jsonData = JSON.parse(data)
    console.log("Recived message. Sender: " + jsonData.sender + "; message: " + jsonData.message)
})

//Setup per la ricezione di tutti i messaggi
ioClient.on("allMessages", function(data) {
    const jsonData = JSON.parse(data)
    console.log("Recived all messages: " + data)
})


//setup usatp per richiedere tutti i messaggi di una determinata chat
ioClient.emit("getMessages", JSON.stringify({
    sender: "ship1",
    reciver: "ship2",
}))

return;
//invio di un messaggio della chat indirizzato a qualche altra nave. USARE IL NOME DELLA NAVE
ioClient.emit("sendMessage", JSON.stringify({
    sender: "ship2",
    reciver: "ship1",
    message: "test message"
}))

