import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import CategoriesDropdown from "../../components/categoriesDropdown/CategoriesDropdown";
import VehiclesDropdown from "../../components/vehiclesDropdown/VehiclesDropdown";
import BranchesDropdown from "../../components/branchesDropdown/BranchesDropdown";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useHistory } from "react-router";

const api = axios.create({
  baseURL: `http://localhost:8080/api/v1/booking`,
});

const NewBooking = () => {
  const history = useHistory();
  const userId = window.sessionStorage.getItem("userID");

  const [categoryValue, setCategoryValue] = useState();
  const [vehicleValue, setVehicleValue] = useState();
  const [sourceValue, setSourceValue] = useState();
  const [destinationValue, setDestinationValue] = useState();

  const [calFee, setCalFee] = useState(0);
  const [data, setData] = useState([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
    setIserror(false);
    setErrorMessages([]);
  };
  const handleCategoryChange = (e) => {
    const Cvalue = e.Cid;
    setCategoryValue(Cvalue);
    setIserror(false);
    setErrorMessages([]);
  };
  const handleVehicleChange = (e) => {
    const Vvalue = e.Vid;
    setVehicleValue(Vvalue);
    setIserror(false);
    setErrorMessages([]);
  };

  const handleDistanceChange = (e) => {
    const value = e.target.value;
    const calFeeVal = value * 100;
    setCalFee(calFeeVal);
    setIserror(false);
    setErrorMessages([]);
  };

  const handleSourceChange = (e) => {
    const Svalue = e.Bid;
    setSourceValue(Svalue);
    setIserror(false);
    setErrorMessages([]);
  };
  const handleDestinationChange = (e) => {
    const Dvalue = e.Bid;
    setDestinationValue(Dvalue);
    setIserror(false);
    setErrorMessages([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const copyData = { ...data };
    copyData.source = sourceValue;
    copyData.destination = destinationValue;
    copyData.fee = calFee;
    copyData.vehicle = vehicleValue;
    copyData.customer = userId;

    api
      .post("/create", copyData)
      .then((res) => {
        setSuccessMessages([
          "Your Booking was successfull, Please wait for a driver to accept",
        ]);
        setIsSuccess(true);
        // if (res.status === 201) {
        //   setTimeout(
        //     history.push({
        //       pathname: "/managebooking",
        //     }),
        //     3000
        //   );
        // }
      })
      .catch((error) => {
        console.log("Error");
        setIserror(true);
        setErrorMessages(["Booking Failed"]);
      });
  };

  return (
    <div className="container">
      <br />
      <h2>Place a New Booking</h2>
      <br />
      <div>
        {iserror && (
          <Alert severity="error">
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>;
            })}
          </Alert>
        )}
      </div>
      <div>
        {isSuccess && (
          <Alert severity="success">
            {successMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>;
            })}
          </Alert>
        )}
        <br />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUserName">
            <Form.Label>Category</Form.Label>
            <CategoriesDropdown
              name="category"
              onChange={handleCategoryChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridUserName">
            <Form.Label>Vehicle</Form.Label>
            <VehiclesDropdown
              name="vehicle"
              categoryValue={categoryValue}
              onChange={handleVehicleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUserName">
            <Form.Label>Source</Form.Label>
            <BranchesDropdown name="source" onChange={handleSourceChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridUserName">
            <Form.Label>Destination</Form.Label>
            <BranchesDropdown
              name="destination"
              onChange={handleDestinationChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDistance">
            <Form.Label>Distance (km)</Form.Label>
            <Form.Control
              name="distance"
              type="text"
              placeholder="Enter distance"
              onChange={handleDistanceChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridFee">
            <Form.Label>Fee</Form.Label>
            <Form.Control
              name="fee"
              type="text"
              onChange={handleChange}
              value={calFee}
              required
              disabled
            />
          </Form.Group>
        </Row>

        <br />
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};
export default NewBooking;
