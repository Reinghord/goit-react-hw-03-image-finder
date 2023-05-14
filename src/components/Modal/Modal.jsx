import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

class Modal extends Component {
  //Adding listener to track keydown Escape
  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
  }
  //Removing listener before unmounting component
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose);
  }

  //Method to close modal on clicking Overlay or pressing Escape
  handleClose = e => {
    const { onCloseModal } = this.props;
    if (e.currentTarget === e.target || e.code === 'Escape') {
      onCloseModal();
    }
  };

  render() {
    const { photo } = this.props;
    return (
      <Overlay onClick={this.handleClose}>
        <ModalWindow>
          <img src={photo.largeImageURL} alt={photo.tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  photo: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
