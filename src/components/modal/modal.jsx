import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from 'components/modal/modal.module.css';

export const Modal = ({ url: { largeImageURL, tags }, onClick }) => {
  useEffect(() => {
    const handleClickEscape = e => {
      if (e.code === 'Escape') onClick();
    };

    document.addEventListener('keydown', handleClickEscape);
    return () => {
      document.removeEventListener('keydown', handleClickEscape);
    };
  }, [onClick]);

  const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
