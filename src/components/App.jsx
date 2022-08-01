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

  modalRef = React.createRef();

  onHandleData = data => {
    this.setState({ photos: data, status: 'loaded' });
  };

  onHandleMoreData = data => {
    this.setState({
      photos: [...this.state.photos, ...data],
      status: 'loaded',
    });
  };

  onSubmit = searchValue => {
    resetPage();
    this.setState({ status: 'pending', searchQuery: searchValue });
    pixFetch(searchValue)
      .then(data => this.onHandleData(data.hits))
      .catch(error => console.log(error));
  };

  onLoadMore = () => {
    this.setState({ status: 'pending' });
    pixFetch(this.state.searchQuery)
      .then(data => this.onHandleMoreData(data.hits))
      .catch(error => console.log(error));
  };

  onHandleClick = click => {
    const foundImage = this.state.photos.find(photo => photo.tags === click);
    this.setState({ clickedImg: foundImage, showModal: true });
  };

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
            ref={this.modalRef}
          ></Modal>
        )}
      </>
    );
  }
}

export default App;
