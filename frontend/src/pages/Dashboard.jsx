import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchProfile=async ()=> {
      try{
        const response=await api.get("/auth/profile");
        setUser(response.data.user);
      }catch(error){
        console.log(error.response?.data);
      }
    };
    fetchProfile();
  },[]);

  return (
    <div className="min-h-screen bg-[#080b1a] text-white flex items-center justify-center">
      <Sidebar/>
      <main>
        <div className="text-center">
          <div className="mb-10">
            <p className="text-indigo-400 text-sm font-semibold mb-2">
              YOUR CAREER COMMAND CENTER
            </p>

            <h1 className="text-4xl font-bold mb-3">
              Welcome, {user ? user.name : "Loading"}!
            </h1>

            <p className="text-gray-400">
              Track your progress and take the next step in your career.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Resumes Analyzed</p>
                <h2 className="text-3xl font-bold mt-2">0</h2>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Jobs Matched</p>
                <h2 className="text-3xl font-bold mt-2">0</h2>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Interviews Practiced</p>
                <h2 className="text-3xl font-bold mt-2">0</h2>
              </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-indigo-500/50 transition duration-300 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">Resume Analyzer</h2>
                <p className="text-gray-400 text-sm">
                  Analyze your resume and get AI-powered feedback.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-indigo-500/50 transition duration-300 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">Job Matcher</h2>
                <p className="text-gray-400 text-sm">
                  Compare your resume with job descriptions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-indigo-500/50 transition duration-300 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">Skill Gap Analyzer</h2>
                <p className="text-gray-400 text-sm">
                  Discover the skills you need for your target role.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-indigo-500/50 transition duration-300 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">Interview Preparation</h2>
                <p className="text-gray-400 text-sm">
                  Practice interviews with AI-generated questions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-indigo-500/50 transition duration-300 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">Career Roadmap</h2>
                <p className="text-gray-400 text-sm">
                  Get a personalized roadmap for your career goals.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;