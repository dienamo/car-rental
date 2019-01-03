import React from 'react';

export default class AlertBox extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="alertBox">
        <div className="dark-div"></div>
        <div className="alert-box">
          blabla
        </div>
      </div>
    )
  }
}