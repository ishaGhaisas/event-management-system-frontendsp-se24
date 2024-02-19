import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/HomeImage.jpg";
import bgimg from "../assets/backgroundImage.jpg";
import { Button } from "./Button";
import './homeBody.css';

const HomeBody = () => {

    return (
        <div className="homeContainer">
            <img className="bgImage" src={bgimg} alt="Background" />
            <img className="homeImg" src={img} alt="Home" style={{ maxWidth: "50em" }} />
            <div className="theHome">
                <div className="homeBodyButtons">
                    <Link to="/venues">
                        <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
                            RESERVE NOW
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeBody;

