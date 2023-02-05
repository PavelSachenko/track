import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ROUTES } from "../../config/constants";
import { useDidMount } from "../../hooks";

import GlobalPreloader from "../../components/GlobalPreloader/GlobalPreloader";
import AUTH_API from "../../api/auth-api";
import { MODAL_TYPES, openModal } from "../../redux/ducks/activeWindows";

const InvitationPage = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  useDidMount(() => {
    const invitationToken = new URLSearchParams(location.search).get('invitationToken');

    if (invitationToken) {
      AUTH_API.isInvitationTokenValid(invitationToken)
        .then(({ data }) => {
          // if already logged in => go to notifications
          if (data.type === 'goToNotifications') {
            navigate(ROUTES.notifications);
          }
          // if already logged in but wrong account => show modal with next steps: 
          //      - if account exists log-out and log in to another account 
          //      - if not => go to register page
          else if (data.type === 'logoutAndLogin' || data.type === 'logoutAndRegister') {
            const type = data.type === 'logoutAndRegister' ? 'register' : 'login';

            dispatch(openModal(MODAL_TYPES.invitationInstructionsModal, {
              type,
              invitationToken: invitationToken,
              registerToken: data.registerToken,
            }));
          }
          // if not logged in => 
          //      - if account exists => login page
          //      - if not => register page
          else if (data.type === 'login') {
            navigate(ROUTES.login);
          }
          else if (data.type === 'register') {
            navigate(ROUTES.register
              + '?registerToken=' + data.registerToken
              + '&invitationToken=' + invitationToken
            );
          }

          // setPagePending(false);
        })
        .catch(() => {
          console.log('Invitation token not valid');
          navigate(ROUTES.main);
        })
    }
    else {
      navigate(ROUTES.login)
    }
  });

  console.log('InvitationPage Render');
  return <GlobalPreloader spinnerSize="120px" />
}

export default InvitationPage;
