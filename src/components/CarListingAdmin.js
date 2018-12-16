import React from 'react';
import {
    Row, Col,
    Form, Label, Input, Button, Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as db from '../database/functions';
import CarDetailsFormAdmin from './CarDetailsFormAdmin';

export default class CarListingAdmin extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.throttleInputTimeout = null;

        this.state = {
            listingData: null, 
            showAddNewCarForm: false, 
            showEditCarForm: false,
            editedCarId: null
        };
    }

    componentDidMount() {

        this._isMounted = true;

        if (!this.state.listingData) {
            (async () => {

                if (this._isMounted) {
                    this.setState({
                        listingData: await db.get_all_cars_admin()
                    });
                }

            })().catch(err => {
                console.log(err);
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleTypingInSearchField(e) {

        let inputValue = e.target.value;

        if (inputValue !== "") {
            (async () => {

                if (this._isMounted) {
                    this.setState({
                        listingData: null
                    }, async () => {
                        if (this.throttleInputTimeout !== null) {
                            clearTimeout(this.throttleInputTimeout);
                        }
                        this.throttleInputTimeout = setTimeout(async () => {
                            this.setState({
                                listingData: await db.quick_search_cars_admin(inputValue)
                            });
                        }, 400);
                    });
                }

            })().catch(err => {
                console.log(err);
            });
        } else {
            (async () => {

                if (this._isMounted) {
                    this.setState({
                        listingData: null
                    }, async () => {
                        if (this.throttleInputTimeout !== null) {
                            clearTimeout(this.throttleInputTimeout);
                        }
                        this.throttleInputTimeout = setTimeout(async () => {
                            this.setState({
                                listingData: await db.get_all_cars_admin()
                            });
                        }, 400);
                    });
                }

            })().catch(err => {
                console.log(err);
            });
        }
    }

    handleNewCarButtonClick(e) {
        if (this._isMounted) {
            this.setState({ showAddNewCarForm: true });
        }
    }

    handleEditCarButtonClick(e, carId) {
        if (this._isMounted) {
            this.setState({ showEditCarForm: true, editedCarId: carId });
        }
    }

    handleCloseCarForm(needUpdate) {
        (async () => {
            if (needUpdate) {
                if (this._isMounted) {
                    this.setState({
                        listingData: null,
                        showAddNewCarForm: false,
                        showEditCarForm: false,
                        editedCarId: null
                    }, async () => {
                        this.setState({
                            listingData: await db.get_all_cars_admin()
                        });
                    });
                }
            } else {
                if (this._isMounted) {
                    this.setState({
                        showAddNewCarForm: false,
                        showEditCarForm: false,
                        editedCarId: null
                    });
                }
            }
        })().catch(err => {
            console.log(err);
        });
    }

    render() {
        let listingTableRows = null;

        if (this.state.listingData !== null) {
            listingTableRows = this.state.listingData.map(carData => {
                return (
                    <tr key={carData[0]}>
                        <td>{carData[1]}</td>
                        <td className="hide-listing-column">{carData[2]}</td>
                        <td>{carData[3]}</td>
                        <td className="hide-listing-column">{carData[4]}</td>
                        <td>{carData[5]} €</td>
                        <td className="action-buttons-column text-nowrap">
                            <div className="big-screen-action-buttons">
                                <Button onClick={(e) => this.handleEditCarButtonClick(e, carData[0])} className="listing-action-button-big-screen" color="info" size="sm"><FontAwesomeIcon icon="edit" /> Edit</Button>
                                <Button className="listing-action-button-big-screen" color="danger" size="sm"><FontAwesomeIcon icon="trash-alt" /> Delete</Button>
                            </div>
                            <div className="small-screen-action-buttons">
                                <Button onClick={(e) => this.handleEditCarButtonClick(e, carData[0])} className="listing-action-button-small-screen" color="info" size="sm"><FontAwesomeIcon icon="edit" /></Button>
                                <Button className="listing-action-button-small-screen" color="danger" size="sm"><FontAwesomeIcon icon="trash-alt" /></Button>
                            </div>
                        </td>
                    </tr>
                );
            });
        }

        return (
            <div className="carListingAdmin">
                <Row className="mt-4">
                    <Col xs="12" sm="4" md="5" xl="7">
                        <Button className="add-new-car-button" onClick={(e) => this.handleNewCarButtonClick(e)} color="secondary"><FontAwesomeIcon className="mr-2" icon="plus-circle" />Add new car to database</Button>
                    </Col>
                    <Col xs="12" sm="8" md="7" xl="5">
                        <Form inline className="searchForm float-sm-right">
                            <span className="search-input-label"><Label for="searchInput">Search:</Label></span>
                            <Input onInput={(e) => this.handleTypingInSearchField(e)} className="search-input-field ml-0 ml-sm-2 mt-3 mt-sm-0" type="text" name="searchText" id="searchInput" placeholder="Type in car name, details..." />
                            <Button className="search-form-submit ml-0 ml-sm-1 mt-1 mt-sm-0" color="success">Search!</Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs="12">
                        {this.state.listingData === null ? (
                            <div className="mt-2 mr-3">
                                <FontAwesomeIcon style={{'verticalAlign': 'bottom'}} className="spinner-icon mr-2" icon="spinner" size="lg" pulse /><span style={{'verticalAlign': 'top'}}>Loading data...</span>
                            </div>
                        ) : (
                            <div>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Car model</th>
                                            <th className="hide-listing-column">License Plate</th>
                                            <th>Status</th>
                                            <th className="hide-listing-column">Engine</th>
                                            <th>Price</th>
                                            <th className="action-buttons-column">Actions</th>
                                        </tr>
                                    </thead>
                                    {this.state.listingData.length > 0 && 
                                        <tbody>
                                            {listingTableRows}
                                        </tbody>
                                    }
                                </Table>
                                {this.state.listingData.length === 0 && 
                                    <p className="text-center">No results</p>
                                }
                            </div>
                        )}
                    </Col>
                </Row>
                {this.state.showAddNewCarForm === true &&
                    <CarDetailsFormAdmin formType="create" closeHandler={this.handleCloseCarForm.bind(this)} />
                }
                {this.state.showEditCarForm === true && 
                    <CarDetailsFormAdmin formType="edit" carId={this.state.editedCarId} closeHandler={this.handleCloseCarForm.bind(this)} />
                }
            </div>
        )
    }
}