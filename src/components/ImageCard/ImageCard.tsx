import { FC, MouseEvent } from 'react';
import css from './ImageCard.module.css';

type Props = {
  urls: { small: string };
  alt_description: string;
  onShowModal: (e: MouseEvent<HTMLImageElement>) => void;
};

const ImageCard: FC<Props> = ({
  urls: { small },
  alt_description,
  onShowModal,
}) => {
  return (
    <div>
      <img
        className={css.image}
        src={small}
        alt={alt_description}
        loading="lazy"
        onClick={onShowModal}
      />
    </div>
  );
};

export default ImageCard;