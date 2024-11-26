import { ChangeEvent, FC, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import css from './SearchBar.module.css';

type Props = {
  onSearch: (value: string) => void;
};

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === '') {
      toast.error('Search field is empty. Please, enter your query.');
      return;
    }

    onSearch(value);
    setValue('');
  };

  return (
    <>
      <header className={css.header}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button className={css.button} type="submit">
            <span className={css.buttonSpan}>Search</span>
          </button>
          <input
            className={css.input}
            type="text"
            name="searchText"
            aria-hidden="false"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    </>
  );
};

export default SearchBar;