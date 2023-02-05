import classModifier from '../../utils/classModifier';

import './AuthPage.scss';

interface IAuthPage {
  title: string;
  description?: string;
  children: JSX.Element;
  isTextAutoHeight?: boolean;
}

const AuthPage = (props: IAuthPage) => {
  console.log('AuthPage Render');
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <div className="auth-page__logo-wrap">
          Logotype
        </div>

        <h1 className="auth-page__title">{props.title}</h1>

        {props.description &&
          <div className={classModifier('auth-page__text', [!!props.isTextAutoHeight && 'auto-height'])}>
            {props.description}
          </div>
        }
      </header>

      {props.children}
    </div>
  );
}

export default AuthPage;