import React from 'react';
import {
    Row, Col,
    Form, Label, Input, Button, Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as db from '../database/functions';
import AddNewCarAdmin from './AddNewCarAdmin';

export default class CarListingAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {listingData: null, showAddNewCarForm: false};
        this.throttleInputTimeout = null;
    }

    componentDidMount() {
        if (!this.state.listingData) {
            (async () => {

                this.setState({
                    listingData: await db.get_all_cars_admin()
                });

            })().catch(err => {
                console.log(err);
            })
        }
    }

    handleTypingInSearchField(e) {

        let inputValue = e.target.value;

        if (inputValue !== "") {
            (async () => {

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

            })().catch(err => {
                console.log(err);
            });
        } else {
            (async () => {

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

            })().catch(err => {
                console.log(err);
            });
        }
    }

    handleNewCarButtonClick(e) {
        this.setState({ showAddNewCarForm: true });
    }

    handleCloseAddNewCarForm(e) {
        this.setState({ showAddNewCarForm: false });
    }

    render() {
        let listingTableRows = null;

        if (this.state.listingData !== null) {
            listingTableRows = this.state.listingData.map(carData => {
                return (
                    <tr key={carData[0]}>
                        <td>{carData[1]}</td>
                        <td>{carData[2]}</td>
                        <td>{carData[3]}</td>
                        <td className="engine-data-column">{carData[4]}</td>
                        <td>{carData[5]}</td>
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
                            <div>Loading data...</div>
                        ) : (
                            <div>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Car model</th>
                                            <th>License Plate</th>
                                            <th>Status</th>
                                            <th className="engine-data-column">Engine</th>
                                            <th>Price</th>
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
                <AddNewCarAdmin isShowed={this.state.showAddNewCarForm} closeHandler={this.handleCloseAddNewCarForm.bind(this)} />
            </div>
        )
    }
}