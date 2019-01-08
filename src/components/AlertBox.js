import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class AlertBox extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    
    this.state = {
      modal: true
    };
  }

  handleClose() {
    this.setState({
      modal: false
    }, () => {
      setTimeout(() => {
        this.props.closeHandler();
      }, 500);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Modal className="alertBox" isOpen={this.state.modal} style={{top: "30%"}}>
        <ModalHeader>
          {this.props.alertText.header}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="3" className="align-self-center text-center">
              {this.props.whatHappened === "success" ? (
                <FontAwesomeIcon icon="check-circle" className="text-success" style={{fontSize: "38px"}} />
              ) : (
                <FontAwesomeIcon icon="times-circle" className="text-danger" style={{fontSize: "38px"}} />
              )}
            </Col>
            <Col xs="7" style={{fontSize: '18px'}}>
              {this.props.alertText.body}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" size="sm" onClick={() => this.handleClose()}>Dismiss</Button>
        </ModalFooter>
      </Modal>
    )
  }
}