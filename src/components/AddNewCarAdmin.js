import React from 'react';
import {
    Row, Col,
    Form, Label, Input, Button, Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as db from '../database/functions';

export default class AddNewCarAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {listingData: null};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={`addNewCarAdmin ${this.props.isShowed ? 'addNewCarAdmin-show' : ''}`}>
                <div onClick={(e) => this.props.closeHandler(e)} className="dark-div">
                </div>
                <div className="add-new-car-form rounded">
                    <Row>
                        <Col xs={{size: 12}}><h3>Add new car to database</h3></Col>
                    </Row>  
                    <form>
                        <Row>
                            <Col xs={{size: 6}}>
                                <fieldset>
                                    <Row className="form-group">
                                        <Col xs={{size: 4}}>
                                            <label htmlFor="carBrandInput">Car brand: </label>
                                        </Col>
                                        <Col xs={{size: 8}} className="text-left">
                                            <input type="text" className="form-control" id="carBrandInput" />
                                        </Col>
                                    </Row>
                                </fieldset>
                            </Col>
                            <Col xs={{size: 6}}>
                                <fieldset>
                                    <Row className="form-group">
                                        <Col xs={{size: 4}}>
                                            <label htmlFor="carClassInput">Car class: </label>
                                        </Col>
                                        <Col xs={{size: 8}}>
                                            <select className="form-control" id="carClassInput">
                                                <option value="economic">Economic</option>
                                                <option value="luxury">Luxury</option>
                                                <option value="middle">Middle</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </fieldset>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        )
    }
}