const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const User=require("../models/User");

const {signup,login}=require("../controller/authController");

router.post("/signup",signup);
router.post("/login", login);
router.get("/profile",authMiddleware,async (req,res)=> {
    try{
        const user=await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({
            message:"Profule fetched succesfully",
            user,
        });
    }catch(error){
        res.status(500).json({message:"Failed to fetch profile",});
    }
});

module.exports=router;