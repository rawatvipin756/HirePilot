const express=require("express");
const router=express.router();

const upload=require("../middleware/uploadMiddleware");
const authMiddleware=require("../middleware/authMiddleware");

router.post("/upload",authMiddleware,upload.single("resume"),(req,res)=> {
  if(!req.file){
    return res.status(400).json({message:"Please upload a resume"});
  }
  res.status(200).json({
    message:"resume uploaded succesfully",
    fileName:req.file.originalname,
    fileSize:req.file.size,
  });
});

module.exports=router;