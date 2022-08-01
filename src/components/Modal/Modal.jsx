import React, { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  handleClick = e => {
    const { onCloseModal } = this.props;
    if (e.currentTarget === e.target) {
      onCloseModal('close');
    }
  };

  handleEsc = e => {
    const { onCloseModal } = this.props;
    if (e.code === 'Escape') {
      onCloseModal('close');
    }
  };

  render() {
    const { photo } = this.props;
    return (
      <div
        className={s.Overlay}
        onClick={this.handleClick}
        onKeyDown={this.handleEsc}
        ref={this.modal}
      >
        <div className={s.Modal}>
          <img src={photo.largeImageURL} alt={photo.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
