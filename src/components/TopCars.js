import React from 'react';
import { Row, Col } from 'reactstrap';

export default class TopCars extends React.Component {
	render() {
		return (
			<div className="top-cars">
				<h3>Top Cars - {this.props.carClass}</h3>
				<Row>
					<Col sm={12} lg={2}>
						<img src="./img/dummy.jpg" alt="car" />
					</Col>
					<Col sm={12} lg={2}>
						<img src="./img/dummy.jpg" alt="car" />
					</Col>
					<Col sm={12} lg={2}>
						<img src="./img/dummy.jpg" alt="car" />
					</Col>
					<Col sm={12} lg={2}>
						<img src="./img/dummy.jpg" alt="car" />
					</Col>
					<Col sm={12} lg={2}>
						<img src="./img/dummy.jpg" alt="car" />
					</Col>
					<Col sm={12} lg={2}>
						<img src="./img/dummy.jpg" alt="car" />
					</Col>
				</Row>
			</div>
		)
	}
}