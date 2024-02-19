import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import logo from "../assets/logo.png";
import { Button } from "./Button";
import './navBar.css';

function NavBar(){
    const [username, setUsername] = useState();
    const [loggedIn, setLoggedIn] = useState();

    
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);





    return(
    <>
        <nav className="navBar">
            <div className="navBarContainer">
                <Link to='/' className="navBarLogo" onClick={closeMobileMenu}>
                    <img src={logo }width={146.85} height={55} alt='Logo'></img>
                </Link>
                <div className="menuIcon" onClick={handleClick}>
                    <i className={click ? "bx bx-x" : "bx bx-menu"}/>
                </div>
                <ul className={click ? "navMenuActive" : "navMenu"}>
                    <li className="navItem">
                        <Link to="/" className="navLinks" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="navItem">
                        <Link to="/venues" className="navLinks" onClick={closeMobileMenu}>
                            Venues/Activities
                        </Link>
                    </li>
                    <li className="navItem">
                        <Link to="/player-page" className="navLinks" onClick={closeMobileMenu}>
                            Players
                        </Link>
                    </li>
                    
                    <li className="navItem">
                        
                        <Link to="/login" className="navLinksMobile" onClick={closeMobileMenu}>
                            LOGIN
                        </Link>
                        
                    </li>
                </ul>
                <ul className="userPage">
                    {loggedIn ? 
                        <Link to="/user-page">
                            {button && <Button buttonStyle='button'>{username}</Button>}
                        </Link>
                        :
                        <Link to="/login">
                            {button && <Button buttonStyle='button'>LOGIN</Button>}
                        </Link>}
                    
                </ul>
            </div>
        </nav>
    </>
    );
}

export default NavBar