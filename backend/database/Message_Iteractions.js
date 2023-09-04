const mongoose = require("mongoose");
const Message = require('./models/Messages')


//opening connection
mongoose.connect("mongodb://mongodb/webProject", 
		() => { console.log("Message service connected")},
		e => console.error("Error with routes service: " + e.message)
);

exports.storeMessage = async function(messageJSON) {
    const messagesCounter = await Message.find({$or:[
                                            {sender: messageJSON.sender, reciver: messageJSON.reciver},
                                            {sender: messageJSON.reciver, reciver: messageJSON.sender}]})
    await Message.create({sender : messageJSON.sender,
                        reciver: messageJSON.reciver,
                        message: messageJSON.message,
                        counter: messagesCounter.length});
    return;
}

exports.getMessages_From_To = async function(msgSender) {
    const allMessages = await Message.find({$or:[
                                            {sender: msgSender},
                                            {reciver: msgSender}]})
                                            .select(["-_id", "-__v"]).sort({counter:1});
    return {size: allMessages.length, payload: allMessages}
}
