import React, { useState } from 'react';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';

function VenuesTable() {
  const [venues, setVenues] = useState([
    {
      venue_id: 1,
      vname: "Central Park Basketball Court",
      address: "Central Park, New York, NY 10024",
      sport: "Basketball",
      bookmark: 1
    },
    {
      venue_id: 2,
      vname: "Staples Center",
      address: "1111 S Figueroa St, Los Angeles, CA 90015",
      sport: "Basketball",
      bookmark: 0
    },
    {
      venue_id: 3,
      vname: "Wembley Stadium",
      address: "Wembley, London HA9 0WS, United Kingdom",
      sport: "Football",
      bookmark: 1
    },
    {
      venue_id: 4,
      vname: "Camp Nou",
      address: "C. d'Aristides Maillol, 12, 08028 Barcelona, Spain",
      sport: "Football",
      bookmark: 0
    },
    {
      venue_id: 5,
      vname: "Suncorp Stadium",
      address: "40 Castlemaine St, Milton QLD 4064, Australia",
      sport: "Rugby",
      bookmark: 1
    },
    {
      venue_id: 6,
      vname: "AT&T Stadium",
      address: "1 AT&T Way, Arlington, TX 76011, United States",
      sport: "American Football",
      bookmark: 0
    },
    {
      venue_id: 7,
      vname: "Melbourne Cricket Ground",
      address: "Brunton Ave, Richmond VIC 3002, Australia",
      sport: "Cricket",
      bookmark: 1
    },
    {
      venue_id: 8,
      vname: "Yankee Stadium",
      address: "1 E 161st St, The Bronx, NY 10451, United States",
      sport: "Baseball",
      bookmark: 0
    },
  ]);
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (venueId, sport) => {
    console.log('Clicked Card with ID:', venueId);
    navigate(`/venue/venue-details?venueid=${venueId}&sport=${sport}`);
  };
  
  // const handleCardClick = (venueId) => {
    // console.log('Clicked Card with ID:', venueId);
    // navigate(`/venue/venue-details?venueid=${venueId}`);
  // };

  const handleBookmarkChange = (e) => {
    setIsBookmarkChecked(e.target.checked);
  };

  const [search, setSearch] = useState('');

  return (
    <div className='venueViewHost'>
      <div className='ViewPageBody'>
        <form className='searchForm'>
          <input className="searchInput" placeholder="Search Venues or Activities" onChange={(e) => setSearch(e.target.value)} />
          <div className='bookmarkCheckbox'>
            <label>
              Bookmarked: {" "}
              <input className="checkbox" type="checkbox" checked={isBookmarkChecked} onChange={handleBookmarkChange} />
            </label>
          </div>
        </form>
        <div className='theVenues'>
          {venues.filter((item) => {
            const matchesSearch = (
              item.vname.toLowerCase().includes(search) ||
              item.sport.toLowerCase().includes(search) ||
              item.address.toLowerCase().includes(search)
            );

            const matchesBookmark = (
              !isBookmarkChecked ||
              (isBookmarkChecked && item.bookmark === 1)
            );

            return matchesSearch && matchesBookmark;
          })
            .map((venue) => (
              <Card
                key={venue.venue_id}
                id={venue.venue_id}
                vname={venue.vname}
                address={venue.address}
                sport={venue.sport}
                bookmark={venue.bookmark}
                onClick={() => handleCardClick(venue.venue_id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default VenuesTable;
