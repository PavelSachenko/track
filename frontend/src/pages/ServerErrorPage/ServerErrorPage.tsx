import React from 'react';

import './ServerErrorPage.scss';
import { ReactComponent as ErrorIcon } from '../../icons/server-error.svg';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';

const NotFound = () => {
  return (
    <div className="server-error-page">
      <ReturnBtn route="/" text="Main Page"/>

      <div className="server-error-page__image">
        <ErrorIcon />
      </div>

      <h2 className="server-error-page__title">Sorry, something went wrong.</h2>

      <p className="server-error-page__text">
        Try reloading the page. We're working hard to fix it for you <br/>
        as soon as possible
      </p>
    </div>
  );
};

export default NotFound;
