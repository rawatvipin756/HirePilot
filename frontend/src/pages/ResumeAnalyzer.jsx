import { useState } from "react";

function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
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
  return(
    <div className="min-h-screen bg-[#080bla] text-white p-8">
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
          disabled={!resume}
          className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
        >
          Upload Resume
        </button>
      </div>
    </div>
  )
}

export default ResumeAnalyzer;