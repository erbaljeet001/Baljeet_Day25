const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { message } = require("statuses");

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        // Check token
        if (!token || !token.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });
        }

        // Extract token
        token = token.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user
        req.user = await User.findById(decoded.id).select("-password");

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message: "User not Found"
            });
        }
        req.user=user;
        next();
    } 
    catch (e) {
        return res.status(401).json({
            success: false,
            message: "Auth error",
            error: e.message
        });
    }
};

module.exports = protect;