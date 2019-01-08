import React from 'react';
import {
    Row, Col, Card, CardHeader, ListGroup, ListGroupItem, CardFooter, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as db from '../database/functions';

export default class OrderDetailsAdmin extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        
        this.state = {
            pageLoading: true,
            orderData: {}
        };
    }

    componentDidMount() {

        this._isMounted = true;

        (async () => {

            const orderData = await db.get_order_data_admin(this.props.orderId);
            
            if (this._isMounted) {
                this.setState({ orderData: orderData, pageLoading: false });
            }

        })().catch(err => {
            console.log(err);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleClose() {
        //if (this.state.submitState !== "submiting") {
            //if (this.state.submitState === "success") {
                //this.props.closeHandler(true);
            //} else {
                this.props.closeHandler(false);
            //}
        //}
    }

    render() {

        return (
            <div className="orderDetailsAdmin">
                <div onClick={() => this.handleClose()} className="dark-div"></div>
                <Card className="order-details rounded">
                    <CardHeader tag="header" className="sticky-top">
                        <h3 className="float-left">Order details</h3>
                        <div onClick={() => this.handleClose()} className="float-right close-icon"><FontAwesomeIcon icon="times" /></div>
                    </CardHeader>
                    {this.state.pageLoading === true ? (
                        <div className="pt-2">
                            <Row>
                                <Col xs={{size: 12}} className="ml-3 mt-2">
                                    <FontAwesomeIcon style={{'verticalAlign': 'bottom'}} className="spinner-icon mr-2" icon="spinner" size="lg" pulse /><span style={{'verticalAlign': 'top'}}>Loading data...</span>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <ListGroup className="list-group-flush">             
                            <ListGroupItem>
                                <Row className="pt-2 pb-2">
                                    <Col xs={{size: 12}} md={{size: 6}} className="border-right">    
                                        <Row className="pb-2 pb-sm-3">
                                            <Col xs={{size: 12}}>
                                                <h4>Customer details</h4>
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Name:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {`${this.state.orderData.customer.first_name} ${this.state.orderData.customer.last_name}`}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>E-mail:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {this.state.orderData.customer.email}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Phone:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {this.state.orderData.customer.phone_number}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Order date:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {this.state.orderData.created_at}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{size: 12}} md={{size: 6}}>
                                        <Row className="pb-2 pb-sm-3 pt-3 pt-md-0">
                                            <Col xs={{size: 12}}>
                                                <h4>Ordered car details</h4>
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Model:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {`${this.state.orderData.car.brand} ${this.state.orderData.car.model}`}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>License plate:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {this.state.orderData.car.license_plate}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Price:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                <strong style={{color: 'red'}}>{this.state.orderData.car.price} €</strong>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row className="pt-2 pb-2">
                                    <Col xs={{size: 12}} md={{size: 6}}>    
                                        <Row className="pb-2 pb-sm-3">
                                            <Col xs={{size: 12}}>
                                                <h4>Pick-up details</h4>
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Pick-up date:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {this.state.orderData.pickup_details.datetime}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Pick-up place:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {`${this.state.orderData.pickup_details.place_name}, ${this.state.orderData.pickup_details.place_address}`}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Pick-up GPS:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {this.state.orderData.pickup_details.place_gps}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{size: 10}} md={{size: 6}}>
                                        
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row className="pt-2 pb-2">
                                    <Col xs={{size: 12}} md={{size: 6}}>    
                                        <Row className="pb-2 pb-sm-3">
                                            <Col xs={{size: 12}}>
                                                <h4>Drop-off details</h4>
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Drop-off date:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {this.state.orderData.dropoff_details.datetime}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Drop-off place:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {`${this.state.orderData.dropoff_details.place_name}, ${this.state.orderData.dropoff_details.place_address}`}
                                            </Col>
                                        </Row>
                                        <Row className="pb-1">
                                            <Col xs={{size: 4}}>
                                                <strong>Drop-off GPS:</strong>
                                            </Col>
                                            <Col xs={{size: 8}}>
                                                {this.state.orderData.dropoff_details.place_gps}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{size: 12}} md={{size: 6}}>

                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>                        
                    )}
                    <CardFooter tag="footer">
                        <Button onClick={() => this.handleClose()} className="float-right close-button" type="button" color="secondary"><FontAwesomeIcon icon="times" /> Close</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}