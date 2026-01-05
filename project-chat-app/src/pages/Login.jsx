import { useState , useEffect , useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../context/ThemeContext";
import { signIn, signInWithGoogle } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [ loading , setLoading ] = useState(true)

  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ========= loading handling =========

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    } , 300)
  } , [])

  // ========= Handle Signup =========
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return
    }

    setLoading(true);

    try {
      const data = await signIn(email , password)
      // console.log("Login success:", data);
      navigate("/dashboard");
    }
    catch (error) {
      console.log("Signup Error:", error);
      // alert('something went wrong')
    }
    finally {
      setLoading(false);
    }

  };
  
  // ========= Handle Login With Google =========

  const handleLoginWithGoogle = async () => {
    try {

      setLoading(true);
      const { data , error } = await signInWithGoogle()

      if (error) {
        console.error("Login With Google error:", error.message);
        setLoading(false);
      }

    } catch (err) {
      console.error("Login With Google Unexpected error:", err);
      setLoading(false);
    }
  }

  return (
    <>

      {/* Loading State */}
      {loading ? (

        <div className="flex grow flex-col items-center justify-center">
            <RotatingLines
                visible={true}
                height="70"
                width="70"
                color="#4F39F6"
                strokeWidth="5"
                animationDuration="1"
                ariaLabel="rotating-lines-loading"
            />
        </div>

      ) : (

      <div className={`flex grow items-center justify-center transition-colors duration-500 font-[Montserrat] ${darkMode ? "bg-[#050816]" : "bg-gray-50"}`}>
        
        {/* Background Blobs for Dark Mode */}
        {darkMode && (
          <div className="fixed inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] right-[-10%] w-75 h-75 bg-indigo-600/20 rounded-full blur-[100px]"></div>
          </div>
        )}

        <div className={`w-full max-w-md p-8 rounded-4xl border shadow-2xl transition-all ${darkMode ? "bg-white/5 border-white/10 shadow-black/50" : "bg-white border-gray-100 shadow-gray-200"}`}>
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg shadow-indigo-500/30">
              <i className="fas fa-lock"></i>
            </div>
            <h2 className={`text-3xl font-black italic tracking-tighter ${darkMode ? "text-white" : "text-gray-900"}`}>
              WELCOME <span className="text-indigo-600">BACK</span>
            </h2>
            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Enter your details to access your chats.</p>
          </div>

          {/* Inputs */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email Field */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-normal ml-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <i className="fas fa-envelope"></i>
                </span>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className={`text-[15px] w-full pl-11 pr-4 py-4 rounded-xl outline-none border transition-all ${darkMode ? "bg-white/5 border-white/10 text-white focus:border-indigo-500" : "bg-gray-50 border-gray-200 focus:border-indigo-600"}`}
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">

              <div className="flex justify-between items-center px-1">
                <label className={`text-xs font-bold uppercase tracking-normal ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Password</label>
                <a href="#" className="text-xs text-indigo-500 font-bold hover:underline">Forgot?</a>
              </div>
              <div className="relative">

                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-4 py-4 rounded-xl outline-none border transition-all ${darkMode ? "bg-white/5 border-white/10 text-white focus:border-indigo-500" : "bg-gray-50 border-gray-200 focus:border-indigo-600"}`}
                  placeholder="••••••••"
                />

              </div>

            </div>

            {/* Button Field */}
            <button type="submit" disabled={loading} 
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-95 uppercase tracking-widest text-sm">
              
              {loading ? "Logging in..." : "Login to Account"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className={`grow border-t ${darkMode ? "border-white/10" : "border-gray-200"}`}></div>
            <span className={`px-3 text-xs font-bold uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>OR</span>
            <div className={`grow border-t ${darkMode ? "border-white/10" : "border-gray-200"}`}></div>
          </div>

          {/* Google Login Button */}
          <button onClick={handleLoginWithGoogle}
          className={`w-full py-4 flex items-center justify-center gap-3 rounded-xl border font-bold text-sm transition-all active:scale-95 cursor-pointer ${darkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"}`}>
            
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
            {loading ? "Logging in..." : "Continue with Google"}

          </button>

          {/* bottom part */}
          <p className={`text-center mt-8 text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Don't have an account? <span onClick={() => navigate('/signup')} className="text-indigo-500 font-bold cursor-pointer hover:underline ml-1">Sign up free</span>
          </p>

        </div>

      </div>

      )}

    </>

  );
};

export default Login;