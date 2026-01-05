import { useState , useEffect , useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../context/ThemeContext";
import { signUp } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [ loading , setLoading ] = useState(false)

  // Input States
  const [ fullName, setFullName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  // ========= loading handling =========

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    } , 300)
  } , [])

  // ========= Handle Signup =========

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill required fields")
      return
    }

    setLoading(true);

    try {
      const data = await signUp(email , password)
      // console.log("Signup success:", data);
      alert("Please Check Your Email and Verify It's You!");
    }
    catch (error) {
      console.log("Signup Error:", error);
      // alert('something went wrong') 
    }
    finally {
      setLoading(false);
    }

  };

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
          
          <div className={`w-full max-w-lg p-10 rounded-[2.5rem] border shadow-2xl transition-all ${darkMode ? "bg-white/5 border-white/10 shadow-black/50" : "bg-white border-gray-100 shadow-gray-200"}`}>
            
            {/* Header */}
            <div className="text-center mb-8">

              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                <i className="fas fa-user-plus"></i>
              </div>
              <h2 className={`text-3xl font-black italic tracking-tighter ${darkMode ? "text-white" : "text-gray-900"}`}>
                CREATE <span className="text-indigo-600">ACCOUNT</span>
              </h2>
              <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Join thousands of users chatting in real-time.</p>
            
            </div>

            {/* Inputs */}
            <form onSubmit={handleSignup} className="grid grid-cols-1 gap-5">

              {/* Full Name */}
              <div className="space-y-2">
                
                <label className={`text-xs font-bold uppercase tracking-normal ml-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Full Name</label>
                <div className="relative">
                  
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <i className="fas fa-user text-sm"></i>
                  </span>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} 
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl outline-none border transition-all ${darkMode ? "bg-white/5 border-white/10 text-white focus:border-indigo-500" : "bg-gray-50 border-gray-200 focus:border-indigo-600"}`}
                    placeholder="John Doe"
                  />

                </div>

              </div>

              {/* Email */}
              <div className="space-y-2">
                
                <label className={`text-xs font-bold uppercase tracking-normal ml-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Email</label>
                <div className="relative">
                  
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <i className="fas fa-envelope text-sm"></i>
                  </span>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl outline-none border transition-all ${darkMode ? "bg-white/5 border-white/10 text-white focus:border-indigo-500" : "bg-gray-50 border-gray-200 focus:border-indigo-600"}`}
                    placeholder="john@example.com"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="space-y-2">
                
                <label className={`text-xs font-bold uppercase tracking-normal ml-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Password</label>
                <div className="relative">
                  
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <i className="fas fa-key text-sm"></i>
                  </span>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl outline-none border transition-all ${darkMode ? "bg-white/5 border-white/10 text-white focus:border-indigo-500" : "bg-gray-50 border-gray-200 focus:border-indigo-600"}`}
                    placeholder="Minimum 8 characters"
                  />

                </div>

              </div>

              <button type="submit" disabled={loading} 
                className="w-full mt-4 py-4 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black rounded-xl shadow-xl shadow-indigo-500/20 transition-all active:scale-95 uppercase tracking-widest text-xs">
                {loading ? "Creating Account..." : "Create My Account"}
              </button>

            </form>

            {/* bottom part */}
            <p className={`text-center mt-8 text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Already a member? <span onClick={() => navigate('/login')} className="text-indigo-500 font-bold cursor-pointer hover:underline ml-1">Login here</span>
            </p>

          </div>

        </div>

      )}

    </>
  );
};

export default Signup;