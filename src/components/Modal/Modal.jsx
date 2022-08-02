import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    const { onCloseModal } = this.props;
    if (e.currentTarget === e.target) {
      onCloseModal('close');
    }

    if (e.code === 'Escape') {
      onCloseModal('close');
    }
  };

  render() {
    const { photo } = this.props;
    return (
      <div className={s.Overlay} onClick={this.handleClose}>
        <div className={s.Modal}>
          <img src={photo.largeImageURL} alt={photo.tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  photo: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
