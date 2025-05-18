const mongoose = require('mongoose');
const User = require('./Users');
require('dotenv').config(); 
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected ✅");
})
.catch((e) => {
    console.error("MongoDB connection error ❌:", e);
});

const HistorySchema = new mongoose.Schema({
    Question: {
        type: String,
        required: true
    },
    Output: {
        type: String,
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const History = mongoose.model('history', HistorySchema);
module.exports = History;