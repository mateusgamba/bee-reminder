import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, FormGroup, Label, Button, Form } from 'reactstrap';
import queryString from 'query-string';
import { ReminderFilterInput } from '../../ts';
import CustomInput from '../CustomInput';

const HeaderFilters: React.FC = () => {
  const history = useHistory();
  const methods = useForm<ReminderFilterInput>();

  const { handleSubmit, register } = methods;

  const onSubmit = handleSubmit((date) => {
    history.push(`/search?${queryString.stringify(date)}`);
  });

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Row inline="true" className="mb-3">
        <Col lg="3" md="4">
          <FormGroup className="mb-0">
            <Label for="from" className="mb-0">
              Start
            </Label>
            <CustomInput {...register('from')} type="date" id="from" />
          </FormGroup>
        </Col>
        <Col lg="3" md="4" className="my-3 my-md-0">
          <FormGroup className="mb-0">
            <Label for="to" className="mb-0">
              End
            </Label>
            <CustomInput {...register('to')} type="date" id="to" />
          </FormGroup>
        </Col>
        <Col lg="6" md="4" className="d-flex align-items-end px-3 px-md-0 px-lg-3">
          <Button>Search</Button>
          <Link to="/reminders" className="ml-2 ml-lg-3 btn btn-link">
            Clear Filter
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default HeaderFilters;
