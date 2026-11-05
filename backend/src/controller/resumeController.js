const ai = require("../config/gemini");

const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    console.log("Received resume text:", resumeText);

    if (!resumeText) {
      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Analyze the following resume and provide feedback on its strengths, weaknesses, skills, and improvements.

Resume:
${resumeText}`,
    });

    res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: response.text,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    res.status(500).json({
      message: "Failed to analyze resume",
    });
  }
};

module.exports = { analyzeResume };