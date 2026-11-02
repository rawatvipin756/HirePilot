import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Sidebar(){
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
  })

  const handleLogout=()=> {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return(
    <aside className="w-64 min-h-screen bg-[#0d1225] text-white p-6">
      <h2 className="text-2xl font-bold mb-8">HirePilot</h2>
      <nav className="flex flex-col gap-3">
        <a href="/dashboard" className="text-gray-300 hover:text-white">
          Dashboard
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          Resume Analyzer
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          Job Matcher
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          Skill Gap Analyzer
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          Interview Preparation
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          Career Roadmap
        </a>
      </nav>
      <div className="mt-10 pt-6 border-t border-white/10">
        <p className="text-white font-semibold">
          {user ? user.name : "Loading..."}
        </p>

        <p className="text-gray-400 text-sm mt-1">
          {user ? user.email : ""}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 w-full rounded-lg bg-red-500/10 px-4 py-3 text-left text-red-400 hover:bg-red-500/20 transition"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;