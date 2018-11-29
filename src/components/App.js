import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import firebase from 'firebase';

import Administration from './Administration';
import Homepage from './Homepage';
import About from './About';
import Contact from './Contact';
import Results from './Results';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openNav: false };
  }

  toggleNav() {
    this.setState({ openNav: !this.state.openNav });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar expand="xs">
            <NavbarBrand href="/">Car Rental</NavbarBrand>
            <NavbarToggler onClick={() => this.toggleNav()} />
            <Collapse isOpen={this.state.openNav} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/about">About us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/contact">Contact</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Container>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path='/administration' render={() => <Administration firebase={firebase} />} />
              <Route exact path="/results" component={Results} />
            </Switch>
          </Container>

          <footer>
            © 2018 Copyright: Car Rental Group
          </footer>

        </div>
      </Router>
    );
  }
}

export default App;
