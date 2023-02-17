import { Suspense, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import API from './api/api';
import { ROUTES } from './config/constants';
import { initApp } from './redux/ducks/user';
import { useDidMount } from './hooks';
import { IAgent, IAgency } from './interfaces/interfaces';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage/ServerErrorPage';
import PrivateRoute from './components/PrivateRoute';
import Loadable from './components/Loadable';
import GlobalPreloader from './components/GlobalPreloader/GlobalPreloader';
import LoginPage from './pages/AuthPage/LoginPage/LoginPage';
import RegisterPage from './pages/AuthPage/RegisterPage/RegisterPage';
import RecoveryPage from './pages/AuthPage/RecoveryPage/RecoveryPage';
import InvitationPage from './pages/InvitationPage/InvitationPage';
import Modals from './containers/Modals/Modals';
import Socket from './components/Socket';

interface IPrivateRoutes {
  initApp: (user: IAgent | IAgency) => void;
}

const PrivateRoutes = (props: IPrivateRoutes) => {
  const [isAgent, setIsAgent] = useState<null | boolean>(null);

  useDidMount(() => {
    API.getUser()
      .then((res) => {
        const user: IAgent | IAgency = res.data;

        setIsAgent(user.type === 1);
        props.initApp(user);
      })
      .catch((err) => {
        console.log(err);

        delete localStorage.token;
        window.location.href = ROUTES.login;
      })
  })

  if (isAgent === null) {
    return <GlobalPreloader />
  }

  // @ts-ignore
  return (
    <Loadable.MainPage>
      {/*// @ts-ignore*/}
      <Socket />

      <Routes>
        <Route path="/" element={isAgent ? <Loadable.Agencies /> : <Loadable.Agents />} />
        <Route path="/schedule" element={isAgent ? <Loadable.AgentSchedule /> : <div>Schedule</div>} />
        <Route path="/notifications" element={<Loadable.Notifications />} />
        <Route path="/invites" element={<Loadable.Invites />} />
        <Route path="/settings" element={<Loadable.Settings />} /> 
        <Route path="/settings/general" element={<Loadable.SettingsGeneral />} />
        {isAgent && <Route path="/settings/schedule" element={<Loadable.SettingsSchedule />} /> }
        <Route path="/settings/security" element={<Loadable.SettingsSecurity />} />

        <Route path={ROUTES.serverError} element={<ServerErrorPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Loadable.MainPage>
  )
}

const mapDispatchToProps = ({
  initApp,
})

const ConnectedPrivateRoutes = connect(null, mapDispatchToProps)(PrivateRoutes);

const App = () => {
  return (
    <Suspense fallback={<GlobalPreloader />}>
      <Modals />

      <Routes>
        <Route path={ROUTES.invitation} element={<InvitationPage />} />

        <Route path={ROUTES.auth}>
          <Navigate to={ROUTES.login} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
        </Route>

        <PrivateRoute
          path={ROUTES.main + '*'}
          component={ConnectedPrivateRoutes}
          isAuthenticated={localStorage.token}
          redirectLink={ROUTES.login}
        />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
