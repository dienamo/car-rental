import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enLocale from 'date-fns/locale/en-GB';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as db from '../database/functions';

import AlertBox from './AlertBox';

export default class Orderform extends React.Component {
  constructor(props) {
    super(props);

    this.currentDate = new Date();

    this.state = {
      places: { fetched: false },
      carPrice: null,
      submitState: null,
      formData: {},
      showAlertBox: false,
      alertBoxText: null
    };

    this._isMounted = false;

    registerLocale('en-GB', enLocale);
  }
  
  async componentDidMount() {

    this._isMounted = true;

    const places = await db.fetch_places();
    const carData = await db.get_car_data_admin(this.props.carId, []);

    this.setState((currentState, props) => {

      currentState.places = {
        list: places,
        fetched: true
      };

      currentState.carPrice = carData.price;
      currentState.formData.dropoff_place = places[0].id;
      currentState.formData.pickup_place = places[0].id;
      currentState.formData.dropoff_datetime = this.currentDate;
      currentState.formData.pickup_datetime = this.currentDate;

      return currentState;

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

  handleChangeDateFields(dateTime, whichField) {
    if (this._isMounted) {
      this.setState((currentState, props) => {
        currentState.formData[whichField] = dateTime;
        return currentState;
      });
    }
  }

  handleCloseAlertBox() {
    if (this._isMounted) {
      this.setState({
        showAlertBox: false
      });
    }
  }

  saveOrder(e) {

    e.preventDefault();

    if (this.state.places.fetched && this.state.submitState !== "submiting") {

      (async () => {

        if (this._isMounted) {
          this.setState({
            submitState: "submiting"
          });
        }

        await db.save_order(this.state.formData, this.props.carId);

        if (this._isMounted) {
          this.setState({
            submitState: "success",
            showAlertBox: true,
            alertBoxText: {
              header: 'Order successfully created!',
              body: 'We have sent detailed informations about your order to your e-mail.'
            }
          });
        }

      })().catch(err => {

        if (this._isMounted) {
          this.setState({
            submitState: "fail",
            showAlertBox: true,
            alertBoxText: {
              header: 'An error occured...',
              body: 'Your order was not created. Try again later!'
            }
          });
        }
        console.log(err);
      });

    }
  }

  render() {
    return (
      <div className="order-form">
        {this.state.showAlertBox === true &&
          <AlertBox whatHappened={this.state.submitState} alertText={this.state.alertBoxText} closeHandler={this.handleCloseAlertBox.bind(this)} />
        }
        <h3>Order this car</h3>
        <form onSubmit={e => this.saveOrder(e)}>
          <fieldset className="pick-up">
            <legend>Pick-up information</legend>
            <div className="row">
              <div className="col-12">
                <label htmlFor="pick-up-datetime">Pick-up date *</label>
                <DatePicker
                  className="form-control"
                  selected={typeof this.state.formData.pickup_datetime !== 'undefined' ? (this.state.formData.pickup_datetime) : (this.currentDate)}
                  onChange={date => this.handleChangeDateFields(date, 'pickup_datetime')}
                  showTimeSelect
                  timeIntervals={15}
                  dateFormat="dd. MM. yyyy H:mm"
                  timeFormat="H:mm"
                  locale="en-GB"
                  name="pickup_datetime"
                  id="pick-up-datetime"
                  required
                  withPortal
                />
              </div>
            </div>
            <label htmlFor="pick-up-location">Pick-up location *</label>
            <select className="form-control"
              disabled={this.state.places.fetched ? false : true}
              id="pick-up-location"
              onChange={e => this.handleChange(e)}
              value={this.state.formData.pickup_place} name="pickup_place" required>
              {this.state.places.fetched ? (
                this.state.places.list.map(place =>
                  <option value={place.id} key={place.id}>{place.name}</option>
                )
              ) : (
                  <option value="null">Loading ...</option>
                )}
            </select>
          </fieldset>
          <fieldset className="drop-off">
            <legend>Drop-off information</legend>
            <div className="row">
              <div className="col-12">
                <label htmlFor="drop-off-datetime">Drop-off date *</label>
                <DatePicker
                  className="form-control"
                  selected={typeof this.state.formData.dropoff_datetime !== 'undefined' ? (this.state.formData.dropoff_datetime) : (this.currentDate)}
                  onChange={date => this.handleChangeDateFields(date, 'dropoff_datetime')}
                  showTimeSelect
                  timeIntervals={15}
                  dateFormat="dd. MM. yyyy H:mm"
                  timeFormat="H:mm"
                  locale="en-GB"
                  name="dropoff_datetime"
                  id="drop-off-datetime"
                  required
                  withPortal
                />
              </div>
            </div>
            <label htmlFor="drop-off-location">Drop-off location *</label>
            <select className="form-control"
              disabled={this.state.places.fetched ? false : true}
              id="drop-off-location"
              onChange={e => this.handleChange(e)}
              value={this.state.formData.dropoff_place}
              name="dropoff_place" required>
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
            <input onChange={e => this.handleChange(e)} value={typeof this.state.formData.customer_first_name !== 'undefined' ? (this.state.formData.customer_first_name) : ('')} type="text" className="form-control" id="first-name" name="customer_first_name" required />

            <label htmlFor="last-name">Last name *</label>
            <input onChange={e => this.handleChange(e)} value={typeof this.state.formData.customer_last_name !== 'undefined' ? (this.state.formData.customer_last_name) : ('')} type="text" className="form-control" id="last-name" name="customer_last_name" required />

            <label htmlFor="email">Email *</label>
            <input onChange={e => this.handleChange(e)} value={typeof this.state.formData.customer_email !== 'undefined' ? (this.state.formData.customer_email) : ('')} type="text" className="form-control" id="email" name="customer_email" required />

            <label htmlFor="phone-number">Phone number *</label>
            <input onChange={e => this.handleChange(e)} value={typeof this.state.formData.customer_phone_number !== 'undefined' ? (this.state.formData.customer_phone_number) : ('')} type="text" className="form-control" id="email" name="customer_phone_number" required />
          </fieldset>
          <div className="row">
            <div className="col-12 col-md-6">
              <span style={{'verticalAlign': 'middle'}}>
                {this.state.carPrice === null ? (
                  'Loading price...'
                ) : (
                  <strong style={{color: '#dc3545'}}>Total price: {this.state.carPrice} €</strong>
                )}
              </span>
            </div>
            <div className="col-9 col-sm-10 col-md-3 col-lg-4 saving-state-text mt-1">
              {this.state.submitState === "submiting" &&
                <strong>Saving...</strong>    
              }
            </div>
            <div className="col-3 col-sm-2 col-md-3 col-lg-2">
              <button className="btn btn-primary">Order</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}