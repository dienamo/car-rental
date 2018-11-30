import React from 'react';
import SearchForm from './SearchForm';
import CarThumb from './CarThumb';
import * as db from '../database/functions';

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
    this.setState({renderList: false});
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
          <aside>
            <SearchForm title="Edit Search" onFormSubmit={this.search} />
          </aside>
        </div>
      )
    }
    return null;
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
        <div className="row">
          {this.filter()}
          <div className="col-xs-12 col-md-8">
            <main>
              {this.state.renderList ? (
                <div className="row">
                  {this.state.cars.map(car =>
                    <div className="col-sm-6 col-lg-4 px-2 grid-item" key={car.id}>
                      <CarThumb name={car.brand.name + ' ' + car.model.name} price={car.price} />
                    </div>
                  )}
                </div>
              ) : (
                  <p>Loading ...</p>
                )}
            </main>
          </div>
        </div>
      </div>
    )
  }
}