import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"



const Login = () => {
    const [loginInfo, setLoginInfo] = useState(false);
    const navigate = useNavigate();
    const [info, setInfo] = useState({});
    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (event) => {
        console.log("handleChange called");
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        
        setInfo(values => ({...values, [name]: value}))
        console.log(value);
    }

    const fetchLogin = async(e) => {
    
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
                info.email = data.user.email;
                window.localStorage.setItem("token", "Bearer " + data.authorization);
                console.log("Login successful:", data);
            } else {
              const errorData = await response.json();
              console.error("Login failed:", errorData);
            }
         } catch (error) {
            console.error("Login error:", error);
        }

        setLoginInfo(true);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/auth/2fa/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": window.localStorage.getItem("token"),
              },
              body: JSON.stringify(info),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log("2fa verify successful:", data);
              window.localStorage.setItem("userId", data.user.user_id);
              window.localStorage.setItem("role", data.user.role);
              window.localStorage.setItem("userEmail", data.user.email);
              window.localStorage.setItem("username", data.user.username);
              window.localStorage.setItem("token", "Bearer " + data.authorization);
              navigate("/");
              window.location.reload();
            } else {
              const errorData = await response.json();
              console.error("2fa verify failed:", errorData);
            }
          } catch (error) {
            console.error("2fa verify error:", error);
          }
    };
    

    const gotoSignUpPage = () => navigate("/register"); 

    return (
        
        <div className="loginBody">
        <div className='loginContainer'>
            <div className="logo">
                <img src={logo }width={250} height={85} alt='Logo'></img>
            </div>
            <h2>Login </h2>

            <form className='loginForm' data-testid='loginForm' onSubmit={handleSubmit}>
                <div className="inputBox">
                    <i className='bx bxs-envelope'/>
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
                
                <button className="loginBtn" onClick={fetchLogin}> Login </button>

                { loginInfo &&
                    <>
                        <div className="inputBox">
                            <i className="bx bxs-lock-alt"></i>
                            <input
                                placeholder="Enter Emailed Code"
                                type='text'
                                name='Otp'
                                id='Otp'
                                minLength={2}
                                required
                                value={info.Otp}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="loginBtn" onClick={handleSubmit}> Submit </button>
                    </>
                }

                <div className="forgot">
                    Forgot password?{" "}
                    <Link to="/forgot-password" className="forgotPasswordLink">
                        Click here
                    </Link>
                </div>

                <p>
                    Don't have an account?{" "}
                    <span className='link' data-testid="toSignin" onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
        </div>
        </div>
    );
};
export default Login;