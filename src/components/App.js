import React from 'react';
import { HashRouter, Switch, Route, Link, NavLink as RouterNavlink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import firebase from 'firebase';

import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { attachFirebaseToComponent } from '../helpers/helperFunctions.js';

import Administration from './Administration';
import Homepage from './Homepage';
import About from './About';
import Contact from './Contact';
import Results from './Results';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openNav: false };
    // Initialize Firebase
    const firebase_config = require('../firebase_config');
    firebase.initializeApp(firebase_config);

    faLibrary.add(faPlusCircle);
  }

  toggleNav() {
    this.setState({ openNav: !this.state.openNav });
  }

  render() {

    const AdministrationPage = attachFirebaseToComponent(Administration, firebase);

    return (
      <HashRouter>
        <div>
          <Navbar expand="xs">
            <NavbarBrand tag={RouterNavlink} to="/">Car Rental</NavbarBrand>
            <NavbarToggler onClick={() => this.toggleNav()} />
            <Collapse isOpen={this.state.openNav} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={RouterNavlink} to="/about">About us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RouterNavlink} to="/contact">Contact</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          
          <div className="custom-container">
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route path='/administration' render={AdministrationPage} />
              <Route exact path="/results" component={Results} />
            </Switch>
          </div>

          <footer>
            © 2018 Copyright: Car Rental Group &bull; <Link to="/administration">Admin panel</Link>
          </footer>

        </div>
      </HashRouter>
    );
  }
}

export default App;
