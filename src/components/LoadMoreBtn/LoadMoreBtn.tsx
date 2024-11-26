import { FC } from 'react';
import css from './LoadMoreBtn.module.css';

type Props = {
  onLoadMore: () => void;
};

const LoadMoreButton: FC<Props> = ({ onLoadMore }) => {
  return (
    <div className={css.buttonContainer}>
      <button type="button" className={css.loadMoreBtn} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreButton;