import React from 'react';

export default class CarThumb extends React.Component {
  render() {
    return (
      <article className="car-thumb">
        <img src="./img/dummy.jpg" alt="car" />
        <div className="text">
          <header>Car name</header>
          <span className="price">10€</span>
        </div>
      </article>
    )
  }
}