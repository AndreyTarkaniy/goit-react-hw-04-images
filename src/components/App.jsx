import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as ImageService from 'service/image-service';
import { SearchBar } from 'components/searchbar/searchbar';
import { ImageGallery } from 'components/imageGallery/imageGallery';
import { ImageGalleryItem } from 'components/imageGalleryItem/imageGalleryItem';
import { Button } from 'components/button/button';
import { Modal } from 'components/modal/modal';
import { Loader } from 'components/loader/loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: 0,
    error: '',
    isLoading: false,
    modalData: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, error: '' });

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

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...imagesData],
            error: '',
            totalImages: data.data.total,
          };
        });
      } catch (error) {
        this.setState({ error: 'Something went wrong' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  getQuery = query => {
    if (query === this.state.query) {
      alert('Change you request');
      return;
    }

    this.setState({
      query,
      page: 1,
      images: [],
      totalImages: 0,
    });
  };

  incrementPage = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  closeModal = () => {
    this.setState({
      modalData: null,
    });
  };

  selectImage = imageItem => {
    this.setState({
      modalData: imageItem,
    });
  };

  render() {
    const { images, totalImages, isLoading, modalData } = this.state;

    const showButton = images.length !== totalImages;

    return (
      <div style={{ padding: 20 }}>
        {isLoading && <Loader />}

        <SearchBar onSubmit={this.getQuery} />
        {images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem images={images} onSelect={this.selectImage} />
          </ImageGallery>
        )}
        {modalData && <Modal url={modalData} onClick={this.closeModal} />}

        {showButton && (
          <div>
            {isLoading ? <Loader /> : <Button onClick={this.incrementPage} />}
          </div>
        )}
      </div>
    );
  }
}
