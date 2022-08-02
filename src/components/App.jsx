import React, { Component } from 'react';
import pixFetch, { resetPage } from 'service/pixabay';
import { BallTriangle } from 'react-loader-spinner';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Searchbar from './Searchbar';
import Button from './Button';
import Modal from './Modal';

class App extends Component {
  state = {
    photos: [],
    searchQuery: '',
    status: 'idle',
    showModal: false,
    clickedImg: {},
  };

  //Method to fetch and render data on search submit
  //It will reset PAGE_COUNTER for fetch
  //Status state changing to pending to show spinner
  onSubmit = searchValue => {
    resetPage();
    this.setState({ status: 'pending', searchQuery: searchValue });
    pixFetch(searchValue)
      .then(data => this.onHandleData(data.hits))
      .catch(error => console.log(error));
  };

  //Method to fetch data on clicking Load More button
  //Pagination will continue from submitted query
  //Status state changing to pending to show spinner
  onLoadMore = () => {
    this.setState({ status: 'pending' });
    pixFetch(this.state.searchQuery)
      .then(data => this.onHandleData(data.hits))
      .catch(error => console.log(error));
  };

  //Method to handle data received from search submit
  //Status state changing to loaded to show Load More button
  onHandleData = data => {
    this.setState(prevState =>
      prevState.searchQuery !== this.state.searchQuery
        ? { photos: data, status: 'loaded' }
        : { photos: [...this.state.photos, ...data], status: 'loaded' }
    );
  };

  //Method to determine which picture user clicked
  //Storing clicked image object in state
  //Displaying modal window
  onHandleClick = click => {
    const foundImage = this.state.photos.find(photo => photo.tags === click);
    this.setState({ clickedImg: foundImage, showModal: true });
  };

  //Method to close Modal window
  onCloseModal = handle => {
    if (handle === 'close') {
      this.setState({ showModal: false });
    }
  };

  render() {
    const spinnerStyle = { justifyContent: 'center' };

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          <ImageGalleryItem
            photos={this.state.photos}
            onHandleClick={this.onHandleClick}
          />
        </ImageGallery>

        {this.state.status === 'pending' && (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle={spinnerStyle}
            visible={true}
          />
        )}

        {this.state.status === 'loaded' && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {this.state.showModal && (
          <Modal
            photo={this.state.clickedImg}
            onCloseModal={this.onCloseModal}
          ></Modal>
        )}
      </>
    );
  }
}

export default App;
