
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDidMount } from "../../../hooks";
import { ROUTES } from "../../../config/constants";
import AUTH_API from "../../../api/auth-api";

import AuthPage from "../AuthPage";
import RecoveryPasswordForm from "./RecoveryPasswordForm";
import GlobalPreloader from "../../../components/GlobalPreloader/GlobalPreloader";
import EmailForm from "../../../components/EmailForm";

const pageTitles: { [key: string]: { title: string, description: string } } = {
  1: {
    title: "Reset password",
    description: "Enter the email associated with your account and we'll send an email with instructions to reset password"
  },
  2: {
    title: "Check your mail",
    description: "We have sent a password recover instructions to your email"
  },
  3: {
    title: "Create new password",
    description: "Your new password must be different from previous used passwords"
  },
}

const RecoveryPage = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [pagePending, setPagePending] = useState(true);
  const [recoveryToken, setRecoveryToken] = useState('');
  const [page, setPage] = useState(1);

  useDidMount(() => {
    const resetToken = new URLSearchParams(location.search).get('resetToken');

    if (resetToken) {
      AUTH_API.isResetTokenValid(resetToken)
        .then(() => {
          setRecoveryToken(resetToken)
          setPagePending(false);
          setPage(3);
        })
        .catch(() => {
          setPagePending(false);
        })
    }
    else {
      setPagePending(false);
    }
  });

  const onSubmit = (email: string) => {
    return AUTH_API.sendEmailToResetPassword(email)
      .then(() => setPage(2));
  }

  const renderSuccessWindow = () => (
    <>
      <div className="auth-page__btns">
        <button
          className="btn btn--primary"
          onClick={() => navigate(ROUTES.login)}
        >
          Done
        </button>
      </div>

      <footer className="auth-page__footer">
        Did not receive the email? Check your spam filter, or
        <button
          className="link"
          onClick={() => setPage(1)}
        >
          Try another email address
        </button>
      </footer>
    </>
  )

  const renderComponent = (): JSX.Element => {
    if (page === 1) return <EmailForm onSubmit={onSubmit} linkText="Back to Sign In" />;
    if (page === 2) return renderSuccessWindow();
    return <RecoveryPasswordForm recoveryToken={recoveryToken} />;
  }


  console.log('RecoveryPage Render');

  if (pagePending) {
    return <GlobalPreloader spinnerSize="120px" />
  }

  return (
    <AuthPage
      {...pageTitles[page]}
    >
      {renderComponent()}
    </AuthPage>
  );
}



export default RecoveryPage;