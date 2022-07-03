import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import './Register.css'

const Register = () => {

    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const  Navigate = useNavigate()


    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (password !== passwordConfirm) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match")
        }

        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/v1/users/signup",
                ({
                    name,
                    email,
                    password,
                    passwordConfirm

                }),
                config
            )
            console.log(data)

            localStorage.setItem("authToken", data.token);

            Navigate('/')





        } catch (error) {

            setError(error.response.data.error);

            setTimeout(() => {
                setError("")
            }, 5000);

        }
    }


    return (
        <div className="Auth-form-container">
            <form onSubmit={registerHandler} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Register</h3>
                    {error && <span className="error-message">{error}</span>}
                    <div className="text-center">

                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="name" >Full Name</label>
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            value={name}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='true'
                            className="form-control mt-1"
                            placeholder="Email Address"
                            value={email}
                            required


                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='true'
                            className="form-control mt-1"
                            placeholder="Password"
                            value={password}
                            required

                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="confirmpassword"> Confirm Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete='true'
                            placeholder=" Confirm Password"
                            value={passwordConfirm}
                            required

                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onSubmit={registerHandler}>
                            Register
                        </button>
                    </div>

                </div>
                <span className="register-exsist">
                    Already have an account? <a href="/login"> Login</a>
                </span>
            </form>
        </div>
    )


}
export default Register