import { FC, MouseEvent } from 'react';
import ImageCard from '../ImageCard/ImageCard';

import css from './ImageGallery.module.css';
import { Image } from '../App/App.types';

type Props = {
  images: Image[] | null;
  onShowModal: (e: MouseEvent<HTMLImageElement>) => void;
};

const ImageGallery: FC<Props> = ({ images, onShowModal }) => {
  return (
    <>
      {images && images.length !== 0 && (
        <ul className={css.list}>
          {images.map(photo => {
            return (
              <li key={photo.id} className={css.listItem}>
                <ImageCard {...photo} onShowModal={onShowModal} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ImageGallery;