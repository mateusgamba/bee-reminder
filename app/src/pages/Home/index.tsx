import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Home(): JSX.Element {
  return (
    <Row className="w-100 no-gutters">
      <Col xs="12" lg={{ size: 6, offset: 3 }} className="text-center">
        <h2>Do not Forget</h2>

        <p>The easiest way to set reminders.</p>

        <Link to="/sign-in" className="btn btn-access btn-lg">
          Sign In
        </Link>

        <Link to="/sign-up" className="btn btn-access ms-5 btn-lg">
          Sign Up
        </Link>
      </Col>
    </Row>
  );
}
