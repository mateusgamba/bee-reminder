import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import CreateReminder from '../../pages/Admin/CreateReminder';
import useAuth from '../../hooks/useAuth';
import useNavigateTo from '../NavigateTo';
import LinkTo from '../LinkTo';

export default function Header(): JSX.Element {
  const [modal, setModal] = useState<boolean>(false);
  const { navigateTo } = useNavigateTo();
  const { clearAuthorization } = useAuth();

  const logout = () => {
    clearAuthorization();
    navigateTo('/');
  };

  const toggle = () => setModal(!modal);

  return (
    <div className="d-flex align-items-center flex-row navbar">
      <div className="w-100">
        <Row className="g-0">
          <Col className="d-flex justify-content-center justify-content-lg-start col-12 col-lg-6 pb-3 py-lg-0">
            <LinkTo to="/reminders" className="no-link">
              <h3 className="mb-0">Bee Reminder</h3>
            </LinkTo>
          </Col>
          <Col className="d-flex justify-content-center justify-content-lg-end col-12 col-lg-6 align-items-center pb-3 pb-lg-0">
            <div>
              <Button color="secondary btn-bee-secondary me-3" onClick={toggle}>
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
