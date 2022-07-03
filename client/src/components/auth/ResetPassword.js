import React from 'react'
import { useState } from "react";
import axios from "axios";
import './ResetPassword.css'
import { Link } from 'react-router-dom';


const ResetPassword = ({ history, match }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            const { data } = await axios.patch(
                `http://localhost:8000/api/v1/users/resetPassword/${match.params.resetToken}`,
                {
                    password,
                },
                config
            );

            console.log(data);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="resetpassword-screen">
            <form
                onSubmit={resetPasswordHandler}
                className="resetpassword-screen__form"
            >
                <h3 className="resetpassword-screen__title">Forgot Password</h3>
                {error && <span className="error-message">{error} </span>}
                {success && (
                    <span className="success-message" as={Link} to="/login">
                        {success} < >Login</>
                    </span>
                )}
                <div className="form-group mt-3">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        className="form-control mt-1"
                        placeholder="Enter new password"
                        autoComplete="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="confirmpassword">Confirm New Password:</label>
                    <input
                        type="password"
                        required
                        className="form-control mt-1"
                        id="confirmpassword"
                        placeholder="Confirm new password"
                        autoComplete="true"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div >
                <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                    Reset Password
                </button>
                </div>
                
            </form>
        </div>

    )


}
export default ResetPassword