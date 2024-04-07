import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
    const [info, setInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInfo((values) => ({ ...values, [name]: value }));
    };

    const fetchLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                // Redirect to homepage with username as query parameter
                navigate(`/?username=${info.email}`);
            } else {
                const errorData = await response.text();
                console.error("Login failed:", errorData);
                setErrorMessage(errorData || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Login failed. Please try again."); // Display a generic error message
        }
    };

    const gotoSignUpPage = () => navigate("/register");
    const gotoForgetPage = () => navigate("/forget");

    return (
        <div className="loginBody">
            <div className="loginContainer">
                <div className="logo">
                    <img src={logo} width={250} height={85} alt="Logo" />
                </div>
                <h2>Login</h2>

                <form className="loginForm" data-testid="loginForm">
                    <div className="inputBox">
                        <i className="bx bxs-envelope" />
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            name="email"
                            value={info.email}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <i className="bx bxs-lock-alt"></i>
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            id="password"
                            minLength={8}
                            required
                            value={info.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="loginBtn" onClick={fetchLogin}>
                        Login
                    </button>

                    {errorMessage && (
                        <p className="error" style={{ color: "red" }}>
                            <span className="error-text">{errorMessage}</span>
                        </p>
                    )}

                    <div className="forgot">
                        Forgot password?{" "}
                        <Link to="/forgot-password" className="forgotPasswordLink" onClick={gotoForgetPage}>
                            Click here
                        </Link>
                    </div>

                    <p>
                        Don't have an account?{" "}
                        <span className="link" data-testid="toSignin" onClick={gotoSignUpPage}>
                            Sign up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
