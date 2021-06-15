import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import useReminder from '../../hooks/useReminder';
import CreateReminder from '../CreateReminder';

const Header: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);

  const { setUserId } = useReminder();

  const history = useHistory();

  const back = () => {
    sessionStorage.removeItem('userId');
    setUserId(null);
    history.push('/');
  };

  const toggle = () => setModal(!modal);

  return (
    <div className="d-flex align-items-center flex-row navbar">
      <div className="w-100">
        <Row noGutters>
          <Col className="d-flex justify-content-center justify-content-lg-start col-12 col-lg-6 pb-3 py-lg-0">
            <h3 className="mb-0">Bee Reminder</h3>
          </Col>
          <Col className="d-flex justify-content-center justify-content-lg-end col-12 col-lg-6 align-items-center pb-3 pb-lg-0">
            <div>
              <Button color="secondary btn-bee-secondary mr-3" onClick={toggle}>
                New reminder
              </Button>
              <Button color="secondary btn-bee-secondary" onClick={back}>
                Sign out
              </Button>
            </div>
          </Col>
        </Row>

        {modal && <CreateReminder toggle={toggle} />}
      </div>
    </div>
  );
};

export default Header;
