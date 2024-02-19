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


function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path='/homeB' element={<HomeBody />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />} />
          <Route path='/reset-password' element={<ResetPassword />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;