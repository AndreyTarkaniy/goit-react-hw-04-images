import React from 'react';
import PropTypes from 'prop-types';

import css from 'components/button/button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={css.wrap}>
      <button className={css.button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
