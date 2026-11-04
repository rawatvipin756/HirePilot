const ai=require("../config/gemini");

const analyzeResume=async (req,res)=> {
  try{
    const {resumeText}=req.body;
    if(!resumeText){
      return res.status(400).json({message:"Resume text is required"});
    }
    const response=await ai.models.generateContent({
      model:"gemini-2.5-flash",
      content:`Analyze the following resume and provide feedback on its strengths, weaknesses, skills, and improvements.
      Resume: ${resumeText}`
    });
    res.status(200)/json({
      message:"resume analyzed succesfully",
      analysis:response.test,
    });
  }catch(error){
    console.error("Resume analysis error:",error);
    res.status(500).json({message:"Failed to analyze resume"});
  }
}

module.exports={analyzeResume};