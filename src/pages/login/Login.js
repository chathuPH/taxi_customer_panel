import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

const api = axios.create({
  baseURL: `http://localhost:8080/api/v1/auth/`,
});

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const onChangeUsername = (e) => {
    const userName = e.target.value;
    setUsername(userName);
    setIserror(false)
    setErrorMessages([])
  };
  const onChangePassword = (e) => {
    const passWord = e.target.value;
    setPassword(passWord);
    setIserror(false)
    setErrorMessages([])
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      username: username,
      password: password,
      type: "customer",
    };
    api
      .post("/login", loginData)
      .then((res) => {
        if (res.status === 202) {
          window.sessionStorage.setItem('userID',res.data?.id );
          history.push({
            pathname: "/dashboard",
          });
        }
      })
      .catch((error) => {
        console.log("Error");
        setIserror(true)
        setErrorMessages(["Login Failed"])
      });
  };

  return (
    <div className="auth-page">
      <Container className="col-12">
        <br />
        <center>
          <h1>Online Taxi Booking Service</h1>
        </center>
        <Row className="d-flex align-items-center">
          <Col
            md={{ span: 6, offset: 3 }}
            xs={12}
            lg={6}
            className="left-column"
          >
            <br />
            <h2>Login</h2>
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
            <form onSubmit={handleLogin}>
              <FormGroup className="my-3">
                <FormText>Username</FormText>
                <Input
                  id="email"
                  className="input-transparent pl-3"
                  value={username}
                  onChange={onChangeUsername}
                  type="text"
                  required
                  name="username"
                />
              </FormGroup>
              <FormGroup className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Password</FormText>
                  {/* <Link to="/error">Forgot password?</Link> */}
                </div>
                <Input
                  id="password"
                  className="input-transparent pl-3"
                  value={password}
                  onChange={onChangePassword}
                  type="password"
                  required
                  name="password"
                />
              </FormGroup>
              <div className="bg-widget d-flex justify-content-center">
                <Button className="rounded-pill my-3" type="submit">
                  Login
                </Button>
              </div>

              <Link to="/register">Don’t have an account? Sign Up here</Link>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Login);
