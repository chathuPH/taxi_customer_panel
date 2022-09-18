import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
  const userId = window.sessionStorage.getItem("userID");
  if (userId===undefined || userId===null) {
    return (<Redirect to="/" />)
  }
  
  return (
    <div className="container mt-5">
      <div className="row ">
        <Link
          className="col-sm-6 "
          to="/newbooking"
          style={{ textDecoration: "none" }}
        >
          <div className="card text-center text-white bg-primary mt-5">
            <div className="card-body" id="link">
              <h5 className="card-title">New Booking</h5>
              <p className="card-text">Going somwhere? Book your taxi online now!</p>
            </div>
          </div>
        </Link>
        <Link
          className="col-sm-6"
          to="/managebooking"
          style={{ textDecoration: "none" }}
        >
          <div className="card text-center text-white bg-dark mt-5">
            <div className="card-body" id="link">
              <h5 className="card-title">Manage Bookings</h5>
              <p className="card-text">
                View your Ongoing and Previous bookings
              </p>
            </div>
          </div>
        </Link>

        <Link
          className="col-sm-6"
          to="/profile"
          style={{ textDecoration: "none" }}
        >
          <div className="card text-center text-white bg-secondary mt-5">
            <div className="card-body" id="link">
              <h5 className="card-title">My Profile</h5>
              <p className="card-text">View your profile details</p>
            </div>
          </div>
        </Link>

       
      </div>
    </div>
  );
};

export default Dashboard;
