import React, { useState } from 'react';
import { Button } from './Button';
import SplitLayout from './SplitLayout';
import ReservationsCard from './ReservationsCard';
import basketball from "../assets/basketball.png";
import soccer from "../assets/soccer.png";
import football from "../assets/football.png";
import sports from "../assets/sports.png";

const VenueDetails = () => {
  const [venueName, setVenueName] = useState("Venue");
  const [venueAddress, setVenueAddress] = useState("123 Sample Address");
  const [venueSport, setVenueSport] = useState("Basketball");
  const [closed, setClosed] = useState(false);
  const [image, setImage] = useState(basketball);
  const [mapURL, setMapURL] = useState("https://montessoridigital.org/sites/default/files/images/cards/cc129-en-p.jpg");
  const [reservations, setReservations] = useState([
    {
      venue_id: 1,
      username: "John Doe",
      start_datetime: "2024-03-01T10:00:00",
      end_datetime: "2024-03-01T12:00:00",
      value_paid: 1
    },
    {
      venue_id: 2,
      username: "Jane Smith",
      start_datetime: "2024-03-02T14:00:00",
      end_datetime: "2024-03-02T16:00:00",
      value_paid: 0
    }
  ]);
  const [search, setSearch] = useState('');

  const handleBookmarkButtonClick = () => {
    alert("Bookmark functionality");
  };

  const handleVenueStatusChange = () => {
    setClosed(!closed);
  };

  const handleSportChange = (sport) => {
    setVenueSport(sport);
    switch (sport) {
      case 'Basketball':
        setImage(basketball);
        break;
      case 'Soccer':
        setImage(soccer);
        break;
      case 'Football':
        setImage(football);
        break;
      default:
        setImage(sports);
        break;
    }
  };

  return (
    <div className='venueDetailsBody'>
      <SplitLayout>
        <div className='venueDetailsImage' id='theImage'>
          <img src={image} alt="image" className="mapImg"></img>
        </div>
        <div className='venueDetails'>
          <div className='imageURL'>
            <div className="bookmark">
              <Button onClick={handleBookmarkButtonClick}> Bookmark </Button>
            </div>
            <h2 className='venueDetailsTitle'>{venueName}</h2>
          </div>
          <div className="openCloseDetail">
            {closed ?
              <p className="closeDetails">Closed</p>
              :
              <p className="openDetails">Open</p>
            }
          </div>
          <div className='small-details'>
            <div className='detail'>
              Sport: {venueSport}
              <div>
                <Button onClick={() => handleSportChange('Basketball')}>Basketball</Button>
                <Button onClick={() => handleSportChange('Soccer')}>Soccer</Button>
                <Button onClick={() => handleSportChange('Football')}>Football</Button>
              </div>
            </div>
            <div className='detail'>Address: {venueAddress}</div>
          </div>
          <div className='timeslots'>
            <h4>Time Slots</h4>
            <div>
              <Button buttonStyle='buttonPrimary'>
                Sample Time Slot 1
              </Button>
              <Button buttonStyle='buttonPrimary'>
                Sample Time Slot 2
              </Button>
            </div>
          </div>
          <div className='detail'>
            <Button> Book It! </Button>
          </div>
          <img src={mapURL} className="mapImg"></img>
        </div>
        <div className="ChildLeft">
          <h3>Reservations:</h3>
          <div className='ReservationSearch'>
            <input className="searchInput" placeholder="Search Reservations" onChange={(e) => setSearch(e.target.value)} />
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
                vname={reservation.username}
                start_datetime={reservation.start_datetime.slice(0, 10) + " " + reservation.start_datetime.slice(11, 16)}
                end_datetime={reservation.end_datetime.slice(0, 10) + " " + reservation.end_datetime.slice(11, 16)}
                value_paid={reservation.value_paid === 1 ? 'Paid' : 'Not Paid'}
              />
            ))}
        </div>
      </SplitLayout>
    </div>
  );
};

export default VenueDetails;
