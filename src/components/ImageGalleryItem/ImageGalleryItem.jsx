import React from 'react';
import PropTypes from 'prop-types';
import { StyledImageGalleryItem, StyledImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, alt, onClick }) => {
  return (
    <StyledImageGalleryItem className="gallery-item">
      <StyledImage src={webformatURL} alt={alt} onClick={onClick} />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
