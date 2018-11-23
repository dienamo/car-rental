import React from 'react';
import { Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    this.setState({ redirect: true });
  }
  render() {
    //const { from } = this.props.location.state || '/'
    return (
      <React.Fragment>
        
        {this.state.redirect && (
          <Redirect push to={{
            pathname: '/results',
            state: {referrer: 'homepage'}
          }} />
        )}

        <div className="search-form">
          <h3>{this.props.title}</h3>
          <form onSubmit={this.submitForm}>
            <div className="car-classes">

              <label className="class-check">
                <input className="form-check-input" type="checkbox" id="class-economic" value="economic" />
                Economic
              </label>

              {/* <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="class-economic" value="economic" />
                <label className="form-check-label" htmlFor="class-economic">Economic</label>
              </div> */}

              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="class-middle" value="middle" />
                <label className="form-check-label" htmlFor="class-middle">Middle</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="class-luxury" value="luxury" />
                <label className="form-check-label" htmlFor="class-luxury">Luxury</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="class-suv" value="suv" />
                <label className="form-check-label" htmlFor="class-suv">SUV</label>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-4">
                <label>Car brand</label>
              </div>
              <div className="col-md-8">
                <Input type="select" name="select" id="car-brand">
                  <option>Skoda</option>
                  <option>Tesla</option>
                </Input>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-4">
                <label>Car model</label>
              </div>
              <div className="col-md-8">
                <Input type="select" name="select" id="car-brand">
                  <option>Fabia</option>
                  <option>Octavia</option>
                </Input>
              </div>
            </div>
            <Button>Search</Button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}