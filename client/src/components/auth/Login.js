import React from 'react'
import { useState, useEffect,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../../context/auth-context';
import './Register.css'



const Login =  ({ history }) => {
    const auth = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const Navigate=useNavigate()
    

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      Navigate('/')
    }
  }, [Navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
     auth.logIn();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const  {data}  = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        { email, password },
        
        config
      );
      console.log(data)
      
      localStorage.setItem("authToken", data.token);

      Navigate('/');  
     
      
    } catch (error) {
      setError(error.response.data.error);
      alert('Wrong details! Please try again ')
      setTimeout(() => {
        setError("");
      }, 5000);
     
    }
  };

  
    

    
    return (
        <div className="Auth-form-container">
            <form  onSubmit={loginHandler} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
                    {error && <span className="error-message">{error}</span>}
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            tabIndex={1}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password" >Password</label>
                        {" "}
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            autoComplete='true'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            tabIndex={2}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        <a href="/forgotpassword"> Forgot Password?</a>
                    </p>
                    <span className="login-screen__subtext">
                        Don't have an account? <a href="/register"> Register</a>
                    </span>
                </div>
            </form>
        </div>
    )

}
export default Login
