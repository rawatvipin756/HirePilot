const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const signup=async(req,res)=> {
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required",
            });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409)/json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });
        res.status(201).json({
            message:"Account created successfully!",
            userId:user._id,
        });
    }catch(error){
        res.status(500).json({
            message:"Signup failed!",
            error:error.message,
        });
    }
};

const login=async(req,res)=> {
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({messgae:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({messgae:"Invalid credentials"});
        }
        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"},
        );
        res.status(200).json({
            message:"Login sucessful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            },
        });
    }catch(error){
        res.status(500).json({
            message:"Login failed",
            error:error.message
        });
    }
}

module.exports={signup,login};