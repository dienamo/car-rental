import React from 'react';
import { Redirect } from 'react-router-dom';
import * as db from '../database/functions';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      carClasses: {},
      brands: { selected: "all", list: [] },
      models: { selected: "all", list: [] },
      places: { pick_up: "", drop_off: "", list: [] }
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handlePickUpPlace = this.handlePickUpPlace.bind(this);
    this.handleDropOffPlace = this.handleDropOffPlace.bind(this);
  }

  async componentDidMount() {
    const places = await db.fetch_places();
    this.setState({
      places: {
        pick_up: places[0].id,
        drop_off: places[0].id,
        list: places
      }
    });
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
    let brand_id = e.target.value;
    (async () => {
      this.setState({
        brands: { ...this.state.brands, selected: brand_id },
        models: { selected: "all", list: await db.fetch_brand_models(brand_id) }
      })
    })();
  }

  handleModelChange(e) {
    let model_id = e.target.value;
    this.setState({
      models: { ...this.state.models, selected: model_id }
    });
  }

  handlePickUpPlace(e) {
    let place_id = e.target.value;
    this.setState({
      places: { ...this.state.places, pick_up: place_id }
    });
  }

  handleDropOffPlace(e) {
    let place_id = e.target.value;
    this.setState({
      places: { ...this.state.places, drop_off: place_id }
    });
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
            </fieldset>
            <fieldset className="preferred-brand">
              <legend>Preferred car brand</legend>
              <div className="row form-group">
                <div className="col-md-4">
                  <label htmlFor="car-brand">Car brand</label>
                </div>
                <div className="col-md-8">
                  <select onChange={this.handleBrandChange}
                    value={this.state.brands.selected}
                    className="form-control"
                    name="car-brand"
                    id="car-brand">
                    <option value="all">All brands</option>
                    <option value="skoda">Skoda</option>
                    <option value="bmw">BMW</option>
                  </select>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-4">
                  <label htmlFor="car-model">Car model</label>
                </div>
                <div className="col-md-8">
                  <select onChange={this.handleModelChange}
                    value={this.state.brands.selected === "all" ? "all" : this.state.models.selected}
                    className="form-control"
                    name="car-model"
                    id="car-model"
                    disabled={this.state.brands.selected === "all" ? true : false}>
                    <option value="all">All from selected brand</option>
                    {this.state.models.list.map(model =>
                      <option key={model.id} value={model.id}>{model.name}</option>
                    )}
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
              <select className="form-control"
                id="pick-up-location"
                onChange={this.handlePickUpPlace}
                value={this.state.places.pick_up}>
                {this.state.places.list.map(place =>
                  <option value={place.id} key={place.id}>{place.name}</option>
                )}
              </select>
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
              <select className="form-control"
                id="drop-off-location"
                onChange={this.handleDropOffPlace}
                value={this.state.places.drop_off}>
                {this.state.places.list.map(place =>
                  <option value={place.id} key={place.id}>{place.name}</option>
                )}
              </select>
            </fieldset>
            <button className="btn btn-primary">Search</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}