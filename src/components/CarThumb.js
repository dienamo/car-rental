import React from 'react';
import { Link } from 'react-router-dom';

export default class CarThumb extends React.Component {
  render() {
    const carData = this.props.carData;
    return (
      <article className="car-thumb">
        <Link to={`/car/${carData.id}`} className="car-thumb-wrap">
          <figure className="img-wrap">
            <img src="./img/dummy.jpg" alt="car" />
          </figure>
        </Link>
        <div className="text">
          <Link to={`/car/${carData.id}`}>
            <header>{carData.brand.name + " " + carData.model.name + " " + carData.engine}</header>
          </Link>
          <span className="price">{carData.price} &euro;</span>
        </div>
      </article>
    )
  }
}