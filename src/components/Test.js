import React, { Component } from 'react';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.firebase = this.props.firebase;
  }
  add(e) {
    const db = this.firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection('cars').add({
      name: "nieco3"
    })
      .then(function (docRef) {
        console.log("OK");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
  render() {
    return (
      <div>
        <p>Test</p>
        <button onClick={this.add}>Add</button>
      </div>
    )
  }
}