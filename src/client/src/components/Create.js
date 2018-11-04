import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeEngine = this.onChangeEngine.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            engine: ''
        }
    }
    onChangeEngine(e) {
        this.setState({
            engine: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const car_details = {
            engine: this.state.engine
        }
        
        axios.post('http://localhost:4000/cars-api/add', car_details)
            .then(res => console.log(res.data));

        this.setState({
            engine: ''
        })

    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Engine:  </label>
                        <input type="text" value={this.state.engine} onChange={this.onChangeEngine}/>
                    </div>
                    <div>
                        <input type="submit" value="Add Car"/>
                    </div>
                </form>
            </div>
        )
    }
}