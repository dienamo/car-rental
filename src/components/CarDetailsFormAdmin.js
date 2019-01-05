import React from 'react';
import {
    Row, Col, Card, CardHeader, ListGroup, ListGroupItem, CardFooter, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as db from '../database/functions';

export default class CarDetailsFormAdmin extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        
        this.state = {
            formLoading: true,
            carClasses: null,
            formData: {},
            submitState: null
        };
    }

    componentDidMount() {

        this._isMounted = true;

        (async () => {

            const classes = await db.fetch_classes();
            let carData = null;

            if (this.props.formType === "edit") {
                carData = await db.get_car_data_admin(this.props.carId);
            }

            if (this._isMounted) {
                this.setState((currentState, props) => {

                    currentState.formLoading = false;

                    currentState.carClasses = classes;

                    if (this.props.formType === "edit") {
                        currentState.formData = carData;
                    } else {
                        currentState.formData['class'] = classes[0].id;
                        currentState.formData['fuel'] = 'Diesel';
                        currentState.formData['transmission'] = 'Manual';
                        currentState.formData['availability'] = 'true';
                    }

                    return currentState;
                });
            }

        })().catch(err => {
            console.log(err);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange(e) {

        const eventTarget = e.target;

        if (this._isMounted) {
            this.setState((currentState, props) => {
                currentState.formData[eventTarget.name] = eventTarget.value;
                return currentState;
            });
        }
    }

    handleClose() {
        if (this.state.submitState !== "submiting") {
            if (this.state.submitState === "success") {
                this.props.closeHandler(true);
            } else {
                this.props.closeHandler(false);
            }
        }
    }

    saveCarData(e) {
        e.preventDefault();

        if (this.state.carClasses !== null && !this.state.formLoading && this.state.submitState !== "submiting") {
            (async () => {

                if (this._isMounted) {
                    this.setState({ submitState: "submiting" });
                }

                if (this.props.formType === "edit") {
                    await db.save_car_data_admin(this.state.formData, this.props.carId);
                } else {
                    await db.save_car_data_admin(this.state.formData);
                }
                
                if (this._isMounted) {
                    this.setState({ submitState: "success" });
                }

            })().catch(err => {
                if (this._isMounted) {
                    this.setState({ submitState: "fail" });
                }
                console.log(err);
            });
        }
    }

    render() {

        return (
            <div className="carDetailsFormAdmin">
                <div onClick={() => this.handleClose()} className="dark-div"></div>
                <form onSubmit={(e) => this.saveCarData(e)}>
					<Card className="add-new-car-form rounded">
                        <CardHeader tag="header">
                            <h3 className="float-left">{this.props.formType === "edit" ? ('Edit car') : ('Add new car to database')}</h3>
                            <div onClick={() => this.handleClose()} className="float-right close-icon"><FontAwesomeIcon icon="times" /></div>
                        </CardHeader>
                        <ListGroup className="list-group-flush">             
                            <ListGroupItem>
                                <fieldset disabled={(this.state.submitState === "submiting" || this.state.formLoading === true) && true}>
                                    <Row>
                                        <legend className="col-12 pb-2 pb-sm-3">Descriptive details</legend>
                                    </Row>
                                    <Row>
                                        <Col xs={{size: 12}} md={{size: 6}}>    
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carBrandInput">Brand (e.g.: Audi): </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carBrandInput">Brand (e.g.: Audi): </label>
                                                    <input onChange={(e) => this.handleChange(e)} type="text" value={typeof this.state.formData.brand !== 'undefined' ? (this.state.formData.brand) : ('')} className="form-control" id="carBrandInput" name="brand" required pattern=".{0,50}" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carModelInput">Model (e.g.: X5): </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carModelInput">Model (e.g.: X5): </label>
                                                    <input onChange={(e) => this.handleChange(e)} type="text" value={typeof this.state.formData.model !== 'undefined' ? (this.state.formData.model) : ('')} className="form-control" id="carModelInput" name="model" required pattern=".{0,50}" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carFuelInput">Fuel: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carFuelInput">Fuel: </label>
                                                    <select value={typeof this.state.formData.fuel !== 'undefined' ? (this.state.formData.fuel) : ('')} onChange={(e) => this.handleChange(e)} className="form-control" id="carFuelInput" name="fuel" required pattern="Diesel|Petrol|Compressed natural gas">
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
                                                    <input onChange={(e) => this.handleChange(e)} value={typeof this.state.formData.seats !== 'undefined' ? (this.state.formData.seats) : ('')} type="number" className="form-control" id="carSeatsInput" name="seats" min="0" max="99" required />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{size: 12}} md={{size: 6}}>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carClassInput">Class: </label>
                                                <Col xs={{size: 12}} md={{size: 8}}>
                                                    <label className="small-screen-label" htmlFor="carClassInput">Class: </label>
                                                    <select value={(typeof this.state.formData.class !== 'undefined' && this.state.carClasses !== null) ? (this.state.formData.class) : ('')} onChange={(e) => this.handleChange(e)} className="form-control" id="carClassInput" name="class" required pattern=".{0,50}">
                                                        {this.state.carClasses === null ? (
                                                            <option value="loading...">Loading data...</option>
                                                        ) : (
                                                            <React.Fragment>
                                                                {this.state.carClasses.map(carClass => {
                                                                    return <option key={carClass.id} value={carClass.id}>{carClass.name}</option>
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
                                                    <input onChange={(e) => this.handleChange(e)} value={typeof this.state.formData.engine !== 'undefined' ? (this.state.formData.engine) : ('')} type="text" className="form-control" id="carEngineInput" name="engine" required pattern=".{0,50}" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carTransmissionInput">Transmission: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carTransmissionInput">Transmission: </label>
                                                    <select value={typeof this.state.formData.transmission !== 'undefined' ? (this.state.formData.transmission) : ('')} onChange={(e) => this.handleChange(e)} className="form-control" id="carTransmissionInput" name="transmission" required pattern="Manual|Automatic">
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
                                <fieldset disabled={(this.state.submitState === "submiting" || this.state.formLoading === true) && true}>
                                    <Row>
                                        <legend className="col-12 pb-2 pb-sm-3">Administrative details</legend>
                                    </Row>
                                    <Row>
                                        <Col xs={{size: 12}} md={{size: 6}}>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carLicensePlateInput">License plate: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carLicensePlateInput">License plate: </label>
                                                    <input onChange={(e) => this.handleChange(e)} value={typeof this.state.formData.license_plate !== 'undefined' ? (this.state.formData.license_plate) : ('')} type="text" className="form-control" id="carLicensePlateInput" name="license_plate" required pattern=".{0,50}" />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{size: 12}} md={{size: 6}}>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carPriceInput">Price: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carPriceInput">Price: </label>
                                                    <div>
                                                        <input onChange={(e) => this.handleChange(e)} value={typeof this.state.formData.price !== 'undefined' ? (this.state.formData.price) : ('')} style={{display: "inline", width: "70%"}} type="number" className="form-control pr-1" id="carPriceInput" name="price" step="0.01" min="0" max="99999" required />&nbsp;&nbsp;<span className="text-nowrap">€ / day</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </fieldset>
                            </ListGroupItem>
                            <ListGroupItem>
                                <fieldset disabled={(this.state.submitState === "submiting" || this.state.formLoading === true) && true}>
                                    <Row>
                                        <legend className="col-12 pb-2 pb-sm-3">Stock informations</legend>
                                    </Row>
                                    <Row>
                                        <Col xs={{size: 12}} md={{size: 6}}>
                                            <Row className="form-group">
                                                <label className="col-4 big-screen-label col-form-label text-nowrap" htmlFor="carAvailabilityInput">Availability: </label>
                                                <Col xs={{size: 12}} md={{size: 8}} className="text-left">
                                                    <label className="small-screen-label" htmlFor="carAvailabilityInput">Availability: </label>
                                                    <select value={typeof this.state.formData.availability !== 'undefined' ? (this.state.formData.availability) : ('')} onChange={(e) => this.handleChange(e)} className="form-control" id="carAvailabilityInput" name="availability" required pattern="true|false">
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
                            <Button className="float-right" color="info" disabled={(this.state.formDataLoading === null || this.state.submitState === "submiting") && true}><FontAwesomeIcon icon="save" />{this.props.formType === "edit" ? (' Update car data') : (' Save car data')}</Button>
                            <Button disabled={(this.state.submitState === "submiting") && true} onClick={() => this.handleClose()} className="float-right close-button" type="button" color="secondary"><FontAwesomeIcon icon="times" /> Close</Button>
                            {this.state.formLoading === true && 
                                <div className="saveform-spinner float-right mt-2" style={{marginRight: '1.25rem'}}>
                                    <FontAwesomeIcon style={{'verticalAlign': 'bottom'}} className="spinner-icon mr-2" icon="spinner" size="lg" pulse />
                                    <span className="loadingtext-bigscreen" style={{'verticalAlign': 'top'}}><strong>Loading data...</strong></span>
                                    <span className="loadingtext-smallscreen" style={{'verticalAlign': 'top'}}><strong>Loading...</strong></span>
                                </div>
                            }
                            {this.state.submitState === "submiting" && 
                                <div className="saveform-spinner float-right mt-2" style={{marginRight: '1.25rem'}}>
                                    <FontAwesomeIcon style={{'verticalAlign': 'bottom'}} className="spinner-icon mr-2" icon="spinner" size="lg" pulse />
                                    <span className="savingtext-bigscreen" style={{'verticalAlign': 'top'}}><strong>Saving into database...</strong></span>
                                    <span className="savingtext-smallscreen" style={{'verticalAlign': 'top'}}><strong>Saving...</strong></span>
                                </div>
                            }
                            {this.state.submitState === "success" && 
                                <div className="saveform-success float-right mt-2" style={{marginRight: '1.25rem'}}>
                                    <FontAwesomeIcon style={{'verticalAlign': 'bottom'}} className="mr-2" icon="check" size="lg" />
                                    <span className="successtext-bigscreen" style={{'verticalAlign': 'top'}}><strong>Car data successfully saved!</strong></span>
                                    <span className="successtext-smallscreen" style={{'verticalAlign': 'top'}}><strong>Success!</strong></span>
                                </div>
                            }
                            {this.state.submitState === "fail" && 
                                <div className="saveform-fail float-right mt-2" style={{marginRight: '1.25rem'}}>
                                    <FontAwesomeIcon style={{'verticalAlign': 'bottom'}} className="mr-2" icon="times-circle" size="lg" />
                                    <span className="failtext-bigscreen" style={{'verticalAlign': 'top'}}><strong>An error occured! Try again later.</strong></span>
                                    <span className="failtext-smallscreen" style={{'verticalAlign': 'top'}}><strong>Error!</strong></span>
                                </div>
                            }
                        </CardFooter>
                    </Card>
				</form>
            </div>
        )
    }
}