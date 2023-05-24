import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from 'components/modal/modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleClickEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClickEscape);
  }

  handleClickEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  render() {
    const {
      url: { largeImageURL, tags },
      onClick,
    } = this.props;

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
  }
}

Modal.propTypes = {
  url: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
