import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import "../index.css";
import { Link } from "react-router-dom";
import { isAuth } from "../App";

function HomePage() {
  return (
    <>
      <div className="hero">
        <Container>
          <h1>Welcome to Train Booking System</h1>
          <p>
            Your journey starts here. Book your train tickets with ease and
            convenience.
          </p>
          {!isAuth() ? (
            <>
              <Button variant="primary" size="lg" className="ml-5">
                <Link to={"/register"} style={{ color: "white" }}>
                  Get Started
                </Link>
              </Button>
              <Button variant="secondary" size="lg" href="/login">
                <Link to={"/login"} color="white">
                  Login
                </Link>
              </Button>
            </>
          ) : (
            <Button variant="primary" size="lg" className="ml-5">
              <Link to={"/trains/availability"} style={{ color: "white" }}>
                Check Train Availability
              </Link>
            </Button>
          )}
        </Container>
      </div>

      <div className="features">
        <Container>
          <h2>Features</h2>
          <Row>
            <Col md={4} className="feature">
              <Card>
                <Card.Body>
                  <Card.Title>Easy Booking</Card.Title>
                  <Card.Text>
                    Book your train tickets in just a few clicks.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="feature">
              <Card>
                <Card.Body>
                  <Card.Title>Real-time Updates</Card.Title>
                  <Card.Text>
                    Get real-time updates on train availability and bookings.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="feature">
              <Card>
                <Card.Body>
                  <Card.Title>Secure Payments</Card.Title>
                  <Card.Text>
                    We ensure secure and hassle-free payment options.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="testimonial">
        <Container>
          <h2>What Our Customers Say</h2>
          <p>
            "The Train Booking System made my travel planning so easy and
            convenient. Highly recommended!"
          </p>
          <p>- Zeeshan Ahmad</p>
        </Container>
      </div>
    </>
  );
}

export default HomePage;
