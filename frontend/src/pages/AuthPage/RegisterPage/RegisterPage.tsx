import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Field } from "react-final-form";

import { ROUTES } from "../../../config/constants";
import { useDidMount, useDidUpdate, usePrevious, useToggle } from "../../../hooks";
import classModifier from "../../../utils/classModifier";
import AUTH_API from "../../../api/auth-api";
import { IRecoveryPasswordFormValues } from "../RecoveryPage/RecoveryPasswordForm";
import validateFormValues from "../../../utils/validateFormValues";

import './RegisterPage.scss';
import { ReactComponent as AgentIcon } from '../../../icons/agent.svg';
import { ReactComponent as AgencyIcon } from '../../../icons/agency.svg';
import { ReactComponent as CameraIcon } from '../../../icons/camera.svg';
import { ReactComponent as PlusIcon } from '../../../icons/plus.svg';
import { ReactComponent as TrashIcon } from '../../../icons/trash.svg';
import EmailForm from "../../../components/EmailForm";
import AuthPage from "../AuthPage";
import GlobalPreloader from "../../../components/GlobalPreloader/GlobalPreloader";
import FormWizard from "../../../components/FormWizard/FormWizard";
import FormTextInput from "../../../components/FormTextInput";
import FormTextTextarea from "../../../components/FormTextarea";
import LazyLoadImage from "../../../components/LazyLoadImage/LazyLoadImage";
import ImgCropper from '../../../components/ImgCropper/ImgCropper';
import DelayedComponent from '../../../components/DelayedComponent/DelayedComponent';

const pageTitles: { [key: string]: { title: string, description: string } } = {
  100: {
    title: "Registration",
    description: "Sign un to get started"
  },
  200: {
    title: "Check your mail",
    description: "We have sent a confirmation link to your email"
  },
  0: {
    title: "Select password",
    description: "Please enter the password. Avoid using the same password everywhere"
  },
  1: {
    title: "Choose your account type",
    description: "Select your account type according to your needs."
  },
  2: {
    title: "Create account",
    description: "We have sent a confirmation link to your email"
  },
};

export interface IRegisterFormValues {
  name: string;
  registerToken: string;
  type: string;
  password: string;
  password_confirmation: string;
  img?: Blob;
  url?: string;
  phone?: string;
  description?: string;
}

const RegisterPage = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const firstInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [pagePending, setPagePending] = useState(true);
  const [submitPending, setSubmitPending] = useState(false);
  const [page, setPage] = useState(100);
  const [registerToken, setRegisterToken] = useState('');
  const [email, setEmail] = useState('');
  const [serverErrors, setServerErrors] = useState({});
  const [userType, setUserType] = useState("1");
  const [isAvaCropPage, setIsAvaCropPage] = useToggle(false);
  const [cropperPhotoUrl, setCropperPhotoUrl] = useState<null | string>(null);
  const [avatarPhoto, setAvatarPhoto] = useState<{ url: null | string; file: null | File | Blob }>({
    url: null,
    file: null
  })

  const prevAvatarPhotoUrl = usePrevious(avatarPhoto.url);

  useDidMount(() => {
    const registerToken = new URLSearchParams(location.search).get('registerToken');

    if (registerToken) {
      AUTH_API.isRegisterTokenValid(registerToken)
        .then(({ data }) => {
          setRegisterToken(registerToken);
          setEmail(data);
          setPage(0);
        })
        .finally(() => setPagePending(false));
    }
    else {
      setPagePending(false);
    }
  });

  useEffect(() => {
    return () => {
      avatarPhoto.url && URL.revokeObjectURL(avatarPhoto.url);
    }
  }, [avatarPhoto.url]);

  useDidUpdate(() => {
    if (prevAvatarPhotoUrl) {
      URL.revokeObjectURL(prevAvatarPhotoUrl);
    }
  }, [avatarPhoto.url]);

  useDidUpdate(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [page]);

  const sendEmailToRegister = (email: string) => {
    return AUTH_API.sendEmailForRegister(email)
      .then(res => {
        console.log(res);
        setPage(200)
      });
  };

  const registerUser = (values: IRegisterFormValues) => {
    if (avatarPhoto.file) {
      values.img = avatarPhoto.file;
    }

    return AUTH_API.register(values)
      .then(({ data }) => {
        localStorage.token = data.token;
        localStorage.successRegisterModal = true;

        const invitationToken = new URLSearchParams(location.search).get('invitationToken');

        if (invitationToken) {
          window.location.href = (ROUTES.invitation + '?invitationToken=' + invitationToken);
        }
        else {
          window.location.href = ROUTES.main;
        }
      })
      .catch((err) => {
        setSubmitPending(false);
        setServerErrors(err.response.data.errors);
        console.log(err);
      })
  }

  const deletePhoto = () => {
    if (window.confirm('Delete photo?')) {
      setAvatarPhoto({ url: null, file: null })
    }
  }

  const triggerImageSelectPopup = () => imageInputRef.current?.click();

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (file.type.startsWith('image')) {
          setPhotoHandler(file);
          setIsAvaCropPage(true);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  const setPhotoHandler = (file: File) => {
    const url = URL.createObjectURL(file)

    setCropperPhotoUrl(url);

    //Delay for that the image not appear while the animation is in progress 
    setTimeout(() => {
      setAvatarPhoto({ file: file, url });
    }, 500)
  }

  const onCrop = (file: Blob) => {
    setIsAvaCropPage(false);
    setAvatarPhoto({ file: file, url: URL.createObjectURL(file) });
  }

  const onCancel = () => {
    setIsAvaCropPage(false);
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
          onClick={() => setPage(100)}
        >
          Try another email address
        </button>
      </footer>
    </>
  );

  const renderComponent = (): JSX.Element => {
    if (page === 100) {
      return <EmailForm linkText="Already have an account?" onSubmit={sendEmailToRegister} />;
    }
    if (page === 200) {
      return renderSuccessWindow();
    }
    else {
      return <FormWizard
        onSubmit={registerUser}
        initialValues={{ registerToken, type: "1" }}
        onNextPage={setPage}
        onPrevPage={setPage}
        submitPending={submitPending}
        setSubmitPending={setSubmitPending}
      >
        <FormWizard.Page
          validate={validatePasswords}
        >
          <div className="form-group">
            <label className="label label--required">Password</label>

            <Field
              name="password"
              type="password"
              className="input"
              errorInputClass="input--error"
              errorClass="form-group__error"
              component={FormTextInput}
              inputRef={firstInputRef}
              placeholder="Password"
              serverErrors={serverErrors}
            />
          </div>

          <div className="form-group">
            <label className="label label--required">Repeat Password</label>

            <Field
              name="password_confirmation"
              type="password"
              className="input"
              errorInputClass="input--error"
              errorClass="form-group__error"
              component={FormTextInput}
              placeholder="Confirm Password"
              serverErrors={serverErrors}
            />
          </div>
        </FormWizard.Page>

        <FormWizard.Page>
          <div className="register-page__labels">
            <label className="register-page__label">
              <div className="register-page__label-img">
                <AgentIcon />
              </div>

              Agent

              <Field
                name="type"
                type="radio"
                value="1"
                render={props => (
                  <input
                    {...props.input}
                    className="register-page__radio"
                    onChange={(e) => { props.input.onChange(e); setUserType(e.target.value) }}
                  />
                )}
              />
              <span className="register-page__checkmark"></span>
            </label>

            <label className="register-page__label">
              <div className="register-page__label-img">
                <AgencyIcon />
              </div>

              Agency

              <Field
                name="type"
                type="radio"
                value="2"
                render={props => (
                  <input
                    {...props.input}
                    className="register-page__radio"
                    onChange={(e) => { props.input.onChange(e); setUserType(e.target.value) }}
                  />
                )}
              />
              <span className="register-page__checkmark"></span>
            </label>
          </div>
        </FormWizard.Page>

        <FormWizard.Page
          validate={validateMainInfo}
        >
          <DelayedComponent
            isMount={isAvaCropPage}
            delayUnmountTime={100}
          >
            <div className={classModifier('register-page-cropper', [isAvaCropPage && 'open'])}>
              <AuthPage title="Crop Image">
                <div className="register-page-cropper__cropper">
                  <ImgCropper
                    image={cropperPhotoUrl || ''}
                    onCrop={onCrop}
                    onCancel={onCancel}
                    aspect={1}
                    cropShape={'round'}
                    classPrefix="avatar-cropper"
                  />
                </div>
              </AuthPage>
            </div>
          </DelayedComponent>

          <div className="register-page__avatar-select">
            <div className="register-page__avatar">
              {avatarPhoto.url
                ? (
                  <>
                    <LazyLoadImage src={avatarPhoto.url} classPrefix="round-img" alt="avatar" />

                    <button
                      className="register-page__avatar-icon"
                      type="button"
                      onClick={deletePhoto}
                    >
                      <TrashIcon />
                    </button>
                  </>
                ) : (
                  <div className="avatar-preview round-img">
                    <div className="avatar-preview__icons">
                      <div className="avatar-preview__icon avatar-preview__icon--camera"><CameraIcon /></div>
                      <div className="avatar-preview__icon avatar-preview__icon--plus"><PlusIcon /></div>
                    </div>
                  </div>
                )
              }
            </div>

            <div className="register-page__avatar-btn-wrap">
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={onSelectImage}
                onClick={() => imageInputRef.current && (imageInputRef.current.value = '')}
                style={{ display: 'none' }}
              />

              <button
                className="register-page__avatar-btn"
                onClick={triggerImageSelectPopup}
                type="button"
              >
                Choose Avatar
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="label label--required">
              {userType === "1" ? "Full Name" : "Agency Name"}
            </label>

            <Field
              name="name"
              className="input"
              errorInputClass="input--error"
              errorClass="form-group__error"
              component={FormTextInput}
              inputRef={firstInputRef}
              placeholder="Full Name"
              serverErrors={serverErrors}
            />
          </div>

          <div className="form-group">
            <label className="label label--optional">Phone</label>

            <Field
              name="phone"
              type="tel"
              className="input"
              errorInputClass="input--error"
              errorClass="form-group__error"
              component={FormTextInput}
              placeholder="Phone number"
              serverErrors={serverErrors}
            />
          </div>

          {userType === "2" &&
            <div className="form-group">
              <label className="label label--optional">
                Website
              </label>

              <Field
                name="site"
                className="input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
                placeholder="URL Website"
                serverErrors={serverErrors}
              />
            </div>
          }

          <div className="form-group">
            <label className="label label--optional">
              {userType === "1" ? "About Me" : "About Us"}
            </label>

            <Field
              name="description"
              className="register-page__textarea textarea input"
              errorInputClass="input--error"
              errorClass="form-group__error"
              component={FormTextTextarea}
              rows={3}
              placeholder="Description"
              serverErrors={serverErrors}
            />
          </div>
        </FormWizard.Page>
      </FormWizard>
    }
  }

  if (pagePending) {
    return <GlobalPreloader spinnerSize="120px" />
  }

  console.log('RegisterPage Render', email, setServerErrors);
  return (
    <AuthPage
      {...pageTitles[page]}
      isTextAutoHeight={page === 2 ? true : false}
    // title={pageTitles[page].title}
    // description={pageTitles[page].description + ' ' + email}
    >
      <div className="register-page">{renderComponent()}</div>
    </AuthPage>
  );
}

const validatePasswords = ({ password, password_confirmation }: IRecoveryPasswordFormValues) => {
  const errors: any = {};

  if (validateFormValues.isEmpty(password)) {
    errors.password = 'Enter the password';
  }
  if (password && password.length < 6) {
    errors.password = 'The new password must be at least 6 characters';
  }
  if (password && validateFormValues.isEmpty(password_confirmation)) {
    errors.password_confirmation = 'Enter the password again';
  }
  if (password && password !== password_confirmation) {
    errors.password_confirmation = 'Passwords are not match';
  }
  return errors;
}

const validateMainInfo = ({ name }: { name: string }) => {
  const errors: any = {};

  if (validateFormValues.isEmpty(name)) {
    errors.name = 'This field can`t be empty';
  }
  return errors;
}

export default RegisterPage;