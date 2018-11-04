import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {cars: []};
    }
    componentDidMount() {
        axios.get('http://localhost:4000/cars-api/list')
            .then(response => {
                this.setState({ cars: response.data });
            })
        .catch(function (error) {
            console.error(error);
        })
    }
    tabRow(){
        return this.state.cars.map(function(object, i){
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
                  <td>Engine</td>
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