import React from 'react';
import PropTypes from 'prop-types';

import css from 'components/imageGallery/imageGallery.module.css';

export const ImageGallery = ({ children }) => {
  return <ul className={css.imageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
