import React, { useState } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useMutation, ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';
import useReminder from '../../hooks/useReminder';
import { CREATE_USER_GQL } from '../../graphql/User';
import './style.css';

const Home: React.FC = () => {
  const { setUserId } = useReminder();

  const history = useHistory();
  const [email, setEmail] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const [createUser, { loading }] = useMutation(CREATE_USER_GQL, {
    onCompleted: (response) => {
      setUserId(response.createUser.id);
      sessionStorage.setItem('userId', response.createUser.id);
      history.push(`/reminders`);
    },
    onError: (error: ApolloError) => {
      const validations = error?.graphQLErrors?.[0]?.extensions?.validation;
      toast.error(validations.email.toString());
    },
  });

  const onAccess = () => {
    createUser({
      variables: {
        email,
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
                onChange={(e) => onChange(e)}
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
