import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BsFillBookFill, BsFillPersonPlusFill } from "react-icons/bs";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "./styles/HomePage.module.css";

import liftedLogo from "../assets/ft.jpg";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("psnToken") !== null) {
      navigate("/newsfeed");
    }
  });

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div className={styles.container}>
        <div className={styles.colWithButtons}>
          <div className="d-flex justify-content-center align-items-center">
            <img src={liftedLogo} alt="PSN logo" width={120} className="mb-3" />
          </div>

          <Row className="d-flex justify-content-center align-items-center">
            <h1 className="text-dark mb-3" style={{ textAlign: "center" }}>
              See what is happening in the Fitness world right now
            </h1>
          </Row>

          <div className="d-flex justify-content-center align-items-center">
            <Link to="/signin" className={styles.linkTextFormat}>
              <Button
                variant="success"
                className={`${styles.btnHomePage} mb-3`}
                style={{ width: "400px" }}
              >
                Sign In <RiLoginBoxLine />
              </Button>
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Link to="/signup" className={styles.linkTextFormat}>
              <Button
                variant="success"
                className={styles.btnHomePage}
                style={{ width: "400px" }}
              >
                Sign Up <BsFillPersonPlusFill />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
