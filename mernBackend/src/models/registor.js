const mongoose=require('mongoose');

const userData=new mongoose.Schema({
    firstName:{
        require:true,
        type:String
    },
    lastName:{
        require:true,
        type:String
    },
    email:{
        require:true,
        type:String,
        unique:true
    },
    password:{
        require:true,
        type:Number
    },
    confirmPassword:{
        require:true,
        type:Number
    }
})

const Register=new mongoose.model( "Register",userData);

module.exports=Register;