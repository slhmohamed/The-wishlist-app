const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({

name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    curency:{
        type:String,
        required:true,
        enum: ["USD", "EURO","TND"],
    },
    picture: {
        type: String,
      },
    description:{
        type:String,
        required:true,
        maxlength: 500,
    },

    wishlistID:{
        type:String,
        required:true
    },
    
    status:{
        type:String,
        required:true
    },
    posterId:{
        type:mongoose.Schema.Types.ObjectId,
            ref: "users"
    }
    
    
 
},
    

{
    timestamps: true,
  }

);

const ProductModel=mongoose.model('products',productSchema)

exports.ProductModel=ProductModel