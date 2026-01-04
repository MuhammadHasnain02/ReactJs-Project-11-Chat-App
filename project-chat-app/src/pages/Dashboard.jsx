import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { signOut } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ========== SignOut Handling ==========

  const handleSignOut = async () => {
    const { data , error } = signOut()

    if (error) {
      console.error("Sign out error:", error.message);
    } else {
      console.log("Signed out successfully");
      navigate('/')
    }
  }

  return (
    <div className={`flex h-screen overflow-hidden font-[Montserrat] transition-colors duration-500 ${darkMode ? "bg-[#050816] text-white" : "bg-gray-50 text-gray-900"}`}>
      
      {/* --- SIDEBAR (Navigation Icons) --- */}
      <aside className={`w-20 hidden md:flex flex-col items-center py-8 border-r transition-colors ${darkMode ? "bg-white/5 border-white/5" : "bg-white border-gray-200"}`}>
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/20 mb-10">
          <i className="fas fa-globe-americas"></i>
        </div>
        <nav className="flex flex-col gap-8 text-gray-400">
          <i className="fas fa-comments text-xl text-indigo-500 cursor-pointer"></i>
          <i className="fas fa-user-group text-xl hover:text-indigo-400 cursor-pointer transition"></i>
          <i className="fas fa-chart-line text-xl hover:text-indigo-400 cursor-pointer transition"></i>
          <i onClick={handleSignOut} className="fas fa-right-from-bracket text-xl hover:text-red-400 cursor-pointer transition mt-auto"></i>
        </nav>
      </aside>

      {/* --- MAIN CHAT ROOM --- */}
      <main className={`grow flex flex-col transition-colors ${darkMode ? "bg-[#050816]" : "bg-white"}`}>
        
        {/* Header - Global Room Info */}
        <header className={`p-6 flex justify-between items-center border-b ${darkMode ? "border-white/5 bg-white/2" : "border-gray-100 bg-white"}`}>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-inner">
               <i className="fas fa-users"></i>
            </div>
            <div>
              <h3 className="font-black text-lg tracking-tighter italic">GLOBAL PUBLIC ROOM</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">142 Users Online</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button className={`p-3 rounded-xl transition ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"}`}>
                <i className="fas fa-bell"></i>
             </button>
             <button className={`p-3 rounded-xl transition ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"}`}>
                <i className="fas fa-search"></i>
             </button>
             <button className={`p-3 rounded-xl transition ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"}`}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
             </button>
          </div>

        </header>
          
        {/* CHAT MESSAGES AREA */}
        <div className="grow flex flex-col relative">

          <div className="grow overflow-y-auto p-6 space-y-6">
            
            {/* Other User Message */}
            <div className="flex items-end gap-3 max-w-[80%]">
              <img src="https://i.pravatar.cc/150?u=1" className="w-8 h-8 rounded-full mb-1" alt="avatar" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold ml-1 mb-1 opacity-50">Ali Khan</span>
                <div className={`p-4 rounded-2xl rounded-bl-none text-sm ${darkMode ? "bg-white/5" : "bg-gray-100"}`}>
                  Assalam o Alaikum everyone! How is the community doing today? 😊
                </div>
              </div>
            </div>

            {/* Your Message */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-bold mr-1 opacity-50 text-indigo-500">You</span>
              <div className="max-w-[80%] p-4 rounded-2xl rounded-br-none text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                Walaikum Assalam Ali! Everything is working great with the new Supabase integration.
              </div>
            </div>

            {/* Announcement / System Message */}
            <div className="flex justify-center my-4">
              <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${darkMode ? "bg-white/5 border-white/5 text-gray-500" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
                  Hasnain Dev joined the room
              </span>
            </div>

          </div>

          {/* Input Footer */}
          <div className={`p-6 border-t ${darkMode ? "border-white/5 bg-white/1" : "border-gray-100 bg-gray-50/30"}`}>
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              
              <div className={`grow flex items-center px-4 py-2 rounded-2xl border transition-all ${darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                  <button className="p-2 text-gray-400 hover:text-indigo-500"><i className="fas fa-plus"></i></button>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message the community..." 
                    className="grow bg-transparent border-none outline-none p-3 text-sm"
                  />
                  <button className="p-2 text-gray-400 hover:text-indigo-500"><i className="fas fa-face-smile"></i></button>
              </div>
              <button className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-indigo-700 active:scale-90 transition">
                <i className="fas fa-paper-plane"></i>
              </button>

            </div>
          </div>

        </div>

      </main>
      
    </div>
  );
};

export default Dashboard;