import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {persons: []};
    }
    componentDidMount() {
        axios.get('http://localhost:4000/test')
            .then(response => {
                this.setState({ persons: response.data });
            })
        .catch(function (error) {
            console.error(error);
        })
    }
    tabRow(){
        return this.state.persons.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
      return (
        <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
        </div>
      );
    }
}