// client/src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import HomeBody from "./components/HomeBody.js";
//import "./index.css";
import NavBar from "./components/navBar";
import Home from './components/Home.js'
import ResetPassword from "./components/ResetPassword.js";
import PlayersPage from "./components/PlayersPage.js";
import { SearchBar } from "./components/SearchBar.js";
import VenueDetails from "./components/venueDetails.js";
import VenuesTable from "./components/ViewPage.js";



function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path='/homeB' element={<HomeBody />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />} />
          <Route path='/player-page' element={<PlayersPage />} />
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path='/search' element={<SearchBar />} />
          <Route path='/venues' element={<VenuesTable />}/>
          <Route path='/venue/venue-details?' element={<VenueDetails />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
