const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Chatbots',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected")
})
.catch((e)=>{
    console.log(e)
})
const ChatUserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        min:0
    }
})
const ChatBot=mongoose.model('chatbots',ChatUserSchema)
module.exports=ChatBot