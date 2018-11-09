import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Container} from 'reactstrap';
import firebase from 'firebase';

import Administration from './Administration';
import Homepage from './Homepage';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    // Initialize Firebase
    const firebase_config = require('../firebase_config');
    firebase.initializeApp(firebase_config);
  }

  render() {
    return (
      <Router>
        <Container>
          <h1>Car Rental</h1>
          <ul>
            <li><Link to={'/'}>Homepage</Link></li>
            <li><Link to={'/administration'}>Administration</Link></li>
          </ul>
          <hr />
          <Switch>
            <Route exact path='/' component={ Homepage } />
            <Route exact path='/administration' render={() => <Administration firebase={firebase}/> } />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
