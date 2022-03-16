import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import CreateReminder from '../CreateReminder';
import useAuth from '../../../hooks/useAuth';

export default function Header(): JSX.Element {
  const [modal, setModal] = useState<boolean>(false);
  const { clearAuthorization } = useAuth();

  const navigate = useNavigate();

  const logout = () => {
    clearAuthorization();
    navigate('/');
  };

  const toggle = () => setModal(!modal);

  return (
    <div className="d-flex align-items-center flex-row navbar">
      <div className="w-100">
        <Row noGutters>
          <Col className="d-flex justify-content-center justify-content-lg-start col-12 col-lg-6 pb-3 py-lg-0">
            <Link to="/reminders" className="no-link">
              <h3 className="mb-0">Bee Reminder</h3>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center justify-content-lg-end col-12 col-lg-6 align-items-center pb-3 pb-lg-0">
            <div>
              <Button color="secondary btn-bee-secondary mr-3" onClick={toggle}>
                New reminder
              </Button>
              <Button color="secondary btn-bee-secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          </Col>
        </Row>

        {modal && <CreateReminder toggle={toggle} />}
      </div>
    </div>
  );
}
