import {useState} from "react";
import api from "../services/api";

function Signup(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try{
      const response=await api.post("/auth/signup",{
        name,
        email,
        password,
      });
      setMessage(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    }catch(error){
      setError(error.response?.data?.message || "Signup failed");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Create your account</h1>
        <p className="mb-6 text-slate-400">Start your career journey with HirePilot.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input 
            type="text" 
            placeholder="Enter Name" 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500" />
          <input 
            type="email" 
            placeholder="Enter Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500" />
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500" />
            {message && (
              <p className="text-green-400 text-sm text-center">{message}</p>
            )}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
            <span className="cursor-pointer text-blue-400">
              Login
            </span>
        </p>
      </div>
    </div>
  )
}

export default Signup;