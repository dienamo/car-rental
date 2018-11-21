import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="search-form">
        <h3>{this.props.title}</h3>
        <form>
          <div className="car-classes">
            <div className="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="class-economic" value="economic" />
              <label class="form-check-label" for="class-economic">Economic</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="class-middle" value="middle" />
              <label class="form-check-label" for="class-middle">Middle</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="class-luxury" value="luxury" />
              <label class="form-check-label" for="class-luxury">Luxury</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="class-suv" value="suv" />
              <label class="form-check-label" for="class-suv">SUV</label>
            </div>
          </div>
          <div className="row form-group">
            <div class="col-md-4">
              <label>Car brand</label>
            </div>
            <div class="col-md-8">
              <Input type="select" name="select" id="car-brand">
                <option>Skoda</option>
                <option>Tesla</option>
              </Input>
            </div>
          </div>
          <div className="row form-group">
            <div class="col-md-4">
              <label>Car model</label>
            </div>
            <div class="col-md-8">
              <Input type="select" name="select" id="car-brand">
                <option>Fabia</option>
                <option>Octavia</option>
              </Input>
            </div>
          </div>
          <Button>Search</Button>
        </form>
      </div>
    )
  }
}