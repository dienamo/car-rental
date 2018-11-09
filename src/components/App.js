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
    var config = {
      apiKey: "AIzaSyCGJJe-Odmh3SfBgM8kh5I1kJbLMw-4UYg",
      authDomain: "car-rental-f91c1.firebaseapp.com",
      databaseURL: "https://car-rental-f91c1.firebaseio.com",
      projectId: "car-rental-f91c1",
      storageBucket: "car-rental-f91c1.appspot.com",
      messagingSenderId: "1006931104792"
    };
    firebase.initializeApp(config);
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
