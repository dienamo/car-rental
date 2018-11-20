import React from 'react';
import SearchForm from './SearchForm';
import TopCars from './TopCars';
import {
  Row, Col,
  Form, FormGroup, Label, Input, FormText, Button
} from 'reactstrap';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="homepage">
        <Row>
          <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }}>
            <div class="left">
              <h3>Car Search</h3>
              <Form>
                <FormGroup>
                  <Label for="car-brand">Car Brand</Label>
                  <Input type="select" name="select" id="car-brand">
                    <option>Skoda</option>
                    <option>Tesla</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="car-model">Car Model</Label>
                  <Input type="select" name="select" id="car-model">
                    <option>Fabia</option>
                    <option>Octavia</option>
                  </Input>
                </FormGroup>
                <Button>Search</Button>
              </Form>
            </div>
          </Col>
          <Col xs={{ size: 12, order: 1 }} md={{ size: 6, order: 2 }}>
            <div class="right">
              <h1>Welcome!</h1>
              <h2>Here you can search and rent car of your dreams!</h2>
              <img src="./img/stock.jpg" alt="stock" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis varius nisi nec sagittis. Integer rhoncus arcu ante, vel scelerisque augue dapibus eu. Praesent sed sapien id erat porttitor gravida non sit amet augue. Curabitur luctus porttitor ante, vel aliquet dolor commodo nec. Praesent at enim eu quam consequat aliquam.</p>
            </div>
          </Col>
        </Row>
        <TopCars carClass="Economic" />
        <TopCars carClass="Middle" />
        <TopCars carClass="Luxury" />
        <TopCars carClass="SUV" />
      </div>
    )
  }
}