import { Component } from 'react';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  handleClick = e => {
    const { onHandleClick } = this.props;
    onHandleClick(e.target.alt);
  };

  render() {
    const { photos } = this.props;
    return photos.map(photo => {
      return (
        <li
          key={photo.id}
          className={s.ImageGalleryItem}
          onClick={this.handleClick}
        >
          <img
            src={photo.webformatURL}
            alt={photo.tags}
            className={s.ImageGalleryItemImage}
          />
        </li>
      );
    });
  }
}

export default ImageGalleryItem;
