import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from '../api/apiKey';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      await this.fetchImages();
    }
  }

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({ isLoading: true });

    fetchImages(currentPage, searchQuery)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          totalHits: response.data.totalHits,
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      totalHits: 0,
    });
  };

  handleLoadMore = () => {
    this.fetchImages(); 
  };

  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, totalHits } =
      this.state;
    const shouldRenderButton =
      images.length > 0 && !isLoading && images.length < totalHits;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery gallery={images} onClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {shouldRenderButton && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
