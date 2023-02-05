import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from "react-final-form";

import API from '../../api/api';
import { useToggle } from '../../hooks';
import { classModifier, getContactAvatar } from '../../utils';
import { AppState } from '../../redux/store';
import { IAgent, IAgency } from '../../interfaces/interfaces';
import validateFormValues from "../../utils/validateFormValues";

import './SettingsGeneral.scss';
import { ReactComponent as TrashIcon } from '../../icons/trash.svg';
import FormTextInput from "../../components/FormTextInput";
import FormTextTextarea from "../../components/FormTextarea";
import LazyLoadImage from "../../components/LazyLoadImage/LazyLoadImage";
import DelayedComponent from "../../components/DelayedComponent/DelayedComponent";
import ImgCropper from "../../components/ImgCropper/ImgCropper";
import AsyncBtn from "../../components/AsyncBtn/AsyncBtn";
import ReturnBtn from "../../components/ReturnBtn/ReturnBtn";


interface IUpdateUserForm {
  name: string
  img?: Blob;
  url?: string;
  phone?: string;
  description?: string;
}
interface ISettingsGeneralProps {
  user: IAgent | IAgency | any;
}

const SettingsGeneral = (props: ISettingsGeneralProps) => {
  const { user } = props;

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [pending, setPending] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [userPhotoUrl, setUserPhotoUrl] = useState<null | string>(user.img);
  const [cropperPhotoUrl, setCropperPhotoUrl] = useState<null | string>(null);
  const [croppedPhoto, setCroppedPhoto] = useState<{ url: null | string; file: null | File | Blob }>({
    url: null,
    file: null
  })

  const [isAvaCropPage, setIsAvaCropPage] = useToggle(false);

  const deletePhoto = () => {
    if (window.confirm('Delete photo?')) {
      croppedPhoto.url
        ? setCroppedPhoto({ url: null, file: null })
        : setUserPhotoUrl(null);
    }
  }

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
      setCroppedPhoto({ file: file, url });
    }, 500)
  }

  const onCrop = (file: Blob) => {
    setIsAvaCropPage(false);
    setCroppedPhoto({ file: file, url: URL.createObjectURL(file) });
  }

  const updateUser = (values: IUpdateUserForm) => {
    setPending(true);

    API.updateUser({ 
      ...values, 
      img: croppedPhoto.file || userPhotoUrl
    })
      .then(() => {
        setPending(false);
      })
      .catch((err) => {
        setPending(false);
        setServerErrors(err.response.data.errors)
        console.error(err);
      })
  }

  return (
    <div className="settings-general">
      <div className="settings-general__header">
        <ReturnBtn route="/settings" />

        <h2 className="settings-general__title">General</h2>
      </div>

      <Form
        initialValues={{ ...user }}
        validate={validateMainInfo}
        onSubmit={updateUser}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <DelayedComponent
              isMount={isAvaCropPage}
              delayUnmountTime={100}
            >
              <div className={classModifier('settings-general-cropper', [isAvaCropPage && 'open'])}>
                <div className="settings-general-cropper__cropper">
                  <ImgCropper
                    image={cropperPhotoUrl || ''}
                    onCrop={onCrop}
                    onCancel={() => setIsAvaCropPage(false)}
                    aspect={1}
                    cropShape={'round'}
                    classPrefix="avatar-cropper"
                  />
                </div>
              </div>
            </DelayedComponent>

            <div className="settings-general__avatar-select">
              <div className="settings-general__avatar">
                <LazyLoadImage 
                  src={croppedPhoto.url || getContactAvatar({ img: userPhotoUrl, type: user.type })} 
                  classPrefix="round-img" 
                  alt="avatar" 
                />

                {(croppedPhoto.url || userPhotoUrl) &&
                  <button
                    className="settings-general__avatar-icon"
                    type="button"
                    onClick={deletePhoto}
                  >
                    <TrashIcon />
                  </button>
                }
              </div>

              <div className="settings-general__avatar-btn-wrap">
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={onSelectImage}
                  onClick={() => imageInputRef.current && (imageInputRef.current.value = '')}
                  style={{ display: 'none' }}
                />

                <button
                  className="settings-general__avatar-btn"
                  onClick={() => imageInputRef.current?.click()}
                  type="button"
                >
                  Choose Avatar
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label label--required">
                {user.type === 1 ? "Full Name" : "Agency Name"}
              </label>

              <Field
                name="name"
                className="input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
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

            {user.type === 2 &&
              <div className="form-group">
                <label className="label label--optional">
                  Website
                </label>

                <Field
                  name="url"
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
                {user.type === 1 ? "About Me" : "About Us"}
              </label>

              <Field
                name="description"
                className="settings-general__textarea textarea input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextTextarea}
                rows={3}
                placeholder="Description"
                serverErrors={serverErrors}
              />
            </div>

            <div className="settings-general__btns">
              <AsyncBtn
                type="submit"
                className="btn btn--primary"
                spinnerSize="18px"
                pending={pending}
                disabled={submitting}
              >
                Save
              </AsyncBtn>
            </div>
          </form>
        )}
      </Form>
    </div >
  )
}

const validateMainInfo = ({ name }: { name: string }) => {
  const errors: any = {};

  if (validateFormValues.isEmpty(name)) {
    errors.name = 'This field can`t be empty';
  }

  return errors;
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user
})

export default connect(mapStateToProps)(SettingsGeneral);
