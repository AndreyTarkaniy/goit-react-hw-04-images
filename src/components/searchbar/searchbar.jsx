import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from 'components/searchbar/searchbar.module.css';

export class SearchBar extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const query = e.target.elements.search.value.toLowerCase().trim();

    if (!query) return;

    this.props.onSubmit(query);
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
