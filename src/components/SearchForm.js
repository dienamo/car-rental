import React from 'react';
import { Redirect } from 'react-router-dom';
import * as db from '../database/functions';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      redirect: false,
      classes: [
        { name: "Economic", selected: true, id: "economic" },
        { name: "Middle", selected: true, id: "middle" },
        { name: "Luxury", selected: false, id: "luxury" },
      ],
      brands: { fetched: false, selected: "all", list: [] },
      models: { fetched: false, selected: "all", list: [] },
      places: { fetched: false }
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
    const brands = await db.fetch_class_brands(["middle", "luxury", "economic"]);
    this.setState({
      places: {
        pick_up: places[0].id,
        drop_off: places[0].id,
        list: places,
        fetched: true
      },
      brands: {
        selected: "all",
        list: brands,
        fetched: true
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
    let res = {};
    res.classes = [];
    this.state.classes.forEach(c => {
      if (c.selected) {
        res.classes.push(c.id);
      }
    })
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
                      checked={carClass.selected} />
                    {carClass.name}
                  </label>
                )}
              </fieldset>
              <fieldset className="preferred-brand">
                <legend>Preferred brand &amp; model</legend>
                <label htmlFor="car-brand">Car brand</label>
                <select onChange={this.handleBrandChange}
                  value={this.state.brands.selected}
                  className="form-control"
                  name="car-brand"
                  id="car-brand"
                  disabled={this.state.brands.fetched ? false : true}>
                  <option value="all">{this.state.brands.fetched ? "All brands" : "Loading brands ..."}</option>
                  {this.state.brands.fetched && this.state.brands.list.map(brand =>
                    <option value={brand.id} key={brand.id}>{brand.name}</option>  
                  )}
                </select>
                <label htmlFor="car-model">Car model</label>
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
              </fieldset>
              <fieldset className="pick-up">
                <legend>Pick-up information</legend>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="pick-up-date">Pick-up date</label>
                    <input className="form-control" id="pick-up-date" placeholder="24.12.2018" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pick-up-time">Pick-up time</label>
                    <input className="form-control" id="pick-up-time" placeholder="12:00" />
                  </div>
                </div>
                <label htmlFor="pick-up-location">Pick-up location</label>
                <select className="form-control"
                  disabled={this.state.places.fetched ? false : true}
                  id="pick-up-location"
                  onChange={this.handlePickUpPlace}
                  value={this.state.places.pick_up}>
                  {this.state.places.fetched ? (
                    this.state.places.list.map(place =>
                      <option value={place.id} key={place.id}>{place.name}</option>
                    )
                  ) : (
                      <option value="null">Loading locations ...</option>
                    )}
                  {}
                </select>
              </fieldset>
              <fieldset className="drop-off">
                <legend>Drop-off information</legend>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="drop-off-date">Drop-off date</label>
                    <input className="form-control" id="drop-off-date" placeholder="31.12.2018" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="drop-off-time">Drop-off time</label>
                    <input className="form-control" id="drop-off-time" placeholder="18:00" />
                  </div>
                </div>
                <label htmlFor="drop-off-location">Drop-off location</label>
                <select className="form-control"
                  disabled={this.state.places.fetched ? false : true}
                  id="drop-off-location"
                  onChange={this.handleDropOffPlace}
                  value={this.state.places.drop_off}>
                  {this.state.places.fetched ? (
                    this.state.places.list.map(place =>
                      <option value={place.id} key={place.id}>{place.name}</option>
                    )
                  ) : (
                      <option value="null">Loading locations ...</option>
                    )}
                  {}
                </select>
              </fieldset>
              <button className="btn btn-primary">Search</button>
            </form>
          </React.Fragment>
        </div>
      </React.Fragment>
    )
  }
}