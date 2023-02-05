import React, { useState, useEffect } from 'react';

import { usePrevious } from '../../hooks';

import SearchInput from '../SearchInput/SearchInput';
import List from '../List/List';

interface ISearchableList {
  list: any[],
  listItem: any,
  listItemProps?: any,
  startSearch: (query: string) => void,
  stopSearch: (query: string) => void,
  loadMore?: (offset: number) => void,
  listLimit: number,
  listLoadPending?: boolean,
  classPrefix?: string,
  isSearchInputDisabled?: boolean;
  HeaderComponent?: JSX.Element;
  query?: string;
  setQuery?: (query: string) => void;
  listMode?: string;
  spinnerSize?: number;
  maxInputLength?: number;
  isSearchIcon?: boolean;
  searchIconPosition?: 'left' | 'right';
  onScroll?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
  noItemsText?: string;
  // isTriggerToStopSearch?: boolean;
};

const SearchableList = (props: ISearchableList) => {
  const {
    classPrefix = 'search-list',
    list,
    HeaderComponent,
    spinnerSize,
    // isTriggerToStopSearch
  } = props;

  const [query, setQuery] = useState('');

  const currentQuery = (props.query !== undefined) ? props.query : query;
  const currentSetQuery = (props.setQuery !== undefined) ? props.setQuery : setQuery;

  const [loadedQuery, setLoadedQuery] = useState('');

  // const inputRef = useRef(null);

  const prevList = usePrevious(list);
  const prevQuery = usePrevious(currentQuery);

  // useDidUpdate(() => {
  //   if (isTriggerToStopSearch) {
  //     currentSetQuery('');
  //   }
  // }, [isTriggerToStopSearch]);

  useEffect(() => {
    if (currentQuery.length > 1 && prevList !== list) {
      console.log('SET LOADED', currentQuery);
      setLoadedQuery(currentQuery);
    }
    else if (prevQuery && !currentQuery) {
      console.log('SET LOADED 2', currentQuery);
      setLoadedQuery('');
    }
  }, [list, currentQuery]);

  return (
    <div className={classPrefix} >
      <SearchInput
        classPrefix={classPrefix}
        query={currentQuery}
        isDisabled={props.isSearchInputDisabled}
        setQuery={currentSetQuery}
        startSearch={props.startSearch}
        stopSearch={props.stopSearch}
        maxInputLength={props.maxInputLength}
        isSearchIcon={props.isSearchIcon}
        searchIconPosition={props.searchIconPosition}
      // inputRef={inputRef}
      // isAutoFocus
      />

      {HeaderComponent}

      <div className={classPrefix + "__list-wrap"}>
        <List
          list={list}
          limit={props.listLimit}
          classPrefix={classPrefix}
          mode={loadedQuery || props.listMode}
          loadMore={props.loadMore}
          listItem={props.listItem}
          listItemProps={props.listItemProps}
          listLoadPending={props.listLoadPending}
          spinnerSize={spinnerSize}
          onScroll={props.onScroll}
          noItemsText={props.noItemsText}
        />
      </div>
    </div>
  );
};


export default SearchableList;
