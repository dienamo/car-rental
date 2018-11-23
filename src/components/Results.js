import React from 'react';
import SearchForm from './SearchForm';
import CarThumb from './CarThumb';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, showFilter: false };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
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
  filter() {
    if (this.state.showFilter || this.state.width > 767) {
      return (
        <div className="col-xs-12 col-md-4">
          <aside>
            <SearchForm title="Edit Search" />
          </aside>
        </div>
      )
    }
    return null;
  }
  render() {

    console.log('State:', this.state);

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
              <div className="row">
                <div className="col-md-4">
                  <CarThumb />
                </div>
                <div className="col-md-4">
                  <CarThumb />
                </div>
                <div className="col-md-4">
                  <CarThumb />
                </div>
                <div className="col-md-4">
                  <CarThumb />
                </div>
                <div className="col-md-4">
                  <CarThumb />
                </div>
                <div className="col-md-4">
                  <CarThumb />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}