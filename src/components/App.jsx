import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as ImageService from 'service/image-service';
import { SearchBar } from 'components/searchbar/searchbar';
import { ImageGallery } from 'components/imageGallery/imageGallery';
import { ImageGalleryItem } from 'components/imageGalleryItem/imageGalleryItem';
import { Button } from 'components/button/button';
import { Modal } from 'components/modal/modal';
import { Loader } from 'components/loader/loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!query || !page) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(error);

        const data = await ImageService.getImage(query, page);

        const imagesData = data.data.hits.map(
          ({ id, webformatURL, largeImageURL }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
            };
          }
        );

        setImages(prev => [...prev, ...imagesData]);
        setError(error);
        setTotalImages(data.data.total);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page, error]);

  const getQuery = queryImage => {
    if (queryImage === query) {
      alert('Change you request');
      return;
    }
    setQuery(queryImage);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const selectImage = imageItem => {
    setModalData(imageItem);
  };

  const showButton = images.length !== totalImages;

  return (
    <div style={{ padding: 20 }}>
      {isLoading && <Loader />}

      <SearchBar onSubmit={getQuery} />
      {images.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem images={images} onSelect={selectImage} />
        </ImageGallery>
      )}
      {modalData && <Modal url={modalData} onClick={closeModal} />}

      {showButton && (
        <div>{isLoading ? <Loader /> : <Button onClick={incrementPage} />}</div>
      )}
    </div>
  );
};
