import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="about">
        <h1 className="mt-3 page-heading">About us</h1>
        <article className="mt-4">
          We are a car rental company with years of experience in that field. We offer you a wide range of cars in terms of price, brand and price/performance ratio.<br />
          If you want to rent a car, then don't hesitate and better call or send us a message!
        </article>
      </div>
    )
  }
}