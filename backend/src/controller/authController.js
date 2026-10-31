const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const signup=async(req,res)=> {
    try{
        const {name,email,password}=req.body;
    }
}