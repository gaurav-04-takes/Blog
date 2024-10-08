const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/registrationempl",{
    
}).then(()=>{
    console.log("connection stablish to mongodb");
}).catch((err)=>{
    console.log("unable to connect to db", err)
})
