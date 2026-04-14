const { message } = require("statuses");
const Post = require("../models/Post");
const createPost= async(req,res)=>{
    try{
        const {title, content} = req.body;
        if(!title || !content)
        {
            return res.status(401).json({
             success: false,
             message:"Title & content Required"
            });
        }
        const post=await Post.create({
            title,content,user: req.user._id
        });
        res.status(201).json({
            success:true,
            message:"Post Created Successfully",
            post
        });
    }
    catch(e)
    {
        res.status(500).json({
            success:false,
            message:"Unable to Post",
            error: e.message
        });
    }
}