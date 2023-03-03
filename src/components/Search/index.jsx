import React from 'react';
import styles from './Search.module.sass';
import {AppContext} from '../../App';
import debounce from 'lodash.debounce';

function Search() {
    const [value, setValue] = React.useState('');
    const {searchValue, setSearchValue} = React.useContext(AppContext);

    const inputRef = React.useRef();

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    };

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 150),
        [],
    );

    const onCangeSearchInput = (event) => {
        setValue(event.target.value);
        console.log(searchValue);
        updateSearchValue(event.target.value);
    };

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
                    value={searchValue}
                    placeholder="Search..."
                    type="text"
                />
                {searchValue ? (
                    <img
                        src={require('../../img/btn_deleat.png')}
                        style={{cursor: 'pointer'}}
                        height="35px"
                        onClick={onClickClear}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default Search;
