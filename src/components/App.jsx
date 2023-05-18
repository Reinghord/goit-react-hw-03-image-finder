import React, { Component } from 'react';
import { createPortal } from 'react-dom';
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

  async componentDidUpdate(_, pS) {
    //Method to handle data received from Submit & Load More button
    //Status state changing to loaded to show Load More button
    //WARNING! Changing pixabay settings to load more than 12 pictures will break the logic
    if (this.state.status === 'pending') {
      const data = await pixFetch(this.state.searchQuery);

      if (data.hits.length === 12) {
        return this.setState(
          pS.searchQuery !== this.state.searchQuery
            ? {
                photos: data.hits,
                status: 'loaded',
              }
            : {
                photos: [...pS.photos, ...data.hits],
                status: 'loaded',
              }
        );
      }
      if (data.hits.length === 0) {
        return this.setState({ photos: [], status: 'rejected' });
      }
      return this.setState(
        pS.searchQuery !== this.state.searchQuery
          ? {
              photos: data.hits,
              status: 'idle',
            }
          : {
              photos: [...pS.photos, ...data.hits],
              status: 'idle',
            }
      );
    }
  }

  //Method to fetch and render data on search submit
  //It will reset PAGE_COUNTER for fetch
  //Status state changing to pending to show spinner
  onSubmit = searchValue => {
    resetPage();
    this.setState({ status: 'pending', searchQuery: searchValue });
    console.log(this.state);
  };

  //Method to fetch data on clicking Load More button
  //Pagination will continue from submitted query
  //Status state changing to pending to show spinner
  onLoadMore = () => {
    this.setState({ status: 'pending' });
  };

  //Method to determine which picture user clicked
  //Storing clicked image object in state
  //Displaying modal window
  onHandleClick = click => {
    const foundImage = click;
    this.setState({ clickedImg: foundImage, showModal: true });
  };

  //Method to close Modal window
  onCloseModal = () => {
    this.setState({ showModal: false });
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

        {this.state.status === 'rejected' && (
          <div>
            Your generic alert to promt you that there are no images found, but
            I was too lazy to style it. Hell, at least it removed that "Load
            More" button from showing
          </div>
        )}

        {this.state.showModal &&
          createPortal(
            <Modal
              photo={this.state.clickedImg}
              onCloseModal={this.onCloseModal}
            ></Modal>,
            document.body
          )}
      </>
    );
  }
}

export default App;
