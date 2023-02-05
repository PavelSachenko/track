import React, { useRef, useLayoutEffect, MutableRefObject, ReactType } from 'react';

import { useDidMount, usePrevious, useDidUpdate } from '../../hooks';
import Spinner from '../Spinner/Spinner';


interface IListProps {
  list: any[] | [],
  limit: number,
  listItem: ReactType,
  mode?: string,
  loadMore?: (offset: number) => void,
  listLoadPending?: boolean,
  classPrefix?: string,
  listItemProps?: any,
  listItemKey?: string;
  spinnerSize?: number;
  onScroll?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
  noItemsText?: string;
};


const List = (props: IListProps) => {
  console.log("LIST RENDER");

  const {
    list = [],
    limit,
    mode,
    classPrefix = 'list',
    listItemKey = 'id',
    listItem: ListItem,
    listLoadPending,
    spinnerSize,
    onScroll,
    noItemsText = '(no items)'
  } = props;

  const listRef: any = useRef();

  const expectedListLength: MutableRefObject<number> = useRef(limit);

  const prevListLength = usePrevious(list.length);

  useDidMount(() => {
    expectedListLength.current = list.length <= limit
      ? limit
      : list.length;
  });

  useDidUpdate(() => {
    expectedListLength.current = limit;

    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [mode]);

  useLayoutEffect(() => {
    // one item was removed from list
    if (prevListLength && (prevListLength === list.length + 1)) {
      expectedListLength.current -= 1;
    }

    // one item was added to list
    // else if (prevListLength && (prevListLength === list.length - 1)) {
    //   expectedListLength.current += 1;
    // }
  }, [list.length]);


  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>): void => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    if (scrollBottom === 0 && expectedListLength.current === list.length) {
      expectedListLength.current = list.length + limit;

      props.loadMore && props.loadMore(list.length);    // pass offset to loadMore func
    }
  };

  const onScrollHandler = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (typeof onScroll === 'function') {
      onScroll(e);
    }

    handleScroll(e);
  }

  return (
    <div 
      className={classPrefix + "__list-container"} 
      onScroll={onScrollHandler} 
      ref={listRef}
    >
      {listLoadPending
        ? (
          <div className={classPrefix + "__load-wrap"}>
            <Spinner size={spinnerSize ? `${spinnerSize}px` : undefined}/>
          </div>
        ):(
          !!list.length
            ? (
              <ul className={classPrefix + "__list"}>
                {list.map(item => {
                  return <ListItem
                    key={item[listItemKey] || item}
                    item={item}

                    {...(
                      typeof props.listItemProps === 'function'
                        ? props.listItemProps(item)
                        : props.listItemProps
                    )}

                    className={classPrefix + "__item"} />;
                })}
              </ul>
            )
            : (
              <div className={classPrefix + '__no-items'}>
                {noItemsText}
              </div>
            )
        )
      }
    </div>
  );
};

export default List;