const mongoose=require('mongoose');
const jwt =require('jsonwebtoken');
const config=require('config');
const Joi = require('joi');
const maxAge = 3 * 24 * 60 * 60 * 1000;
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true
    },
     
   
    password:{
        type:String,
        required:true
    },   
},{
    timestamps: true,
  });
userSchema.methods.generateAuthToken=function(){
    const token =jwt.sign({_id:this.id},config.get('jwtPrivateKey'), {
        expiresIn: maxAge
      });
    return token;
}
const userModel =mongoose.model('users',userSchema);
const validate = (req) => {
    const schema = { 
        username:Joi.string().min(5).max(200).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }
    

  return  Joi.validate(req, schema);
}
 

 
exports.userModel=userModel,
 exports.validate=validate