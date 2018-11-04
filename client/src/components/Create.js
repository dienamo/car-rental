import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: ''
        }
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const person_details = {
            name: this.state.name
        }
        
        axios.post('http://localhost:4000/test/add', person_details)
            .then(res => console.log(res.data));

        this.setState({
            name: ''
        })

    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name:  </label>
                        <input type="text" value={this.state.name} onChange={this.onChangeName}/>
                    </div>
                    <div>
                        <input type="submit" value="Add Person"/>
                    </div>
                </form>
            </div>
        )
    }
}