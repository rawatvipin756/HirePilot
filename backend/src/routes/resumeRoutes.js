const {analyzeResume}=require("../controller/resumeController");
const express=require("express");
const router=express.Router();
const { PDFParse } = require("pdf-parse");

const upload=require("../middleware/uploadMiddleware");
const authMiddleware=require("../middleware/authMiddleware");

router.post("/upload",authMiddleware,upload.single("resume"),async (req,res)=> {
  if(!req.file){
    return res.status(400).json({message:"Please upload a resume"});
  }
  const parser=new PDFParse({
    data:req.file.buffer,
  });
  const data=await parser.getText();
  await parser.destroy();
  res.status(200).json({
    message:"Resume text extracted succesfully",
    fileName:req.file.originalname,
    extractedText: data.text,
  });
});

router.post("/analyze", authMiddleware, analyzeResume);

module.exports = router;