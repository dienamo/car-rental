import React from 'react';
import { Row, Col } from 'reactstrap';
import CarThumb from './CarThumb';

export default class TopCars extends React.Component {
  render() {
    return (
      <div className="top-cars">
        <h3>Top Cars - {this.props.carClass}</h3>
        <Row>
          <Col sm={12} lg={3}>
            <CarThumb />
          </Col>
          <Col sm={12} lg={3}>
            <CarThumb />
          </Col>
          <Col sm={12} lg={3}>
            <CarThumb />
          </Col>
          <Col sm={12} lg={3}>
            <CarThumb />
          </Col>
        </Row>
      </div>
    )
  }
}