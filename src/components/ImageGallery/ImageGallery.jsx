import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

function ImageGallery({ children }) {
  return <Gallery>{children}</Gallery>;
}

ImageGallery.propTypes = { children: PropTypes.element.isRequired };

export default ImageGallery;
