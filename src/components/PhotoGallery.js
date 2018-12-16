import React from 'react';

export default class PhotoGallery extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="photo-gallery">
        <img src="./img/dummy.jpg" />
      </div>
    )
  }
}