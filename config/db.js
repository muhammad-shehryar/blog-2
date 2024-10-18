const mongoose = require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect("link",{
            newUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("mongodo connected")
    }   catch(error){
        console.log(`error ${error}`)
    }
   
}

export default connectDB;