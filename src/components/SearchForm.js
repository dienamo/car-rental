import React from 'react';
import { Redirect } from 'react-router-dom';
import * as db from '../database/functions';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      redirect: false,
      classes: [],
      brands: {},
      models: { selected: "all", list: [] },
      places: {}
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
    const classes = await db.fetch_classes();
    const brands = await db.fetch_class_brands(["middle"]);
    this.setState({
      classes: [...classes],
      places: {
        pick_up: places[0].id,
        drop_off: places[0].id,
        list: places
      },
      brands: {
        selected: "all",
        list: brands
      },
      render: true
    });
  }

  submitForm(e) {
    e.preventDefault();
    if (this.props.onFormSubmit) {
      this.props.onFormSubmit(this.process_search_data());
    } else {
    this.setState({ redirect: true });
  }
  }

  handleClassChange(e) {
    const class_id = e.target.name;
    const checked = e.target.checked;
    let prev = [...this.state.classes];
    let x = prev.find(e => e.id === class_id);
    if (x) {
      x.selected = checked;
    }
    this.setState({
      classes: prev
    })
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

  process_search_data() {
    let res={};
    res.classes = ['economic', 'middle'];
    res.brand = this.state.brands.selected;
    res.model = this.state.models.selected;
    return res;
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {this.state.redirect && (
          <Redirect push to={{
            pathname: '/results',
            state: { referrer: 'homepage', data: this.process_search_data() }
          }} />
        )}
        <div className="search-form">
          {this.state.render ? (
            <React.Fragment>
              <h3>{this.props.title}</h3>
              <form onSubmit={this.submitForm}>
                <fieldset className="car-classes">
                  <legend>Car classes</legend>
                  {this.state.classes.map(carClass =>
                    <label className={carClass.selected ? 'class-check class-checked' : 'class-check'}
                      htmlFor={"class-" + carClass.id}
                      key={carClass.id}>
                      <img
                        className={carClass.selected ? 'check-icon check-icon-checked' : 'check-icon'}
                        alt="checked"
                        src="./img/ok.png" />
                      <input
                        type="checkbox" id={"class-" + carClass.id}
                        name={carClass.id}
                        onChange={this.handleClassChange}
                        checked={carClass.checked} />
                      {carClass.name}
                    </label>
                  )}
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
            </React.Fragment>
          ) : (
              <p>Wait for it ...</p>
            )}
        </div>
      </React.Fragment>
    )
  }
}