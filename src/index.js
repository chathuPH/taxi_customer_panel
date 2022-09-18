import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import NewBooking from "./pages/newBooking/NewBooking";
import ManageBookings from "./pages/manageBookings/ManageBookings"
import MyProfile from "./pages/myProfile/MyProfile"
import Login from "./pages/login/Login"
import register from "./pages/register/Register"


ReactDOM.render(<BrowserRouter>
    <Navbar/>
    <Route exact path="/" component={Login}/>
    <Route exact path="/dashboard" component={Dashboard}/>
    <Route exact path="/newbooking" component={NewBooking}/>
    <Route exact path="/managebooking" component={ManageBookings}/>
    <Route exact path="/profile" component={MyProfile}/>
    <Route exact path="/register" component={register}/>

    
    {/* <Footer/> */}
    </BrowserRouter>,document.getElementById("root"));