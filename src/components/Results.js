import React from 'react';
import SearchForm from './SearchForm';
import CarThumb from './CarThumb';
import * as db from '../database/functions';
import { Link } from 'react-router-dom';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      showFilter: false,
      cars: [],
      renderList: false
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.search(this.props.location.state.data);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  async search(data) {
    this.setState({ renderList: false });
    const cars = await db.search(data);
    this.setState({
      renderList: true,
      cars: [...cars]
    });
  }

  filter() {
    if (this.state.showFilter || this.state.width > 767) {
      return (
        <div className="col-xs-12 col-md-4">
          <SearchForm title="Edit Search" onFormSubmit={this.search} />
        </div>
      )
    }
    return null;
  }

  results() {
    if (this.state.cars.length > 0) {
      return (
        <div className="row">
          {this.state.cars.map(car =>
            <div className="col-sm-6 col-lg-4 px-2 grid-item" key={car.id}>
              <Link to={`/car/${car.id}`}>
              <CarThumb name={car.brand.name + ' ' + car.model.name} price={car.price} />
              </Link>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div class="alert alert-danger" role="alert">
          No results!
        </div>
      )
    }
  }

  render() {
    return (
      <div className="results">
        <div className="page-heading-wrap">
          <h1 className="page-heading">Search results</h1>
          <button className="btn btn-primary btn-edit-search"
            onClick={this.toggleFilter}>
            Edit Search
          </button>
        </div>
        <main>
          <div className="row">
            {this.filter()}
            <div className="col-xs-12 col-md-8">
              {this.state.renderList ? this.results() : <p>Loading ...</p>}
            </div>
          </div>
        </main>
      </div>
    )
  }
}