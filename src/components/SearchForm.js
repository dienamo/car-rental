import React from 'react';
import { Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      carClasses: {economic: false, middle: false, luxury: false, suv: false}
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    this.setState({ redirect: true });
  }
  handleClassChange(e) {
    const target = e.target;
    const checked = target.checked;
    let prev = {...this.state.carClasses};
    prev[target.name] = checked;
    this.setState({carClasses: prev});
  }
  render() {
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
              <label className={this.state.carClasses['suv'] ? 'class-check class-checked' : 'class-check'} 
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
              </label>
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