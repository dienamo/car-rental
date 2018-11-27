import React from 'react';
import {
  Row, Col,
  Nav, NavItem, NavLink,
} from 'reactstrap';
import { Switch, Route } from 'react-router-dom';

import { attachFirebaseToComponent } from '../helpers/helperFunctions.js';

import CarListing from './CarListingAdmin';

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const props = this.props;
    const CarListingPage = attachFirebaseToComponent(CarListing, this.props.firebase);

    return (
      <div className="administration">
        <Row className="mt-4">
          <Col xs="12">
            <h2>Administration</h2>
            <Nav tabs className="mt-4">
              <NavItem>
                <NavLink href={props.match.path + "/car-listing"} active={props.location.pathname === "/administration/car-listing"}>Car Listing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={props.match.path + "/orders"} active={props.location.pathname === "/administration/orders"}>Orders</NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <Switch>
          <Route exact path={props.match.path} render={CarListingPage} />
          <Route exact path={`${props.match.path}/car-listing`} render={CarListingPage} />
        </Switch>
      </div>
    )
  }
}

export default Administration;