import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'

import { supabase } from './supabase/config'
import { getCurrentUser } from './services/authService'

function App() {

  useEffect(() => {

    const getUser = async () => {
      const data = await getCurrentUser()
      console.log(data);
      console.log(data.data.user);
    }
    getUser()

    // supabase.auth.getSession().then(({ data }) => {
    //   console.log(data.session);
    //   console.log(data.session.user);
    // });

  } , [])

  return (

    <Routes>
      <Route index element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>

  )
}

export default App
