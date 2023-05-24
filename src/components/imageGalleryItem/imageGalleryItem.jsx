import React from 'react';
import PropTypes from 'prop-types';

import css from 'components/imageGalleryItem/imageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onSelect }) => {
  return images.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li className={css.imageGalleryItem} key={id}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onSelect({ largeImageURL });
        }}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }).isRequired
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};
