import { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  //Lifting state up
  handleClick = photo => {
    const { onHandleClick } = this.props;
    onHandleClick(photo);
  };

  render() {
    const { photos } = this.props;
    return photos.map(photo => {
      return (
        <Item key={photo.id} onClick={() => this.handleClick(photo)}>
          <Image src={photo.webformatURL} alt={photo.tags} tabIndex="0" />
        </Item>
      );
    });
  }
}

ImageGalleryItem.propTypes = {
  // photos: PropTypes.array.isRequired,
  onHandleClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
