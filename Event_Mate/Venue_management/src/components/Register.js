import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Register = () => {
    const [info, setInfo] = useState({ email: "", username: "", password: "", role: "" });
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInfo(prevInfo => ({ ...prevInfo, [name]: value })); 
        // takes previous state as input and returns new state
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registration info:", info);
        setSuccessMessage("Registration successful. Redirecting to the Login page...");
        setShowSuccessMessage(true);

        setTimeout(() => {
            navigate("/login");
        }, 3000);
    };

    const gotoLoginPage = () => navigate("/login");

    return (
        <div className='signupBody'>
            <div className='signupContainer'>
                <div className="logo">
                    <img src={logo} width={250} height={85} alt='Logo' />
                </div>
                <h2>Sign up</h2>
                <form className='signupForm' onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <i className='bx bxs-envelope' />
                        <input
                            placeholder="Email"
                            type='email'
                            name='email'
                            value={info.email}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <i className="bx bxs-user" />
                        <input
                            placeholder="Username"
                            type='text'
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
                            minLength={8}
                            required
                            value={info.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <select name='role' value={info.role} onChange={handleChange} required>
                            <option disabled>Role Type</option>
                            <option value="Attendee">Attendee</option>
                            <option value="Admin">Admin</option>
                            <option value="Organizer">Organizer</option>
                        </select>
                    </div>
                    <button className='signupBtn' type="submit">Sign Up</button>
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
