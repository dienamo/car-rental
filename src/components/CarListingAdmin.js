import React from 'react';
import {
    Row, Col,
    Form, Label, Input, Button, Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class CarListingAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {listingData: null};
        //this.db = this.props.firebase.firestore();
        //this.getAllCars();
    }

    componentDidMount() {
        if (!this.state.listingData) {
            (async () => {

                this.setState({
                    listingData: await this.getAllCars()
                });

            })().catch(err => {
                console.log(err);
            })
        }
    }

    async getAllCars() {
        const db = this.props.firebase.firestore();

        const querySnapshot = await db.collection('cars').get();

        let listingData = [];

        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().brand);
            const data = doc.data();
            listingData.push([doc.id, data.brand.id, data.price]);
        });

        return listingData;

        /*db.collection('cars').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data().brand);
                const data = doc.data();
                this.listingData.push([data.brand.id, data.price]);
            });
        });*/
    }

    render() {
        let listingTableRows = null;
        if (this.state.listingData !== null) {
            listingTableRows = this.state.listingData.map(carData => {
                return (
                    <tr key={carData[0]}>
                        <td>{carData[1]}</td>
                        <td>BA-123RR</td>
                        <td>Available</td>
                        <td>{carData[2]}</td>
                    </tr>
                );
            });
        }

        return (
            <div className="carListingAdmin">
                <Row className="mt-4">
                    <Col xs="12" sm="4" md="5" xl="7">
                        <Button className="add-new-car-button" color="secondary"><FontAwesomeIcon className="mr-2" icon="plus-circle" />Add new car to database</Button>
                    </Col>
                    <Col xs="12" sm="8" md="7" xl="5">
                        <Form inline className="searchForm float-sm-right">
                            <span className="search-input-label"><Label for="searchInput">Search:</Label></span>
                            <Input className="search-input-field ml-0 ml-sm-2 mt-3 mt-sm-0" type="text" name="searchText" id="searchInput" placeholder="Type in car name, details..." />
                            <Button className="search-form-submit ml-0 ml-sm-1 mt-1 mt-sm-0" color="success">Search!</Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs="12">
                        {this.state.listingData === null ? (
                            <div>Loading data...</div>
                        ) : (
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Car model</th>
                                        <th>License Plate</th>
                                        <th>Status</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listingTableRows}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </div>
        )
    }
}