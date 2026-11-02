import {useState} from "react";
import api from "../services/api";
import {useNavigate} from "react-router-dom";

function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit=async (e)=> {
    e.preventDefault();
    setMessage("");
    setError("");
    try{
      const response=await api.post("/auth/login",{
        email,
        password,
      });
      setMessage("Login successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      console.log(response.data);
    }catch(error){
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b1a] text-white">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Login to continue to HirePilot
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/10 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/10 outline-none"
          />

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;