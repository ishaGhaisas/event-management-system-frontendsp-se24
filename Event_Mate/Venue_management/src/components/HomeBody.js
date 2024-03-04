import React, { useState, useEffect  } from "react";
import { Link,useNavigate } from "react-router-dom";
import img from "../assets/HomeImage.jpg";
import bgimg from "../assets/backgroundImage.jpg";
import { Button } from "./Button";
import './homeBody.css';
import ReservationsCard from "./ReservationsCard";

const HomeBody = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [reservations, setReservations] = useState([]);
    const userId = "dummyUserId123";
    // const [profileData, setProfileData] = useState({
    //     user_id: "dummyUserId123",
    //     username: "dummyUsername",
    //     email: "dummy@example.com",
    //     role: "user"
    // });
  

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

                {userId != null && <div className="ChildLeft">
                    <h3>Reservations:</h3>
                    <div className='ReservationSearch'>
                      <input className="searchInput" placeholder="Search Reservations" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    {reservations.filter((item) => {
                    return search.toLowerCase() === '' ? item 
                        : 
                        (item.username.toLowerCase().includes(search)
                        ||
                        item.start_datetime.toLowerCase().includes(search)
                        ||
                        item.end_datetime.toLowerCase().includes(search));
                    })
                    .map((reservation) => (
                        <ReservationsCard
                          key={reservation.venue_id}
                          id={reservation.venue_id}
                          vname={reservation.vname}
                          start_datetime={reservation.start_datetime}
                          end_datetime={reservation.end_datetime}
                          value_paid={reservation.value_paid === 1 ? 'Paid' : 'Not Paid'}
                        />
                    ))}
                  </div>}

            </div>
        </div>
    )
}

export default HomeBody;

