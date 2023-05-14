import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  SearchForm,
  Button,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchIcon,
} from './Searchbar.styled';
import { Formik } from 'formik';

class Searchbar extends Component {
  //Method to handle search submit
  //Prevents page reloading
  //Lifting state up using onSubmit prop
  onHandleSubmit = (values, { resetForm }) => {
    const { onSubmit } = this.props;
    onSubmit(values.search);
    resetForm();
  };

  render() {
    return (
      <Box>
        <Formik initialValues={{ search: '' }} onSubmit={this.onHandleSubmit}>
          <SearchForm>
            <Button type="submit">
              <SearchIcon />
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            </Button>

            <SearchFormInput
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </Formik>
      </Box>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
