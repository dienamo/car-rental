import React from 'react';

export default class CarThumb extends React.Component {
  render() {
    return (
      <article className="car-thumb">
        <img src="./img/dummy.jpg" alt="car" />
        <header>Car name</header>
      </article>
    )
  }
}