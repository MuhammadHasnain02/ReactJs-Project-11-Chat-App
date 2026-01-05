import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { useNavigate } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner";

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Home() {
    const navigation = useNavigate()
    const { darkMode , setDarkMode } = useContext(ThemeContext)
    const [loading , setLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      } , 300)
    } , [])

    return (
      <div className={`flex flex-col min-h-screen transition duration-300 
          ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>

          <Navbar />

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

            <main className="grow flex items-center justify-center">

              <div className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-2 gap-12 items-center py-20">

                {/* LEFT TEXT SECTION */}
                <div className="text-center md:text-left space-y-5 order-2 md:order-1 font-[Montserrat]">

                  <p className={`text-[16px] font-semibold uppercase tracking-widest 
                    ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>

                    <span className={`text-sm px-2.5 py-1.5 rounded-full ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-gray-200 text-indigo-600'}`}>
                      <i className="fa-solid fa-tag text-md"></i> V2.0
                    </span> Powered by Supabase Realtime
                    
                  </p>

                  <h1 className={`text-[34px] sm:text-[32px] lg:text-[51px] font-extrabold leading-tight
                    ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Talk to anyone, <span className="text-indigo-600">anywhere, instantly.</span>
                  </h1>

                  <p className={`text-[20px] font-sans max-w-lg mx-auto md:mx-0 
                      ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Break the barriers of communication. Secure, light-speed sync, and a premium interface built with React & Tailwind.
                  </p>

                  {/* BUTTONS */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">

                    <button 
                      onClick={() => navigation('/login')} 
                      className="flex-1 py-5 px-8 rounded-full bg-indigo-600 
                        text-white font-bold text-lg shadow-lg shadow-indigo-500/50 
                        hover:bg-indigo-700 transition duration-300 
                        transform hover:scale-[1.02] cursor-pointer"
                    >
                        Start Chating Now
                    </button>

                    <button 
                      onClick={() => navigation('/signup')} 
                      className={`flex-1 py-5 px-8 rounded-full border-2 font-bold text-lg transition duration-300 cursor-pointer
                        ${darkMode 
                        ? "border-indigo-400 bg-gray-800 text-indigo-300 hover:bg-gray-700" 
                        : "border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50"}`}
                    >
                        Join Now
                    </button>

                  </div>

                </div>

                {/* RIGHT LOGO BOX */}
                <div className="w-full flex justify-center order-1 md:order-2">

                    <div className={`p-10 rounded-3xl shadow-2xl cursor-pointer transform rotate-3 
                        hover:rotate-0 transition duration-500
                        ${darkMode ? "bg-gray-800 shadow-black/30" : "bg-white"}`}>
                        
                        <img 
                            src='../../public/images/middle-box-logo.png'
                            alt="Application Logo"
                            className={`w-32 h-32 md:w-48 md:h-48 object-contain rounded-full p-3.5 
                                ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                        />
                    </div>

                </div>

              </div>

            </main>
            
          )}

          <Footer />
      </div>

    )
}

export default Home