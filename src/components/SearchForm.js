import React from 'react';
import { Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      carClasses: { economic: true, middle: true, luxury: false, suv: false },
      car_brand: "all",
      car_model: "all"
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    this.setState({ redirect: true });
  }
  handleClassChange(e) {
    const target = e.target;
    const checked = target.checked;
    let prev = { ...this.state.carClasses };
    prev[target.name] = checked;
    this.setState({ carClasses: prev });
  }
  handleBrandChange(e) {
    console.log(e.target.value);
    this.setState({ car_brand: e.target.value, car_model: "all" });
  }
  handleModelChange(e) {
    console.log(e.target.value);
    this.setState({ car_model: e.target.value });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.redirect && (
          <Redirect push to={{
            pathname: '/results',
            state: { referrer: 'homepage' }
          }} />
        )}
        <div className="search-form">
          <h3>{this.props.title}</h3>
          <form onSubmit={this.submitForm}>
            <fieldset className="car-classes">
              <legend>Car classes</legend>
              <label className={this.state.carClasses['economic'] ? 'class-check class-checked' : 'class-check'}
                htmlFor="class-economic">
                <img
                  className={this.state.carClasses['economic'] ? 'check-icon check-icon-checked' : 'check-icon'}
                  alt="checked"
                  src="./img/ok.png" />
                <input
                  type="checkbox" id="class-economic"
                  name="economic"
                  onChange={this.handleClassChange}
                  checked={this.state.carClasses['economic']} />
                Economic
              </label>
              <label className={this.state.carClasses['middle'] ? 'class-check class-checked' : 'class-check'}
                htmlFor="class-middle">
                <img
                  className={this.state.carClasses['middle'] ? 'check-icon check-icon-checked' : 'check-icon'}
                  alt="checked"
                  src="./img/ok.png" />
                <input
                  type="checkbox" id="class-middle"
                  name="middle"
                  onChange={this.handleClassChange}
                  checked={this.state.carClasses['middle']} />
                Middle
              </label>
              <label className={this.state.carClasses['luxury'] ? 'class-check class-checked' : 'class-check'}
                htmlFor="class-luxury">
                <img
                  className={this.state.carClasses['luxury'] ? 'check-icon check-icon-checked' : 'check-icon'}
                  alt="checked"
                  src="./img/ok.png" />
                <input
                  type="checkbox" id="class-luxury"
                  name="luxury"
                  onChange={this.handleClassChange}
                  checked={this.state.carClasses['luxury']} />
                Luxury
              </label>
              {/* <label className={this.state.carClasses['suv'] ? 'class-check class-checked' : 'class-check'}
                htmlFor="class-suv">
                <img
                  className={this.state.carClasses['suv'] ? 'check-icon check-icon-checked' : 'check-icon'}
                  alt="checked"
                  src="./img/ok.png" />
                <input
                  type="checkbox" id="class-suv"
                  name="suv"
                  onChange={this.handleClassChange}
                  checked={this.state.carClasses['suv']} />
                SUV
              </label> */}
            </fieldset>
            <fieldset className="preferred-brand">
              <legend>Preferred car brand</legend>
              <div className="row form-group">
                <div className="col-md-4">
                  <label htmlFor="car-brand">Car brand</label>
                </div>
                <div className="col-md-8">
                  <select onChange={this.handleBrandChange}
                    defaultValue={this.state.car_brand}
                    value={this.state.car_brand}
                    className="form-control"
                    name="car-brand"
                    id="car-brand">
                    <option value="all">All brands</option>
                    <option value="skoda">Skoda</option>
                    <option value="tesla">Tesla</option>
                  </select>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-4">
                  <label htmlFor="car-model">Car model</label>
                </div>
                <div className="col-md-8">
                  <select onChange={this.handleModelChange}
                    defaultValue={this.state.car_model}
                    value={this.state.car_brand === "all" ? "all" : this.state.car_model}
                    className="form-control"
                    name="car-model"
                    id="car-model" disabled={this.state.car_brand === "all" ? true : false}>
                    <option value="all">All from selected brand</option>
                    <option value="fabia">Fabia</option>
                    <option value="octavia">Octavia</option>
                  </select>
                </div>
              </div>
            </fieldset>
            <fieldset className="pick-up">
              <legend>Pick-up information</legend>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="pick-up-date">Pick-up date</label>
                  <input className="form-control" id="pick-up-date" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="pick-up-time">Pick-up time</label>
                  <input className="form-control" id="pick-up-time" />
                </div>
              </div>
              <label htmlFor="pick-up-location">Pick-up location</label>
              <input className="form-control" id="pick-up-location" />
            </fieldset>
            <fieldset className="drop-off">
              <legend>Drop-off information</legend>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="drop-off-date">Drop-off date</label>
                  <input className="form-control" id="drop-off-date" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="drop-off-time">Drop-off time</label>
                  <input className="form-control" id="drop-off-time" />
                </div>
              </div>
              <label htmlFor="drop-off-location">Drop-off location</label>
              <input className="form-control" id="drop-off-location" />
            </fieldset>
            <button className="btn btn-primary">Search</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}