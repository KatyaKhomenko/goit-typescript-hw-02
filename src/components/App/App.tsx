import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { getPhotosBySearchValue } from '../../services/photos';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import EmptyResultMessage from '../EmptyResultMessage/EmptyResultMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreButton from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { Image } from './App.types';
import './App.module.css';

const App = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [images, setImages] = useState<Image[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalImages, setTotalImages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Image | null>(null);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setImages(null);
    setIsError(false);
    setCurrentPage(1);
    setModalData(null);
  };

  useEffect(() => {
    if (searchValue) {
      setIsLoading(true);
    }

    const getPhotos = async () => {
      try {
        if (!searchValue) {
          return;
        }

        const { results, total } = await getPhotosBySearchValue(
          searchValue,
          currentPage
        );

        if (currentPage === 1) setImages(results);

        if (currentPage > 1 && images !== null)
          setImages([...images, ...results]);

        setTotalImages(total);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();
  }, [searchValue, currentPage]);

  const onLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const scrollMore = () => {
    window.scrollBy({
      top: 338,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (currentPage > 1) scrollMore();
  }, [images, currentPage]);

  const onShowModal = (e: MouseEvent<HTMLImageElement>) => {
    setIsShowModal(true);

    const filteredImage = images?.filter(
      ({ urls: { small } }) => (e.target as HTMLImageElement).src === small
    );

    if (filteredImage) setModalData(filteredImage[0]);
  };

  const onCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery images={images} onShowModal={onShowModal} />
      {isLoading && <Loader />}
      {images && totalImages === 0 && <EmptyResultMessage />}
      {isError && <ErrorMessage />}
      {images?.length !== totalImages && totalImages !== null && (
        <LoadMoreButton onLoadMore={onLoadMore} />
      )}
      {modalData && (
        <ImageModal
          isOpen={isShowModal}
          closeModal={onCloseModal}
          modalData={modalData}
        />
      )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;