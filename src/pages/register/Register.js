import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

const api = axios.create({
  baseURL: `http://localhost:8080/api/v1/auth/`,
});

const Register = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
    setIserror(false)
    setErrorMessages([])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const copyData={...data}
    copyData.type="customer"
    api
      .post("/register", copyData)
      .then((res) => {
        if (res.status === 202) {
          history.push({
            pathname: "/",
          });
        }
      })
      .catch((error) => {
        console.log("Error");
        setIserror(true);
        setErrorMessages(["Login Failed"]);
      });
  };

  return (
    <div className="container">
      <br />
      <center>
        <h1>Online Taxi Booking Service</h1>
      </center>
      <br />
      <h2>Register</h2>
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
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="customerName"
              type="text"
              placeholder="Enter Name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridContact">
            <Form.Label>Contact No</Form.Label>
            <Form.Control
              name="contactNo"
              type="text"
              placeholder="Enter Contact No"
              onChange={handleChange}
              required
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

export default Register;
