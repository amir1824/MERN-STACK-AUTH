import React, { useState, useCallback } from 'react'
import {
  Route,
  Routes,
  Navigate,

} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/utils/Navbar';
import Home from './components/home/Home'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import { AuthContext } from './context/auth-context';


import "./App.css";
import './style.css'
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = useCallback(() => {
    setIsLoggedIn(true)

  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)

  }, [])

 

  return (
    <AuthContext.Provider 
      value={{ isLoggedIn: isLoggedIn, logIn: login, logOut: logout }} >
      
      <section>

        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/resetpassword' element={<ResetPassword />} />

          </Routes>

       

        </div>

      </section>
    
      
    </AuthContext.Provider>
  );
}

export default App;
