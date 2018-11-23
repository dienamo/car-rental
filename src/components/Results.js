import React from 'react';
import SearchForm from './SearchForm';
import CarThumb from './CarThumb';

export default class Results extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  render() {
    
    console.log('State:', this.props.location.state);

    return (
      <div className="results">
        <h1 className="page-heading">Search results</h1>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <aside>
              <SearchForm title="Edit Search" />
            </aside>
          </div>
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