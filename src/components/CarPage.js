import React from 'react';
import * as db from '../database/functions';
import Orderform from './OrderForm';
import PhotoGallery from './PhotoGallery';

export default class CarPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fetched: false, carData: null };
    this.carId = null;
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const carId = params.carId;

    this.carId = carId;

    const carData = await db.fetch_car(carId);
    //console.log('car data:', carData);
    this.setState({ fetched: true, carData: carData });
  }

  renderData() {
    const data = this.state.carData;
    console.log(data);
    return (
      <React.Fragment>
        <div className="page-heading-wrap">
          <h1 className="page-heading">{`${data.brand.name} ${data.model.name} ${data.engine}`}</h1>
        </div>
        <main>
          <div className="row">
            <div className="col-md-6">
              <PhotoGallery />
            </div>
            <div className="col-md-6">
              <Orderform carId={this.carId} />
            </div>
          </div>
        </main>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="car-page">
        {this.state.fetched ? (
          this.state.carData ? this.renderData() : (
            <div className="alert alert-danger" role="alert">
              Error loading car data!
            </div>
          )
        ) : (
            <div className="alert alert-primary" role="alert">
              Loading data ...
            </div>
          )}
      </div>
    )
  }
}