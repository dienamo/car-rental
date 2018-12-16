import React from 'react';
import SearchForm from './SearchForm';
import CarsBar from './CarsBar';
import {
  Row, Col,
} from 'reactstrap';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    document.title = "Car Rental";
  }
  render() {
    return (
      <main className="homepage">
        <Row>
          <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }}>
            <div className="left">
              <SearchForm title="Car Search" />
            </div>
          </Col>
          <Col xs={{ size: 12, order: 1 }} md={{ size: 6, order: 2 }}>
            <div className="right">
              <h1 className="page-heading">Welcome!</h1>
              <h2>Here you can search and rent car of your dreams!</h2>
              <img src="./img/stock.jpg" alt="stock" className="d-none d-md-block" />
              <p>
                In search form you can select your preferred car class, brand and model.
                Fill in where and when you want to pick-up and drop-off rented car.
              </p>
            </div>
          </Col>
        </Row>
        <CarsBar title="Top ordered cars" />
        <CarsBar title="In discount" />
        <CarsBar title="Best for trips" />

      </main>
    )
  }
}