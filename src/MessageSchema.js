import mongoose from "mongoose";
const { model, Schema } = mongoose

const messagesSchema = new Schema({
    author:{
        email: {type: String},
        fullName: {type: String},
        age: {type: Number}
    },
    text: {type: String}
})

const MessagesSchema = model('messages', messagesSchema);

export default MessagesSchema