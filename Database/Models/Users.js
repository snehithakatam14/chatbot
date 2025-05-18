
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected ✅");
})
.catch((e) => {
    console.error("MongoDB connection error ❌:", e);
});

const ChatUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0,
        min: 0
    }
});

const ChatBot = mongoose.model('Chatbot', ChatUserSchema);
module.exports = ChatBot;