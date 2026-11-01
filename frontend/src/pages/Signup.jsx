function Signup(){
  return(
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Create your account</h1>
        <p className="mb-6 text-slate-400">Start your career journey with HirePilot.</p>
        <form className="space-y-4">
          <input type="text" placeholder="Enter Name" className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500" />
          <input type="email" placeholder="Enter Email" className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500" />
          <input type="password" placeholder="Enter Password" className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500" />
          <button type="submit" className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700">Create Account</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">Already have an account?{" "}<span className="cursor-pointer text-blue-400">Login</span></p>
      </div>
    </div>
  )
}

export default Signup;