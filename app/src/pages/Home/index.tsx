import { Row, Col } from 'reactstrap';
import LinkTo from '../../components/LinkTo';

export default function Home(): JSX.Element {
  return (
    <Row className="w-100 no-gutters">
      <Col xs="12" lg={{ size: 6, offset: 3 }} className="text-center">
        <h2>Do not Forget</h2>

        <p>The easiest way to set reminders.</p>

        <LinkTo to="/sign-in" className="btn btn-access btn-lg">
          Sign In
        </LinkTo>

        <LinkTo to="/sign-up" className="btn btn-access ms-5 btn-lg">
          Sign Up
        </LinkTo>
      </Col>
    </Row>
  );
}
