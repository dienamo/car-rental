import React from 'react';
import {
  Row, Col,
  Nav, NavItem, NavLink,
} from 'reactstrap';
import { Switch, Route, NavLink as RouterNavlink } from 'react-router-dom';

import CarListing from './CarListingAdmin';
import Orders from './OrdersAdmin';

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const props = this.props;

    return (
      <div className="administration">
        <Row className="mt-4">
          <Col xs="12">
            <h2>Administration</h2>
            <Nav tabs className="mt-4">
              <NavItem>
                <NavLink tag={RouterNavlink} to={props.match.path + "/orders"} active={props.location.pathname === "/administration/orders" || props.location.pathname === "/administration" || props.location.pathname === "/administration/"}>Orders</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavlink} to={props.match.path + "/car-listing"} active={props.location.pathname === "/administration/car-listing"}>Car Listing</NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>

        <div>
          <Switch>
            <Route exact path={`${props.match.path}`} component={Orders} />
            <Route exact path={`${props.match.path}/orders`} component={Orders} />
            <Route exact path={`${props.match.path}/car-listing`} component={CarListing} />
          </Switch>
        </div>

      </div>
    )
  }
}

export default Administration;