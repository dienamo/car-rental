import React from 'react';
import { Row, Col } from 'reactstrap';
import CarThumb from './CarThumb';

export default class CarBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const carData = {
      id: "BauCWtiznEiyiWvrlqo6",
      brand: { name: "Škoda" },
      model: { name: "Octavia" },
      engine: "1.9 TDI",
      price: 10
    };
    return (
      <section className="cars-bar">
        <h3>{this.props.title}</h3>
        <Row>
          <Col xs={12} sm={6} lg={3}>
            <CarThumb carData={carData} />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <CarThumb carData={carData} />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <CarThumb carData={carData} />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <CarThumb carData={carData} />
          </Col>
        </Row>
      </section>
    )
  }
}