import { useEffect, useLayoutEffect, useRef, MutableRefObject, useContext, useState } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../redux/store';
import { useDidMount, usePrevious, useWillUnmount } from '../../hooks';
import { getNotifications, removeNotifications, getNotificationsCount } from '../../redux/ducks/notifications';
import { SetIsVisibleContext } from '../../pages/MainPage/MainPage';

import './Notifications.scss';
import NotificationItem from './components/NotificationItem';
import Spinner from '../../components/Spinner/Spinner';

interface INotificationsProps {
  ids: number[];
  pending: boolean;
  getNotifications: (number?: number) => void;
  removeNotifications: (ids: number[], isReduceCount: boolean) => void;
  getNotificationsCount: () => void;
}

const Notifications = (props: INotificationsProps) => {
  const {
    ids,
    pending,
    getNotifications,
    removeNotifications,
    getNotificationsCount
  } = props;

  const LIMIT = 10;

  const { setIsVisibleTopbar, setIsVisibleNavbar } = useContext(SetIsVisibleContext);

  const expectedListLength: MutableRefObject<number> = useRef(LIMIT);
  const startScrollPosition = useRef(0);
  const isUnmount = useRef(false);

  const [acceptedNotificationIds, setAcceptedNotificationIds] = useState<number[]>([]);

  const prevListLength = usePrevious(ids.length);

  useDidMount(() => {
    getNotifications();
    getNotificationsCount();

    isUnmount.current = false;

    expectedListLength.current = ids.length <= LIMIT
      ? LIMIT
      : ids.length;
  })

  useWillUnmount(() => {
    isUnmount.current = true;
  });

  useEffect(() => () => {
    if (isUnmount.current) {
      removeNotifications(acceptedNotificationIds, false);
    }
  }, [acceptedNotificationIds]);

  useLayoutEffect(() => {
    // one item was removed from list
    if (prevListLength && (prevListLength === ids.length + 1)) {
      expectedListLength.current -= 1;
    }
    // one item was added to list
    else if (
      prevListLength &&
      (prevListLength === ids.length - 1) &&
      ( // scroll exclusion
        prevListLength === expectedListLength.current ||
        expectedListLength.current % prevListLength
      )
    ) {
      expectedListLength.current += 1;
    }
  }, [ids.length]);

  const handleScroll = (e: Event) => {
    loadMore(e);
    setIsVisibleNavbarAndTopbar(e);
  }

  const loadMore = (e: Event): void => {
    const target = e.currentTarget as Window;

    const { scrollY, outerHeight } = target;
    const { scrollHeight } = document.documentElement;

    const scrollBottom = scrollHeight - scrollY - outerHeight;

    if (scrollBottom === 0 && expectedListLength.current === ids.length) {
      expectedListLength.current = ids.length + LIMIT;

      getNotifications(ids.length);
    }
  };

  const setIsVisibleNavbarAndTopbar = (e: Event) => {
    const target = e.currentTarget as Window;

    if (startScrollPosition && startScrollPosition.current) {
      if (
        (target.scrollY < 20) ||
        (document.documentElement.scrollHeight - (target.scrollY + target.outerHeight) < 40) ||
        (document.documentElement.scrollHeight - target.outerHeight < 150)
      ) {
        setIsVisibleTopbar(true);
        setIsVisibleNavbar(true);
        startScrollPosition.current = 0;
      }
      else if (target.scrollY < startScrollPosition.current) {
        if (startScrollPosition.current - target.scrollY > 40) {
          setIsVisibleTopbar(true);
          setIsVisibleNavbar(true);
          startScrollPosition.current = 0;
        }
      }
      else {
        setIsVisibleTopbar(false);
        setIsVisibleNavbar(false);
        startScrollPosition.current = 0;
      }
    }
    else {
      startScrollPosition.current = target.scrollY;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids.length]);

  if (pending) {
    return (
      <div className="notifications__spinner">
        <Spinner size='150px' />
      </div>
    )
  }

  return (
    <div className="notifications">
      <h2 className="notifications__title">
        Notifications
      </h2>

      <ul className="notifications__list">
        {ids.length === 0 
          ? (
            <div className="notifications__empty-list">
              <span>No notifications</span>
            </div>
          ):(
            ids.map((id: number) =>
              <li className="notifications__list-item" key={id}>
                <NotificationItem 
                  itemId={id} 
                  setAcceptedNotificationIds={setAcceptedNotificationIds}
                />
              </li>
            )
          )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  ids: state.notifications.ids,
  pending: state.notifications.pending,
})

const mapDispatchToProps = {
  getNotifications,
  removeNotifications,
  getNotificationsCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);