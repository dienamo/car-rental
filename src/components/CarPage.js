import React from 'react';
import * as db from '../database/functions';

export default class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fetched: false, carData: null };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const carId = params.carId;
    const carData = await db.fetch_car(carId);
    console.log('car data:', carData);
    this.setState({ fetched: true, carData: carData });
  }

  renderData() {
    if (!this.state.fetched) {
      return (
        <div class="alert alert-primary" role="alert">
          Loading data ...
        </div>
      )
    }
    if (this.state.fetched && !this.state.carData) {
      return (
        <div class="alert alert-danger" role="alert">
          Error loading car data!
        </div>
      )
    }
    return (
      <p>{`${this.state.carData.brand.name} ${this.state.carData.model.name}`}</p>
    )
  }

  render() {
    return (
      <div className="car-page">
        <div className="page-heading-wrap">
          <h1 className="page-heading">Car name</h1>
        </div>
        <main>
          {this.renderData()}
        </main>
      </div>
    )
  }
}