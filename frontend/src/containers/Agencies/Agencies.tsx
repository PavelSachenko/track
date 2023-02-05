import { useEffect, useRef, useContext, MutableRefObject, useLayoutEffect} from 'react';
import { connect } from 'react-redux';

import { SetIsVisibleContext } from '../../pages/MainPage/MainPage';
import { IAgent } from '../../interfaces/interfaces';
import { AppState } from '../../redux/store';
import { getAgencies } from '../../redux/ducks/agencies';
import { useDidMount, usePrevious } from '../../hooks';

import './Agencies.scss';
import AgenciesPreview from '../../components/AgenciesPreview/AgenciesPreview';
import AgencyItem from './components/AgencyItem';
import Spinner from '../../components/Spinner/Spinner';

interface IAgenciesProps {
  user: IAgent;
  ids: number[];
  count: number;
  pending: boolean;
  getAgencies: (offset?: number) => void;
}

const Agencies = (props: IAgenciesProps) => {
  const {
    user,
    ids,
    count,
    pending,
    getAgencies,
  } = props;

  const LIMIT = 10;

  const { setIsVisibleTopbar, setIsVisibleNavbar } = useContext(SetIsVisibleContext);

  const expectedListLength: MutableRefObject<number> = useRef(LIMIT);
  const startScrollPosition = useRef(0);

  const prevListLength = usePrevious(ids.length);

  useDidMount(() => {
    expectedListLength.current = ids.length <= LIMIT
      ? LIMIT
      : ids.length;
  })

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

      getAgencies(ids.length);
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
      <div className="agencies__spinner">
        <Spinner size='150px' />
      </div>
    )
  }
  else if (!ids.length && !pending) {
    return <AgenciesPreview userType={user.type} />
  }

  return (
    <div className="agencies">
      <h2 className="agencies__title">
        Your Agencies <span className="agencies__count">({count})</span>
      </h2>

      <ul className="agencies__list">
        {ids.map((id: number) =>
          <li className="agencies__list-item" key={id}>
            <AgencyItem itemId={id} />
          </li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  ids: state.agencies.ids,
  count: state.agencies.count,
  pending: state.agencies.pending,
})

const mapDispatchToProps = {
  getAgencies,
}

export default connect(mapStateToProps, mapDispatchToProps)(Agencies);
