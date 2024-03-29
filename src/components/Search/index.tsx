import React from 'react';
// import styles from './Search.module.sass';

import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, selectFilter } from '../../redux/filter/slice';
import styles from './Search.module.scss';

type SearchProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const Search: React.FC<SearchProps> = ({ searchValue }) => {
  // const { searchValue } = useSelector(selectFilter);
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log(event);
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current && inputRef.current.focus();
  };

  const onCangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      if (str || str === '') {
        dispatch(setSearchValue(str));
      }
    }, 150),
    [],
  );

  return (
    <div className={styles.search_block}>
      <div className={styles.search}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={inputRef}
          onChange={onCangeSearchInput}
          value={value}
          placeholder="Search..."
          type="text"
        />
        {searchValue ? (
          <img
            src={require('../../img/btn_deleat.png')}
            style={{ cursor: 'pointer' }}
            height="35px"
            onClick={onClickClear}
          />
        ) : null}
      </div>
    </div>
  );
};
