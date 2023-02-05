import React, { useState } from 'react';

import './MainPage.scss';
import Topbar from '../../containers/Topbar/Topbar';
import Navbar from '../../containers/Navbar/Navbar';

interface ISetIsVisibleContext {
  [key: string]: React.Dispatch<React.SetStateAction<boolean>>
}

export const SetIsVisibleContext = React.createContext<ISetIsVisibleContext>({});

const MainPage: React.FC = (props) => {
  const [isVisibleTopbar, setIsVisibleTopbar] = useState(true);
  const [isVisibleNavbar, setIsVisibleNavbar] = useState(true);

  return (
    <div className="main-page">
      <Topbar isVisible={isVisibleTopbar} />

      <main className="main-page__wrapper">
        <SetIsVisibleContext.Provider value={{ setIsVisibleTopbar, setIsVisibleNavbar }}>
          {props.children}
        </SetIsVisibleContext.Provider>
      </main>

      <Navbar isVisible={isVisibleNavbar} />
    </div>
  );
}

export default MainPage;