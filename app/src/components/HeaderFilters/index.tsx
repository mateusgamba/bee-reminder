import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Row, Col, Label, Button, Form } from 'reactstrap';
import queryString from 'query-string';
import { ReminderFilterInput } from '../../ts';
import CustomInput from '../CustomInput';
import useQueryString from '../../hooks/useQueryString';
import useNavigateTo from '../NavigateTo';
import LinkTo from '../LinkTo';

export default function HeaderFilters(): JSX.Element {
  const { navigateTo } = useNavigateTo();
  const { pathname } = useLocation();
  const query = useQueryString();

  const from = query.get('from') ?? undefined;
  const to = query.get('to') ?? undefined;

  const methods = useForm<ReminderFilterInput>({
    defaultValues: {
      from,
      to,
    },
  });

  const { handleSubmit, register, setValue } = methods;

  useEffect(() => {
    if (pathname !== '/search') {
      setValue('from', '');
      setValue('to', '');
    }
  }, [pathname]);

  const onSubmit = handleSubmit((date) => {
    navigateTo(`/search?${queryString.stringify(date)}`);
  });

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Row inline="true" className="mb-3">
        <Col lg="3" md="4">
          <div>
            <Label for="from" className="mb-0">
              Start
            </Label>
            <CustomInput {...register('from')} type="date" id="from" />
          </div>
        </Col>
        <Col lg="3" md="4" className="mt-3 my-md-0">
          <div>
            <Label for="to" className="mb-0">
              End
            </Label>
            <CustomInput {...register('to')} type="date" id="to" />
          </div>
        </Col>
        <Col lg="6" md="4" className="d-flex align-items-end pt-3 px-md-0 pt-lg-3">
          <Button className="ms-0 ms-md-3">Search</Button>
          <LinkTo to="/reminders" className="ms-2 ms-lg-3 btn btn-link">
            Clear Filter
          </LinkTo>
        </Col>
      </Row>
    </Form>
  );
}
