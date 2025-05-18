const mongoose=require('mongoose')
const User=require('./Users')
mongoose.connect('mongodb://127.0.0.1:27017/Chatbots',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected")
})
.catch((e)=>{
    console.log(e)
})
const HistorySchema=mongoose.Schema({
    Question:{
        type:String,
        required:true
    },
    Output:{
        type:String,
        required:true
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
const History=mongoose.model('history',HistorySchema)
module.exports=History