import React from 'react';
import * as db from '../database/functions';

import AlertBox from './AlertBox';

export default class Orderform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: { fetched: false },
      submitState: null,
      formData: {}
    };

    this._isMounted = false;
  }
  
  async componentDidMount() {

    this._isMounted = true;

    const places = await db.fetch_places();
    //const brands = await db.fetch_class_brands(["middle"]);
    this.setState({
      places: {
        pick_up: places[0].id,
        drop_off: places[0].id,
        list: places,
        fetched: true
      },
      render: true
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange(e) {
    const eventTarget = e.target;

    if (this._isMounted) {
      this.setState((currentState, props) => {
        currentState.formData[eventTarget.name] = eventTarget.value;
        return currentState;
      });
    }
  }

  saveOrder(e) {

    e.preventDefault();

    console.log("Sent");

    if (this.state.places.fetched) {

      (async () => {

        if (this._isMounted) {
          this.setState({
            submitState: "submiting"
          });
        }

        await db.save_order(this.state.formData);

        if (this._isMounted) {
          this.setState({
            submitState: "success"
          });
        }

      })().catch(err => {

        if (this._isMounted) {
          this.setState({
            submitState: "fail"
          });
        }
        console.log(err);
      });

    }
  }

  render() {
    return (
      <div className="order-form">
        {this.state.submitState === "success" &&
          <AlertBox />
        }
        <h3>Order this car</h3>
        <form onSubmit={e => this.saveOrder(e)}>
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
              disabled={this.state.places.fetched ? false : true}
              id="pick-up-location"
              onChange={this.handlePickUpPlace}
              value={this.state.places.pick_up}>
              {this.state.places.fetched ? (
                this.state.places.list.map(place =>
                  <option value={place.id} key={place.id}>{place.name}</option>
                )
              ) : (
                  <option value="null">Loading ...</option>
                )}
              {}
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
              disabled={this.state.places.fetched ? false : true}
              id="drop-off-location"
              onChange={this.handleDropOffPlace}
              value={this.state.places.drop_off}>
              {this.state.places.fetched ? (
                this.state.places.list.map(place =>
                  <option value={place.id} key={place.id}>{place.name}</option>
                )
              ) : (
                  <option value="null">Loading ...</option>
                )}
              {}
            </select>
          </fieldset>
          <fieldset className="contact-information">
            <legend>Contact information</legend>
            <label htmlFor="first-name">First name *</label>
            <input type="text" className="form-control" id="first-name" />
            <label htmlFor="last-name">Last name *</label>
            <input type="text" className="form-control" id="last-name" />
            <label htmlFor="email">Email *</label>
            <input type="text" className="form-control" id="email" />
            <label htmlFor="phone-number">Phone number *</label>
            <input type="text" className="form-control" id="phone-number" />
          </fieldset>
          <div className="row">
            <div className="col-md-6">
              <span>Total price: 10€</span>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary">Order</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}