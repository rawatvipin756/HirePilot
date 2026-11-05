import { useState } from "react";
import api from "../services/api";

function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange=(e)=> {
    const file=e.target.files[0];
    if(!file) return;
    if(file.type!="application/pdf"){
      alert("Please upload a PDF file");
      setResume(null);
      return;
    }
    if(file.size > 5*1024*1024){
      alert("File size must be less than 5 mb");
      setResume(null);
      return;
    }
    setResume(file);
  }

  const handleUpload=async ()=> {
    const formData=new FormData();
    formData.append("resume",resume);
    try{
      const response=await api.post("/resume/upload",formData);
      setResumeText(response.data.extractedText);
      console.log("Resume text extracted successfully!");
    }catch(error){
      console.log(error.response?.data || error.message);
    }
  }

  const handleAnalyze=async()=> {
    setLoading(true);
    try{
      setError("");
      const response=await api.post("/resume/analyze",{
        resumeText:resumeText,
      });
      setAnalysis(response.data.analysis);
    }catch(error){
      setError(
        error.response?.data.message || "Something went wrong. Please try again"
      );
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="min-h-screen bg-[#080b1a] text-white p-8">
      <h1 className="text-3xl font-bold text-blue-400">AI Resume Analyzer</h1>
      <p className="text-gray-400">Upload your resume and get AI-powered feedback.</p>

      <div className="mt-10 max-w-2xl rounded-2xl border border-dashed border-indigo-500/50 bg-white/5 p-10 text-center">
        <h2 className="text-xl font-semibold mb-3">Upload Your Resume</h2>
        <p className="text-gray-400 mb-6">Upload your resume in PDF format.</p>
        <input type="file" accept=".pdf" onChange={handleFileChange} className="block w-full text-sm text-gray-400"/>
        {resume && (
          <p className="mt-4 text-sm text-green-400">
            Selected: {resume.name}
          </p>
        )}
        <button
          onClick={handleUpload}
          disabled={!resume}
          className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
        >
          Upload Resume
        </button>
        <button
          onClick={handleAnalyze}
          disabled={!resumeText}
          className="mt-4 rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Analyze Resume
        </button>
      </div>
      {error && (
        <div className="mt-6 max-w-2xl rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}
      {analysis && (
        <div className="mt-10 max-w-2xl rounded-2xl border border-purple-500/30 bg-white/5 p-6">
          <h2 className="mb-4 text-2xl font-bold text-purple-400">
            AI Resume Analysis
          </h2>

          <p className="whitespace-pre-wrap leading-7 text-gray-300">
            {analysis}
          </p>
        </div>
      )}
    </div>
  )
}

export default ResumeAnalyzer;