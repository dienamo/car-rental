import React from 'react';
import {
    Row, Col, Card, CardBody, CardTitle, CardText, CardHeader, ListGroup, ListGroupItem, CardFooter, 
    Form, Label, Input, Button, Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as db from '../database/functions';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

export default class AddNewCarAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carClasses: null,
            formData: {},
            submitSuccess: null
        };

        //this.saveNewCar = this.saveNewCar.bind(this);
    }

    componentDidMount() {
        (async () => {

            const classes = await db.fetch_classes();
            this.setState({ carClasses: classes });

        })().catch(err => {
            console.log(err);
        });
    }

    handleChange(e) {

        const eventTarget = e.target;

        this.setState((currentState, props) => {
            currentState.formData[eventTarget.name] = eventTarget.value;
            return currentState;
        });

    }

    saveNewCar(e) {
        e.preventDefault();

        (async () => {

            await db.save_new_car(this.state.formData);
            this.setState({ submitSuccess: true });

        })().catch(err => {
            console.log(err);
        })
        
    }

    render() {

        return (
            <div className="addNewCarAdmin">
                <div onClick={(e) => this.props.closeHandler(e)} className="dark-div">
                </div>
                <form onSubmit={(e) => this.saveNewCar(e)} onChange={(e) => this.handleChange(e)}>
                    <Card className="add-new-car-form rounded">
                        <CardHeader tag="h3" className="sticky-top">Add new car to database</CardHeader>
                        <ListGroup className="list-group-flush">             
                            <ListGroupItem>
                                <fieldset>
                                    <Row>
                                        <legend className="col-12 pb-3">Descriptive details</legend>
                                    </Row>
                                    <Row>
                                        <Col xs={{size: 12}} md={{size: 6}}>    
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carBrandInput">Brand (e.g.: Audi): </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carBrandInput">Brand (e.g.: Audi): </label>
                                                    <input type="text" className="form-control" id="carBrandInput" name="brand" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carModelInput">Model (e.g.: X5): </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carModelInput">Model (e.g.: X5): </label>
                                                    <input type="text" className="form-control" id="carModelInput" name="model" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carFuelInput">Fuel: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carFuelInput">Fuel: </label>
                                                    <select className="form-control" id="carFuelInput" name="fuel">
                                                        <option value="Diesel">Diesel</option>
                                                        <option value="Petrol">Petrol</option>
                                                        <option value="Compressed natural gas">Compressed natural gas</option>
                                                        <option value="Electric">Electric</option>
                                                        <option value="Hybrid">Hybrid (Electric + Non electric)</option>
                                                    </select>
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carSeatsInput">Seats: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carSeatsInput">Seats: </label>
                                                    <input type="text" className="form-control" id="carSeatsInput" name="seats" />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{size: 12}} md={{size: 6}}>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carClassInput">Class: </label>
                                                <Col xs={{size: 12}} md={{size: 8}}>
                                                    <label className="small-screen-label" htmlFor="carClassInput">Class: </label>
                                                    <select className="form-control" id="carClassInput" disabled={this.state.carClasses === null && 'disabled'} name="class">
                                                        {this.state.carClasses === null ? (
                                                            <option value="loading...">Loading data...</option>
                                                        ) : (
                                                            <React.Fragment>
                                                                {this.state.carClasses.map(carClass => {
                                                                    return <option value={carClass.id}>{carClass.name}</option>
                                                                })}
                                                            </React.Fragment>
                                                        )}
                                                    </select>
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carEngineInput">Engine: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carEngineInput">Engine: </label>
                                                    <input type="text" className="form-control" id="carEngineInput" name="engine" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carTransmissionInput">Transmission: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carTransmissionInput">Transmission: </label>
                                                    <select className="form-control" id="carTransmissionInput" name="transmission">
                                                        <option value="Manual">Manual</option>
                                                        <option value="Automatic">Automatic</option>
                                                    </select>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </fieldset>
                            </ListGroupItem>
                            <ListGroupItem>
                                <fieldset>
                                    <Row>
                                        <legend className="col-12 pb-2">Administrative details</legend>
                                    </Row>
                                    <Row>
                                        <Col xs={{size: 12}} md={{size: 6}}>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carLicensePlateInput">License plate: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carLicensePlateInput">License plate: </label>
                                                    <input type="text" className="form-control" id="carLicensePlateInput" name="license_plate" />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{size: 12}} md={{size: 6}}>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carPriceInput">Price: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carPriceInput">Price: </label>
                                                    <div>
                                                        <input style={{display: "inline", width: "70%"}} type="text" className="form-control pr-1" id="carPriceInput"  name="price" />&nbsp;&nbsp;<span className="text-nowrap">€ / day</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </fieldset>
                            </ListGroupItem>
                            <ListGroupItem>
                                <fieldset>
                                    <Row>
                                        <legend className="col-12 pb-2">Stock informations</legend>
                                    </Row>
                                    <Row>
                                        <Col xs={{size: 12}} md={{size: 6}}>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carAvailabilityInput">Availability: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carAvailabilityInput">Availability: </label>
                                                    <select className="form-control" id="carAvailabilityInput" name="availability">
                                                        <option value="true">Available</option>
                                                        <option value="false">Not available</option>
                                                    </select>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </fieldset>
                            </ListGroupItem>
                        </ListGroup>
                        <CardFooter tag="footer">
                            <Button className="float-right" color="info">Save car to database</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
}