import React,{useEffect,useState} from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:8080/api/v1/customer/`,
});

const MyProfile=()=>{
  const [data, setData] = useState([]); 
  const userId = window.sessionStorage.getItem("userID");

  useEffect(() => {
    api
      .get("/findById?id="+userId)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  if (userId===undefined || userId===null) {
    return (<Redirect to="/" />)
  }

  return(
    <div className="container">
      <br />
      <h2>My Profile</h2>
      <br />
      
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={data?.username}
              disabled
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="customerName"
              type="text"
              value={data?.customerName}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridContact">
            <Form.Label>Contact No</Form.Label>
            <Form.Control
              name="contactNo"
              type="text"
              value={data?.contactNo}
              disabled
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  )
}
export default MyProfile