import React from 'react';

export default class CarThumb extends React.Component {
  render() {
    return (
      <article className="car-thumb">
        <figure className="img-wrap">
          <img src="./img/dummy.jpg" alt="car" />
        </figure>
        <div className="text">
          <header>{this.props.name}</header>
          <span className="price">{this.props.price}</span>
        </div>
      </article>
    )
  }
}