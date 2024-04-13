import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {

    const [info, setInfo] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const recaptchaRef = React.createRef();
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const handleChange = (event) => {
        console.log("handleChange called");
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        
        setInfo(values => ({...values, [name]: value}))
        console.log(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Registration successful:", data);
            setSuccessMessage("Registration successful. Redirecting to the Login page...");
                setShowSuccessMessage(true);

                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000);
          } else {
            const errorData = await response.json();
            console.error("Registration failed:", errorData);
          }
        } catch (error) {
          console.error("Registration error:", error);
        }
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(info),
            });
            console.log(response);
            console.log(response['Authorization']);
            console.log(response.authorization);
            if (response.ok) {
                const data = await response.json();
                window.localStorage.setItem("userId", data.user.user_id);
                window.localStorage.setItem("role", data.user.role);
                window.localStorage.setItem("userEmail", data.user.email);
                window.localStorage.setItem("username", data.user.username);
                window.localStorage.setItem("token", "Bearer " + data.authorization);
                console.log("Login successful:", data);
            } else {
              const errorData = await response.json();
              console.error("Login failed:", errorData);
            }
         } catch (error) {
            console.error("Login error:", error);
        }
        
        /*
        try {
            const response = await fetch(`${API_URL}/auth/2fa/setup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": window.localStorage.getItem("token"),
              },
              body: JSON.stringify(info),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log("2fa setup successful:", data);
              navigate("/login");
            } else {
              const errorData = await response.json();
              console.error("2fa setup failed:", errorData);
            }
        } catch (error) {
            console.error("2fa setup error:", error);
        }
        */
    };

    const gotoLoginPage = () => navigate("/login");

    useEffect(() => {
        if (showSuccessMessage) {
            // Clear the success message and hide it after 3 seconds
            setTimeout(() => {
                setSuccessMessage("");
                setShowSuccessMessage(false);
            }, 10000); 
        }
      }, [showSuccessMessage]);

    return (
        <div className='signupBody'>
        <div className='signupContainer'>
            <div className="logo">
                <img src={logo }width={250} height={85} alt='Logo'></img>
            </div>
            <h2>Sign up</h2>
            <form className='signupForm' data-testid='registerForm' onSubmit={handleSubmit}>
                <div className="inputBox">
                <i className='bx bxs-envelope'/>
                    <input
                        placeholder="Email"
                        type='email'
                        name='email'
                        id='email'
                        value={info.email}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="inputBox">
                <i className="bx bxs-user"/>
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
                <div className="inputBox">
                <i className="bx bxs-lock-alt"></i>
                    <input
                        placeholder="Confirm Password"
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        minLength={8}
                        required
                        value={info.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputBox">
                    <select name='role' id='role'value={info.role} onChange={handleChange} required>
                        <option>
                            Role Type
                        </option>
                        <option value={"Attendee"}>
                            Attendee
                        </option>
                        <option value={"Admin"}>
                            Admin
                        </option>
                        <option value={"Organizer"}>
                            Organizer
                        </option>
                    </select>
                </div>
                <ReCAPTCHA 
                    ref={recaptchaRef}
                    sitekey={"6LdAz9EoAAAAADcjpAdNdL8WLScq5oeB2u6-5xVB"}
                    required
                />
                    <button className='signupBtn' data-testid='register'>
                        Sign Up
                    </button>
                <p>
                    Already have an account?{" "}
                    <span className='link' onClick={gotoLoginPage}>
                        Login
                    </span>
                </p>
            </form>
            {showSuccessMessage && (
                    <div className="inviteFriendMessageContainer">
                        <p className="inviteFriendMessage">{successMessage}</p>
                    </div>
                )}
        </div>
        </div>
    );
};

export default Register;