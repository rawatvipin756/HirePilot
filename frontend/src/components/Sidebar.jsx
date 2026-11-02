import { useEffect, useState } from "react";
import api from "../services/api";

function Sidebar(){
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
    </aside>
  );
}

export default Sidebar;