const mongoose=require("mongoose");
const {log} = require("node:console");
const connectDB= async() => {
    try{
              await mongoose.connect(process.env.MONGO_URI);
              console.log("DB connected successfuly");
    }
    catch(e){
       console.log("unable to connect db",e.message);
       process.exit(1);
    }
};
module.exports= connectDB; 