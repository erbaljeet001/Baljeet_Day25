const mongoose = require("mongoose");

const useSchema= new mongoose.Schema(
    { 
          name:{
            type:String,
            require:true,
            trim:true
          },
          email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
          },
          password:{
            type: String,
            require:true,
            minilength:6
          }
    },
    {
       timestamps :true
    }
);


const User = mongoose.model("User",useSchema);
module.exports = User;
