import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from '../api/apiKey';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      fetchImages(currentPage, searchQuery)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setTotalHits(response.data.totalHits);
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [searchQuery, currentPage]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

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
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery gallery={images} onClick={handleImageClick} />
      {isLoading && <Loader />}{' '}
      {shouldRenderButton && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
