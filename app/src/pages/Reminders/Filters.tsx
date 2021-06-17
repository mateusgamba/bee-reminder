import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, FormGroup, Label, Button, Form } from 'reactstrap';
import queryString from 'query-string';
import { ReminderFilterInput } from '../../ts';
import CustomInput from '../../components/CustomInput';

const Filters: React.FC = () => {
  const history = useHistory();
  const methods = useForm<ReminderFilterInput>();

  const { handleSubmit, register } = methods;

  const onSubmit = handleSubmit((date) => {
    history.push(`/reminders?${queryString.stringify(date)}`);
  });

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Row inline="true" className="mb-3">
        <Col md={3}>
          <FormGroup className="mb-0">
            <Label for="from" className="mb-0">
              Start
            </Label>
            <CustomInput {...register('from')} type="date" id="from" />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup className="mb-0">
            <Label for="to" className="mb-0">
              End
            </Label>
            <CustomInput {...register('to')} type="date" id="to" />
          </FormGroup>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button>Search</Button>
          <Link to="/reminders" className="ml-3 btn btn-link">
            Clear Filter
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
