

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                });
        }
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPassword
        });
        res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            data: user
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Unable to Register",
            error: e.message
        });
    }
};

const loginUser =async(req,res) =>{

    try{
      const { email,password} = req.body;
      if(!email || !password)
      {
        return res.status(400).json({
            success:false,
            message:"Email & password required"
        });
        
      }
      const user =await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                success: false,
                message: "Invalid Email/ Credentials"
            });
        }
      const isMatch= await bcrypt.compare(password, user.password);
      if(!isMatch)
      {
         return  res.status(404).json({
            success:false,
            message: "Invald Password/ credentials"
         });
      }
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expireIn:"7d" }
    );
    res.status(200).json({
       success: true,
       message: "Login Success",
       token,
       user:  {
        id:user._id,
        name: user.name,
        email: user.email
       }
    });

    }
    catch(e)
    {
          res.status(500).json({
            success:false,
            message:"Unable to login",
            error:e.message
          });  
    }

}
module.exports = { registerUser,loginUser };