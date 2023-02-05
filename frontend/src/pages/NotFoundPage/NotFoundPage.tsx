import React from 'react';

import './NotFoundPage.scss';
import { ReactComponent as ErrorIcon } from '../../icons/error-404.svg';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <ReturnBtn route="/" text="Main Page"/>

      <div className="not-found-page__image">
        <ErrorIcon />
      </div>

      <h2 className="not-found-page__title">Page not found</h2>

      <p className="not-found-page__text">
        The Page you are looking for doesn't exist or an<br/>
        other error occurred.
      </p>
    </div>
  );
};

export default NotFoundPage;
