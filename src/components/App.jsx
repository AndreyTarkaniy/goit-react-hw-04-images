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
    setPage(page);
    setImages(images);
    setTotalImages(totalImages);

    // this.setState({
    //   query: queryImage,
    //   page: 1,
    //   images: [],
    //   totalImages: 0,
    // });
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

// export class App extends Component {
// state = {
//   query: '',
//   page: 1,
//   images: [],
//   totalImages: 0,
//   error: '',
//   isLoading: false,
//   modalData: null,
// };

// async componentDidUpdate(_, prevState) {
//   const { query, page } = this.state;

//   if (prevState.query !== query || prevState.page !== page) {
//     try {
//       this.setState({ isLoading: true, error: '' });

//       const data = await ImageService.getImage(query, page);

//       const imagesData = data.data.hits.map(
//         ({ id, webformatURL, largeImageURL }) => {
//           return {
//             id,
//             webformatURL,
//             largeImageURL,
//           };
//         }
//       );

//       this.setState(prevState => {
//         return {
//           images: [...prevState.images, ...imagesData],
//           error: '',
//           totalImages: data.data.total,
//         };
//       });
//     } catch (error) {
//       this.setState({ error: 'Something went wrong' });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }
// }

// getQuery = query => {
//   if (query === this.state.query) {
//     alert('Change you request');
//     return;
//   }

//   this.setState({
//     query,
//     page: 1,
//     images: [],
//     totalImages: 0,
//   });
// };

// incrementPage = () => {
//   this.setState(prevState => {
//     return {
//       page: prevState.page + 1,
//     };
//   });
// };

// closeModal = () => {
//   this.setState({
//     modalData: null,
//   });
// };

// selectImage = imageItem => {
//   this.setState({
//     modalData: imageItem,
//   });
// };

// render() {
// const { images, totalImages, isLoading, modalData } = this.state;

// const showButton = images.length !== totalImages;

//   return (
//     <div style={{ padding: 20 }}>
//       {isLoading && <Loader />}

//       <SearchBar onSubmit={this.getQuery} />
//       {images.length > 0 && (
//         <ImageGallery>
//           <ImageGalleryItem images={images} onSelect={this.selectImage} />
//         </ImageGallery>
//       )}
//       {modalData && <Modal url={modalData} onClick={this.closeModal} />}

//       {showButton && (
//         <div>
//           {isLoading ? <Loader /> : <Button onClick={this.incrementPage} />}
//         </div>
//       )}
//     </div>
//   );
// }
// }
