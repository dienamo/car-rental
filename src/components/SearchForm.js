import React from 'react';
import { Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="search-form">
        <Card>
          <CardBody>
            <CardTitle>{this.props.headline}</CardTitle>
          </CardBody>
          <CardBody>
            <Form>
              <FormGroup>
                <Row>
                  <Label for="exampleSelect" className="col-sm-6">Brand</Label>
                  <Col sm={6}>
                    <Input type="select" name="select" id="car-brands">
                      <option>Škoda</option>
                      <option>Tesla</option>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Model</Label>
                <Input type="select" name="select" id="car-models">
                  <option>Fabia</option>
                  <option>Octavia</option>
                </Input>
              </FormGroup>
              <label for="exampleFormControlInput1">Email address</label>
              <FormGroup>
                <input type="email" class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com" />
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  }
}