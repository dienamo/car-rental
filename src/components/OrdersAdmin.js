import React from 'react';
import {
    Row, Col,
    Button, Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as db from '../database/functions';
import CarDetailsFormAdmin from './CarDetailsFormAdmin';
import OrderDetailsAdmin from './OrderDetailsAdmin';

export default class OrdersAdmin extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            listingData: null,
            showEditCarForm: false,
            editedCarId: null,
            showOrderDetails: false,
            showedOrderId: null
        };
    }

    componentDidMount() {

        this._isMounted = true;

        if (!this.state.listingData) {
            (async () => {

                if (this._isMounted) {
                    this.setState({
                        listingData: await db.get_all_orders_admin()
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

    handleEditCarButtonClick(e, carId) {
        if (this._isMounted) {
            this.setState({ showEditCarForm: true, editedCarId: carId });
        }
    }

    handleShowOrderDetailsButtonClick(e, orderId) {
        if (this._isMounted) {
            this.setState({ showOrderDetails: true, showedOrderId: orderId });
        }
    }

    handleCloseCarForm(needUpdate) {
        if (this._isMounted) {
            this.setState({
                showEditCarForm: false,
                editedCarId: null
            });
        }
    }

    handleCloseOrderDetails(needUpdate) {
        if (this._isMounted) {
            this.setState({
                showOrderDetails: false,
                showedOrderId: null
            });
        }
    }

    render() {
        let listingTableRows = null;

        if (this.state.listingData !== null) {
            listingTableRows = this.state.listingData.map(orderData => {
                return (
                    <tr key={orderData.id}>
                        <td>{orderData.car.license_plate}</td>
                        <td>{`${orderData.car.brand} ${orderData.car.model}`}</td>
                        <td className="hide-listing-column">{orderData.car.price} €</td>
                        <td className="hide-listing-column">{`${orderData.customer.first_name} ${orderData.customer.last_name}`}</td>
                        <td>{orderData.created_at}</td>
                        <td className="action-buttons-column text-nowrap">
                            <div className="big-screen-action-buttons">
                                <Button onClick={e => this.handleShowOrderDetailsButtonClick(e, orderData.id)} className="listing-action-button-big-screen" color="info" size="sm"><FontAwesomeIcon icon="list-alt" />&nbsp;Details</Button>
                                <Button onClick={e => this.handleEditCarButtonClick(e, orderData.car.id)} className="listing-action-button-big-screen" size="sm"><FontAwesomeIcon icon="car-side" />&nbsp;Car details</Button>
                            </div>
                            <div className="small-screen-action-buttons">
                                <Button onClick={e => this.handleShowOrderDetailsButtonClick(e, orderData.id)} className="listing-action-button-small-screen" color="info" size="sm"><FontAwesomeIcon icon="list-alt" /></Button>
                                <Button onClick={e => this.handleEditCarButtonClick(e, orderData.car.id)} className="listing-action-button-small-screen"  size="sm"><FontAwesomeIcon icon="car-side" /></Button>
                            </div>
                        </td>
                    </tr>
                );
            });
        }

        return (
            <div className="ordersAdmin">
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
                                            <th>License Plate</th>
                                            <th>Car model</th>
                                            <th className="hide-listing-column">Price</th>
                                            <th className="hide-listing-column">Customer name</th>
                                            <th>Order date</th>
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
                {this.state.showEditCarForm === true && 
                    <CarDetailsFormAdmin formType="edit" carId={this.state.editedCarId} closeHandler={this.handleCloseCarForm.bind(this)} />
                }
                {this.state.showOrderDetails === true && 
                    <OrderDetailsAdmin formType="edit" orderId={this.state.showedOrderId} closeHandler={this.handleCloseOrderDetails.bind(this)} />
                }
            </div>
        )
    }
}