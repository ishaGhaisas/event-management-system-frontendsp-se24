import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Login = () => {
    const [info, setInfo] = useState({ username: "", password: "", Otp: "" });
    const [loginInfo, setLoginInfo] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login info:", info);
        // After successful login, navigate to home page
        navigate("/");
    };

    const gotoSignUpPage = () => navigate("/register");

    return (
        <div className="loginBody">
            <div className='loginContainer'>
                <div className="logo">
                    <img src={logo} width={250} height={85} alt='Logo' />
                </div>
                <h2>Login</h2>

                <form className='loginForm' onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <i className='bx bxs-envelope' />
                        <input
                            placeholder="Username"
                            type='text'
                            id='username'
                            name='username'
                            value={info.username}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <i className="bx bxs-lock-alt"></i>
                        <input
                            placeholder="Password"
                            type='password'
                            name='password'
                            id='password'
                            minLength={8}
                            required
                            value={info.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="loginBtn" type="submit">Login</button>

                    <div className="forgot">
                        Forgot password?{" "}
                        Click here
                    </div>
                    <p>
                        Don't have an account?{" "}
                        <span className='link' onClick={gotoSignUpPage}>
                            Sign up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Login;
