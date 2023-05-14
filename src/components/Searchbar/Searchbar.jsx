import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarBox,
  SearchForm,
  Button,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

class Searchbar extends Component {
  state = { value: '' };

  //Method to store input value in component state
  onHandleInput = e => {
    this.setState({ value: e.currentTarget.value });
  };

  //Method to handle search submit
  //Prevents page reloading
  //Lifting state up using onSubmit prop
  onHandleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state.value);
  };

  render() {
    return (
      <SearchbarBox>
        <SearchForm onSubmit={this.onHandleSubmit}>
          <Button type="submit">
            <AiOutlineSearch />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </Button>

          <SearchFormInput
            type="text"
            name="search"
            value={this.state.value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onHandleInput}
          />
        </SearchForm>
      </SearchbarBox>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
