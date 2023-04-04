const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://sivakodi:sivakodi@cluster0.zvbiyc3.mongodb.net/demo_database?authSource=admin&replicaSet=atlas-bd1zsq-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',loginSchema)

module.exports=LogInCollection