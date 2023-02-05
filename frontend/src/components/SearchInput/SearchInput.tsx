import React from 'react';

import { useDebounce, useDidUpdate, useDidMount } from '../../hooks';

import './SearchInput.scss';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

type SearchOption = string | number | null;
interface ISearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  stopSearch: (query: string) => void;
  startSearch: (query: string, searchOption?: SearchOption) => void;
  searchOption?: SearchOption;
  classPrefix?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  isAutoFocus?: boolean;
  isDisabled?: boolean;
  isSearchIcon?: boolean;
  searchIconPosition?: 'left' | 'right';
  maxInputLength?: number;
}


const SearchInput = (props: ISearchInputProps) => {
  const {
    query,
    classPrefix,
    onChange,
    setQuery,
    stopSearch,
    startSearch,
    inputRef,
    isDisabled,
    isAutoFocus,
    isSearchIcon = true,
    searchIconPosition = 'left',
    maxInputLength = 20,
    ...inputProps
  } = props;

  useDidMount(() => {
    inputRef && inputRef.current && props.isAutoFocus && inputRef.current.focus();
  });

  useDidUpdate(() => {
    if (query.length === 0) {
      stopSearch('');
    }
  }, [query]);

  const handleSearch = (): void => {
    if (query.length >= 2) {
      startSearch(query);   // searchOption means some additional param to search function
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(e);
    }
    setQuery(e.target.value)
  }

  useDebounce(handleSearch, 300, [query]);

  return (
    <div className={classPrefix ? `search-input ${classPrefix}__input-wrap` : 'search-input'}>
      {isSearchIcon &&
        <SearchIcon 
          className={classPrefix ? `search-input__icon ${classPrefix}__search-input-icon` : 'search-input__icon'} 
          style={{
            left: searchIconPosition === 'left' ? '12px' : 'unset',
            right: searchIconPosition === 'right' ? '12px' : 'unset'
          }}
        />
      }

      <input
        autoComplete="off"
        className={classPrefix ? `input search-input__input ${classPrefix}__search-input` : 'input search-input__input'}
        maxLength={maxInputLength}
        placeholder="Search"
        tabIndex={0}
        type="search"
        value={query}
        ref={inputRef}
        onChange={onInputChange}
        style={{ 
          paddingLeft: isSearchIcon && searchIconPosition === 'left' ? '38px' : '16px',
          paddingRight: isSearchIcon && searchIconPosition === 'right' ? '38px' : '16px'
        }}
        {...inputProps}
      />
    </div>
  );
}

export default React.memo(SearchInput);
