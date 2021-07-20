import React, { useState } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { useMutation, ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { LOGIN_GQL } from '../../graphql/Auth';
import './style.css';

const Home: React.FC = () => {
  const { setAuthorization } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const [login, { loading }] = useMutation(LOGIN_GQL, {
    onCompleted: (response) => {
      setAuthorization(response.login);
    },
    onError: (error: ApolloError) => {
      console.log(error);
      toast.error('Error');
    },
  });

  const onAccess = () => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <section className="page-home">
      <Container>
        <main className="d-flex align-items-center">
          <Row className="w-100 no-gutters">
            <Col xs="12" lg={{ size: 6, offset: 3 }} className="text-center">
              <h2>Don&lsquo;t Forget</h2>

              <p>The easiest way to set reminders.</p>

              <Input
                name="email"
                className="form-control-lg"
                placeholder="Enter your E-mail"
                onChange={(e) => onChangeEmail(e)}
              />

              <Input
                name="password"
                className="form-control-lg mt-3"
                placeholder="Enter your Password"
                onChange={(e) => onChangePassword(e)}
              />

              <Button className="btn btn-access" size="lg" type="button" onClick={onAccess} disabled={loading}>
                {loading ? 'Loading...' : 'Access'}
              </Button>
            </Col>
          </Row>
        </main>
      </Container>
    </section>
  );
};

export default Home;
