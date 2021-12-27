import React, { useState } from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './style.css';

export default function SignIn(): JSX.Element {
  const { login, loginLoading } = useAuth();

  const [email, setEmail] = useState<string>('dev@gfakemail.com');
  const [password, setPassword] = useState<string>('123123123');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onAccess = () => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div className="box-center">
      <div className="box-center-form">
        <Row className="no-gutters w-100">
          <Col className="text-center rounded bg-white p-3">
            <h4 className="mb-3">Please sign in</h4>

            <Input
              name="email"
              className="form-control-lg"
              placeholder="Enter your E-mail"
              onChange={(e) => onChangeEmail(e)}
              defaultValue={email}
            />

            <Input
              name="password"
              className="form-control-lg mt-3"
              placeholder="Enter your Password"
              onChange={(e) => onChangePassword(e)}
              defaultValue={password}
            />

            <Button className="btn btn-bee-secondary mt-3 " type="button" onClick={onAccess} disabled={loginLoading}>
              {loginLoading ? 'Loading...' : 'Access'}
            </Button>

            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/sign-up">Sign up for an account</Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
