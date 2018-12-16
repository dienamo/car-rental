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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis varius nisi nec sagittis. Integer rhoncus arcu ante, vel scelerisque augue dapibus eu. Praesent sed sapien id erat porttitor gravida non sit amet augue. Curabitur luctus porttitor ante, vel aliquet dolor commodo nec. Praesent at enim eu quam consequat aliquam.</p>
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