import React, { useState, useEffect  } from "react";
import { Link,useNavigate } from "react-router-dom";
import bgimg from "../assets/pic5.jpg";
import { Button } from "./Button";
import './homeBody.css';
import ReservationsCard from "./ReservationsCard";
import axios from 'axios';
//import UserCard from "./UserCard";


const HomeBody = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [reservations, setReservations] = useState([]);
    const userId = window.localStorage.getItem("userId");
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchReservations = async () => {
        try {
            const response = await axios.post(`${API_URL}/user-reservation-details`, { userId: window.localStorage.getItem('userId') });
            console.log(response.data);
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error.message);
        }
    };

  // state variable to store the profile data
    // const [profileData, setProfileData] = useState(
    //     {
    //       user_id: window.localStorage.getItem('userId') || "",
    //       username: window.localStorage.getItem('username') || "",
    //       email: window.localStorage.getItem('email') || "",
    //       role: window.localStorage.getItem('role') || ""
    //     }
    //   );

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className="homeContainer">
            <div className="bgImage" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', position: 'absolute', zIndex: '-1' }} />
            <div className="theHome">
                <div className="homeText">
                    <h2>Book with EventMate</h2>
                    <p>EventMate is the perfect tool to help you plan your sporting events</p>
                    <Link to="/venues">
                        <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
                            RESERVE NOW
                        </Button>
                    </Link>
                </div>

                {userId != null &&<div className="profileContainer">
                  <UserCard/>
                </div>}
                
                {userId && (
                    <div className="ChildLeft">
                        <h3>Reservations:</h3>
                        {reservations.length > 0 && (
                            <div className='ReservationSearch'>
                                <input className="searchInput" placeholder="Search Reservations" />
                            </div>
                        )}
                        {reservations.map((reservation) => (
                            <ReservationsCard
                                key={reservation._id}
                                id={reservation._id}
                                vname={reservation.v_name}
                                start_datetime={(reservation.date && reservation.startTime) ? `${reservation.date.split("T")[0]} ${reservation.startTime}` : ''}
                                end_datetime={(reservation.date && reservation.endTime) ? `${reservation.date.split("T")[0]} ${reservation.endTime}` : ''}
                                value_paid={'Paid'}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}


export default HomeBody;
